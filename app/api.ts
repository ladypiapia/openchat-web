import ky from "ky";
import type {
	ConversationData,
	ImageResData,
	MessageData,
	SendMessageData,
	SigninRespData,
	UserData,
} from "~/types";
import { toaster } from "~/components/ui/toaster";
import { getNavigate } from "~/utils/navigation";

const BASE_API_URL = import.meta.env.VITE_API_URL as string;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
	refreshSubscribers.push(cb);
}
function onRefreshed(token: string) {
	for (const subscriber of refreshSubscribers) {
		subscriber(token);
	}
	refreshSubscribers = [];
}
const refreshAccessToken = async (): Promise<string> => {
	const refresh_token = localStorage.getItem("refresh_token");
	const resp = await api
		.post("refresh_token", {
			json: { refresh_token },
		})
		.json<SigninRespData>();
	localStorage.setItem("access_token", resp.access_token);
	localStorage.setItem("refresh_token", resp.refresh_token);
	onRefreshed(resp.access_token);
	return resp.access_token;
};

const api = ky.create({
	prefixUrl: BASE_API_URL,
	hooks: {
		beforeRequest: [
			(request) => {
				const token = localStorage.getItem("access_token");
				if (token) {
					request.headers.set("Authorization", `Bearer ${token}`);
				}
			},
		],
		afterResponse: [
			async (request, options, response) => {
				if (response.status === 401) {
					if (!isRefreshing) {
						isRefreshing = true;
						try {
							const token = await refreshAccessToken();
							request.headers.set("Authorization", `Bearer ${token}`);
							return api(request, options);
						} catch (error) {
							console.error("Failed to refresh token", error);
							toaster.error({
								title: "登录过期",
								description: "请重新登录",
							});
							const navigate = getNavigate();
							navigate("/signin",{
								viewTransition: true
							});
						} finally {
							isRefreshing = false;
						}
					} else {
						return new Promise((resolve) => {
							subscribeTokenRefresh((token) => {
								request.headers.set("Authorization", `Bearer ${token}`);
								resolve(api(request, options));
							});
						});
					}
				}
			},
		],
	},
});

const signin = (data: { username: string; password: string }) =>
	api.post("signin", { json: data }).json<SigninRespData>();

const signup = (data: { username: string; password: string }) =>
	api.post("signup", { json: data }).json<UserData>();

const account = () => api.get("account").json<UserData>();

const getConversations = () =>
	api.get("conversations").json<ConversationData[]>();

const createConversation = () =>
	api.post("conversations").json<ConversationData>();

const getConversation = (conversationId: string) =>
	api.get(`conversations/${conversationId}`).json<ConversationData>();

const deleteConversation = (conversationId: string) =>
	api.delete(`conversations/${conversationId}`);

const getMessages = (conversationId: string) =>
	api.get(`conversations/${conversationId}/messages`).json<MessageData[]>();

const chat = (conversation_id: string, messages: SendMessageData[]) =>
	api.post("chat", {
		json: {
			conversation_id,
			messages,
		},
	});

const getImages = () => api.get("images").json<ImageResData[]>();

const deleteImage = (id: string) => api.delete(`images/${id}`);

const generateImages = (prompt: string) =>
	api
		.post("cf/images", { json: { prompt }, timeout: 200000 })
		.json<ImageResData>();

const summarize = (conversationId: string, messages: SendMessageData[]) =>
	api
		.post("summarize", {
			json: {
				conversation_id: conversationId,
				messages: messages,
			},
		})
		.json<string>();

export default {
	signin,
	signup,
	account,
	getConversations,
	createConversation,
	getConversation,
	deleteConversation,
	getMessages,
	chat,
	getImages,
	deleteImage,
	generateImages,
	summarize,
};

import { index, layout, route } from "@react-router/dev/routes";

export const routes = [
	layout("routes/home_layout.tsx", [
		layout("routes/chat_layout.tsx", [
			index("routes/chat_index.tsx"),
			route("chat", "routes/chat.tsx"),
		]),
		route("images", "routes/images.tsx"),
		route("images/new", "routes/images_new.tsx"),
		route("account", "routes/account.tsx"),
	]),
	route("signin", "routes/signin.tsx"),
	route("signup", "routes/signup.tsx"),
];

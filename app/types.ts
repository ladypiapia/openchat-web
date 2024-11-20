export interface SigninRespData {
	access_token: string;
	refresh_token: string;
}

export interface UserData {
	id: string;
	username: string;
}

export interface ConversationData {
	id: string;
	name: string;
	pinned: boolean;
	created_at: string;
	updated_at: string;
}

export interface MessageData {
	id: string;
	conversation_id: string;
	user_id: string;
	role: string;
	content: string;
	created_at: string;
	updated_at: string;
}

export interface SendMessageData {
	role: string;
	content: string;
}

export interface ImageResData {
	id: string;
	url: string;
	blurhash: string;
	prompt: string;
}

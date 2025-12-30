import AuthenticateAxios from "../axios/AuthenticateAxios";

const CHAT_URL = "/chat/";

const getChatHistory = async () => {
    const response = await AuthenticateAxios.get(CHAT_URL);
    return response.data.results ? response.data.results : response.data;
};

const sendMessage = async (content) => {
    const response = await AuthenticateAxios.post(CHAT_URL, { content });
    return response.data;
};

const getAllUsersChats = async (params) => {
    const response = await AuthenticateAxios.get(`${CHAT_URL}all_users_chats/`, { params });
    return response.data;
};

const getUserChatHistory = async (userId) => {
    const response = await AuthenticateAxios.get(`${CHAT_URL}${userId}/user_chat_history/`);
    return response.data;
};

const chatService = {
    getChatHistory,
    sendMessage,
    getAllUsersChats,
    getUserChatHistory
};

export default chatService;

import AuthenticateAxios from "../../axios/AuthenticateAxios";

const WISHES_URL = "/wishes/";

const getWishes = async () => {
    const response = await AuthenticateAxios.get(WISHES_URL);
    // Handle both paginated and flat responses
    return response.data.results ? response.data.results : response.data;
};

const createWish = async (content) => {
    const response = await AuthenticateAxios.post(WISHES_URL, { content });
    return response.data;
};

const deleteWish = async (id) => {
    const response = await AuthenticateAxios.delete(`${WISHES_URL}${id}/`);
    return response.data;
};

const wishService = {
    getWishes,
    createWish,
    deleteWish,
};

export default wishService;

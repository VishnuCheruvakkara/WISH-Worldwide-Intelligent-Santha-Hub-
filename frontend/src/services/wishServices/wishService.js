import AuthenticateAxios from "../../axios/AuthenticateAxios";

const WISHES_URL = "/wishes/";

const getWishes = async () => {
    const response = await AuthenticateAxios.get(WISHES_URL);
    return response.data.results ? response.data.results : response.data;
};

const getAdminUserWishes = async (params = {}) => {
    const response = await AuthenticateAxios.get('/wishes/admin-user-wishes/', { params });
    return response.data;
};

const getAllWishes = async (params = {}) => {
    const response = await AuthenticateAxios.get(WISHES_URL, { params });
    return response.data;
};

const createWish = async (content) => {
    const response = await AuthenticateAxios.post(WISHES_URL, { content });
    return response.data;
};

const updateWish = async (id, data) => {
    const response = await AuthenticateAxios.patch(`${WISHES_URL}${id}/`, data);
    return response.data;
};

const deleteWish = async (id) => {
    const response = await AuthenticateAxios.delete(`${WISHES_URL}${id}/`);
    return response.data;
};

const grantAllWishes = async () => {
    const response = await AuthenticateAxios.post(`${WISHES_URL}bulk_grant_all/`);
    return response.data;
};

const grantUserWishes = async (username) => {
    const response = await AuthenticateAxios.post(`${WISHES_URL}bulk_grant_user/`, { username });
    return response.data;
};

const wishService = {
    getWishes,
    getAllWishes,
    getAdminUserWishes,
    createWish,
    updateWish,
    deleteWish,
    grantAllWishes,
    grantUserWishes,
};

export default wishService;

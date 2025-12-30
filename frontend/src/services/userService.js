import AuthenticateAxios from "../axios/AuthenticateAxios";

const userService = {
    getAllUsers: async (params) => {
        const response = await AuthenticateAxios.get("/users/admin/management/", { params });
        return response.data;
    },
    toggleUserStatus: async (userId) => {
        const response = await AuthenticateAxios.post(`/users/admin/management/${userId}/toggle_status/`);
        return response.data;
    }
};

export default userService;

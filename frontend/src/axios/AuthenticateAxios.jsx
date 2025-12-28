import axios from "axios";
import { store } from "../redux/store";
import { loginSuccess, logoutSuccess } from "../redux/Slice/userAuthSlice";
import { getCookie } from "../utils/getCookie";

// For authenticated requests
const AuthenticateAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
    withCredentials: true,
});

// Dedicated refresh axios instance
const refreshAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
    withCredentials: true,
});

AuthenticateAxios.interceptors.request.use((config) => {
    const { access } = store.getState().userAuth;

    if (access) {
        config.headers["Authorization"] = `Bearer ${access}`;
    }

    const csrf = getCookie("csrftoken");
    if (csrf) {
        config.headers["X-CSRFToken"] = csrf;
    }

    return config;
});

AuthenticateAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshResponse = await refreshAxios.post("/users/token-refresh/", {});
                const data = refreshResponse.data.data;

                store.dispatch(
                    loginSuccess({
                        access: data.access,
                        user: {
                            id: data.id,
                            username: data.username,
                            email: data.email,
                            is_admin: data.is_admin,
                        },
                    })
                );

                originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
                return AuthenticateAxios(originalRequest);
            } catch (refreshError) {
                store.dispatch(logoutSuccess());
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default AuthenticateAxios;
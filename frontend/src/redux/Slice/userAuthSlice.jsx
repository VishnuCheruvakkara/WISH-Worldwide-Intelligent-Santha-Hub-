import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    access: null,
    user: null,
    isAuthenticated: false,
};

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.access = action.payload.access;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logoutSuccess: (state) => {
            state.access = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logoutSuccess } = userAuthSlice.actions;
export default userAuthSlice.reducer;

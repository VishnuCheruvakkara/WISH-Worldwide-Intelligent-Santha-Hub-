import React from "react";
import { useSelector } from "react-redux";

export default function useAuth() {
    const { access, bootstrapped, user } = useSelector((state) => state.userAuth);
    return {
        // Convert the data into boolean
        isAuthenticated: !!access,
        isAdmin: user?.is_admin === true,
        bootstrapped,
        user,
    }
}
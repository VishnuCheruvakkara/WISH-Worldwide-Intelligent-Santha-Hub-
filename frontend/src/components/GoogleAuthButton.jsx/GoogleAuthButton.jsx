import { useState } from "react";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import publicAxios from "../../axios/PublisAxios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/Slice/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/ui/toast/ChrisToast";
import { FcGoogle } from "react-icons/fc";
import { FaSnowflake } from "react-icons/fa";

import CommonSpinner from '../../components/ui/spinner/CommonSpinner';

export default function GoogleAuthButton({ onLoadingChange }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const login = useGoogleLogin({
        flow: "implicit",
        scope: "openid email profile",
        onSuccess: async (tokenResponse) => {
            setLoading(true);
            if (onLoadingChange) onLoadingChange(true);

            try {
                const access_token = tokenResponse.access_token;
                const res = await publicAxios.post(`/users/google/callback/`, { access_token });

                const { access, id, username, email, is_admin } = res.data.data;

                dispatch(
                    loginSuccess({
                        access,
                        user: { id, username, email, is_admin },
                    })
                );

                showToast.success(`Welcome to the North Pole, ${username}! 🎄`);

                // Redirect based on role
                if (is_admin) {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/dashboard');
                }
            } catch (err) {
                if (err.response?.data?.status === "blocked") {
                    showToast.error("Your account is on the Naughty List (Blocked). Contact support.");
                } else {
                    showToast.error("Google login failed! The snowstorm might be blocking it.");
                }
                setLoading(false);
                if (onLoadingChange) onLoadingChange(false);
            }
        },
        onError: () => {
            showToast.error("Google Login Cancelled");
            setLoading(false);
            if (onLoadingChange) onLoadingChange(false);
        },
    });

    return (
        <>
            {loading && <CommonSpinner />}
            <button
                onClick={() => login()}
                disabled={loading}
                className="w-full relative group overflow-hidden rounded-xl cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {/* Base Glow - Brighter */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-white/50 rounded-xl py-3 px-4 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    {loading ? (
                        <FaSnowflake size={20} className="text-white animate-spin-slow" />
                    ) : (
                        <div className="bg-white p-1 rounded-lg group-hover:scale-110 group-hover:ring-2 group-hover:ring-white/50 transition-all duration-300">
                            <FcGoogle size={20} />
                        </div>
                    )}

                    <span className="font-bold text-white tracking-wide group-hover:text-shadow-md transition-all">
                        {loading ? "Approaching the Pole..." : "Continue with Google"}
                    </span>
                </div>

                {/* Hover Magic Snowflakes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                    {/* Top Right Snowflake - Bright & Spinning */}
                    <motion.div
                        className="absolute -right-2 -top-2 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1],
                            filter: ["drop-shadow(0 0 0px white)", "drop-shadow(0 0 10px white)", "drop-shadow(0 0 0px white)"]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <FaSnowflake size={40} />
                    </motion.div>

                    {/* Bottom Left Snowflake - Smaller & Pulsing */}
                    <motion.div
                        className="absolute -left-1 -bottom-1 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100"
                        animate={{
                            rotate: -180,
                            scale: [0.8, 1.1, 0.8],
                            filter: ["drop-shadow(0 0 0px white)", "drop-shadow(0 0 8px white)", "drop-shadow(0 0 0px white)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaSnowflake size={24} />
                    </motion.div>

                    {/* Center Hidden Snowflake - Flashes on hover */}
                    <motion.div
                        className="absolute right-1/4 bottom-1 text-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200"
                        animate={{
                            y: [-2, 2, -2],
                            opacity: [0.15, 0.4, 0.15]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <FaSnowflake size={16} />
                    </motion.div>

                    {/* NEW 4th Snowflake - Top Left drifting */}
                    <motion.div
                        className="absolute left-4 top-0 text-white/25 opacity-0 group-hover:opacity-100 transition-opacity duration-800"
                        animate={{
                            x: [-5, 5, -5],
                            rotate: [0, 90, 0],
                            scale: [1, 1.3, 1],
                            filter: ["drop-shadow(0 0 0px white)", "drop-shadow(0 0 6px white)", "drop-shadow(0 0 0px white)"]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <FaSnowflake size={18} />
                    </motion.div>
                </div>
            </button>
        </>
    );
}


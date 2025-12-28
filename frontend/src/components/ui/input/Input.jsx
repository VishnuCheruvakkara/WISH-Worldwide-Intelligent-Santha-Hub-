import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useField } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
    label,
    type = "text",
    placeholder,
    icon: Icon,
    leftIcon,
    rightIcon,
    className = "",
    ...props
}) => {
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = useState(false);

    // Final icons to display
    const LeftIconDisplay = leftIcon || Icon;
    const isPassword = type === "password";
    const finalType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className={twMerge("flex flex-col gap-1.5", className)}>
            {label && (
                <label className="text-sm font-semibold text-white/90 ml-1 tracking-wide">
                    {label}
                </label>
            )}

            <div className="relative group">
                {/* Input Field */}
                <input
                    {...props}
                    {...field}
                    type={finalType}
                    placeholder={placeholder}
                    className={twMerge(clsx(
                        `w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 
                        text-white placeholder-white/30 focus:outline-none focus:border-santa-red/50 focus:ring-2 focus:ring-santa-red/20 
                        transition-all duration-300 backdrop-blur-md`,
                        LeftIconDisplay ? "pl-12" : "pl-4",
                        (rightIcon || isPassword) ? "pr-12" : "pr-4",
                        meta.touched && meta.error ? "border-red-500/50 bg-red-500/5" : "hover:bg-white/10"
                    ))}
                />

                {/* Left Icon with Under-Glow Effect */}
                {LeftIconDisplay && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                        {/* Glow Layer Under the Icon */}
                        <div className="absolute inset-0 bg-white blur-xl rounded-full group-focus-within:bg-santa-red/20 transition-all duration-500 scale-150"></div>

                        {/* The Sharp Icon on Top */}
                        <div className="relative text-white/70 group-focus-within:text-santa-red transition-all duration-300 flex items-center justify-center drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-focus-within:drop-shadow-[0_0_12px_rgba(255,56,56,0.4)]">
                            {typeof LeftIconDisplay === 'function' ? (
                                <LeftIconDisplay size={18} />
                            ) : (
                                <span className="text-lg">{LeftIconDisplay}</span>
                            )}
                        </div>
                    </div>
                )}

                {/* Right Icon / Password Toggle */}
                {(rightIcon || isPassword) && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10">
                        {isPassword ? (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-white/40 hover:text-white transition-colors p-1"
                            >
                                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                            </button>
                        ) : (
                            <div className="text-white/40 text-lg flex items-center justify-center">
                                {rightIcon}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Error message */}
            {meta.touched && meta.error && (
                <div className="text-santa-red text-[11px] mt-1 ml-1 font-bold animate-in fade-in slide-in-from-top-1 px-2 py-0.5 bg-santa-red/10 rounded-md w-fit">
                    {meta.error}
                </div>
            )}
        </div>
    );
};

export default Input;

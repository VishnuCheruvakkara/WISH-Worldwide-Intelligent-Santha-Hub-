import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useField } from "formik";

const TextArea = ({
    label,
    placeholder,
    className = "",
    rows = 4,
    ...props
}) => {
    const [field, meta] = useField(props);

    return (
        <div className={twMerge("flex flex-col gap-1.5 h-full", className)}>
            {label && (
                <label className="text-sm font-semibold text-white/90 ml-1 tracking-wide">
                    {label}
                </label>
            )}

            <div className="relative group flex-grow flex flex-col">
                <textarea
                    {...props}
                    {...field}
                    rows={rows}
                    placeholder={placeholder}
                    className={twMerge(clsx(
                        `w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 
                        text-white placeholder-white/30 focus:outline-none focus:border-santa-red/50 focus:ring-2 focus:ring-santa-red/20 
                        transition-all duration-300 backdrop-blur-md resize-none flex-grow`,
                        meta.touched && meta.error ? "border-red-500/50 bg-red-500/5" : "hover:bg-white/10"
                    ))}
                />
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

export default TextArea;

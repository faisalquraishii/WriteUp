import React from "react";

//Reusable component --> used in Login and Signup components
export default function Button({
    children,//It's just a practice. We could also name it 'text'.
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        /*className sent by the user will be injected as well as the bgColor and textColor.
        Also additional attributes will be catched by props */
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}
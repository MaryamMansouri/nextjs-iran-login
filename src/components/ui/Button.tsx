"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`w-full py-2 rounded-lg transition ${
        props.disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

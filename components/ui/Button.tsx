"use client";

import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary";
  pendingLabel?: string;
}

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
};

export function Button({ variant = "primary", pendingLabel, children, disabled, ...props }: ButtonProps) {
  const { pending } = useFormStatus();
  const isDisabled = disabled || pending;
  return (
    <button
      disabled={isDisabled}
      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]}`}
      {...props}
    >
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}

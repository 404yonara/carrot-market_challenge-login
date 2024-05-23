"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="h-10 primary-btn disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed "
    >
      {pending ? <span className="text-slate-400">Loading...</span> : text}
    </button>
  );
};

export default Button;

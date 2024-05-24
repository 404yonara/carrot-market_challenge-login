"use client";

import FormInput from "@/components/input";
import FormButton from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";
import { useEffect, useState } from "react";

const Login = () => {
  const [state, dispatch] = useFormState(handleForm, null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!state) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);
  return (
    <div className="flex flex-col gap-10 px-6 pt-36 pb-8">
      <form action={dispatch} className="flex flex-col gap-4">
        <FormInput
          name="email"
          type="email"
          required
          placeholder="Email"
          kind="Email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="username"
          type="string"
          required
          placeholder="Username"
          kind="Username"
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="password"
          type="password"
          required
          placeholder="Password"
          kind="Password"
          errors={state?.fieldErrors.password}
        />
        <FormButton text="Log in" />
      </form>
      {showSuccessMessage && (
        <div className="flex items-center p-4 gap-3 text-white bg-green-600 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>로그인에 성공하셨습니다!</span>
        </div>
      )}
    </div>
  );
};

export default Login;

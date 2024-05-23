"use server";

import { redirect } from "next/navigation";

export const handleForm = async (previousState: any, data: FormData) => {
  console.log(previousState);
  console.log(data.get("password"));
  if (data.get("password") !== "12345") {
    return {
      errors: ["wrong password"],
    };
  } else
    return {
      success: true,
    };
};

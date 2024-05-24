"use server";

import { redirect } from "next/navigation";
import z from "zod";

const zodEmailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/);

const formSchema = z.object({
  email: z.string().regex(zodEmailRegex, "only @zod.com is allowed"),
  username: z.string().min(5, "username is too short, at least 5chars needed"),
  password: z
    .string()
    .min(10)
    .regex(/\d/, "Password must contain at least one number"),
});

export const handleForm = async (previousState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    return null;
  }
};

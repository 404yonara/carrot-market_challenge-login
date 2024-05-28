"use server";

import { redirect } from "next/navigation";
import z from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";

const zodEmailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/);

const formSchema = z.object({
  email: z.string().regex(zodEmailRegex, "only @zod.com is allowed"),
  password: z
    .string()
    .min(10)
    .regex(/\d/, "Password must contain at least one number"),
});

export const login = async (previousState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          email: [],
          password: ["Wrong password."],
        },
      };
    }
  }
};

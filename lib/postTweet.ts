"use server";

import getSession from "@/lib/session";
import { redirect, useRouter } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";

const productSchema = z.object({
  tweet: z.string({
    required_error: "최소 한 글자 이상 적어주세요",
  }),
});

export async function postTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/tweets/${tweet.id}`);
    }
  }
}

"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      Like: true,
      created_at: true,
      id: true,
    },
    skip: 1,
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  console.log(tweet);
  return tweet;
}

export async function getTweetLikesCount(id: number) {
  const likesCount = await db.like.count({
    where: {
      tweetId: id,
    },
  });
  return likesCount;
}

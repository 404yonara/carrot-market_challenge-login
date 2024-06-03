import { AddTweet } from "@/lib/addTweet";
import db from "@/lib/db";
import TabBar from "@/lib/tab-bar";
import TweetList from "@/lib/tweet-list";
import { PlusIcon, UserIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

export async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      tweet: true,
      Like: true,
      created_at: true,
      id: true,
      user: {
        select: {
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Products() {
  const initialTweets = await getInitialTweets();
  console.log(initialTweets);
  return (
    <div className="flex flex-col py-5 px-3 gap-5">
      <AddTweet />
      <TweetList initialTweets={initialTweets} />
      <Link
        href="/profile"
        className="fixed flex items-center justify-center text-white transition-colors bg-orange-500 rounded-full size-16 bottom-24 right-8 hover:bg-orange-400"
      >
        <UserIcon className="h-10" />
      </Link>
    </div>
  );
}

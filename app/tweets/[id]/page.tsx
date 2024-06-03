import { notFound, redirect } from "next/navigation";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { getTweet, getTweetLikesCount } from "./action";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const deleteTweet = async () => {
    "use server";
    await db.tweet.delete({
      where: {
        id: id,
      },
    });
    redirect("/");
  };

  const isOwner = await getIsOwner(tweet.userId);
  return (
    <div className="flex p-5">
      <div className="flex flex-col gap-1 *:text-black">
        <div className="flex items-center gap-4">
          <span className="text-lg ">{tweet.user.username}</span>
          <span className="text-slate-500">
            {formatToTimeAgo(tweet.created_at.toString())}
          </span>
        </div>
        <span className="text-sm text-neutral-500">{tweet.tweet}</span>
      </div>
      <Link
        href="/"
        className="fixed flex items-center justify-center text-white transition-colors bg-orange-500 rounded-full size-16 bottom-24 right-8 hover:bg-orange-400"
      >
        <HomeIcon className="h-10" />
      </Link>
    </div>
  );
}

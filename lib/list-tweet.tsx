import Image from "next/image";
import Link from "next/link";
import { formatToTimeAgo } from "./utils";
import { getTweetLikesCount } from "@/app/tweets/[id]/action";

interface ListTweetProps {
  user: { username: string };
  created_at: Date;
  tweet: string;
  id: number;
}

export default function ListTweet({
  user: { username },
  created_at,
  tweet,
  id,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`} className="flex gap-5">
      <div className="flex flex-col gap-1 *:text-black">
        <div className="flex items-center gap-4">
          <span className="text-lg ">{username}</span>
          <span className="text-slate-500">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
        <span className="text-sm text-neutral-500">{tweet}</span>
      </div>
    </Link>
  );
}

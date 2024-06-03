"use client";

import { useEffect, useRef, useState } from "react";
import { InitialTweets } from "@/app/page";
import { getMoreTweets } from "@/app/tweets/[id]/action";
import ListTweet from "./list-tweet";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/solid";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  // const onLoadMoreClick = async () => {
  //   setIsLoading(true);
  //   const newTweets = await getMoreTweets(page + 1);
  //   if (newTweets.length !== 0) {
  //     setPage((prev) => prev + 1);
  //     setTweets((prev) => [...prev, ...newTweets]);
  //   } else {
  //     setIsLastPage(true);
  //   }
  //   setIsLoading(false);
  // };
  // const onBackClick = async () => {};
  // const onFrontClick = async () => {};
  return (
    <div className="flex flex-col gap-10">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      {/* <div className="flex items-center">
        <button
          onClick={onBackClick}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto p-4 rounded-lg hover:opacity-90 active:scale-95"
        >
          {isLoading ? (
            <div>로딩 중</div>
          ) : (
            <ArrowLongLeftIcon className=" size-5" />
          )}
        </button>
        <button
          onClick={onFrontClick}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto p-4 rounded-lg hover:opacity-90 active:scale-95"
        >
          {isLoading ? (
            <div>로딩 중</div>
          ) : (
            <ArrowLongRightIcon className=" size-5" />
          )}
        </button>
      </div> */}
    </div>
  );
}

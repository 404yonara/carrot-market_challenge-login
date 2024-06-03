"use client";

import { useFormState } from "react-dom";
import { postTweet } from "./postTweet";
import Button from "@/components/button";

export function AddTweet() {
  const [state, action] = useFormState(postTweet, null);
  return (
    <div>
      <form action={action} className="flex flex-col gap-4">
        <textarea
          name="tweet"
          required
          rows={5}
          placeholder="What is happening?!"
        />
        <Button text="Post" />
      </form>
    </div>
  );
}

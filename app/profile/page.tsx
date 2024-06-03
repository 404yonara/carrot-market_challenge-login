import getSession from "@/lib/session";
import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import Button from "@/components/button";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/solid";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="w-full mb-10 text-2xl font-bold">Profile</h1>
      <div className="flex flex-col w-full gap-3 px-5 pt-3 pb-5 mb-10 bg-vin-oat rounded-xl">
        <div className="flex flex-col gap-1 ">
          <h3 className="text-lg font-semibold">Username</h3>
          <div className="px-2 py-1 rounded-lg bg-vin-pale">
            {user.username}
          </div>
        </div>
        <div className="flex flex-col gap-1 ">
          <h3 className="text-lg font-semibold">email</h3>
          <div className="px-2 py-1 rounded-lg bg-vin-pale">{user.email}</div>
        </div>
      </div>

      <form className="flex w-full" action={logOut}>
        <Button text="Log Out" />
      </form>
      <Link
        href="/"
        className="fixed flex items-center justify-center text-white transition-colors bg-orange-500 rounded-full size-16 bottom-24 right-8 hover:bg-orange-400"
      >
        <HomeIcon className="h-10" />
      </Link>
    </div>
  );
}

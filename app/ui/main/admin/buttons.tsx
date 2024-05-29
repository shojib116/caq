"use client";

import { deleteUser } from "@/app/lib/action";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTransition } from "react";

export function AuthorizeNewUser() {
  return (
    <Link
      href="/admin/authorize-user"
      className="flex w-fit my-4 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Authorize New User</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UserDeleteButton({
  userID,
  sessionUserID,
}: {
  userID: string;
  sessionUserID: string;
}) {
  const [pending, startTransition] = useTransition();
  const deleteUserWithID = deleteUser.bind(null, userID);
  return (
    <form
      action={() => {
        startTransition(() => {
          deleteUserWithID();
        });
      }}
    >
      <button type="submit" disabled={userID === sessionUserID || pending}>
        <TrashIcon className="w-4 text-red-500" />
      </button>
    </form>
  );
}

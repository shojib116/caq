import { PlusIcon } from "@heroicons/react/24/outline";
import { User } from "@prisma/client";
import Link from "next/link";
import UsersList from "./users-list";
import { AuthorizeNewUser } from "./buttons";

export default function AdminPage({ usersList }: { usersList: User[] }) {
  return (
    <div>
      <AuthorizeNewUser />
      <UsersList usersList={usersList} />
    </div>
  );
}

import { fetchUsers } from "@/app/lib/data";
import AdminPage from "@/app/ui/main/admin/admin-page";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const users = await fetchUsers();
  const session = await auth();

  if (!session?.user) await signIn();

  if (session?.user.role !== "admin") redirect("/matrix");

  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Admin Control Page</h1>
      </div>
      <AdminPage usersList={users} />
    </div>
  );
}

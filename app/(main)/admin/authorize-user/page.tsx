import AuthorizeUser from "@/app/ui/main/admin/authotize-user";
import Breadcrumbs from "@/app/ui/main/subjects/breadcrumbs";
import { auth, signIn } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Authorize User | CAQ",
};

export default async function AuthorizeUserPage() {
  const session = await auth();

  if (!session?.user) await signIn();

  if (session?.user.role !== "admin") redirect("/matrix");
  return (
    <div>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Admin Control Page", href: "/admin" },
            {
              label: "Authorize New User",
              href: "/admin/authorize-user",
              active: true,
            },
          ]}
        />
      </div>
      <div>
        <AuthorizeUser />
      </div>
    </div>
  );
}

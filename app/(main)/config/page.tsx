import { fetchHeader } from "@/app/lib/data";
import ConfigPage from "@/app/ui/main/config/config-page";
import { auth, signIn } from "@/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Print Page Configuration | CAQ",
};

export default async function Page() {
  const session = await auth();
  if (!session?.user) await signIn();
  if (session?.user.role !== "admin") redirect("/matrix");
  const headerData = await fetchHeader();
  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Print Configuration</h1>
      </div>
      <ConfigPage headerData={headerData} />
    </div>
  );
}

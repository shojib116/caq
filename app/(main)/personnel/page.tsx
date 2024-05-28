import AddNewPersonnel from "@/app/ui/main/personnel/add-personnel";
import PersonnelList from "@/app/ui/main/personnel/personnel-list";
import { auth, signIn } from "@/auth";

export default async function Page() {
  const session = await auth();
  if (!session?.user) await signIn();
  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Personnel List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 w-full">
        <AddNewPersonnel />
      </div>
      <PersonnelList />
    </div>
  );
}

import { AddNewPersonnel } from "@/app/ui/main/personnel/buttons";
import PersonnelList from "@/app/ui/main/personnel/personnel-list";

export default function Page() {
  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Personnel List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddNewPersonnel />
      </div>
      <PersonnelList />
    </div>
  );
}

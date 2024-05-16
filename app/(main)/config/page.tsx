import { fetchHeader } from "@/app/lib/data";
import ConfigPage from "@/app/ui/main/config/config-page";

export default async function Page() {
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

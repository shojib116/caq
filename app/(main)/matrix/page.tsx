import SubjectMatrixTable from "@/app/ui/main/matrix/table";

export default function Page({
  searchParams,
}: {
  searchParams: { personnel?: string };
}) {
  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Subject Matrix</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SubjectMatrixTable searchParams={searchParams} />
      </div>
    </div>
  );
}

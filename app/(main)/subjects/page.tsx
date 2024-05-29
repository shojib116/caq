import { AddNewSubject, SubjectPerPage } from "@/app/ui/main/subjects/buttons";
import Pagination from "@/app/ui/main/subjects/pagination";
import SubjectList from "@/app/ui/main/subjects/subject-list";
import { fetchSubjectCount } from "@/app/lib/data";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: { show?: string; page?: string };
}) {
  const session = await auth();
  if (!session?.user) await signIn();
  if (session?.user.role !== "admin") redirect("/matrix");
  const subjectCount = await fetchSubjectCount();
  const showSubjects = Number(searchParams?.show) || 5;
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Subject List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <AddNewSubject />
        <SubjectPerPage />
      </div>
      <SubjectList currentPage={currentPage} showCount={showSubjects} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination subjectCount={subjectCount} />
      </div>
    </div>
  );
}

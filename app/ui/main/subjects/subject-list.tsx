import { fetchSubjectsPagination } from "@/app/lib/data";
import { Subject } from "@prisma/client";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import SubjectListItem from "./subject-list-item";
import { ResponseSubject } from "@/app/lib/definitions";

export default async function SubjectList({
  currentPage,
  showCount,
}: {
  currentPage: number;
  showCount: number;
}) {
  const data: ResponseSubject[] | null = await fetchSubjectsPagination(
    currentPage,
    showCount
  );
  let index = (currentPage - 1) * showCount;
  return (
    <div className="my-4 bg-gray-100 rounded-xl p-2 flex flex-col gap-2">
      {data.map((subject) => {
        index++;
        return (
          <SubjectListItem index={index} subject={subject} key={subject.id} />
        );
      })}
    </div>
  );
}

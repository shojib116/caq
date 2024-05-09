import { fetchSubjectsPagination, fetchPersonnel } from "@/app/lib/data";
import { Personnel, Subject } from "@prisma/client";
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
  const personnelData: Personnel[] | null = await fetchPersonnel();
  const sortedPersonnelData = personnelData.sort((a, b) =>
    a.designation.localeCompare(b.designation)
  );

  let index = (currentPage - 1) * showCount;
  return (
    <table className="my-4 border-collapse bg-gray-100 rounded-xl p-2 table-fixed w-full">
      <tbody>
        {data.map((subject) => {
          index++;
          return (
            <SubjectListItem
              index={index}
              subject={subject}
              key={subject.id}
              personnelData={sortedPersonnelData}
            />
          );
        })}
      </tbody>
    </table>
  );
}

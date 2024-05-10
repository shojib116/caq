import { fetchSubjectsPagination, fetchPersonnel } from "@/app/lib/data";
import { Personnel, Subject } from "@prisma/client";
import SubjectListItem from "./subject-list-item";

export default async function SubjectList({
  currentPage,
  showCount,
}: {
  currentPage: number;
  showCount: number;
}) {
  const data: Subject[] | null = await fetchSubjectsPagination(
    currentPage,
    showCount
  );
  const personnelData: Personnel[] | null = await fetchPersonnel();
  const sortedPersonnelData = personnelData.sort((a, b) =>
    a.designation.localeCompare(b.designation)
  );

  let index = (currentPage - 1) * showCount;
  return (
    <table className="my-4 bg-gray-100 rounded-lg p-2 w-full border-separate">
      <thead>
        <tr className="px-4 py-1 bg-white rounded-lg">
          <th className="p-2 w-1/12 font-medium">Sl</th>
          <th className="text-left p-2 font-medium">Subject</th>
          <th className="p-2 w-3/12 font-medium">Applicability</th>
          <th className="p-2 pr-3 w-1/12 font-medium">Edit</th>
        </tr>
      </thead>
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

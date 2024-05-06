import PersonnelDropdown from "@/app/ui/main/matrix/personnel-dropdown";
import SubjectMatrixItem from "@/app/ui/main/matrix/subject-matrix-item";

const subjectData = [
  {
    id: "101",
    text: "Subject 1",
  },
  {
    id: "102",
    text: "Subject 2",
  },
  {
    id: "103",
    text: "Subject 3",
  },
  {
    id: "104",
    text: "Subject 4",
  },
];

const personnelData = [
  { designation: "Aircraft Mechanic", id: "kdfjkds" },
  { designation: "Shop Personnel", id: "kdfjkdc" },
  { designation: "Aircraft Engineer", id: "kdfjkde" },
];

export const knowHowData = [
  {
    id: "201",
    personnelId: "kdfjkds",
    subjectId: "101",
    level: 0,
  },
  {
    id: "202",
    personnelId: "kdfjkds",
    subjectId: "102",
    level: 1,
  },
  {
    id: "203",
    personnelId: "kdfjkds",
    subjectId: "103",
    level: 3,
  },
  {
    id: "204",
    personnelId: "kdfjkde",
    subjectId: "104",
    level: 2,
  },
];

export default function SubjectMatrixTable({
  searchParams,
}: {
  searchParams: { personnel?: string };
}) {
  let knowHowForCurrentPersonnel: {
    id: string;
    personnelId: string;
    subjectId: string;
    level: number;
  }[];
  if (searchParams.personnel) {
    const currentPersonnel = personnelData.filter(
      (personnel) => personnel.designation === searchParams.personnel
    );
    knowHowForCurrentPersonnel = knowHowData.filter(
      (knowhow) => knowhow.personnelId === currentPersonnel[0].id
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b-4 border-b-black">
          <th className="text-left p-2 w-2/3 font-medium">Personnel:</th>
          <th className="text-left font-medium">
            <PersonnelDropdown personnelList={personnelData} />
          </th>
        </tr>
        <tr>
          <th className="border-4 bg-gray-100 border-white p-2 font-medium">
            Subject
          </th>
          <th className="border-4 bg-gray-100 border-white p-2 font-medium">
            Knowledge Level
          </th>
        </tr>
      </thead>

      <tbody>
        {subjectData.map((subject) => {
          return (
            <SubjectMatrixItem
              key={subject.id}
              subject={subject}
              knowHowData={knowHowForCurrentPersonnel}
            />
          );
        })}
      </tbody>
    </table>
  );
}

"use client";

import { Subject } from "@prisma/client";
import KnowhowDropdown from "./knowhow-dropdown";

export default function SubjectMatrixItem({
  subject,
  knowHowData,
}: {
  subject: Subject;
  knowHowData: {
    id: string;
    personnelId: string;
    subjectId: string;
    level: number;
  }[];
}) {
  let knowHow: string;

  if (knowHowData) {
    const filteredKnowHowData = knowHowData.filter(
      (knowHowItem) => knowHowItem.subjectId === subject.id
    );

    if (filteredKnowHowData.length === 0) {
      knowHow = "notSelected";
    } else {
      knowHow = filteredKnowHowData[0].level.toString();
    }
  } else {
    knowHow = "notSelected";
  }

  return (
    <tr>
      <td className="border-4 bg-gray-100 border-white p-2">{subject.text}</td>
      <td className="border-4 bg-gray-100 border-white p-2 text-center">
        <KnowhowDropdown knowHow={knowHow} />
      </td>
    </tr>
  );
}

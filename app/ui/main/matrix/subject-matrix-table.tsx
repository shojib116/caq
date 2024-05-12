import { Personnel } from "@prisma/client";

export default function SubjectMatrixTable({
  subjectMatrixArray,
  personnelData,
}: {
  subjectMatrixArray: { text: string; applicability: string[] }[];
  personnelData: Personnel[];
}) {
  return (
    <table className="w-full">
      <tbody>
        <tr>
          <td className="border-2 border-gray-600 p-2 font-semibold text-center">
            Subject
          </td>
          {personnelData.map((personnel) => {
            return (
              <td
                className="border-2 border-gray-600 p-2 font-medium max-h-48 text-center [writing-mode:vertical-rl] rotate-180"
                key={personnel.id}
              >
                {personnel.designation}
              </td>
            );
          })}
        </tr>
        {subjectMatrixArray.map((subject) => {
          return (
            <tr key={subject.text}>
              <td className="border-2 border-gray-600 p-2 font-medium">
                {subject.text}
              </td>
              {subject.applicability.map((applicable, index) => {
                return (
                  <td
                    className="border-2 border-gray-600 p-2 text-center"
                    key={index}
                  >
                    {applicable}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

import { fetchPersonnel } from "@/app/lib/data";
import PersonnelListItem from "./personnel-list-item";
import { Personnel } from "@prisma/client";

export default async function PersonnelList() {
  let index = 0;
  const data: Personnel[] | null = await fetchPersonnel();

  return (
    <table className="my-4 bg-gray-100 rounded-xl p-2 w-full">
      <tbody>
        {data.length === 0 && (
          <tr>
            <td className="w-full text-center text-sm font-semibold py-4">
              Empty Personnel List
            </td>
          </tr>
        )}
        {data.map((personnel) => {
          index++;
          return (
            <PersonnelListItem
              index={index}
              personnel={personnel}
              key={personnel.id}
            />
          );
        })}
      </tbody>
    </table>
  );
}

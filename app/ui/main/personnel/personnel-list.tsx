import { fetchPersonnel } from "@/app/lib/data";
import PersonnelListItem from "./personnel-list-item";
import { Personnel } from "@prisma/client";

export default async function PersonnelList() {
  const data: Personnel[] | null = await fetchPersonnel();

  return (
    <table className="my-4 bg-gray-100 rounded-lg p-2 w-full border-separate">
      <thead>
        <tr className="px-4 py-1 bg-white rounded-lg">
          <td className="p-2 font-medium text-center w-1/12">Sl.</td>
          <td className="text-left p-2 font-medium">Designation</td>
          <td className="p-2 font-medium text-center w-1/12">Edit</td>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td
              className="w-full text-center text-sm font-semibold py-4"
              colSpan={3}
            >
              Empty Personnel List
            </td>
          </tr>
        )}
        {data.map((personnel) => {
          return <PersonnelListItem personnel={personnel} key={personnel.id} />;
        })}
      </tbody>
    </table>
  );
}

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Personnel } from "@prisma/client";

export default function PersonnelDropdown({
  personnelData,
  handleTopTableChange,
}: {
  personnelData: Personnel[];
  handleTopTableChange: (field: string, value: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  function handleSelect(designation: string) {
    const params = new URLSearchParams(searchParams);
    if (designation === "") {
      params.delete("designation");
    } else {
      params.set("designation", designation);
    }

    replace(`${pathname}?${params}`);
    refresh();
  }

  return (
    <table className="w-full border-2 border-gray-600">
      <tbody>
        <tr>
          <td className="border-2 border-gray-600 p-1">
            <label className="font-medium" htmlFor="designation">
              Designation:{" "}
            </label>
          </td>
          <td className="border-2 border-gray-600 p-1" colSpan={3}>
            <select
              name="designation"
              id="designation"
              defaultValue={searchParams.get("designation") || ""}
              onChange={(e) => handleSelect(e.target.value)}
              className="border-2 border-gray-500 w-fit rounded max-w-8/12"
            >
              <option value="">Select a personnel</option>
              {personnelData.map((personnel) => {
                return (
                  <option key={personnel.id} value={personnel.designation}>
                    {personnel.designation}
                  </option>
                );
              })}
            </select>
          </td>
        </tr>
        <tr>
          <td className="border-2 border-gray-600 p-1">
            <label htmlFor="staff-name">Name:</label>
          </td>
          <td className="border-2 border-gray-600 p-1" colSpan={3}>
            <input
              type="text"
              name="staff-name"
              id="staff-name"
              className="pl-2 w-full"
              onChange={(e) => handleTopTableChange("name", e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td className="border-2 border-gray-600 p-1">
            <label htmlFor="staff-id">Staff ID:</label>
          </td>
          <td className="border-2 border-gray-600 p-1">
            <input
              type="text"
              name="staff-id"
              id="staff-id"
              className="pl-2 w-full"
              onChange={(e) => handleTopTableChange("staffID", e.target.value)}
            />
          </td>
          <td className="border-2 border-gray-600 p-1">
            <label htmlFor="date">Date:</label>
          </td>
          <td className="border-2 border-gray-600 p-1">
            <input
              type="date"
              name="date"
              id="date"
              onChange={(e) => handleTopTableChange("date", e.target.value)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

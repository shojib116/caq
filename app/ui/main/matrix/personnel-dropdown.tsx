"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PersonnelDropdown({
  personnelList,
}: {
  personnelList: { id: string; designation: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const router = useRouter();

  function handleDropdown(value: string) {
    if (value === "select") {
      params.delete("personnel");
    } else {
      params.set("personnel", value);
    }
    router.replace(`${pathname}?${params.toString()}`);
    window.location.href = `${pathname}?${params.toString()}`;
  }

  return (
    <select
      name="personnel"
      id="personnel"
      onChange={(e) => handleDropdown(e.target.value)}
      defaultValue={searchParams.get("personnel") || "select"}
    >
      <option value="select">Select an option</option>
      {personnelList.map((personnel) => {
        return (
          <option value={personnel.designation} key={personnel.id}>
            {personnel.designation}
          </option>
        );
      })}
    </select>
  );
}

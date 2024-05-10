"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SubjectListDropdown({
  subjectData,
}: {
  subjectData: { text: string; id: string }[];
}) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();
  const handleSearchParams = (subjectID: string) => {
    const params = new URLSearchParams(searchParams);
    if (subjectID) {
      params.set("subjectID", subjectID);
    } else {
      params.delete("subjectID");
    }

    replace(`${pathName}?${params}`);
    refresh();
  };

  return (
    <div className="flex flex-row justify-between w-full">
      <label>Subject:</label>
      <select
        name="subject-list"
        id="subject-list"
        className="max-w-9/12 border border-gray-500 rounded"
        defaultValue={searchParams.get("subjectID") || ""}
        onChange={(e) => handleSearchParams(e.target.value)}
      >
        <option value="">Select a Subject</option>
        {subjectData.map((subject) => {
          return (
            <option value={subject.id} key={subject.id}>
              {subject.text}
            </option>
          );
        })}
      </select>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Personnel } from "@prisma/client";
import PersonnelCheckbox from "@/app/ui/main/subjects/personnel-checkbox";
import { CheckedItems } from "@/app/lib/definitions";
import { addSubject } from "@/app/lib/action";
import { redirect } from "next/navigation";

export default function AddSubject({
  personnelData,
}: {
  personnelData: Personnel[];
}) {
  const [subject, setSubject] = useState<string>("");
  const [checkedItems, setCheckedItems] = useState<CheckedItems>(
    personnelData.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );
  const checkboxClass = "my-2 ml-1 text-sm";

  const handleSubmit = () => {
    const personnelIDs = Object.keys(checkedItems);
    const checkedPersonnelIDs = personnelIDs.filter(
      (id) => checkedItems[id] === true
    );

    if (!subject || !checkedPersonnelIDs.length) return;

    addSubject(subject, checkedPersonnelIDs);
    redirect("/subjects");
  };

  return (
    <form>
      <div className="flex flex-col">
        <div className="mb-5">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            onChange={(e) => setSubject(e.target.value)}
            required
            className="peer block w-11/12 rounded-md border border-gray-400 mt-2 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="checkbox">Applicable Personnel</label>
          <PersonnelCheckbox
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            personnelData={personnelData}
            className={checkboxClass}
          />
        </div>
        <button
          type="button"
          className="flex h-10 w-min items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={(e) => {
            e.preventDefault;
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

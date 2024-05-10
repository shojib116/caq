"use client";

import { CheckedItems } from "@/app/lib/definitions";
import { Personnel } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function PersonnelCheckbox({
  checkedItems,
  personnelData,
  setCheckedItems,
  className,
}: {
  checkedItems: CheckedItems;
  personnelData: Personnel[];
  setCheckedItems: (data: CheckedItems) => void;
  className: string;
}) {
  const [checkAllPersonnel, setCheckAllPersonnel] = useState<boolean>(false);

  useEffect(() => {
    for (const key of Object.keys(checkedItems)) {
      if (!checkedItems[key]) {
        setCheckAllPersonnel(false);
        return;
      }
      setCheckAllPersonnel(true);
    }
  }, [checkedItems]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "all-personnel") {
      if (event.target.checked) {
        setCheckAllPersonnel(true);
        setCheckedItems(
          personnelData.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
        );
      } else {
        setCheckAllPersonnel(false);
        setCheckedItems(
          personnelData.reduce(
            (acc, item) => ({ ...acc, [item.id]: false }),
            {}
          )
        );
      }
    } else {
      setCheckedItems({
        ...checkedItems,
        [event.target.id]: event.target.checked,
      });
    }
  };
  //"absolute border rounded bg-white min-w-max p-2 text-xs right-0 mx-2 my-1 flex flex-col gap-1 text-left max-h-28 overflow-y-auto overflow-x-hidden z-50"
  return (
    <ul className={className}>
      <li className="flex flex-row gap-1.5">
        <input
          type="checkbox"
          name="all-personnel"
          id="all-personnel"
          checked={checkAllPersonnel}
          onChange={handleCheckboxChange}
        />
        <p> All Personnel</p>
      </li>
      {personnelData.map((item) => (
        <li className="flex flex-row gap-1.5" key={item.id}>
          <input
            type="checkbox"
            name={item.designation}
            id={item.id}
            checked={checkedItems[item.id]}
            onChange={handleCheckboxChange}
          />
          <p>{item.designation}</p>
        </li>
      ))}
    </ul>
  );
}

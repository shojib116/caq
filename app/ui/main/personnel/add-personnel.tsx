"use client";

import { useState, useTransition } from "react";
import { AddNewPersonnelButton } from "./buttons";
import { addPersonnel } from "@/app/lib/action";

export default function AddNewPersonnel() {
  const [isPending, startTransition] = useTransition();
  const [showAddPersonnelInput, setShowAddPersonnelInput] =
    useState<boolean>(false);
  const [personnelDesignation, setPersonnelDesignation] = useState<string>();

  function handleSubmit() {
    if (!personnelDesignation) return;
    startTransition(() => {
      addPersonnel(personnelDesignation);
    });
    setShowAddPersonnelInput(false);
  }

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <AddNewPersonnelButton personnelInputStatus={setShowAddPersonnelInput} />
      {showAddPersonnelInput && (
        <div className="flex flex-row gap-2">
          <input
            type="text"
            className="border-2 border-gray-700 rounded pl-2 mr-4 text-sm"
            onChange={(e) => setPersonnelDesignation(e.target.value)}
          />
          <button
            type="submit"
            className="border-2 border-gray-700 text-sm font-medium p-1 rounded bg-blue-500 text-white"
            onClick={handleSubmit}
            disabled={isPending}
          >
            Submit
          </button>
          <button
            type="button"
            className="border-2 border-gray-700 text-sm font-medium p-1 rounded bg-red-500 text-white cursor-pointer"
            onClick={(e) => {
              setShowAddPersonnelInput(false);
              setPersonnelDesignation("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

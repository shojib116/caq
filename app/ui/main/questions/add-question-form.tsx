"use client";

import { useState } from "react";
import { addQuestion } from "@/app/lib/action";
import { CheckedItems } from "@/app/lib/definitions";
import {
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import PersonnelCheckbox from "@/app/ui/main/subjects/personnel-checkbox";
import { Personnel } from "@prisma/client";

export default function AddQuestionForm({
  personnelData,
  subjectID,
  questionFormStatus,
}: {
  personnelData: Personnel[];
  subjectID: string;
  questionFormStatus: (status: boolean) => void;
}) {
  const [question, setQuestion] = useState<string>();
  const [level, setLevel] = useState<number>(1);
  const [showCheckBox, setShowCheckBox] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>(
    personnelData.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const addQuestionWithSubjectId = addQuestion.bind(null, subjectID);

  const handleSubmit = () => {
    const personnelIDs = Object.keys(checkedItems);
    const checkedPersonnelIDs = personnelIDs.filter(
      (id) => checkedItems[id] === true
    );
    if (!question || !level || !checkedPersonnelIDs.length) return;

    addQuestionWithSubjectId(question, level, checkedPersonnelIDs);
    questionFormStatus(false);
  };
  const className =
    "absolute border rounded bg-white min-w-max p-2 text-xs right-0 mx-2 my-1 flex flex-col gap-1 text-left max-h-28 overflow-y-auto overflow-x-hidden z-50";
  return (
    <tr className="w-auto">
      <td className="p-2" colSpan={2}>
        <input
          type="text"
          name="question"
          id="question"
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-200 rounded pl-2 text-sm w-full"
          required
        />
      </td>
      <td className="text-center p-2">
        <select
          name="level"
          id="level"
          onChange={(e) => setLevel(Number(e.target.value))}
          defaultValue="1"
          className="border border-gray-200 rounded text-sm"
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </td>
      <td className="text-center p-2 relative">
        <span
          onClick={(e) => {
            setShowCheckBox(!showCheckBox);
          }}
          className="text-sm flex flex-row items-center gap-1 border rounded justify-center px-1 font-medium w-fit mx-auto"
        >
          Select Personnel <ChevronDownIcon className="w-3 h-3" />
        </span>
        {showCheckBox && (
          <PersonnelCheckbox
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            personnelData={personnelData}
            className={className}
          />
        )}
      </td>
      <td className="p-2">
        <div className="flex flex-row justify-center gap-2">
          <button onClick={handleSubmit}>
            <CheckIcon className="w-4 h-4 text-green-500" />
          </button>
          <button type="button" onClick={(e) => questionFormStatus(false)}>
            <XMarkIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
}

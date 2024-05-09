"use client";

import { useState } from "react";
import { addQuestion } from "@/app/lib/action";
import { CheckedItems, ResponseSubject } from "@/app/lib/definitions";
import {
  CheckIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import PersonnelCheckbox from "@/app/ui/main/subjects/personnel-checkbox";
import { Personnel } from "@prisma/client";

export default function AddQuestionForm({
  subject,
  personnelData,
  questionFormStatus,
}: {
  subject: ResponseSubject;
  personnelData: Personnel[];
  questionFormStatus: (status: boolean) => void;
}) {
  const [question, setQuestion] = useState<string>();
  const [level, setLevel] = useState<number>(1);
  const [showCheckBox, setShowCheckBox] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>(
    personnelData.reduce((acc, item) => ({ ...acc, [item.id]: false }), {})
  );

  const addQuestionWithSubjectId = addQuestion.bind(null, subject.id);

  const handleSubmit = () => {
    const personnelIDs = Object.keys(checkedItems);
    const checkedPersonnelIDs = personnelIDs.filter(
      (id) => checkedItems[id] === true
    );
    if (!question || !level || !checkedPersonnelIDs.length) return;

    addQuestionWithSubjectId(question, level, checkedPersonnelIDs);
    questionFormStatus(false);
  };
  return (
    <tr className="w-auto">
      <td className="p-2" colSpan={2}>
        <input
          type="text"
          name="question"
          id="question"
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-gray-200 rounded pl-2"
          required
        />
      </td>
      <td className="text-center p-2">
        <select
          name="level"
          id="level"
          onChange={(e) => setLevel(Number(e.target.value))}
          defaultValue="1"
          className="border border-gray-200 rounded text-xs"
          required
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </td>
      <td className="text-center p-2 relative">
        {!!personnelData.length && (
          <span
            onClick={(e) => {
              setShowCheckBox(!showCheckBox);
            }}
            className="text-xs flex flex-row items-center gap-1 border rounded justify-center px-1"
          >
            Select Personnel <ChevronDownIcon className="w-3 h-3" />
          </span>
        )}
        {!personnelData.length && (
          <span className="text-xs flex flex-row items-center gap-1 border rounded justify-center px-1">
            Add Some Personnel
          </span>
        )}
        {showCheckBox && (
          <PersonnelCheckbox
            checkedItems={checkedItems}
            setCheckedItems={setCheckedItems}
            personnelData={personnelData}
          />
        )}
      </td>
      <td className="text-right p-2 flex justify-end gap-2">
        <button onClick={handleSubmit}>
          <CheckIcon className="w-4 h-4 text-green-500" />
        </button>
        <button type="button" onClick={(e) => questionFormStatus(false)}>
          <XMarkIcon className="w-4 h-4 text-red-500" />
        </button>
      </td>
    </tr>
  );
}

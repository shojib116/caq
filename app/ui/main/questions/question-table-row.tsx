"use client";

import { useState, useTransition } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Personnel, Question } from "@prisma/client";
import { deleteQuestion, updateQuestion } from "@/app/lib/action";
import PersonnelCheckbox from "@/app/ui/main/subjects/personnel-checkbox";
import { CheckedItems } from "@/app/lib/definitions";

export default function QuestionTableRow({
  question,
  index,
  personnelData,
}: {
  question: Question;
  index: string;
  personnelData: Personnel[];
}) {
  const [showQuestionEditForm, setShowQuestionEditForm] =
    useState<boolean>(false);
  const [showDeleteQuestionPrompt, setShowDeleteQuestionPrompt] =
    useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<string>(question.text);
  const [newLevel, setNewLevel] = useState<number>(question.level);

  const personnels = getDesignations(question.personnelIDs, personnelData).join(
    ", "
  );

  return (
    <tr className="px-4 py-1 bg-white m-2 rounded-lg">
      {!showQuestionEditForm && !showDeleteQuestionPrompt && (
        <>
          <td className="p-2 text-center">{index}.</td>
          <td className="p-2 text-left">{question.text}</td>
          <td className="text-center p-2">{question.level}</td>
          <td className="text-center p-2">
            <div className="group relative inline-block">
              <InformationCircleIcon className="w-5 h-5 text-blue-400 mx-auto cursor-pointer group relative inline-block" />
              <span className="absolute hidden group-hover:flex -left-[5.35rem] -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                {personnels}
              </span>
            </div>
          </td>
          <td className="p-2">
            <div className="flex flex-row justify-center gap-2">
              <button onClick={(e) => setShowQuestionEditForm(true)}>
                <PencilIcon className="w-4 h-4" />
              </button>
              <button onClick={(e) => setShowDeleteQuestionPrompt(true)}>
                <TrashIcon className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </td>
        </>
      )}
      {showQuestionEditForm && (
        <QuestionEditForm
          question={question}
          index={index}
          personnelData={personnelData}
          setEditFormStatus={setShowQuestionEditForm}
          newQuestion={newQuestion}
          setNewQuestion={setNewQuestion}
          newLevel={newLevel}
          setNewLevel={setNewLevel}
        />
      )}
      {showDeleteQuestionPrompt && (
        <DeleteQuestionPrompt
          question={question}
          index={index}
          setDeletePromptStatus={setShowDeleteQuestionPrompt}
        />
      )}
    </tr>
  );
}

function QuestionEditForm({
  question,
  index,
  personnelData,
  setEditFormStatus,
  newQuestion,
  setNewQuestion,
  newLevel,
  setNewLevel,
}: {
  question: Question;
  index: string;
  personnelData: Personnel[];
  setEditFormStatus: (status: boolean) => void;
  newQuestion: string;
  setNewQuestion: (question: string) => void;
  newLevel: number;
  setNewLevel: (level: number) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [showCheckBox, setShowCheckBox] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>(
    personnelData.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: question.personnelIDs.indexOf(item.id) === -1 ? false : true,
      }),
      {}
    )
  );
  const handleSubmit = () => {
    const personnelIDs = Object.keys(checkedItems);
    const checkedPersonnelIDs = personnelIDs.filter(
      (id) => checkedItems[id] === true
    );

    if (!newQuestion || !checkedPersonnelIDs.length) return;
    startTransition(() => {
      updateQuestion(question.id, newQuestion, newLevel, checkedPersonnelIDs);
    });
    setEditFormStatus(false);
  };

  const className =
    "absolute border rounded bg-white min-w-max p-2 text-xs right-0 mx-2 my-1 flex flex-col gap-1 text-left max-h-28 overflow-y-auto overflow-x-hidden z-50";

  return (
    <>
      <td className="p-2 text-center">{index}.</td>
      <td className="p-2">
        <input
          type="text"
          name="question"
          id="question"
          defaultValue={question.text}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="border border-gray-200 rounded pl-2 text-sm w-full"
        />
      </td>
      <td className="text-center p-2">
        <select
          name="level"
          id="level"
          defaultValue={question.level}
          onChange={(e) => setNewLevel(Number(e.target.value))}
          className="border border-gray-200 rounded text-sm"
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
          className="bg-white text-sm flex flex-row items-center gap-1 border rounded justify-center px-1 font-medium w-fit mx-auto"
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
          <button type="button" onClick={handleSubmit} disabled={isPending}>
            <CheckIcon className="w-4 h-4 text-green-500" />
          </button>
          <button type="button" onClick={(e) => setEditFormStatus(false)}>
            <XMarkIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </td>
    </>
  );
}

function DeleteQuestionPrompt({
  question,
  index,
  setDeletePromptStatus,
}: {
  question: Question;
  index: string;
  setDeletePromptStatus: (status: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
      <td className="p-2 text-center">{index}.</td>
      <td className="text-red-500 p-2 w-min text-left" colSpan={3}>
        Are you sure you want to delete this question?
      </td>
      <td className="p-2">
        <div className="flex flex-row gap-2 justify-center">
          <button
            type="button"
            onClick={(e) =>
              startTransition(() => {
                deleteQuestion(question.id);
              })
            }
            disabled={isPending}
          >
            <CheckIcon className="w-4 h-4 text-red-500" />
          </button>
          <button type="button" onClick={(e) => setDeletePromptStatus(false)}>
            <XMarkIcon className="w-4 h-4 text-green-500" />
          </button>
        </div>
      </td>
    </>
  );
}

export function getDesignations(
  personnelIDs: string[],
  personnelData: Personnel[]
) {
  // Create a map to store ID-designation mappings
  const idToDesignation = new Map();
  personnelData.forEach((entry) => {
    idToDesignation.set(entry.id, entry.designation);
  });

  // Initialize an empty array to store designations
  const designations: string[] = [];

  // Iterate through personnelIDs and get the designation for each ID
  personnelIDs.forEach((personnelID) => {
    if (idToDesignation.has(personnelID)) {
      designations.push(idToDesignation.get(personnelID));
    } else {
      // Handle the case where an ID is not found in personnelData
      designations.push("Unknown");
    }
  });

  return designations;
}

"use client";

import { Personnel, Subject } from "@prisma/client";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";
import { deleteSubject, updateSubject } from "@/app/lib/action";
import { getDesignations } from "@/app/ui/main/questions/question-table-row";
import PersonnelCheckbox from "@/app/ui/main/subjects/personnel-checkbox";
import { CheckedItems } from "@/app/lib/definitions";

export default function SubjectListItem({
  index,
  subject,
  personnelData,
}: {
  index: number;
  subject: Subject;
  personnelData: Personnel[];
}) {
  const [editSubject, SetEditSubject] = useState<boolean>(false);
  const [deleteSubject, SetDeleteSubject] = useState<boolean>(false);

  const personnels = getDesignations(subject.personnelIDs, personnelData).join(
    ", "
  );

  return (
    <>
      <tr className="px-4 py-1 bg-white m-2 rounded-lg">
        <td className="p-2 text-center">{index}.</td>
        {!editSubject && !deleteSubject && (
          <>
            <td className="p-2">{subject.text}</td>
            <td className="p-2 text-center">
              <div className="group relative inline-block align-middle">
                <InformationCircleIcon className="w-5 h-5 text-blue-400 mx-auto" />
                <span className="absolute hidden group-hover:flex -left-[5.35rem] -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-xs after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
                  {personnels}
                </span>
              </div>
            </td>
            <td className="p-2">
              <div className="flex flex-row gap-2 justify-center">
                <EditButton
                  editStatus={editSubject}
                  setEditStatus={SetEditSubject}
                />
                <DeleteButton setDeleteStatus={SetDeleteSubject} />
              </div>
            </td>
          </>
        )}
        {editSubject && (
          <EditForm
            subject={subject}
            setEditStatus={SetEditSubject}
            personnelData={personnelData}
          />
        )}
        {deleteSubject && (
          <DeleteConfrimation
            subject={subject}
            setDeleteStatus={SetDeleteSubject}
          />
        )}
      </tr>
    </>
  );
}

function EditForm({
  subject,
  setEditStatus,
  personnelData,
}: {
  subject: Subject;
  setEditStatus: (status: boolean) => void;
  personnelData: Personnel[];
}) {
  const [isPending, startTransition] = useTransition();
  const [newSubject, setNewSubject] = useState<string>(subject.text);
  const [showCheckBox, setShowCheckBox] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>(
    personnelData.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: subject.personnelIDs.indexOf(item.id) === -1 ? false : true,
      }),
      {}
    )
  );

  const updateSubjectWithId = updateSubject.bind(null, subject.id);
  const handleSubmit = () => {
    const personnelIDs = Object.keys(checkedItems);
    const checkedPersonnelIDs = personnelIDs.filter(
      (id) => checkedItems[id] === true
    );
    if (!newSubject || !checkedPersonnelIDs.length) return;
    startTransition(() => {
      updateSubjectWithId(newSubject, checkedPersonnelIDs);
    });
    setEditStatus(false);
  };

  const className =
    "absolute border rounded bg-white min-w-max p-2 text-xs right-0 mx-2 my-1 flex flex-col gap-1 text-left max-h-28 overflow-y-auto overflow-x-hidden z-50";
  return (
    <>
      <td className="p-2">
        <input
          type="text"
          id="subject"
          name="subject"
          defaultValue={subject.text}
          onChange={(e) => setNewSubject(e.target.value)}
          required
          className="w-full border px-2 py-0.5 rounded border-gray-200 focus:border-blue-200"
        />
      </td>
      <td className="p-2 text-center relative">
        <span
          onClick={(e) => {
            setShowCheckBox(!showCheckBox);
          }}
          className="bg-white w-fit mx-auto text-sm flex flex-row items-center gap-1 border rounded justify-center p-1"
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
          <button
            type="button"
            onClick={(e) => {
              setEditStatus(false);
            }}
          >
            <XMarkIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </td>
    </>
  );
}

function DeleteConfrimation({
  subject,
  setDeleteStatus,
}: {
  subject: Subject;
  setDeleteStatus: (status: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const deleteSubjectWithId = deleteSubject.bind(null, subject.id);
  return (
    <>
      <td className="cursor-pointer p-2 text-red-500" colSpan={2}>
        Are you absolutely sure you want to delete this subject?
      </td>
      <td className="p-2">
        <div className="flex flex-row justify-center gap-2">
          <button
            type="submit"
            onClick={(e) => {
              startTransition(() => {
                deleteSubjectWithId();
              });
            }}
            disabled={isPending}
          >
            <CheckIcon className="w-4 h-4 text-red-500" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              setDeleteStatus(false);
            }}
          >
            <XMarkIcon className="w-4 h-4 text-green-500" />
          </button>
        </div>
      </td>
    </>
  );
}

function EditButton({
  editStatus,
  setEditStatus,
}: {
  editStatus: boolean;
  setEditStatus: (status: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        setEditStatus(!editStatus);
      }}
    >
      <PencilIcon className="w-4 h-4" />
    </button>
  );
}

function DeleteButton({
  setDeleteStatus,
}: {
  setDeleteStatus: (status: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        setDeleteStatus(true);
      }}
    >
      <TrashIcon className="w-4 h-4 text-red-600" />
    </button>
  );
}

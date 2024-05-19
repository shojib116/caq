"use client";

import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState, useTransition } from "react";
import { deletePersonnel, updatePersonnel } from "@/app/lib/action";
import { Personnel } from "@prisma/client";

export default function PersonnelListItem({
  personnel,
}: {
  personnel: Personnel;
}) {
  const [editPersonnel, SetEditPersonnel] = useState<boolean>(false);
  const [deletePersonnel, SetDeletePersonnel] = useState<boolean>(false);
  return (
    <>
      <tr className="px-4 py-1 bg-white rounded-lg">
        {!editPersonnel && !deletePersonnel && (
          <>
            <td className="p-2 w-1/12 text-center">{personnel.priority}. </td>

            <td className="p-2 w-10/12">{personnel.designation}</td>
            <td className="p-2 w-1/12">
              <div className="flex flex-row gap-2">
                <EditButton
                  editStatus={editPersonnel}
                  setEditStatus={SetEditPersonnel}
                />
                <DeleteButton setDeleteStatus={SetDeletePersonnel} />
              </div>
            </td>
          </>
        )}
        {editPersonnel && (
          <EditForm personnel={personnel} setEditStatus={SetEditPersonnel} />
        )}
        {deletePersonnel && (
          <DeleteConfrimation
            personnel={personnel}
            setDeleteStatus={SetDeletePersonnel}
          />
        )}
      </tr>
    </>
  );
}

function EditForm({
  personnel,
  setEditStatus,
}: {
  personnel: Personnel;
  setEditStatus: (status: boolean) => void;
}) {
  const [isPending, startTranstion] = useTransition();
  const [newDesignation, setNewDesignation] = useState<string>(
    personnel.designation
  );
  const [newPriority, setNewPriority] = useState<number>();

  const updatePersonneltWithId = updatePersonnel.bind(null, personnel.id);
  const handleSubmit = () => {
    if (newDesignation === "" || newPriority === undefined) return;
    if (newPriority < 1) return;
    if (
      newDesignation !== personnel.designation ||
      newPriority !== personnel.priority
    ) {
      startTranstion(() => {
        updatePersonneltWithId(newDesignation, personnel.priority, newPriority);
      });
    }
    setEditStatus(false);
  };
  return (
    <>
      <td className="p-1 w-1/12 text-center">
        <input
          type="number"
          id="priority"
          name="priority"
          defaultValue={personnel.priority}
          onChange={(e) => setNewPriority(Number(e.target.value))}
          required
          className="w-full border px-2 rounded border-gray-200 focus:border-blue-200"
        />
      </td>
      <td className="cursor-pointer p-2 w-10/12">
        <input
          type="text"
          id="subject"
          name="subject"
          defaultValue={personnel.designation}
          onChange={(e) => setNewDesignation(e.target.value)}
          required
          className="w-full border px-2 rounded border-gray-200 focus:border-blue-200"
        />
      </td>
      <td className="p-2 w-1/12">
        <div className="flex flex-row gap-2">
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
  personnel,
  setDeleteStatus,
}: {
  personnel: Personnel;
  setDeleteStatus: (status: boolean) => void;
}) {
  const [isPending, startTranstion] = useTransition();
  const deletePersonnelWithId = deletePersonnel.bind(null, personnel.id);
  return (
    <>
      <td className="p-2 w-1/12 text-center">{personnel.priority}.</td>
      <td className="cursor-pointer p-2 w-10/12 text-red-500">
        Are you absolutely sure you want to delete this Personnel?
      </td>
      <td className="w-1/12 p-2">
        <div className="flex flex-row gap-2">
          <button
            type="submit"
            onClick={(e) => {
              startTranstion(() => {
                deletePersonnelWithId();
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

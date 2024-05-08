"use client";

import { Subject } from "@prisma/client";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { string } from "zod";
import { deletePersonnel, updatePersonnel } from "@/app/lib/action";

type Personnel = {
  designation: string;
  id: string;
};

export default function PersonnelListItem({
  index,
  personnel,
}: {
  index: number;
  personnel: Personnel;
}) {
  const [editPersonnel, SetEditPersonnel] = useState<boolean>(false);
  const [deletePersonnel, SetDeletePersonnel] = useState<boolean>(false);
  return (
    <>
      <tr className="flex flex-row px-4 py-1 bg-white m-2 rounded-lg">
        <td className="cursor-pointer p-2 w-1/12 text-center justify-center flex gap-2 items-center">
          {index}.{" "}
        </td>
        {!editPersonnel && !deletePersonnel && (
          <>
            <td className="cursor-pointer p-2 w-10/12">
              {personnel.designation}
            </td>
            <td className="flex flex-row justify-center items-center gap-2 w-1/12 p-2">
              <EditButton
                editStatus={editPersonnel}
                setEditStatus={SetEditPersonnel}
              />
              <DeleteButton setDeleteStatus={SetDeletePersonnel} />
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
  const [newDesignation, setNewDesignation] = useState<string>(
    personnel.designation
  );
  const updatePersonneltWithId = updatePersonnel.bind(null, personnel.id);
  const handleSubmit = () => {
    if (!newDesignation) return;
    if (newDesignation !== personnel.designation) {
      updatePersonneltWithId(newDesignation);
    }
    setEditStatus(false);
  };
  return (
    <>
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
      <td className="flex flex-row justify-center items-center gap-2 w-1/12 p-2">
        <button type="button" onClick={handleSubmit}>
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
  const deletePersonnelWithId = deletePersonnel.bind(null, personnel.id);
  return (
    <>
      <td className="cursor-pointer p-2 w-10/12 text-red-500">
        Are you absolutely sure you want to delete this subject?
      </td>
      <td className="flex flex-row justify-center items-center gap-2 w-1/12 p-2">
        <button
          type="submit"
          onClick={(e) => {
            deletePersonnelWithId();
          }}
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
      onClick={(e) => {
        setDeleteStatus(true);
      }}
    >
      <TrashIcon className="w-4 h-4 text-red-600" />
    </button>
  );
}

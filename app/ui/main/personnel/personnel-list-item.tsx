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
    <div>
      <div className="flex gap-2 justify-between items-center bg-white p-4 rounded">
        {!deletePersonnel ? (
          <>
            <div className="flex grow w-max gap-4 items-center">
              {index}.{" "}
              {!editPersonnel ? (
                <p className="cursor-pointer text-left">
                  {personnel.designation}
                </p>
              ) : (
                <EditForm
                  personnel={personnel}
                  setEditStatus={SetEditPersonnel}
                />
              )}
            </div>
            <div className="flex gap-2">
              {!editPersonnel && (
                <>
                  <EditButton
                    editStatus={editPersonnel}
                    setEditStatus={SetEditPersonnel}
                  />
                  <DeleteButton setDeleteStatus={SetDeletePersonnel} />
                </>
              )}
            </div>
          </>
        ) : (
          <DeleteConfrimation
            personnel={personnel}
            setDeleteStatus={SetDeletePersonnel}
          />
        )}
      </div>
    </div>
  );
}

function EditForm({
  personnel,
  setEditStatus,
}: {
  personnel: Personnel;
  setEditStatus: (status: boolean) => void;
}) {
  const updatePersonnelWithId = updatePersonnel.bind(null, personnel.id);
  const handleSubmit = (formData: FormData) => {
    updatePersonnelWithId(formData);
    setEditStatus(false);
  };
  return (
    <form action={handleSubmit} className="flex gap-2">
      <input
        type="text"
        id="personnel"
        name="personnel"
        defaultValue={personnel.designation}
        required
        className="md:w-[40rem] w-96 border px-2 rounded border-gray-200 focus:border-blue-200"
      />
      <button
        type="submit"
        className="border border-black px-2 rounded text-sm font-semibold bg-green-600 text-white"
      >
        Save
      </button>
      <button
        type="button"
        onClick={(e) => {
          setEditStatus(false);
        }}
        className="border border-black px-2 rounded text-sm font-semibold bg-red-600 text-white"
      >
        Cancel
      </button>
    </form>
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
    <div className="flex gap-3 text-red-500">
      <p>Are you absolutely sure you want to delete this personnel?</p>
      <button
        type="submit"
        onClick={(e) => {
          deletePersonnelWithId();
        }}
        className="border border-black px-2 rounded text-sm font-semibold bg-red-600 text-white"
      >
        Yes
      </button>
      <button
        type="button"
        onClick={(e) => {
          setDeleteStatus(false);
        }}
        className="border border-black px-2 rounded text-sm font-semibold bg-green-600 text-white"
      >
        No
      </button>
    </div>
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

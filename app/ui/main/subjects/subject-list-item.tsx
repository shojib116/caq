"use client";

import { Personnel, Subject } from "@prisma/client";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteSubject, updateSubject } from "@/app/lib/action";

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

  return (
    <>
      <tr className="px-4 py-1 bg-white m-2 rounded-lg w-auto">
        <td className="p-2 text-center justify-center flex gap-2 items-center">
          {index}.
        </td>
        {!editSubject && !deleteSubject && (
          <>
            <td className="p-2">{subject.text}</td>
            <td className="p-2 text-center">Applicability</td>
            <td className="flex flex-row justify-center items-center gap-2 p-2">
              <EditButton
                editStatus={editSubject}
                setEditStatus={SetEditSubject}
              />
              <DeleteButton setDeleteStatus={SetDeleteSubject} />
            </td>
          </>
        )}
        {editSubject && (
          <EditForm subject={subject} setEditStatus={SetEditSubject} />
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
}: {
  subject: Subject;
  setEditStatus: (status: boolean) => void;
}) {
  const [newSubject, setNewSubject] = useState<string>(subject.text);
  const updateSubjectWithId = updateSubject.bind(null, subject.id);
  const handleSubmit = () => {
    if (!newSubject) return;
    if (newSubject !== subject.text) {
      updateSubjectWithId(newSubject);
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
          defaultValue={subject.text}
          onChange={(e) => setNewSubject(e.target.value)}
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
  subject,
  setDeleteStatus,
}: {
  subject: Subject;
  setDeleteStatus: (status: boolean) => void;
}) {
  const deleteSubjectWithId = deleteSubject.bind(null, subject.id);
  return (
    <>
      <td className="cursor-pointer p-2 w-10/12 text-red-500">
        Are you absolutely sure you want to delete this subject?
      </td>
      <td className="flex flex-row justify-center items-center gap-2 w-1/12 p-2">
        <button
          type="submit"
          onClick={(e) => {
            deleteSubjectWithId();
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

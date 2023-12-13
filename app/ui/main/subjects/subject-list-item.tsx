"use client";

import { Subject } from "@prisma/client";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteSubject, updateSubject } from "@/app/lib/action";
import QuestionTable from "./question-table";
import { ResponseSubject } from "@/app/lib/definitions";

export default function SubjectListItem({
  index,
  subject,
}: {
  index: number;
  subject: ResponseSubject;
}) {
  const [editSubject, SetEditSubject] = useState<boolean>(false);
  const [deleteSubject, SetDeleteSubject] = useState<boolean>(false);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  return (
    <div>
      <div className="flex justify-between items-center bg-white p-4 rounded">
        {!deleteSubject ? (
          <>
            <div className="flex grow w-max gap-4 items-center">
              {!showQuestions ? (
                <ChevronRightIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={(e) => setShowQuestions(!showQuestions)}
                />
              ) : (
                <ChevronDownIcon
                  className="w-4 h-4 cursor-pointer"
                  onClick={(e) => setShowQuestions(!showQuestions)}
                />
              )}
              <span
                className="w-4 cursor-pointer"
                onClick={(e) => setShowQuestions(!showQuestions)}
              >
                {index}.
              </span>
              {!editSubject ? (
                <p
                  className="cursor-pointer"
                  onClick={(e) => setShowQuestions(!showQuestions)}
                >
                  {subject.text}
                </p>
              ) : (
                <EditForm
                  subject={subject}
                  setEditStatus={SetEditSubject}
                  setShowQuestions={setShowQuestions}
                />
              )}
            </div>
            <div className="flex gap-2">
              {!editSubject && (
                <>
                  <EditButton
                    editStatus={editSubject}
                    setEditStatus={SetEditSubject}
                    setShowQuestions={setShowQuestions}
                  />
                  <DeleteButton
                    setDeleteStatus={SetDeleteSubject}
                    setShowQuestions={setShowQuestions}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <DeleteConfrimation
            subject={subject}
            setDeleteStatus={SetDeleteSubject}
            setShowQuestions={setShowQuestions}
          />
        )}
      </div>
      {showQuestions && !editSubject && !deleteSubject && (
        <QuestionTable subject={subject} />
      )}
    </div>
  );
}

function EditForm({
  subject,
  setEditStatus,
  setShowQuestions,
}: {
  subject: Subject;
  setEditStatus: (status: boolean) => void;
  setShowQuestions: (status: boolean) => void;
}) {
  const updateSubjectWithId = updateSubject.bind(null, subject.id);
  const handleSubmit = (formData: FormData) => {
    updateSubjectWithId(formData);
    setEditStatus(false);
    setShowQuestions(false);
  };
  return (
    <form action={handleSubmit} className="flex gap-2">
      <input
        type="text"
        id="subject"
        name="subject"
        defaultValue={subject.text}
        required
        className="md:w-[40rem] w-96 border px-2 rounded border-gray-200 focus:border-blue-200"
      />
      <button type="submit">
        <CheckIcon className="w-4 h-4 text-green-500" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          setEditStatus(false);
          setShowQuestions(false);
        }}
      >
        <XMarkIcon className="w-4 h-4 text-red-500" />
      </button>
    </form>
  );
}

function DeleteConfrimation({
  subject,
  setDeleteStatus,
  setShowQuestions,
}: {
  subject: Subject;
  setDeleteStatus: (status: boolean) => void;
  setShowQuestions: (status: boolean) => void;
}) {
  const deleteSubjectWithId = deleteSubject.bind(null, subject.id);
  return (
    <div className="flex gap-3 text-red-500">
      <p>Are you absolutely sure you want to delete this subject?</p>
      <button
        type="submit"
        onClick={(e) => {
          deleteSubjectWithId();
          setShowQuestions(false);
        }}
      >
        <CheckIcon className="w-4 h-4 text-red-500" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          setDeleteStatus(false);
          setShowQuestions(false);
        }}
      >
        <XMarkIcon className="w-4 h-4 text-green-500" />
      </button>
    </div>
  );
}

function EditButton({
  editStatus,
  setEditStatus,
  setShowQuestions,
}: {
  editStatus: boolean;
  setEditStatus: (status: boolean) => void;
  setShowQuestions: (status: boolean) => void;
}) {
  return (
    <button
      onClick={(e) => {
        setEditStatus(!editStatus);
        setShowQuestions(false);
      }}
    >
      <PencilIcon className="w-4 h-4" />
    </button>
  );
}

function DeleteButton({
  setDeleteStatus,
  setShowQuestions,
}: {
  setDeleteStatus: (status: boolean) => void;
  setShowQuestions: (status: boolean) => void;
}) {
  return (
    <button
      onClick={(e) => {
        setDeleteStatus(true);
        setShowQuestions(false);
      }}
    >
      <TrashIcon className="w-4 h-4 text-red-600" />
    </button>
  );
}

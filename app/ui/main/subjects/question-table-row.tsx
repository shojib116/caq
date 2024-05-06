"use client";

import { useState } from "react";
import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Question } from "@prisma/client";
import { deleteQuestion, updateQuestion } from "@/app/lib/action";

export default function QuestionTableRow({
  question,
  index,
}: {
  question: Question;
  index: string;
}) {
  const [showQuestionEditForm, setShowQuestionEditForm] =
    useState<boolean>(false);
  const [showDeleteQuestionPrompt, setShowDeleteQuestionPrompt] =
    useState<boolean>(false);
  const [newQuestion, setNewQuestion] = useState<string>(question.text);
  const [newLevel, setNewLevel] = useState<number>(question.level);

  return (
    <tr className="border-t">
      {!showQuestionEditForm && !showDeleteQuestionPrompt && (
        <>
          <td className="p-2 text-center">{index}.</td>
          <td className="p-2">{question.text}</td>
          <td className="text-center p-2">{question.level}</td>
          <td className="text-right p-2 flex justify-end gap-2">
            <button onClick={(e) => setShowQuestionEditForm(true)}>
              <PencilIcon className="w-4 h-4" />
            </button>
            <button onClick={(e) => setShowDeleteQuestionPrompt(true)}>
              <TrashIcon className="w-4 h-4 text-red-500" />
            </button>
          </td>
        </>
      )}
      {showQuestionEditForm && (
        <QuestionEditForm
          question={question}
          index={index}
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
  setEditFormStatus,
  newQuestion,
  setNewQuestion,
  newLevel,
  setNewLevel,
}: {
  question: Question;
  index: string;
  setEditFormStatus: (status: boolean) => void;
  newQuestion: string;
  setNewQuestion: (question: string) => void;
  newLevel: number;
  setNewLevel: (level: number) => void;
}) {
  const handleSubmit = () => {
    if (!newQuestion) return;
    updateQuestion(question.id, newQuestion, newLevel);
    setEditFormStatus(false);
  };
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
          className="px-2 border border-gray-200 rounded w-full"
        />
      </td>
      <td className="text-center p-2">
        <select
          name="level"
          id="level"
          defaultValue={question.level}
          onChange={(e) => setNewLevel(Number(e.target.value))}
          className="border border-gray-200 rounded"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </td>
      <td className="text-right p-2 flex justify-end gap-2">
        <button onClick={handleSubmit}>
          <CheckIcon className="w-4 h-4 text-green-500" />
        </button>
        <button onClick={(e) => setEditFormStatus(false)}>
          <XMarkIcon className="w-4 h-4 text-red-500" />
        </button>
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
  return (
    <>
      <td className="p-2 tex-center">{index}.</td>
      <td className="text-red-500 p-2 w-min">
        Are you sure you want to delete this question?
      </td>
      <td className="text-center p-2"></td>
      <td className="text-right p-2 flex justify-end gap-2">
        <button onClick={(e) => deleteQuestion(question.id)}>
          <CheckIcon className="w-4 h-4 text-red-500" />
        </button>
        <button onClick={(e) => setDeletePromptStatus(false)}>
          <XMarkIcon className="w-4 h-4 text-green-500" />
        </button>
      </td>
    </>
  );
}

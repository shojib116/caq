"use client";

import { useState } from "react";
import { addQuestion } from "@/app/lib/action";
import { ResponseSubject } from "@/app/lib/definitions";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function AddQuestionForm({
  subject,
  questionFormStatus,
}: {
  subject: ResponseSubject;
  questionFormStatus: (status: boolean) => void;
}) {
  const [question, setQuestion] = useState<string>();
  const [level, setLevel] = useState<number>(1);

  const addQuestionWithSubjectId = addQuestion.bind(null, subject.id);

  const handleSubmit = () => {
    if (!question || !level) return;
    addQuestionWithSubjectId(question, level);
    questionFormStatus(false);
  };
  return (
    <tr>
      <td className="p-2 text-center"></td>
      <td className="p-2">
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
          className="border border-gray-200 rounded"
          required
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
        <button type="button" onClick={(e) => questionFormStatus(false)}>
          <XMarkIcon className="w-4 h-4 text-red-500" />
        </button>
      </td>
    </tr>
  );
}

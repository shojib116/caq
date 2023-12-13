"use client";

import { ResponseSubject } from "@/app/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddQuestionForm from "@/app/ui/main/subjects/add-question-form";
import QuestionTableRow from "@/app/ui/main/subjects/question-table-row";

export default function QuestionTable({
  subject,
}: {
  subject: ResponseSubject;
}) {
  const [showAddQuestionForm, setShowAddQuestionForm] =
    useState<boolean>(false);
  let index = 0;
  return (
    <div className=" bg-white py-2 px-4 rounded-br rounded-bl">
      <div className="bg-gray-100 flex flex-col gap-4 pl-16 pr-10  py-4 rounded">
        <div className="flex justify-end">
          <button
            className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={(e) => setShowAddQuestionForm(true)}
          >
            <span className="hidden md:block">Add New Question</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </button>
        </div>
        <div>
          {subject.question?.length === 0 ? (
            <p className="flex justify-center font-semibold">
              No questions for this subject yet.
            </p>
          ) : (
            <table className="bg-white w-full rounded">
              <thead className="w-full">
                <th className="p-2 w-6">Sl</th>
                <th className="text-left p-2">Subject</th>
                <th className="p-2 w-16">Level</th>
                <th className="text-right p-2 pr-3 w-28">Edit</th>
              </thead>

              <tbody>
                {subject.question.map((question) => {
                  index++;
                  return (
                    <QuestionTableRow
                      key={question.id}
                      question={question}
                      index={index.toString()}
                    />
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {showAddQuestionForm && (
          <AddQuestionForm
            subject={subject}
            questionFormStatus={setShowAddQuestionForm}
          />
        )}
      </div>
    </div>
  );
}

function nextChar(c: string) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

// function incrementString(value: string) {
//   let carry = 1;
//   let res = "";

//   for (let i = value.length - 1; i >= 0; i--) {
//     let char = value.charCodeAt(i);

//     char += carry;

//     if (char > 122) {
//       char = 97;
//       carry = 1;
//     } else {
//       carry = 0;
//     }

//     res = String.fromCharCode(char) + res;

//     if (!carry) {
//       res = value.substring(0, i) + res;
//       break;
//     }
//   }

//   if (carry) {
//     res = res;
//   }

//   return res;
// }

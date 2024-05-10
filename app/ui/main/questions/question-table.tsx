"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddQuestionForm from "@/app/ui/main/questions/add-question-form";
import QuestionTableRow from "@/app/ui/main/questions/question-table-row";
import { Personnel, Question } from "@prisma/client";

export default function QuestionTable({
  questionData,
  subjectID,
  personnelData,
}: {
  questionData: Question[];
  subjectID: string;
  personnelData: Personnel[];
}) {
  const [showAddQuestionForm, setShowAddQuestionForm] =
    useState<boolean>(false);
  let index = 0;

  return (
    <div className=" bg-white py-2 rounded-br rounded-bl">
      <div className="flex flex-col gap-5">
        <div>
          <button
            type="button"
            className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={(e) => setShowAddQuestionForm(true)}
          >
            <span className="hidden md:block">Add New Question</span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </button>
        </div>
        <div>
          <table className="my-4 bg-gray-100 rounded-lg p-2 w-full border-separate">
            <thead className="w-full">
              <tr className="px-4 py-1 bg-white rounded-lg">
                <th className="p-2 w-1/12 font-medium">Sl</th>
                <th className="text-left p-2 font-medium">Question</th>
                <th className="p-2 w-1/12 font-medium">Level</th>
                <th className="p-2 w-3/12 font-medium">Applicability</th>
                <th className="text-right p-2 pr-3 w-1/12 font-medium">Edit</th>
              </tr>
            </thead>

            {questionData.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <p className="flex justify-center font-semibold py-2">
                      No questions for this subject yet.
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {questionData.map((question) => {
                  index++;
                  return (
                    <QuestionTableRow
                      key={question.id}
                      question={question}
                      index={index.toString()}
                      personnelData={personnelData}
                    />
                  );
                })}
              </tbody>
            )}
            <tfoot>
              {showAddQuestionForm && (
                <AddQuestionForm
                  subjectID={subjectID}
                  questionFormStatus={setShowAddQuestionForm}
                  personnelData={personnelData}
                />
              )}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

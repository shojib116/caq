"use client";

import { Personnel } from "@prisma/client";
import PrintableArea from "./printable-area";
import {
  PrintPageHeaderTableData,
  PrintPageContentTableData,
  PrintPageTopTableData,
  PrintPageAssessorTableData,
  QuestionnaireData,
} from "@/app/lib/definitions";
import { PrinterIcon } from "@heroicons/react/24/outline";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";

export default function PrintPage({
  personnelData,
  questionData,
  searchParams,
}: {
  personnelData: Personnel[];
  questionData: QuestionnaireData[];
  searchParams?: { designation?: string };
}) {
  const headerTableData: PrintPageHeaderTableData = {
    logo: "Logo",
    centerText: "Competency Assessment Questionnaire Form",
  };

  const initialContentTableData: PrintPageContentTableData = questionData.map(
    (subject) => ({
      id: subject.id,
      text: subject.text,
      satisfied: "",
      remarks: "",
      questions: [],
    })
  );

  const [contentTable, setContentTable] = useState<PrintPageContentTableData>(
    initialContentTableData
  );

  const [topTable, setTopTable] = useState<PrintPageTopTableData>({
    designation: searchParams?.designation || "",
    name: "",
    staffID: "",
    date: "",
  });
  const [assessor1, setAssessor1] = useState<PrintPageAssessorTableData>({
    name: "",
    position: "",
    date: "",
    remarks: "",
  });
  const [assessor2, setAssessor2] = useState<PrintPageAssessorTableData>({
    name: "",
    position: "",
    date: "",
    remarks: "",
  });

  const handleTopTableChange = (field: string, value: string) => {
    setTopTable((prevTopTable) => ({
      ...prevTopTable,
      [field]: value,
    }));
  };

  const handleAssessorChange = (
    assessor: string,
    field: string,
    value: string
  ) => {
    if (assessor === "assessor1") {
      setAssessor1((prevAssessor1) => ({
        ...prevAssessor1,
        [field]: value,
      }));
    } else if (assessor === "assessor2") {
      setAssessor2((prevAssessor2) => ({
        ...prevAssessor2,
        [field]: value,
      }));
    }
  };

  const handleRadioButtonChange = (subjectId: string, value: string) => {
    setContentTable((prevContent) => {
      return prevContent.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            satisfied: value,
          };
        }
        return subject;
      });
    });
  };

  const handleRemarksChange = (subjectId: string, value: string) => {
    setContentTable((prevContent) => {
      return prevContent.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            remarks: value,
          };
        }
        return subject;
      });
    });
  };

  const handleCheckboxChange = (
    subjectID: string,
    questionID: string,
    questionText: string,
    questionLevel: number,
    isChecked: boolean
  ) => {
    const selectedQuestion = {
      id: questionID,
      text: questionText,
      level: questionLevel,
    };

    const updatedContentTable = contentTable.map((subject) => {
      if (subject.id === subjectID) {
        let updatedQuestions = subject.questions || [];

        if (isChecked) {
          const questionExists = updatedQuestions.some(
            (question) => question.id === selectedQuestion.id
          );
          if (!questionExists) {
            updatedQuestions = [...updatedQuestions, selectedQuestion];
          }
        } else {
          updatedQuestions = updatedQuestions.filter(
            (question) => question.id !== selectedQuestion.id
          );
        }
        return { ...subject, questions: updatedQuestions };
      }
      return subject;
    });
    setContentTable(updatedContentTable);
  };

  const tableRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Print Questionnaire</h1>
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="flex flex-row gap-2 items-center bg-blue-600 p-2 text-white rounded text-sm font-medium"
              onClick={handlePrint}
            >
              <div>
                <PrinterIcon className="w-4" />
              </div>{" "}
              <span>Print</span>
            </button>
          )}
          content={() => tableRef.current!}
        />
      </div>
      <div>
        <PrintableArea
          personnelData={personnelData}
          questionData={questionData}
          searchParams={searchParams}
          handleTopTableChange={handleTopTableChange}
          handleAssessorChange={handleAssessorChange}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioButtonChange={handleRadioButtonChange}
          handleRemarksChange={handleRemarksChange}
        />
      </div>
    </div>
  );
}

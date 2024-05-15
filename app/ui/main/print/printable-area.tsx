import { Personnel } from "@prisma/client";
import PersonnelDropdown from "./personnel-dropdown";
import QuestionnaireTable from "./questionnaire-table";
import { QuestionnaireData } from "@/app/lib/definitions";
import FooterTable from "./footer-table";

export default function PrintableArea({
  personnelData,
  questionData,
  searchParams,
  handleTopTableChange,
  handleCheckboxChange,
  handleRadioButtonChange,
  handleRemarksChange,
  handleAssessorChange,
}: {
  personnelData: Personnel[];
  questionData: QuestionnaireData[];
  searchParams?: { designation?: string };
  handleTopTableChange: (field: string, value: string) => void;
  handleCheckboxChange: (
    subjectID: string,
    questionID: string,
    questionText: string,
    questionLevel: number,
    isChecked: boolean
  ) => void;
  handleRadioButtonChange: (subjectID: string, choice: string) => void;
  handleRemarksChange: (subjectID: string, remarks: string) => void;
  handleAssessorChange: (
    assessor: string,
    field: string,
    remarks: string
  ) => void;
}) {
  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <PersonnelDropdown
          personnelData={personnelData}
          handleTopTableChange={handleTopTableChange}
        />
      </div>
      {searchParams?.designation && (
        <QuestionnaireTable
          questionData={questionData}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioButtonChange={handleRadioButtonChange}
          handleRemarksChange={handleRemarksChange}
        />
      )}
      <FooterTable handleAssessorChange={handleAssessorChange} />
    </>
  );
}

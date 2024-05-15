import { QuestionnaireData } from "@/app/lib/definitions";
import QuestionnaireTableRow from "./questionnaire-table-row";

export default function QuestionnaireTable({
  questionData,
  handleCheckboxChange,
  handleRadioButtonChange,
  handleRemarksChange,
}: {
  questionData: QuestionnaireData[];
  handleCheckboxChange: (
    subjectID: string,
    questionID: string,
    questionText: string,
    questionLevel: number,
    isChecked: boolean
  ) => void;
  handleRadioButtonChange: (subjectID: string, choice: string) => void;
  handleRemarksChange: (subjectID: string, remarks: string) => void;
}) {
  if (questionData.length === 0) {
    return (
      <div className="w-full text-center">
        No subject matter has not been assigned for this personnel yet.
      </div>
    );
  }
  return (
    <div className="w-full mt-5">
      <table className="w-full border-2 border-gray-600">
        <thead>
          <tr>
            <th
              rowSpan={2}
              className="w-7/12 font-medium border-2 border-gray-600 p-1"
            >
              Subject
            </th>
            <th
              colSpan={2}
              className="w-1/12 font-medium border-2 border-gray-600 p-1"
            >
              Satisfactory
            </th>
            <th
              rowSpan={2}
              className="w-4/12 font-medium border-2 border-gray-600 p-1"
            >
              Areas of improvement <br /> (If not satisfactory)
            </th>
          </tr>
          <tr>
            <th className="font-medium border-2 border-gray-600">Yes</th>
            <th className="font-medium border-2 border-gray-600 px-1">No</th>
          </tr>
        </thead>
        <tbody>
          {questionData.map((subject) => {
            return (
              <QuestionnaireTableRow
                data={subject}
                handleCheckboxChange={handleCheckboxChange}
                handleRadioButtonChange={handleRadioButtonChange}
                handleRemarksChange={handleRemarksChange}
                key={subject.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

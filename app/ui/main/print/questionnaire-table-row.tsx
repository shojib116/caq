import { QuestionnaireData } from "@/app/lib/definitions";
import QuestionListCheckbox from "./question-list-checkbox";

export default function QuestionnaireTableRow({
  data,
  handleCheckboxChange,
  handleRadioButtonChange,
  handleRemarksChange,
}: {
  data: QuestionnaireData;
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
  return (
    <tr>
      <td className="font-medium border-2 border-gray-600 p-2">
        <h5 className="mb-1">{data.text}</h5>
        <ul>
          {data.questions.map((question) => {
            return (
              <QuestionListCheckbox
                subjectID={data.id}
                question={question}
                handleCheckboxChange={handleCheckboxChange}
                key={question.id}
              />
            );
          })}
        </ul>
      </td>
      <td className="font-medium border-2 border-gray-600 text-center">
        <input
          type="radio"
          name={data.id}
          value="Yes"
          onChange={() => handleRadioButtonChange(data.id, "Yes")}
        />
      </td>
      <td className="font-medium border-2 border-gray-600 text-center">
        <input
          type="radio"
          name={data.id}
          value="No"
          onChange={() => handleRadioButtonChange(data.id, "No")}
        />
      </td>
      <td className="font-medium border-2 border-gray-600">
        <textarea
          className="w-full h-full p-2 text-sm text-center"
          placeholder=""
          name="comments"
          id={data.id}
          onChange={(e) => handleRemarksChange(data.id, e.target.value)}
        />
      </td>
    </tr>
  );
}

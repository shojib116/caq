import { QuestionnaireData } from "@/app/lib/definitions";
import QuestionListCheckbox from "./question-list-checkbox";

export default function QuestionnaireTableRow({
  data,
}: {
  data: QuestionnaireData;
}) {
  return (
    <tr>
      <td className="font-medium border-2 border-gray-600 p-2">
        <h5 className="mb-1">{data.text}</h5>
        <ul>
          {data.questions.map((question) => {
            return (
              <QuestionListCheckbox question={question} key={question.id} />
            );
          })}
        </ul>
      </td>
      <td className="font-medium border-2 border-gray-600 text-center">
        <input type="radio" name={data.id} />
      </td>
      <td className="font-medium border-2 border-gray-600 text-center">
        <input type="radio" name={data.id} />
      </td>
      <td className="font-medium border-2 border-gray-600">
        <textarea
          className="w-full h-full p-2 text-sm text-center"
          placeholder=""
          name="comments"
          id="comments"
        />
      </td>
    </tr>
  );
}

export default function QuestionListCheckbox({
  subjectID,
  question,
  handleCheckboxChange,
}: {
  subjectID: string;
  question: {
    id: string;
    text: string;
    level: number;
  };
  handleCheckboxChange: (
    subjectID: string,
    questionID: string,
    questionText: string,
    questionLevel: number,
    isChecked: boolean
  ) => void;
}) {
  return (
    <li className="font-normal text-sm list-none flex flex-row gap-1 pl-4 items-start">
      <input
        type="checkbox"
        id={question.id}
        name={question.id}
        className="mt-[0.1875rem]"
        onChange={(e) =>
          handleCheckboxChange(
            subjectID,
            question.id,
            question.text,
            question.level,
            e.target.checked
          )
        }
      />
      <label htmlFor={question.id}>
        {question.text} ({question.level})
      </label>
    </li>
  );
}

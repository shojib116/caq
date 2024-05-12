export default function QuestionListCheckbox({
  question,
}: {
  question: {
    id: string;
    text: string;
    level: number;
  };
}) {
  return (
    <li className="font-normal text-sm list-none flex flex-row gap-1 pl-4 items-start">
      <input
        type="checkbox"
        id={question.id}
        name={question.id}
        className="mt-[0.1875rem]"
      />
      <label htmlFor={question.id}>
        {question.text} ({question.level})
      </label>
    </li>
  );
}

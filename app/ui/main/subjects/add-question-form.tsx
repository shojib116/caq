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
  const addQuestionWithSubjectId = addQuestion.bind(null, subject.id);

  const handleSubmit = (formData: FormData) => {
    addQuestionWithSubjectId(formData);
    questionFormStatus(false);
  };
  return (
    <div>
      <form action={handleSubmit} className="flex justify-between">
        <div className="flex gap-4">
          <div>
            <label htmlFor="question">Question:</label>{" "}
            <input
              type="text"
              name="question"
              id="question"
              className="border border-gray-200 rounded w-[30rem] pl-2"
              required
            />
          </div>
          <div>
            <label htmlFor="level">Level:</label>{" "}
            <select
              name="level"
              id="level"
              className="border border-gray-200 rounded"
              required
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit">
            <CheckIcon className="w-6 h-6 text-green-500" />
          </button>
          <button type="button" onClick={(e) => questionFormStatus(false)}>
            <XMarkIcon className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </form>
    </div>
  );
}

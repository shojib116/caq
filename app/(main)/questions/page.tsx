import {
  fetchPersonnelWithSubjectID,
  fetchQuestionWithSubjectID,
  fetchSubjectsOnly,
} from "@/app/lib/data";
import QuestionTable from "@/app/ui/main/questions/question-table";
import SubjectListDropdown from "@/app/ui/main/questions/subject-list-dropdown";
import { Personnel, Question } from "@prisma/client";

export default async function Page({
  searchParams,
}: {
  searchParams?: { subjectID?: string };
}) {
  const subjectData = await fetchSubjectsOnly();
  let questionData: Question[] = [];
  let personnelData: Personnel[] = [];
  if (searchParams?.subjectID) {
    questionData = await fetchQuestionWithSubjectID(searchParams.subjectID);
    personnelData = await fetchPersonnelWithSubjectID(searchParams.subjectID);
  }

  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Question List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SubjectListDropdown subjectData={subjectData} />
      </div>
      <div className="my-4 w-full text-center">
        {!searchParams?.subjectID && (
          <p className="font-medium text-sm">No Subject Selected</p>
        )}
        {searchParams?.subjectID && (
          <QuestionTable
            personnelData={personnelData}
            questionData={questionData}
            subjectID={searchParams.subjectID}
          />
        )}
      </div>
    </div>
  );
}

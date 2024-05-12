import { fetchPersonnel, fetchQuestionsWithPersonnelID } from "@/app/lib/data";
import { QuestionnaireData } from "@/app/lib/definitions";
import PrintableArea from "@/app/ui/main/print/printable-area";

export default async function Page({
  searchParams,
}: {
  searchParams?: { designation?: string };
}) {
  const personnelData = await fetchPersonnel();

  if (personnelData.length === 0) {
    return (
      <div className="w-full">
        <p className="w-full text-center font-medium">No Personnel Added Yet</p>
      </div>
    );
  }

  let questionData: QuestionnaireData[] = [];
  if (searchParams?.designation) {
    const personnelMap: { [key: string]: string } = personnelData.reduce(
      (accu, personnel) => ({ ...accu, [personnel.designation]: personnel.id }),
      {}
    );
    const personnelID: string = searchParams?.designation
      ? personnelMap[searchParams?.designation]
      : "";

    questionData = await fetchQuestionsWithPersonnelID(personnelID);
  }

  console.log(questionData);
  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Print Questionnaire</h1>
      </div>
      <PrintableArea
        personnelData={personnelData}
        questionData={questionData}
        searchParams={searchParams}
      />
    </div>
  );
}

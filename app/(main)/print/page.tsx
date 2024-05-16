import {
  fetchHeader,
  fetchPersonnel,
  fetchQuestionsWithPersonnelID,
} from "@/app/lib/data";
import { QuestionnaireData } from "@/app/lib/definitions";
import PrintPage from "@/app/ui/main/print/print-page";

export default async function Page({
  searchParams,
}: {
  searchParams?: { designation?: string };
}) {
  const personnelData = await fetchPersonnel();
  const headerData = await fetchHeader();

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

  return (
    <PrintPage
      personnelData={personnelData}
      questionData={questionData}
      searchParams={searchParams}
      headerData={headerData}
    />
  );
}

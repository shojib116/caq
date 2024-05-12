import { Personnel } from "@prisma/client";
import PersonnelDropdown from "./personnel-dropdown";
import QuestionnaireTable from "./questionnaire-table";
import { QuestionnaireData } from "@/app/lib/definitions";
import FooterTable from "./footer-table";

export default function PrintableArea({
  personnelData,
  questionData,
  searchParams,
}: {
  personnelData: Personnel[];
  questionData: QuestionnaireData[];
  searchParams?: { designation?: string };
}) {
  return (
    <>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <PersonnelDropdown personnelData={personnelData} />
      </div>
      {searchParams?.designation && (
        <QuestionnaireTable questionData={questionData} />
      )}
      <FooterTable />
    </>
  );
}

import {
  fetchHeader,
  fetchPersonnel,
  fetchQuestionsWithPersonnelID,
} from "@/app/lib/data";
import { QuestionnaireData } from "@/app/lib/definitions";
import PrintPage from "@/app/ui/main/print/print-page";
import { auth, signIn } from "@/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams?: { designation?: string };
}) {
  const session = await auth();
  if (!session?.user) await signIn();
  if (
    session?.user.role !== "admin" &&
    session?.user.role !== "sme" &&
    session?.user.role !== "assessor"
  )
    redirect("/matrix");
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
    let flag = 0;
    personnelData.map((personnel) => {
      if (personnel.designation === searchParams.designation) {
        flag = 1;
      }
    });
    if (flag === 0) {
      notFound();
    }
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

import { fetchPersonnel, fetchSubjects } from "@/app/lib/data";
import SubjectMatrixTable from "@/app/ui/main/matrix/subject-matrix-table";
import { auth, signIn } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competence Assessment Matrix | CAQ",
};

export default async function Page() {
  const session = await auth();
  if (!session?.user) await signIn();
  const personnelData = await fetchPersonnel();
  const subjectData = await fetchSubjects();

  if (personnelData.length === 0 || subjectData.length === 0) {
    return (
      <div className="w-full relative">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl">Subject Matrix</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 font-medium">
          Empty personnel or subject list.
        </div>
      </div>
    );
  }
  const subjectMatrixArray: { text: string; applicability: string[] }[] = [];

  subjectData.map((subject) => {
    const applicability: string[] = [];
    personnelData.map((personnel) => {
      subject.personnelIDs.indexOf(personnel.id) === -1
        ? applicability.push("")
        : applicability.push("X");
    });
    subjectMatrixArray.push({
      text: subject.text,
      applicability: applicability,
    });
  });

  return (
    <div className="w-full relative">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Competence Assessment Matrix</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <SubjectMatrixTable
          subjectMatrixArray={subjectMatrixArray}
          personnelData={personnelData}
        />
      </div>
    </div>
  );
}

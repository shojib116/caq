import { fetchPersonnel } from "@/app/lib/data";
import AddSubject from "@/app/ui/main/subjects/add-subject";
import Breadcrumbs from "@/app/ui/main/subjects/breadcrumbs";
import { auth, signIn } from "@/auth";
import { Personnel } from "@prisma/client";

export default async function Page() {
  const session = await auth();
  if (!session?.user) await signIn();
  const personnelData: Personnel[] = (await fetchPersonnel()).sort((a, b) =>
    a.designation.localeCompare(b.designation)
  );
  return (
    <div>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Subjects", href: "/subjects" },
            {
              label: "Add Subject",
              href: "/subjects/add",
              active: true,
            },
          ]}
        />
      </div>
      <div>
        <AddSubject personnelData={personnelData} />
      </div>
    </div>
  );
}

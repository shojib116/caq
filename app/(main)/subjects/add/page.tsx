import { addSubject } from "@/app/lib/action";
import Breadcrumbs from "@/app/ui/main/subjects/breadcrumbs";

export default function Page() {
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
        <form action={addSubject}>
          <div className="flex flex-col">
            <div className="mb-5">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="peer block w-full rounded-md border border-gray-200 mt-2 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500 md:w-[60rem]"
              />
            </div>
            <input
              type="submit"
              id="submit"
              className="flex h-10 w-min items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

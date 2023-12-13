"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function AddNewSubject() {
  return (
    <Link
      href="/subjects/add"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Add New Subject</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function SubjectPerPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleShowCount = (count: string) => {
    const params = new URLSearchParams(searchParams);
    if (count) {
      params.set("show", count);
    } else {
      params.delete("show");
    }
    params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
      <span>Show</span>
      <select
        name="num"
        id="num"
        onChange={(e) => {
          handleShowCount(e.target.value);
        }}
        defaultValue={searchParams.get("show")?.toString()}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}

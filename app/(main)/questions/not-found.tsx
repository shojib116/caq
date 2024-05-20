"use client";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested subject.</p>
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => (window.location.href = pathname.split("?")[0])}
      >
        Refresh
      </button>
    </main>
  );
}

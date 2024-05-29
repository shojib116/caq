"use client";

import {
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  PrinterIcon,
  QuestionMarkCircleIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const LinksMap = [
  {
    name: "Personnel List",
    href: "/personnel",
    icon: UserCircleIcon,
    role: ["admin"],
  },
  {
    name: "Subject List",
    href: "/subjects",
    icon: ClipboardDocumentListIcon,
    role: ["admin"],
  },

  {
    name: "Competence Assessment Matrix",
    href: "/matrix",
    icon: ClipboardDocumentCheckIcon,
    role: ["admin", "sme", "assessor"],
  },
  {
    name: "Question Pool",
    href: "/questions",
    icon: QuestionMarkCircleIcon,
    role: ["admin", "sme"],
  },
  {
    name: "Print Questionnaire",
    href: "/print",
    icon: PrinterIcon,
    role: ["admin", "sme", "assessor"],
  },
  { name: "Cofiguration", href: "/config", icon: WrenchIcon, role: ["admin"] },
];

export default function NavLinks({ role }: { role: string }) {
  const pathname = usePathname();
  const links = LinksMap.filter((link) => {
    if (link.role.indexOf(role) === -1) return false;
    return true;
  });
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              pathname === link.href ? "bg-sky-100 text-blue-600" : ""
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

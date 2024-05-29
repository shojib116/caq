"use client";

import { authorizeUser, UserState } from "@/app/lib/action";
import { useFormState } from "react-dom";
import { useState } from "react";

export default function AuthorizeUser() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const initialState: UserState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(authorizeUser, initialState);
  return (
    <form action={dispatch} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-min border-2 border-gray-700 rounded px-2 py-1"
          placeholder="email@example.com"
          aria-describedby="email-error"
        />
      </div>
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="role" className="font-medium text-gray-700">
          Authorized Role
        </label>
        <select
          name="role"
          id="role"
          className="w-min border-2 border-gray-700 rounded px-2 py-1"
          onChange={(e) => setSelectedRole(e.target.value)}
          aria-describedby="role-error"
        >
          <option value="" disabled>
            Select a role
          </option>
          {RoleMap.map((role) => {
            return <option value={role.value}>{role.text}</option>;
          })}
        </select>
        {selectedRole && (
          <p className="text-red-600 font-medium">
            Caution!!!{" "}
            {RoleMap.find((role) => role.value === selectedRole)?.message}
          </p>
        )}
      </div>
      <div id="role-error" aria-live="polite" aria-atomic="true">
        {state?.errors?.role &&
          state.errors.role.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col text-left">
        <input
          type="submit"
          className="flex w-fit my-4 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
          disabled={selectedRole === ""}
        />
      </div>
    </form>
  );
}

const RoleMap = [
  {
    value: "admin",
    text: "Admin",
    message: `This person will get access to "all the pages"!`,
  },
  {
    value: "sme",
    text: "SME",
    message: `This person will get access to "Question Pool", "Competence Assessment Matrix" and "Print Questionnaire" pages!`,
  },
  {
    value: "assessor",
    text: "Assessor",
    message: `This person will get access to "Competence Assessment Matrix" and "Print Questionnaire" pages!`,
  },
];

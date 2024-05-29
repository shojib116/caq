"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { FormHeader } from "@prisma/client";
import { updateHeader } from "@/app/lib/action";
import dayjs from "dayjs";
import Logo from "@/public/logo/Company_Logo.png";

export default function ConfigPage({
  headerData,
}: {
  headerData: FormHeader | null;
}) {
  const [isPending, startTransition] = useTransition();

  const initialHeaderData: FormHeader = {
    id: headerData ? headerData.id : "",
    centerText: headerData ? headerData.centerText : "",
    formNumber: headerData ? headerData.formNumber : "",
    issue: headerData ? headerData.issue : "",
    revision: headerData ? headerData.revision : "",
    date: headerData ? headerData.date : null,
  };
  const [headerTableData, setHeaderTableData] =
    useState<FormHeader>(initialHeaderData);

  useEffect(() => {
    setHeaderTableData(initialHeaderData);
  }, []);

  const handleHeaderDataChange = (field: string, value: string) => {
    setHeaderTableData((prevHeaderTable) => ({
      ...prevHeaderTable,
      [field]: value,
    }));
  };

  async function handleInfoSubmit() {
    startTransition(() => {
      updateHeader(headerTableData);
    });
  }

  return (
    <div className="mt-8">
      <div>
        <h5 className="font-medium">Print Header Information</h5>
        <table className="my-4 text-sm">
          <tbody>
            <tr>
              <td className="p-2">
                <label htmlFor="center-text">Center Text: </label>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  name="center-text"
                  id="center-text"
                  value={headerTableData.centerText}
                  onChange={(e) =>
                    handleHeaderDataChange("centerText", e.target.value)
                  }
                  className="border border-gray-700 rounded pl-2"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2">
                <label htmlFor="form-number">Form Number: </label>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  name="form-number"
                  id="form-number"
                  value={headerTableData.formNumber || ""}
                  onChange={(e) =>
                    handleHeaderDataChange("formNumber", e.target.value)
                  }
                  className="border border-gray-700 rounded pl-2"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2">
                <label htmlFor="issue">Issue: </label>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  name="issue"
                  id="issue"
                  value={headerTableData.issue || ""}
                  onChange={(e) =>
                    handleHeaderDataChange("issue", e.target.value)
                  }
                  className="border border-gray-700 rounded pl-2"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2">
                <label htmlFor="revision">Revision: </label>
              </td>
              <td className="p-2">
                <input
                  type="text"
                  name="revision"
                  id="revision"
                  value={headerTableData.revision || ""}
                  onChange={(e) =>
                    handleHeaderDataChange("revision", e.target.value)
                  }
                  className="border border-gray-700 rounded pl-2"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2">
                <label htmlFor="center-text">Date: </label>
              </td>
              <td className="p-2">
                <input
                  type="date"
                  name="center-text"
                  id="center-text"
                  value={dayjs(headerTableData.date).format("YYYY-MM-DD")}
                  onChange={(e) => {
                    handleHeaderDataChange(
                      "date",
                      new Date(e.target.value).toISOString()
                    );
                  }}
                  className="border border-gray-700 rounded pl-2"
                />
              </td>
            </tr>
            <tr>
              <td className="p-2">
                <button
                  type="button"
                  className="bg-blue-600 p-2 text-white rounded"
                  onClick={handleInfoSubmit}
                  disabled={isPending}
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h5 className="font-medium">Header Preview</h5>
        <table className="w-full border-2 border-gray-600 my-4">
          <tbody>
            <tr>
              <td className="border-2 border-gray-600 p-1 text-center w-1/4">
                <Image
                  src={Logo}
                  alt="logo"
                  height={70}
                  width={70}
                  className="mx-auto"
                />
              </td>
              <td className="border-2 border-gray-600 p-1 text-xl font-bold text-center w-2/4">
                {headerTableData.centerText}
              </td>
              <td className="border-2 border-gray-600 p-1 text-sm w-1/4">
                <div className="flex flex-col">
                  <p>Form No: {headerTableData.formNumber}</p>
                  <div className="flex flex-row gap-10">
                    <p>Issue: {headerTableData.issue}</p>
                    <p>rev: {headerTableData.revision}</p>
                  </div>
                  <p>
                    Date:{" "}
                    {headerTableData.date
                      ? dayjs(headerTableData.date).format("DD-MM-YYYY")
                      : ""}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

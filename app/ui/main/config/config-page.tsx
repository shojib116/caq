"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FormHeader } from "@prisma/client";
import { updateHeader } from "@/app/lib/action";

export default function ConfigPage({
  headerData,
}: {
  headerData: FormHeader | null;
}) {
  const initialHeaderData: FormHeader = {
    id: headerData ? headerData.id : "",
    logoURL: headerData ? headerData.logoURL : "",
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
    setNewLogoURL(headerData?.logoURL);
  }, []);

  const handleHeaderDataChange = (field: string, value: string) => {
    setHeaderTableData((prevHeaderTable) => ({
      ...prevHeaderTable,
      [field]: value,
    }));
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newLogoURL, setNewLogoURL] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
    setNewLogoURL(URL.createObjectURL(event.target.files![0]));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const filename =
      "Company_logo_" + Date.now() + "." + selectedFile.type.split("/")[1];
    formData.append("fileName", filename);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Image uploaded successfully");
    } else {
      console.log("Image upload failed");
    }
    return "/uploads/" + filename;
  };

  async function handleInfoSubmit() {
    const headerLogoURL = (await handleUpload()) || "";
    updateHeader(headerTableData, headerLogoURL);
  }

  function formatDate() {
    if (!headerTableData.date) return "";
    const newDate = new Date(headerTableData.date);
    const formattedDate = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
    return formattedDate;
  }

  return (
    <div className="mt-8">
      <div>
        <h5 className="font-medium">Print Header Information</h5>
        <table className="my-4 text-sm">
          <tbody>
            <tr>
              <td className="p-2">
                <label htmlFor="logo">Logo: </label>
              </td>
              <td className="p-2">
                <input
                  type="file"
                  name="logo"
                  id="logo"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </td>
            </tr>
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
                  value={
                    headerTableData.date?.toISOString().split("T")[0] || ""
                  }
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
                {newLogoURL && (
                  <Image
                    src={newLogoURL}
                    alt="logo"
                    height={70}
                    width={120}
                    className="mx-auto"
                  />
                )}
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
                  <p>Date: {formatDate()}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

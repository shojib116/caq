"use client";

import {
  PrintPageAssessorTableData,
  PrintPageContentTableData,
  PrintPageHeaderTableData,
  PrintPageTopTableData,
} from "@/app/lib/definitions";
import { LegacyRef } from "react";
import "./print-styles.css";

export default function PrintableDocument({
  tableRef,
  headerTabledData,
  topTableData,
  contentTableData,
  assessor1,
  assessor2,
}: {
  tableRef: LegacyRef<HTMLDivElement>;
  headerTabledData: PrintPageHeaderTableData;
  topTableData: PrintPageTopTableData;
  contentTableData: PrintPageContentTableData;
  assessor1: PrintPageAssessorTableData;
  assessor2: PrintPageAssessorTableData;
}) {
  const formatDate = (date: Date | "") => {
    if (date === "") return "";
    const dateObject = new Date(date);
    const formattedDate = `${dateObject.getDate()}-${
      monthMap[dateObject.getMonth()]
    }-${dateObject.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div ref={tableRef} className="hidden print">
      <div className="w-full header">
        <table className="w-full border-2 border-gray-600">
          <tbody>
            <tr>
              <td className="border-2 border-gray-600 p-1 text-center w-1/4">
                {headerTabledData.logo}
              </td>
              <td className="border-2 border-gray-600 p-1 text-xl font-bold text-center w-2/4">
                {headerTabledData.centerText}
              </td>
              <td className="border-2 border-gray-600 p-1 text-sm w-1/4">
                <div className="flex flex-col">
                  <p>Form No: {headerTabledData.formNumber}</p>
                  <div className="flex flex-row gap-10">
                    <p>Issue: {headerTabledData.issue}</p>
                    <p>rev: {headerTabledData.revision}</p>
                  </div>
                  <p>Date: {headerTabledData.date?.toLocaleString()}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <td>
              <div className="empty-header"></div>
            </td>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td></td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>
              <div id="topTable" className="w-full mt-6">
                <table className="w-full border-2 border-gray-600">
                  <tbody>
                    <tr>
                      <td className="border-2 border-gray-600 p-1 font-medium w-1/6">
                        Designation:{" "}
                      </td>
                      <td className="border-2 border-gray-600 p-1" colSpan={3}>
                        {topTableData.designation}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 p-1">Name:</td>
                      <td className="border-2 border-gray-600 p-1" colSpan={3}>
                        {topTableData.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 p-1">
                        Staff ID:
                      </td>
                      <td className="border-2 border-gray-600 p-1">
                        {topTableData.staffID}
                      </td>
                      <td className="border-2 border-gray-600 p-1 w-1/6">
                        Date:
                      </td>
                      <td className="border-2 border-gray-600 p-1">
                        {formatDate(topTableData.date || "")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="contentTable" className="w-full mt-6">
                <table className="w-full border-2 border-gray-600">
                  <thead>
                    <tr className="unbreakable">
                      <th
                        rowSpan={2}
                        className="w-7/12 font-medium border-2 border-gray-600 p-1"
                      >
                        Subject
                      </th>
                      <th
                        colSpan={2}
                        className="w-1/12 font-medium border-2 border-gray-600 p-1"
                      >
                        Satisfactory
                      </th>
                      <th
                        rowSpan={2}
                        className="w-4/12 font-medium border-2 border-gray-600 p-1"
                      >
                        Areas of improvement <br /> (If not satisfactory)
                      </th>
                    </tr>
                    <tr>
                      <th className="font-medium border-2 border-gray-600">
                        Yes
                      </th>
                      <th className="font-medium border-2 border-gray-600 px-1">
                        No
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentTableData.map((subject) => {
                      return (
                        <tr key={subject.id} className="unbreakable">
                          <td className="font-medium border-2 border-gray-600 p-2">
                            <h5 className="mb-1">{subject.text}</h5>
                            <ul>
                              {subject.questions!.map((question, index) => {
                                return (
                                  <li
                                    className="font-normal text-sm list-none pl-4"
                                    key={question.id}
                                  >
                                    {index + 1}. {question.text} (
                                    {question.level})
                                  </li>
                                );
                              })}
                            </ul>
                          </td>
                          <td className="font-medium border-2 border-gray-600 text-center">
                            <input
                              type="checkbox"
                              name={subject.id}
                              checked={subject.satisfied === "Yes"}
                              readOnly
                            />
                          </td>
                          <td className="font-medium border-2 border-gray-600 text-center">
                            <input
                              type="checkbox"
                              name={subject.id}
                              checked={subject.satisfied === "No"}
                              readOnly
                            />
                          </td>
                          <td className="text-sm border-2 border-gray-600 p-2">
                            {subject.remarks}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div id="candidates-signature-table" className="w-full mt-6">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="border-2 border-gray-600 p-2.5 py-4 text-left font-medium ">
                        Candidate&apos;s Signature:
                      </th>

                      <th className="border-2 border-gray-600 p-2">
                        <input type="text" />
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div id="footerTable" className="w-full mt-6">
                <table className="w-full unbreakable">
                  <thead>
                    <tr>
                      <th className="p-2.5 text-left font-medium" colSpan={4}>
                        Assessed By:
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-2 border-gray-600 p-2 w-1/6">
                        Name:
                      </td>
                      <td className="border-2 border-gray-600 w-2/6">
                        {assessor1.name}
                      </td>
                      <td className="border-2 border-gray-600 p-2 w-1/6">
                        Name:
                      </td>
                      <td className="border-2 border-gray-600 w-2/6">
                        {assessor2.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 p-2">
                        Position:
                      </td>
                      <td className="border-2 border-gray-600">
                        {assessor1.position}
                      </td>
                      <td className="border-2 border-gray-600 p-2">
                        Position:
                      </td>
                      <td className="border-2 border-gray-600">
                        {assessor2.position}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 p-2 py-4">
                        Signature:
                      </td>
                      <td className="border-2 border-gray-600"></td>
                      <td className="border-2 border-gray-600 p-2">
                        Signature:
                      </td>
                      <td className="border-2 border-gray-600"></td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 p-2">Date:</td>
                      <td className="border-2 border-gray-600">
                        {formatDate(assessor1.date || "")}
                      </td>
                      <td className="border-2 border-gray-600 p-2">Date:</td>
                      <td className="border-2 border-gray-600">
                        {formatDate(assessor2.date || "")}
                      </td>
                    </tr>
                    <tr>
                      <td className="border-2 border-gray-600 p-2 py-6">
                        Remarks:
                      </td>
                      <td className="border-2 border-gray-600 p-2">
                        {assessor1.remarks}
                      </td>
                      <td className="border-2 border-gray-600 p-2">Remarks:</td>
                      <td className="border-2 border-gray-600 p-2">
                        {assessor2.remarks}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="w-full" id="footerContent"></div>
    </div>
  );
}

const monthMap: { [key: number]: string } = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

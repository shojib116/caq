export default function FooterTable() {
  return (
    <div className="mt-8 w-full">
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-2 border-gray-600 p-2.5 py-4 text-left font-medium ">
              Candidate's Signature:
            </th>

            <th className="border-2 border-gray-600 p-2">
              <input type="text" />
            </th>
          </tr>
        </thead>
      </table>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="p-2.5 text-left font-medium" colSpan={4}>
              Assessed By:
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-1-name">Name:</label>
            </td>
            <td className="border-2 border-gray-600">
              <input
                type="text"
                name="assessor-1-name"
                id="assessor-1-name"
                className="w-full pl-1"
              />
            </td>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-2-name">Name:</label>
            </td>
            <td className="border-2 border-gray-600">
              <input
                type="text"
                name="assessor-2-name"
                id="assessor-2-name"
                className="w-full pl-1"
              />
            </td>
          </tr>
          <tr>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-1-position">Position:</label>
            </td>
            <td className="border-2 border-gray-600">
              <input
                type="text"
                name="assessor-1-position"
                id="assessor-1-position"
                className="w-full pl-1"
              />
            </td>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-2-position">Position:</label>
            </td>
            <td className="border-2 border-gray-600">
              <input
                type="text"
                name="assessor-2-position"
                id="assessor-2-position"
                className="w-full pl-1"
              />
            </td>
          </tr>
          <tr>
            <td className="border-2 border-gray-600 p-2 py-4">Signature:</td>
            <td className="border-2 border-gray-600"></td>
            <td className="border-2 border-gray-600 p-2">Signature:</td>
            <td className="border-2 border-gray-600"></td>
          </tr>
          <tr>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-1-date">Date:</label>
            </td>
            <td className="border-2 border-gray-600">
              <input
                type="date"
                name="assessor-1-date"
                id="assessor-1-date"
                className="w-full pl-1 appearance-none"
              />
            </td>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-2-date">Date:</label>
            </td>
            <td className="border-2 border-gray-600">
              <input
                type="date"
                name="assessor-2-date"
                id="assessor-2-date"
                className="w-full pl-1"
              />
            </td>
          </tr>
          <tr>
            <td className="border-2 border-gray-600 p-2 py-6">
              <label htmlFor="assessor-1-remarks">Remarks:</label>
            </td>
            <td className="border-2 border-gray-600">
              <textarea
                name="assessor-1-remarks"
                id="assessor-1-remarks"
                className="w-full pl-1 text-sm"
              />
            </td>
            <td className="border-2 border-gray-600 p-2">
              <label htmlFor="assessor-2-remarks">Remarks:</label>
            </td>
            <td className="border-2 border-gray-600">
              <textarea
                name="assessor-2-remarks"
                id="assessor-2-remarks"
                className="w-full pl-1 text-sm"
                rows={4}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

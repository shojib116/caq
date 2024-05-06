export default function KnowhowDropdown({ knowHow }: { knowHow: string }) {
  return (
    <form>
      <select
        defaultValue={knowHow}
        className="text-center bg-gray-100 border-2 p-1 border-gray-500 rounded"
      >
        <option value="notSelected">Not Selected</option>
        <option value="0">N/A</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </form>
  );
}

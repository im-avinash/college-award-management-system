export default function AwardFilter({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search awards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

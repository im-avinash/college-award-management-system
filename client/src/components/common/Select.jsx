export default function Select({ label, options, ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        className="appearance-none w-full px-3 py-3 border border-gray-300 rounded-md bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
        ▼
      </select>
    </div>
  );
}

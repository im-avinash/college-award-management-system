export default function AwardCard({
  award,
  onClick,
  onApprove,
  onReject,
  isAdmin = false,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition relative">
      <h3
        onClick={onClick}
        className="text-xl font-bold mb-2 text-indigo-600 cursor-pointer"
      >
        {award.title}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{award.description}</p>

      <div className="flex justify-between text-xs text-gray-500">
        <span> Recipient: {award.recipient }</span>
        <span>{new Date(award.created_at).toLocaleDateString()}</span>
      </div>

      {isAdmin && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onApprove(award.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(award.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

import AwardCard from "./AwardCard";

export default function AwardList({ awards, onAwardClick }) {
  if (awards.length === 0) {
    return <p className="text-gray-500">No awards found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {awards.map((award) => (
        <AwardCard key={award.id} award={award} onClick={() => onAwardClick(award)} />
      ))}
    </div>
  );
}

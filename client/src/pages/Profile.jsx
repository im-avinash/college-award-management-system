import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { useAuth } from "../context/authContext";
import api from "../services/api";
import AwardCard from "../components/awards/AwardCard";

export default function Profile() {
  const { user } = useAuth();
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserAwards();
    }
  }, [user]);

  const fetchUserAwards = async () => {
    try {
      const res = await api.get("/awards");
      const userAwards = res.data.filter(
        (award) =>
          award.recipient === user.name || award.createdBy === user.name
      );
      setAwards(userAwards);
    } catch (err) {
      console.error("Failed to load awards", err);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Profile</h1>

        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-10 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Profile Information</h2>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong className="text-gray-800">Name:</strong> {user.name}
            </p>
            <p>
              <strong className="text-gray-800">Email:</strong> {user.email}
            </p>
          </div>
        </div>

        {/* Awards Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Awards</h2>
          {awards.length === 0 ? (
            <p className="text-gray-500 italic">No awards submitted or received yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award) => (
                <div key={award.id} className="hover:scale-[1.02] transition-transform">
                  <AwardCard award={award} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

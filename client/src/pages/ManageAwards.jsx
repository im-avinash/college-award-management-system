import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import AwardList from "../components/awards/AwardList";
import Modal from "../components/common/Modal";
import AwardForm from "../components/awards/AwardForm";
import AwardFilter from "../components/awards/AwardFilter";
import Pagination from "../components/common/Pagination";
import { useAuth } from "../context/authContext";
import api from "../services/api";

export default function ManageAwards() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [awards, setAwards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAward, setSelectedAward] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const awardsPerPage = 6;

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const res = await api.get("/awards");
      setAwards(res.data);
    } catch {
      alert("Failed to load awards");
    }
  };

  const handleAddAward = () => {
    navigate("/submit-award");
  };

  const handleAwardClick = (award) => {
    console.log(award)
    setSelectedAward(award);
    setShowModal(true);
  };

  const handleAwardSubmit = async (formData) => {
    try {
      if (selectedAward) {
            console.log(selectedAward)

        await api.put(`/awards/${selectedAward.id}`, formData);
      } else {
        await api.post("/awards", {
          ...formData,
          recipient: user.name,
          award_date: new Date().toISOString().split("T")[0],
        });
      }
      fetchAwards();
      setShowModal(false);
    } catch {
      alert("Error saving award");
    }
  };

  const handleReject = async (id) => {
    try {
      await api.delete(`/awards/${id}`);
      fetchAwards();
    } catch {
      alert("Failed to delete");
    }
  };

  const handleApprove = (id) => {
    alert(`Award ${id} approved! (Implement logic)`);
  };

  const filteredAwards = awards.filter((award) =>
    award.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAwards.length / awardsPerPage);

  const paginatedAwards = filteredAwards.slice(
    (currentPage - 1) * awardsPerPage,
    currentPage * awardsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Awards</h1>
          <button
            onClick={handleAddAward}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            + Add Award
          </button>
        </div>

        {/* Filter */}
        <AwardFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Award List */}
        <AwardList
          awards={paginatedAwards}
          onAwardClick={handleAwardClick}
          onApprove={handleApprove}
          onReject={handleReject}
          isAdmin
        />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          }}
        />

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={selectedAward ? "Award Details" : "New Award"}
        >
          {selectedAward ? (
            <div>
              <h2 className="text-lg font-bold">{selectedAward.title}</h2>
              <p className="text-gray-600 mt-2">{selectedAward.description}</p>
              <div className="mt-4 text-sm text-gray-500 space-y-1">
                <p>
                  <strong>Created By:</strong>
                  
                  { selectedAward.recipient}
                </p>
                <p>
                  <strong>Date:</strong>
                  {new Date(
                    selectedAward.award_date
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ) : (
            <AwardForm onSubmit={handleAwardSubmit} />
          )}
        </Modal>
      </main>
    </div>
  );
}

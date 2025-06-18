import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import AwardForm from "../components/awards/AwardForm";
import { useAuth } from "../context/authContext";
import api from "../services/api";

export default function SubmitAward() {
  const { user } = useAuth();
  const  navigate  = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleAwardSubmit = async (formData) => {
    const payload = {
      ...formData,
      recipient: user.name,
      awarded_date: new Date().toISOString().split("T")[0],
    };

    try {
      await api.post("/awards", payload);
      alert("Award submitted successfully!");
      setFormData({ title: "", description: "" });
      navigate("/manage-awards");
    } catch (err) {
      alert("Error submitting award");
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Submit New Award</h1>
        <AwardForm onSubmit={handleAwardSubmit} />
      </div>
    </div>
  );
}

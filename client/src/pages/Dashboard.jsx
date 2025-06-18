import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/dashboard/Sidebar";
import api from "../services/api";

// Utility to format current date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().split("T")[0];

export default function Dashboard() {
  const [startDate, setStartDate] = useState(
    formatDate(new Date(new Date().getFullYear(), 0, 1))
  );
  const [endDate, setEndDate] = useState(formatDate(new Date()));
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (startDate && endDate) {
      api
        .get("/awards/stats", {
          params: {
            startDate,
            endDate,
          },
        })
        .then((res) => setStats(res.data))
        .catch((err) => console.error("Failed to load stats", err));
    }
  }, [startDate, endDate]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard!</h1>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Awards Summary</h2>

          <div className="flex gap-4 mb-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="awardsCount" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

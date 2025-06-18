import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

import { useAuth } from "../../context/authContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="h-screen w-64 bg-indigo-700 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6">College Awards</h2>
      <nav className="flex flex-col gap-4 flex-grow">
        <Button
          onClick={() => navigate("/dashboard")}
          className="hover:underline"
        >
          Dashboard
        </Button>
        <Button
          onClick={() => navigate("/submit-award")}
          className="hover:underline"
        >
          Submit Award
        </Button>
        <Button
          onClick={() => navigate("/manage-awards")}
          className="hover:underline"
        >
          Manage Awards
        </Button>
        <Button
          onClick={() => navigate("/profile")}
          className="hover:underline"
        >
          Profile
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="w-full mt-auto hover:bg-white hover:text-indigo-600 transition"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </nav>
    </div>
  );
}

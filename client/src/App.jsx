import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SubmitAward from "./pages/SubmitAward";
import ManageAwards from "./pages/ManageAwards";
import Profile from "./pages/Profile";
import { useAuth } from "./context/authContext";

export default function App() {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-indigo-600">
        Loading, please wait...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/submit-award"
          element={
            <PrivateRoute>
              <SubmitAward />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-awards"
          element={
            <PrivateRoute>
              <ManageAwards />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

import api from "../../services/api.js"; // central axios instance
import { useAuth } from "../../context/authContext";
import Select from "../common/Select.jsx";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    try {
      const res = await api.post("/users/register", formData);
      console.log("Registered:", res.data);

      login(res.data.token, res.data.user);
      // Optionally save token or redirect
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed", err.response?.data);
      alert("Registration failed: " + (err.response || "Unknown error"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Create Account
      </h2>

      <div className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          type="text"
          placeholder="John Doe"
          onChange={handleChange}
          required
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          onChange={handleChange}
          required
        />
        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={[
            { label: "Student", value: "student" },
            { label: "Faculty", value: "faculty" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="primary" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  );
}

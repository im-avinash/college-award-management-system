import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api.js"; // central axios instance
import { useAuth } from "../../context/authContext";
import Input from "../common/Input";
import Button from "../common/Button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", formData); // 👈 use api instead of axios
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Login
      </h2>

      <div className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          onChange={handleChange}
          required
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
          Log In
        </Button>
      </div>
    </form>
  );
}

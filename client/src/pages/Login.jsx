import LoginForm from "../components/auth/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <LoginForm />
      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

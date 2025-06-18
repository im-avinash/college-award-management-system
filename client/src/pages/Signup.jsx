import SignupForm from "../components/auth/SignupForm";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <SignupForm />
      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/" className="text-indigo-600 font-semibold hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

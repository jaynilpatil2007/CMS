import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { LoaderIcon } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ adminId: "", password: ""});
  const { signup, SignupLoading, authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      navigate("/admin-login");
    }
  }, [authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(formData);
  }

  return (
    <div
      className="px-72 py-8 w-full min-h-screen bg-gray-200 dot-grid flex justify-center items-center"
    >
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white/80 backdrop-blur-xl shadow-2xl">
        <div className="p-10">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white">
              A
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-zinc-900">
              Create Admin Account
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Enter your credentials to continue.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Admin ID
              </label>

              <input
                type="text"
                value={formData.adminId}
                onChange={(e) => setFormData({...formData, adminId: e.target.value })}
                placeholder="admin123"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Password
              </label>

              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={SignupLoading}
              className="mt-2 w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:opacity-90"
            >
              {
                SignupLoading ? ( <LoaderIcon className='w-full h-5 animate-spin text-center' />) : ( "Create Account" )
              }
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              to="/admin-login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
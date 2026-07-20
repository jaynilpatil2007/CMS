import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { LoaderIcon } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ adminId: "", password: "" });
    const { login, LoginLoading, authUser } = useAuthStore();

    useEffect(() => {
        if (authUser) {
            navigate("/");
        }
    }, [authUser, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        login(formData);
    }

  return (
    <div
      className="px-72 py-8 w-full h-screen bg-gray-200 dot-grid flex justify-center items-center"
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
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Login to access your CMS dashboard.
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
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/5"
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
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black/5"
              />
            </div>

            <button
              type="submit"
              disabled={LoginLoading}
              className="w-full rounded-xl bg-black py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 active:translate-y-0"
            >
              {
                LoginLoading ? ( <LoaderIcon className='w-full h-5 animate-spin text-center' />) : ( "Login" )
              }
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link
              to="/admin-signup"
              className="font-semibold text-black hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
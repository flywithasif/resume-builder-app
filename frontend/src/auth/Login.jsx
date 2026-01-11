// src/auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react"; // 👁 icons
import { toast } from "react-hot-toast";   // ✅ toast

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.68 2.6 30.1 0 24 0 14.64 0 6.39 5.43 2.56 13.35l7.98 6.21C12.43 13.74 17.74 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24.5c0-1.57-.14-3.07-.39-4.5H24v9h12.7c-.55 2.97-2.18 5.49-4.63 7.18l7.1 5.51c4.14-3.82 6.53-9.46 6.53-17.19z"/>
    <path fill="#FBBC05" d="M10.54 28.56c-1.04-3.06-1.04-6.56 0-9.62l-7.98-6.21C-1.07 17.6-1.07 30.4 2.56 36.65l7.98-6.21z"/>
    <path fill="#EA4335" d="M24 48c6.1 0 11.26-2 15-5.44l-7.1-5.51c-2.02 1.38-4.59 2.2-7.9 2.2-6.26 0-11.57-4.24-13.46-10.06l-7.98 6.21C6.39 42.57 14.64 48 24 48z"/>
  </svg>
);

const Login = () => {
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false); // 👁 toggle
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();

  const to = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setBusy(true);
      await login(email, password);
      toast.success("✅ Logged in successfully!"); // 🎉 toast
      navigate(to, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Login failed"); // 🚨 toast
    } finally {
      setBusy(false);
    }
  };

  const googleLogin = async () => {
    try {
      setBusy(true);
      await loginWithGoogle();
      toast.success("✅ Logged in with Google!");
      navigate(to, { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[#2C3333]">Login</h2>
      <p className="text-sm text-gray-600 mb-6">Welcome! Please login to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm text-[#2C3333]">Email</label>
          <input
            type="email"
            placeholder="name@domain.com"
            className="mt-1 w-full border border-[#A5C9CA] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        {/* Password with eye 👁 */}
        <div>
          <label className="block text-sm text-[#2C3333]">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter password"
              className="mt-1 w-full border border-[#A5C9CA] rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Remember + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="rounded"
            />
            Remember me
          </label>
          <Link to="/auth/forgot-password" className="text-[#395B64] hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-[#395B64] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Social */}
      <div className="mt-6 text-center text-sm text-gray-500">Or login</div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={googleLogin}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#A5C9CA] bg-white hover:bg-[#E7F6F2] shadow-sm disabled:opacity-60"
        >
          <GoogleIcon />
          <span className="font-medium text-[#2C3333]">Continue with Google</span>
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-700 text-center">
        Don’t have an account?{" "}
        <Link to="/auth/register" className="text-[#395B64] font-medium hover:underline">
          Create Now
        </Link>
      </p>
    </>
  );
};

export default Login;

// src/auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";   // 👁 icons
import { toast } from "react-hot-toast";     // ✅ toast

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
    <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.68 2.6 30.1 0 24 0 14.64 0 6.39 5.43 2.56 13.35l7.98 6.21C12.43 13.74 17.74 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.5 24.5c0-1.57-.14-3.07-.39-4.5H24v9h12.7c-.55 2.97-2.18 5.49-4.63 7.18l7.1 5.51c4.14-3.82 6.53-9.46 6.53-17.19z"/>
    <path fill="#FBBC05" d="M10.54 28.56c-1.04-3.06-1.04-6.56 0-9.62l-7.98-6.21C-1.07 17.6-1.07 30.4 2.56 36.65l7.98-6.21z"/>
    <path fill="#EA4335" d="M24 48c6.1 0 11.26-2 15-5.44l-7.1-5.51c-2.02 1.38-4.59 2.2-7.9 2.2-6.26 0-11.57-4.24-13.46-10.06l-7.98 6.21C6.39 42.57 14.64 48 24 48z"/>
  </svg>
);

const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false); // 👁 toggle
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !mobile || !email || !password) return;
    try {
      setBusy(true);
      await register(email, password);
      toast.success("🎉 Account created successfully!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Sign up failed");
    } finally {
      setBusy(false);
    }
  };

  const googleSignup = async () => {
    try {
      setBusy(true);
      await loginWithGoogle();
      toast.success("🎉 Signed up with Google!");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-[#2C3333]">Create New Account</h2>

      <form onSubmit={handleCreate} className="space-y-4 mt-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-[#2C3333]">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="mt-1 w-full border border-[#A5C9CA] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm text-[#2C3333]">Mobile Number</label>
          <div className="flex">
            <span className="px-3 flex items-center bg-[#E7F6F2] border border-[#A5C9CA] border-r-0 rounded-l-lg text-[#2C3333]">
              +91
            </span>
            <input
              type="tel"
              placeholder="Your number"
              className="flex-1 border border-[#A5C9CA] rounded-r-lg p-3 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-[#2C3333]">Email</label>
          <input
            type="email"
            placeholder="name@domain.com"
            className="mt-1 w-full border border-[#A5C9CA] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password with Eye 👁 */}
        <div>
          <label className="block text-sm text-[#2C3333]">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="mt-1 w-full border border-[#A5C9CA] rounded-lg p-3 pr-10 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-[#395B64] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60"
        >
          {busy ? "Creating..." : "Create Account"}
        </button>
      </form>

      {/* Social */}
      <div className="mt-6 text-center text-sm text-gray-500">Or Continue with Social Accounts</div>
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={googleSignup}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#A5C9CA] bg-white hover:bg-[#E7F6F2] shadow-sm disabled:opacity-60"
        >
          <GoogleIcon />
          <span className="font-medium text-[#2C3333]">Continue with Google</span>
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-700 text-center">
        Already a Member?{" "}
        <Link to="/auth/login" className="text-[#395B64] font-medium hover:underline">
          Login
        </Link>
      </p>
    </>
  );
};

export default Register;

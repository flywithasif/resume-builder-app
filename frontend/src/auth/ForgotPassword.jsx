// src/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      await resetPassword(email);
      setMsg("Reset link sent! Check your inbox.");
    } catch (err) {
      setMsg(err?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#2C3333]">Forgot Password</h2>
      <p className="text-sm text-gray-600 mb-4">
        Enter your registered email, we’ll send a reset link.
      </p>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="email"
          placeholder="name@domain.com"
          className="w-full border border-[#A5C9CA] rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#A5C9CA]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="w-full rounded-lg bg-[#395B64] text-white py-3 font-medium hover:opacity-90 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {msg && <p className="mt-3 text-sm text-[#2C3333]">{msg}</p>}

      <p className="mt-6 text-sm text-gray-700 text-center">
        Remembered it?{" "}
        <Link to="/auth/login" className="text-[#395B64] font-medium hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

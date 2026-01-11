import { useEffect, useMemo, useState } from "react";
import Login from "./Login";
import Register from "./Register";

// Optional Firebase-based lookup (auto-detect if available)
let fetchSignInMethodsForEmail = null;
try {
  // Lazy import if Firebase is installed
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ({ fetchSignInMethodsForEmail } = require("firebase/auth"));
} catch { /* no firebase, fallback to localStorage */ }

const googleIcon = (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.4 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.2-.4-3.5z"/>
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.4 16.2 18.8 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.4 5.1 28.9 3 24 3 16 3 9 7.5 6.3 14.7z"/>
    <path fill="#4CAF50" d="M24 45c5.2 0 9.9-1.7 13.6-4.7l-6.3-5.2C29.1 36.6 26.7 37 24 37c-5.3 0-9.7-3.2-11.4-7.7l-6.6 5.1C9 40.5 16 45 24 45z"/>
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.3-4.5 7-11.3 7-6.6 0-12-5.4-12-12 0-6.6 5.4-12 12-12 3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.4 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.6 20-21 0-1.3-.1-2.2-.4-3.5z"/>
  </svg>
);

function useAccountLookup() {
  // unified check: Firebase if available, else localStorage
  const check = async (email) => {
    if (!email) return { exists: false, source: "none" };

    // Firebase path
    if (typeof fetchSignInMethodsForEmail === "function") {
      try {
        const { auth } = require("../lib/firebase"); // your firebase init
        const methods = await fetchSignInMethodsForEmail(auth, email);
        return { exists: methods && methods.length > 0, source: "firebase" };
      } catch {
        // fall through to localStorage
      }
    }
    // Fallback: localStorage registry
    const raw = localStorage.getItem("registeredEmails");
    const list = raw ? JSON.parse(raw) : [];
    return { exists: list.includes(email), source: "local" };
  };

  const markRegistered = (email) => {
    const raw = localStorage.getItem("registeredEmails");
    const list = raw ? JSON.parse(raw) : [];
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem("registeredEmails", JSON.stringify(list));
    }
  };

  return { check, markRegistered };
}

const AuthPopup = ({ setShowAuthPopup }) => {
  const { check, markRegistered } = useAccountLookup();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | checking | decided
  const [mode, setMode] = useState("login"); // login | register
  const [error, setError] = useState("");

  const canContinue = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  const continueWithEmail = async () => {
    setError("");
    if (!canContinue) return;
    setStatus("checking");
    const res = await check(email.trim());
    setMode(res.exists ? "login" : "register");
    setStatus("decided");
  };

  const handleGoogle = () => {
    alert("Google sign-in: wire this to Firebase later");
    // Example:
    // import { signInWithPopup } from "firebase/auth";
    // import { auth, googleProvider } from "../lib/firebase";
    // await signInWithPopup(auth, googleProvider);
  };

  // When user successfully registers (child tells us), mark email in fallback store
  const onRegistered = () => {
    markRegistered(email.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-[#A5C9CA] bg-white">
        {/* Header */}
        <div className="bg-[#395B64] text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-wide">
              {status === "decided" ? (mode === "login" ? "Login" : "Register") : "Welcome"}
            </h2>
            <button
              onClick={() => setShowAuthPopup(false)}
              aria-label="Close"
              className="rounded-lg px-2 py-1 hover:bg-white/10"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* GOOGLE */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full mb-4 flex items-center justify-center gap-2 rounded-xl border border-[#A5C9CA] px-4 py-2 hover:bg-[#E7F6F2] transition"
          >
            {googleIcon}
            <span className="font-medium text-[#2C3333]">Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-[#A5C9CA]" />
            <span className="px-3 text-sm text-[#395B64]">or</span>
            <div className="flex-1 h-px bg-[#A5C9CA]" />
          </div>

          {/* Step 1: Email gate */}
          {status !== "decided" && (
            <div className="space-y-3">
              <label className="block text-sm text-[#395B64]">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-[#A5C9CA] focus:outline-none focus:ring-2 focus:ring-[#A5C9CA] rounded-xl p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <button
                onClick={continueWithEmail}
                disabled={!canContinue || status === "checking"}
                className="w-full bg-[#395B64] text-white py-2 rounded-xl hover:opacity-90 disabled:opacity-60 transition font-medium"
              >
                {status === "checking" ? "Checking..." : "Continue"}
              </button>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <p className="text-xs text-[#2C3333]/70">
                Hum email check karke decide karenge ki aapko Login dikhana hai ya Register.
              </p>
            </div>
          )}

          {/* Step 2: Decided → show Login or Register with preset email */}
          {status === "decided" && (
            <>
              {mode === "login" ? (
                <Login compact presetEmail={email} />
              ) : (
                <Register compact presetEmail={email} onRegistered={onRegistered} />
              )}

              {/* Toggle link in case user ne galat email daala ho */}
              <div className="text-center mt-4">
                <button
                  onClick={() => {
                    setStatus("idle");
                    setMode("login");
                    setEmail("");
                  }}
                  className="text-[#395B64] font-medium hover:underline"
                >
                  Use a different email
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;

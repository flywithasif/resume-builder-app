// src/pages/TemplateOptions.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const COLORS = {
  ink: "#2C3333",
  primary: "#395B64",
  muted: "#A5C9CA",
  surface: "#E7F6F2",
};

export default function TemplateOptions() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [choice, setChoice] = useState(null); // 'upload' | 'create'

  const handleNext = () => {
    if (!choice) return;
    if (!user) {
      navigate("/login", {
        state: {
          from:
            choice === "upload"
              ? "/upload-resume"
              : `/resume/builder/${templateId}`,
        },
      });
      return;
    }
    if (choice === "upload") navigate("/upload-resume");
    else navigate(`/resume/builder/${templateId}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 font-inter"
      style={{ backgroundColor: COLORS.surface, color: COLORS.ink }}
    >
      {/* Header */}
      <div className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Do you want to upload or create?
        </h1>
        <p
          className="mt-2 text-base md:text-lg"
          style={{ color: COLORS.ink + "CC" }}
        >
          Upload an existing resume or start from scratch
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload */}
        <OptionCard
          active={choice === "upload"}
          onClick={() => setChoice("upload")}
          badge="RECOMMENDED OPTION TO SAVE YOU TIME"
          title="Yes, upload my resume"
          desc="We’ll use your existing resume to fill info and help you improve it."
          icon={<UploadIcon stroke={COLORS.primary} />}
          colors={COLORS}
        />

        {/* Create */}
        <OptionCard
          active={choice === "create"}
          onClick={() => setChoice("create")}
          title="No, start from scratch"
          desc="We’ll guide you through each step so your skills shine."
          icon={<DocIcon stroke={COLORS.primary} />}
          outlined
          colors={COLORS}
        />
      </div>

      {/* Footer */}
      <div className="w-full max-w-5xl flex items-center justify-between mt-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium shadow"
          style={{
            color: COLORS.ink,
            backgroundColor: "#fff",
            border: `2px solid ${COLORS.muted}`,
          }}
        >
          <span className="inline-block -ml-1">&larr;</span> Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!choice}
          className="rounded-full px-8 py-3 text-base font-semibold shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            color: "#fff",
            backgroundColor: COLORS.primary,
            border: `2px solid ${COLORS.primary}`,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* ----------- Card Component ---------- */
function OptionCard({
  active,
  outlined = false,
  badge,
  title,
  desc,
  icon,
  onClick,
  colors,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full text-left rounded-2xl p-6 md:p-8 bg-white transition focus:outline-none"
      style={{
        border: `2px solid ${
          active ? colors.primary : outlined ? colors.primary : colors.ink
        }`,
        boxShadow: active
          ? `0 0 0 4px ${hexToRgba(colors.primary, 0.15)}`
          : "none",
      }}
      aria-pressed={!!active}
    >
      {badge && (
        <span
          className="absolute -top-3 left-6 text-[11px] md:text-xs font-semibold tracking-wide px-3 py-1 rounded-full"
          style={{
            backgroundColor: colors.muted,
            color: colors.ink,
          }}
        >
          {badge}
        </span>
      )}
      <div className="flex items-start gap-5">
        <div
          className="shrink-0 rounded-full p-4"
          style={{
            backgroundColor: hexToRgba(colors.primary, 0.08),
            border: `1px solid ${hexToRgba(colors.primary, 0.25)}`,
          }}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold">{title}</h3>
          <p
            className="mt-2 text-sm md:text-base leading-relaxed"
            style={{ color: colors.ink + "CC" }}
          >
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ----------- Icons ----------- */
function UploadIcon({ stroke }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
}
function DocIcon({ stroke }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="9" y2="9"></line>
    </svg>
  );
}

/* ----------- helper ----------- */
function hexToRgba(hex, alpha = 1) {
  const c = hex.replace("#", "");
  const bigint = parseInt(c, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

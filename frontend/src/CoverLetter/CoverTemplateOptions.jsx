// src/CoverLetter/CoverTemplateOptions.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const COLORS = {
  ink: "#2C3333",
  primary: "#395B64",
  muted: "#A5C9CA",
  surface: "#E7F6F2",
};

export default function CoverTemplateOptions() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [choice, setChoice] = useState(null); // 'upload' | 'scratch'

  const goNext = () => {
    if (choice === "upload") navigate("/upload-cover");
    if (choice === "scratch") navigate(`/cover/builder/${templateId || "1"}`);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: COLORS.surface, color: COLORS.ink }}
    >
      {/* Header */}
      <div className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Are you uploading an existing resume?
        </h1>
        <p className="mt-2 text-base md:text-lg" style={{ color: COLORS.ink + "CC" }}>
          Just review, edit, and update it with new information
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload existing */}
        <OptionCard
          active={choice === "upload"}
          onClick={() => setChoice("upload")}
          badge="RECOMMENDED OPTION TO SAVE YOU TIME"
          title="Yes, upload from my resume"
          desc="We'll give you expert guidance to fill out your info and enhance your resume, from start to finish"
          icon={<UploadIcon stroke={COLORS.primary} />}
          colors={COLORS}
        />

        {/* Start from scratch */}
        <OptionCard
          active={choice === "scratch"}
          onClick={() => setChoice("scratch")}
          title="No, start from scratch"
          desc="We'll guide you through the whole process so your skills can shine"
          icon={<DocIcon stroke={COLORS.primary} />}
          outlined
          colors={COLORS}
        />
      </div>

      {/* Footer actions */}
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
          onClick={goNext}
          disabled={!choice}
          className="rounded-full px-8 py-3 text-base font-semibold shadow transition disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            color: "#fff",
            backgroundColor: COLORS.primary,
            boxShadow: `0 6px 0 ${shade(COLORS.primary, -18)}`,
            border: `2px solid ${COLORS.primary}`,
          }}
          aria-disabled={!choice}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* ---------- Reusable Card ---------- */
function OptionCard({ active, outlined = false, badge, title, desc, icon, onClick, colors }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-full text-left rounded-2xl p-6 md:p-8 bg-white transition focus:outline-none"
      style={{
        border: `2px solid ${active ? colors.primary : outlined ? colors.primary : colors.ink}`,
        boxShadow: active ? `0 0 0 4px ${hexToRgba(colors.primary, 0.15)}` : "none",
      }}
      aria-pressed={!!active}
    >
      {/* Recommended badge */}
      {badge && (
        <span
          className="absolute -top-3 left-6 text-[11px] md:text-xs font-semibold tracking-wide px-3 py-1 rounded-full"
          style={{
            backgroundColor: colors.muted,
            color: colors.ink,
            boxShadow: "0 2px 0 rgba(0,0,0,.06)",
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
          <p className="mt-2 text-sm md:text-base leading-relaxed" style={{ color: colors.ink + "CC" }}>
            {desc}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ---------- Icons (inline SVG, palette-aware) ---------- */
function UploadIcon({ stroke = "#395B64" }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );
}
function DocIcon({ stroke = "#395B64" }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <line x1="10" y1="9" x2="9" y2="9"></line>
    </svg>
  );
}

/* ---------- Small helpers ---------- */
function shade(hex, amt) {
  // amt: -100..100 (darken/lighten)
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `#${(b | (g << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
}
function hexToRgba(hex, alpha = 1) {
  const c = hex.replace("#", "");
  const bigint = parseInt(c, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

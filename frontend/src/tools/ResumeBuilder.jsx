// src/tools/ResumeBuilder.jsx  (path adjust karo jahan tumhari file hai)
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";
import html2pdf from "html2pdf.js";
import { toast } from "react-hot-toast";

// Templates
import Temp1 from "../ResumeTem/Temp1";
import Temp2 from "../ResumeTem/Temp2";
import Temp3 from "../ResumeTem/Temp3";
import Temp4 from "../ResumeTem/Temp4";
import Temp5 from "../ResumeTem/Temp5";
import Temp6 from "../ResumeTem/Temp6";
import Temp7 from "../ResumeTem/Temp7";
import Temp8 from "../ResumeTem/Temp8";

// Components
import ResumeForm from "../components/ResumeForm";

/** Map templateId → component */
const templatesMap = {
  "1": Temp1,
  "2": Temp2,
  "3": Temp3,
  "4": Temp4,
  "5": Temp5,
  "6": Temp6,
  "7": Temp7,
  "8": Temp8,
};

/** Theme palette */
const PALETTE = [
  { key: "blue",   hex: "#2563EB" },
  { key: "green",  hex: "#16A34A" },
  { key: "purple", hex: "#9333EA" },
  { key: "gray",   hex: "#111827" },
  { key: "teal",   hex: "#0EA5E9" },
  { key: "red",    hex: "#DC2626" },
  { key: "amber",  hex: "#F59E0B" },
];

export default function ResumeBuilder() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { formData, setTemplateId, saveResume, updateSavedResume, clearForm } =
    useFormContext();

  const [editingId, setEditingId] = useState(null);

  // selected theme key + accent hex (independent so custom color works)
  const [colorKey, setColorKey] = useState("blue");
  const [accent, setAccent] = useState(PALETTE[0].hex);

  useEffect(() => {
    const preset = PALETTE.find((p) => p.key === colorKey);
    if (preset) setAccent(preset.hex);
  }, [colorKey]);

  const previewRef = useRef(null);

  // lock templateId into context
  useEffect(() => setTemplateId(templateId), [templateId, setTemplateId]);

  const SelectedTemplate = templatesMap[templateId] || Temp1;

  // save to dashboard
  const onSave = () => {
    if (!formData?.name) {
      toast.error("Please fill your name before saving!");
      return null;
    }
    if (editingId) {
      updateSavedResume(editingId);
      toast.success("Resume updated in Dashboard!");
      return editingId;
    } else {
      const newId = saveResume();
      setEditingId(newId);
      toast.success("Resume saved to Dashboard!");
      return newId;
    }
  };

  // download exactly what you see in preview
  const handleDownloadPDF = () => {
    const id = onSave();
    if (!id) return;
    if (!previewRef.current) {
      toast.error("Preview not found!");
      return;
    }

    const element = previewRef.current;

    const opt = {
      margin: [0, 0, 0, 0],
      filename: `${formData?.name || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        scrollY: 0,
        backgroundColor: "#ffffff",
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-white p-3 md:p-6">
      <StyleBlock />

      {/* 50/50 responsive layout */}
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Left — Form */}
        <div className="rounded-xl border border-[#A5C9CA] bg-[#E7F6F2]">
          <div className="p-4 sm:p-6">
            <ResumeForm />
          </div>
        </div>

        {/* Right — Live preview + actions */}
        <div className="flex flex-col gap-4">
          {/* Header: theme + actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            {/* Theme dots */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-600">Theme:</span>
              {PALETTE.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setColorKey(p.key)}
                  className={`w-6 h-6 rounded-full border shadow ${
                    colorKey === p.key ? "ring-2 ring-offset-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: p.hex }}
                  aria-label={`Theme ${p.key}`}
                  title={p.key}
                />
              ))}

              {/* Custom color */}
              <label className="ml-1 inline-flex items-center gap-2 text-xs text-gray-600">
                <span>Custom</span>
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => {
                    setColorKey("custom");
                    setAccent(e.target.value);
                  }}
                  className="w-8 h-5 border rounded p-0"
                />
              </label>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownloadPDF}
                className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
                aria-label="Download PDF"
              >
                Download
              </button>
              <button
                onClick={onSave}
                className="px-3 py-1 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm"
                aria-label="Save to Dashboard"
              >
                Save
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-3 py-1 rounded-md bg-gray-900 text-white hover:bg-black text-sm"
                aria-label="Go to Dashboard"
              >
                Dashboard
              </button>
              <button
                onClick={clearForm}
                className="px-3 py-1 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm"
                aria-label="Clear Form"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Info line */}
          <div className="text-xs md:text-sm text-gray-500">
            Template #{templateId} • Theme: {colorKey} •{" "}
            <span
              className="inline-block align-middle rounded px-2 py-[2px] border"
              style={{ borderColor: accent, color: accent }}
            >
              accent
            </span>
          </div>

          {/* Live Preview wrapper sets CSS var `--accent` */}
          {/* IMPORTANT: templates should render one/more .a4-page blocks */}
          <div ref={previewRef} className="w-full overflow-auto" style={{ "--accent": accent }}>
            {SelectedTemplate ? (
              <SelectedTemplate
                formData={formData}
                colorTheme={colorKey} // legacy prop (keep)
                accent={accent}       // new prop (hex)
              />
            ) : (
              <div className="p-4 text-red-600">Template not found.</div>
            )}
          </div>

          <p className="text-xs text-gray-500">
            Tip: Templates may use <code>var(--accent)</code> for colors. PDF matches preview exactly.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small style helper so templates can use .accent etc. ---------- */
function StyleBlock() {
  return (
    <style>{`
      .accent { color: var(--accent); }
      .bg-accent { background: var(--accent); }
      .border-accent { border-color: var(--accent); }
    `}</style>
  );
}

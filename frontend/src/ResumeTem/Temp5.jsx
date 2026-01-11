// src/ResumeTem/Temp5.jsx
import React, { useMemo } from "react";
import { useFormContext } from "../context/FormContext";

/**
 * Template 5 (Chip & Tag style)
 * - A4 print/PDF safe (preview = PDF)
 * - Uses FormContext data shape
 *   experiences[], educations[], skills:string[], languages:string[]
 * - Summary: multiline → bullets
 * - Contact badges, skill/language chips
 * - Safe page-break helpers
 */

const themes = {
  blue: {
    text: "text-blue-700",
    border: "border-blue-600",
    pill: "bg-blue-100 text-blue-700 border-blue-600",
  },
  green: {
    text: "text-green-700",
    border: "border-green-600",
    pill: "bg-green-100 text-green-700 border-green-600",
  },
  purple: {
    text: "text-purple-700",
    border: "border-purple-600",
    pill: "bg-purple-100 text-purple-700 border-purple-600",
  },
  gray: {
    text: "text-gray-700",
    border: "border-gray-700",
    pill: "bg-gray-100 text-gray-700 border-gray-600",
  },
};

export default function Temp5({ formData: propData, colorTheme = "blue" }) {
  const ctx = useFormContext?.();
  const formData = propData || ctx?.formData || {};
  const t = themes[colorTheme] || themes.blue;

  const contactKeys = [
    "email",
    "phone",
    "address",
    "city",
    "state",
    "country",
    "pincode",
    "linkedin",
    "github",
    "website",
    "portfolio",
  ];

  const summaryBullets = useMemo(() => {
    return (formData.summary || "")
      .split(/\r?\n|\u2022|\-|•/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [formData.summary]);

  const skills = Array.isArray(formData.skills) ? formData.skills : [];
  const languages = Array.isArray(formData.languages) ? formData.languages : [];
  const experiences = Array.isArray(formData.experiences) ? formData.experiences : [];
  const educations = Array.isArray(formData.educations) ? formData.educations : [];

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <style>{`
        @media print { .no-print { display:none!important } }
        .a4-page { width:210mm; min-height:297mm; background:white; }
        .a4-content { padding:32px; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        .page-break { break-before: page; page-break-before: always; }
      `}</style>

      <div className="a4-page">
        <div className="a4-content text-gray-800">
          {/* Header */}
          <div className={`flex items-center justify-between pb-4 mb-6 border-b-2 ${t.border}`}>
            <div>
              <h1 className="text-3xl font-bold">{formData.name || "John Doe"}</h1>
              <p className="text-lg text-gray-600">{formData.title || "Frontend Developer"}</p>
            </div>
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border"
              />
            ) : null}
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {contactKeys.map((f) =>
              formData[f] ? (
                <div key={f} className="text-sm flex gap-2 items-center">
                  <span className={`font-semibold px-2 py-1 rounded-full uppercase border ${t.pill}`}>{f}</span>
                  <span className="break-all">{formData[f]}</span>
                </div>
              ) : null
            )}
          </div>

          {/* Summary */}
          {summaryBullets.length > 0 && (
            <div className="mb-6 avoid-break">
              <h2 className={`text-xl font-semibold mb-2 ${t.text}`}>Profile</h2>
              <ul className="list-disc ml-5 space-y-1">
                {summaryBullets.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className={`text-xl font-semibold mb-2 ${t.text}`}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full border ${t.pill} text-sm font-medium`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className={`text-xl font-semibold mb-2 ${t.text}`}>Languages</h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <span key={i} className={`px-3 py-1 rounded-full border ${t.pill} text-sm font-medium`}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div className="mb-6">
              <h2 className={`text-xl font-semibold mb-2 ${t.text}`}>Experience</h2>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i} className={`border-l-4 pl-4 avoid-break ${t.border}`}>
                    <h3 className="font-semibold text-[15px]">{exp.jobTitle || "Job Title"}</h3>
                    <p className="text-gray-600 text-[12px]">{[exp.company, exp.location].filter(Boolean).join(" | ")}</p>
                    <p className="text-[12px] text-gray-500">
                      {(exp.startDate || "").toString()} - {exp.current ? "Present" : (exp.endDate || "")}
                    </p>
                    {exp.description && (
                      <p className="mt-1 text-[12px] whitespace-pre-line">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {educations.length > 0 && (
            <div className="mb-6">
              <h2 className={`text-xl font-semibold mb-2 ${t.text}`}>Education</h2>
              <div className="space-y-4">
                {educations.map((edu, i) => (
                  <div key={i} className={`border-l-4 pl-4 avoid-break ${t.border}`}>
                    <h3 className="font-semibold text-[15px]">{edu.degree || "Degree"}</h3>
                    <p className="text-gray-600 text-[12px]">{[edu.institution, edu.location].filter(Boolean).join(" | ")}</p>
                    <p className="text-[12px] text-gray-500">
                      {(edu.startDate || "").toString()} - {(edu.endDate || "").toString()}
                    </p>
                    {edu.score && <p className="text-[12px]">{edu.score}</p>}
                    {edu.description && (
                      <p className="mt-1 text-[12px] whitespace-pre-line">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

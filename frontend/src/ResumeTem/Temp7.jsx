// src/ResumeTem/Temp7.jsx
import React, { useMemo } from "react";
import { useFormContext } from "../context/FormContext";
import { MdWork, MdSchool, MdTranslate, MdPhone, MdEmail, MdWeb, MdFolderOpen } from "react-icons/md";
import { FaStar } from "react-icons/fa";

/**
 * Template 7 (Teal Header, Two Columns)
 * - A4 print/PDF safe (preview == PDF)
 * - Uses FormContext when prop not provided
 * - Robust guards for missing fields
 * - Summary multiline -> bullets
 * - Safe page-break helpers
 */

const theme = {
  blue: { text: "text-[#007B8A]", border: "border-[#007B8A]", bg: "bg-[#007B8A]" },
  green: { text: "text-green-600", border: "border-green-600", bg: "bg-green-600" },
  purple: { text: "text-purple-600", border: "border-purple-600", bg: "bg-purple-600" },
  gray: { text: "text-gray-700", border: "border-gray-700", bg: "bg-gray-700" },
};

export default function Temp7({ formData: propData, colorTheme = "blue" }) {
  const ctx = useFormContext?.();
  const formData = propData || ctx?.formData || {};
  const t = theme[colorTheme] || theme.blue;

  const experiences = Array.isArray(formData.experiences) ? formData.experiences : [];
  const educations = Array.isArray(formData.educations) ? formData.educations : [];
  const skills = Array.isArray(formData.skills) ? formData.skills : [];
  const languages = Array.isArray(formData.languages) ? formData.languages : [];
  const projects = Array.isArray(formData.projects) ? formData.projects : [];

  const summaryBullets = useMemo(() => {
    return (formData.summary || "")
      .split(/\r?\n|\u2022|•|\-/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [formData.summary]);

  return (
    <div className="w-full flex flex-col items-center font-sans text-gray-900">
      <style>{`
        @media print { .no-print { display:none!important } }
        .a4-page { width:210mm; min-height:297mm; background:white; }
        .a4-content { padding:0; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
      `}</style>

      <div className="a4-page">
        <div className="a4-content">
          {/* Top Header */}
          <div className={`p-8 ${t.bg} text-white`}>
            <div className="flex items-center gap-6">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-white" />
              ) : null}
              <div>
                <h1 className="text-3xl font-bold leading-tight">{formData.name || "Your Name"}</h1>
                <p className="text-lg opacity-90">{formData.title || "Job Title"}</p>
              </div>
            </div>
            {summaryBullets.length > 0 && (
              <ul className="mt-4 list-disc pl-6 text-sm opacity-95 space-y-1">
                {summaryBullets.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Body Two Columns */}
          <div className="grid grid-cols-[1fr_70mm]">
            {/* Left main */}
            <div className="p-8">
              {/* Experience */}
              {experiences.length > 0 && (
                <section className="mb-6">
                  <h2 className={`text-xl font-bold border-b-2 pb-2 mb-3 ${t.border} ${t.text} flex items-center gap-2`}>
                    <MdWork /> <span>WORK EXPERIENCE</span>
                  </h2>
                  <div className="space-y-3">
                    {experiences.map((exp, index) => (
                      <div key={index} className="avoid-break">
                        <h3 className="text-[15px] font-semibold">{exp.jobTitle}</h3>
                        <p className="text-[12px] text-gray-600 italic">{[exp.company, exp.location].filter(Boolean).join(" • ")}</p>
                        <p className="text-[12px] text-gray-500">{(exp.startDate || "").toString()} - {exp.current ? "Present" : (exp.endDate || "")}</p>
                        {exp.description && (
                          <ul className="list-disc list-inside mt-1 text-[12px] space-y-0.5">
                            {String(exp.description).split(/\r?\n/).map((d, i) => d.trim()).filter(Boolean).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {educations.length > 0 && (
                <section className="mb-6">
                  <h2 className={`text-xl font-bold border-b-2 pb-2 mb-3 ${t.border} ${t.text} flex items-center gap-2`}>
                    <MdSchool /> <span>EDUCATION</span>
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu, index) => (
                      <div key={index} className="avoid-break">
                        <h3 className="text-[15px] font-semibold">{edu.degree}</h3>
                        <p className="text-[12px] text-gray-600 italic">{[edu.institution, edu.location].filter(Boolean).join(" • ")}</p>
                        <p className="text-[12px] text-gray-500">{(edu.startDate || "").toString()} - {(edu.endDate || "").toString()}</p>
                        {edu.description && (
                          <ul className="list-disc list-inside mt-1 text-[12px] space-y-0.5">
                            {String(edu.description).split(/\r?\n/).map((d) => d.trim()).filter(Boolean).map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        )}
                        {edu.score && <p className="text-[12px]">Score: {edu.score}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {projects.length > 0 && (
                <section>
                  <h2 className={`text-xl font-bold border-b-2 pb-2 mb-3 ${t.border} ${t.text} flex items-center gap-2`}>
                    <MdFolderOpen /> <span>PROJECTS</span>
                  </h2>
                  <div className="space-y-3">
                    {projects.map((proj, index) => (
                      <div key={index} className="avoid-break">
                        <h3 className="text-[15px] font-semibold">{proj.name}</h3>
                        {(proj.role || proj.tech) && (
                          <p className="text-[12px]">{[proj.role, proj.tech].filter(Boolean).join(" | ")}</p>
                        )}
                        {proj.link && (
                          <a href={proj.link} target="_blank" rel="noreferrer" className={`text-[12px] underline ${t.text}`}>{proj.link}</a>
                        )}
                        {proj.description && (
                          <p className="text-[12px] mt-1 whitespace-pre-line">{proj.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right sidebar */}
            <aside className="p-8 bg-gray-100 border-l border-gray-200">
              {/* Contact */}
              {(formData.phone || formData.email || formData.website || formData.linkedin || formData.github) && (
                <section className="mb-6">
                  <h2 className={`text-lg font-bold border-b-2 pb-2 mb-3 ${t.border} ${t.text} flex items-center gap-2`}>
                    <MdPhone /> <span>CONTACT</span>
                  </h2>
                  <ul className="text-[12px] space-y-1">
                    {formData.phone && <li className="flex items-center gap-2"><MdPhone className={t.text} /> {formData.phone}</li>}
                    {formData.email && <li className="flex items-center gap-2"><MdEmail className={t.text} /> {formData.email}</li>}
                    {formData.website && <li className="flex items-center gap-2"><MdWeb className={t.text} /> {formData.website}</li>}
                    {formData.linkedin && <li className="flex items-center gap-2"><MdWeb className={t.text} /> {formData.linkedin}</li>}
                    {formData.github && <li className="flex items-center gap-2"><MdWeb className={t.text} /> {formData.github}</li>}
                  </ul>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section className="mb-6">
                  <h2 className={`text-lg font-bold border-b-2 pb-2 mb-3 ${t.border} ${t.text} flex items-center gap-2`}>
                    <FaStar /> <span>HARD SKILLS</span>
                  </h2>
                  <ul className="list-disc list-inside text-[12px] space-y-1">
                    {skills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section>
                  <h2 className={`text-lg font-bold border-b-2 pb-2 mb-3 ${t.border} ${t.text} flex items-center gap-2`}>
                    <MdTranslate /> <span>LANGUAGES</span>
                  </h2>
                  <ul className="list-disc list-inside text-[12px] space-y-1">
                    {languages.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

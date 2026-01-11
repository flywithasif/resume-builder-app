// src/ResumeTem/Temp8.jsx
import React, { useMemo } from "react";
import { useFormContext } from "../context/FormContext";
import { MdPhone, MdEmail, MdWeb, MdLocationOn } from "react-icons/md";

/**
 * Template 8 (Dark sidebar + yellow accent)
 * - A4 print/PDF safe (preview == PDF)
 * - Uses FormContext when prop not provided
 * - Guards for missing fields + safe bullet handling
 * - Supports: experiences, educations, projects, certifications, hobbies, references
 */

const theme = {
  yellow: { text: "text-[#F5B800]", bg: "bg-[#292A2C]", accent: "bg-[#F5B800]" },
  blue: { text: "text-blue-600", bg: "bg-blue-800", accent: "bg-blue-600" },
  green: { text: "text-green-600", bg: "bg-green-800", accent: "bg-green-600" },
  purple: { text: "text-purple-600", bg: "bg-purple-800", accent: "bg-purple-600" },
  gray: { text: "text-gray-700", bg: "bg-gray-800", accent: "bg-gray-600" },
};

export default function Temp8({ formData: propData, colorTheme = "yellow" }) {
  const ctx = useFormContext?.();
  const formData = propData || ctx?.formData || {};
  const t = theme[colorTheme] || theme.yellow;

  const experiences = Array.isArray(formData.experiences) ? formData.experiences : [];
  const educations = Array.isArray(formData.educations) ? formData.educations : [];
  const skills = Array.isArray(formData.skills) ? formData.skills : [];
  const projects = Array.isArray(formData.projects) ? formData.projects : [];
  const languages = Array.isArray(formData.languages) ? formData.languages : [];
  const certifications = Array.isArray(formData.certifications) ? formData.certifications : [];

  const summaryBullets = useMemo(() => {
    return (formData.summary || "")
      .split(/\r?\n|\u2022|•|\-/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [formData.summary]);

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <style>{`
        @media print { .no-print { display:none!important } }
        .a4-page { width:210mm; min-height:297mm; background:white; }
        .a4-content { padding:0; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
      `}</style>

      <div className="a4-page">
        <div className="a4-content grid grid-cols-[70mm_1fr]">
          {/* Sidebar */}
          <aside className={`${t.bg} text-white p-8 flex flex-col items-center min-h-full`}>
            {/* Profile */}
            <div className="mb-6 flex flex-col items-center text-center">
              {formData.photo ? (
                <img src={formData.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white mb-3" />
              ) : null}
              <h1 className="text-xl font-bold">{formData.name || "Your Name"}</h1>
              <p className="text-[12px] opacity-90">{formData.title || "Your Title"}</p>
            </div>

            {/* Divider */}
            <div className={`h-1.5 w-full ${t.accent} mb-3`} />

            {/* Contact */}
            {(formData.phone || formData.email || formData.website || formData.linkedin || formData.github || formData.address) && (
              <section className="w-full mb-5">
                <h2 className="text-sm font-semibold mb-2">CONTACT</h2>
                <ul className="text-[12px] space-y-1 opacity-95">
                  {formData.phone && (
                    <li className="flex items-center"><MdPhone className={`${t.text} mr-2`} /> {formData.phone}</li>
                  )}
                  {formData.email && (
                    <li className="flex items-center"><MdEmail className={`${t.text} mr-2`} /> {formData.email}</li>
                  )}
                  {formData.website && (
                    <li className="flex items-center"><MdWeb className={`${t.text} mr-2`} /> {formData.website}</li>
                  )}
                  {formData.linkedin && (
                    <li className="flex items-center"><MdWeb className={`${t.text} mr-2`} /> {formData.linkedin}</li>
                  )}
                  {formData.github && (
                    <li className="flex items-center"><MdWeb className={`${t.text} mr-2`} /> {formData.github}</li>
                  )}
                  {formData.address && (
                    <li className="flex items-center"><MdLocationOn className={`${t.text} mr-2`} /> {formData.address}</li>
                  )}
                </ul>
              </section>
            )}

            {/* Awards / Certifications */}
            {certifications.length > 0 && (
              <section className="w-full mb-5">
                <div className={`h-1.5 w-full ${t.accent} mb-3`} />
                <h2 className="text-sm font-semibold mb-2">AWARDS</h2>
                <ul className="text-[12px] space-y-1 opacity-95">
                  {certifications.map((c, i) => (
                    <li key={i}>
                      <p className="font-medium">{c.name}</p>
                      {(c.authority || c.year) && (
                        <p className="opacity-80">{[c.authority, c.year].filter(Boolean).join(" | ")}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="w-full">
                <div className={`h-1.5 w-full ${t.accent} mb-3`} />
                <h2 className="text-sm font-semibold mb-2">PRO SKILLS</h2>
                <ul className="text-[12px] space-y-1 opacity-95">
                  {skills.map((s, i) => (
                    <li key={i} className="flex items-center justify-between gap-2">
                      <span>{String(s?.name || s)}</span>
                      {typeof s === "object" && typeof s.level === "number" ? (
                        <div className="h-1 w-2/5 bg-white/30 rounded-full">
                          <div className={`${t.accent} h-1 rounded-full`} style={{ width: `${Math.min(Math.max(s.level, 0), 100)}%` }} />
                        </div>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>

          {/* Main content */}
          <main className="p-10 text-gray-900">
            {/* About */}
            {summaryBullets.length > 0 && (
              <section className="mb-6 avoid-break">
                <h2 className={`text-xl font-bold pb-2 mb-3 ${t.text}`}>ABOUT ME</h2>
                <ul className="list-disc pl-5 text-[12px] space-y-1">
                  {summaryBullets.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-xl font-bold pb-2 mb-3 ${t.text}`}>EXPERIENCE</h2>
                <div className="relative">
                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-5 relative pl-6 avoid-break">
                      <span className={`absolute left-0 top-0 h-3 w-3 rounded-full ${t.accent} -translate-x-1/2`} />
                      <span className={`absolute left-0 top-3 h-full w-px ${t.text}`} />
                      <h3 className="text-[15px] font-semibold">{exp.jobTitle}</h3>
                      <p className="text-[12px] text-gray-600 italic">{[exp.company, exp.location].filter(Boolean).join(" • ")}</p>
                      <p className="text-[12px] text-gray-500">{(exp.startDate || "").toString()} - {exp.current ? "Present" : (exp.endDate || "")}</p>
                      {exp.description && (
                        <ul className="list-disc list-inside mt-1 text-[12px] space-y-0.5">
                          {String(exp.description).split(/\r?\n/).map((point) => point.trim()).filter(Boolean).map((point, i) => (
                            <li key={i}>{point}</li>
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
                <h2 className={`text-xl font-bold pb-2 mb-3 ${t.text}`}>EDUCATION</h2>
                <div className="relative">
                  {educations.map((edu, index) => (
                    <div key={index} className="mb-5 relative pl-6 avoid-break">
                      <span className={`absolute left-0 top-0 h-3 w-3 rounded-full ${t.accent} -translate-x-1/2`} />
                      <span className={`absolute left-0 top-3 h-full w-px ${t.text}`} />
                      <h3 className="text-[15px] font-semibold">{edu.degree}</h3>
                      <p className="text-[12px] text-gray-600 italic">{[edu.institution, edu.location].filter(Boolean).join(" • ")}</p>
                      <p className="text-[12px] text-gray-500">{(edu.startDate || "").toString()} - {(edu.endDate || "").toString()}</p>
                      {edu.score && <p className="text-[12px]">{edu.score}</p>}
                      {edu.description && (
                        <ul className="list-disc list-inside mt-1 text-[12px] space-y-0.5">
                          {String(edu.description).split(/\r?\n/).map((d) => d.trim()).filter(Boolean).map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="mb-6">
                <h2 className={`text-xl font-bold pb-2 mb-3 ${t.text}`}>PROJECTS</h2>
                <div className="space-y-3">
                  {projects.map((proj, index) => (
                    <div key={index} className="avoid-break">
                      <h3 className="text-[15px] font-semibold">{proj.name}</h3>
                      {(proj.role || proj.tech) && (
                        <p className="text-[12px]">{[proj.role, proj.tech].filter(Boolean).join(" | ")}</p>
                      )}
                      {proj.link && (
                        <a className={`text-[12px] underline ${t.text}`} href={proj.link} target="_blank" rel="noreferrer">{proj.link}</a>
                      )}
                      {proj.description && (
                        <p className="text-[12px] mt-1 whitespace-pre-line">{proj.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* References + Hobbies */}
            <div className="grid grid-cols-2 gap-6">
              {Array.isArray(formData.references) && formData.references.length > 0 && (
                <section>
                  <h2 className={`text-xl font-bold pb-2 mb-3 ${t.text}`}>REFERENCE</h2>
                  <div className="space-y-3">
                    {formData.references.map((ref, index) => (
                      <div key={index} className="avoid-break">
                        <h3 className="text-[15px] font-semibold">{ref.name}</h3>
                        {(ref.company || ref.position) && (
                          <p className="text-[12px] text-gray-600 italic">{[ref.position, ref.company].filter(Boolean).join(" • ")}</p>
                        )}
                        {(ref.email || ref.phone) && (
                          <p className="text-[12px] text-gray-500">{[ref.email, ref.phone].filter(Boolean).join(" | ")}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {Array.isArray(formData.hobbies) && formData.hobbies.length > 0 && (
                <section>
                  <h2 className={`text-xl font-bold pb-2 mb-3 ${t.text}`}>HOBBIES</h2>
                  <div className="flex flex-wrap gap-3 text-[12px]">
                    {formData.hobbies.map((hobby, index) => (
                      <span key={index} className={`px-3 py-1 rounded-full border ${t.text} ${t.bg.replace("bg-", "border-")}`}>{hobby}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

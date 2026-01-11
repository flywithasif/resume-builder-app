// src/ResumeTem/Temp4.jsx
import React from "react";
import { useFormContext } from "../context/FormContext";

/**
 * Template 4 (Sidebar Dark)
 * - A4 page (210×297mm) print/PDF safe
 * - Dark sidebar (themeable) + light main
 * - Compatible with FormContext data shape
 *   (skills/languages can be string[] OR {name,level}%[])
 * - Safe page-break helpers, avoid section splits
 */

const theme = {
  blue: { sidebar: "bg-blue-800", accent: "text-blue-200", bar: "bg-blue-600" },
  green: { sidebar: "bg-green-800", accent: "text-green-200", bar: "bg-green-600" },
  purple: { sidebar: "bg-purple-800", accent: "text-purple-200", bar: "bg-purple-600" },
  gray: { sidebar: "bg-gray-800", accent: "text-gray-200", bar: "bg-gray-600" },
};

function asNameLevelList(arr = []) {
  // Accept ["React","Node"] OR [{name:"React", level:90}]
  return arr.map((x) =>
    typeof x === "string" ? { name: x, level: undefined } : { name: x?.name || "", level: x?.level }
  );
}

export default function Temp4({ colorTheme = "gray" }) {
  const { formData } = useFormContext();
  const t = theme[colorTheme] || theme.gray;

  const skills = asNameLevelList(formData.skills || []);
  const languages = asNameLevelList(formData.languages || []);

  return (
    <div className="w-full flex flex-col items-center">
      <style>{`
        @media print { .no-print { display:none!important } }
        .a4-page { width:210mm; min-height:297mm; background:white; }
        .a4-content { padding:32px; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        .page-break { break-before: page; page-break-before: always; }
      `}</style>

      <div className="a4-page">
        <div className="a4-content grid grid-cols-[72mm_1fr] gap-0 font-sans text-[12px] leading-5 text-gray-900">
          {/* Left Sidebar */}
          <aside className={`${t.sidebar} text-white p-6 flex flex-col items-center min-h-full`}>
            {/* Profile Image */}
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover mb-3 border-4 border-white"
              />
            ) : null}

            {/* Name & Role */}
            <h1 className="text-xl font-bold text-center">{formData.name || "Your Name"}</h1>
            {(formData.title || formData.role) && (
              <p className="text-[12px] opacity-80 mb-4 text-center">
                {formData.title || formData.role}
              </p>
            )}

            {/* About (from summary) */}
            {formData.summary && (
              <div className="w-full mb-4">
                <h2 className={`text-sm font-semibold mb-1 ${t.accent}`}>About Me</h2>
                <p className="text-[12px] opacity-95 whitespace-pre-line">{formData.summary}</p>
              </div>
            )}

            {/* Links */}
            {(formData.linkedin || formData.github || formData.website || formData.portfolio || formData.twitter) && (
              <div className="w-full mb-4">
                <h2 className={`text-sm font-semibold mb-1 ${t.accent}`}>Links</h2>
                <div className="space-y-1 text-[12px]">
                  {formData.linkedin && (
                    <p>
                      LinkedIn: <a href={formData.linkedin} className="underline" target="_blank" rel="noreferrer">{formData.linkedin}</a>
                    </p>
                  )}
                  {formData.github && (
                    <p>
                      GitHub: <a href={formData.github} className="underline" target="_blank" rel="noreferrer">{formData.github}</a>
                    </p>
                  )}
                  {formData.website && (
                    <p>
                      Website: <a href={formData.website} className="underline" target="_blank" rel="noreferrer">{formData.website}</a>
                    </p>
                  )}
                  {formData.portfolio && (
                    <p>
                      Portfolio: <a href={formData.portfolio} className="underline" target="_blank" rel="noreferrer">{formData.portfolio}</a>
                    </p>
                  )}
                  {formData.twitter && (
                    <p>
                      Twitter: <a href={formData.twitter} className="underline" target="_blank" rel="noreferrer">{formData.twitter}</a>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Reference (optional custom fields) */}
            {(formData.referenceName || formData.referencePosition || formData.referencePhone || formData.referenceEmail) && (
              <div className="w-full mb-4">
                <h2 className={`text-sm font-semibold mb-1 ${t.accent}`}>Reference</h2>
                {formData.referenceName && <p className="text-[12px]">{formData.referenceName}</p>}
                {formData.referencePosition && <p className="text-[12px]">{formData.referencePosition}</p>}
                {formData.referencePhone && <p className="text-[12px]">{formData.referencePhone}</p>}
                {formData.referenceEmail && <p className="text-[12px]">{formData.referenceEmail}</p>}
              </div>
            )}

            {/* Hobbies (optional, if present) */}
            {Array.isArray(formData.hobbies) && formData.hobbies.length > 0 && (
              <div className="w-full">
                <h2 className={`text-sm font-semibold mb-1 ${t.accent}`}>Hobbies</h2>
                <ul className="text-[12px] list-disc list-inside opacity-95">
                  {formData.hobbies.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* Right Content */}
          <main className="p-6">
            {/* Contact Info */}
            {(formData.address || formData.phone || formData.email) && (
              <div className="flex flex-col items-end mb-4 text-[12px]">
                {formData.address && <p>{formData.address}</p>}
                {formData.phone && <p>{formData.phone}</p>}
                {formData.email && <p>{formData.email}</p>}
              </div>
            )}

            {/* Work Experience */}
            {Array.isArray(formData.experiences) && formData.experiences.length > 0 && (
              <section className="mb-4">
                <h2 className="text-lg font-semibold border-b pb-1 mb-3">Work Experience</h2>
                <div className="space-y-3">
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="avoid-break">
                      <div className="flex flex-wrap justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-[13px]">{exp.company}</h3>
                          <p className="text-[12px] opacity-80">{exp.location}</p>
                          <p className="text-[12px] opacity-80">
                            {(exp.startDate || "").toString()} - {exp.current ? "Present" : (exp.endDate || "")}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[13px]">{exp.jobTitle}</h3>
                        </div>
                      </div>
                      {exp.description && (
                        <ul className="list-disc list-inside text-[12px] mt-1">
                          {exp.description.split(/\r?\n/).filter(Boolean).map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {Array.isArray(formData.educations) && formData.educations.length > 0 && (
              <section className="mb-4">
                <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
                <div className="space-y-3">
                  {formData.educations.map((edu, index) => (
                    <div key={index} className="avoid-break">
                      <div className="flex flex-wrap justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-[13px]">{edu.institution}</h3>
                          <p className="text-[12px] opacity-80">{edu.location}</p>
                          <p className="text-[12px] opacity-80">
                            {(edu.startDate || "").toString()} - {(edu.endDate || "").toString()}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[13px]">{edu.degree}</h3>
                        </div>
                      </div>
                      {edu.description && (
                        <ul className="list-disc list-inside text-[12px] mt-1">
                          {edu.description.split(/\r?\n/).filter(Boolean).map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                        </ul>
                      )}
                      {edu.score && <p className="text-[12px]">Score: {edu.score}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-4">
                <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
                <div className="grid grid-cols-2 gap-3">
                  {skills.map((s, i) => (
                    <div key={i}>
                      <p className="text-[12px]">{s.name}</p>
                      {typeof s.level === "number" ? (
                        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                          <div className={`${t.bar} h-2 rounded-full`} style={{ width: `${Math.min(Math.max(s.level, 0), 100)}%` }} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold border-b pb-1 mb-3">Languages</h2>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((l, i) => (
                    <div key={i}>
                      <p className="text-[12px]">{l.name}</p>
                      {typeof l.level === "number" ? (
                        <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                          <div className={`${t.bar} h-2 rounded-full`} style={{ width: `${Math.min(Math.max(l.level, 0), 100)}%` }} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

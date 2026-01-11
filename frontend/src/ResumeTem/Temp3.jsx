// src/ResumeTem/Temp3.jsx
import React, { useMemo } from "react";

/**
 * Template 3 (Clean banded)
 * - A4 page wrapper (print/PDF safe)
 * - Proper Tailwind theme classes (no inline color hacks)
 * - Safe page-break helpers + avoid section splits
 * - Optional chaining for all lists (no crash when empty)
 */

const theme = {
  blue: {
    text: "text-blue-700",
    border: "border-blue-600",
    band: "bg-blue-600 text-white",
    link: "text-blue-700",
  },
  green: {
    text: "text-green-700",
    border: "border-green-600",
    band: "bg-green-600 text-white",
    link: "text-green-700",
  },
  purple: {
    text: "text-purple-700",
    border: "border-purple-600",
    band: "bg-purple-600 text-white",
    link: "text-purple-700",
  },
  gray: {
    text: "text-gray-700",
    border: "border-gray-700",
    band: "bg-gray-700 text-white",
    link: "text-gray-800",
  },
};

function Band({ colorTheme, title }) {
  const t = theme[colorTheme] || theme.blue;
  return (
    <div className={`-mx-8 mb-3 px-8 py-1.5 rounded ${t.band}`}>
      <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
    </div>
  );
}

export default function Temp3({ formData = {}, colorTheme = "blue" }) {
  const t = theme[colorTheme] || theme.blue;

  const summary = formData.summary?.trim();
  const skills = formData.skills || [];
  const languages = formData.languages || [];
  const experiences = formData.experiences || [];
  const educations = formData.educations || [];
  const projects = formData.projects || [];
  const certifications = formData.certifications || [];

  const cityState = useMemo(
    () => [formData.city, formData.state].filter(Boolean).join(", "),
    [formData.city, formData.state]
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Print helpers */}
      <style>{`
        @media print { .no-print { display:none!important } }
        .a4-page { width:210mm; min-height:297mm; background:white; }
        .a4-content { padding:32px; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        .page-break { break-before: page; page-break-before: always; }
      `}</style>

      {/* Single page (this template is one-page focused). For multi-page, duplicate blocks with .page-break. */}
      <div className="a4-page">
        {/* Two-column layout */}
        <div className="a4-content grid grid-cols-[72mm_1fr] gap-0 font-sans text-[12px] leading-5 text-gray-800">
          {/* Sidebar */}
          <aside className={`min-h-full pr-6 border-r-2 ${t.border}`}>
            {formData.photo ? (
              <img
                src={formData.photo}
                alt="Profile"
                className="w-full aspect-square rounded-lg object-cover mb-4 border border-white"
              />
            ) : null}

            <h2 className={`text-2xl font-bold mb-1 ${t.text}`}>
              {formData.name || "Your Name"}
            </h2>
            <p className="text-[12px] text-gray-600 mb-4">
              {formData.title || "Your Title"}
            </p>

            <section className="mb-4">
              <h4 className={`font-semibold mb-2 uppercase tracking-wide text-[11px] ${t.text}`}>Contact</h4>
              <div className="space-y-1">
                {formData.email && <p>{formData.email}</p>}
                {formData.phone && <p>{formData.phone}</p>}
                {cityState && <p>{cityState}</p>}
                {formData.country && <p>{formData.country}</p>}
                {formData.linkedin && <p>LinkedIn: {formData.linkedin}</p>}
                {formData.github && <p>GitHub: {formData.github}</p>}
                {formData.website && <p>Website: {formData.website}</p>}
                {formData.portfolio && <p>Portfolio: {formData.portfolio}</p>}
              </div>
            </section>

            {skills.length > 0 && (
              <section className="mb-4">
                <h4 className={`font-semibold mb-2 uppercase tracking-wide text-[11px] ${t.text}`}>Skills</h4>
                <ul className="list-disc list-inside space-y-1">
                  {skills.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h4 className={`font-semibold mb-2 uppercase tracking-wide text-[11px] ${t.text}`}>Languages</h4>
                <ul className="list-disc list-inside space-y-1">
                  {languages.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </section>
            )}
          </aside>

          {/* Main */}
          <main className="pl-6">
            {summary && (
              <section className="mb-4 avoid-break">
                <Band colorTheme={colorTheme} title="Summary" />
                <p className="whitespace-pre-line">{summary}</p>
              </section>
            )}

            {experiences.length > 0 && (
              <section className="mb-4">
                <Band colorTheme={colorTheme} title="Experience" />
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="avoid-break">
                      <h4 className="font-semibold text-[13px]">{exp.jobTitle}</h4>
                      <p className="text-[12px]">
                        {[exp.company, exp.location].filter(Boolean).join(" \u2013 ")}
                      </p>
                      <p className="text-[12px] opacity-80">
                        {(exp.startDate || "").toString()} - {exp.current ? "Present" : (exp.endDate || "")}
                      </p>
                      {exp.description && (
                        <p className="mt-1 whitespace-pre-line">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {educations.length > 0 && (
              <section className="mb-4">
                <Band colorTheme={colorTheme} title="Education" />
                <div className="space-y-3">
                  {educations.map((edu, i) => (
                    <div key={i} className="avoid-break">
                      <h4 className="font-semibold text-[13px]">{edu.degree}</h4>
                      <p className="text-[12px]">{[edu.institution, edu.location].filter(Boolean).join(" \u2013 ")}</p>
                      <p className="text-[12px] opacity-80">
                        {(edu.startDate || "").toString()} - {(edu.endDate || "").toString()}
                      </p>
                      {edu.score && <p className="text-[12px]">{edu.score}</p>}
                      {edu.description && (
                        <p className="mt-1 whitespace-pre-line">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {projects.length > 0 && (
              <section className="mb-4">
                <Band colorTheme={colorTheme} title="Projects" />
                <div className="space-y-3">
                  {projects.map((proj, i) => (
                    <div key={i} className="avoid-break">
                      <h4 className="font-semibold text-[13px]">{proj.name}</h4>
                      {(proj.role || proj.tech) && (
                        <p className="text-[12px]">{[proj.role, proj.tech].filter(Boolean).join(" | ")}</p>
                      )}
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className={`underline ${t.link}`}>
                          {proj.link}
                        </a>
                      )}
                      {proj.description && (
                        <p className="mt-1 whitespace-pre-line">{proj.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <Band colorTheme={colorTheme} title="Certifications" />
                <div className="space-y-3">
                  {certifications.map((c, i) => (
                    <div key={i} className="avoid-break">
                      <h4 className="font-semibold text-[13px]">{c.name}</h4>
                      {(c.authority || c.year) && (
                        <p className="text-[12px]">{[c.authority, c.year].filter(Boolean).join(" | ")}</p>
                      )}
                      {c.id && <p className="text-[12px] break-all">{c.id}</p>}
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

import React, { useMemo } from "react";
import { useFormContext } from "../context/FormContext";

/**
 * Template 2
 * - A4 page blocks (210mm × 297mm) with print/PDF safe page breaks
 * - Sidebar repeats on every page
 * - Summary multi‑line → bullet points
 * - Avoid-break CSS for section cards
 *
 * NOTE: We chunk content into multiple pages (rough heuristic) so html2pdf
 * exports exactly what you see in preview. Tune CHUNK_SIZES as needed.
 */

const CHUNK_SIZES = {
  experiences: 2,
  educations: 2,
  projects: 2,
  certifications: 4,
};

const themeMap = {
  blue: {
    sidebar: "bg-blue-600 text-white",
    band: "bg-blue-600 text-white",
    link: "text-blue-700",
  },
  green: {
    sidebar: "bg-green-600 text-white",
    band: "bg-green-600 text-white",
    link: "text-green-700",
  },
  purple: {
    sidebar: "bg-purple-600 text-white",
    band: "bg-purple-600 text-white",
    link: "text-purple-700",
  },
  gray: {
    sidebar: "bg-gray-700 text-white",
    band: "bg-gray-700 text-white",
    link: "text-gray-800",
  },
};

function bandTitle(theme, title) {
  const t = themeMap[theme] || themeMap.blue;
  return (
    <div className={`-mx-8 mb-3 px-8 py-1.5 rounded ${t.band}`}> {/* stretch to page gutters */}
      <h3 className="text-lg font-bold tracking-wide">{title}</h3>
    </div>
  );
}

function chunk(arr = [], size = 999) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res.length ? res : [[]];
}

function makePages(data) {
  const expChunks = chunk(data.experiences || [], CHUNK_SIZES.experiences);
  const eduChunks = chunk(data.educations || [], CHUNK_SIZES.educations);
  const projChunks = chunk(data.projects || [], CHUNK_SIZES.projects);
  const certChunks = chunk(
    data.certifications || [],
    CHUNK_SIZES.certifications
  );

  // Build a sequence of page payloads
  const pages = [];

  // Page 1: Summary + first chunks of Experience/Education/Projects/Certs
  pages.push({
    showSummary: true,
    exp: expChunks.shift() || [],
    edu: eduChunks.shift() || [],
    proj: projChunks.shift() || [],
    cert: certChunks.shift() || [],
  });

  // Subsequent pages: while any chunk remains, drain in order
  while (expChunks.length || eduChunks.length || projChunks.length || certChunks.length) {
    pages.push({
      showSummary: false,
      exp: expChunks.shift() || [],
      edu: eduChunks.shift() || [],
      proj: projChunks.shift() || [],
      cert: certChunks.shift() || [],
    });
  }
  return pages;
}

export default function Temp2({ colorTheme = "blue" }) {
  const { formData } = useFormContext();
  const theme = themeMap[colorTheme] || themeMap.blue;

  const summaryBullets = useMemo(() => {
    return (formData.summary || "")
      .split(/\r?\n|\u2022|\-/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [formData.summary]);

  const pages = useMemo(() => makePages(formData), [formData]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Print/preview styles for A4 and page-break helpers */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
        .a4-page { width: 210mm; min-height: 297mm; padding: 0; background: white; }
        .a4-content { padding: 32px; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
        .page-break { break-before: page; page-break-before: always; }
      `}</style>

      {pages.map((pg, pageIndex) => (
        <div key={pageIndex} className={`a4-page ${pageIndex > 0 ? "page-break" : ""}`}>
          {/* Two-column grid within A4 */}
          <div className="a4-content grid grid-cols-[72mm_1fr] gap-0 font-sans text-[12px] leading-5">
            {/* Sidebar (repeated every page) */}
            <aside className={`min-h-full p-6 ${theme.sidebar}`}>
              {formData.photo ? (
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white object-cover"
                />
              ) : null}
              <h2 className="text-2xl font-bold text-center">{formData.name}</h2>
              <p className="text-center italic opacity-90">{formData.title}</p>

              <section className="mt-5">
                <h4 className="font-semibold mb-2 uppercase tracking-wide text-[11px] opacity-90">Contact</h4>
                <div className="space-y-1">
                  {formData.email && <p>{formData.email}</p>}
                  {formData.phone && <p>{formData.phone}</p>}
                  {formData.address && <p>{formData.address}</p>}
                  {(formData.city || formData.state) && (
                    <p>
                      {[formData.city, formData.state].filter(Boolean).join(", ")}
                    </p>
                  )}
                  {formData.country && <p>{formData.country}</p>}
                  {formData.linkedin && <p>LinkedIn: {formData.linkedin}</p>}
                  {formData.github && <p>GitHub: {formData.github}</p>}
                  {formData.website && <p>Website: {formData.website}</p>}
                  {formData.portfolio && <p>Portfolio: {formData.portfolio}</p>}
                </div>
              </section>

              {formData.skills?.length ? (
                <section className="mt-5">
                  <h4 className="font-semibold mb-2 uppercase tracking-wide text-[11px] opacity-90">Skills</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {formData.skills.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {formData.languages?.length ? (
                <section className="mt-5">
                  <h4 className="font-semibold mb-2 uppercase tracking-wide text-[11px] opacity-90">Languages</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {formData.languages.map((l, i) => (
                      <li key={i}>{l}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </aside>

            {/* Main */}
            <main className="p-8 bg-white text-gray-800">
              {pg.showSummary && summaryBullets.length > 0 && (
                <section className="mb-4 avoid-break">
                  {bandTitle(colorTheme, "Summary")}
                  <ul className="list-disc pl-5 space-y-1">
                    {summaryBullets.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </section>
              )}

              {pg.exp && pg.exp.length > 0 && (
                <section className="mb-4">
                  {bandTitle(colorTheme, "Experience")}
                  <div className="space-y-3">
                    {pg.exp.map((exp, i) => (
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

              {pg.edu && pg.edu.length > 0 && (
                <section className="mb-4">
                  {bandTitle(colorTheme, "Education")}
                  <div className="space-y-3">
                    {pg.edu.map((edu, i) => (
                      <div key={i} className="avoid-break">
                        <h4 className="font-semibold text-[13px]">{edu.degree}</h4>
                        <p className="text-[12px]">{edu.institution}</p>
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

              {pg.proj && pg.proj.length > 0 && (
                <section className="mb-4">
                  {bandTitle(colorTheme, "Projects")}
                  <div className="space-y-3">
                    {pg.proj.map((proj, i) => (
                      <div key={i} className="avoid-break">
                        <h4 className="font-semibold text-[13px]">{proj.name}</h4>
                        {(proj.role || proj.tech) && (
                          <p className="text-[12px]">{[proj.role, proj.tech].filter(Boolean).join(" | ")}</p>
                        )}
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className={`underline ${theme.link}`}
                          >
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

              {pg.cert && pg.cert.length > 0 && (
                <section>
                  {bandTitle(colorTheme, "Certifications")}
                  <div className="space-y-3">
                    {pg.cert.map((c, i) => (
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
      ))}
    </div>
  );
}

// src/ResumeTem/Temp1.jsx
import React from "react";

/**
 * Temp1 — Continuous A4 flow (Preview == PDF)
 * - No fixed page count, no manual chunking.
 * - Browser/html2pdf auto-paginates as needed.
 * - Order: Header → Summary → Experience → Education → Certifications → Projects → Awards → Achievements → Skills → Languages
 * - Newlines in descriptions => bullets
 */

const themeMap = {
  blue:   { border: "border-blue-600", text: "text-blue-700" },
  green:  { border: "border-green-600", text: "text-green-700" },
  purple: { border: "border-purple-600", text: "text-purple-700" },
  gray:   { border: "border-gray-600", text: "text-gray-800"  },
};

const safeArr = (v) => (Array.isArray(v) ? v : []);

function LinesAsBullets({ text }) {
  if (!text) return null;
  const lines = String(text).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  if (!lines.length) return null;
  if (lines.length === 1) return <p className="text-sm leading-6">{lines[0]}</p>;
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm leading-6">
      {lines.map((l, i) => <li key={i}>{l}</li>)}
    </ul>
  );
}

function Section({ title, accentClass, children }) {
  if (!children) return null;
  return (
    <section className="mb-4">
      <h2 className={`text-xl font-semibold mb-2 ${accentClass}`}>{title}</h2>
      {children}
    </section>
  );
}

export default function Temp1({ formData = {}, colorTheme = "blue" }) {
  const accent = themeMap[colorTheme] || themeMap.blue;

  const exps   = safeArr(formData.experiences);
  const edus   = safeArr(formData.educations);
  const certs  = safeArr(formData.certifications);
  const projs  = safeArr(formData.projects);
  const awards = safeArr(formData.awards);
  const achs   = safeArr(formData.achievements);
  const skills = safeArr(formData.skills);
  const langs  = safeArr(formData.languages);

  return (
    // SINGLE continuous flow — html2pdf will auto-paginate
    <div className="a4-page text-gray-900 font-sans">
      {/* Header */}
      <div className={`text-center border-b-4 pb-4 mb-6 ${accent.border}`}>
        {formData.photo ? (
          <img
            src={formData.photo}
            alt="profile"
            className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-2 border-gray-300"
          />
        ) : null}
        <h1 className="text-2xl font-bold">{formData.name || "Your Name"}</h1>
        <p className="text-lg">{formData.title || ""}</p>
        <p className="text-sm">
          {[formData.email, formData.phone].filter(Boolean).join(" | ")}
        </p>
        <p className="text-sm">
          {[formData.address, formData.city, formData.country].filter(Boolean).join(", ")}
        </p>
      </div>

      {/* Summary */}
      {formData.summary ? (
        <Section title="Professional Summary" accentClass={accent.text}>
          <p className="text-sm leading-6">{formData.summary}</p>
        </Section>
      ) : null}

      {/* Experience */}
      {exps.length ? (
        <Section title="Experience" accentClass={accent.text}>
          <div className="space-y-2">
            {exps.map((exp, i) => (
              <div key={i}>
                <h3 className="font-bold">
                  {[exp.jobTitle, exp.company].filter(Boolean).join(" — ")}
                </h3>
                <p className="text-xs text-gray-600">
                  {[exp.startDate, exp.endDate || "Present"].filter(Boolean).join(" - ")}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
                <LinesAsBullets text={exp.description} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Education */}
      {edus.length ? (
        <Section title="Education" accentClass={accent.text}>
          <div className="space-y-2">
            {edus.map((e, i) => (
              <div key={i}>
                <h3 className="font-bold">{e.degree}</h3>
                <p className="text-xs text-gray-600">
                  {[e.institution, [e.startDate, e.endDate].filter(Boolean).join(" - ")]
                    .filter(Boolean)
                    .join(" | ")}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
                {e.score ? <p className="text-xs text-gray-600">Score: {e.score}</p> : null}
                <LinesAsBullets text={e.description} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Certifications */}
      {certs.length ? (
        <Section title="Certifications" accentClass={accent.text}>
          <div className="space-y-2">
            {certs.map((c, i) => (
              <div key={i}>
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-xs text-gray-600">
                  {[c.authority, c.year].filter(Boolean).join(" • ")}
                  {c.id ? ` • ${c.id}` : ""}
                </p>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Projects */}
      {projs.length ? (
        <Section title="Projects" accentClass={accent.text}>
          <div className="space-y-2">
            {projs.map((p, i) => (
              <div key={i}>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-xs text-gray-600">
                  {[p.role, p.tech].filter(Boolean).join(" • ")}
                  {p.link ? <> • <span className="break-words">{p.link}</span></> : null}
                </p>
                <LinesAsBullets text={p.description} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Awards */}
      {awards.length ? (
        <Section title="Awards" accentClass={accent.text}>
          <div className="space-y-2">
            {awards.map((a, i) => (
              <div key={i}>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-xs text-gray-600">
                  {[a.by, a.year].filter(Boolean).join(" • ")}
                </p>
                <LinesAsBullets text={a.description} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Achievements */}
      {achs.length ? (
        <Section title="Achievements" accentClass={accent.text}>
          <div className="space-y-2">
            {achs.map((a, i) => (
              <div key={i}>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-xs text-gray-600">{a.date}</p>
                <LinesAsBullets text={a.description} />
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Skills */}
      {skills.length ? (
        <Section title="Skills" accentClass={accent.text}>
          <ul className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <li key={i} className="px-2 py-1 bg-gray-200 rounded text-sm">{s}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Languages */}
      {langs.length ? (
        <Section title="Languages" accentClass={accent.text}>
          <p className="text-sm">{langs.join(", ")}</p>
        </Section>
      ) : null}
    </div>
  );
}

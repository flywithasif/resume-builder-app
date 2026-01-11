// src/ResumeTem/Temp6.jsx
import React, { useMemo } from "react";
import { useFormContext } from "../context/FormContext";
import { MdWork, MdLightbulb, MdCode, MdTranslate, MdEvent } from "react-icons/md";
import { BiMailSend, BiPhoneCall, BiGlobe } from "react-icons/bi";
import { AiOutlineLinkedin, AiFillGithub } from "react-icons/ai";
import { FaGraduationCap, FaUser } from "react-icons/fa";

/**
 * Template 6 (Split Light/Dark)
 * - A4 print/PDF safe (preview == PDF)
 * - Uses FormContext data shape
 * - Guards for missing fields + safe bullet handling
 * - Avoid-break helpers; tidy theming
 */

const theme = {
  blue: { text: "text-blue-600", border: "border-blue-600", bar: "bg-blue-600" },
  green: { text: "text-green-600", border: "border-green-600", bar: "bg-green-600" },
  purple: { text: "text-purple-600", border: "border-purple-600", bar: "bg-purple-600" },
  gray: { text: "text-gray-600", border: "border-gray-600", bar: "bg-gray-600" },
};

export default function Temp6({ formData: propData, colorTheme = "blue" }) {
  const ctx = useFormContext?.();
  const formData = propData || ctx?.formData || {};
  const t = theme[colorTheme] || theme.blue;

  const summaryBullets = useMemo(() => {
    return (formData.summary || "")
      .split(/\r?\n|\u2022|•|\-/)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [formData.summary]);

  const experiences = Array.isArray(formData.experiences) ? formData.experiences : [];
  const educations = Array.isArray(formData.educations) ? formData.educations : [];
  const projects = Array.isArray(formData.projects) ? formData.projects : [];
  const skills = Array.isArray(formData.skills) ? formData.skills : [];
  const languages = Array.isArray(formData.languages) ? formData.languages : [];

  return (
    <div className="w-full flex flex-col items-center font-sans">
      <style>{`
        @media print { .no-print { display:none!important } }
        .a4-page { width:210mm; min-height:297mm; background:white; }
        .a4-content { padding:32px; }
        .avoid-break { break-inside: avoid; page-break-inside: avoid; }
      `}</style>

      <div className="a4-page">
        <div className="a4-content grid grid-cols-[1fr_70mm] gap-0 text-gray-900 rounded">
          {/* Left (Light) */}
          <div className="p-6 bg-gray-50">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="pr-4">
                <h1 className="text-3xl font-extrabold text-gray-800">{formData.name || "Your Name"}</h1>
                <h2 className="text-lg font-bold text-gray-600">{formData.title || "Job Title"}</h2>
                {summaryBullets.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-[12px] text-gray-700 space-y-1">
                    {summaryBullets.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
              {formData.photo ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-300 flex-shrink-0 ml-4">
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : null}
            </div>

            {/* Work Experience */}
            {experiences.length > 0 && (
              <section className="mb-4">
                <div className="flex items-center text-gray-800 mb-2">
                  <MdWork className={`mr-2 ${t.text} text-xl`} />
                  <h3 className={`text-lg font-bold border-b-2 ${t.border} pb-1`}>Work Experience</h3>
                </div>
                <div className="space-y-3">
                  {experiences.map((exp, index) => (
                    <div key={index} className="pl-4 border-l-2 border-gray-300 avoid-break">
                      <h4 className="text-[14px] font-semibold">{exp.jobTitle}</h4>
                      <p className="text-[12px] text-gray-600 italic">{[exp.company, exp.location].filter(Boolean).join(" • ")}</p>
                      <p className="text-[12px] text-gray-500">
                        {(exp.startDate || "").toString()} - {exp.current ? "Present" : (exp.endDate || "")}
                      </p>
                      {exp.description && (
                        <ul className="list-disc list-inside mt-1 text-[12px] text-gray-700 space-y-0.5">
                          {String(exp.description)
                            .split(/\r?\n/)
                            .map((point) => point.trim())
                            .filter(Boolean)
                            .map((point, i) => (
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
              <section className="mb-4">
                <div className="flex items-center text-gray-800 mb-2">
                  <FaGraduationCap className={`mr-2 ${t.text} text-lg`} />
                  <h3 className={`text-lg font-bold border-b-2 ${t.border} pb-1`}>Education</h3>
                </div>
                <div className="space-y-3">
                  {educations.map((edu, index) => (
                    <div key={index} className="pl-4 border-l-2 border-gray-300 avoid-break">
                      <h4 className="text-[14px] font-semibold">{edu.degree}</h4>
                      <p className="text-[12px] text-gray-600 italic">{[edu.institution, edu.location].filter(Boolean).join(" • ")}</p>
                      <p className="text-[12px] text-gray-500">
                        {(edu.startDate || "").toString()} - {(edu.endDate || "").toString()}
                      </p>
                      {edu.description && (
                        <ul className="list-disc list-inside mt-1 text-[12px] text-gray-700 space-y-0.5">
                          {String(edu.description)
                            .split(/\r?\n/)
                            .map((d) => d.trim())
                            .filter(Boolean)
                            .map((d, i) => (
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
          </div>

          {/* Right (Dark) */}
          <aside className="p-6 bg-gray-800 text-white">
            {/* Contact */}
            {(formData.email || formData.phone || formData.linkedin || formData.github || formData.website) && (
              <div className="mb-6">
                <div className={`${t.text} mb-2`}>
                  <h3 className="text-lg font-semibold text-white">Contact</h3>
                </div>
                {formData.email && (
                  <p className="text-gray-300 flex items-center mb-1 text-[12px]">
                    <BiMailSend className={`mr-2 ${t.text}`} />{formData.email}
                  </p>
                )}
                {formData.phone && (
                  <p className="text-gray-300 flex items-center mb-1 text-[12px]">
                    <BiPhoneCall className={`mr-2 ${t.text}`} />{formData.phone}
                  </p>
                )}
                {formData.linkedin && (
                  <p className="text-gray-300 flex items-center mb-1 text-[12px]">
                    <AiOutlineLinkedin className={`mr-2 ${t.text}`} />{formData.linkedin}
                  </p>
                )}
                {formData.github && (
                  <p className="text-gray-300 flex items-center mb-1 text-[12px]">
                    <AiFillGithub className={`mr-2 ${t.text}`} />{formData.github}
                  </p>
                )}
                {formData.website && (
                  <p className="text-gray-300 flex items-center mb-1 text-[12px]">
                    <BiGlobe className={`mr-2 ${t.text}`} />{formData.website}
                  </p>
                )}
              </div>
            )}

            {/* General Skills */}
            {skills.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <MdLightbulb className={`mr-2 ${t.text}`} />
                  <h3 className="text-base font-semibold text-white">General Skills</h3>
                </div>
                <ul className="grid grid-cols-2 gap-2 text-gray-300 text-[12px]">
                  {skills.map((skill, index) => (
                    <li key={index} className="flex items-center">
                      <FaUser className={`mr-1 ${t.text} text-xs`} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <MdCode className={`mr-2 ${t.text}`} />
                  <h3 className="text-base font-semibold text-white">Personal Projects</h3>
                </div>
                <div className="space-y-2">
                  {projects.map((proj, index) => (
                    <div key={index}>
                      <h4 className="text-[13px] font-semibold">{proj.name}</h4>
                      {(proj.role || proj.tech) && (
                        <p className="text-[12px] text-gray-400 italic">{[proj.role, proj.tech].filter(Boolean).join(" | ")}</p>
                      )}
                      {proj.description && (
                        <p className="text-[12px] text-gray-300 whitespace-pre-line">{proj.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <MdTranslate className={`mr-2 ${t.text}`} />
                  <h3 className="text-base font-semibold text-white">Languages</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-300 text-[12px]">
                  {languages.map((lang, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-white text-[12px]">{lang}</h4>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {Array.isArray(formData.certifications) && formData.certifications.length > 0 && (
              <div>
                <div className="flex items-center mb-2">
                  <MdEvent className={`mr-2 ${t.text}`} />
                  <h3 className="text-base font-semibold text-white">Certifications</h3>
                </div>
                <ul className="grid grid-cols-1 gap-2 text-gray-300 text-[12px]">
                  {formData.certifications.map((cert, index) => (
                    <li key={index}>
                      <h4 className="font-medium text-white text-[12px]">{cert.name}</h4>
                      {(cert.authority || cert.year) && (
                        <p className="text-xs text-gray-400">{[cert.authority, cert.year].filter(Boolean).join(", ")}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

// src/components/ResumeForm.jsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormContext } from "../context/FormContext";

const Input = ({ label, id, className = "", ...rest }) => (
  <label htmlFor={id} className="block">
    <span className="text-sm font-medium text-[#2C3333]">{label}</span>
    <input
      id={id}
      className={`mt-1 w-full rounded-lg border border-[#A5C9CA] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] bg-white ${className}`}
      {...rest}
    />
  </label>
);

const Textarea = ({ label, id, rows = 3, className = "", ...rest }) => (
  <label htmlFor={id} className="block">
    <span className="text-sm font-medium text-[#2C3333]">{label}</span>
    <textarea
      id={id}
      rows={rows}
      className={`mt-1 w-full rounded-lg border border-[#A5C9CA] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#395B64] bg-white ${className}`}
      {...rest}
    />
  </label>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-base font-semibold text-[#2C3333]">{children}</h3>
);

/** Month Picker (no dependencies)
 * Stores value as "YYYY-MM" string to match your templates/PDF
 */
function useOnClickOutside(ref, onClose) {
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onClose?.();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];

function toYYYYMM(year, monthIndex) {
  const y = String(year);
  const m = String(monthIndex + 1).padStart(2, "0");
  return `${y}-${m}`;
}
function parseYYYYMM(v) {
  if (!v) return null;
  const m = /^([0-9]{4})-([0-9]{2})$/.exec(v);
  if (!m) return null;
  return { year: Number(m[1]), monthIndex: Number(m[2]) - 1 };
}
function formatYYYYMM(v) {
  const p = parseYYYYMM(v);
  if (!p) return "";
  return `${MONTHS[p.monthIndex]} ${p.year}`;
}

function MonthPicker({ id, label, value, onChange, disabled, placeholder = "YYYY-MM" }) {
  const [open, setOpen] = useState(false);
  const init = parseYYYYMM(value) || (() => {
    const d = new Date();
    return { year: d.getFullYear(), monthIndex: d.getMonth() };
  })();
  const [year, setYear] = useState(init.year);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false));

  useEffect(() => {
    // keep internal year in sync if external value changes
    const p = parseYYYYMM(value);
    if (p && p.year !== year) setYear(p.year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const pick = (mIdx) => {
    const next = toYYYYMM(year, mIdx);
    onChange?.(next);
    setOpen(false);
  };

  const clear = () => onChange?.("");
  const today = () => {
    const d = new Date();
    onChange?.(toYYYYMM(d.getFullYear(), d.getMonth()));
    setYear(d.getFullYear());
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <label htmlFor={id} className="block">
        <span className="text-sm font-medium text-[#2C3333]">{label}</span>
        <button
          id={id}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((s) => !s)}
          className={`mt-1 w-full rounded-lg border border-[#A5C9CA] px-3 py-2 text-left bg-white focus:outline-none focus:ring-2 focus:ring-[#395B64] ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          {value ? formatYYYYMM(value) : <span className="text-gray-400">{placeholder}</span>}
        </button>
      </label>

      {open && !disabled && (
        <div className="absolute z-20 mt-2 w-72 rounded-xl border border-[#A5C9CA] bg-white shadow-lg">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <button
              type="button"
              className="px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setYear((y) => y - 1)}
              aria-label="Previous year"
            >
              ‹
            </button>
            <div className="font-semibold select-none">{year}</div>
            <button
              type="button"
              className="px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setYear((y) => y + 1)}
              aria-label="Next year"
            >
              ›
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            {MONTHS.map((m, idx) => (
              <button
                key={m}
                type="button"
                className={`px-2 py-2 rounded-md text-sm hover:bg-[#E7F6F2] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#395B64] ${
                  value && parseYYYYMM(value)?.year === year && parseYYYYMM(value)?.monthIndex === idx
                    ? "bg-[#E7F6F2] border-[#A5C9CA]"
                    : ""
                }`}
                onClick={() => pick(idx)}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t text-sm">
            <button type="button" className="px-2 py-1 rounded hover:bg-gray-100" onClick={clear}>Clear</button>
            <button type="button" className="px-2 py-1 rounded hover:bg-gray-100" onClick={today}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Chips({ items, onRemove, color = "#E7F6F2" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((text, i) => (
        <span
          key={`${text}-${i}`}
          className="inline-flex items-center gap-2 rounded-full border border-[#A5C9CA] px-3 py-1 text-sm text-[#2C3333]"
          style={{ backgroundColor: color }}
        >
          {text}
          <button
            type="button"
            aria-label={`Remove ${text}`}
            onClick={() => onRemove(i)}
            className="leading-none font-bold"
            title="Remove"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

export default function ResumeForm() {
  const {
    formData,
    updateField,
    addItem,
    removeItem,
    updateItem,
    setSkillsFromString,
    setLanguagesFromString,
  } = useFormContext();

  const [photoPreview, setPhotoPreview] = useState(formData.photo || "");
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  // --- handlers ---
  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!/^image\//.test(file.type)) return alert("Please select an image file");
    if (file.size > 3 * 1024 * 1024) return alert("File size exceeds 3MB");
    const reader = new FileReader();
    reader.onload = () => {
      updateField("photo", reader.result);
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, [updateField]);

  const addSkills = useCallback(() => {
    if (!skillInput.trim()) return;
    setSkillsFromString(skillInput);
    setSkillInput("");
  }, [skillInput, setSkillsFromString]);

  const addLanguages = useCallback(() => {
    if (!languageInput.trim()) return;
    setLanguagesFromString(languageInput);
    setLanguageInput("");
  }, [languageInput, setLanguagesFromString]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onRemoveSkill = useCallback(
    (idx) => {
      const updated = formData.skills.filter((_, i) => i !== idx);
      updateField("skills", updated);
    },
    [formData.skills, updateField]
  );

  const onRemoveLanguage = useCallback(
    (idx) => {
      const updated = formData.languages.filter((_, i) => i !== idx);
      updateField("languages", updated);
    },
    [formData.languages, updateField]
  );

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#2C3333]">Resume Details</h2>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm">
            <span className="text-[#2C3333]">Photo:</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="rounded-md border border-[#A5C9CA] text-sm file:mr-3 file:px-3 file:py-1.5 file:border-0 file:rounded-md file:bg-[#395B64] file:text-white hover:file:bg-[#2C3333]"
            />
          </label>
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Preview"
              className="w-12 h-12 rounded-full object-cover border border-[#A5C9CA]"
            />
          ) : null}
        </div>
      </div>

      {/* Basic */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="name"
          label="Full Name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="John Doe"
          autoComplete="name"
        />
        <Input
          id="title"
          label="Job Title"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Frontend Developer"
          autoComplete="organization-title"
        />
      </div>
      <Textarea
        id="summary"
        label="Professional Summary"
        value={formData.summary}
        onChange={(e) => updateField("summary", e.target.value)}
        placeholder="Short 2-3 lines about your profile…"
        rows={4}
      />

      {/* Contact */}
      <div className="space-y-3">
        <SectionTitle>Contact</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
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
          ].map((f) => (
            <Input
              key={f}
              id={`contact-${f}`}
              label={f.charAt(0).toUpperCase() + f.slice(1)}
              value={formData[f]}
              onChange={(e) => updateField(f, e.target.value)}
              placeholder={f}
              inputMode={f === "phone" ? "tel" : undefined}
              type={f === "email" ? "email" : "text"}
              autoComplete={
                f === "email"
                  ? "email"
                  : f === "phone"
                  ? "tel"
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-3">
        <SectionTitle>Skills</SectionTitle>
        {formData.skills?.length > 0 && (
          <Chips items={formData.skills} onRemove={onRemoveSkill} />
        )}
        <div className="flex gap-2">
          <Input
            id="add-skill"
            label="Add Skill (comma or Enter)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addSkills();
              }
            }}
            placeholder="React, Node.js"
          />
          <button
            type="button"
            onClick={addSkills}
            className="self-end h-10 px-3 rounded-md bg-[#395B64] text-white hover:bg-[#2C3333]"
          >
            Add
          </button>
        </div>
      </div>

      {/* Languages */}
      <div className="space-y-3">
        <SectionTitle>Languages</SectionTitle>
        {formData.languages?.length > 0 && (
          <Chips items={formData.languages} onRemove={onRemoveLanguage} />
        )}
        <div className="flex gap-2">
          <Input
            id="add-language"
            label="Add Language (comma or Enter)"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addLanguages();
              }
            }}
            placeholder="English, Hindi"
          />
          <button
            type="button"
            onClick={addLanguages}
            className="self-end h-10 px-3 rounded-md bg-[#395B64] text-white hover:bg-[#2C3333]"
          >
            Add
          </button>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <SectionTitle>Experience / Achievements</SectionTitle>
        <div className="space-y-4">
          {formData.experiences.map((exp, i) => (
            <div key={i} className="rounded-xl border border-[#A5C9CA] p-3 bg-[#F7FBFB]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id={`exp-title-${i}`}
                  label="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => updateItem("experiences", i, "jobTitle", e.target.value)}
                />
                <Input
                  id={`exp-company-${i}`}
                  label="Company"
                  value={exp.company}
                  onChange={(e) => updateItem("experiences", i, "company", e.target.value)}
                />
                <Input
                  id={`exp-location-${i}`}
                  label="Location"
                  value={exp.location}
                  onChange={(e) => updateItem("experiences", i, "location", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                  <MonthPicker
                    id={`exp-start-${i}`}
                    label="Start (Month)"
                    value={exp.startDate}
                    onChange={(v) => updateItem("experiences", i, "startDate", v)}
                  />
                  <MonthPicker
                    id={`exp-end-${i}`}
                    label="End (Month)"
                    value={exp.endDate}
                    onChange={(v) => updateItem("experiences", i, "endDate", v)}
                    disabled={!!exp.current}
                  />
                </div>
              </div>

              <Textarea
                id={`exp-desc-${i}`}
                label="Achievements / Description"
                rows={4}
                value={exp.description}
                onChange={(e) => updateItem("experiences", i, "description", e.target.value)}
              />

              <div className="flex justify-between items-center pt-1">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!exp.current}
                    onChange={(e) => updateItem("experiences", i, "current", e.target.checked)}
                  />
                  <span>Currently working here</span>
                </label>
                <button
                  type="button"
                  onClick={() => removeItem("experiences", i)}
                  className="text-sm rounded-md px-3 py-1.5 bg-[#395B64] text-white hover:bg-[#2C3333]"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => addItem("experiences")}
          className="mt-1 rounded-md px-3 py-2 bg-[#395B64] text-white hover:bg-[#2C3333] text-sm"
        >
          + Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="space-y-3">
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-4">
          {formData.educations.map((ed, i) => (
            <div key={i} className="rounded-xl border border-[#A5C9CA] p-3 bg-[#F7FBFB]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id={`ed-degree-${i}`} label="Degree / Program" value={ed.degree} onChange={(e)=>updateItem("educations",i,"degree",e.target.value)} />
                <Input id={`ed-inst-${i}`}   label="Institution"       value={ed.institution} onChange={(e)=>updateItem("educations",i,"institution",e.target.value)} />
                <Input id={`ed-loc-${i}`}    label="Location"          value={ed.location} onChange={(e)=>updateItem("educations",i,"location",e.target.value)} />
                <div className="grid grid-cols-2 gap-4">
                  <MonthPicker id={`ed-start-${i}`} label="Start (Month)" value={ed.startDate} onChange={(v)=>updateItem("educations",i,"startDate",v)} />
                  <MonthPicker id={`ed-end-${i}`}   label="End (Month)"   value={ed.endDate}   onChange={(v)=>updateItem("educations",i,"endDate",v)} />
                </div>
                <Input id={`ed-score-${i}`}  label="Score / CGPA / % (optional)" value={ed.score} onChange={(e)=>updateItem("educations",i,"score",e.target.value)} />
              </div>
              <Textarea id={`ed-desc-${i}`} label="Description (relevant coursework / honors)" rows={3} value={ed.description} onChange={(e)=>updateItem("educations",i,"description",e.target.value)} />
              <div className="flex justify-end">
                <button type="button" onClick={()=>removeItem("educations",i)} className="text-sm rounded-md px-3 py-1.5 bg-[#395B64] text-white hover:bg-[#2C3333]">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={()=>addItem("educations")} className="mt-1 rounded-md px-3 py-2 bg-[#395B64] text-white hover:bg-[#2C3333] text-sm">+ Add Education</button>
      </div>

      {/* Certifications */}
      <div className="space-y-3">
        <SectionTitle>Certifications</SectionTitle>
        <div className="space-y-4">
          {formData.certifications.map((c, i) => (
            <div key={i} className="rounded-xl border border-[#A5C9CA] p-3 bg-[#F7FBFB]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id={`cert-name-${i}`} label="Certification Name" value={c.name} onChange={(e)=>updateItem("certifications",i,"name",e.target.value)} />
                <Input id={`cert-auth-${i}`} label="Issuing Authority"  value={c.authority} onChange={(e)=>updateItem("certifications",i,"authority",e.target.value)} />
                <Input id={`cert-year-${i}`} label="Year"                value={c.year} onChange={(e)=>updateItem("certifications",i,"year",e.target.value)} />
                <Input id={`cert-id-${i}`}   label="ID / URL (optional)" value={c.id} onChange={(e)=>updateItem("certifications",i,"id",e.target.value)} />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={()=>removeItem("certifications",i)} className="text-sm rounded-md px-3 py-1.5 bg-[#395B64] text-white hover:bg-[#2C3333]">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={()=>addItem("certifications")} className="mt-1 rounded-md px-3 py-2 bg-[#395B64] text-white hover:bg-[#2C3333] text-sm">+ Add Certification</button>
      </div>

      {/* Awards */}
      <div className="space-y-3">
        <SectionTitle>Awards</SectionTitle>
        <div className="space-y-4">
          {formData.awards?.map((a, i) => (
            <div key={i} className="rounded-xl border border-[#A5C9CA] p-3 bg-[#F7FBFB]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id={`award-title-${i}`} label="Award Title" value={a.title} onChange={(e)=>updateItem("awards",i,"title",e.target.value)} />
                <Input id={`award-by-${i}`}    label="By / Organization" value={a.by} onChange={(e)=>updateItem("awards",i,"by",e.target.value)} />
                <Input id={`award-year-${i}`}  label="Year" value={a.year} onChange={(e)=>updateItem("awards",i,"year",e.target.value)} />
              </div>
              <Textarea id={`award-desc-${i}`} label="Description (why/for what)" rows={3} value={a.description} onChange={(e)=>updateItem("awards",i,"description",e.target.value)} />
              <div className="flex justify-end">
                <button type="button" onClick={()=>removeItem("awards",i)} className="text-sm rounded-md px-3 py-1.5 bg-[#395B64] text-white hover:bg-[#2C3333]">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={()=>addItem("awards")} className="mt-1 rounded-md px-3 py-2 bg-[#395B64] text-white hover:bg-[#2C3333] text-sm">+ Add Award</button>
      </div>

      {/* Achievements (general, outside jobs) */}
      <div className="space-y-3">
        <SectionTitle>Achievements</SectionTitle>
        <div className="space-y-4">
          {formData.achievements?.map((a, i) => (
            <div key={i} className="rounded-xl border border-[#A5C9CA] p-3 bg-[#F7FBFB]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id={`ach-title-${i}`} label="Title" value={a.title} onChange={(e)=>updateItem("achievements",i,"title",e.target.value)} />
                <MonthPicker id={`ach-date-${i}`} label="Date (Month)" value={a.date} onChange={(v)=>updateItem("achievements",i,"date",v)} />
              </div>
              <Textarea id={`ach-desc-${i}`} label="Description / Impact" rows={3} value={a.description} onChange={(e)=>updateItem("achievements",i,"description",e.target.value)} />
              <div className="flex justify-end">
                <button type="button" onClick={()=>removeItem("achievements",i)} className="text-sm rounded-md px-3 py-1.5 bg-[#395B64] text-white hover:bg-[#2C3333]">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={()=>addItem("achievements")} className="mt-1 rounded-md px-3 py-2 bg-[#395B64] text-white hover:bg-[#2C3333] text-sm">+ Add Achievement</button>
      </div>
    </form>
  );
}

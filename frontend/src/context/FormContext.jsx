// src/context/FormContext.jsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// -----------------------
// Defaults / Helpers
// -----------------------
const EMPTY_FORM = Object.freeze({
  name: "",
  title: "",
  summary: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  linkedin: "",
  github: "",
  website: "",
  portfolio: "",
  photo: "",
  experiences: [
    { jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" },
  ],
  educations: [
    { degree: "", institution: "", location: "", startDate: "", endDate: "", score: "", description: "" },
  ],
  projects: [{ name: "", role: "", tech: "", link: "", description: "" }],
  certifications: [{ name: "", authority: "", year: "", id: "" }],
  awards: [{ title: "", by: "", year: "", description: "" }],
  achievements: [{ title: "", date: "", description: "" }],
  skills: [],
  languages: [],
  templateId: "1",
});

const freshEmptyForm = () => JSON.parse(JSON.stringify(EMPTY_FORM));

const STORAGE_KEYS = Object.freeze({
  resumes: "resumes",
  draft: "resume_draft",
  version: "resume_version",
});
const CURRENT_VERSION = 1;

const FormContext = createContext(null);

// Safe JSON
const safeParse = (raw, fallback) => {
  try {
    const v = JSON.parse(raw);
    return v ?? fallback;
  } catch {
    return fallback;
  }
};
const safeStringify = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch {
    return "";
  }
};

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    // Try draft first, else empty
    const draft = localStorage.getItem(STORAGE_KEYS.draft);
    const base = draft ? safeParse(draft, freshEmptyForm()) : freshEmptyForm();
    return base;
  });
  const [savedResumes, setSavedResumes] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.resumes);
    return raw ? safeParse(raw, []) : [];
  });

  // Optional: basic version gate for future migrations
  useEffect(() => {
    const ver = Number(localStorage.getItem(STORAGE_KEYS.version) || 0);
    if (ver !== CURRENT_VERSION) {
      localStorage.setItem(STORAGE_KEYS.version, String(CURRENT_VERSION));
    }
  }, []);

  // Persist saved resumes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.resumes, safeStringify(savedResumes));
  }, [savedResumes]);

  // Debounced draft autosave (so accidental refresh doesn't lose work)
  const draftTimer = useRef(null);
  useEffect(() => {
    clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEYS.draft, safeStringify(formData));
    }, 400);
    return () => clearTimeout(draftTimer.current);
  }, [formData]);

  // -----------------------
  // Updaters (useCallback to reduce child re-renders)
  // -----------------------
  const setTemplateId = useCallback((id) => {
    setFormData((p) => ({ ...p, templateId: String(id || "1") }));
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
  }, []);

  const setSkillsFromString = useCallback((csv) => {
    const arr = csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setFormData((p) => ({ ...p, skills: [...new Set([...(p.skills || []), ...arr])] }));
  }, []);

  const setLanguagesFromString = useCallback((csv) => {
    const arr = csv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setFormData((p) => ({ ...p, languages: [...new Set([...(p.languages || []), ...arr])] }));
  }, []);

  const addItem = useCallback((section) => {
    setFormData((p) => ({
      ...p,
      [section]: [...(p[section] || []), getNewItem(section)],
    }));
  }, []);

  const removeItem = useCallback((section, index) => {
    setFormData((p) => ({
      ...p,
      [section]: (p[section] || []).filter((_, i) => i !== index),
    }));
  }, []);

  const updateItem = useCallback((section, index, field, value) => {
    setFormData((p) => {
      const list = [...(p[section] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...p, [section]: list };
    });
  }, []);

  const clearForm = useCallback(() => {
    setFormData((prev) => {
      const next = freshEmptyForm();
      next.templateId = prev?.templateId || "1"; // preserve template
      return next;
    });
  }, []);

  const resetDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.draft);
  }, []);

  const saveResume = useCallback(() => {
    const id = cryptoRandomId();
    const now = new Date().toISOString();
    const record = {
      id,
      name: formData.name || "Untitled Resume",
      templateId: formData.templateId || "1",
      createdAt: now,
      updatedAt: now,
      data: formData,
    };
    setSavedResumes((prev) => [record, ...prev]);
    return id;
  }, [formData]);

  const updateSavedResume = useCallback((id) => {
    const now = new Date().toISOString();
    setSavedResumes((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              updatedAt: now,
              name: formData.name || r.name,
              templateId: formData.templateId || r.templateId,
              data: formData,
            }
          : r
      )
    );
  }, [formData]);

  const deleteResume = useCallback((id) => {
    setSavedResumes((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const loadFromResume = useCallback((record) => {
    if (!record) return;
    const safe = record.data ? JSON.parse(JSON.stringify(record.data)) : freshEmptyForm();
    // ensure arrays exist
    const base = freshEmptyForm();
    for (const k of [
      "experiences",
      "educations",
      "projects",
      "certifications",
      "awards",
      "achievements",
      "skills",
      "languages",
    ]) {
      if (!Array.isArray(safe[k])) safe[k] = Array.isArray(base[k]) ? base[k] : [];
    }
    setFormData(safe);
  }, []);

  const value = useMemo(
    () => ({
      formData,
      setTemplateId,
      updateField,
      setSkillsFromString,
      setLanguagesFromString,
      addItem,
      removeItem,
      updateItem,
      clearForm,
      resetDraft,
      saveResume,
      updateSavedResume,
      deleteResume,
      loadFromResume,
      savedResumes,
      setFormData,
    }),
    [
      formData,
      savedResumes,
      setTemplateId,
      updateField,
      setSkillsFromString,
      setLanguagesFromString,
      addItem,
      removeItem,
      updateItem,
      clearForm,
      resetDraft,
      saveResume,
      updateSavedResume,
      deleteResume,
      loadFromResume,
    ]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => useContext(FormContext);

const cryptoRandomId = () =>
  typeof crypto !== "undefined" && crypto?.randomUUID
    ? crypto.randomUUID()
    : `id_${Date.now()}_${Math.random().toString(36).slice(2)}`;

function getNewItem(section) {
  switch (section) {
    case "experiences":
      return { jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" };
    case "educations":
      return { degree: "", institution: "", location: "", startDate: "", endDate: "", score: "", description: "" };
    case "projects":
      return { name: "", role: "", tech: "", link: "", description: "" };
    case "certifications":
      return { name: "", authority: "", year: "", id: "" };
    case "awards":
      return { title: "", by: "", year: "", description: "" };
    case "achievements":
      return { title: "", date: "", description: "" };
    default:
      return {};
  }
}

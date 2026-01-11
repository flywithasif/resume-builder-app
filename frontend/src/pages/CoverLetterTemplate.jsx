// src/pages/CoverLetterTemplate.jsx
// Show 8 template cards to user

import React from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  { id: 1, name: "Classic Professional" },
  { id: 2, name: "Modern Minimal" },
  { id: 3, name: "Elegant Blue" },
  { id: 4, name: "Creative Layout" },
  { id: 5, name: "Simple Corporate" },
  { id: 6, name: "Two Column" },
  { id: 7, name: "Compact Layout" },
  { id: 8, name: "Modern Gradient" },
];

const CoverLetterTemplate = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Choose a Cover Letter Template</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t) => (
            <div
              key={t.id}
              onClick={() => navigate(`/cover-template-options/${t.id}`)} // ✅ Fixed route
              className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-6 text-center border"
            >
              <div className="w-full h-32 bg-gray-100 mb-4 flex items-center justify-center">
                <span className="text-gray-500">Template {t.id}</span>
              </div>
              <h2 className="font-semibold">{t.name}</h2>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoverLetterTemplate;

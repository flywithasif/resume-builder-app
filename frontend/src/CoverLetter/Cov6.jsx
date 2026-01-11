import React from "react";

export default function Cov6({ data }) {
  const name = data.fullName || "Asif H.";
  const role = data.jobTitle || "Web Developer";
  const accent = data.color || "#2563EB"; // theme color support

  return (
    <div className="bg-white text-gray-900">
      {/* ===== HEADER WITH ACCENT ===== */}
      <div
        className="px-10 py-8"
        style={{
          borderBottom: `2px solid ${accent}`,
        }}
      >
        <h1 className="text-4xl font-semibold">{name}</h1>
        <p className="mt-1 text-sm text-gray-600">{role}</p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.address}</span>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="px-10 py-8 max-w-[820px]">
        {/* DATE */}
        <p className="mb-6 text-sm text-gray-500">
          {data.date}
        </p>

        {/* RECIPIENT */}
        <div className="mb-6 text-sm">
          <p className="font-medium">
            {data.recipientName || "Hiring Manager"}
          </p>
          <p>{data.companyName}</p>
          <p className="text-gray-600">
            {data.companyAddress}
          </p>
        </div>

        {/* GREETING */}
        <p className="mb-5 text-sm">
          Dear {data.recipientName || "Hiring Manager"},
        </p>

        {/* BODY TEXT */}
        <div className="text-sm leading-relaxed">
          {(data.body || "")
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((p, i) => (
              <p key={i} className="mb-4">
                {p}
              </p>
            ))}
        </div>

        {/* CLOSING */}
        <div className="mt-10 text-sm">
          <p>Kind regards,</p>
          <p className="mt-2 font-medium">{name}</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Cov3({ data }) {
  const name = data.fullName || "Asif H.";
  const role = data.jobTitle || "Web Developer";

  return (
    <div className="bg-white text-gray-900 px-8">
      {/* ===== HEADER ===== */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold tracking-wide">
          {name}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {role}
        </p>
        <div className="mt-3 text-xs text-gray-600">
          {data.email} · {data.phone} · {data.address}
        </div>
      </div>

      {/* ACCENT LINE */}
      <div className="w-16 h-[2px] bg-gray-300 mx-auto mb-10" />

      {/* CONTENT AREA */}
      <div className="max-w-[780px] mx-auto">
        {/* DATE */}
        <p className="mb-6 text-sm text-gray-600">
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
        <p className="mb-4 text-sm">
          Dear {data.recipientName || "Hiring Manager"},
        </p>

        {/* BODY */}
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
        <div className="mt-8 text-sm">
          <p>Kind regards,</p>
          <p className="mt-2 font-medium">{name}</p>
        </div>
      </div>
    </div>
  );
}

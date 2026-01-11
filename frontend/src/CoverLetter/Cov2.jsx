import React from "react";

export default function Cov2({ data }) {
  const name = data.fullName || "Asif H.";
  const role = data.jobTitle || "Web Developer";

  return (
    <div className="bg-white text-gray-900">
      {/* ===== TOP SECTION (MODERN, LIGHT) ===== */}
      <div className="px-10 pt-10 pb-5">
        <h1 className="text-4xl font-semibold tracking-tight">
          {name}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {role}
        </p>
      </div>

      {/* CONTACT BAR */}
      <div className="px-10 py-3 bg-gray-50 text-sm text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
        <span>{data.phone}</span>
        <span>{data.email}</span>
        <span>{data.address}</span>
      </div>

      {/* ===== BODY ===== */}
      <div className="px-10 py-8 text-sm leading-relaxed">
        {/* Date */}
        <p className="text-gray-600 mb-6">
          {data.date}
        </p>

        {/* Recipient */}
        <div className="mb-6">
          <p className="font-medium">
            {data.recipientName || "Hiring Manager"}
          </p>
          <p>{data.companyName}</p>
          <p className="text-gray-600">
            {data.companyAddress}
          </p>
        </div>

        {/* Greeting */}
        <p className="mb-4">
          Dear {data.recipientName || "Hiring Manager"},
        </p>

        {/* Letter Body */}
        {(data.body || "")
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((p, i) => (
            <p key={i} className="mb-4">
              {p}
            </p>
          ))}

        {/* Closing */}
        <p className="mt-8">Kind regards,</p>
        <p className="mt-2 font-medium">{name}</p>
      </div>
    </div>
  );
}

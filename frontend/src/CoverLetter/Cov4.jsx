import React from "react";

export default function Cov4({ data }) {
  const name = data.fullName || "Asif H.";
  const role = data.jobTitle || "Web Developer";

  return (
    <div className="bg-white text-gray-900">
      {/* ===== HEADER ===== */}
      <div className="text-center pt-10 pb-8">
        <h1 className="text-[42px] font-semibold tracking-tight">
          {name}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {role}
        </p>

        <div className="mt-4 text-sm text-gray-600 flex justify-center flex-wrap gap-x-6 gap-y-1">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.address}</span>
        </div>
      </div>

      {/* SUBTLE DIVIDER */}
      <div className="w-[120px] h-[1px] bg-gray-300 mx-auto mb-10" />

      {/* CONTENT */}
      <div className="max-w-[820px] mx-auto px-6">
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
        <div className="mt-10 text-sm">
          <p>Sincerely,</p>
          <p className="mt-2 font-medium">{name}</p>
        </div>
      </div>
    </div>
  );
}

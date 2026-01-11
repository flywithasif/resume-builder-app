import React from "react";

export default function Cov8({ data }) {
  const name = data.fullName || "Asif H.";
  const role = data.jobTitle || "Senior Consultant";

  return (
    <div className="bg-white text-gray-900">
      {/* ===== LUXURY HEADER ===== */}
      <div className="text-center pt-12 pb-10">
        <h1 className="text-[44px] font-serif font-semibold tracking-wide">
          {name}
        </h1>
        <p className="mt-2 text-sm text-gray-600 uppercase tracking-widest">
          {role}
        </p>

        <div className="mt-6 text-sm text-gray-600 flex justify-center flex-wrap gap-x-6 gap-y-1">
          <span>{data.email}</span>
          <span>{data.phone}</span>
          <span>{data.address}</span>
        </div>
      </div>

      {/* LUXURY DIVIDER */}
      <div className="w-[140px] h-[1px] bg-gray-300 mx-auto mb-12" />

      {/* CONTENT */}
      <div className="max-w-[820px] mx-auto px-6 text-[15px] leading-relaxed font-serif">
        {/* DATE */}
        <p className="mb-8 text-sm text-gray-600">
          {data.date}
        </p>

        {/* RECIPIENT */}
        <div className="mb-8">
          <p className="font-medium">
            {data.recipientName || "Hiring Manager"}
          </p>
          <p>{data.companyName}</p>
          <p className="text-gray-600">
            {data.companyAddress}
          </p>
        </div>

        {/* GREETING */}
        <p className="mb-6">
          Dear {data.recipientName || "Hiring Manager"},
        </p>

        {/* BODY */}
        {(data.body || "")
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((p, i) => (
            <p key={i} className="mb-6">
              {p}
            </p>
          ))}

        {/* CLOSING */}
        <div className="mt-12">
          <p>Sincerely,</p>
          <p className="mt-6 font-medium">{name}</p>
        </div>
      </div>
    </div>
  );
}

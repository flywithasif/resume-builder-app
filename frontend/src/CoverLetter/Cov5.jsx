import React from "react";

export default function Cov5({ data }) {
  const name = data.fullName || "Asif H.";
  const role = data.jobTitle || "Web Developer";

  return (
    <div className="bg-white text-black">
      {/* CONTENT AREA – SIMPLE & SAFE */}
      <div
        className="
          max-w-[760px]
          mx-auto
          px-4
          text-[14px]
          leading-relaxed
          font-serif
        "
      >
        {/* HEADER */}
        <div className="mb-6">
          <p className="font-bold text-[16px]">{name}</p>
          <p>{role}</p>
          <p className="mt-2">
            {data.email} | {data.phone} | {data.address}
          </p>
        </div>

        {/* DATE */}
        <p className="mb-6">{data.date}</p>

        {/* RECIPIENT */}
        <div className="mb-6">
          <p>{data.recipientName || "Hiring Manager"}</p>
          <p>{data.companyName}</p>
          <p>{data.companyAddress}</p>
        </div>

        {/* GREETING */}
        <p className="mb-4">
          Dear {data.recipientName || "Hiring Manager"},
        </p>

        {/* BODY */}
        {(data.body || "")
          .split(/\n\s*\n/)
          .filter(Boolean)
          .map((p, i) => (
            <p key={i} className="mb-4">
              {p}
            </p>
          ))}

        {/* CLOSING */}
        <div className="mt-6">
          <p>Sincerely,</p>
          <p className="mt-4 font-bold">{name}</p>
        </div>
      </div>
    </div>
  );
}

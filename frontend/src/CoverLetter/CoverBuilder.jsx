import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ IMPORTANT
import domtoimage from "dom-to-image-more";
import { jsPDF } from "jspdf";
import CoverForm from "./CoverForm";
import CoverPreview from "./CoverPreview";
import { DEFAULT_COVER_TEMPLATE } from "./CoverData";

export default function CoverBuilder() {
  // 🔥 ROUTE SE TEMPLATE ID LE RAHE HAIN
  const { templateId } = useParams();
  const activeTemplate = templateId || DEFAULT_COVER_TEMPLATE;

  const [data, setData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    recipientName: "",
    companyName: "",
    companyAddress: "",
    body:
      "",
  });

  const pdfRef = useRef(null);

  // ===== PDF DOWNLOAD (PREVIEW = PDF) =====
  const downloadPDF = async () => {
    if (!pdfRef.current) return;

    const dataUrl = await domtoimage.toPng(pdfRef.current, {
      scale: 2,
      bgcolor: "#ffffff",
      style: {
        transform: "scale(1)",
        transformOrigin: "top left",
      },
    });

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(dataUrl, "PNG", 0, 0, 210, 297);
    pdf.save("cover-letter.pdf");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-50">
      {/* CSS OVERRIDE FOR PDF (NO BORDERS / NO BOXES) */}
      <style>
        {`
          #print-root *,
          #print-root *::before,
          #print-root *::after {
            border: none !important;
            box-shadow: none !important;
            outline: none !important;
          }
        `}
      </style>

      {/* ===== LEFT: FORM ===== */}
      <div className="bg-white p-4 rounded shadow">
        <CoverForm data={data} setData={setData} />
        <button
          onClick={downloadPDF}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
        >
          Download PDF
        </button>
      </div>

      {/* ===== RIGHT: PREVIEW ===== */}
      <div className="bg-white p-4 rounded shadow overflow-auto">
        <div
          ref={pdfRef}
          id="print-root"
          style={{
            width: "210mm",
            minHeight: "297mm",
            background: "#ffffff",
          }}
        >
          {/* 🔥 ACTIVE TEMPLATE PASS HO RAHA HAI */}
          <CoverPreview data={data} templateId={activeTemplate} />
        </div>
      </div>
    </div>
  );
}

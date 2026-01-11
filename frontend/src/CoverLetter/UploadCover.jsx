// UploadCover.jsx
// Upload existing Cover Letter (pdf/docx)

import React, { useState } from "react";

const UploadCover = () => {
  const [file, setFile] = useState(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Your Cover Letter</h1>
      <input
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-2 rounded"
      />
      {file && (
        <p className="mt-4 text-gray-600">Selected: {file.name}</p>
      )}
      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
        Continue
      </button>
    </div>
  );
};

export default UploadCover;

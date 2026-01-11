import { useState } from "react";

export default function CVTemplate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");

  return (
    <div className="p-8 md:flex gap-8">
      {/* Form */}
      <div className="md:w-1/2 bg-gray-100 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">CV Builder</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone"
            className="p-2 border rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            placeholder="Professional Summary"
            className="p-2 border rounded"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </form>
      </div>

      {/* Live Preview */}
      <div className="md:w-1/2 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
        <div className="border p-4">
          <h3 className="text-xl font-semibold">{name || "Your Name"}</h3>
          <p>Email: {email || "your@email.com"}</p>
          <p>Phone: {phone || "123-456-7890"}</p>
          <p className="mt-2">{summary || "Professional summary will appear here..."}</p>
        </div>
      </div>
    </div>
  );
}

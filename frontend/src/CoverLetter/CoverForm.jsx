import React from "react";

export default function CoverForm({ data, setData }) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
  };

  return (
    <div className="space-y-3">
      <Input label="Full Name" name="fullName" value={data.fullName} onChange={onChange} />
      <Input label="Job Title" name="jobTitle" value={data.jobTitle} onChange={onChange} />
      <Input label="Email" name="email" value={data.email} onChange={onChange} />
      <Input label="Phone" name="phone" value={data.phone} onChange={onChange} />
      <Input label="Address" name="address" value={data.address} onChange={onChange} />
      <Input label="Date" name="date" type="date" value={data.date} onChange={onChange} />
      <Input label="Recipient Name" name="recipientName" value={data.recipientName} onChange={onChange} />
      <Input label="Company Name" name="companyName" value={data.companyName} onChange={onChange} />
      <Input label="Company Address" name="companyAddress" value={data.companyAddress} onChange={onChange} />

      <label className="text-sm font-medium">Body</label>
      <textarea
        name="body"
        value={data.body}
        onChange={onChange}
        rows={8}
        className="w-full border p-2 rounded"
      />
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="w-full border p-2 rounded" />
    </div>
  );
}

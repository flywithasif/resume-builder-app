import React, { useState } from "react";
import contactImage from "../assets/contact.jpg"; // 🖼️ your image path (commented out)

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#E7F6F2] text-[#2C3333] px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16">
        {/* Left: Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-4xl font-bold mb-4 text-[#2C3333]">Contact Us</h2>
          <p className="mb-6 text-[#395B64]">
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#A5C9CA] rounded outline-none focus:ring-2 focus:ring-[#395B64]"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#A5C9CA] rounded outline-none focus:ring-2 focus:ring-[#395B64]"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-[#A5C9CA] rounded resize-none outline-none focus:ring-2 focus:ring-[#395B64]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#395B64] text-white px-6 py-3 rounded hover:bg-[#2C3333] transition w-full"
              disabled={submitted}
            >
              {submitted ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-2">Contact Info</h3>
            <p className="text-[#395B64]">📍 New Delhi, India</p>
            <p className="text-[#395B64]">📞 +91 99999 00000</p>
            <p className="text-[#395B64]">📧 info@cavernresume.com</p>
          </div>
        </div>

        {/* Right: Image (Commented Out) */}
        {
        <div className="hidden md:block">
          <img
            src={contactImage}
            alt="Contact Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div> 
        }
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.svg";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo7 from "../assets/logo7.png";
import rt1 from "../assets/rt1.jpeg"
import rt2 from "../assets/rt2.jpeg"
import rt3 from "../assets/rt3.jpeg"
import rt4 from "../assets/rt4.jpeg"


export default function ResumeTemplate() {
  const navigate = useNavigate();

  // Updated templates data with 'section' property
  const templates = [
    { id: 1, name: "Modern Resume", section: "Popular Templates", image: "https://placehold.co/300x400/90b4d4/ffffff?text=Modern+Resume" },
    { id: 2, name: "Professional Resume", section: "Popular Templates", image: "https://placehold.co/300x400/d49090/ffffff?text=Professional+Resume" },
    { id: 3, name: "Creative Resume", section: "Popular Templates", image: "https://placehold.co/300x400/90d4a9/ffffff?text=Creative+Resume" },
    { id: 4, name: "Elegant Resume", section: "Popular Templates", image: "https://placehold.co/300x400/a990d4/ffffff?text=Elegant+Resume" },
    { id: 5, name: "Minimal Resume", section: "Classic Templates", image: "https://placehold.co/300x400/d4d490/000000?text=Minimal+Resume" },
    { id: 6, name: "Classic Resume", section: "Classic Templates", image: "https://placehold.co/300x400/90d4d4/000000?text=Classic+Resume" },
    { id: 7, name: "Bold Resume", section: "Classic Templates", image: "https://placehold.co/300x400/d4a990/000000?text=Bold+Resume" },
    { id: 8, name: "Infographic Resume", section: "Classic Templates", image: "https://placehold.co/300x400/d490c4/ffffff?text=Infographic+Resume" },
  ];

  const features = [
    {
      title: "Free AND Premium",
      desc: "We offer both free and premium features. Want your resume to have that extra punch? Upgrade to Premium. On a budget? That's OK too - you can use our resume builder completely free of charge.",
      icon: "💎",
    },
    {
      title: "Creative and Professional Templates",
      desc: "Whatever resume template you're looking for, we've got it! From classic to creative, we've got you covered.",
      icon: "📄",
    },
    {
      title: "NO Hidden Fees",
      desc: "We’re upfront about pricing. You’ll never get hit with surprise paywalls after doing the work.",
      icon: "�",
    },
    {
      title: "ATS-Friendly",
      desc: "Our templates are optimized for Applicant Tracking Systems so you pass the first filter every time.",
      icon: "✅",
    },
    {
      title: "Live Content Feedback",
      desc: "Get real-time suggestions to improve your resume content instantly.",
      icon: "💬",
    },
    {
      title: "Edit in Real Time",
      desc: "See your changes applied instantly as you edit your resume.",
      icon: "✏️",
    },
  ];


  // Group templates by section
  const groupedTemplates = templates.reduce((acc, template) => {
    (acc[template.section] = acc[template.section] || []).push(template);
    return acc;
  }, {});

  const handleSelect = (id) => {
    navigate(`/template-options/${id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6">

      {/* 1️⃣ Hero Section */}
      <section className="bg-[#E7F6F2] py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#2C3333] leading-tight mb-8">
              Just three <span className="text-[#395B64]">easy steps</span>
            </h1>

            <div className="space-y-6 text-lg text-[#2C3333]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#A5C9CA] text-[#2C3333] font-bold">1</div>
                <p><span className="font-bold">Select</span> a template from our library of professional designs</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#A5C9CA] text-[#2C3333] font-bold">2</div>
                <p><span className="font-bold">Build</span> your resume with our industry-specific bullet points</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#A5C9CA] text-[#2C3333] font-bold">3</div>
                <p><span className="font-bold">Customize</span> the details and wrap it up. You’re ready to send!</p>
              </div>
            </div>
          </div>

          {/* Right Static Image 
          <div className="flex justify-center">
            <img
              src={tt1}
              alt="Resume Example"
              className="w-full max-w-md h-72 rounded-lg shadow-xl object-cover"
            />
          </div> */}
        </div>
      </section>

      {/* logo section */}
      <section className="py-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <p className="text-lg font-semibold text-[#222831] mb-8 text-center">
            Our customers have been hired by:
          </p>
      
          {/* Slider */}
          <div className="logo-slider">
            <div className="logo-track">
              {[
                logo1,
                logo2,
                logo3,
                logo7,
                logo4,
                logo5,
                logo1,
                logo2,
                logo3,
                logo7,
                logo4,
                logo5,
              ].map((logo, index) => (
                <div key={index} className="logo-item">
                  <img src={logo} alt={`logo-${index}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </section>
      

      {/* 3️⃣ Recruiters Love Section */}
      <section className="py-20 text-center bg-[#395B64] text-white">
        <h2 className="text-3xl font-bold mb-6">Recruiters Love Our Resume Builder. Learn Why Below.</h2>
      </section>


      {/* 4️⃣ Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#222831]">
          Why Use Our Resume Builder?
          <div className="w-16 h-1 bg-[#76ABAE] mx-auto mt-3 rounded-full"></div>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-[#76ABAE] text-[#222831] w-14 h-14 rounded-lg flex items-center justify-center text-2xl">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#222831]">{feature.title}</h3>
                <p className="text-[#31363F] text-sm mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">Select a Resume Template</h1>

      

      {/* Existing template selection section */}
      {Object.keys(groupedTemplates).map(section => (
        <section key={section} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-8">{section}</h2>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
            {groupedTemplates[section].map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden transform hover:scale-[1.03] transition duration-300"
              >
                <img src={template.image} alt={template.name} className="w-full h-64 object-cover"/>
                <div className="p-5 flex flex-col justify-between h-36">
                  <h2 className="text-lg font-semibold text-gray-800">{template.name}</h2>
                  <button
                    onClick={() => handleSelect(template.id)}
                    className="mt-4 bg-[#395B64] hover:bg-[#2C3F46] text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* New section for resume building steps */}
      <section className="bg-[#A5C9CA] py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Heading & Paragraph */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Build Your Resume Fast and Easy.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              CavernResume is lightning fast. There's no software to download. No multi-part sign-up form.
              No long-winded tutorials. Just a straightforward process.
            </p>
          </div>
          <div className="space-y-20">
            {/* Section 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Text */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-[#395B64] mb-2">1. Pick a Template</h3>
                <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
                  Don't sabotage your job search before it has even begun. Choose from our ATS-friendly, hand-crafted resume templates.
                </p>
              </div>
              {/* Right Image */}
              <div className="flex justify-center">
                <img
                  src={rt1}
                  alt="Pick a Template"
                  className="rounded-lg shadow-lg w-72 md:w-80"
                />
              </div>
            </div>
            {/* Section 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Image */}
              <div className="flex justify-center order-2 md:order-1">
                <img
                  src={rt2}
                  alt="Customize Layout"
                  className="rounded-lg shadow-lg w-72 md:w-80"
                />
              </div>
              {/* Right Text */}
              <div className="text-center md:text-left order-1 md:order-2">
                <h3 className="text-xl font-semibold text-[#395B64] mb-2">2. Customize Your Layout</h3>
                <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
                  Make the resume template truly your own. Customize the layout based on your experience level.
                </p>
              </div>
            </div>
            {/* Section 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Text */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-[#395B64] mb-2">3. Fill in the Blanks</h3>
                <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
                  Fill in your resume information, let our AI content analyzer do its job, and see your resume changes dynamically in real time.
                </p>
              </div>
              {/* Right Image */}
              <div className="flex justify-center">
                <img
                  src={rt3}
                  alt="Fill in the Blanks"
                  className="rounded-lg shadow-lg w-72 md:w-80"
                />
              </div>
            </div>
            {/* Section 4 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Image */}
              <div className="flex justify-center order-2 md:order-1">
                <img
                  src={rt4}
                  alt="Download Resume"
                  className="rounded-lg shadow-lg w-72 md:w-80"
                />
              </div>
              {/* Right Text */}
              <div className="text-center md:text-left order-1 md:order-2">
                <h3 className="text-xl font-semibold text-[#395B64] mb-2">4. Hit 'Download!'</h3>
                <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
                  And yes, it's free! We don't hit you with a paywall once you've completed your resume in the Basic Account.
                  If you use any of our premium features, the software will let you know about it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

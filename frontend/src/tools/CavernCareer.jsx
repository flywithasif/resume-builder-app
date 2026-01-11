import React from "react";

const CavernCareer = () => {
  const features = [
    {
      title: "Resume Builder",
      icon: "📝",
      description:
        "Design a professional resume in minutes using our ready-made templates that impress recruiters.",
    },
    {
      title: "Cover Letter Generator",
      icon: "✉️",
      description:
        "Generate personalized, compelling cover letters to match every job application with ease.",
    },
    {
      title: "AI Resume Optimization",
      icon: "🤖",
      description:
        "Use AI to scan and improve your resume for better visibility and job matches.",
    },
  ];

  const steps = [
    {
      title: "Build Your Resume",
      desc: "Use CavernCareer’s intuitive tools to create your resume with no design skills required.",
    },
    {
      title: "Apply for Jobs",
      desc: "Get job recommendations and apply directly with your optimized resume.",
    },
    {
      title: "Track Your Progress",
      desc: "Manage applications, save jobs, and track your interview calls from one dashboard.",
    },
  ];

  return (
    <section className="bg-[#F2F4F4] py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#2C3333]">
          Boost Your Career with CavernCareer
        </h2>
        <p className="text-lg text-[#395B64] max-w-2xl mx-auto mb-16">
          Whether you’re starting fresh or aiming higher, CavernCareer gives you the tools to build your future with confidence and style.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-10 text-left">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-8 shadow border border-[#A5C9CA] hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-[#2C3333]">{feature.title}</h3>
              <p className="text-[#555]">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="mt-24 max-w-4xl mx-auto text-left">
          <h3 className="text-3xl font-bold text-center mb-10 text-[#2C3333]">
            Your Job Hunt, Simplified
          </h3>
          <ul className="space-y-10">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="text-2xl font-bold text-[#395B64]">{i + 1}.</div>
                <div>
                  <h4 className="font-semibold text-lg text-[#2C3333]">{step.title}</h4>
                  <p className="text-[#555]">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="bg-[#395B64] text-white text-lg font-medium py-3 px-8 rounded-lg hover:bg-[#2C3333] transition duration-300">
            Start Your Career Journey 🚀
          </button>
        </div>
      </div>
    </section>
  );
};

export default CavernCareer;

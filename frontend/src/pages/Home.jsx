// src/pages/Home.jsx
import React from "react";
import faqImg from "../assets/faq.jpg";
import MasterclassImg from "../assets/Masterclass.jpg"; // apni image ka actual path lagao
import Resu1 from "../assets/resu1.jpg"; 
import Resu2 from "../assets/resu2.jpg";
import Resu3 from "../assets/resu3.jpg";
import Resu4 from "../assets/resu4.jpg";
import ResuT from "../assets/resuT.jpg";
import Resucv from "../assets/resucv.jpg";
import Resuco from "../assets/resuco.jpg";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.svg";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo7 from "../assets/logo7.png";




import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#E7F6F2] text-[#2C3333]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Build Your <span className="text-[#395B64]">Dream Resume</span> in Minutes
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Professional resumes, CVs, and cover letters made easy with CavernResume
        </p>
        <Link
          to="/resume-maker"
          className="bg-[#395B64] text-white px-6 py-3 rounded-full hover:bg-[#2C3333] transition"
        >
          Get Started
        </Link>
      </section>


      
{/* Templates Preview */}
      <section className="py-16 px-6 bg-[#A5C9CA]">
  <h2 className="text-4xl font-bold text-center mb-12 text-[#395B64]">
    Explore Our Templates
  </h2>

  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      { id: 1, title: "Resume Templates", link: "/resume-template", img: ResuT },
      { id: 2, title: "CV Templates", link: "/cv-template", img: Resucv },
      { id: 3, title: "Cover Letter Templates", link: "/cover-letter-template", img: Resuco },
    ].map((t) => (
      <div
        key={t.id}
        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
      >
        {/* Image */}
        <div className="bg-[#F5F5F5] flex justify-center items-center p-4">
          <img
            src={t.img}
            alt={t.title}
            className="w-full h-80 object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text Content */}
        <div className="p-6 text-center">
          <h3 className="font-bold text-xl mb-3 text-[#2C3333]">{t.title}</h3>
          <Link
            to={t.link}
            className="inline-block px-5 py-2 mt-2 bg-[#395B64] text-white rounded-full hover:bg-[#2C3333] transition-colors duration-300"
          >
            View Template
          </Link>
        </div>
      </div>
    ))}
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
{/* Features Section */}
<section className="py-16 px-6">
  <h2 className="text-3xl font-bold text-center mb-12 text-[#222831]">
    Why Use Our Resume Builder?
    <div className="w-16 h-1 bg-[#76ABAE] mx-auto mt-3 rounded-full"></div>
  </h2>
  <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
    {[
      {
        title: "Free AND Premium",
        desc: "We offer both free and premium features. Want your resume to have that extra punch? Upgrade to Premium. On a budget? That's OK too - you can use our resume builder completely free of charge.",
        icon: "💎",
      },
      {
        title: "Creative and Professional Resume Templates",
        desc: "Whatever resume template you're looking for, we've got it! Whether it's a classic black-and-white template, or something a bit more outside the box, we have what you need!",
        icon: "📄",
      },
      {
        title: "NO Hidden Fees",
        desc: "You won’t spend hours working on your resume, just to be hit with a hidden paywall. Our resume builder will notify you if you’re using any premium features in advance.",
        icon: "💰",
      },
      {
        title: "ATS-Friendly",
        desc: "Our resume templates are ATS-friendly. Your resume won’t automatically be rejected because an ATS can’t read it.",
        icon: "✅",
      },
      {
        title: "Live Content Feedback",
        desc: "Get real-time feedback on your resume content to ensure it reaches its full potential.",
        icon: "💬",
      },
      {
        title: "Edit Your Resume in Real Time",
        desc: "As you edit your resume, you’ll immediately see the changes applied to your document.",
        icon: "✏️",
      },
    ].map((feature, index) => (
      <div key={index} className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 bg-[#76ABAE] text-[#222831] w-14 h-14 rounded-lg flex items-center justify-center text-2xl">
          {feature.icon}
        </div>
        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold text-[#222831]">
            {feature.title}
          </h3>
          <p className="text-[#31363F] text-sm mt-1">
            {feature.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
      {/* Features */}
      <section className="py-16 px-6 bg-[#F9F9F9]">
  <h2 className="text-3xl font-bold text-center mb-12 text-[#395B64]">Why CavernResume?</h2>

  <div className="max-w-6xl mx-auto space-y-16">
    
    {/* Row 1 */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#395B64]">New, professional designs</h3>
        <p className="text-[#030303]">
          Give your resume a fresh and modern look with our collection of professionally crafted templates. Each design is created to impress recruiters at first glance, maintaining a perfect balance between style and readability. Whether you’re applying for a corporate role, a creative position, or a startup job, our updated designs help you present your skills and experience in the most appealing and professional way.
        </p>
      </div>
      <img src={Resu1} alt="Professional Templates" className="rounded-lg shadow-lg" />
    </div>

    {/* Row 2 */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img src={Resu2} alt="ATS Friendly" className="rounded-lg shadow-lg order-1 md:order-none" />
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#395B64]">ATS-Friendly</h3>
        <p className="text-[#030303]">
          Our templates are optimized to pass Applicant Tracking Systems (ATS) with ease. Many companies use ATS software to filter resumes before they even reach a human recruiter. With clean formatting, structured sections, and keyword-friendly designs, your resume will be easily scanned and ranked higher. This ensures your skills and experience get noticed, increasing your chances of landing an interview.
        </p>
      </div>
    </div>

    {/* Row 3 */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#395B64]">Customizable Layout</h3>
        <p className="text-[#030303]">
          Design your resume exactly the way you want. With our customizable layout feature, you have full control over fonts, colors, sections, and spacing. Whether you prefer a modern minimal look or a bold creative style, easily adjust every element to match your personal brand. Stand out from the crowd by creating a resume that not only highlights your skills but also reflects your personality and professionalism.
        </p>
      </div>
      <img src={Resu3} alt="Customizable Layout" className="rounded-lg shadow-lg" />
    </div>

    {/* Row 4 */}
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img src={Resu4} alt="Fast and Easy" className="rounded-lg shadow-lg order-1 md:order-none" />
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#395B64]">Fast & Easy</h3>
        <p className="text-[#030303]">
          Create a job-ready resume in minutes without any complicated steps. Our intuitive editor lets you quickly add your details, choose a template, and customize it to your liking — all without needing design skills. Whether you’re starting from scratch or updating an old resume, the process is smooth, simple, and hassle-free, so you can focus on landing your next job.
        </p>
      </div>
    </div>
  </div>

</section>
      {/* Features Section */}
<section className="py-16 px-6 bg-[#395B64]">
  <h2 className="text-3xl font-bold text-center mb-10">Our Key Features</h2>
  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
    {[
      {
        title: "Easy to Use",
        desc: "Create professional resumes in just a few clicks without any design skills.",
        icon: "🖊️",
      },
      {
        title: "Customizable Templates",
        desc: "Choose from modern and creative templates to match your style.",
        icon: "🎨",
      },
      {
        title: "Download & Share",
        desc: "Easily download your resume in PDF format and share it with recruiters.",
        icon: "📄",
      },
    ].map((feature, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition"
      >
        <div className="text-5xl mb-4">{feature.icon}</div>
        <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* Steps */}
      <section className="bg-[#A5C9CA] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">How it Works</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {["Choose Template", "Fill Your Info", "Download"].map((step, i) => (
            <div key={i} className="bg-white text-[#2C3333] p-6 rounded-xl w-full max-w-xs shadow-md">
              <span className="text-4xl font-bold text-[#395B64]">{i + 1}</span>
              <h3 className="text-xl font-semibold mt-2">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
  <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>

  <div className="max-w-7xl mx-auto relative">
    {/* Reviews container */}
    <div
      id="reviewContainer"
      className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
    >
      {[
        { name: "Hasaan", date: "July 29", title: "I need sample", text: "It's a good experience" },
        { name: "Kalyani Thakare", date: "July 28", title: "Very efficient platform", text: "It is possible to create a resume within few minutes" },
        { name: "Vibin Antony", date: "July 26", title: "Excellent experience", text: "Excellent experience" },
        { name: "Ananya Singh", date: "July 20", title: "Loved the templates", text: "Helped me land my first job" },
        { name: "Ravi Kumar", date: "July 18", title: "Easy to use", text: "The resume builder is super intuitive" },
        { name: "Priya Sharma", date: "July 15", title: "Professional look", text: "My resume looked so polished" },
        { name: "Amit Verma", date: "July 12", title: "Highly recommend", text: "Saves so much time" },
        { name: "Sana Khan", date: "July 10", title: "Great support", text: "Customer service was very helpful" },
        { name: "Rohit Das", date: "July 8", title: "Awesome experience", text: "Loved the easy download options" },
        { name: "Meera Nair", date: "July 5", title: "Superb", text: "Exactly what I needed" },
      ].map((review, index) => (
        <div
          key={index}
          className="bg-[#E7F6F2] p-6 rounded-lg shadow min-w-[280px]"
        >
          <div className="text-[#76ABAE] mb-3">★★★★★</div>
          <h3 className="text-lg font-semibold text-[#222831]">{review.title}</h3>
          <p className="text-[#222831] mb-2">{review.text}</p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">{review.name}</span>, {review.date}
          </p>
        </div>
      ))}
    </div>

    {/* Left Button */}
<button
  onClick={() => {
    document
      .getElementById("reviewContainer")
      .scrollBy({ left: -300, behavior: "smooth" });
  }}
  className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-[#76ABAE] text-4xl hover:scale-110 transition"
>
  &lt;
</button>

{/* Right Button */}
<button
  onClick={() => {
    document
      .getElementById("reviewContainer")
      .scrollBy({ left: 300, behavior: "smooth" });
  }}
  className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-[#76ABAE] text-4xl hover:scale-110 transition"
>
  &gt;
</button>
  </div>
</section>
{/* Job Search Masterclass Section */}
<section className="bg-[#395B64] py-16 px-4">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* Left Content */}
    <div>
      <h2 className="text-3xl font-bold text-[#EEEEEE] mb-4">
        Job Search Masterclass
      </h2>
      <div className="w-16 h-1 bg-[#76ABAE] mb-6"></div>
      <p className="text-[#EEEEEE] mb-6">
        Don’t have much career experience? Not sure how to write your resume, ace your interview, 
        or land that job? Check out our Job Search Masterclass! We’ll teach you how to do the following:
      </p>
      <ul className="text-[#EEEEEE] list-disc pl-5 space-y-2">
        <li>Create a Resume That Grabs Recruiters’ Attention Every Single Time</li>
        <li>Ace Your Interview (Even if You’re an Introvert)</li>
        <li>Find a Job You’ll Love (And Actually Get It)</li>
      </ul>
      <Link
  to="/job-masterclass"
  className="mt-6 inline-block bg-[#76ABAE] text-[#222831] font-semibold px-6 py-3 rounded-full hover:bg-[#5d8e91] transition"
>
  Get It Now
</Link>
    </div>

    {/* Right Side Decoration */}
    <div className="flex justify-center">
      <img
  src={MasterclassImg} 
  alt="Job Search Illustration"
  className="max-w-xl w-full rounded-lg shadow-lg"
/>

    </div>
  </div>
</section>
<section className="py-16 px-4">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
    
    {/* FAQ Left Side */}
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        
        {/* FAQ Item */}
        <details className="bg-gray-100 rounded-lg shadow">
          <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800">
            Why should I use a resume builder?
            <span className="text-[#76ABAE] text-2xl">+</span>
          </summary>
          <p className="p-4 text-gray-700">
            Using a resume builder makes the process of creating a resume significantly faster and easier. Ever tried building your resume with Word?
          </p>
          <p className="p-4 text-gray-700">
            The whole process is a huge pain – you make a TINY change to your resume, and the entire resume layout gets completely messed up.
          </p>
          <p className="p-4 text-gray-700">
            With a resume builder, you don’t have to worry about the nitty gritty of resume creation, like font selection, layout, formatting, etc.
          </p>
          <p className="p-4 text-gray-700">
            All you have to do is pick a resume template, fill it in, and then you’re ready to start applying for jobs!
          </p>
        </details>

        {/* FAQ Item */}
        <details className="bg-gray-100 rounded-lg shadow">
          <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800">
            What is the best resume builder?
            <span className="text-[#76ABAE] text-2xl">+</span>
          </summary>
          <p className="p-4 text-gray-700">
            Over the past 7 years, we’ve been working hard to make CavernResume the best resume builder out there.
          </p>
          <p className="p-4 text-gray-700">
            And we’d say we succeeded! Here’s what sets us apart from the rest of the competition:
          </p>
          <p className="p-4 text-gray-700">
            Easy to Use - Our builder is very easy to use, even if you're not too tech-friendly.
          </p>
          <p className="p-4 text-gray-700">
            Get Started in under 5 Minutes - Just pick one of our resume templates, and you're good to go!
          </p>
          <p className="p-4 text-gray-700">
            It's 100% free - Some resume builders out there pretend to be free… and then they hit you with a paywall once you’re done writing your resume! We don’t do that. Our builder will instantly notify you if you’re using any of our premium features.
          </p>
          <p className="p-4 text-gray-700">
            Cover Letter Builder - If you’re using CavernResume Premium, you gain access to our cover letter builder for free (including matching cover letter templates).
          </p>
          <p className="p-4 text-gray-700">
            Tons of Customization and Design Options - Our builder offers a ton of customization. You can make changes to the layout, color schemes, and much more.
          </p>
          <p className="p-4 text-gray-700">
            ATS-Friendly Resume Templates - Our resume templates are built on top of some of the most popular applicant tracking systems out there. Meaning, your resume won't automatically get rejected by any ATS.
          </p>
        </details>

        {/* FAQ Item */}
        <details className="bg-gray-100 rounded-lg shadow">
          <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800">
            Is this a completely free resume builder?
            <span className="text-[#76ABAE] text-2xl">+</span>
          </summary>
          <p className="p-4 text-gray-700">
            Yes, CavernResume is a 100% free resume builder.
          </p>
          <p className="p-4 text-gray-700">
            If you’re on a budget, you can use it to create your resume completely free of charge. And no, unlike some other resume builders out there, we don’t hit you with a paywall once you’ve completed your resume.
          </p>
          <p className="p-4 text-gray-700">
            If you use any of our premium features, the software will let you know about it. It will then ask if you did it accidentally, or if you would like to upgrade to CavernResume Premium. You're in control!
          </p>
        </details>
        <details className="bg-gray-100 rounded-lg shadow">
          <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800">
            What is a resume?
            <span className="text-[#76ABAE] text-2xl">+</span>
          </summary>
          <p className="p-4 text-gray-700">
            A resume (also known as a CV, or curriculum vitae) is a 1-2 page document that summarizes your work experience and career history.
          </p>
          <p className="p-4 text-gray-700">
            It usually includes information about the following:
          </p>
          <p className="p-4 text-gray-700">
            Your work history
          </p>
          <p className="p-4 text-gray-700">
            Educational background
          </p>
          <p className="p-4 text-gray-700">
            Achievements
          </p>
          <p className="p-4 text-gray-700">
            Contact information
          </p>
          <p className="p-4 text-gray-700">
            Resume summary or resume objective
          </p>
        </details>
        <details className="bg-gray-100 rounded-lg shadow">
          <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800">
            What's the difference between a CV and a resume?
            <span className="text-[#76ABAE] text-2xl">+</span>
          </summary>
          <p className="p-4 text-gray-700">
            In the EU, the words "CV" and "resume" are used interchangeably
          </p>
          <p className="p-4 text-gray-700">
            In the United States, however, a resume is a document you use to apply for jobs, while a CV is mainly used by academics.
          </p>
          <p className="p-4 text-gray-700">
            Want to learn more? Check out our article on the differences between CVs and resumes.
          </p>
        </details>
        <details className="bg-gray-100 rounded-lg shadow">
          <summary className="flex justify-between items-center cursor-pointer p-4 text-gray-800">
            How can I create my resume?
            <span className="text-[#76ABAE] text-2xl">+</span>
          </summary>
          <p className="p-4 text-gray-700">
            Making a resume with CavernResume is very straightforward.
          </p>
          <p className="p-4 text-gray-700">
            Just pick one of our professional resume templates.
          </p>
          <p className="p-4 text-gray-700">
            Then, you’ll be forwarded to our resume builder, where all you have to do is fill in your resume content!
          </p>
        </details>
      </div>
    </div>

    {/* Image Right Side */}
    <div className="flex justify-center">
      <img 
  src={faqImg} 
  alt="FAQ" 
  className="max-w-xl w-full rounded-lg" 
/>
    </div>
  </div>
</section>
{/* CTA */}
      <section className="py-20 text-center bg-[#395B64] text-white">
        <h2 className="text-3xl font-bold mb-6">Ready to Build Your Resume?</h2>
        <Link
          to="/resume-maker"
          className="bg-white text-[#2C3333] px-6 py-3 rounded-full font-semibold hover:bg-[#E7F6F2]"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Home;

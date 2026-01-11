import React from 'react';

const About = () => {
  return (
    <div className="bg-[#E7F6F2] text-[#2C3333] px-4 sm:px-8 md:px-16 py-10 space-y-16">
      {/* Vision Section */}
      <section className="text-center space-y-4 bg-[#E7F6F2] text-[#2C3333] px-4 py-16">
      <h1 className="text-4xl md:text-6xl font-bold">
        Our <span className="text-[#395B64]">Vision</span>
      </h1>

      <h2 className="text-lg md:text-xl max-w-2xl mx-auto">
        Empower People to Achieve Fulfilling Careers.
      </h2>

      <p className="max-w-3xl mx-auto text-[#2C3333]">
        „We ask recruiters what makes for a successful resume. Then we take these insights and build them into our resume templates. Thus, when you use our
      </p>
    </section>

      
      

      {/* Origin Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold border-l-4 border-[#395B64] pl-3">Origin</h2>
        <div>
          <h3 className="text-xl font-semibold underline">Birth of a project</h3>
          <p>
            CavernResume began in January 2025 as a project work aimed at solving a real-world problem — how to help skilled individuals present their experience and strengths through a professional resume. What started as a simple initiative soon gained momentum as we realized the widespread need for a better, easier, and smarter resume-building tool. By mid-2025, CavernResume had grown into a complete platform, empowering job seekers to create resumes that truly represent their potential and land their dream opportunities.
          </p>
        </div>
      </section>

      {/* Idea + Outcome */}
      <section className="grid md:grid-cols-2 gap-10">
        {/* Idea */}
        <div className="bg-[#2C3333] px-4 py-12 text-[#E7F6F2] text-center space-y-4">
  <h3 className="text-2xl md:text-3xl font-semibold underline">Idea</h3>
  <p className="max-w-3xl mx-auto text-lg">
    Drawing from our diverse expertise in technology, design, and digital strategy, we envisioned a
    smart, web-based platform that simplifies the process of building visually appealing and impactful
    resumes. Our goal was clear — to create a tool that anyone could use to craft a standout resume
    without needing technical skills or design knowledge.
  </p>
</div>


        {/* Outcome */}
        <div className="bg-[#A5C9CA] px-4 py-12 text-[#2C3333] text-center space-y-4">
  <h3 className="text-2xl md:text-3xl font-semibold underline">Outcome</h3>
  <p className="max-w-3xl mx-auto text-lg">
    After months of research, refinement, and user feedback, we officially launched CavernResume's
    intuitive resume builder. The impact was immediate — users began receiving more interview
    opportunities, felt more confident in their applications, and were empowered to take control of
    their career journeys.
  </p>
</div>

      </section>

      {/* The Team Section */}
<section className="text-center space-y-6 bg-[#395B64] py-10 px-4 sm:px-8 md:px-16 rounded-md">
  <h2 className="text-4xl font-bold text-[#E7F6F2]">The Team</h2>
  <p className="max-w-4xl mx-auto text-[#E7F6F2] text-base sm:text-lg">
    We believe that co-creation with users and recruiters is the key to success. By collecting
    feedback from both sides, we improve continuously and introduce new services based on real
    needs.
  </p>
</section>



      {/* Meet the Team Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Meet the Team</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              name: 'Stefan Polexe',
              role: 'CEO & Co-Founder',
              desc: '“Many people wonder why this Transylvanian is awake at night...”',
              img: '/path-to-image1.jpg',
            },
            {
              name: 'Andrei Kurtuy',
              role: 'Chief Marketing Officer',
              desc: '“An avid marketer, researcher, and bookworm at heart.”',
              img: '/path-to-image2.jpg',
            },
            {
              name: 'Cristian Letai',
              role: 'Chief Design Officer',
              desc: '“A badass visual designer with Star Wars love...”',
              img: '/path-to-image3.jpg',
            },
            {
              name: 'Romain Pennel',
              role: 'Team Lead',
              desc: '“With a people-first approach...”',
              img: '/path-to-image4.jpg',
            },
          ].map((member, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row gap-6 items-start bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full border-4 border-[#A5C9CA] object-cover"
              />
              <div>
                <h4 className="text-lg font-bold">{member.name}</h4>
                <p className="text-sm text-[#395B64]">{member.role}</p>
                <p className="mt-2 text-sm text-[#2C3333]">{member.desc}</p>
              </div>
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

    </div>
  );
};

export default About;

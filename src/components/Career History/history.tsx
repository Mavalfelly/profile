import { Briefcase, Calendar, Download } from "lucide-react";

const CareerHistory = () => {
  const experiences = [
    {
      company: "Intercontinental Exchange",
      role: "Software Engineer 1",
      period: "03/2025 - Present",
      responsibilities: [
        "Focused on DevOps and full-stack development, optimizing CI/CD pipelines and infrastructure automation.",
        "Designed and maintained BFFs and MFEs for scalable applications.",
        "Worked with Docker, Kubernetes, AWS/Azure to streamline deployments."
      ]
    },
    {
      company: "General Assembly",
      role: "Software Development Trainee",
      period: "05/2024 - 01/2025",
      responsibilities: [
        "Developed projects using React, Node.js, Express, Python, Django, PostgreSQL, and MongoDB.",
        "Built RESTful APIs and integrated front-end and back-end systems.",
        "Applied Python for automation and backend scripting."
      ]
    },
    {
      company: "Total Quality Logistics",
      role: "Drop Trailer Account Representative",
      period: "09/2023 - 10/2024",
      responsibilities: [
        "Coordinated freight tenders for over 100 brokers.",
        "Monitored asset performance to optimize efficiency.",
        "Built strong relationships to drive customer loyalty."
      ]
    },
    {
      company: "Bankers Life and Casualty",
      role: "Insurance Agent",
      period: "10/2020 - 09/2023",
      responsibilities: [
        "Consistently exceeded sales targets through strategic cold calling.",
        "Conducted client consultations to optimize insurance solutions.",
        "Trained and certified over 50 agents annually."
      ]
    }
  ];

  return (
    <div id="career_history" className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-cust-green mb-4">Professional Experience</h2>
        <p className="text-gray-400">My journey through the tech industry</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-500 via-green-500 to-transparent"></div>

        <div className="space-y-12">
          {experiences.map((job, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-lime-500 rounded-full -ml-2 ring-4 ring-custom-bg"></div>

              {/* Content Card */}
              <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-100 rounded-lg">
                        <Briefcase className="w-6 h-6 text-lime-700" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{job.company}</h3>
                        <p className="text-lime-600 font-semibold">{job.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{job.period}</span>
                  </div>

                  <ul className="space-y-2">
                    {job.responsibilities.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-lime-500 mt-1.5">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume Download */}
      <div className="text-center mt-12">
        <a
          href="/MatthewFeliciano.pdf"
          download="Matt_Feliciano_Resume.pdf"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-lime-500 to-green-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all duration-300 hover:scale-105"
        >
          <Download className="w-5 h-5" />
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default CareerHistory;
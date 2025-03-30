const CareerHistory = () => {
    return (
      <div
        id="career_history"
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl shadow-[rgba(144,184,80,0.5)] text-center p-6 overflow-hidden mb-8 mt-4"
      >
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">Professional Experience</h2>
        
        {/* Experience Section */}
        {[{
          company: "Intercontinental Exchange",
          role: "Software Engineer 1",
          period: "03/2025 - Present",
          responsibilities: [
            "Focused on DevOps and full-stack development, optimizing CI/CD pipelines and infrastructure automation.",
            "Designed and maintained BFFs and MFEs for scalable applications.",
            "Worked with Docker, Kubernetes, AWS/Azure to streamline deployments."
          ]
        }, {
          company: "General Assembly",
          role: "Software Development Trainee",
          period: "05/2024 - 01/2025",
          responsibilities: [
            "Developed projects using React, Node.js, Express, Python, Django, PostgreSQL, and MongoDB.",
            "Built RESTful APIs and integrated front-end and back-end systems.",
            "Applied Python for automation and backend scripting."
          ]
        }, {
          company: "Total Quality Logistics",
          role: "Drop Trailer Account Representative",
          period: "09/2023 - 10/2024",
          responsibilities: [
            "Coordinated freight tenders for over 100 brokers.",
            "Monitored asset performance to optimize efficiency.",
            "Built strong relationships to drive customer loyalty."
          ]
        }, {
          company: "Bankers Life and Casualty",
          role: "Insurance Agent",
          period: "10/2020 - 09/2023",
          responsibilities: [
            "Consistently exceeded sales targets through strategic cold calling.",
            "Conducted client consultations to optimize insurance solutions.",
            "Trained and certified over 50 agents annually."
          ]
        }].map((job, index) => (
          <div key={index} className="mb-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800">{job.company}</h3>
            <p className="text-gray-700 italic">{job.role} | {job.period}</p>
            <ul className="list-disc ml-6 text-gray-800">
              {job.responsibilities.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* Resume Download */}
        <a
          href="/MatthewFeliciano.pdf" 
          download="Matt_Feliciano_Resume.pdf" 
          className="relative mt-4 px-4 md:px-6 py-2 text-black font-semibold border border-black max-w-32 group text-sm md:text-base"
        >
          <span className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
          <span className="relative group-hover:text-white">Download Resume</span>
        </a>
      </div>
    );
};
  
export default CareerHistory;
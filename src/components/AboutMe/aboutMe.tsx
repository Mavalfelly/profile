import Typer from "../Typer/typer";

const AbMe = () => {
  return (
    <div
      id="about_me"
      className="flex flex-col md:flex-row bg-lime-300 bg-opacity-60 shadow-lg rounded-lg p-8 md:p-10 mx-4 md:mx-auto my-6 md:my-10 max-w-5xl z-10"
    >
      {/* Left Section: Headshot */}
      <div className="flex justify-center md:justify-start flex-shrink-0 mb-6 md:mb-0 md:mr-10">
        <img
          src="/Matt.jpg"
          alt="Matt's Headshot"
          className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover shadow-md"
        />
      </div>
      <div className="flex flex-col">
        {/* Typewriter */}
        <div className="mb-6 text-md md:text-xl font-semibold text-gray-800">
          <Typer
            phrases={["About Matt", "Always learning", "Always evolving"]}
            speed={100}
            deleteSpeed={50}
            displayTime={2500}
          />
        </div>

        {/* Professional Summary */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">Professional Summary</h2>
          <p className="text-gray-800 text-lg leading-relaxed">
            I am a software engineer with a strong foundation in full-stack development with a specialization in DevOps and infrastructure. With expertise in JavaScript, React, Node.js, Python, and Java, I have built scalable applications using MongoDB, SQL, and TailwindCSS. My transition into DevOps has expanded my skill set to include Kubernetes, Azure DevOps, Docker, Terraform, Spacelift, and AWS, where I focus on automating deployments, optimizing cloud infrastructure, and enhancing CI/CD pipelines. Leveraging tools like Argo and GitHub, I streamline development workflows to drive efficiency and reliability in tech-driven environments.</p>
        </div>
        <a
            href="/MatthewFeliciano.pdf" 
            download="Matt_Feliciano_Resume.pdf" 
            className="relative mt-4 px-4 md:px-6 py-2 text-black font-semibold border border-black max-w-32 group text-sm md:text-base"
            >
            <span className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
            <span className="relative group-hover:text-white">Download Resume</span>
        </a>
      </div>
    </div>
  );
};

export default AbMe;
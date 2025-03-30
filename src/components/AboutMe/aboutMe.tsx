import Typer from "../Typer/typer";

const AbMe = () => {
  return (
    <div
      id="about_me"
      className="max-w-lg mx-auto bg-white rounded-lg shadow-xl shadow-[rgba(144,184,80,0.5)] text-center p-6 overflow-hidden mb-6"
    >
      {/* Headshot */}
      <div className="flex justify-center mb-4">
        <img
          src="/Matt.jpg"
          alt="Matt's Headshot"
          className="rounded-full w-32 h-32 object-cover shadow-md"
        />
      </div>
      
      {/* Typewriter */}
      <div className="mb-4 text-md md:text-lg font-semibold text-gray-800">
        <Typer
          phrases={["About Matt", "DevOps Guru", "Full-Stack Developer", "Cloud Enthusiast"]}
          speed={100}
          deleteSpeed={50}
          displayTime={2500}
        />
      </div>

      {/* Professional Summary */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">About Matt</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          I am a software engineer with a strong foundation in full-stack development and currently specialize in DevOps and Infrastructure. Utilizing my expertise in JavaScript, React, Python, and Java, I have built scalable applications using MongoDB, SQL, and TailwindCSS. My transition into DevOps has expanded my skill set to include Kubernetes, Azure DevOps, Docker, Terraform, Spacelift, and AWS, where I focus on automating deployments, optimizing cloud infrastructure, and enhancing CI/CD pipelines. Leveraging tools like Argo and GitHub, I streamline development workflows to drive efficiency and reliability in tech-driven environments.
        </p>
      </div>
    </div>
  );
};

export default AbMe;
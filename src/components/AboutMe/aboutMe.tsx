import Typer from "../Typer/typer";

const AbMe = () => {
  return (
    <div
      id="about_me"
      className="flex flex-col md:flex-row bg-lime-800 bg-opacity-50 shadow-lg rounded-lg p-6 md:p-10 max-w-5xl mx-auto my-10"
    >
      {/* Left Section: Headshot */}
      <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
        <img
          src="/Matt.jpg"
          alt="Matt's Headshot"
          className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover shadow-md"
        />
      </div>
      <div className="flex flex-col">
        {/* Typewriter */}
        <div className="mb-6 text-lg md:text-xl font-semibold text-gray-800">
          <Typer
            phrases={["A little about Matt", "Forever a learner"]}
            speed={100}
            deleteSpeed={50}
            displayTime={2000}
          />
        </div>

        {/* Professional Summary */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Summary</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
             I am a software engineer with strong expertise in JavaScript, Node.js, Express.js, PostgreSQL, SQL, Python, Django, and Java. I have extensive experience in front-end technologies, including React.js, HTML5, and CSS3, and utilize AutoHotkey scripting for workflow automation. With a focus on building impactful, tech-driven solutions, I thrive in dynamic environments, leveraging my technical skills to contribute to innovative projects and deliver results.
          </p>
        </div>
        <a
            href="/Matt_Feliciano.pdf" 
            download="Matt_Feliciano_Resume.pdf" 
            className="relative mt-4  px-6 py-2 text-black font-semibold border border-black max-w-32 group"
            >
            <span
                className="absolute inset-0 w-0 bg-black transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
            ></span>
            <span className="relative group-hover:text-white">Download Resume</span>
        </a>
      </div>
    </div>
    
  );
};

export default AbMe;
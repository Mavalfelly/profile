const Land = () => {
  return (
    <>
      <div id="landing-page" className="min-h-screen flex items-center justify-center mt-60">
        <div id="landing-container" className="text-center">
          <h1 id="heading-1" className="text-white text-5xl font-bold">
            Hello, I'm <span className="text-gray-300 pl-1">Matt.</span>
          </h1>

          <p id="heading-2" className="text-white text-2xl mt-4">
            I'm a<span id="sketch-highlight" className="text-gray-300 pl-1">software engineer.</span>
          </p>

          <a
            href="#section-projects"
            id="link"
            className="mt-8 inline-block px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition duration-300"
          >
            View my Work
          </a>
        </div>
      </div>
    </>
  );
};

export default Land;

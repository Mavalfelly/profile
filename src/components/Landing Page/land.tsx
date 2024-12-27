const Land = () => {
  return (
    <div id="landing-page" className="min-h-screen flex items-center justify-center mt-20 md:mt-60 px-4">
      <div id="landing-container" className="text-center">
        <h1 id="heading-1" className="text-white text-3xl md:text-5xl font-bold">
          Hello, I'm <span className="text-yellow-300">Matthew.</span>
        </h1>

        <p id="heading-2" className="text-white text-xl md:text-2xl mt-4">
          I'm a<span id="sketch-highlight" className="text-purple-400 pl-1">software engineer.</span>
        </p>

        <a
          href="#project-showcase"
          id="link"
          className="mt-8 inline-block px-4 md:px-6 py-2 md:py-3 border border-white text-white rounded hover:bg-white hover:text-black transition duration-300"
        >
          View my Work
        </a>
      </div>
    </div>
  );
};

export default Land;

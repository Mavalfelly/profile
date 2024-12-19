const Land = () => {
  return (
    <>
      <div id="landing-page">
        <div id="landing-container" >
          <h1 id="heading-1"className="flex justify-center">
            Hello, I'm <span className="pl-1">Matt.</span>
          </h1>

          <p id="heading-2" className="flex justify-center">
            I'm a<span id="sketch-highlight" className="pl-1">software engineer.</span>
          </p>
          <a
            href="#section-projects"
            id="link"
            className="flex justify-center"
          >
            View my Work
          </a>
        </div>
      </div>
    </>
 );
};

export default Land;
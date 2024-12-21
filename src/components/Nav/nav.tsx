const Nav = () => {
    return (
      <>
        <div className="flex justify-between bg-black text-white p-4 shadow-lg">
          {/* Logo */}
          <a
            href="#landing-page"
            className="pl-2 text-lg font-bold hover:text-gray-300 transition duration-300"
          >
            MJF
          </a>
  
          {/* Navigation Links */}
          <div id="r" className="flex space-x-6">
            <a
              href="#about_me"
              className="relative group"
            >
              <span className="hover:text-gray-300 transition duration-300">
                About Me
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#view_work"
              className="relative group"
            >
              <span className="hover:text-gray-300 transition duration-300">
                View My Work
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact_me"
              className="relative group"
            >
              <span className="hover:text-gray-300 transition duration-300">
                Contact Me
              </span>
              <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>
      </>
    );
  };
  
  export default Nav;
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row justify-between bg-black text-white p-4 shadow-lg">
      {/* Logo */}
      <div className="flex justify-between items-center">
        <a
          href="#landing-page"
          className="pl-2 text-lg font-bold hover:text-gray-300 transition duration-300"
        >
          MJF
        </a>
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0`}>
        <a href="#about_me" className="relative group">
          <span className="hover:text-gray-300 transition duration-300">About Me</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#project-showcase" className="relative group">
          <span className="hover:text-gray-300 transition duration-300">View My Work</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="#contact_me" className="relative group">
          <span className="hover:text-gray-300 transition duration-300">Contact Me</span>
          <span className="absolute left-0 -bottom-1 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>
    </div>
  );
};
  
export default Nav;
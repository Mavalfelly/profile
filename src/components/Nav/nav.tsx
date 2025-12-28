import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrolled(scrollTop > 50);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-black'
    }`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-lime-500 to-green-500 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <div className="flex flex-col md:flex-row justify-between items-center text-white p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <a
            href="#landing-page"
            className="pl-2 text-2xl font-bold hover:text-lime-400 transition duration-300"
          >
            MJF
          </a>
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0 w-full md:w-auto`}>
          {[
            { href: "#about_me", label: "About" },
            { href: "#career_history", label: "Experience" },
            { href: "#project-showcase", label: "Projects" },
            { href: "#obj", label: "Objectives" },
            { href: "#contact_me", label: "Contact" }
          ].map((item) => (
            <a 
              key={item.href}
              href={item.href} 
              className="relative group px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="hover:text-lime-400 transition duration-300">{item.label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-lime-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
  
export default Nav;
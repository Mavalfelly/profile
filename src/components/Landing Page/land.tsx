import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Land = () => {
  return (
    <div id="landing-page" className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Heading with Animation */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500">Matthew</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-2">
            Software Engineer
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Specializing in DevOps, Cloud Infrastructure, and Full-Stack Development
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://github.com/mavalfelly"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="GitHub Profile"
          >
            <Github className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/matthew-feliciano-4621a5201/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-6 h-6 text-white" />
          </a>
          <a
            href="mailto:mattfelly@gmail.com"
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-6 h-6 text-white" />
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#project-showcase"
            className="group relative px-8 py-4 bg-gradient-to-r from-lime-500 to-green-500 text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all duration-300 hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact_me"
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce mt-8">
          <a href="#about_me" className="inline-block text-gray-400 hover:text-white transition-colors">
            <ArrowDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Land;

import { useState } from "react";
import "./projects.css";
import { ExternalLink, Github, ChevronLeft, ChevronRight, X } from "lucide-react";
import AnimatedSection from '../AnimatedSection/AnimatedSection';

const projects = [
  {
    title: "Don's Asian Cuisine",
    photos: [
      "/Dons/Condit menu.png",
      "/Dons/Contact.png",
      "/Dons/Homepage.png",
      "/Dons/Menu.png",
    ],
    description: "In a collaborative team setting, I contributed to the development of a fullstack restaurant website utilizing React for the front end, Node.js and Express for the back end, Multer for file uploads, Email.js for email functionality, and Tailwind CSS for responsive and modern styling",
    github: "https://github.com/seannxh/DACFEWEBSITE",
    liveSite: "https://ferestraunt.onrender.com/home",
    tags: ["React", "Node.js", "Express", "Tailwind", "Email.js"],
  },
  {
    title: "Task Flow",
    photos: [
      "/Todo/Landing.png",
      "/Todo/info.png",
      "/Todo/Dashboard.png",
      "/Todo/List Dash.png",
    ],
    description: "I developed a TodoApp with a Django back-end and React front-end, enabling seamless task management. The app features task creation, updating, and deletion, with real-time updates handled by React. JWT (JSON Web Token) authentication was integrated to ensure secure user login and access control, allowing users to securely interact with their tasks.",
    github: "https://github.com/Mavalfelly/Todo-Front",
    liveSite: "https://todo-front-vgl6.onrender.com/",
    tags: ["React", "Django", "Python", "JWT", "PostgreSQL"],
  },
  {
    title: "College Tax and Retirement Strategies",
    photos: [
      "/ctrs/landing.png",
      "/ctrs/drop.png",
      "/ctrs/res.png",
      "/ctrs/cont.png",
    ],
    description: "CTRS.tax is a professional website I built for a local tax firm, designed to streamline client interactions and provide essential tax-related services. The site features a clean, user-friendly interface, ensuring easy navigation for clients seeking tax assistance. With a focus on performance and security, I integrated modern web technologies to deliver a seamless and efficient experience.",
    github: "https://github.com/Mavalfelly/CTRS_live",
    liveSite: "https://ctrs.tax",
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
  },
];


const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleNextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    setActivePhoto(0);
  };

  const handlePrevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    setActivePhoto(0);
  };

  const handleNextPhoto = () => {
    setActivePhoto((prev) => (prev + 1) % projects[currentProject].photos.length);
  };

  const handlePrevPhoto = () => {
    setActivePhoto((prev) =>
      (prev - 1 + projects[currentProject].photos.length) %
      projects[currentProject].photos.length
    );
  };

  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage("");
    document.body.style.overflow = 'unset';
  };

  const { title, photos, description, github, liveSite, tags } = projects[currentProject];

  return (
    <>
      <AnimatedSection animation="fade-up">
      <div className="w-full pt-24 pb-8 bg-custom-bg">
        <h2 className="text-5xl font-bold text-center text-cust-green mb-4">Featured Projects</h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto px-4">
          A showcase of my recent work in web development and software engineering
        </p>
      </div>
      </AnimatedSection>
      <AnimatedSection animation="scale" delay={0.2}>
      <div className="project-showcase" id="project-showcase">
        <div className="project-carousel">
          <button 
            className="carousel-nav prev group" 
            onClick={handlePrevProject}
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          
          <div className="project-card">
            <div className="flex justify-between items-start mb-4">
              <h3 className="project-title">{title}</h3>
              <div className="flex gap-2">
                <span className="text-sm text-gray-500">
                  {currentProject + 1} / {projects.length}
                </span>
              </div>
            </div>
            
            <div className="photo-carousel">
              <button 
                className="photo-nav prev" 
                onClick={handlePrevPhoto}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <img
                src={photos[activePhoto]}
                alt={`${title} Screenshot ${activePhoto + 1}`}
                className="project-photo cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => openModal(photos[activePhoto])}
              />
              <button 
                className="photo-nav next" 
                onClick={handleNextPhoto}
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-2 flex-wrap mb-4 justify-center">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-lime-100 text-lime-800 text-sm rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="project-description">{description}</p>
            
            <div className="project-links">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link group"
              >
                <Github className="w-5 h-5 mr-2" />
                Source Code
              </a>
              <a
                href={liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link project-link-primary group"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Live
              </a>
            </div>
          </div>
          
          <button 
            className="carousel-nav next group" 
            onClick={handleNextProject}
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
      </AnimatedSection>

      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/75 transition-all"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={modalImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectShowcase;
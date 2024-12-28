import { useState } from "react";
import "./projects.css";

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
  },
  {
    title: "MineSweeper",
    photos: [
      "/minesweeper/game1 with flags.png",
      "/minesweeper/game2 lose.png",
      "/minesweeper/start.png",
      "/minesweeper/Win.png",
    ],
    description: "I developed a Minesweeper game in Java using a JFrame structure to create an interactive and visually engaging user interface. The game includes a difficulty selection screen, allowing players to customize their experience, and features dynamic mine placement and logic for revealing tiles. It delivers a classic Minesweeper experience with responsive gameplay and clean design.",
    github: "https://github.com/Mavalfelly/MineSweeper",
    liveSite: "https://github.com/Mavalfelly/MineSweeper",
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
    document.body.style.overflow = 'unset';
  };

  const { title, photos, description, github, liveSite } = projects[currentProject];

  return (
    <>
      <div className="w-full pt-24 bg-custom-bg">
        <h2 className="text-4xl font-bold text-center text-cust-green ">MY PROJECTS</h2>
      </div>
      <div className="project-showcase" id="project-showcase">
        <div className="project-carousel">
          <button className="carousel-nav prev" onClick={handlePrevProject}>
            ◀
          </button>
          <div className="project-card">
            <h3 className="project-title">{title}</h3>
            <div className="photo-carousel">
              <button className="photo-nav prev" onClick={handlePrevPhoto}>
                ◀
              </button>
              <img
                src={photos[activePhoto]}
                alt={`${title} Photo ${activePhoto + 1}`}
                className="project-photo cursor-pointer"
                onClick={() => openModal(photos[activePhoto])}
              />
              <button className="photo-nav next" onClick={handleNextPhoto}>
                ▶
              </button>
            </div>
            <p className="project-description">{description}</p>
            <div className="project-links">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                GitHub Repo
              </a>
              <a
                href={liveSite}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                Live Site
              </a>
            </div>
          </div>
          <button className="carousel-nav next" onClick={handleNextProject}>
            ▶
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
              onClick={closeModal}
            >
              ✕
            </button>
            <img
              src={modalImage}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectShowcase;
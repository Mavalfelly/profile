import React, { useState } from "react";
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
    description: "In a collaborative team setting, I contributed to the development of a restaurant website utilizing React for the front end, Node.js and Express for the back end, Multer for file uploads, Email.js for email functionality, and Tailwind CSS for responsive and modern styling",
    github: "https://github.com/seannxh/DACFEWEBSITE",
    liveSite: "https://ferestraunt.onrender.com/home",
  },
  {
    title: "Project Two",
    photos: [
      "/path/to/photo5.jpg",
      "/path/to/photo6.jpg",
      "/path/to/photo7.jpg",
      "/path/to/photo8.jpg",
    ],
    description: "A brief description of Project Two. Highlight key features and functionality here.",
    github: "https://github.com/username/project-two",
    liveSite: "https://project-two.example.com",
  },
  {
    title: "Project Three",
    photos: [
      "/path/to/photo9.jpg",
      "/path/to/photo10.jpg",
      "/path/to/photo11.jpg",
      "/path/to/photo12.jpg",
    ],
    description: "A brief description of Project Three. Highlight key features and functionality here.",
    github: "https://github.com/username/project-three",
    liveSite: "https://project-three.example.com",
  },
];

const ProjectShowcase = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);

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

  const { title, photos, description, github, liveSite } = projects[currentProject];

  return (
    <div className="project-showcase">
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
              className="project-photo"
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
  );
};

export default ProjectShowcase;

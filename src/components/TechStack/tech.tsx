import '../TechStack/scrol.css';

const TechScroller = () => {
  const technologies = [
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "TailwindCSS",
    "Bulma",
    "PostgreSQL",
    "Python",
    "Django",
    "Java",
    "Git",
    "GitHub",
    "TypeScript",
    "HTML5",
    "CSS3",
    "JQuery",
  ];
  const techList = [...technologies, ...technologies, ...technologies];

  return (
    <div className="tech-scroller-container">
      <div className="tech-scroller">
        {techList.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="tech-item"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechScroller;

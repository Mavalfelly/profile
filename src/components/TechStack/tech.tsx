import '../TechStack/scrol.css';

const TechScroller = () => {
  const technologies = [
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "TailwindCSS",
    "Kubernetes",
    "Azure DevOps",
    "Docker",
    "GitHub",
    "Argo",
    "Python",
    "Terraform",
    "Spacelift",
    "AWS",
    "Java",
    "Spring Boot",
    "Power Automate",
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

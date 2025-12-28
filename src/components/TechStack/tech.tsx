import '../TechStack/scrol.css';
import { 
  SiJavascript, SiReact, SiNodedotjs, SiPostgresql, SiTailwindcss, 
  SiKubernetes, SiDocker, SiGithub, SiPython, 
  SiTerraform, SiAmazon, SiSpring,
  SiMongodb, SiArgo
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscAzureDevops, VscAzure } from 'react-icons/vsc';

const TechScroller = () => {
  const technologies = [
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Azure DevOps", icon: VscAzureDevops, color: "#0078D7" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
    { name: "AWS", icon: SiAmazon, color: "#FF9900" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Java", icon: FaJava, color: "#007396" },
    { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "GitHub", icon: SiGithub, color: "#181717" },
    { name: "Argo", icon: SiArgo, color: "#EF7B4D" },
    { name: "Azure", icon: VscAzure, color: "#0089D6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  ];
  
  const techList = [...technologies, ...technologies, ...technologies];

  return (
    <div className="tech-scroller-container">
      <div className="tech-scroller">
        {techList.map((tech, index) => {
          const IconComponent = tech.icon;
          return (
            <div
              key={`${tech.name}-${index}`}
              className="tech-item group"
            >
              <IconComponent 
                className="tech-icon" 
                style={{ color: tech.color }}
              />
              <span className="tech-name">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechScroller;

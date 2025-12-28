import Typer from "../Typer/typer";
import { Code2, Cloud, Briefcase, Award } from "lucide-react";

const AbMe = () => {
  const skills = [
    { name: "Azure DevOps & CI/CD", level: 95 },
    { name: "Kubernetes & Docker", level: 90 },
    { name: "AWS & Terraform", level: 90 },
    { name: "Custom Automation & Tooling", level: 90 },
    { name: "Python & Shell Scripting", level: 85 },
    { name: "JavaScript/TypeScript & Java", level: 80 },
  ];

  const stats = [
    { icon: Code2, value: "70+", label: "Repos Migrated" },
    { icon: Cloud, value: "3+", label: "Years DevOps" },
    { icon: Briefcase, value: "Custom", label: "Renovate Pipeline" },
    { icon: Award, value: "AWS/IaC", label: "Expertise" },
  ];

  return (
    <div id="about_me" className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/Matt.jpg"
              alt="Matthew Feliciano"
              className="rounded-full w-40 h-40 object-cover shadow-lg mb-4 ring-4 ring-lime-400"
            />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Matthew Feliciano</h2>
              <p className="text-xl text-lime-600 font-bold mb-2">DevOps Engineer</p>
              <div className="text-md text-gray-600 font-medium">
                <Typer
                  phrases={["Systems Engineer", "Migration Specialist", "Automation Engineer", "Infrastructure Expert"]}
                  speed={100}
                  deleteSpeed={50}
                  displayTime={2500}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-lime-50 transition-colors">
                  <IconComponent className="w-8 h-8 mx-auto mb-2 text-lime-600" />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold text-gray-900">DevOps Engineer specializing in large-scale infrastructure automation and system migrations.</span> I successfully orchestrated a complete Spring framework migration across 70+ repositories, ensuring seamless transitions and minimal downtime across the entire microservices ecosystem.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              I design and build custom automation solutions, including developing a custom Renovate bot Docker image and CI/CD pipeline for managing dependency updates across internal repositories. My expertise spans infrastructure as code with Terraform, container orchestration with Kubernetes and Docker, and building robust deployment pipelines in Azure DevOps.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With extensive AWS experience and a strong foundation in software development (JavaScript, Python, Java), I create scalable infrastructure solutions and automated workflows that enhance reliability, reduce deployment time, and maintain high system availability across cloud environments.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <span className="text-sm font-medium text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-lime-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbMe;
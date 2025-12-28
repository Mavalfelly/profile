import Typer from "../Typer/typer";
import { Code2, Cloud, Briefcase, Award } from "lucide-react";

const AbMe = () => {
  const skills = [
    { name: "JavaScript/TypeScript", level: 90 },
    { name: "React & Node.js", level: 85 },
    { name: "Python & Java", level: 80 },
    { name: "Kubernetes & Docker", level: 85 },
    { name: "AWS & Azure", level: 75 },
    { name: "CI/CD & DevOps", level: 80 },
  ];

  const stats = [
    { icon: Code2, value: "3+", label: "Years Coding" },
    { icon: Briefcase, value: "10+", label: "Projects Completed" },
    { icon: Cloud, value: "5+", label: "Cloud Platforms" },
    { icon: Award, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <div id="about_me" className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Profile */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/Matt.jpg"
              alt="Matthew Feliciano"
              className="rounded-full w-40 h-40 object-cover shadow-lg mb-4 ring-4 ring-lime-400"
            />
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Matthew Feliciano</h2>
              <div className="text-lg text-lime-600 font-semibold mb-4">
                <Typer
                  phrases={["Software Engineer", "DevOps Specialist", "Full-Stack Developer", "Cloud Architect"]}
                  speed={100}
                  deleteSpeed={50}
                  displayTime={2500}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
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

        {/* Right Column - About & Skills */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">About Me</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              I am a software engineer with a strong foundation in full-stack development and currently specialize in DevOps and Infrastructure. Utilizing my expertise in JavaScript, React, Python, and Java, I have built scalable applications using MongoDB, SQL, and TailwindCSS.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My transition into DevOps has expanded my skill set to include Kubernetes, Azure DevOps, Docker, Terraform, Spacelift, and AWS, where I focus on automating deployments, optimizing cloud infrastructure, and enhancing CI/CD pipelines.
            </p>
          </div>

          {/* Skills */}
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
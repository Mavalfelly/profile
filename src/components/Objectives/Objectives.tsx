import './obj.css';

const ObjectivesSection = () => {
  const objectives = [
    {
      icon: "🚀",
      title: "Technical Excellence",
      description: "Master full-stack development practices and stay current with modern frameworks and tools, while building a strong foundation in computer science fundamentals."
    },
    {
      icon: "🧠",
      title: "Continuous Learning",
      description: "Develop expertise in cloud architecture and DevOps practices, while actively contributing to open-source projects to expand knowledge and give back to the community."
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Enhance communication skills and become an effective team player who can mentor junior developers and collaborate seamlessly with cross-functional teams."
    },
    {
      icon: "⚡",
      title: "Project Impact",
      description: "Lead the development of significant features that directly impact user experience and business objectives, while maintaining high standards for code quality."
    },
    {
      icon: "🔄",
      title: "Best Practices",
      description: "Implement and advocate for software development best practices, including test-driven development, code reviews, and continuous integration/deployment."
    },
    {
      icon: "🛡️",
      title: "Security Focus",
      description: "Develop expertise in application security and write secure code, ensuring protection of user data and system integrity in all projects."
    }
  ];

  return (
    <div className="w-full bg-custom-bg py-16 px-4" id='obj'>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cust-green mb-12">
          Career Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => (
            <div 
              key={index}
              className="objectives-card bg-white p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-4 text-2xl">
                  {objective.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {objective.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {objective.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ObjectivesSection;
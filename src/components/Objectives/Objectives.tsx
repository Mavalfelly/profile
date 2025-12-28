import './obj.css';
import { Rocket, Brain, Users, Zap, RefreshCw, Shield } from 'lucide-react';
import AnimatedSection from '../AnimatedSection/AnimatedSection';

const ObjectivesSection = () => {
  const objectives = [
    {
      icon: Rocket,
      title: "Technical Excellence",
      description: "Aim to become a proficient full-stack developer with a strong focus on cloud technologies, DevOps practices, and modern web development frameworks."
    },
    {
      icon: Brain,
      title: "Continuous Learning",
      description: "Commit to lifelong learning and staying updated with the latest industry trends, tools, and technologies to enhance technical skills and knowledge."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Enhance communication skills and become an effective team player who can mentor junior developers and collaborate seamlessly with cross-functional teams."
    },
    {
      icon: Zap,
      title: "Project Impact",
      description: "Lead the development of significant features that directly impact user experience and business objectives, while maintaining high standards for code quality."
    },
    {
      icon: RefreshCw,
      title: "Best Practices",
      description: "Implement and advocate for software development best practices, including test-driven development, code reviews, and continuous integration/deployment."
    },
    {
      icon: Shield,
      title: "Security Focus",
      description: "Develop expertise in application security and write secure code, ensuring protection of user data and system integrity in all projects."
    }
  ];

  return (
    <div className="w-full bg-custom-bg py-16 px-4" id='obj'>
      <AnimatedSection animation="fade-up">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-cust-green mb-12">
          Career Objectives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((objective, index) => {
            const IconComponent = objective.icon;
            return (
              <div 
                key={index}
                className="objectives-card bg-white p-6 rounded-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-lime-100 rounded-lg mr-4">
                    <IconComponent className="w-6 h-6 text-lime-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {objective.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {objective.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      </AnimatedSection>
    </div>
  );
};

export default ObjectivesSection;
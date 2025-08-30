import React from 'react';
import { skills } from '../data/portfolioData';

const Skills = () => {
  const techLogos = {
    'HTML': {
      icon: '🌐',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    'CSS': {
      icon: '🎨',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    'JavaScript': {
      icon: '⚡',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10'
    },
    'React.js': {
      icon: '⚛️',
      color: 'text-cyan-500',
      bg: 'bg-cyan-500/10'
    }
  };

  const additionalSkills = [
    { name: 'Git & GitHub', level: 80, icon: '🔧', color: 'text-gray-400' },
    { name: 'Responsive Design', level: 85, icon: '📱', color: 'text-green-400' },
    { name: 'Problem Solving', level: 90, icon: '🧩', color: 'text-purple-400' },
    { name: 'Team Leadership', level: 85, icon: '👥', color: 'text-blue-400' }
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical expertise and professional capabilities
            </p>
          </div>

          {/* Technical Skills */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Technical Skills</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => {
                const techInfo = techLogos[skill.name];
                return (
                  <div
                    key={index}
                    className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <div className={`w-16 h-16 ${techInfo.bg} rounded-full flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      {techInfo.icon}
                    </div>
                    <h4 className={`text-lg font-semibold ${techInfo.color} text-center mb-3`}>
                      {skill.name}
                    </h4>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-center text-sm">{skill.level}% Proficiency</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Skills */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Additional Skills</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {additionalSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-gray-900/30 p-6 rounded-xl border border-gray-700 hover:bg-gray-800/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{skill.icon}</span>
                      <span className={`text-lg font-medium ${skill.color}`}>{skill.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Chart Visualization */}
          <div className="bg-gray-900/30 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Skills Overview</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="rgb(55, 65, 81)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${skill.level * 2.51} 251`}
                        className="transition-all duration-1000 ease-out"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{skill.level}%</span>
                    </div>
                  </div>
                  <p className="text-gray-300 font-medium">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
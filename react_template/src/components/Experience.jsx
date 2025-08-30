import React from 'react';
import { experience, stats } from '../data/portfolioData';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Professional journey through internships, contributions, and achievements
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-xl border border-blue-500/30 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2">{stats.internships}</div>
              <div className="text-gray-300 font-medium">Internships</div>
              <div className="text-gray-400 text-sm mt-1">Completed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-xl border border-purple-500/30 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2">{stats.hackathons}</div>
              <div className="text-gray-300 font-medium">Hackathon</div>
              <div className="text-gray-400 text-sm mt-1">Attended</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-xl border border-green-500/30 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">{stats.projects}</div>
              <div className="text-gray-300 font-medium">Projects</div>
              <div className="text-gray-400 text-sm mt-1">Built</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-6 rounded-xl border border-orange-500/30 text-center">
              <div className="text-3xl lg:text-4xl font-bold text-orange-400 mb-2">{stats.contributions}+</div>
              <div className="text-gray-300 font-medium">Open Source</div>
              <div className="text-gray-400 text-sm mt-1">Contributions</div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Professional Timeline</h3>
            
            {/* Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-gray-900 z-10"></div>

                  {/* Content Card */}
                  <div className={`ml-20 lg:ml-0 lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.type === 'Internship' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {exp.type}
                        </span>
                        <span className="text-gray-400 text-sm">{exp.duration}</span>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {exp.title}
                      </h4>
                      
                      <p className="text-blue-400 font-medium mb-3">{exp.company}</p>
                      
                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                      {/* Experience Type Icon */}
                      <div className="mt-4 flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          exp.type === 'Internship' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {exp.type === 'Internship' ? '💼' : '🚀'}
                        </div>
                        <span className="ml-2 text-gray-400 text-sm font-medium">
                          {exp.type === 'Internship' ? 'Professional Experience' : 'Open Source Contribution'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Gained */}
          <div className="mt-16 bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">Skills & Achievements Gained</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                  🎨
                </div>
                <h4 className="text-white font-medium mb-2">Graphic Design</h4>
                <p className="text-gray-400 text-sm">Visual content creation and brand design through NGO internships</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                  👥
                </div>
                <h4 className="text-white font-medium mb-2">Team Collaboration</h4>
                <p className="text-gray-400 text-sm">Working with diverse teams in open-source and social impact projects</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">
                  🏆
                </div>
                <h4 className="text-white font-medium mb-2">Leadership</h4>
                <p className="text-gray-400 text-sm">NCC cadet training and project management experience</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Interested in working together?</p>
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
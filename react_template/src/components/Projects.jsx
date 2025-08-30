import React from 'react';
import { projects } from '../data/portfolioData';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Showcasing innovative solutions and technical implementations across various domains
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">
                      {project.category === 'Web Development' ? '🌐' : '🏛️'}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.category === 'Web Development' 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-gray-900/80 text-gray-300 rounded-full text-xs font-medium">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'Completed' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs hover:bg-gray-700 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300 text-sm font-medium">
                      Live Demo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Project Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                🌐
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Web Development</h3>
              <p className="text-gray-400 text-sm mb-3">Full-stack web applications with modern frameworks</p>
              <div className="text-2xl font-bold text-blue-400">1</div>
              <div className="text-gray-400 text-xs">Project</div>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                🏛️
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Full Stack</h3>
              <p className="text-gray-400 text-sm mb-3">Complete solutions with frontend and backend</p>
              <div className="text-2xl font-bold text-purple-400">1</div>
              <div className="text-gray-400 text-xs">Project</div>
            </div>

            <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                🚀
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm mb-3">Creative solutions for real-world problems</p>
              <div className="text-2xl font-bold text-green-400">2</div>
              <div className="text-gray-400 text-xs">Projects</div>
            </div>
          </div>

          {/* Development Process */}
          <div className="bg-gray-900/30 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">My Development Process</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  💡
                </div>
                <h4 className="text-white font-medium mb-2">Ideation</h4>
                <p className="text-gray-400 text-sm">Identifying problems and brainstorming innovative solutions</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  📋
                </div>
                <h4 className="text-white font-medium mb-2">Planning</h4>
                <p className="text-gray-400 text-sm">Creating detailed project roadmaps and technical specifications</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  ⚡
                </div>
                <h4 className="text-white font-medium mb-2">Development</h4>
                <p className="text-gray-400 text-sm">Building with clean, efficient, and scalable code</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  🚀
                </div>
                <h4 className="text-white font-medium mb-2">Deployment</h4>
                <p className="text-gray-400 text-sm">Testing, optimization, and launching to production</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Want to see more of my work or collaborate on a project?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Rajagarwal632"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View GitHub
              </a>
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
              >
                Start a Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
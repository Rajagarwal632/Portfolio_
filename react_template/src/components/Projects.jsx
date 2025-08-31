import React from 'react';
import { projects } from '../data/portfolioData';
import { SectionTransition } from './SectionTransition';
import { motion } from 'framer-motion';

const Projects = () => {
  // Animation variants for projects
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    }
  };

  return (
    <SectionTransition>
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
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id} 
                  className="group relative bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col"
                  variants={item}
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
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
                        project.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      {/* Technologies Used */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-1 bg-gray-800/50 text-xs text-gray-300 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-800">
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-center px-3 py-2 border-2 border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        View Code
                      </a>
                      {project.demo ? (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full text-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          Live Demo
                        </a>
                      ) : (
                        <div className="w-full"></div> // Empty div to maintain grid layout
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              className="text-center mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Have a project in mind?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                I'm always open to discussing product design work or partnership opportunities.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
              >
                Start a Project
              </motion.button>
            </motion.div>

            {/* Development Process */}
            <motion.div 
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6 }
              }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-3">
                    Development Workflow
                  </h3>
                  <p className="text-gray-400">A structured approach to turning ideas into reality</p>
                </div>
                
                <div className="relative">
                  {/* Timeline line */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent"></div>
                  
                  <motion.div 
                    className="grid md:grid-cols-2 gap-8 relative z-10"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {[
                      {
                        icon: '💡',
                        title: 'Ideation',
                        desc: 'Transforming concepts into actionable plans through collaborative brainstorming',
                        color: 'from-blue-500/10 to-blue-600/5',
                        border: 'border-blue-500/20',
                        iconBg: 'bg-blue-500/20',
                        iconColor: 'text-blue-400'
                      },
                      {
                        icon: '📋',
                        title: 'Planning',
                        desc: 'Crafting detailed roadmaps and technical specifications',
                        color: 'from-purple-500/10 to-purple-600/5',
                        border: 'border-purple-500/20',
                        iconBg: 'bg-purple-500/20',
                        iconColor: 'text-purple-400',
                        dir: 'md:flex-row-reverse md:text-right'
                      },
                      {
                        icon: '⚡',
                        title: 'Development',
                        desc: 'Building robust solutions with clean, efficient code',
                        color: 'from-green-500/10 to-green-600/5',
                        border: 'border-green-500/20',
                        iconBg: 'bg-green-500/20',
                        iconColor: 'text-green-400'
                      },
                      {
                        icon: '🚀',
                        title: 'Deployment',
                        desc: 'Testing, optimizing, and launching to production',
                        color: 'from-orange-500/10 to-orange-600/5',
                        border: 'border-orange-500/20',
                        iconBg: 'bg-orange-500/20',
                        iconColor: 'text-orange-400',
                        dir: 'md:flex-row-reverse md:text-right'
                      }
                    ].map((step, index) => (
                      <motion.div 
                        key={index}
                        variants={item}
                        className={`flex items-start gap-4 p-6 rounded-xl border ${step.border} bg-gradient-to-br ${step.color} hover:scale-[1.02] transition-all duration-300 group ${step.dir || ''}`}
                      >
                        <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform ${step.iconColor}`}>
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{step.title}</h4>
                          <p className="text-gray-400 text-sm">{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12">
                <p className="text-gray-400 mb-6">Want to see more of my work or collaborate on a project?</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/Rajagarwal632"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  >
                    View GitHub
                  </motion.a>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-3 border-2 border-gray-600 text-white font-semibold rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                  >
                    Start a Project
                  </motion.button>
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
    </SectionTransition>
  );
};

export default Projects;
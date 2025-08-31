import React from 'react';
import { SectionTransition } from './SectionTransition';
import { motion } from 'framer-motion';

const Skills = () => {
  const techStacks = [
    {
      name: 'React.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'JavaScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'C++',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'C',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      name: 'MongoDB',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      color: 'from-green-500 to-green-700'
    },
    {
      name: 'Express.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      color: 'from-gray-400 to-gray-600'
    },
    {
      name: 'Git',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: 'from-orange-500 to-red-600'
    },
  ];

  // Animation variants for skills
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
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
      <section id="skills" className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                What I <span className="text-blue-400">Bring to the Table</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A comprehensive overview of my technical expertise and professional capabilities
              </p>
            </div>

            {/* Tech Stack Cards */}
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {techStacks.map((tech, index) => (
                <motion.div 
                  key={index} 
                  className="relative group bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 overflow-hidden cursor-pointer"
                  variants={item}
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Water Fill Animation */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-t ${tech.color} opacity-0 group-hover:opacity-20 transition-all duration-700 ease-out transform translate-y-full group-hover:translate-y-0`}
                  ></motion.div>
                  
                  {/* Tech Logo */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={tech.logo} 
                        alt={tech.name}
                        className="w-full h-full object-contain filter group-hover:drop-shadow-lg transition-all duration-300"
                        style={{
                          filter: tech.name === 'Express.js' ? 'invert(1)' : tech.invert === false ? 'none' : 'none'
                        }}
                      />
                    </div>
                    <h3 className="text-white font-medium text-center">{tech.name}</h3>
                  </div>

                  {/* Ripple Effect */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tech.color} opacity-10 animate-pulse`}></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </SectionTransition>
  );
};

export default Skills;
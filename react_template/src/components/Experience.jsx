import React, { useEffect, useRef, useState } from 'react';
import { experience, stats } from '../data/portfolioData';
import { SectionTransition } from './SectionTransition';
import { FiBriefcase, FiGithub } from 'react-icons/fi';

const Experience = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add a threshold to prevent jittery behavior
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        if (currentScrollY > lastScrollY) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
        setLastScrollY(currentScrollY);
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [lastScrollY]);

  return (
    <SectionTransition>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="relative bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-xl border border-blue-500/30 text-center group overflow-hidden cursor-pointer hover:border-blue-400/50 transition-all duration-500">
              {/* Water Fill Animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-y-full group-hover:translate-y-0"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.internships}</div>
                <div className="text-gray-300 font-medium group-hover:text-blue-300 transition-colors">Internships</div>
                <div className="text-gray-400 text-sm mt-1">Completed</div>
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/10 to-blue-600/10 animate-pulse"></div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-purple-500/20 to-purple-600/20 p-6 rounded-xl border border-purple-500/30 text-center group overflow-hidden cursor-pointer hover:border-purple-400/50 transition-all duration-500">
              {/* Water Fill Animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-y-full group-hover:translate-y-0"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.hackathons}</div>
                <div className="text-gray-300 font-medium group-hover:text-purple-300 transition-colors">Hackathon</div>
                <div className="text-gray-400 text-sm mt-1">Attended</div>
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/10 to-purple-600/10 animate-pulse"></div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-green-500/20 to-green-600/20 p-6 rounded-xl border border-green-500/30 text-center group overflow-hidden cursor-pointer hover:border-green-400/50 transition-all duration-500">
              {/* Water Fill Animation */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-y-full group-hover:translate-y-0"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">{stats.projects}</div>
                <div className="text-gray-300 font-medium group-hover:text-green-300 transition-colors">Projects</div>
                <div className="text-gray-400 text-sm mt-1">Built</div>
              </div>
              
              {/* Ripple Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-green-600/10 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            <h3 className="text-2xl font-semibold text-white mb-8 text-center">Professional Timeline</h3>
            
            {/* Scroll-Responsive Timeline Line */}
            <div className="absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-1 h-full bg-gray-700 rounded-full">
              <div 
                className={`w-full bg-gradient-to-b from-blue-400 via-purple-500 to-pink-600 transition-all duration-800 ease-out rounded-full ${
                  scrollDirection === 'down' 
                    ? 'opacity-100 scale-100 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
                    : 'opacity-40 scale-95 shadow-[0_0_8px_rgba(59,130,246,0.3)]'
                }`}
                style={{
                  height: `${(visibleItems.size / experience.length) * 100}%`
                }}
              ></div>
              {/* Blue-purple glow effect */}
              <div className={`absolute inset-0 w-full bg-gradient-to-b from-blue-400/30 via-purple-500/30 to-pink-600/30 rounded-full blur-sm transition-all duration-800 ${
                scrollDirection === 'down' ? 'opacity-100' : 'opacity-30'
              }`}></div>
            </div>

            <div className="space-y-12">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  ref={el => itemRefs.current[index] = el}
                  data-index={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } transition-all duration-700 ${
                    visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                >
                  {/* Simple Dot */}
                  <div className={`absolute left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-900 z-10 transition-all duration-500 flex items-center justify-center ${
                    visibleItems.has(index) 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-110 shadow-[0_0_15px_rgba(124,58,237,0.7)]' 
                      : 'bg-gray-400 scale-90'
                  } hover:scale-125 hover:shadow-[0_0_20px_rgba(124,58,237,0.9)] hover:z-20`}>
                    {/* Pulsing Ring Effect */}
                    <div className={`absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0 ${
                      visibleItems.has(index) ? 'group-hover:opacity-100' : ''
                    }`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`ml-20 lg:ml-0 lg:w-5/12 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                    <div className="relative bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden cursor-pointer">
                      {/* Water Fill Animation */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out transform translate-y-full group-hover:translate-y-0"></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
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
                      
                      <div className="flex items-center gap-3 mb-2">
                        {exp.title.includes('Graphic Design') && (
                          <img 
                            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg"
                            alt="Canva"
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <h4 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {exp.title}
                        </h4>
                      </div>
                      
                      <p className="text-blue-400 font-medium mb-3">{exp.company}</p>
                      
                      <p className="text-gray-300 leading-relaxed">{exp.description}</p>

                        {/* Experience Type with Logo */}
                        <div className="mt-4 flex items-center">
                          {exp.type === 'Internship' ? (
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                              <FiBriefcase className="text-blue-400 text-xl transition-all duration-300 group-hover:scale-110" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
                              <FiGithub className="text-purple-400 text-xl transition-all duration-300 group-hover:scale-110" />
                            </div>
                          )}
                          <div className="ml-3">
                            <div className="flex items-center">
                              {exp.type === 'Internship' ? (
                                <span className="text-gray-300 text-sm font-medium">Professional Experience</span>
                              ) : (
                                <span className="text-gray-300 text-sm font-medium">Open Source Contribution</span>
                              )}
                            </div>
                            <span className="text-gray-500 text-xs">
                              {exp.type === 'Internship' ? 'Design & Marketing' : 'Development & Collaboration'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Ripple Effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-600/5 animate-pulse"></div>
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
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img 
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" 
                    alt="Canva" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <h4 className="text-white font-medium mb-2">Graphic Design</h4>
                <p className="text-gray-400 text-sm">Visual content creation and brand design using Canva</p>
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
                  🎯
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
    </SectionTransition>
  );
};

export default Experience;
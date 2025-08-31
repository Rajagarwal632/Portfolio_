import React from 'react';
import { SectionTransition } from './SectionTransition';

const About = () => {
  return (
    <SectionTransition>
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              About <span className="text-blue-400">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Passionate about technology, leadership, and making a positive impact through code
            </p>
          </div>

          {/* Stylish Collage Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Main Bio Card - Spans 2 columns */}
            <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-gray-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105 group">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  RA
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">About Me</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm a Computer Science Engineering student passionate about web development and building impactful digital solutions. As an <span className="text-blue-400 font-semibold">NCC Cadet</span>, I bring discipline, leadership, and teamwork to every project. With experience in open-source (<span className="text-purple-400 font-semibold">GSSOC</span>), I thrive in collaborative environments and believe in continuous learning to stay ahead in tech.
                  </p>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group hover:transform hover:scale-105">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:bg-blue-500/30 transition-colors">
                  🎓
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Education</h3>
                <div className="text-blue-400 font-medium">Computer Science</div>
                <div className="text-gray-400 text-sm">Engineering Student</div>
                <div className="text-gray-500 text-xs mt-1">Heritage Institute of Technology</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 p-4 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-green-400">NCC</div>
                <div className="text-gray-400 text-xs">Air Wing Cadet</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-purple-400">2+</div>
                <div className="text-gray-400 text-xs">Internships</div>
              </div>
            </div>

            {/* Interests Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/5 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 group">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-xl mr-2">💡</span>
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Web Dev', 'Open Source', 'Leadership', 'UI/UX'].map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs hover:bg-purple-500/30 transition-colors cursor-default"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Values Card */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-600/5 p-6 rounded-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105 group">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="text-xl mr-2">⭐</span>
                Core Values
              </h3>
              <div className="space-y-2">
                {[
                  { text: 'Continuous Learning', color: 'blue' },
                  { text: 'Quality Focus', color: 'purple' },
                  { text: 'Team Collaboration', color: 'green' }
                ].map((value, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <span className={`w-2 h-2 bg-${value.color}-400 rounded-full mr-2`}></span>
                    <span className="text-gray-300">{value.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/5 p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105 group text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-lg font-semibold text-white mb-2">GSSOC</h3>
              <div className="text-yellow-400 font-medium text-sm">Open Source</div>
              <div className="text-gray-400 text-xs">Contributor</div>
            </div>

          </div>
        </div>
      </div>
    </section>
    </SectionTransition>
  );
};

export default About;
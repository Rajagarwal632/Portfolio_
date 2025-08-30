import React from 'react';

const About = () => {
  return (
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

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* About Content */}
            <div className="space-y-6">
              <div className="prose prose-lg text-gray-300">
                <p className="text-lg leading-relaxed">
                  I'm a dedicated Computer Science Engineering student with a passion for web development 
                  and creating innovative digital solutions. My journey in technology is driven by curiosity 
                  and a desire to solve real-world problems through code.
                </p>
                
                <p className="text-lg leading-relaxed">
                  As an <span className="text-blue-400 font-semibold">NCC Cadet</span>, I've developed 
                  strong leadership qualities, discipline, and teamwork skills that complement my technical 
                  abilities. This unique combination helps me approach projects with both technical precision 
                  and strategic thinking.
                </p>

                <p className="text-lg leading-relaxed">
                  I believe in continuous learning and actively contribute to the open-source community. 
                  My experience with <span className="text-purple-400 font-semibold">GSSOC</span> has 
                  taught me the value of collaborative development and knowledge sharing.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-blue-400 mb-1">CSE</div>
                  <div className="text-gray-400 text-sm">Core Student</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-green-400 mb-1">NCC</div>
                  <div className="text-gray-400 text-sm">Cadet</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-purple-400 mb-1">2+</div>
                  <div className="text-gray-400 text-sm">Internships</div>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <div className="text-2xl font-bold text-orange-400 mb-1">OSS</div>
                  <div className="text-gray-400 text-sm">Contributor</div>
                </div>
              </div>
            </div>

            {/* Education & Achievements */}
            <div className="space-y-8">
              {/* Education */}
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    🎓
                  </div>
                  Education
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-white font-medium">Computer Science Engineering</div>
                    <div className="text-blue-400">Core Student</div>
                    <div className="text-gray-400 text-sm">Currently Pursuing</div>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    💡
                  </div>
                  Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Web Development',
                    'Open Source',
                    'Leadership',
                    'Problem Solving',
                    'UI/UX Design',
                    'Team Collaboration'
                  ].map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm hover:bg-gray-600 transition-colors"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    ⭐
                  </div>
                  Core Values
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Continuous Learning & Growth
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Quality & Attention to Detail
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Collaboration & Teamwork
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Innovation & Creativity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
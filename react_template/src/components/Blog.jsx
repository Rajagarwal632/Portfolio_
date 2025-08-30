import React from 'react';
import { blogPosts } from '../data/portfolioData';

const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Blog</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sharing insights, experiences, and learnings from my development journey
            </p>
          </div>

          {/* Blog Posts Grid - Collage Style */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {blogPosts.map((post, index) => (
              <div
                key={post.id}
                className={`group bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                {/* Blog Post Image */}
                <div className={`relative bg-gradient-to-br from-blue-500/20 to-purple-600/20 overflow-hidden ${
                  index === 0 ? 'h-64 lg:h-80' : 'h-48'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`opacity-50 ${index === 0 ? 'text-8xl' : 'text-6xl'}`}>
                      {index === 0 ? '📝' : index === 1 ? '⚛️' : '🚀'}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.category === 'Personal' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : post.category === 'Technical'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-2 py-1 bg-gray-900/80 text-gray-300 rounded text-xs">
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Blog Post Content */}
                <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{post.date}</span>
                  </div>
                  
                  <h3 className={`font-semibold text-white group-hover:text-blue-400 transition-colors mb-3 ${
                    index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                  }`}>
                    {post.title}
                  </h3>
                  
                  <p className={`text-gray-400 leading-relaxed mb-4 ${
                    index === 0 ? 'text-base lg:text-lg' : 'text-sm'
                  }`}>
                    {post.excerpt}
                  </p>

                  <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center group">
                    Read More 
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Blog Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                📖
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Personal</h3>
              <p className="text-gray-400 text-sm mb-3">Journey, experiences, and personal growth</p>
              <div className="text-2xl font-bold text-green-400">1</div>
              <div className="text-gray-400 text-xs">Post</div>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                💻
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Technical</h3>
              <p className="text-gray-400 text-sm mb-3">Coding tutorials, tips, and best practices</p>
              <div className="text-2xl font-bold text-blue-400">1</div>
              <div className="text-gray-400 text-xs">Post</div>
            </div>

            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                🌟
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Experience</h3>
              <p className="text-gray-400 text-sm mb-3">Internships, projects, and career insights</p>
              <div className="text-2xl font-bold text-purple-400">1</div>
              <div className="text-gray-400 text-xs">Post</div>
            </div>
          </div>

          {/* Blog Features */}
          <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-white mb-6 text-center">What You'll Find Here</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  🎯
                </div>
                <h4 className="text-white font-medium mb-2">Learning Journey</h4>
                <p className="text-gray-400 text-sm">My progress in web development and new technologies</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  💡
                </div>
                <h4 className="text-white font-medium mb-2">Project Insights</h4>
                <p className="text-gray-400 text-sm">Behind-the-scenes of my development projects</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  🔧
                </div>
                <h4 className="text-white font-medium mb-2">Technical Tips</h4>
                <p className="text-gray-400 text-sm">Practical coding solutions and best practices</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  🚀
                </div>
                <h4 className="text-white font-medium mb-2">Career Growth</h4>
                <p className="text-gray-400 text-sm">Experiences from internships and open source</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Want to stay updated with my latest posts?</p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe to Updates
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
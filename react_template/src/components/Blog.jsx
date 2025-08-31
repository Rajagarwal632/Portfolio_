import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import BlogForm from './BlogForm';
import { FiEdit, FiTrash2, FiSearch, FiX, FiPlus, FiClock, FiCalendar } from 'react-icons/fi';

const Blog = () => {
  // Get blog context
  const { 
    posts = [], 
    deletePost, 
    setEditingPost, 
    setIsFormOpen,
    isFormOpen = false,
    isLoading = false,
    error = null
  } = useBlog();
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedPost, setExpandedPost] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get unique categories from posts
  const categories = ['All', ...new Set(posts.map(post => post?.category).filter(Boolean))];

  // Filter and sort posts based on search and category
  useEffect(() => {
    let result = [...posts];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(post => 
        post?.title?.toLowerCase().includes(term) || 
        post?.content?.toLowerCase().includes(term) ||
        post?.excerpt?.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      result = result.filter(post => post?.category === selectedCategory);
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    
    setFilteredPosts(result);
  }, [posts, searchTerm, selectedCategory]);

  // Handle post edit
  const handleEdit = (post) => {
    setEditingPost(post);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle delete confirmation
  const handleDelete = (id) => {
    setShowDeleteConfirm(id);
  };

  // Confirm and execute post deletion
  const confirmDelete = (id) => {
    deletePost(id);
    setShowDeleteConfirm(null);
    if (expandedPost === id) {
      setExpandedPost(null);
    }
  };

  // Toggle post expansion
  const toggleExpand = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  // Get category styling
  const getCategoryColor = (category) => {
    const colors = {
      Technical: 'bg-blue-100 text-blue-800',
      Personal: 'bg-green-100 text-green-800',
      Experience: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  // Get category emoji
  const getCategoryEmoji = (category) => {
    const emojis = {
      Technical: '💻',
      Personal: '👤',
      Experience: '🌟',
      default: '📄'
    };
    return emojis[category] || emojis.default;
  };

  // Format date string
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Error Loading Blog Posts</h2>
          <p className="text-gray-400">{error.message || 'An error occurred while loading the blog posts.'}</p>
        </div>
      </div>
    );
  }

  return (
    <section id="blog" className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              My <span className="text-blue-400">Blog</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6"></div>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sharing insights, experiences, and learnings from my development journey
            </p>
          </div>

          {/* Page Title + New Post */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
              <p className="text-gray-400">Thoughts, stories, and ideas</p>
            </div>
            <button
              onClick={() => {
                setEditingPost(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FiPlus className="text-lg" />
              <span>New Post</span>
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700/50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    aria-label="Clear search"
                  >
                    <FiX className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  </button>
                )}
              </div>
              
              <div className="relative w-full md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {categories.filter(cat => cat !== 'All').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {(searchTerm || selectedCategory !== 'All') ? (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                  {searchTerm ? ` for "${searchTerm}"` : ''}
                  {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <FiX className="w-4 h-4" />
                  <span>Clear filters</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* Blog Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { 
                name: 'Personal', 
                emoji: '📖',
                description: 'Journey, experiences, and personal growth',
                color: 'green',
                count: posts.filter(p => p.category === 'Personal').length
              },
              { 
                name: 'Technical', 
                emoji: '💻',
                description: 'Tutorials, tips, and technical deep dives',
                color: 'blue',
                count: posts.filter(p => p.category === 'Technical').length
              },
              { 
                name: 'Experience', 
                emoji: '🌟',
                description: 'Project stories and learning experiences',
                color: 'purple',
                count: posts.filter(p => p.category === 'Experience').length
              }
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 text-center hover:border-blue-500/50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedCategory(category.name);
                }}
              >
                <div className={`w-16 h-16 ${getCategoryColor(category.name)} rounded-full flex items-center justify-center text-3xl mb-4 mx-auto`}>
                  {category.emoji}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                <div className={`text-2xl font-bold text-${category.color}-400`}>
                  {category.count}
                </div>
                <div className="text-gray-400 text-xs">
                  {category.count === 1 ? 'Post' : 'Posts'}
                </div>
              </div>
            ))}
          </div>

          {/* Blog Features */}
          <div className="bg-gray-800/30 p-8 rounded-xl border border-gray-700 mb-12">
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
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl mb-3 mx-auto">
                  🧭
                </div>
                <h4 className="text-white font-medium mb-2">Career & Direction</h4>
                <p className="text-gray-400 text-sm">Notes on decisions and lessons learned</p>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  {post.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title || 'Blog image'} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(post.category)}`}>
                        {post.category || 'Uncategorized'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FiCalendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {post.title || 'Untitled'}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4">
                      {expandedPost === post.id ? (post.content || '') : (post.excerpt || post.content || '')}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                      <button
                        onClick={() => toggleExpand(post.id)}
                        className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                      >
                        {expandedPost === post.id ? 'Show less' : 'Read more'}
                        <svg 
                          className={`w-4 h-4 transition-transform ${expandedPost === post.id ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-1.5 text-gray-400 hover:text-blue-400 transition-colors"
                          title="Edit post"
                        >
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                          title="Delete post"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-400">No posts found</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No blog posts have been added yet.'}
              </p>
              {!searchTerm && selectedCategory === 'All' && (
                <button
                  onClick={() => {
                    setEditingPost(null);
                    setIsFormOpen(true);
                  }}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Create Your First Post</span>
                </button>
              )}
            </div>
          )}
          
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold text-white mb-4">Delete Post</h3>
                <p className="text-gray-300 mb-6">
                  Are you sure you want to delete this post? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Blog Form Modal */}
      {isFormOpen && <BlogForm />}
    </section>
  );
};

export default Blog;

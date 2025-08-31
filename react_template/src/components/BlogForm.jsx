import React, { useState, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { FiX, FiImage, FiSave } from 'react-icons/fi';

const BlogForm = () => {
  const { 
    addPost, 
    updatePost, 
    editingPost, 
    setIsFormOpen, 
    isLoading,
    error 
  } = useBlog();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Technical',
    image: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set form data when editing
  useEffect(() => {
    if (editingPost) {
      setFormData({
        title: editingPost.title || '',
        excerpt: editingPost.excerpt || '',
        content: editingPost.content || '',
        category: editingPost.category || 'Technical',
        image: editingPost.image || ''
      });
    }
  }, [editingPost]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (editingPost) {
        await updatePost(editingPost.id, formData);
      } else {
        await addPost(formData);
      }
      
      // Reset form only on success
      if (!error) {
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: 'Technical',
          image: ''
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && !isSubmitting && setIsFormOpen(false)}
    >
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h2>
            <button
              type="button"
              onClick={() => !isSubmitting && setIsFormOpen(false)}
              className="text-gray-400 hover:text-white disabled:opacity-50"
              disabled={isSubmitting}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none ${
                  errors.title ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Enter post title"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-1">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-70"
                placeholder="A brief summary of your post (optional)"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="8"
                className={`w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:outline-none ${
                  errors.content ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
                placeholder="Write your post content here..."
                disabled={isSubmitting}
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-400">{errors.content}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  <option value="Technical">Technical</option>
                  <option value="Personal">Personal</option>
                  <option value="Experience">Experience</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Featured Image
                </label>
                <div className="flex items-center">
                  <label className={`flex-1 cursor-pointer ${
                    isSubmitting 
                      ? 'bg-gray-700 text-gray-500' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  } px-4 py-2 rounded-lg transition-colors`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isSubmitting}
                    />
                    <div className="flex items-center justify-center gap-2">
                      <FiImage className="w-5 h-5" />
                      <span>{formData.image ? 'Change Image' : 'Upload Image'}</span>
                    </div>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2 relative group">
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="h-20 w-full object-cover rounded-lg"
                    />
                    {!isSubmitting && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isSubmitting}
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
                  isSubmitting 
                    ? 'bg-blue-600 opacity-70' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" />
                    {editingPost ? 'Update Post' : 'Publish Post'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;

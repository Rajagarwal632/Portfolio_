import React, { createContext, useState, useEffect, useCallback } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load posts from localStorage on initial render
  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        // Ensure all posts have required fields
        const validatedPosts = parsedPosts.map(post => ({
          ...post,
          id: post.id || Date.now(),
          title: post.title || 'Untitled Post',
          content: post.content || '',
          excerpt: post.excerpt || (post.content ? `${post.content.substring(0, 150)}...` : ''),
          category: post.category || 'Technical',
          date: post.date || new Date().toISOString(),
          readTime: post.readTime || `${Math.ceil((post.content || '').length / 500) || 1} min read`,
          image: post.image || ''
        }));
        setPosts(validatedPosts);
      }
    } catch (err) {
      console.error('Failed to load posts:', err);
      setError('Failed to load blog posts. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    try {
      if (posts.length > 0) {
        localStorage.setItem('blogPosts', JSON.stringify(posts));
      } else {
        localStorage.removeItem('blogPosts');
      }
    } catch (err) {
      console.error('Failed to save posts:', err);
      setError('Failed to save blog posts. Changes may not persist.');
    }
  }, [posts]);

  const addPost = useCallback((post) => {
    try {
      const newPost = {
        ...post,
        id: Date.now(),
        date: new Date().toISOString(),
        readTime: `${Math.ceil((post.content || '').length / 500) || 1} min read`,
        excerpt: post.excerpt || (post.content ? `${post.content.substring(0, 150)}...` : '')
      };
      
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setIsFormOpen(false);
      setError(null);
      return newPost;
    } catch (err) {
      console.error('Error adding post:', err);
      setError('Failed to add the post. Please try again.');
      throw err;
    }
  }, []);

  const updatePost = useCallback((id, updatedPost) => {
    try {
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return {
            ...updatedPost,
            id,
            date: post.date, // Keep original date
            readTime: `${Math.ceil((updatedPost.content || '').length / 500) || 1} min read`,
            excerpt: updatedPost.excerpt || (updatedPost.content ? `${updatedPost.content.substring(0, 150)}...` : '')
          };
        }
        return post;
      });
      
      setPosts(updatedPosts);
      setEditingPost(null);
      setIsFormOpen(false);
      setError(null);
      return updatedPosts.find(post => post.id === id);
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update the post. Please try again.');
      throw err;
    }
  }, [posts]);

  const deletePost = useCallback((id) => {
    try {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting post:', err);
      setError('Failed to delete the post. Please try again.');
      throw err;
    }
  }, []);

  const value = {
    posts,
    addPost,
    updatePost,
    deletePost,
    editingPost,
    setEditingPost,
    isFormOpen,
    setIsFormOpen,
    isLoading,
    error
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = React.useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

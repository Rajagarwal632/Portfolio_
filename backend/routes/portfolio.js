import express from 'express';
import Project from '../models/Project.js';
import BlogPost from '../models/BlogPost.js';

const router = express.Router();

// @desc    Get all projects
// @route   GET /api/portfolio/projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const { category, featured, limit = 10, page = 1 } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }

    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Project.countDocuments(query);

    res.json({
      success: true,
      count: projects.length,
      total,
      data: projects
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// @desc    Get single project
// @route   GET /api/portfolio/projects/:id
// @access  Public
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

// @desc    Get all blog posts
// @route   GET /api/portfolio/blog
// @access  Public
router.get('/blog', async (req, res) => {
  try {
    const { category, featured, published = 'true', limit = 10, page = 1 } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    if (published !== undefined) {
      query.published = published === 'true';
    }

    const posts = await BlogPost.find(query)
      .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-content'); // Exclude full content for list view

    const total = await BlogPost.countDocuments(query);

    res.json({
      success: true,
      count: posts.length,
      total,
      data: posts
    });

  } catch (error) {
    console.error('Get blog posts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog posts'
    });
  }
});

// @desc    Get single blog post
// @route   GET /api/portfolio/blog/:slug
// @access  Public
router.get('/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      published: true 
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({
      success: true,
      data: post
    });

  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post'
    });
  }
});

// @desc    Get portfolio stats
// @route   GET /api/portfolio/stats
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const projectsCount = await Project.countDocuments();
    const completedProjects = await Project.countDocuments({ status: 'Completed' });
    const blogPostsCount = await BlogPost.countDocuments({ published: true });
    const totalViews = await BlogPost.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, totalViews: { $sum: '$views' } } }
    ]);

    // Get project categories count
    const projectCategories = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Get blog categories count
    const blogCategories = await BlogPost.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        projects: {
          total: projectsCount,
          completed: completedProjects,
          categories: projectCategories
        },
        blog: {
          total: blogPostsCount,
          totalViews: totalViews[0]?.totalViews || 0,
          categories: blogCategories
        }
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio stats'
    });
  }
});

// @desc    Get skills data
// @route   GET /api/portfolio/skills
// @access  Public
router.get('/skills', async (req, res) => {
  try {
    // Static skills data (you can move this to database later)
    const skills = [
      { name: "HTML", level: 90, logo: "🌐", category: "Frontend" },
      { name: "CSS", level: 85, logo: "🎨", category: "Frontend" },
      { name: "JavaScript", level: 80, logo: "⚡", category: "Frontend" },
      { name: "React.js", level: 75, logo: "⚛️", category: "Frontend" },
      { name: "Node.js", level: 70, logo: "🟢", category: "Backend" },
      { name: "MongoDB", level: 65, logo: "🍃", category: "Database" },
      { name: "Git", level: 80, logo: "📚", category: "Tools" }
    ];

    res.json({
      success: true,
      data: skills
    });

  } catch (error) {
    console.error('Get skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skills'
    });
  }
});

// @desc    Get experience data
// @route   GET /api/portfolio/experience
// @access  Public
router.get('/experience', async (req, res) => {
  try {
    // Static experience data (you can move this to database later)
    const experience = [
      {
        title: "Graphic Design Intern",
        company: "NGO Adore",
        duration: "2023",
        type: "Internship",
        description: "Created visual content and marketing materials for social causes",
        skills: ["Graphic Design", "Adobe Creative Suite", "Social Media"]
      },
      {
        title: "Graphic Design Intern", 
        company: "Save the Girl Foundation",
        duration: "2023",
        type: "Internship",
        description: "Designed awareness campaigns and educational materials",
        skills: ["Campaign Design", "Educational Content", "Brand Identity"]
      },
      {
        title: "Open Source Contributor",
        company: "GSSOC (GirlScript Summer of Code)",
        duration: "2024",
        type: "Contribution",
        description: "Contributed to various open-source projects and learned collaborative development",
        skills: ["Git", "Collaboration", "Code Review", "Documentation"]
      }
    ];

    res.json({
      success: true,
      data: experience
    });

  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience'
    });
  }
});

// @desc    Get personal info
// @route   GET /api/portfolio/info
// @access  Public
router.get('/info', async (req, res) => {
  try {
    const personalInfo = {
      name: "Raj Agarwal",
      title: "CSE Core Student",
      email: "raj390504@gmail.com",
      bio: "Passionate college student interested in web development with strong leadership qualities and NCC cadet background. Dedicated to creating innovative solutions and contributing to open-source projects.",
      location: "India",
      socialLinks: {
        linkedin: "https://linkedin.com/in/raj-agarwal-b04563255",
        github: "https://github.com/Rajagarwal632",
        email: "mailto:raj390504@gmail.com"
      },
      avatar: null,
      resume: null
    };

    res.json({
      success: true,
      data: personalInfo
    });

  } catch (error) {
    console.error('Get personal info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch personal information'
    });
  }
});

export default router;

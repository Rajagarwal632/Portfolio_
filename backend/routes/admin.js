import express from 'express';
import { body, validationResult } from 'express-validator';
import multer from 'multer';
import { protect, admin } from '../middleware/auth.js';
import Project from '../models/Project.js';
import BlogPost from '../models/BlogPost.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Apply auth middleware to all admin routes
router.use(protect);
router.use(admin);

// @desc    Get admin dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProjects,
      totalBlogPosts,
      totalContacts,
      totalUsers,
      recentContacts,
      recentProjects,
      recentBlogPosts
    ] = await Promise.all([
      Project.countDocuments(),
      BlogPost.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments(),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email subject createdAt status'),
      Project.find().sort({ createdAt: -1 }).limit(3).select('title category status createdAt'),
      BlogPost.find().sort({ createdAt: -1 }).limit(3).select('title category published createdAt')
    ]);

    const contactStats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          projects: totalProjects,
          blogPosts: totalBlogPosts,
          contacts: totalContacts,
          users: totalUsers
        },
        contactStats,
        recent: {
          contacts: recentContacts,
          projects: recentProjects,
          blogPosts: recentBlogPosts
        }
      }
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// PROJECT MANAGEMENT

// @desc    Create new project
// @route   POST /api/admin/projects
// @access  Private/Admin
router.post('/projects', upload.single('image'), [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title is required and must be under 100 characters'),
  body('description').trim().isLength({ min: 1, max: 500 }).withMessage('Description is required and must be under 500 characters'),
  body('technologies').isArray({ min: 1 }).withMessage('At least one technology is required'),
  body('category').isIn(['Web Development', 'Full Stack', 'Mobile App', 'Desktop App', 'Other']).withMessage('Invalid category'),
  body('year').matches(/^\d{4}$/).withMessage('Year must be a 4-digit number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const projectData = { ...req.body };
    
    // Handle image upload if provided
    if (req.file) {
      // In a real app, you'd upload to Cloudinary here
      projectData.image = `/uploads/projects/${Date.now()}-${req.file.originalname}`;
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
});

// @desc    Update project
// @route   PUT /api/admin/projects/:id
// @access  Private/Admin
router.put('/projects/:id', upload.single('image'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const updateData = { ...req.body };
    
    // Handle image upload if provided
    if (req.file) {
      updateData.image = `/uploads/projects/${Date.now()}-${req.file.originalname}`;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// @desc    Delete project
// @route   DELETE /api/admin/projects/:id
// @access  Private/Admin
router.delete('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

// BLOG MANAGEMENT

// @desc    Create new blog post
// @route   POST /api/admin/blog
// @access  Private/Admin
router.post('/blog', upload.single('image'), [
  body('title').trim().isLength({ min: 1, max: 150 }).withMessage('Title is required and must be under 150 characters'),
  body('excerpt').trim().isLength({ min: 1, max: 300 }).withMessage('Excerpt is required and must be under 300 characters'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('category').isIn(['Personal', 'Technical', 'Experience', 'Tutorial', 'Review']).withMessage('Invalid category'),
  body('readTime').matches(/^\d+\s+min\s+read$/).withMessage('Read time must be in format "X min read"')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const postData = { ...req.body };
    
    // Handle image upload if provided
    if (req.file) {
      postData.image = `/uploads/blog/${Date.now()}-${req.file.originalname}`;
    }

    const blogPost = await BlogPost.create(postData);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blogPost
    });

  } catch (error) {
    console.error('Create blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post'
    });
  }
});

// @desc    Update blog post
// @route   PUT /api/admin/blog/:id
// @access  Private/Admin
router.put('/blog/:id', upload.single('image'), async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    const updateData = { ...req.body };
    
    // Handle image upload if provided
    if (req.file) {
      updateData.image = `/uploads/blog/${Date.now()}-${req.file.originalname}`;
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: updatedPost
    });

  } catch (error) {
    console.error('Update blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post'
    });
  }
});

// @desc    Delete blog post
// @route   DELETE /api/admin/blog/:id
// @access  Private/Admin
router.delete('/blog/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    
    if (!blogPost) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });

  } catch (error) {
    console.error('Delete blog post error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post'
    });
  }
});

// CONTACT MANAGEMENT

// @desc    Get all contacts
// @route   GET /api/admin/contacts
// @access  Private/Admin
router.get('/contacts', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      count: contacts.length,
      total,
      data: contacts
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// @desc    Update contact status
// @route   PUT /api/admin/contacts/:id/status
// @access  Private/Admin
router.put('/contacts/:id/status', [
  body('status').isIn(['new', 'read', 'replied']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

// @desc    Delete contact
// @route   DELETE /api/admin/contacts/:id
// @access  Private/Admin
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

export default router;

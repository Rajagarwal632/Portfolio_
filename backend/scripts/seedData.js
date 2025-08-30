import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import BlogPost from '../models/BlogPost.js';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

// Sample data
const projects = [
  {
    title: "Railway Reservation System",
    description: "A comprehensive railway booking system built during Grade 12 with user authentication, seat selection, and booking management.",
    technologies: ["HTML", "CSS", "JavaScript", "Database"],
    category: "Web Development",
    year: "2023",
    status: "Completed",
    featured: true,
    order: 1
  },
  {
    title: "E-governance Platform",
    description: "Digital governance solution developed during hackathon to streamline citizen services and government processes.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
    category: "Full Stack",
    year: "2024",
    status: "Completed",
    featured: true,
    order: 2
  }
];

const blogPosts = [
  {
    title: "My Journey into Web Development",
    excerpt: "How I started learning web development and the challenges I faced along the way.",
    content: `
# My Journey into Web Development

Starting my journey in web development has been an incredible experience filled with challenges, learning, and growth.

## The Beginning

It all started when I was in Grade 12, working on my Railway Reservation System project. I was fascinated by how websites worked and decided to dive deeper into web technologies.

## Learning HTML & CSS

My first step was mastering HTML and CSS. I spent countless hours understanding:
- Semantic HTML structure
- CSS layouts and flexbox
- Responsive design principles
- Modern CSS features

## JavaScript Adventures

JavaScript was where things got really interesting. Learning about:
- DOM manipulation
- Event handling
- Asynchronous programming
- ES6+ features

## React.js Discovery

Discovering React.js was a game-changer. The component-based architecture and state management opened up new possibilities for building interactive applications.

## Current Focus

Now I'm focused on:
- Full-stack development with Node.js
- Database design with MongoDB
- Building real-world projects
- Contributing to open source

The journey continues, and I'm excited about what's ahead!
    `,
    category: "Personal",
    readTime: "5 min read",
    published: true,
    featured: true,
    tags: ["web development", "learning", "journey", "beginner"]
  },
  {
    title: "Building My First React Application",
    excerpt: "Lessons learned while creating my first React.js project and best practices I discovered.",
    content: `
# Building My First React Application

Creating my first React application was both exciting and challenging. Here are the key lessons I learned.

## Project Setup

Setting up the development environment was my first hurdle:
- Create React App vs Vite
- Understanding the project structure
- Configuring development tools

## Component Architecture

Learning to think in components:
- Breaking down UI into reusable pieces
- Props and state management
- Component lifecycle

## State Management

Understanding when and how to manage state:
- Local component state
- Lifting state up
- Context API for global state

## Best Practices

Key practices I adopted:
- Consistent naming conventions
- Proper file organization
- Code splitting and optimization
- Testing components

## Challenges Faced

Common issues I encountered:
- Understanding JSX syntax
- Managing component re-renders
- Debugging React applications
- Handling forms and user input

## Conclusion

Building my first React app taught me the importance of planning, understanding the fundamentals, and continuous learning.
    `,
    category: "Technical",
    readTime: "7 min read",
    published: true,
    featured: false,
    tags: ["react", "javascript", "frontend", "tutorial"]
  },
  {
    title: "Open Source Contribution Experience",
    excerpt: "My experience contributing to GSSOC and how it improved my coding skills.",
    content: `
# Open Source Contribution Experience

Participating in GirlScript Summer of Code (GSSOC) was a transformative experience that significantly improved my development skills.

## Getting Started

The journey began with:
- Finding suitable projects for beginners
- Understanding project documentation
- Setting up development environments
- Learning Git and GitHub workflows

## First Contribution

My first contribution was nerve-wracking but rewarding:
- Finding a good first issue
- Understanding the codebase
- Making the changes
- Creating a proper pull request

## Skills Developed

Through open source contributions, I learned:
- Collaborative development practices
- Code review processes
- Writing clean, maintainable code
- Documentation best practices
- Communication with maintainers

## Challenges Overcome

Key challenges I faced:
- Understanding large codebases
- Following coding standards
- Handling merge conflicts
- Receiving and implementing feedback

## Impact on My Development

Open source contributions helped me:
- Build confidence in my coding abilities
- Learn from experienced developers
- Understand real-world development practices
- Build a portfolio of contributions

## Advice for Beginners

For those starting their open source journey:
- Start with documentation improvements
- Look for "good first issue" labels
- Don't be afraid to ask questions
- Be patient and persistent

The open source community is welcoming and supportive. Every contribution, no matter how small, makes a difference!
    `,
    category: "Experience",
    readTime: "6 min read",
    published: true,
    featured: false,
    tags: ["open source", "gssoc", "contribution", "learning"]
  }
];

const adminUser = {
  name: "Raj Agarwal",
  email: "raj390504@gmail.com",
  password: "admin123",
  role: "admin"
};

// Seed function
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Project.deleteMany({}),
      BlogPost.deleteMany({}),
      User.deleteMany({})
    ]);

    // Create admin user
    console.log('👤 Creating admin user...');
    await User.create(adminUser);

    // Seed projects
    console.log('📁 Seeding projects...');
    await Project.insertMany(projects);

    // Seed blog posts
    console.log('📝 Seeding blog posts...');
    await BlogPost.insertMany(blogPosts);

    console.log('✅ Database seeded successfully!');
    console.log(`
📊 Seeded Data Summary:
- Projects: ${projects.length}
- Blog Posts: ${blogPosts.length}
- Admin User: 1

🔐 Admin Login:
Email: raj390504@gmail.com
Password: admin123

🚀 You can now start the server with: npm run dev
    `);

    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

// Run seeding
seedData();

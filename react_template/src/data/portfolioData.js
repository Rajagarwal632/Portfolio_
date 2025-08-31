// Portfolio data for Raj Agarwal
export const personalInfo = {
  name: "Raj Agarwal",
  title: "CSE Core Student",
  email: "raj390504@gmail.com",
  bio: "Passionate college student interested in web development with strong leadership qualities and NCC cadet background. Dedicated to creating innovative solutions and contributing to open-source projects.",
  location: "India",
  socialLinks: {
    linkedin: "https://linkedin.com/in/raj-agarwal-b04563255",
    github: "https://github.com/Rajagarwal632",
    email: "mailto:raj390504@gmail.com"
  }
};

export const skills = [
  { name: "HTML", level: 90, logo: "🌐" },
  { name: "CSS", level: 85, logo: "🎨" },
  { name: "JavaScript", level: 80, logo: "⚡" },
  { name: "React.js", level: 75, logo: "⚛️" },
  { name: "Canva", level: 85, logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" }
];

export const experience = [
  {
    title: "Open Source Contributor",
    company: "GSSOC (GirlScript Summer of Code)",
    duration: "2025",
    type: "Contribution",
    description: "Contributed to various open-source projects and learned collaborative development",
    logo: "🪁" // Kite emoji for open source
  },
  {
    title: "Graphic Design Intern", 
    company: "Save the Girl Foundation (NGO)",
    duration: "2023",
    type: "Internship",
    description: "Created awareness and fund raising posters for social media for specially abled children",
    logo: "🔵" // Circle emoji for NGO
  },
  {
    title: "Graphic Design Intern",
    company: "Adore Earth",
    duration: "2022-2023",
    type: "Internship",
    description: "Created newsletters and social media contents for environmental awareness campaigns",
    logo: "🔘" // Circle emoji for environment
  }
];

export const projects = [
  {
    id: 1,
    title: "Railway Reservation System",
    description: "A comprehensive railway booking system built during Grade 12 with user authentication, seat selection, and booking management.",
    technologies: ["HTML", "CSS", "JavaScript", "Database"],
    category: "Web Development",
    year: "2023",
    status: "Completed",
    image: "/assets/images/railway-project.jpg"
  },
  {
    id: 2,
    title: "E-governance Platform",
    description: "Digital governance solution developed during hackathon to streamline citizen services and government processes.",
    technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
    category: "Full Stack",
    year: "2024", 
    status: "Completed",
    image: "/assets/images/egovernance-project.jpg"
  }
];

export const stats = {
  hackathons: 1,
  internships: 2,
  projects: 2,
  contributions: 5
};

export const blogPosts = [
  {
    id: 1,
    title: "My Journey into Web Development",
    excerpt: "How I started learning web development and the challenges I faced along the way.",
    date: "2024-08-15",
    category: "Personal",
    readTime: "5 min read",
    image: "/assets/images/blog-1.jpg"
  },
  {
    id: 2,
    title: "Building My First React Application",
    excerpt: "Lessons learned while creating my first React.js project and best practices I discovered.",
    date: "2024-08-01",
    category: "Technical",
    readTime: "7 min read", 
    image: "/assets/images/blog-2.jpg"
  },
  {
    id: 3,
    title: "Open Source Contribution Experience",
    excerpt: "My experience contributing to GSSOC and how it improved my coding skills.",
    date: "2024-07-20",
    category: "Experience",
    readTime: "6 min read",
    image: "/assets/images/blog-3.jpg"
  }
];
// Ahmed Omer - Portfolio Data

export const personalInfo = {
  name: "Ahmed Omer",
  title: "Software Engineer",
  email: "tekisha5050@gmail.com",
  phone: "+251954148842",
  location: "Ethiopia",
  bio: "Passionate software engineer with expertise in building scalable web applications and modern user interfaces. Specialized in React, JavaScript, TypeScript, Node.js, Express, C++, C#, Java, Tailwind CSS, HTML, CSS, Next.js, GitHub, Laravel, SQL, MongoDB and full-stack development with a focus on creating elegant solutions to complex problems.",
  github: "https://github.com/ahma5050",
  linkedin: "https://linkedin.com/in/ahmedomer",
  image: "/photo.jpg" // Just this - no "public/" prefix
};

export const projects = [
  {
    id: 1,
    title: "aura-design-studio",
    description: "Abezing's digital portfolio - Development projects, technical skills, and professional accomplishments in software engineering and design.",
    tech: ["next js", "TypeScript", "PostgreSQL", "Redis"],
    image: "/placeholder.svg",
    liveUrl: "https://edunex.example.com",
    github: "https://github.com/ahma5050/aura-design-studio",
    featured: true,
  },
  {
    id: 2,
    title: "Internship-Externship-Management-System",
    description: "Full-stack Internship-Externship-Management-System, user authentication, and automated student tracking.",
    tech: ["React", "Express", "Node js", "Mongodb"],
    image: "/placeholder.svg",
    liveUrl: "https://library.example.com",
    github: "https://github.com/ahma5050/Internship-Externship-Management-System",
    featured: true,
  },
  {
    id: 3,
    title: "full-stack-ecommerce",
    description: "Real-time trading system processing with advanced analytics dashboard.",
    tech: ["Go", "Redis", "Express", "React", "Node js", "Mongodb"],
    image: "/placeholder.svg",
    liveUrl: "https://quantum.example.com",
    github: "https://github.com/ahma5050/full-stack-ecommerce",
    featured: true,
  },
  {
    id: 4,
    title: "AI patent-forge-pro-Studio",
    description: "AI-powered content generation platform with multi-modal support and real-time collaboration.",
    tech: ["Next.js", "FairBase", "TensorFlow", "AWS"],
    image: "/placeholder.svg",
    liveUrl: "https://ai-studio.example.com",
    github: "https://github.com/ahma5050/patent-forge-pro",
    featured: false,
  },
  {
    id: 5,
    title: "AI integrated-patent-design-automator",
    description: "Enterprise property management dashboard with multi-provider support and cost optimization.",
    tech: ["React", "Node.js", "GraphQL", "Docker"],
    image: "/placeholder.svg",
    liveUrl: "https://cloudsync.example.com",
    github: "https://github.com/ahma5050/patent-design-automator",
    featured: false,
  },
  {
    id: 6,
    title: "Blog App",
    description:"An interactive and user-friendly blog application with comprehensive features",
    tech: ["Express", "React", "Node js", "Mongodb"],
    image: "/placeholder.svg",
    liveUrl: "https://devops.example.com",
   github: "https://github.com/ahma5050/Blog-app",
    featured: false,
  },
];

export const skills = [
  { name: "React", level: 92, color: "#61DAFB", category: "Frontend", years: 4 },
  { name: "JavaScript", level: 94, color: "#F7DF1E", category: "Languages", years: 5 },
  { name: "TypeScript", level: 90, color: "#3178C6", category: "Languages", years: 4 },
  { name: "Node.js", level: 88, color: "#339933", category: "Backend", years: 4 },
  { name: "Express", level: 86, color: "#000000", category: "Backend", years: 4 },
  { name: "C++", level: 85, color: "#00599C", category: "Languages", years: 3 },
  { name: "C#", level: 83, color: "#239120", category: "Languages", years: 3 },
  { name: "Java", level: 82, color: "#007396", category: "Languages", years: 3 },
  { name: "Tailwind CSS", level: 90, color: "#06B6D4", category: "Frontend", years: 3 },
  { name: "HTML", level: 95, color: "#E34F26", category: "Frontend", years: 5 },
  { name: "CSS", level: 92, color: "#1572B6", category: "Frontend", years: 5 },
  { name: "Next.js", level: 88, color: "#000000", category: "Frontend", years: 3 },
  { name: "GitHub", level: 91, color: "#181717", category: "Tools", years: 5 },
  { name: "Laravel", level: 80, color: "#FF2D20", category: "Backend", years: 2 },
  { name: "SQL", level: 87, color: "#4479A1", category: "Database", years: 4 },
  { name: "MongoDB", level: 84, color: "#47A248", category: "Database", years: 3 },
];

export const experience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "Tech Innovation Labs",
    period: "2022 - Present",
    description: "Leading development of scalable web applications and mentoring junior developers.",
    highlights: ["Led team of 5 developers"],
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Digital Solutions Inc",
    period: "2020 - 2022",
    description: "Built and maintained multiple client-facing applications using modern web technologies.",
    highlights: ["Developed 10+ applications", "Integrated payment systems", "API design and implementation"],
  },
  {
    id: 3,
    role: "Software Developer",
    company: "StartUp Hub",
    period: "2018 - 2020",
    description: "Contributed to various startup projects focusing on rapid prototyping and MVP development.",
    highlights: ["Rapid prototyping", "Agile methodology", "Full-stack development"],
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    excerpt: "Learn the best practices for building large-scale React applications with proper architecture.",
    readTime: "8 min read",
    tags: ["React", "Architecture", "TypeScript"],
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Modern CSS Techniques for 2024",
    excerpt: "Explore the latest CSS features and how to use them effectively in your projects.",
    readTime: "6 min read",
    tags: ["CSS", "Frontend", "Design"],
    date: "2024-01-10",
  },
  {
    id: 3,
    title: "Nodeja Best Practices for Backend Development",
    excerpt: "A comprehensive guide to writing clean, maintainable Python code for backend services.",
    readTime: "10 min read",
    tags: ["Python", "Backend", "Best Practices"],
    date: "2024-01-05",
  },
];

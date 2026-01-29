import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/portfolio';

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl gradient-border transition-all duration-300 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative h-full rounded-2xl bg-card p-6 overflow-hidden">
          {/* Glow effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          </div>
          
          {/* Project Image/Preview */}
          <div className="relative h-48 rounded-xl overflow-hidden mb-6 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-muted-foreground/30">
                {project.title.split(' ').map(w => w[0]).join('')}
              </span>
            </div>
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <ArrowUpRight className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {project.description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium rounded-full glass text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Links */}
            <div className="flex gap-4">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <Github className="w-4 h-4" />
                Source
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my best work, featuring innovative solutions and cutting-edge technologies
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

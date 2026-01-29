import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<SVGSVGElement>(null);
   const [showInitials, setShowInitials] = useState(true);
  
  const fullText = personalInfo.title;
    useEffect(() => {
    const interval = setInterval(() => {
      setShowInitials(prev => !prev);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current.querySelector('path'),
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 2, delay: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  const socialLinks = [
    { icon: Github, href: personalInfo.github, label: 'GitHub' },
    { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
            >
              Welcome to my portfolio
            </motion.span>

            <motion.h1
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hi, I'm{' '}
              <span className="gradient-text glow-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground mb-6 min-h-[1.5em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {displayText}
              {!isTypingComplete && <span className="typewriter-cursor" />}
            </motion.h2>

            {/* Animated Divider */}
            <svg
              ref={dividerRef}
              className="w-full max-w-md mx-auto lg:mx-0 my-8"
              height="20"
              viewBox="0 0 400 20"
            >
              <path
                d="M0,10 Q100,0 200,10 T400,10"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>

            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <a href="#projects" className="btn-luxury">
                View My Work
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass hover:glow-sm transition-all duration-300 group"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* Glow Background */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-110" />
              {/* Image Container */}
                <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden gradient-border"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
               >
                  <AnimatePresence mode="wait">
                  {showInitials ? (
                    <motion.div
                      key="initials"
                      className="absolute inset-0 w-full h-full rounded-full bg-card flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="text-8xl font-bold gradient-text">
                        {personalInfo.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="image"
                      className="absolute inset-0 w-full h-full rounded-full bg-card overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.8 }}
                    >
                      {/* FIXED: Use img tag with the correct path */}
                      <img
                        src={personalInfo.image} // This will be "/photo.jpg"
                        alt={`Photo of ${personalInfo.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Failed to load image:', personalInfo.image);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>


              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full glass flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Download className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a
            href="#projects"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

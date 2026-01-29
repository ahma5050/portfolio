import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        {/* Top Section */}
        <div className="glass rounded-3xl p-8 md:p-12 mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <motion.h3
                className="text-2xl font-bold gradient-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {personalInfo.name}
              </motion.h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Crafting digital experiences with passion and precision. 
                Let's build something amazing together.
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-primary hover:underline font-medium"
              >
                {personalInfo.email}
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            © {currentYear} {personalInfo.name}.{' '}
             made by Ahmed
          </p>

          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-full glass hover:glow-sm transition-all duration-300"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-primary" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

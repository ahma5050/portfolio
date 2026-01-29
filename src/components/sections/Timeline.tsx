import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { experience } from '@/data/portfolio';

const TimelineItem = ({ item, index, isLast }: { 
  item: typeof experience[0]; 
  index: number;
  isLast: boolean;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-50px' });

  const isEven = index % 2 === 0;

  return (
    <div ref={itemRef} className="relative">
      {/* Timeline line */}
      {!isLast && (
        <motion.div
          className="absolute left-1/2 top-16 w-px h-full -translate-x-1/2 bg-gradient-to-b from-primary to-muted hidden md:block"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: 'top' }}
        />
      )}

      <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Content Card */}
        <motion.div
          className="w-full md:w-5/12"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <div className="glass rounded-2xl p-6 hover:glow-sm transition-all duration-300 group">
            <div className="flex items-center gap-2 text-primary mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">{item.period}</span>
            </div>
            
            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
              {item.role}
            </h3>
            
            <p className="text-muted-foreground mb-4">{item.company}</p>
            
            <p className="text-sm text-muted-foreground mb-4">
              {item.description}
            </p>
            
            <ul className="space-y-2">
              {item.highlights.map((highlight, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <ChevronRight className="w-4 h-4 text-primary" />
                  {highlight}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Center Icon */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-full glass flex items-center justify-center glow">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
        </motion.div>

        {/* Spacer for alignment */}
        <div className="hidden md:block w-5/12" />
      </div>
    </div>
  );
};

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="py-32 relative">
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
            Career Journey
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="gradient-text">Experience</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12 md:space-y-24">
          {experience.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;

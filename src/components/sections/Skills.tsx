import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '@/data/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

interface SkillBadge3DProps {
  skill: typeof skills[0];
  position: [number, number, number];
}

const SkillBadge3D = ({ skill, position }: SkillBadge3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isGold } = useTheme();
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  const color = isGold ? '#d4af37' : '#00ffff';

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.3 + skill.level / 200, 16, 16]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
};

const SkillOrb = () => {
  const { isGold } = useTheme();
  
  const positions = useMemo(() => {
    return skills.slice(0, 8).map((_, i) => {
      const theta = (i / 8) * Math.PI * 2;
      const phi = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
      const r = 2 + Math.random() * 0.5;
      return [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      ] as [number, number, number];
    });
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} className="!h-80">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {skills.slice(0, 8).map((skill, i) => (
        <SkillBadge3D key={skill.name} skill={skill} position={positions[i]} />
      ))}
    </Canvas>
  );
};

const SkillBar = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true });

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium group-hover:text-primary transition-colors">
          {skill.name}
        </span>
        <span className="text-sm text-muted-foreground">
          {skill.years}+ years
        </span>
      </div>
      
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ category, categorySkills, index }: { 
  category: string; 
  categorySkills: typeof skills;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold mb-6 text-primary">{category}</h3>
      <div className="space-y-4">
        {categorySkills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const categories = Object.keys(groupedSkills);

  return (
    <section id="skills" ref={sectionRef} className="py-32 relative">
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
            Technical Expertise
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Years of experience across multiple technologies and frameworks
          </p>
        </motion.div>

        {/* 3D Skill Orb */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SkillOrb />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <SkillCategory
              key={category}
              category={category}
              categorySkills={groupedSkills[category]}
              index={index}
            />
          ))}
        </div>

        {/* Floating Skill Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="px-4 py-2 rounded-full glass text-sm font-medium hover:glow-sm transition-all cursor-default"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

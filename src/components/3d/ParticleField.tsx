import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

const ParticleField = () => {
  const { isGold } = useTheme();
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  
  const particleCount = 3000;
  
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return { positions, velocities };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Add wave motion
      positions[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.01) * 0.002;
      positions[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.01) * 0.002;
      positions[i3 + 2] += velocities[i3 + 2];
      
      // Mouse interaction
      const dx = mouse.x * 5 - positions[i3];
      const dy = mouse.y * 5 - positions[i3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 3) {
        positions[i3] -= dx * 0.01;
        positions[i3 + 1] -= dy * 0.01;
      }
      
      // Boundary check
      if (Math.abs(positions[i3]) > 10) positions[i3] *= -0.9;
      if (Math.abs(positions[i3 + 1]) > 10) positions[i3 + 1] *= -0.9;
      if (Math.abs(positions[i3 + 2]) > 10) positions[i3 + 2] *= -0.9;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.02;
  });

  const color = isGold ? '#d4af37' : '#00ffff';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleField;

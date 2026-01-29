import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, TorusKnot, Octahedron } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

interface FloatingMeshProps {
  position: [number, number, number];
  speed?: number;
  rotationAxis?: 'x' | 'y' | 'z';
  children: React.ReactNode;
}

const FloatingMesh = ({ position, speed = 1, rotationAxis = 'y', children }: FloatingMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    
    meshRef.current.position.y = initialY + Math.sin(time * speed * 0.5) * 0.5;
    meshRef.current.rotation[rotationAxis] = time * speed * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {children}
    </mesh>
  );
};

const FloatingGeometry = () => {
  const { isGold } = useTheme();
  const color = isGold ? '#d4af37' : '#00ffff';
  const emissiveColor = isGold ? '#d4af37' : '#00ffff';

  return (
    <group>
      {/* Icosahedron - Top Right */}
      <FloatingMesh position={[4, 2, -3]} speed={0.8} rotationAxis="x">
        <Icosahedron args={[0.8, 0]}>
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={emissiveColor}
            emissiveIntensity={0.2}
            transparent
            opacity={0.4}
          />
        </Icosahedron>
      </FloatingMesh>

      {/* Torus Knot - Left */}
      <FloatingMesh position={[-5, 0, -4]} speed={0.6} rotationAxis="y">
        <TorusKnot args={[0.6, 0.2, 64, 8]}>
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={emissiveColor}
            emissiveIntensity={0.2}
            transparent
            opacity={0.3}
          />
        </TorusKnot>
      </FloatingMesh>

      {/* Octahedron - Bottom */}
      <FloatingMesh position={[2, -3, -2]} speed={1} rotationAxis="z">
        <Octahedron args={[0.7, 0]}>
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={emissiveColor}
            emissiveIntensity={0.2}
            transparent
            opacity={0.35}
          />
        </Octahedron>
      </FloatingMesh>

      {/* Small Icosahedron - Far Right */}
      <FloatingMesh position={[6, -1, -5]} speed={1.2} rotationAxis="x">
        <Icosahedron args={[0.5, 0]}>
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={emissiveColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.25}
          />
        </Icosahedron>
      </FloatingMesh>

      {/* Another Torus Knot - Top Left */}
      <FloatingMesh position={[-4, 3, -6]} speed={0.7} rotationAxis="y">
        <TorusKnot args={[0.4, 0.15, 48, 6]}>
          <meshStandardMaterial
            color={color}
            wireframe
            emissive={emissiveColor}
            emissiveIntensity={0.2}
            transparent
            opacity={0.2}
          />
        </TorusKnot>
      </FloatingMesh>
    </group>
  );
};

export default FloatingGeometry;

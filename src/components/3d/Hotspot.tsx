import { useState, useRef } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface HotspotProps {
  position: [number, number, number];
  title: string;
  description: string;
  color?: string;
  lineTarget?: [number, number, number];
  onHover?: (hovered: boolean) => void;
  isHighlighted?: boolean;
}

const Hotspot: React.FC<HotspotProps> = ({ 
  position, 
  title, 
  description, 
  color = '#EE4B2B',
  lineTarget = [0, 0, 0],
  onHover,
  isHighlighted = false
}) => {
  const [hovered, setHovered] = useState(false);
  const shadowRef = useRef<THREE.Mesh>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  const handlePointerOver = () => {
    setHovered(true);
    onHover?.(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHover?.(false);
  };

  // Billboard effect - always face the camera to maintain perfect circle
  useFrame(() => {
    if (shadowRef.current && dotRef.current) {
      // Make both circles always face the camera
      shadowRef.current.lookAt(camera.position);
      dotRef.current.lookAt(camera.position);
    }
  });

  // Coral/light red color for notification dot
  const dotColor = '#FF6B6B';

  return (
    <group position={position}>
      {/* Soft Shadow */}
      <mesh
        ref={shadowRef}
        position={[0, -0.01, 0]}
      >
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Clean Circular Dot */}
      <mesh
        ref={dotRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <circleGeometry args={[isHighlighted ? 0.15 : 0.1, 32]} />
        <meshBasicMaterial
          color={isHighlighted ? '#FFD700' : dotColor}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Highlight Ring for Guided Tour */}
      {isHighlighted && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Info Card on Hover */}
      {hovered && (
        <Html
          center
          distanceFactor={6}
          style={{
            transition: 'all 0.2s',
            opacity: hovered ? 1 : 0,
            transform: `scale(${hovered ? 1 : 0.5})`,
          }}
        >
          <div className="bg-[#650304]/95 backdrop-blur-md border-2 border-[#EE4B2B] rounded-lg p-4 shadow-2xl min-w-[200px] max-w-[280px]">
            <h3 className="text-[#EE4B2B] font-bold text-sm mb-2">{title}</h3>
            <p className="text-[#EE4B2B]/90 text-xs leading-relaxed">{description}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

export default Hotspot;

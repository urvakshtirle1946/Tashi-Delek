import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Pause,
  Play,
  Home
} from 'lucide-react';
import * as THREE from 'three';
import VoiceGuide, { ModelInfo } from '@/components/VoiceGuide';
import Hotspot from '@/components/3d/Hotspot';

// Ravangla Monastery Information for Voice Guide
const ravanglaInfo: ModelInfo = {
  id: 'ravangla',
  name: 'Ravangla Monastery',
  location: 'Ravangla, South Sikkim, India - situated at an altitude of 8,000 feet',
  established: '1990s',
  description: 'Ravangla Monastery, also known as Ralang Monastery, is a beautiful Buddhist monastery located in the scenic town of Ravangla. It is known for its stunning location with panoramic views of the Himalayas and its important role in preserving Buddhist teachings.',
  history: 'The monastery was established in the 1990s as part of efforts to preserve and promote Buddhist culture in Sikkim. Ravangla has become an important pilgrimage site and spiritual center, attracting visitors from around the world. The monastery belongs to the Kagyu tradition of Tibetan Buddhism.',
  architecture: 'The monastery features traditional Tibetan architecture with colorful prayer flags, intricate murals, and beautiful statues. The main prayer hall houses statues of Buddha and important Buddhist deities. The complex includes the main temple, monks\' quarters, and meditation halls set against the backdrop of the majestic Himalayas.',
  significance: 'Ravangla Monastery is an important center for Buddhist practice and learning in South Sikkim. It offers stunning views of the Kanchenjunga mountain range and serves as a peaceful retreat for meditation and spiritual practice. The monastery is also known for hosting important Buddhist festivals and ceremonies.',
  visitingHours: 'The monastery is open daily from 6:00 AM to 6:00 PM. Visitors are welcome to participate in prayer sessions and meditation.',
  bestTimeToVisit: 'The best time to visit is from March to May and September to November when the weather is clear and the mountain views are spectacular. During Losar (Tibetan New Year) and other festivals, special ceremonies are held.',
  nearbyAttractions: [
    'Buddha Park Ravangla',
    'Temi Tea Garden',
    'Namchi',
    'Char Dham',
    'Samdruptse',
    'Tendong Hill'
  ],
  facts: [
    'Ravangla Monastery offers stunning panoramic views of the Kanchenjunga mountain range.',
    'The monastery is located at an altitude of 8,000 feet in South Sikkim.',
    'It belongs to the Kagyu tradition of Tibetan Buddhism.',
    'Ravangla is a popular destination for meditation and spiritual retreats.',
    'The monastery hosts important Buddhist festivals and ceremonies throughout the year.',
    'It is located near the famous Buddha Park Ravangla.',
    'The monastery complex includes beautiful gardens and prayer flag areas.',
    'Ravangla serves as an important center for Buddhist learning in South Sikkim.'
  ]
};

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
}

// Hotspot data for Ravangla Monastery
const ravanglaHotspots = [
  {
    position: [0, 2.5, 2.5] as [number, number, number], // Front (Buddha head) - reduced height
    lineTarget: [0, 2.3, 0.5] as [number, number, number],
    title: "Main Prayer Hall (Assembly Hall / Lhakhang)",
    description: "A grand, beautifully decorated hall with tall pillars, painted walls, and detailed Tibetan designs. Inside, you'll find large Buddha statues, thangkas, and traditional butter-lamp shelves",
    color: "#EE4B2B"
  },
  {
    position: [2.2, 1.5, 1] as [number, number, number], // Right front - reduced
    lineTarget: [0.9, 1.8, 0.4] as [number, number, number],
    title: "Statues & Deities",
    description: "The monastery houses impressive statues of Buddha, Guru Padmasambhava, and other Mahayana Buddhist deities. The craftsmanship is detailed and vibrant — especially on the main shrine altar",
    color: "#EE4B2B"
  },
  {
    position: [-2.8, 0.8, 1.5] as [number, number, number], // Left front - reduced
    lineTarget: [-1.2, 0.8, 0.6] as [number, number, number],
    title: "Murals, Thangkas & Artwork",
    description: "The interior walls and ceilings are filled with colorful murals depicting Buddhist teachings, protector deities, and mandalas. The artwork represents Kagyu tradition styles and is visually rich",
    color: "#EE4B2B"
  },
  {
    position: [2.8, 1.3, 0] as [number, number, number], // Right side - reduced
    lineTarget: [1.2, 1.2, 0] as [number, number, number],
    title: "Prayer Wheel Corridor & Outer Courtyard",
    description: "The monastery has long rows of prayer wheels where visitors can walk and spin them clockwise while chanting or silently praying. The courtyard is open and often used for ceremonies and festival dances",
    color: "#EE4B2B"
  },
  {
    position: [-1.2, -0.7, -2.8] as [number, number, number], // Bottom back left
    lineTarget: [-0.4, 0, -1.1] as [number, number, number],
    title: "Monks' Quarters & Living Areas",
    description: "Around the monastery, you'll see areas where the monks live and train — often including a debate courtyard or learning rooms. The presence of young monks adds life and authenticity to the space",
    color: "#EE4B2B"
  },
  {
    position: [1.5, -0.5, 2.5] as [number, number, number], // Bottom front right
    lineTarget: [0.5, 0, 1] as [number, number, number],
    title: "Stupas & Small Shrines on the Grounds",
    description: "There are stupas and smaller prayer structures around the complex, which add to the spiritual landscape and are nice to explore during a slow walk",
    color: "#EE4B2B"
  }
];

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
  onHotspotHover: (hovered: boolean) => void;
}

function RavanglaModel({ isRotating, modelRef, onHotspotHover }: ModelProps) {
  const { scene } = useGLTF('/assets/Models/ravangla.glb');
  const isHoveredRef = useRef(false);

  const handleHotspotHover = (hovered: boolean) => {
    isHoveredRef.current = hovered;
    onHotspotHover(hovered);
  };

  useFrame((state, delta) => {
    if (modelRef.current && isRotating && !isHoveredRef.current) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  const clonedScene = scene.clone();

  return (
    <group ref={modelRef}>
      <primitive object={clonedScene} scale={2.5} position={[0, 0, 0]} />
      
      {/* Hotspots */}
      {ravanglaHotspots.map((hotspot, index) => (
        <Hotspot
          key={index}
          position={hotspot.position}
          lineTarget={hotspot.lineTarget}
          title={hotspot.title}
          description={hotspot.description}
          color={hotspot.color}
          onHover={handleHotspotHover}
        />
      ))}
    </group>
  );
}

const RavanglaTour = () => {
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = useState(true);
  const [isHotspotHovered, setIsHotspotHovered] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 10]);
  const modelRef = useRef<THREE.Group>(null);

  const handleHotspotHover = (hovered: boolean) => {
    setIsHotspotHovered(hovered);
  };

  const resetCamera = () => {
    setCameraPosition([0, 0, 10]);
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0);
    }
  };

  const zoomIn = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.max(prev[2] - 2, 4)]);
  };

  const zoomOut = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.min(prev[2] + 2, 20)]);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Full screen 3D Canvas */}
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
          powerPreference: "high-performance"
        }}
        className="w-full h-full"
      >
        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#D3AF37]/30 border-t-amber-500 rounded-full animate-spin mb-4" />
                <span className="text-[#D3AF37] text-lg font-medium">Loading Model...</span>
              </div>
            </Html>
          }
        >
          <PerspectiveCamera makeDefault position={cameraPosition} />

          {/* Lighting */}
          <ambientLight intensity={0.4} color="#fff5e6" />
          <directionalLight
            position={[10, 15, 10]}
            intensity={1.5}
            color="#ffd700"
            castShadow
          />
          <directionalLight
            position={[-10, 10, -10]}
            intensity={0.6}
            color="#4a9eff"
          />
          <pointLight position={[0, 15, 0]} intensity={0.4} color="#ff9500" />
          <spotLight
            position={[0, 25, 15]}
            angle={0.5}
            penumbra={1}
            intensity={1}
            color="#ffd700"
            castShadow
          />

          {/* Environment */}
          <Environment preset="sunset" />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -3, 0]}
            opacity={0.4}
            scale={30}
            blur={2.5}
            far={15}
          />

          {/* 3D Model */}
          <RavanglaModel 
            isRotating={isRotating && !isHotspotHovered} 
            modelRef={modelRef}
            onHotspotHover={handleHotspotHover}
          />

          {/* Orbit Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={4}
            maxDistance={20}
            autoRotate={isRotating}
            autoRotateSpeed={1}
            target={[0, 0, 0]}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>

      {/* Minimal Back Button - Top Left */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-[#650304]/60 backdrop-blur-md border-[#D3AF37]/30 text-[#D3AF37] hover:bg-[#650304]/80 hover:text-[#D3AF37] shadow-lg"
          onClick={() => navigate('/tours')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      {/* Home Button - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-[#650304]/60 backdrop-blur-md border-[#D3AF37]/30 text-[#D3AF37] hover:bg-[#650304]/80 hover:text-[#D3AF37] shadow-lg"
          onClick={() => navigate('/')}
        >
          <Home className="w-5 h-5" />
        </Button>
      </div>

      {/* Minimal Control Bar - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-3 bg-[#650304]/50 backdrop-blur-xl rounded-full px-4 py-3 border border-[#D3AF37]/20 shadow-2xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRotating(!isRotating)}
            className={`w-10 h-10 rounded-full transition-all ${isRotating
              ? 'bg-[#D3AF37] text-[#650304] hover:bg-[#E5C047]'
              : 'text-[#D3AF37]/70 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10'
              }`}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <div className="w-px h-6 bg-white/20" />

          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="w-10 h-10 rounded-full text-[#D3AF37]/70 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="w-10 h-10 rounded-full text-[#D3AF37]/70 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-white/20" />

          <Button
            variant="ghost"
            size="icon"
            onClick={resetCamera}
            className="w-10 h-10 rounded-full text-[#D3AF37]/70 hover:text-[#D3AF37] hover:bg-[#D3AF37]/10"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Voice Guide Chatbot */}
      <VoiceGuide modelInfo={ravanglaInfo} />
    </div>
  );
};

// Preload the model
useGLTF.preload('/assets/Models/ravangla.glb');

export default RavanglaTour;


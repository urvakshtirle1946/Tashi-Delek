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

// Rumtek Monastery Information for Voice Guide
const rumtekInfo: ModelInfo = {
  id: 'rumtek',
  name: 'Rumtek Monastery',
  location: 'Gangtok, Sikkim, India - situated at an altitude of 5,800 feet',
  established: '1966',
  description: 'Rumtek Monastery, also known as the Dharmachakra Centre, is one of the largest and most significant monasteries in Sikkim. It serves as the main seat of the Karma Kagyu lineage of Tibetan Buddhism outside Tibet.',
  history: 'The original Rumtek Monastery was built in 1740 by the 12th Karmapa, Changchub Dorje. After the 16th Karmapa, Rangjung Rigpe Dorje, fled Tibet in 1959 following the Chinese invasion, he chose Sikkim as his new home. With theثsupport of the Sikkimese royal family, he built the present monastery complex between 1961 and 1966, replicating the design of the original Tsurphu Monastery in Tibet.',
  architecture: 'The monastery showcases traditional Tibetan Buddhist architecture with intricate murals, thangka paintings, and statues. The main shrine houses a 4-story high statue of Buddha Shakyamuni. The complex includes the main temple, a golden stupa containing relics of the 16th Karmapa, the Karma Shri Nalanda Institute for Buddhist Studies, and monks\' quarters.',
  significance: 'Rumtek is the seat of the Karmapa, the head of the Karma Kagyu school of Tibetan Buddhism. It houses some of the most sacred Buddhist relics, including the famous Black Hat used in the Black Hat ceremony. The monastery is a center for Buddhist learning and meditation, attracting scholars and practitioners from around the world.',
  visitingHours: 'The monastery is open daily from 6:00 AM to 6:00 PM. Photography is not allowed inside the main shrine.',
  bestTimeToVisit: 'The best time to visit is from March to May and September to November when the weather is pleasant. During Losar (Tibetan New Year) and other festivals, special ceremonies are held.',
  nearbyAttractions: [
    'Lingdum Monastery',
    'Gangtok City',
    'Enchey Monastery',
    'Tsomgo Lake',
    'Nathula Pass',
    'Hanuman Tok'
  ],
  facts: [
    'The Golden Stupa at Rumtek contains the preserved relics of the 16th Karmapa and is covered with gold leaf.',
    'The monastery houses a 1000-year-old sacred Black Hat, used only in special ceremonies.',
    'Rumtek is designed as a replica of the original Tsurphu Monastery in Tibet.',
    'The monastery complex spans over 74 acres and took 5 years to complete.',
    'It is home to the Karma Shri Nalanda Institute, one of the most important centers for Buddhist philosophy.',
    'The monastery has a collection of rare Buddhist scriptures and texts rescued from Tibet.',
    'Every year, sacred Cham dances are performed during the Tibetan New Year celebrations.',
    'The 16th Karmapa personally designed many of the murals and artwork inside the monastery.'
  ]
};

// Hotspot data for Rumtek Monastery
const rumtekHotspots = [
  {
    position: [0, 1.8, 2.5] as [number, number, number], // Front - reduced height
    lineTarget: [0, 1.2, 0.8] as [number, number, number],
    title: "Main Temple Entrance",
    description: "The grand entrance adorned with traditional Tibetan Buddhist motifs and prayer wheels",
    color: "#D3AF37"
  },
  {
    position: [-2.5, 1.2, 0] as [number, number, number], // Left side - reduced
    lineTarget: [-1, 0.9, 0] as [number, number, number],
    title: "Golden Stupa",
    description: "Sacred stupa containing relics of the 16th Karmapa, covered in gold leaf",
    color: "#FFD700"
  },
  {
    position: [2.5, 1.5, 0.5] as [number, number, number], // Right side - reduced
    lineTarget: [1, 1.2, 0.2] as [number, number, number],
    title: "Prayer Hall",
    description: "Main shrine with 4-story high statue of Buddha Shakyamuni",
    color: "#FF6B6B"
  },
  {
    position: [0.5, -0.7, -2.5] as [number, number, number], // Bottom back
    lineTarget: [0.2, 0.1, -1] as [number, number, number],
    title: "Monks' Quarters",
    description: "Residential area where over 300 monks live and study Buddhist philosophy",
    color: "#4ECDC4"
  },
  {
    position: [-2.2, 1.8, 1.2] as [number, number, number], // Left front - reduced
    lineTarget: [-0.8, 1.4, 0.5] as [number, number, number],
    title: "Bell Tower",
    description: "Traditional bell used for calling monks to prayer sessions",
    color: "#95E1D3"
  },
  {
    position: [2, -0.5, -2] as [number, number, number], // Bottom right back
    lineTarget: [0.8, 0.2, -0.8] as [number, number, number],
    title: "Meditation Hall",
    description: "Quiet space for monks' daily meditation practice",
    color: "#FF9999"
  }
];

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
  onHotspotHover: (hovered: boolean) => void;
}

function RumtekModel({ isRotating, modelRef, onHotspotHover }: ModelProps) {
  const { scene } = useGLTF('/assets/Models/Rumtek.glb');
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
      {rumtekHotspots.map((hotspot, index) => (
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

const RumtekTour = () => {
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
                <div className="w-16 h-16 border-4 border-[#D3AF37]/30 border-t-[#D3AF37] rounded-full animate-spin mb-4" />
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
          <RumtekModel 
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

          <div className="w-px h-6 bg-[#D3AF37]/20" />

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

          <div className="w-px h-6 bg-[#D3AF37]/20" />

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
      <VoiceGuide modelInfo={rumtekInfo} />
    </div>
  );
};

// Preload the model
useGLTF.preload('/assets/Models/Rumtek.glb');

export default RumtekTour;

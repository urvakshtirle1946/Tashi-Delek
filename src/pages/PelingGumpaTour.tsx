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

// Peling Gumpa Monastery Information for Voice Guide
const pelingGumpaInfo: ModelInfo = {
  id: 'pelinggumpa',
  name: 'Peling Gumpa Monastery',
  location: 'Pelling, Sikkim, India - situated at an altitude of 6,800 feet',
  established: '1705',
  description: 'Peling Gumpa, also known as Pemayangtse Monastery, is one of the oldest and most important monasteries in Sikkim. It belongs to the Nyingma order of Tibetan Buddhism and offers breathtaking views of the Kanchenjunga mountain range.',
  history: 'The monastery was founded in 1705 by Lama Lhatsun Chempo, one of the three revered lamas who consecrated the first Chogyal (king) of Sikkim. The name "Pemayangtse" means "Perfect Sublime Lotus" in Tibetan. It was the main monastery of the Nyingma order in Sikkim and served as the seat of the Chogyal dynasty.',
  architecture: 'The monastery features traditional Tibetan architecture with three floors. The ground floor contains ancient murals and statues, the second floor houses the main prayer hall, and the third floor features the famous Zangdogpalri model - a seven-story wooden structure representing the celestial abode of Guru Padmasambhava.',
  significance: 'Peling Gumpa is the oldest monastery in Sikkim and holds great historical and spiritual significance. It is the head monastery of the Nyingma order in Sikkim and was the coronation site for the Chogyal kings. The monastery houses rare Buddhist artifacts and ancient scriptures.',
  visitingHours: 'The monastery is open daily from 9:00 AM to 5:00 PM. Photography may be restricted in certain areas.',
  bestTimeToVisit: 'The best time to visit is from March to May and September to November when the weather is clear and the mountain views are spectacular. During Losar and other festivals, special ceremonies are held.',
  nearbyAttractions: [
    'Pemayangtse Monastery',
    'Rabdentse Ruins',
    'Khecheopalri Lake',
    'Kanchenjunga Falls',
    'Singshore Bridge',
    'Sangachoeling Monastery'
  ],
  facts: [
    'Peling Gumpa is the oldest monastery in Sikkim, established in 1705.',
    'The monastery features the famous Zangdogpalri model, a seven-story wooden structure.',
    'It was the coronation site for the Chogyal kings of Sikkim.',
    'The monastery offers stunning views of the Kanchenjunga mountain range.',
    'It belongs to the Nyingma order, the oldest school of Tibetan Buddhism.',
    'The monastery houses rare Buddhist artifacts and ancient scriptures.',
    'Peling Gumpa was the main monastery of the Nyingma order in Sikkim.',
    'The monastery complex includes monks\' quarters and meditation halls.'
  ]
};

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
}

function PelingGumpaModel({ isRotating, modelRef }: ModelProps) {
  const { scene } = useGLTF('/assets/Models/pelinggumpa.glb');

  useFrame((state, delta) => {
    if (modelRef.current && isRotating) {
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  const clonedScene = scene.clone();

  return (
    <group ref={modelRef}>
      <primitive object={clonedScene} scale={2.5} position={[0, 0, 0]} />
    </group>
  );
}

const PelingGumpaTour = () => {
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 10]);
  const modelRef = useRef<THREE.Group>(null);

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
          <PelingGumpaModel isRotating={isRotating} modelRef={modelRef} />

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
      <VoiceGuide modelInfo={pelingGumpaInfo} />
    </div>
  );
};

// Preload the model
useGLTF.preload('/assets/Models/pelinggumpa.glb');

export default PelingGumpaTour;


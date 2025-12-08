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

// Enchey Monastery Information for Voice Guide
const encheyInfo: ModelInfo = {
  id: 'enchey',
  name: 'Enchey Monastery',
  location: 'Gangtok, Sikkim, India - situated at an altitude of 5,500 feet',
  established: '1909',
  description: 'Enchey Monastery is a beautiful Buddhist monastery belonging to the Nyingma order of Tibetan Buddhism. It is known for its peaceful ambiance and stunning architecture set against the backdrop of the Himalayas.',
  history: 'The monastery was built in 1909 by Lama Drupthob Karpo, a renowned Buddhist master. The name "Enchey" means "solitary temple" in the local language. It was constructed on the site where Lama Drupthob Karpo is said to have flown from Tibet, making it a place of great spiritual significance.',
  architecture: 'The monastery features traditional Tibetan architecture with colorful murals, intricate woodwork, and beautiful prayer wheels. The main shrine houses statues of Buddha, Guru Padmasambhava, and other important Buddhist deities. The complex includes the main temple, monks\' quarters, and a peaceful courtyard.',
  significance: 'Enchey Monastery is one of the most important monasteries of the Nyingma tradition in Sikkim. It is a center for Buddhist learning and meditation, attracting both local devotees and international visitors seeking spiritual peace.',
  visitingHours: 'The monastery is open daily from 6:00 AM to 6:00 PM. Visitors are welcome to participate in prayer sessions.',
  bestTimeToVisit: 'The best time to visit is from March to May and September to November when the weather is pleasant. During Losar (Tibetan New Year) and other festivals, special ceremonies are held.',
  nearbyAttractions: [
    'Gangtok City',
    'Rumtek Monastery',
    'Tsomgo Lake',
    'Nathula Pass',
    'Hanuman Tok',
    'Ganesh Tok'
  ],
  facts: [
    'The monastery is believed to be built on a site where a lama flew from Tibet.',
    'Enchey Monastery belongs to the Nyingma order, the oldest school of Tibetan Buddhism.',
    'The monastery offers stunning views of the Kanchenjunga mountain range.',
    'It is a popular destination for meditation and spiritual retreats.',
    'The monastery complex includes beautiful gardens and prayer flag areas.',
    'Enchey hosts annual religious festivals with traditional Cham dances.',
    'The monastery houses ancient Buddhist scriptures and thangka paintings.',
    'It is one of the most peaceful and serene monasteries in Gangtok.'
  ]
};

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
}

// Hotspot data for Enchey Monastery
const encheyHotspots = [
  {
    position: [0, 1.5, 2.2] as [number, number, number], // Front - reduced height
    lineTarget: [0, 1.2, 0.6] as [number, number, number],
    title: "Main prayer hall",
    description: "The main shrine hall of Enchey Monastery is adorned with vibrant murals, traditional thankas, sacred masks, and statues of important deities such as Guru Padmasambhava and Vajrakilaya. The hall is calm and spiritually charged, used for daily prayers, chanting, and ceremonial rituals",
    color: "#EE4B2B"
  },
  {
    position: [2.5, 1.3, 0] as [number, number, number], // Right side - reduced
    lineTarget: [1, 1.2, 0] as [number, number, number],
    title: "Location",
    description: "Situated about 3 km from Gangtok, the monastery stands atop a forested hill overlooking the town and the distant snow-covered Khangchendzonga range. At around 1,980 meters elevation, the site is believed to be blessed and protected by powerful guardian spirits",
    color: "#EE4B2B"
  },
  {
    position: [-2, -0.5, 2] as [number, number, number], // Bottom left front
    lineTarget: [-0.7, 0.1, 0.8] as [number, number, number],
    title: "Main gate",
    description: "The entrance follows classic monastic design with prayer wheels lining the pathway, symbolizing purification as visitors enter. The gate marks the transition from the everyday world to a sacred and blessed environment filled with spiritual significance",
    color: "#EE4B2B"
  },
  {
    position: [-2.5, 0.8, 1] as [number, number, number], // Left front - reduced
    lineTarget: [-0.9, 0.6, 0.4] as [number, number, number],
    title: "Artefacts, Statues, Masks & Religious Objects",
    description: "Inside the monastery you'll see statues of important deities like Buddha, Guru Padmasambhava, old manuscripts, and a notable collection of ritual masks used in ceremonies and masked-dance festivals",
    color: "#EE4B2B"
  },
  {
    position: [0, -0.7, -2.5] as [number, number, number], // Bottom back
    lineTarget: [0, 0, -0.9] as [number, number, number],
    title: "Monks' quarters",
    description: "The monastery includes simple living quarters for monks who reside there, practicing meditation, chanting, and Buddhist studies. The quarters reflect a disciplined lifestyle and remain an integral part of Enchey's living spiritual community",
    color: "#EE4B2B"
  },
  {
    position: [2, -0.5, 2.2] as [number, number, number], // Bottom right front
    lineTarget: [0.8, 0.1, 0.9] as [number, number, number],
    title: "Exterior",
    description: "The outdoors includes an open courtyard used for Cham mask dances during festivals like Pang Lhabsol and Losoong. Surrounded by prayer flags fluttering in the wind, the architecture reflects traditional Sikkimese craftsmanship and Tibetan Buddhist aesthetics, blending spiritual beauty with the natural mountain landscape",
    color: "#EE4B2B"
  }
];

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
  onHotspotHover: (hovered: boolean) => void;
}

function EncheyModel({ isRotating, modelRef, onHotspotHover }: ModelProps) {
  const { scene } = useGLTF('/assets/Models/encheymonasterymodel.glb');
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
      {encheyHotspots.map((hotspot, index) => (
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

const EncheyTour = () => {
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
          <EncheyModel 
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
      <VoiceGuide modelInfo={encheyInfo} />
    </div>
  );
};

// Preload the model
useGLTF.preload('/assets/Models/encheymonasterymodel.glb');

export default EncheyTour;


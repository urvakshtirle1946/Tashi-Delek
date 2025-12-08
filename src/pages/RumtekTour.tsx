import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
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
  Home,
  ArrowRight,
  X,
  Volume2,
  VolumeX,
  PauseCircle,
  PlayCircle
} from 'lucide-react';
import * as THREE from 'three';
import VoiceGuide, { ModelInfo } from '@/components/VoiceGuide';
import Hotspot from '@/components/3d/Hotspot';
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis';

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
    position: [2.5, 1.5, 0.5] as [number, number, number], // Right side - reduced
    lineTarget: [1, 1.2, 0.2] as [number, number, number],
    title: "Main prayer hall",
    description: "On the ground floor of the main monastery, there is a large prayer hall decorated with murals, thankas, silk paintings and statues. The interiors and exteriors of are richly decorated with intricate woodwork, carved pillars, painted murals, and traditional motifs",
    color: "#EE4B2B"
  },
  {
    position: [0, 1.8, 2.5] as [number, number, number], // Front - reduced height
    lineTarget: [0, 1.2, 0.8] as [number, number, number],
    title: "Main gate",
    description: "The entrance to Rumtek is designed following traditional Tibetan-monastic aesthetics, marking a formal threshold between the secular world outside and the sacred monastic precincts",
    color: "#EE4B2B"
  },
  {
    position: [-2.2, 1.8, 1.2] as [number, number, number], // Left front - reduced
    lineTarget: [-0.8, 1.4, 0.5] as [number, number, number],
    title: "Location",
    description: "Located about 24 km from Gangtok at an altitude around 1,500 m, the monastery overlooks lush hills, valleys and misty mountains",
    color: "#EE4B2B"
  },
  {
    position: [-2.5, 1.2, 0] as [number, number, number], // Left side - reduced
    lineTarget: [-1, 0.9, 0] as [number, number, number],
    title: "Golden Stupa",
    description: "A sacred stupa housing the relics of the 16th Karmapa. Decorated with gold and jewels, it represents Tibetan craftsmanship and spiritual symbolism",
    color: "#EE4B2B"
  },
  {
    position: [0.5, -0.7, -2.5] as [number, number, number], // Bottom back
    lineTarget: [0.2, 0.1, -1] as [number, number, number],
    title: "Monks quarter",
    description: "The monks' quarters house the resident monks who live, study, and meditate at the monastery. Built in a simple traditional Tibetan style, they reflect the discipline and modes lifestyle of monastic life",
    color: "#EE4B2B"
  },
  {
    position: [2, -0.5, -2] as [number, number, number], // Bottom right back
    lineTarget: [0.8, 0.2, -0.8] as [number, number, number],
    title: "Exterior",
    description: "The exterior areas of the monastery include the courtyard, walkways, and select terrace spaces. The architecture reflects traditional Tibetan design, with clean lines and open gathering spaces. In clear weather, these areas offer wide views of the surrounding hills and valleys",
    color: "#EE4B2B"
  }
];

interface ModelProps {
  isRotating: boolean;
  modelRef: React.RefObject<THREE.Group>;
  onHotspotHover: (hovered: boolean) => void;
  currentHotspotIndex?: number;
  isGuidedTour?: boolean;
}

// Camera Controller for smooth transitions
function CameraController({ 
  targetPosition, 
  targetLookAt,
  enabled 
}: { 
  targetPosition: [number, number, number] | null;
  targetLookAt: [number, number, number] | null;
  enabled: boolean;
}) {
  const { camera } = useThree();

  useFrame(() => {
    if (!enabled || !targetPosition || !targetLookAt) return;
    
    // Smoothly interpolate camera position
    camera.position.lerp(new THREE.Vector3(...targetPosition), 0.05);
    
    // Make camera look at target
    const lookAtVector = new THREE.Vector3(...targetLookAt);
    camera.lookAt(lookAtVector);
  });

  return null;
}

function RumtekModel({ isRotating, modelRef, onHotspotHover, currentHotspotIndex, isGuidedTour }: ModelProps) {
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
          isHighlighted={isGuidedTour && currentHotspotIndex === index}
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
  
  // Guided tour state
  const [isGuidedTour, setIsGuidedTour] = useState(false);
  const [showIntroDialog, setShowIntroDialog] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0 = intro, 1-N = hotspots
  const [showHotspotDialog, setShowHotspotDialog] = useState(false);
  const [targetCameraPosition, setTargetCameraPosition] = useState<[number, number, number] | null>(null);
  const [targetLookAt, setTargetLookAt] = useState<[number, number, number] | null>(null);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  
  // Speech Synthesis hook
  const { speak, stop, pause, resume, isSpeaking, isPaused } = useSpeechSynthesis();

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

  // Guided tour functions
  const handleStartTour = () => {
    stop(); // Stop any ongoing speech
    setShowIntroDialog(false);
    setIsGuidedTour(true);
    setShowModel(true);
    setCurrentStep(1);
    // Show first hotspot dialog after a short delay
    setTimeout(() => {
      setShowHotspotDialog(true);
      focusOnHotspot(0);
    }, 500);
  };

  const focusOnHotspot = (index: number) => {
    if (index >= 0 && index < rumtekHotspots.length) {
      const hotspot = rumtekHotspots[index];
      const [x, y, z] = hotspot.position;
      
      // Calculate camera position to look at the hotspot
      // Position camera slightly away from hotspot for better view
      const distance = 7;
      const angle = Math.PI / 4; // 45 degrees
      const cameraX = x + distance * Math.cos(angle);
      const cameraY = y + 2; // Slightly above
      const cameraZ = z + distance * Math.sin(angle);
      
      // Set target positions for smooth interpolation
      setTargetCameraPosition([cameraX, cameraY, cameraZ]);
      setTargetLookAt([x, y, z]);
    }
  };

  const handleNextHotspot = () => {
    if (currentStep < rumtekHotspots.length) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      if (nextStep <= rumtekHotspots.length) {
        focusOnHotspot(nextStep - 1);
        setShowHotspotDialog(true);
      } else {
        // Tour complete
        handleEndTour();
      }
    }
  };

  const handlePreviousHotspot = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      focusOnHotspot(prevStep - 1);
      setShowHotspotDialog(true);
    }
  };

  const handleEndTour = () => {
    stop(); // Stop any ongoing speech
    setShowHotspotDialog(false);
    setIsGuidedTour(false);
    setCurrentStep(0);
    resetCamera();
  };

  const handleSkipTour = () => {
    stop(); // Stop any ongoing speech
    setShowIntroDialog(false);
    setShowModel(true);
    setIsGuidedTour(false);
  };

  // Speak intro text when dialog opens
  useEffect(() => {
    if (showIntroDialog && isVoiceEnabled) {
      const introText = `Welcome to ${rumtekInfo.name}. ${rumtekInfo.description}. Located at ${rumtekInfo.location}. Established in ${rumtekInfo.established}.`;
      speak(introText);
    }
    return () => {
      if (showIntroDialog) {
        stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showIntroDialog]);

  // Effect to update camera when guided tour step changes
  useEffect(() => {
    if (isGuidedTour && currentStep > 0 && currentStep <= rumtekHotspots.length) {
      focusOnHotspot(currentStep - 1);
    }
  }, [currentStep, isGuidedTour]);

  // Speak hotspot description when dialog appears
  useEffect(() => {
    if (showHotspotDialog && isGuidedTour && isVoiceEnabled && currentStep > 0 && currentStep <= rumtekHotspots.length) {
      const hotspot = rumtekHotspots[currentStep - 1];
      speak(`${hotspot.title}. ${hotspot.description}`);
    }
    return () => {
      if (showHotspotDialog) {
        stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showHotspotDialog, currentStep, isGuidedTour]);

  // Cleanup: Stop speech when component unmounts (navigating away)
  useEffect(() => {
    return () => {
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {showModel && (
            <RumtekModel 
              isRotating={isRotating && !isHotspotHovered && !isGuidedTour} 
              modelRef={modelRef}
              onHotspotHover={handleHotspotHover}
              currentHotspotIndex={isGuidedTour ? currentStep - 1 : undefined}
              isGuidedTour={isGuidedTour}
            />
          )}

          {/* Camera Controller for Guided Tour */}
          {isGuidedTour && targetCameraPosition && targetLookAt && (
            <CameraController
              targetPosition={targetCameraPosition}
              targetLookAt={targetLookAt}
              enabled={isGuidedTour}
            />
          )}

          {/* Orbit Controls */}
          <OrbitControls
            enablePan={!isGuidedTour}
            enableZoom={!isGuidedTour}
            enableRotate={!isGuidedTour}
            minDistance={4}
            maxDistance={20}
            autoRotate={isRotating && !isGuidedTour}
            autoRotateSpeed={1}
            target={targetLookAt || [0, 0, 0]}
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
      {!isGuidedTour && <VoiceGuide modelInfo={rumtekInfo} />}

      {/* Intro Dialog - Centered at start */}
      {showIntroDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={handleSkipTour} />
          {/* Dialog card */}
          <div className="relative bg-[#650304]/95 backdrop-blur-md border-2 border-[#D3AF37] text-[#D3AF37] rounded-lg p-6 shadow-2xl max-w-md w-full">
            <div className="absolute top-4 right-4 flex gap-2">
              {/* Pause/Play Button */}
              {isVoiceEnabled && (isSpeaking || isPaused) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (isPaused) {
                      resume();
                    } else if (isSpeaking) {
                      pause();
                    }
                  }}
                  className="text-[#D3AF37] hover:bg-[#D3AF37]/10 z-10"
                  style={{ position: 'relative' }}
                >
                  {isPaused ? (
                    <PlayCircle className="w-4 h-4" />
                  ) : (
                    <PauseCircle className="w-4 h-4" />
                  )}
                </Button>
              )}
              {/* Mute/Unmute Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newVoiceEnabled = !isVoiceEnabled;
                  setIsVoiceEnabled(newVoiceEnabled);
                  if (!newVoiceEnabled) {
                    stop();
                  } else {
                    const introText = `Welcome to ${rumtekInfo.name}. ${rumtekInfo.description}. Located at ${rumtekInfo.location}. Established in ${rumtekInfo.established}.`;
                    speak(introText);
                  }
                }}
                className="text-[#D3AF37] hover:bg-[#D3AF37]/10"
              >
                {isVoiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="mb-3">
              <h2 className="text-xl font-bold mb-2 text-[#D3AF37]">Welcome to Rumtek Monastery</h2>
              <p className="text-[#D3AF37]/90 text-sm leading-relaxed line-clamp-3">
                {rumtekInfo.description}
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="text-xs text-[#D3AF37]/80">
                <p className="text-[#D3AF37]/80"><strong className="text-[#D3AF37]">Location:</strong> {rumtekInfo.location}</p>
                <p className="text-[#D3AF37]/80"><strong className="text-[#D3AF37]">Established:</strong> {rumtekInfo.established}</p>
              </div>
              <div className="flex gap-2 pt-3">
                <Button
                  onClick={handleStartTour}
                  className="flex-1 bg-[#D3AF37] text-[#650304] hover:bg-[#E5C047] font-semibold text-sm"
                >
                  Start Tour
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSkipTour}
                  variant="outline"
                  size="sm"
                  className="border-[#D3AF37] text-[#D3AF37] hover:bg-[#D3AF37]/10"
                >
                  Skip
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hotspot Dialog - Positioned at bottom right */}
      {showHotspotDialog && isGuidedTour && (
        <div className="fixed bottom-8 right-8 z-50 max-w-sm">
          <div className="bg-[#650304]/95 backdrop-blur-md border-2 border-[#D3AF37] text-[#D3AF37] rounded-lg p-4 shadow-2xl">
            <div className="absolute top-2 right-2 flex gap-1">
              {/* Pause/Play Button */}
              {isVoiceEnabled && (isSpeaking || isPaused) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (isPaused) {
                      resume();
                    } else if (isSpeaking) {
                      pause();
                    }
                  }}
                  className="text-[#D3AF37] hover:bg-[#D3AF37]/10 h-6 w-6 z-10"
                  style={{ position: 'relative' }}
                >
                  {isPaused ? (
                    <PlayCircle className="w-3 h-3" />
                  ) : (
                    <PauseCircle className="w-3 h-3" />
                  )}
                </Button>
              )}
              {/* Mute/Unmute Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const newVoiceEnabled = !isVoiceEnabled;
                  setIsVoiceEnabled(newVoiceEnabled);
                  if (!newVoiceEnabled) {
                    stop();
                  } else if (currentStep > 0 && currentStep <= rumtekHotspots.length) {
                    const hotspot = rumtekHotspots[currentStep - 1];
                    speak(`${hotspot.title}. ${hotspot.description}`);
                  }
                }}
                className="text-[#D3AF37] hover:bg-[#D3AF37]/10 h-6 w-6"
              >
                {isVoiceEnabled ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <VolumeX className="w-3 h-3" />
                )}
              </Button>
            </div>
            <div className="mb-3">
              <h2 className="text-lg font-bold mb-2 text-[#D3AF37]">
                {currentStep > 0 && currentStep <= rumtekHotspots.length 
                  ? rumtekHotspots[currentStep - 1].title 
                  : 'Hotspot'}
              </h2>
              <p className="text-[#D3AF37]/90 text-sm leading-relaxed">
                {currentStep > 0 && currentStep <= rumtekHotspots.length 
                  ? rumtekHotspots[currentStep - 1].description 
                  : ''}
              </p>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#D3AF37]/20">
              <div className="text-xs text-[#D3AF37]/70">
                {currentStep}/{rumtekHotspots.length}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handlePreviousHotspot}
                  size="sm"
                  variant="outline"
                  disabled={currentStep === 1}
                  className="border-[#D3AF37] text-[#D3AF37] hover:bg-[#D3AF37]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="mr-2 w-3 h-3" />
                  Previous
                </Button>
                {currentStep < rumtekHotspots.length ? (
                  <Button
                    onClick={handleNextHotspot}
                    size="sm"
                    className="bg-[#D3AF37] text-[#650304] hover:bg-[#E5C047] font-semibold"
                  >
                    Next
                    <ArrowRight className="ml-2 w-3 h-3" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleEndTour}
                    size="sm"
                    className="bg-[#D3AF37] text-[#650304] hover:bg-[#E5C047] font-semibold"
                  >
                    Complete
                  </Button>
                )}
                <Button
                  onClick={handleEndTour}
                  variant="outline"
                  size="sm"
                  className="border-[#D3AF37] text-[#D3AF37] hover:bg-[#D3AF37]/10 px-2"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Preload the model
useGLTF.preload('/assets/Models/Rumtek.glb');

export default RumtekTour;

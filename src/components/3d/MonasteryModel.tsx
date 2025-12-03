import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, PerspectiveCamera } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, ZoomIn, ZoomOut, Camera, Maximize2, RotateCw } from 'lucide-react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface ModelProps {
  url: string;
  isRotating: boolean;
}

function Model({ url, isRotating }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useFrame((state, delta) => {
    if (group.current && isRotating) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  const clonedScene = scene.clone();

  return (
    <group ref={group}>
      <primitive object={clonedScene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

interface MonasteryModelProps {
  title?: string;
  description?: string;
  className?: string;
}

const MonasteryModel = ({ 
  title = "Interactive 3D Monastery", 
  description = "Explore every detail in 3D",
  className = ""
}: MonasteryModelProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
  const [isRotating, setIsRotating] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  // Handle WebGL context lost/restored
  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.warn('WebGL context lost. The 3D model may need to be reloaded.');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored');
      // The canvas will automatically re-render
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  const resetCamera = () => {
    setCameraPosition([0, 0, 5]);
  };

  const zoomIn = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.max(prev[2] - 1, 1)]);
  };

  const zoomOut = () => {
    setCameraPosition(prev => [prev[0], prev[1], Math.min(prev[2] + 1, 10)]);
  };

  const containerClasses = cn(
    'relative rounded-xl overflow-hidden bg-gradient-to-b from-background to-secondary/20 transition-all',
    isFullscreen && 'fixed inset-0 z-[60] bg-background/95 px-4 sm:px-8 py-8',
    className,
  );

  const canvasHeightClass = isFullscreen ? 'h-[calc(100vh-6rem)]' : 'h-[500px]';

  return (
    <div className={containerClasses}>
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Badge className="mb-2 bg-monastery-gold/90 text-primary-foreground backdrop-blur-sm">
            <Camera className="w-3 h-3 mr-1" />
            3D Interactive
          </Badge>
          <h3 className="text-lg font-semibold text-foreground drop-shadow-md">{title}</h3>
          <p className="text-sm text-muted-foreground drop-shadow-sm">{description}</p>
        </div>
        <div className="pointer-events-auto">
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-border/50"
            onClick={() => setIsFullscreen(!isFullscreen)}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            data-interactive
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div ref={canvasRef} className={`${canvasHeightClass} w-full relative z-0`}>
        <Canvas
          camera={{ 
            position: cameraPosition as [number, number, number], 
            fov: 45,
            near: 0.1,
            far: 100 
          }}
          gl={{ 
            antialias: window.devicePixelRatio < 2, 
            alpha: true,
            preserveDrawingBuffer: false,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <Suspense 
            fallback={
              <Html center>
                <div className="flex items-center space-x-2 text-foreground">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span>Loading 3D Model...</span>
                </div>
              </Html>
            }
          >
            <PerspectiveCamera makeDefault position={cameraPosition as [number, number, number]} />
            
            {/* Lighting setup for monastery ambiance */}
            <ambientLight intensity={0.4} color="#fff5e6" />
            <directionalLight 
              position={[10, 10, 5]} 
              intensity={1} 
              color="#ffd700" 
              castShadow 
            />
            <pointLight position={[-10, 0, -20]} color="#ff6b35" intensity={0.3} />
            <spotLight
              position={[0, 20, 0]}
              angle={0.3}
              penumbra={1}
              intensity={0.5}
              color="#ffd700"
              castShadow
            />

            {/* Environment for realistic reflections */}
            <Environment preset="sunset" />

            {/* 3D Model */}
            <Model url="/assets/Models/Rumtek.glb" isRotating={isRotating} />

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
              autoRotate={isRotating}
              autoRotateSpeed={2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Control Panel - Compact */}
      <div className="absolute bottom-2 left-2 right-2 z-10 pointer-events-none">
        <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-lg px-2 py-1.5 pointer-events-auto">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRotating(!isRotating)}
                className="bg-background/50 h-8 px-2"
                title={isRotating ? 'Stop rotation' : 'Start rotation'}
              >
                {isRotating ? (
                  <RotateCw className="w-3.5 h-3.5" />
                ) : (
                  <RotateCcw className="w-3.5 h-3.5" />
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetCamera} 
                className="bg-background/50 h-8 px-2"
                title="Reset view"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={zoomOut} 
                className="bg-background/50 h-8 px-2"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={zoomIn} 
                className="bg-background/50 h-8 px-2"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </Button>
              <Button 
                variant="monastery" 
                size="sm"
                className="h-8 px-2 text-xs"
                title="Start full tour"
              >
                <Camera className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hotspots Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4">
          <span className="block w-4 h-4 bg-monastery-gold rounded-full border-2 border-primary-foreground animate-pulse shadow-lg" />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <span className="block w-4 h-4 bg-monastery-red rounded-full border-2 border-primary-foreground animate-pulse shadow-lg" />
        </div>
        <div className="absolute bottom-1/3 left-1/3">
          <span className="block w-4 h-4 bg-monastery-blue rounded-full border-2 border-primary-foreground animate-pulse shadow-lg" />
        </div>
      </div>
    </div>
  );
};

// Removed preload for better initial page load performance
// Models will load on-demand when component mounts

export default MonasteryModel;
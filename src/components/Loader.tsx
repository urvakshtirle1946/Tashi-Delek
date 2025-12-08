import { useState, useEffect, useRef } from "react";
import { useAudio } from "@/contexts/AudioContext";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [isFading, setIsFading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { startAudio } = useAudio();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Hide spinner when video can play
    const handleCanPlay = () => {
      setShowSpinner(false);
    };

    // Configure video - keep it muted for autoplay
    video.muted = true;
    video.volume = 0;

    // Add event listeners
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", () => handleVideoEnd());

    // Start playing video immediately (muted, so it can autoplay)
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        // If autoplay fails, still hide loader after a delay
        setTimeout(() => {
          handleVideoEnd();
        }, 2000);
      }
    };

    // Start playing immediately
    playVideo();

    // Fallback: hide loader after max 10 seconds
    const timeout = setTimeout(() => {
      handleVideoEnd();
    }, 10000);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", () => handleVideoEnd());
      clearTimeout(timeout);
    };
  }, []);

  // Handle user interaction to start audio
  const handleUserInteraction = () => {
    // Start audio when user clicks/touches anywhere on the loader
    startAudio();
  };

  const handleVideoEnd = () => {
    setIsFading(true);
    // Disable pointer events immediately to prevent clicks from reaching through
    setTimeout(() => {
      onComplete();
    }, 500); // Fade out duration
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        handleUserInteraction();
      }}
      onTouchStart={(e) => {
        e.stopPropagation();
        handleUserInteraction();
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
        autoPlay
        muted
      >
        <source src="/assets/Loader.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading spinner overlay - only shows while video is loading */}
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Loader;


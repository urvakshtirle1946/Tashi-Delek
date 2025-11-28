import { createContext, useContext, useRef, useState, ReactNode } from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  toggleMute: () => void;
  startAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  const startAudio = () => {
    if (audioRef.current) {
      // Configure audio settings
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.loop = true;
      
      // Try to play audio immediately - it will overlap with the loader video
      // The unmuted video play has established media engagement, unlocking audio autoplay
      if (audioRef.current.paused) {
        // Start audio immediately so it overlaps with video
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Audio started successfully - now playing simultaneously with video
              // No user interaction needed - audio overlaps with loader video
              setIsMuted(false);
            })
            .catch(() => {
              // Autoplay was prevented (shouldn't happen if video played unmuted)
            });
        }
      } else {
        // Audio is already playing - overlapping with video
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          // Handle play error
        });
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isMuted, setIsMuted, toggleMute, startAudio }}>
      <audio ref={audioRef} src="/assets/Prayer.mp3" preload="auto" />
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};


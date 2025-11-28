import { Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

interface MuteButtonProps {
  className?: string;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

const MuteButton = ({ className, position = "bottom-left" }: MuteButtonProps) => {
  const { isMuted, toggleMute } = useAudio();

  const positionClasses = {
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
  };

  return (
    <button
      onClick={toggleMute}
      className={`fixed ${positionClasses[position]} z-50 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-gentle hover:shadow-monastery transition-all hover:scale-110 ${className || ""}`}
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      {isMuted ? (
        <VolumeX className="w-4 h-4 text-foreground" />
      ) : (
        <Volume2 className="w-4 h-4 text-foreground" />
      )}
    </button>
  );
};

export default MuteButton;


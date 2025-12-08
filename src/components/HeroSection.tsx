import { Button } from "@/components/ui/button";
import { Play, MapPin, Camera, Volume2, VolumeX, ChevronDown } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const { isMuted, toggleMute } = useAudio();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays smoothly on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay may be blocked; user interaction required
      });
    }
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Video - Behind everything */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/assets/Sikkim monastery B-Roll Film.mp3" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Atmospheric Overlay - Brown/Gold gradient at 25% opacity */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B5E29]/30 via-[#D6A85A]/20 to-[#8B5E29]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3D2914]/25 via-transparent to-[#3D2914]/25" />

        {/* Subtle vignette effect for cinematic feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(61,41,20,0.4)_100%)]" />
      </div>

      {/* Mute/Unmute Button - Bottom Left Corner */}
      <button
        onClick={toggleMute}
        className="absolute bottom-24 left-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/20 hover:border-[#D6A85A]/50 transition-all duration-300 hover:scale-110 group"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white/90 group-hover:text-[#D6A85A]" />
        ) : (
          <Volume2 className="w-5 h-5 text-[#D6A85A] group-hover:text-[#D6A85A]" />
        )}
      </button>

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="space-y-10">
          {/* Location Badge - Clean rounded pill with soft shadow */}
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/15 transition-all duration-300">
            <MapPin className="w-4 h-4 text-[#D6A85A] mr-2.5" />
            <span className="text-sm font-medium text-white/95 tracking-wide">200+ Monasteries • Sikkim, India</span>
          </div>

          {/* Main Heading - Premium Golden Gradient */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="block text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                Explore Sikkim's
              </span>
              <span className="block bg-gradient-to-r from-[#D6A85A] via-[#F4D58D] to-[#8B5E29] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(214,168,90,0.3)] mt-2">
                Sacred Heritage
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
              Immerse yourself in 3D virtual tours of ancient monasteries and discover the mystical beauty of the Himalayas.
            </p>
          </div>

          {/* CTA Buttons - Premium styling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            {/* Golden Gradient Button */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#D6A85A] via-[#C9A050] to-[#8B5E29] text-[#1a1207] font-semibold shadow-[0_10px_40px_rgba(214,168,90,0.4)] hover:shadow-[0_15px_50px_rgba(214,168,90,0.6)] hover:scale-105 transition-all duration-300 px-8 py-6 text-base rounded-full border border-[#D6A85A]/30 group"
              asChild
            >
              <a href="/tours">
                <Camera className="w-5 h-5 mr-2.5 group-hover:rotate-12 transition-transform duration-300" />
                Start Virtual Tour
              </a>
            </Button>

            {/* Minimal White Button */}
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white font-medium border border-white/30 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_10px_40px_rgba(255,255,255,0.15)] backdrop-blur-sm transition-all duration-300 px-8 py-6 text-base rounded-full group"
              asChild
            >
              <a href="/packages">
                <Play className="w-5 h-5 mr-2.5 group-hover:scale-110 transition-transform duration-300" />
                Watch Preview
              </a>
            </Button>
          </div>

          {/* Quick Stats - Premium cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { value: "200+", label: "Monasteries", color: "text-[#D6A85A]" },
              { value: "3D", label: "Virtual Tours", color: "text-[#F4D58D]" },
              { value: "500+", label: "Years History", color: "text-[#D6A85A]" },
              { value: "24/7", label: "Access", color: "text-[#F4D58D]" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-[#D6A85A]/30 transition-all duration-300 group"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-sm text-white/70 mt-1 font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Golden glowing, centered, above video */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="text-xs text-white/60 font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-8 h-14 border-2 border-[#D6A85A]/50 rounded-full flex justify-center p-2 shadow-[0_0_20px_rgba(214,168,90,0.3)] hover:border-[#D6A85A] transition-colors duration-300">
            <div className="w-1.5 h-3 bg-gradient-to-b from-[#D6A85A] to-[#8B5E29] rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
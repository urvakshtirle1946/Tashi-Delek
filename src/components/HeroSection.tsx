import { Button } from "@/components/ui/button";
import { Play, MapPin, Camera, Calendar, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import heroImage from "@/assets/monastery-hero.jpg";

const HeroSection = () => {
  const { isMuted, toggleMute } = useAudio();

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Beautiful Sikkim monastery in Himalayan mountains at sunrise"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-monastery-terracotta-red/20 bg-gradient-to-b from-monastery-terracotta-red/25 via-monastery-terracotta-red/15 to-monastery-terracotta-red/25" />
      </div>
      
      {/* Mute/Unmute Button - Bottom Left Corner */}
      <button
        onClick={toggleMute}
        className="absolute bottom-4 left-4 z-50 p-2 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-gentle hover:shadow-monastery transition-all hover:scale-110"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-foreground" />
        ) : (
          <Volume2 className="w-4 h-4 text-foreground" />
        )}
      </button>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-card/95 backdrop-blur-md border border-border shadow-gentle">
            <MapPin className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-foreground font-semibold">200+ Monasteries • Sikkim, India</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-deep-earth-brown leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
              Explore Sikkim's
              <br />
              <span className="bg-gradient-to-r from-deep-earth-brown via-monastery-gold to-monastery-himalayan-maroon bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]">
                Sacred Heritage
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] font-medium">
              Immerse yourself in 3D virtual tours of ancient monasteries, discover rich cultural traditions, 
              and plan your spiritual journey through the mystical lands of Sikkim.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              className="ml-4 bg-gradient-to-r from-primary to-monastery-gold shadow-monastery hover:shadow-lg transition-[var(--transition-monastery)] group px-8"
              asChild
            >
              <a href="/tours">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform" />
                Start Virtual Tour
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary/30 hover:border-primary hover:bg-primary/5 backdrop-blur-sm bg-card/80 px-8"
              asChild
            >
              <a href="/packages">
                <Play className="w-5 h-5 mr-2" />
                Watch Preview
              </a>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center space-y-2 p-4 rounded-lg bg-card/90 backdrop-blur-md border border-border/50 shadow-gentle">
              <div className="text-2xl md:text-3xl font-bold text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">200+</div>
              <div className="text-sm text-foreground font-medium">Monasteries</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-card/90 backdrop-blur-md border border-border/50 shadow-gentle">
              <div className="text-2xl md:text-3xl font-bold text-monastery-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">3D</div>
              <div className="text-sm text-foreground font-medium">Virtual Tours</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-card/90 backdrop-blur-md border border-border/50 shadow-gentle">
              <div className="text-2xl md:text-3xl font-bold text-monastery-blue drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">500+</div>
              <div className="text-sm text-foreground font-medium">Years History</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-lg bg-card/90 backdrop-blur-md border border-border/50 shadow-gentle">
              <div className="text-2xl md:text-3xl font-bold text-monastery-red drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">24/7</div>
              <div className="text-sm text-foreground font-medium">Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
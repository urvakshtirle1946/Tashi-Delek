import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Box, ArrowLeft } from "lucide-react";
import { DestinationCard } from "@/components/ui/card-21";
import MonasteryModel from "@/components/3d/MonasteryModel";
import MuteButton from "@/components/MuteButton";

const VirtualTours = () => {
  const navigate = useNavigate();
  
  const tours = [
    {
      id: 1,
      name: "Rumtek Monastery",
      description: "Explore the most significant monastery in Sikkim, seat of the Karmapa lineage",
      duration: "45 min",
      rating: 4.9,
      visitors: "12.5k",
      era: "1960s",
      location: "Gangtok",
      imageUrl: "/assets/Monaestries/Rumtek.jpeg",
      flag: "🇮🇳",
      themeColor: "200 50% 30%", // Deep blue-purple for spiritual
      features: ["3D Interior", "Audio Guide", "Historical Timeline", "Prayer Wheel Simulation"]
    },
    {
      id: 2,
      name: "Pemayangtse Monastery",
      description: "One of the oldest monasteries in Sikkim with stunning mountain views",
      duration: "35 min",
      rating: 4.8,
      visitors: "8.2k",
      era: "1705",
      location: "Pelling",
      imageUrl: "/assets/Monaestries/Pemayangtse.jpeg",
      flag: "🇮🇳",
      themeColor: "25 60% 35%", // Rich orange-gold for ancient
      features: ["Mountain Views", "Ancient Murals", "Sacred Relics", "Meditation Hall"]
    },
    {
      id: 3,
      name: "Enchey Monastery",
      description: "A peaceful retreat with beautiful architecture and spiritual ambiance",
      duration: "30 min",
      rating: 4.7,
      visitors: "6.8k",
      era: "1909",
      location: "Gangtok",
      imageUrl: "/assets/Monaestries/Enchey.jpeg",
      flag: "🇮🇳",
      themeColor: "150 50% 25%", // Deep green for peace
      features: ["Sacred Sculptures", "Prayer Flags", "Peaceful Gardens", "Traditional Architecture"]
    }
  ];

  const handleTourClick = (e: React.MouseEvent<HTMLAnchorElement>, tourId: number) => {
    e.preventDefault();
    const tour = tours.find(t => t.id === tourId);
    if (tour) {
      // Navigate to tours page and scroll to 3D model section
      navigate('/tours');
      setTimeout(() => {
        const modelSection = document.querySelector('[data-3d-model]');
        if (modelSection) {
          modelSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen">
      <MuteButton position="bottom-left" />
      <main className="pt-24 sm:pt-28">
        {/* Header */}
        <section className="py-12 -mt-24 sm:-mt-28 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Button 
                variant="outline" 
                className="mr-4"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Camera className="w-3 h-3 mr-2" />
                Virtual Reality Experience
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Immersive 3D
                <span className="bg-gradient-to-r from-primary to-monastery-gold bg-clip-text text-transparent"> Virtual Tours</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Step inside ancient monasteries from anywhere in the world. Experience the sacred atmosphere, 
                explore intricate details, and learn about centuries of spiritual tradition through cutting-edge technology.
              </p>
            </div>

            {/* Featured 3D Model */}
            <div className="mb-16" data-3d-model>
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-monastery-gold/10 text-monastery-gold hover:bg-monastery-gold/20">
                  <Box className="w-3 h-3 mr-2" />
                  Interactive 3D Experience
                </Badge>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Explore in Full 3D
                </h2>
                <p className="text-muted-foreground">
                  Interact with our detailed 3D monastery model. Click and drag to explore every angle.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <MonasteryModel 
                  title="Sacred Architecture in 3D"
                  description="Click and drag to explore • Scroll to zoom • Interactive hotspots"
                  className="shadow-monastery"
                />
              </div>
            </div>

            {/* Tours Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <div key={tour.id} className="w-full h-[450px]">
                  <DestinationCard
                    imageUrl={tour.imageUrl}
                    location={tour.name}
                    flag={tour.flag}
                    stats={`${tour.rating} ⭐ • ${tour.duration} • ${tour.visitors} visitors`}
                    href="#"
                    themeColor={tour.themeColor}
                    onClick={(e) => handleTourClick(e, tour.id)}
                  />
                </div>
              ))}
            </div>

            {/* Additional Features */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">Explore All Monasteries</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2">200+ Monasteries</h4>
                  <p className="text-sm text-muted-foreground">Complete collection across Sikkim</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2">Offline Access</h4>
                  <p className="text-sm text-muted-foreground">Download tours for remote locations</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2">Expert Commentary</h4>
                  <p className="text-sm text-muted-foreground">Learn from Buddhist scholars and historians</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VirtualTours;
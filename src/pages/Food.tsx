import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, ArrowLeft, MapPin, Star, Clock, Users, Camera, Smartphone } from "lucide-react";
import MuteButton from "@/components/MuteButton";

const FoodPage = () => {
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);

  const foodRecommendations = [
    {
      id: 1,
      name: "Traditional Thukpa",
      description: "Hearty Tibetan noodle soup perfect after monastery visits",
      rating: 4.8,
      price: "₹150-250",
      location: "Near Rumtek Monastery",
      cuisine: "Tibetan",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Momos & Butter Tea",
      description: "Authentic steamed dumplings with traditional butter tea",
      rating: 4.9,
      price: "₹100-180",
      location: "Gangtok Market",
      cuisine: "Tibetan",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Sikkimese Gundruk",
      description: "Fermented leafy greens - a local delicacy",
      rating: 4.6,
      price: "₹80-120",
      location: "Local Homestays",
      cuisine: "Sikkimese",
      image: "/api/placeholder/300/200"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "AI-Powered Suggestions",
      description: "Personalized recommendations based on location and preferences"
    },
    {
      icon: Camera,
      title: "AR Menu Preview",
      description: "See dishes in augmented reality before ordering"
    },
    {
      icon: MapPin,
      title: "Location-Based",
      description: "Find authentic restaurants near monasteries"
    },
    {
      icon: Users,
      title: "Local Reviews",
      description: "Recommendations from monks and locals"
    }
  ];

  const handleGetRecommendations = () => {
    alert("AI analyzing your location and preferences... Finding the perfect local restaurants!");
  };

  const handleARPreview = (foodId: number) => {
    const food = foodRecommendations.find(f => f.id === foodId);
    alert(`Opening AR preview for ${food?.name}! Point your camera to see the dish.`);
  };

  return (
    <div className="min-h-screen">
      <MuteButton position="bottom-left" />
      <main className="pt-24">
        <section className="py-12 -mt-24 sm:-mt-28 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Button variant="outline" asChild className="mr-4">
                <a href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </a>
              </Button>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-monastery-gold/10 text-monastery-gold hover:bg-monastery-gold/20">
                <UtensilsCrossed className="w-3 h-3 mr-2" />
                Smart AI Recommendations
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                AI Food
                <span className="bg-gradient-to-r from-monastery-gold to-primary bg-clip-text text-transparent"> Guide</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover authentic Sikkimese and Tibetan cuisine with our AI-powered recommendations. 
                Get personalized suggestions and preview dishes in AR before you order.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-monastery-gold/10 to-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-monastery-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Recommendation Button */}
            <div className="text-center mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-monastery-gold to-primary px-12"
                onClick={handleGetRecommendations}
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Get AI Recommendations
              </Button>
            </div>

            {/* Food Recommendations */}
            <div className="grid md:grid-cols-3 gap-8">
              {foodRecommendations.map((food) => (
                <Card key={food.id} className="group hover:shadow-monastery transition-[var(--transition-monastery)] border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={food.image} 
                        alt={food.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-monastery-gold text-primary-foreground">
                          {food.cuisine}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex items-center space-x-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 fill-monastery-gold text-monastery-gold" />
                        <span className="text-xs font-medium">{food.rating}</span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-background/80 backdrop-blur-sm"
                          onClick={() => handleARPreview(food.id)}
                        >
                          <Camera className="w-3 h-3 mr-1" />
                          AR View
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="text-lg mb-2">{food.name}</CardTitle>
                    <CardDescription className="text-sm mb-4">{food.description}</CardDescription>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Price Range:</span>
                        <span className="font-medium text-primary">{food.price}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{food.location}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-gradient-to-r from-monastery-gold to-primary"
                      onClick={() => alert(`Finding restaurants serving ${food.name} near you!`)}
                    >
                      Find Restaurants
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">Why AI Food Recommendations?</h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2">Authentic Flavors</h4>
                  <p className="text-sm text-muted-foreground">Discover traditional recipes passed down through generations</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2">Local Insights</h4>
                  <p className="text-sm text-muted-foreground">Recommendations from monks and longtime residents</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2">AR Experience</h4>
                  <p className="text-sm text-muted-foreground">Preview dishes before ordering with augmented reality</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FoodPage;
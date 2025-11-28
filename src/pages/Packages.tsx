import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, MapPin, Users, Star, Check, Plane, Hotel, Camera, Utensils, ArrowLeft, Heart, Phone } from "lucide-react";
import MuteButton from "@/components/MuteButton";

const TravelPackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const packages = [
    {
      id: 1,
      name: "Spiritual Discovery",
      duration: "3 Days / 2 Nights",
      price: "₹12,999",
      originalPrice: "₹15,999",
      rating: 4.9,
      reviews: 127,
      groupSize: "2-8 people",
      category: "Best Seller",
      image: "/api/placeholder/400/250",
      highlights: [
        "Visit 5 major monasteries",
        "Traditional accommodation",
        "Local guide included",
        "Cultural performances"
      ],
      includes: ["Transport", "Accommodation", "Meals", "Guide"],
      locations: ["Gangtok", "Rumtek", "Enchey"]
    },
    {
      id: 2,
      name: "Heritage Explorer",
      duration: "7 Days / 6 Nights",
      price: "₹28,999",
      originalPrice: "₹34,999",
      rating: 4.8,
      reviews: 89,
      groupSize: "4-12 people",
      category: "Premium",
      image: "/api/placeholder/400/250",
      highlights: [
        "Complete Sikkim circuit",
        "Luxury mountain resorts",
        "Photography workshops",
        "Meditation sessions"
      ],
      includes: ["Private Transport", "Luxury Stay", "All Meals", "Expert Guide"],
      locations: ["Gangtok", "Pelling", "Yuksom", "Lachung"]
    },
    {
      id: 3,
      name: "Monastery Retreat",
      duration: "5 Days / 4 Nights",
      price: "₹18,999",
      originalPrice: "₹22,999",
      rating: 4.7,
      reviews: 156,
      groupSize: "1-6 people",
      category: "Wellness",
      image: "/api/placeholder/400/250",
      highlights: [
        "Stay in monastery",
        "Meditation training",
        "Monk interactions",
        "Spiritual guidance"
      ],
      includes: ["Monastery Stay", "Vegetarian Meals", "Teachings", "Ceremonies"],
      locations: ["Rumtek", "Pemayangtse", "Tashiding"]
    }
  ];

  const features = [
    {
      icon: Hotel,
      title: "Handpicked Stays",
      description: "From traditional guesthouses to luxury mountain resorts"
    },
    {
      icon: Camera,
      title: "Expert Guides",
      description: "Local historians and cultural experts"
    },
    {
      icon: Utensils,
      title: "Authentic Cuisine",
      description: "Traditional Sikkimese and Tibetan meals"
    },
    {
      icon: Plane,
      title: "Seamless Travel",
      description: "Airport transfers and comfortable transport"
    }
  ];

  const handleBookPackage = (packageId: number) => {
    const pkg = packages.find(p => p.id === packageId);
    setSelectedPackage(packageId);
    alert(`Booking ${pkg?.name}! Our travel expert will contact you shortly.`);
  };

  const handleCustomizePackage = (packageId: number) => {
    const pkg = packages.find(p => p.id === packageId);
    alert(`Customizing ${pkg?.name}! Let us know your preferences and we'll tailor it for you.`);
  };

  const handleContactExpert = () => {
    alert("Connecting you with our Sikkim travel expert! They'll help create your perfect monastery journey.");
  };

  const handleViewDetails = (packageId: number) => {
    const pkg = packages.find(p => p.id === packageId);
    alert(`Viewing detailed itinerary for ${pkg?.name} including daily activities, accommodations, and inclusions.`);
  };

  return (
    <div className="min-h-screen">
      <MuteButton position="bottom-left" />
      <main className="pt-24">
        {/* Header */}
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
                <Package className="w-3 h-3 mr-2" />
                Curated Experiences
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Travel
                <span className="bg-gradient-to-r from-monastery-gold to-primary bg-clip-text text-transparent"> Packages</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Immerse yourself in Sikkim's spiritual heritage with our carefully crafted travel packages. 
                Every detail is planned for your transformative journey through ancient monasteries.
              </p>
            </div>

            {/* Features Grid */}
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

            {/* Packages Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {packages.map((pkg) => (
                <Card key={pkg.id} className={`group hover:shadow-monastery transition-[var(--transition-monastery)] border-0 bg-card/80 backdrop-blur-sm overflow-hidden relative ${
                  selectedPackage === pkg.id ? 'ring-2 ring-primary' : ''
                }`}>
                  {pkg.category && (
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className={
                        pkg.category === 'Best Seller' ? 'bg-monastery-red text-primary-foreground' :
                        pkg.category === 'Premium' ? 'bg-monastery-gold text-primary-foreground' :
                        'bg-monastery-blue text-primary-foreground'
                      }>
                        {pkg.category}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={pkg.image} 
                        alt={`${pkg.name} travel package`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">{pkg.name}</CardTitle>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-monastery-gold text-monastery-gold" />
                        <span className="text-sm font-medium">{pkg.rating}</span>
                        <span className="text-xs text-muted-foreground">({pkg.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{pkg.groupSize}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{pkg.originalPrice}</span>
                        <Badge variant="secondary" className="text-xs">Save 19%</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">per person (all inclusive)</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <h4 className="font-medium text-sm text-foreground">Highlights:</h4>
                      <div className="space-y-2">
                        {pkg.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Check className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {pkg.includes.map((item, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {pkg.locations.join(" • ")}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="px-6 pb-6 space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-monastery-gold to-primary hover:shadow-lg transition-[var(--transition-monastery)]"
                      onClick={() => handleBookPackage(pkg.id)}
                    >
                      {selectedPackage === pkg.id ? 'Selected!' : 'Book Now'}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(pkg.id)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCustomizePackage(pkg.id)}
                      >
                        Customize
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center">
              <Card className="border-0 bg-gradient-to-r from-monastery-gold/10 via-primary/10 to-monastery-blue/10 p-8 max-w-4xl mx-auto">
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">Need a Custom Package?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      Let our travel experts create a personalized monastery tour based on your interests, schedule, and spiritual goals. 
                      Every journey is unique, just like you.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-primary to-monastery-gold"
                      onClick={() => handleCustomizePackage(1)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Customize Your Journey
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={handleContactExpert}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Talk to Expert
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8 pt-6 border-t border-border/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">Support Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-monastery-gold">100%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction Guaranteed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-monastery-blue">500+</div>
                      <div className="text-sm text-muted-foreground">Happy Travelers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TravelPackagesPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, MapPin, Route, Compass, Navigation as NavigationIcon, Camera, Clock, ArrowLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import MuteButton from "@/components/MuteButton";

const InteractiveMapPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const mapFeatures = [
    {
      icon: MapPin,
      title: "Geo-tagged Monasteries",
      description: "Precise locations of all 200+ monasteries with detailed information"
    },
    {
      icon: Route,
      title: "Optimized Routes",
      description: "Smart travel planning with suggested itineraries and transport options"
    },
    {
      icon: Compass,
      title: "Nearby Attractions",
      description: "Discover cultural sites, viewpoints, and local experiences around each monastery"
    },
    {
      icon: NavigationIcon,
      title: "Real-time Navigation",
      description: "GPS-enabled directions with offline capability for remote locations"
    }
  ];

  const popularRoutes = [
    {
      id: "golden",
      name: "Golden Triangle",
      monasteries: 3,
      duration: "2 days",
      difficulty: "Easy",
      highlights: ["Rumtek", "Enchey", "Do Drul Chorten"]
    },
    {
      id: "heritage",
      name: "West Sikkim Heritage",
      monasteries: 5,
      duration: "4 days",
      difficulty: "Moderate",
      highlights: ["Pemayangtse", "Sanga Choeling", "Khecheopalri"]
    },
    {
      id: "complete",
      name: "Complete Circuit",
      monasteries: 12,
      duration: "10 days",
      difficulty: "Challenging",
      highlights: ["All major monasteries", "Hidden gems", "Cultural immersion"]
    }
  ];

  const handleRouteSelect = (routeId: string) => {
    setSelectedRoute(routeId);
    alert(`Selected route: ${popularRoutes.find(r => r.id === routeId)?.name}`);
  };

  const handleLaunchMap = () => {
    alert("Launching full interactive map with GPS navigation!");
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
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
              <Badge className="mb-4 bg-monastery-blue/10 text-monastery-blue hover:bg-monastery-blue/20">
                <Map className="w-3 h-3 mr-2" />
                Smart Navigation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Interactive
                <span className="bg-gradient-to-r from-monastery-blue to-primary bg-clip-text text-transparent"> Heritage Map</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Navigate through Sikkim's spiritual landscape with our intelligent mapping system. 
                Plan your journey, discover hidden gems, and create unforgettable experiences.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-12 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search monasteries, locations, or routes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch} className="bg-monastery-blue">
                Search
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Map Preview */}
              <div className="relative">
                <Card className="border-0 bg-gradient-to-br from-monastery-blue/10 to-primary/10 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-96 relative bg-gradient-to-br from-monastery-blue/20 to-primary/20 flex items-center justify-center">
                      {/* Interactive Map Placeholder */}
                      <div className="text-center space-y-4">
                        <Map className="w-16 h-16 text-monastery-blue mx-auto" />
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-foreground">Interactive Map</h3>
                          <p className="text-muted-foreground">Explore 200+ monasteries across Sikkim</p>
                        </div>
                        <Button 
                          className="bg-monastery-blue hover:bg-monastery-blue/90"
                          onClick={handleLaunchMap}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Launch Full Map
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {mapFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-monastery-blue/10 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-monastery-blue" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Popular Routes */}
            <div>
              <h2 className="text-3xl font-bold text-center text-foreground mb-8">Popular Heritage Routes</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {popularRoutes.map((route) => (
                  <Card 
                    key={route.id} 
                    className={`hover:shadow-monastery transition-[var(--transition-monastery)] border-0 bg-card/80 backdrop-blur-sm cursor-pointer ${
                      selectedRoute === route.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleRouteSelect(route.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{route.name}</CardTitle>
                      <CardDescription>
                        {route.monasteries} monasteries • {route.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant={route.difficulty === 'Easy' ? 'secondary' : route.difficulty === 'Moderate' ? 'default' : 'destructive'}>
                          {route.difficulty}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {route.duration}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Highlights:</p>
                        <div className="flex flex-wrap gap-1">
                          {route.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        variant={selectedRoute === route.id ? "default" : "outline"}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Planning route: ${route.name}`);
                        }}
                      >
                        {selectedRoute === route.id ? "Selected Route" : "Select Route"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map Actions */}
            <div className="mt-16 text-center">
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex-col"
                  onClick={() => alert("Opening offline maps")}
                >
                  <NavigationIcon className="w-6 h-6 mb-2" />
                  <span className="text-sm">Offline Maps</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex-col"
                  onClick={() => alert("Downloading GPS data")}
                >
                  <MapPin className="w-6 h-6 mb-2" />
                  <span className="text-sm">GPS Data</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex-col"
                  onClick={() => alert("Planning custom route")}
                >
                  <Route className="w-6 h-6 mb-2" />
                  <span className="text-sm">Plan Route</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="p-4 h-auto flex-col"
                  onClick={() => alert("Finding nearby attractions")}
                >
                  <Compass className="w-6 h-6 mb-2" />
                  <span className="text-sm">Attractions</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InteractiveMapPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Camera, ArrowLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import MuteButton from "@/components/MuteButton";
import Globe from "@/components/ui/globe";

const InteractiveMapPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

            <div className="max-w-4xl mx-auto mb-20">
              {/* Interactive Globe */}
              <Card className="border-0 bg-gradient-to-br from-monastery-blue/10 to-primary/10 overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="space-y-2 mb-6">
                      <h3 className="text-2xl font-bold text-foreground">Interactive Globe</h3>
                      <p className="text-muted-foreground">Explore 200+ monasteries across Sikkim</p>
                    </div>
                    
                    {/* Globe Component */}
                    <div className="h-[400px] flex items-center justify-center">
                      <Globe />
                    </div>

                    <Button 
                      className="bg-monastery-blue hover:bg-monastery-blue/90 mt-6"
                      onClick={handleLaunchMap}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Launch Full Map
                    </Button>
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

export default InteractiveMapPage;
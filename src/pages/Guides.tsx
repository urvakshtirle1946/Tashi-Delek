import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Star, Clock, MapPin, Languages, BookOpen, MessageCircle } from "lucide-react";
import MuteButton from "@/components/MuteButton";

const GuidesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);

  const guides = [
    {
      id: 1,
      name: "Tenzin Norbu",
      specialization: "Buddhist Philosophy",
      rating: 4.9,
      reviews: 156,
      languages: ["English", "Hindi", "Tibetan"],
      experience: "15 years",
      location: "Gangtok",
      price: "₹2,500/day",
      expertise: ["Monastery History", "Meditation", "Cultural Ceremonies"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "Pemba Sherpa",
      specialization: "Cultural Heritage",
      rating: 4.8,
      reviews: 134,
      languages: ["English", "Nepali", "Hindi"],
      experience: "12 years",
      location: "Pelling",
      price: "₹2,000/day",
      expertise: ["Architecture", "Local Traditions", "Photography"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "Lhakpa Dolma",
      specialization: "Spiritual Practices",
      rating: 5.0,
      reviews: 89,
      languages: ["English", "Tibetan", "Hindi"],
      experience: "18 years",
      location: "Yuksom",
      price: "₹3,000/day",
      expertise: ["Sacred Rituals", "Meditation Teaching", "Pilgrim Routes"],
      image: "/api/placeholder/150/150"
    }
  ];

  const tourTypes = [
    {
      type: "In-Person Tours",
      description: "Traditional guided visits with local experts",
      duration: "Half-day to multi-day",
      features: ["Personal interaction", "Flexible timing", "Local insights"]
    },
    {
      type: "Virtual Tours",
      description: "Expert-led online monastery explorations",
      duration: "1-2 hours",
      features: ["Global accessibility", "Interactive Q&A", "Screen sharing"]
    },
    {
      type: "Hybrid Experience",
      description: "Combination of in-person and virtual elements",
      duration: "Customizable",
      features: ["Best of both worlds", "Extended learning", "Follow-up sessions"]
    }
  ];

  const handleBookGuide = (guideId: number) => {
    const guide = guides.find(g => g.id === guideId);
    setSelectedGuide(guideId);
    alert(`Booking ${guide?.name}! They will contact you to schedule your monastery tour.`);
  };

  const handleVirtualTour = (guideId: number) => {
    const guide = guides.find(g => g.id === guideId);
    alert(`Starting virtual tour with ${guide?.name}! Connecting to video call...`);
  };

  const handleMessage = (guideId: number) => {
    const guide = guides.find(g => g.id === guideId);
    alert(`Opening chat with ${guide?.name}! Ask them about availability and tour preferences.`);
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
              <Badge className="mb-4 bg-monastery-blue/10 text-monastery-blue hover:bg-monastery-blue/20">
                <Users className="w-3 h-3 mr-2" />
                Expert Historians & Cultural Guides
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Local
                <span className="bg-gradient-to-r from-monastery-blue to-primary bg-clip-text text-transparent"> Guide Booking</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with expert local guides, historians, and spiritual teachers. 
                Choose from in-person tours, virtual experiences, or hybrid sessions.
              </p>
            </div>

            {/* Tour Types */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {tourTypes.map((tour, index) => (
                <Card key={index} className="border-0 bg-card/80 backdrop-blur-sm text-center">
                  <CardHeader>
                    <CardTitle className="text-lg">{tour.type}</CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm">
                      <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-2">
                        <Clock className="w-3 h-3" />
                        <span>{tour.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {tour.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs mr-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Guides Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <Card key={guide.id} className={`group hover:shadow-monastery transition-[var(--transition-monastery)] border-0 bg-card/80 backdrop-blur-sm overflow-hidden ${
                  selectedGuide === guide.id ? 'ring-2 ring-primary' : ''
                }`}>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <img 
                        src={guide.image} 
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{guide.name}</CardTitle>
                    <CardDescription>{guide.specialization}</CardDescription>
                    
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <Star className="w-4 h-4 fill-monastery-gold text-monastery-gold" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                      <span className="text-xs text-muted-foreground">({guide.reviews} reviews)</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Experience:</span>
                        <div className="font-medium">{guide.experience}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <div className="font-medium flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {guide.location}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-sm">Languages:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {guide.languages.map((lang, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            <Languages className="w-2 h-2 mr-1" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-sm">Expertise:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {guide.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-center pt-2 border-t border-border/20">
                      <div className="text-xl font-bold text-primary mb-1">{guide.price}</div>
                      <div className="text-xs text-muted-foreground">Professional guide service</div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-monastery-blue to-primary"
                        onClick={() => handleBookGuide(guide.id)}
                      >
                        {selectedGuide === guide.id ? 'Selected!' : 'Book In-Person'}
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleVirtualTour(guide.id)}
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          Virtual Tour
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMessage(guide.id)}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits Section */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">Why Choose Our Guides?</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6 text-center border-0 bg-card/60">
                  <Users className="w-8 h-8 text-monastery-blue mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Local Expertise</h4>
                  <p className="text-sm text-muted-foreground">Born and raised in Sikkim with deep cultural knowledge</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <BookOpen className="w-8 h-8 text-monastery-gold mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Scholarly Knowledge</h4>
                  <p className="text-sm text-muted-foreground">Trained historians and Buddhist scholars</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <Languages className="w-8 h-8 text-monastery-red mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Multilingual</h4>
                  <p className="text-sm text-muted-foreground">Fluent in local languages and international tongues</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Verified Reviews</h4>
                  <p className="text-sm text-muted-foreground">All guides are verified with real traveler reviews</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GuidesPage;
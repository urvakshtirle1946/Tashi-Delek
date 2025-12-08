import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Phone, Compass, Mountain, Sparkles } from "lucide-react";
import MuteButton from "@/components/MuteButton";
import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";

const TravelPackagesPage = () => {

  const pricingTiers: PricingTier[] = [
    {
      name: "Spiritual Discovery",
      icon: <Compass className="w-6 h-6" />,
      price: 12999,
      description: "Perfect for first-time monastery explorers",
      color: "amber",
      features: [
        "3 Days / 2 Nights Stay",
        "Visit 5 Major Monasteries",
        "Traditional Accommodation",
        "Local Guide Included",
        "Cultural Performances",
        "All Meals Included",
      ],
    },
    {
      name: "Heritage Explorer",
      icon: <Mountain className="w-6 h-6" />,
      price: 28999,
      description: "For serious cultural enthusiasts",
      color: "blue",
      features: [
        "7 Days / 6 Nights Stay",
        "Complete Sikkim Circuit",
        "Luxury Mountain Resorts",
        "Photography Workshops",
        "Meditation Sessions",
        "Private Transport",
      ],
      popular: true,
    },
    {
      name: "Monastery Retreat",
      icon: <Sparkles className="w-6 h-6" />,
      price: 18999,
      description: "For spiritual seekers",
      color: "purple",
      features: [
        "5 Days / 4 Nights Stay",
        "Stay in Monastery",
        "Meditation Training",
        "Monk Interactions",
        "Spiritual Guidance",
        "Vegetarian Meals",
      ],
    },
  ];

  const handleCustomizePackage = () => {
    alert(`Let us know your preferences and we'll tailor the perfect package for you!`);
  };

  const handleContactExpert = () => {
    alert("Connecting you with our Sikkim travel expert! They'll help create your perfect monastery journey.");
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

            {/* Creative Pricing Section */}
            <div className="mb-16">
              <CreativePricing
                tag="Curated Experiences"
                title="Journey Through Sacred Himalayan Monasteries"
                description="Immerse yourself in Sikkim's spiritual heritage with our handpicked packages"
                tiers={pricingTiers}
              />
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
                      onClick={handleCustomizePackage}
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
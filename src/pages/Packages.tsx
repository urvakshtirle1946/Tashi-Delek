import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Phone, Compass, Mountain, Sparkles, Loader2 } from "lucide-react";
import MuteButton from "@/components/MuteButton";
import { CreativePricing } from "@/components/ui/creative-pricing";
import type { PricingTier } from "@/components/ui/creative-pricing";
import { packageAPI } from "@/lib/api";
import PackagesChatbot from "@/components/PackagesChatbot";

const TravelPackagesPage = () => {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packagesData, setPackagesData] = useState<any[]>([]);

  // Icon mapping based on category
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      'ADVENTURE': <Mountain className="w-6 h-6" />,
      'BEACH': <Compass className="w-6 h-6" />,
      'HERITAGE': <Mountain className="w-6 h-6" />,
      'WILDLIFE': <Mountain className="w-6 h-6" />,
      'HILLSTATION': <Mountain className="w-6 h-6" />,
      'PILGRIMAGE': <Compass className="w-6 h-6" />,
      'CULTURAL': <Sparkles className="w-6 h-6" />,
      'HONEYMOON': <Heart className="w-6 h-6" />,
    };
    return iconMap[category] || <Compass className="w-6 h-6" />;
  };

  // Color mapping based on category
  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'ADVENTURE': 'blue',
      'BEACH': 'blue',
      'HERITAGE': 'amber',
      'WILDLIFE': 'green',
      'HILLSTATION': 'purple',
      'PILGRIMAGE': 'amber',
      'CULTURAL': 'purple',
      'HONEYMOON': 'pink',
    };
    return colorMap[category] || 'blue';
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await packageAPI.getAll({ limit: 100 }); // Get all packages

      if (response.success && response.data.packages) {
        // Store raw packages data for chatbot
        setPackagesData(response.data.packages.filter((pkg: any) => pkg.status === 'ACTIVE'));

        // Transform backend packages to PricingTier format
        const transformedPackages: PricingTier[] = response.data.packages
          .filter((pkg: any) => pkg.status === 'ACTIVE') // Only show active packages
          .map((pkg: any, index: number) => {
            // Parse features from description or use default
            const features = pkg.description
              ? pkg.description.split('\n').filter((line: string) => line.trim()).slice(0, 6)
              : [
                `${pkg.duration || 'Custom Duration'}`,
                `Visit ${pkg.location}`,
                'Professional Guide',
                'All Meals Included',
                'Transportation',
                '24/7 Support'
              ];

            return {
              name: pkg.packageName || 'Travel Package',
              icon: getCategoryIcon(pkg.category || 'ADVENTURE'),
              price: pkg.price || 0,
              description: pkg.description?.substring(0, 100) || `Explore ${pkg.location}`,
              color: getCategoryColor(pkg.category || 'ADVENTURE'),
              features: features.length > 0 ? features : ['Package details available'],
              popular: index === 1, // Make second package popular
            };
          });

        setPricingTiers(transformedPackages);
      }
    } catch (err: any) {
      console.error('Error fetching packages:', err);
      const errorMessage = err.message || 'Failed to load packages';
      setError(errorMessage);

      // Show more helpful error message
      if (errorMessage.includes('Cannot connect to backend')) {
        setError('Backend server is not running. Please start the backend server on port 8000.');
      } else {
        setError(errorMessage);
      }

      // Fallback to default packages if API fails
      setPricingTiers([
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
      ]);
    } finally {
      setLoading(false);
    }
  };

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
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-3 text-muted-foreground">Loading packages...</span>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button onClick={fetchPackages} variant="outline">
                    Retry
                  </Button>
                </div>
              ) : pricingTiers.length > 0 ? (
                <CreativePricing
                  tag="Curated Experiences"
                  title="Journey Through Sacred Himalayan Monasteries"
                  description="Immerse yourself in Sikkim's spiritual heritage with our handpicked packages"
                  tiers={pricingTiers}
                />
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No packages available at the moment.</p>
                </div>
              )}
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
      
      {/* Chatbot at bottom - Always visible */}
      <PackagesChatbot 
        packages={packagesData.length > 0 ? packagesData.map(pkg => ({
          name: pkg.packageName || 'Travel Package',
          price: pkg.price || 0,
          description: pkg.description?.substring(0, 100) || `Explore ${pkg.location}`,
        })) : []} 
      />
      
      {/* Debug: Check if component is rendering */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ position: 'fixed', bottom: '80px', right: '20px', zIndex: 10000, background: 'red', color: 'white', padding: '5px', fontSize: '10px' }}>
          Chatbot Component Mounted
        </div>
      )}
    </div>
  );
};

export default TravelPackagesPage;
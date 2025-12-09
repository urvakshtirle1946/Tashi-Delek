import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowLeft, Star, MapPin, Mail, Phone, ShieldCheck, Loader2, BookOpen, Languages } from "lucide-react";
import MuteButton from "@/components/MuteButton";
import { vendorAPI } from "@/lib/api";

interface Vendor {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone?: string;
  photo?: any;
  verificationStatus: string;
  createdAt: string;
  stats?: {
    packages: number;
    bookings: number;
    rating: number;
  };
}

const GuidesPage = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await vendorAPI.getAll({ limit: 100 });

      if (response.success && response.data.vendors) {
        setVendors(response.data.vendors);
      }
    } catch (err: any) {
      console.error('Error fetching vendors:', err);
      setError(err.message || 'Failed to load guides');
      // Fallback to empty array or default guides
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };

  // Transform vendor data to guide format
  const transformVendorToGuide = (vendor: Vendor) => {
    const photoUrl = vendor.photo
      ? (typeof vendor.photo === 'string' ? vendor.photo : vendor.photo.url)
      : '/api/placeholder/300/200';
    const rating = vendor.stats?.rating || 0;
    const packages = vendor.stats?.packages || 0;
    const bookings = vendor.stats?.bookings || 0;
    return {
      id: vendor.id,
      name: vendor.name,
      businessName: vendor.businessName || 'Guide',
      image: photoUrl,
      email: vendor.email,
      phone: vendor.phone,
      verificationStatus: vendor.verificationStatus,
      rating,
      packages,
      bookings,
    };
  };

  const guides = vendors.map((vendor) => transformVendorToGuide(vendor));

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

  const handleBookGuide = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    setSelectedGuide(guideId);
    alert(`Booking ${guide?.name}! They will contact you to schedule your monastery tour.`);
  };

  const handleVirtualTour = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    alert(`Starting virtual tour with ${guide?.name}! Connecting to video call...`);
  };

  const handleMessage = (guideId: string) => {
    const guide = guides.find(g => g.id === guideId);
    const contactInfo = guide?.email || guide?.phone || 'N/A';
    alert(`Contact ${guide?.name} at ${contactInfo}. Ask them about availability and tour preferences.`);
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

            {/* Guides Grid */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading guides...</span>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={fetchVendors} variant="outline">
                  Retry
                </Button>
              </div>
            ) : guides.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden border border-border/40">
                    <div className="h-40 bg-muted overflow-hidden flex items-center justify-center">
                      {guide.image && !guide.image.includes('/api/placeholder') ? (
                        <img src={guide.image} alt={guide.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-monastery-blue/30 to-primary/30 text-white flex items-center justify-center text-xl font-semibold">
                          {guide.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{guide.name}</CardTitle>
                        {guide.verificationStatus === 'VERIFIED' && (
                          <Badge className="flex items-center gap-1 bg-green-600 text-white">
                            <ShieldCheck className="w-3 h-3" /> Verified
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{guide.businessName}</div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{guide.rating.toFixed(1)} · {guide.bookings} bookings</span>
                      </div>
                      <div className="text-xs text-muted-foreground">Packages: {guide.packages}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4" />
                        <span>{guide.email}</span>
                      </div>
                      {guide.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4" />
                          <span>{guide.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Sikkim</span>
                      </div>
                      <div className="pt-2 border-t border-border/30 flex gap-2">
                        <Button className="flex-1">View Profile</Button>
                        <Button variant="outline" className="flex-1">Contact</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">No guides found.</div>
            )}

            {/* Removed old mock sections; focused on vendor cards */}

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
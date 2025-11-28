import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Mail, Phone, MapPin, Heart, UtensilsCrossed, Users, Headphones, Wifi } from "lucide-react";
import prayerFlags from "@/assets/prayer-flags.jpg";

const Footer = () => {
  const quickFeatures = [
    {
      icon: UtensilsCrossed,
      title: "AI Food Recommendations",
      description: "Personalized local cuisine suggestions with AR menu previews",
      badge: "Smart AI"
    },
    {
      icon: Users,
      title: "Local Guide Booking",
      description: "Connect with expert historians and cultural guides",
      badge: "Expert Guides"
    },
    {
      icon: Headphones,
      title: "Smart Audio Tours",
      description: "GPS-enabled offline audio guides with Bluetooth beacons",
      badge: "Offline Ready"
    },
    {
      icon: Wifi,
      title: "Offline Access",
      description: "Pre-downloaded content for remote monastery visits",
      badge: "No Internet Needed"
    }
  ];

  const footerLinks = [
    {
      title: "Platform",
      links: ["Virtual Tours", "Interactive Map", "Digital Archives", "Cultural Calendar"]
    },
    {
      title: "Services",
      links: ["Travel Packages", "Guide Booking", "Audio Tours", "Transport"]
    },
    {
      title: "Community",
      links: ["Local Archives", "Photo Sharing", "Oral Histories", "Cultural Stories"]
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"]
    }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background to-secondary/30">
      {/* Quick Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Heart className="w-3 h-3 mr-2" />
              Complete Experience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Your
              <span className="bg-gradient-to-r from-primary to-monastery-gold bg-clip-text text-transparent"> Spiritual Journey</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group text-center space-y-4 p-6 rounded-xl bg-card/60 backdrop-blur-sm hover:bg-card/80 hover:shadow-gentle transition-[var(--transition-monastery)]">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-monastery-gold/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <Badge className="absolute -top-1 -right-1 text-xs bg-monastery-gold text-primary-foreground">
                      {feature.badge}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary">
                    Learn More
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Prayer Flags Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={prayerFlags} 
            alt="Colorful Tibetan prayer flags in the Himalayas"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Begin Your Sacred Journey
              <br />
              <span className="bg-gradient-to-r from-primary via-monastery-gold to-monastery-blue bg-clip-text text-transparent">
                Through Sikkim's Monasteries
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the transformative power of Sikkim's spiritual heritage. 
              Your journey into ancient wisdom starts here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="monastery" className="px-12">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary hover:bg-primary/5 backdrop-blur-sm bg-card/80 px-12">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="border-t border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-monastery-gold rounded-lg flex items-center justify-center shadow-monastery">
                  <Mountain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Monastery360</h3>
                  <p className="text-sm text-muted-foreground">Sikkim's Digital Heritage Platform</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preserving and sharing Sikkim's rich monastic heritage through immersive technology. 
                Experience the sacred, plan your journey, and connect with centuries of spiritual wisdom.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Gangtok, Sikkim, India</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>hello@monastery360.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-8 border-t border-border">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 Monastery360. Made with <Heart className="w-3 h-3 inline text-monastery-red" /> for preserving Sikkim's heritage.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
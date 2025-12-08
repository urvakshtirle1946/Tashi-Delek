import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MuteButton from "@/components/MuteButton";

const CulturalCalendarPage = () => {
  const festivals = [
    {
      id: 1,
      title: "Losar Festival",
      description: "Tibetan New Year celebrations with traditional dances, prayers, and vibrant monastery decorations marking the beginning of spring.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      imageAlt: "Colorful Losar Festival celebration with prayer flags"
    },
    {
      id: 2,
      title: "Saga Dawa",
      description: "Sacred Buddhist festival commemorating Buddha's birth, enlightenment, and parinirvana celebrated with grand ceremonies at monasteries.",
      image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80",
      imageAlt: "Buddhist monks in prayer during Saga Dawa"
    },
    {
      id: 3,
      title: "Pang Lhabsol",
      description: "Unique Sikkimese festival worshipping Mount Khangchendzonga with warrior dances and ceremonial offerings to the mountain deity.",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
      imageAlt: "Traditional warrior dance performance at Pang Lhabsol"
    },
    {
      id: 4,
      title: "Bumchu Festival",
      description: "Sacred water vessel ceremony at Tashiding Monastery where holy water predicts the year's fortune for the entire region.",
      image: "https://images.unsplash.com/photo-1605519295292-f6e66af07a00?w=800&q=80",
      imageAlt: "Sacred Bumchu ceremony at Tashiding Monastery"
    },
    {
      id: 5,
      title: "Losoong Festival",
      description: "Sikkimese New Year celebration with traditional Chaam dances, archery competitions, and cultural performances throughout the state.",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
      imageAlt: "Traditional Chaam dance during Losoong"
    },
    {
      id: 6,
      title: "Dashain Festival",
      description: "Harvest festival celebrating victory of good over evil with elaborate rituals, family gatherings, and cultural festivities across Sikkim.",
      image: "https://images.unsplash.com/photo-1583339793403-3d9b001b6008?w=800&q=80",
      imageAlt: "Colorful Dashain celebrations in Sikkim"
    }
  ];

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

            <div className="text-center max-w-3xl mx-auto mb-20">
              <Badge className="mb-4 bg-[#D3AF37]/10 text-[#650304] hover:bg-[#D3AF37]/20 border-[#D3AF37]/30">
                <Calendar className="w-3 h-3 mr-2" />
                Sacred Celebrations
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cultural
                <span className="bg-gradient-to-r from-[#650304] to-[#D3AF37] bg-clip-text text-transparent"> Calendar</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Experience the rich tapestry of Sikkim's festivals and celebrations throughout the year. 
                Join us in honoring centuries-old traditions and spiritual practices.
              </p>
            </div>

            {/* Zigzag Festival Cards */}
            <div className="space-y-24 max-w-6xl mx-auto">
              {festivals.map((festival, index) => {
                const isImageLeft = index % 2 === 0;
                
                return (
                  <div 
                    key={festival.id}
                    className={`flex flex-col ${
                      isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    } gap-12 items-center`}
                  >
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                      <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-[var(--transition-monastery)] border-2 border-[#D3AF37]/20">
                        <img 
                          src={festival.image} 
                          alt={festival.imageAlt}
                          loading="lazy"
                          className="w-full h-[400px] object-cover transform hover:scale-105 transition-[var(--transition-monastery)]"
                        />
                      </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-1/2 space-y-6">
                      <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#650304' }}>
                        {festival.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {festival.description}
                      </p>
                      <a 
                        href="#"
                        className="inline-flex items-center font-medium text-lg group transition-[var(--transition-gentle)] hover:opacity-80"
                        style={{ color: '#650304' }}
                      >
                        Learn more 
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-32 text-center py-16 px-8 bg-gradient-to-br from-[#D3AF37]/10 to-[#650304]/5 rounded-3xl shadow-xl max-w-4xl mx-auto border-2 border-[#D3AF37]/20">
              <h3 className="text-3xl font-bold mb-4" style={{ color: '#650304' }}>
                Plan Your Visit
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Don't miss out on these incredible cultural experiences. 
                Contact us to plan your trip around Sikkim's most vibrant festivals.
              </p>
              <Button 
                size="lg"
                className="px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-[var(--transition-monastery)] text-white hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #650304 0%, #D3AF37 100%)' }}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CulturalCalendarPage;
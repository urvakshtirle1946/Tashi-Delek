import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Upload, Camera, BookOpen, Share2, MessageCircle } from "lucide-react";
import MuteButton from "@/components/MuteButton";
import { StackedCardsInteraction } from "@/components/ui/stacked-cards-interaction";
import type { CardData } from "@/components/ui/stacked-cards-interaction";
import { ImageGallery } from "@/components/ui/image-gallery";

const CommunityPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("photos");

  const contributions = [
    {
      id: 1,
      type: "photo",
      title: "Morning prayers at Enchey Monastery",
      contributor: "Karma Tenzin",
      location: "Enchey Monastery",
      date: "2 days ago",
      likes: 45,
      comments: 12,
      description: "Captured during the beautiful morning prayer session",
      image: "https://images.unsplash.com/photo-1528741254566-d718e868201f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 6,
      type: "photo",
      title: "Sunset at Rumtek Monastery",
      contributor: "Sonam Bhutia",
      location: "Rumtek Monastery",
      date: "3 days ago",
      likes: 89,
      comments: 15,
      description: "Golden hour painting the monastery walls in warm hues",
      image: "https://images.unsplash.com/photo-1604823732630-491316b5cf83?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 7,
      type: "photo",
      title: "Prayer Wheels at Pemayangtse",
      contributor: "Lhakpa Sherpa",
      location: "Pemayangtse Monastery",
      date: "1 week ago",
      likes: 67,
      comments: 9,
      description: "Ancient prayer wheels spinning in the mountain breeze",
      image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 8,
      type: "photo",
      title: "Monastery Courtyard at Dawn",
      contributor: "Tenzin Dorjee",
      location: "Rumtek Monastery",
      date: "4 days ago",
      likes: 52,
      comments: 8,
      description: "Peaceful morning atmosphere in the monastery courtyard",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 9,
      type: "photo",
      title: "Buddhist Stupa in Golden Light",
      contributor: "Pema Choden",
      location: "Enchey Monastery",
      date: "5 days ago",
      likes: 73,
      comments: 11,
      description: "Sacred stupa glowing in the evening sunlight",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 10,
      type: "photo",
      title: "Monks in Meditation",
      contributor: "Karma Wangyal",
      location: "Pemayangtse Monastery",
      date: "6 days ago",
      likes: 94,
      comments: 19,
      description: "Serene moment of monks in deep meditation",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 11,
      type: "photo",
      title: "Traditional Architecture Details",
      contributor: "Sonam Gyatso",
      location: "Rumtek Monastery",
      date: "1 week ago",
      likes: 61,
      comments: 7,
      description: "Intricate carvings and traditional Tibetan architecture",
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 12,
      type: "photo",
      title: "Mountain View from Monastery",
      contributor: "Lhakpa Tsering",
      location: "Enchey Monastery",
      date: "1 week ago",
      likes: 88,
      comments: 14,
      description: "Breathtaking view of the Himalayas from the monastery",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 13,
      type: "photo",
      title: "Butter Lamps Illumination",
      contributor: "Dorji Lhamo",
      location: "Pemayangtse Monastery",
      date: "2 weeks ago",
      likes: 105,
      comments: 22,
      description: "Hundreds of butter lamps creating a spiritual ambiance",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 14,
      type: "photo",
      title: "Prayer Flags in Wind",
      contributor: "Tashi Dolma",
      location: "Rumtek Monastery",
      date: "2 weeks ago",
      likes: 79,
      comments: 16,
      description: "Colorful prayer flags dancing in the mountain wind",
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 15,
      type: "photo",
      title: "Monastery Entrance Gate",
      contributor: "Karma Sangmo",
      location: "Enchey Monastery",
      date: "2 weeks ago",
      likes: 56,
      comments: 9,
      description: "Ornate entrance gate welcoming visitors",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 16,
      type: "photo",
      title: "Thangka Paintings Collection",
      contributor: "Pema Yangchen",
      location: "Pemayangtse Monastery",
      date: "3 weeks ago",
      likes: 112,
      comments: 28,
      description: "Rare collection of traditional thangka paintings",
      image: "https://images.unsplash.com/photo-1528741254566-d718e868201f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 17,
      type: "photo",
      title: "Monastery Bell Tower",
      contributor: "Sonam Tashi",
      location: "Rumtek Monastery",
      date: "3 weeks ago",
      likes: 68,
      comments: 12,
      description: "Historic bell tower with traditional design",
      image: "https://images.unsplash.com/photo-1604823732630-491316b5cf83?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 18,
      type: "photo",
      title: "Evening Prayer Session",
      contributor: "Lhakpa Dolma",
      location: "Enchey Monastery",
      date: "3 weeks ago",
      likes: 91,
      comments: 18,
      description: "Monks gathered for evening prayers",
      image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      type: "story",
      title: "My grandmother's memories of Rumtek",
      contributor: "Pema Lhamo",
      location: "Rumtek Monastery",
      date: "5 days ago",
      likes: 78,
      comments: 23,
      description: "Oral history passed down through generations about the sacred rituals and daily life at Rumtek",
      image: "https://images.unsplash.com/photo-1545450660-cd1cd6baa72d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      type: "manuscript",
      title: "Ancient prayer manuscript from 1800s",
      contributor: "Lobsang Phuntsok",
      location: "Pemayangtse Monastery",
      date: "1 week ago",
      likes: 156,
      comments: 34,
      description: "Rare manuscript discovery shared with preservation team"
    },
    {
      id: 4,
      type: "story",
      title: "The Legend of Enchey's Foundation",
      contributor: "Dorji Wangchuk",
      location: "Enchey Monastery",
      date: "1 week ago",
      likes: 92,
      comments: 18,
      description: "Ancient tales of how Enchey Monastery was blessed by Tantric masters in the 19th century",
      image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      type: "story",
      title: "Pilgrimage Journey to Pemayangtse",
      contributor: "Tashi Namgyal",
      location: "Pemayangtse Monastery",
      date: "2 weeks ago",
      likes: 134,
      comments: 27,
      description: "My family's 50-year tradition of annual pilgrimage and the spiritual teachings we've received",
      image: "https://images.unsplash.com/photo-1526827826797-7b05204a22ef?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // Story cards data for stacked interaction
  const storyCards: CardData[] = contributions
    .filter(c => c.type === "story")
    .slice(0, 3)
    .map(story => ({
      image: story.image,
      title: story.title,
      description: story.description,
    }));

  const tabs = [
    { id: "photos", label: "Photos", icon: Camera },
    { id: "stories", label: "Stories", icon: BookOpen },
    { id: "manuscripts", label: "Manuscripts", icon: Upload }
  ];

  const handleLike = (contributionId: number) => {
    alert(`Liked contribution #${contributionId}! Thank you for supporting the community.`);
  };

  const handleComment = (contributionId: number) => {
    alert(`Opening comments for contribution #${contributionId}. Share your thoughts and experiences!`);
  };

  const handleShare = (contributionId: number) => {
    alert(`Sharing contribution #${contributionId}! Help spread awareness of Sikkim's heritage.`);
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

            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-1 bg-secondary/50 p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Button
                      key={tab.id}
                      variant={selectedTab === tab.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedTab(tab.id)}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Community Contributions */}
            {selectedTab === "stories" ? (
              // Stacked Cards for Stories
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-center mb-8 text-foreground">
                  Oral Histories & Monastery Tales
                </h3>
                <div className="flex justify-center items-center min-h-[500px]">
                  <StackedCardsInteraction 
                    cards={storyCards}
                    spreadDistance={60}
                    rotationAngle={8}
                    animationDelay={0.15}
                  />
                </div>
                <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
                  Hover over the cards to explore different monastery stories passed down through generations
                </p>
              </div>
            ) : selectedTab === "photos" ? (
              // Image Gallery for Photos
              <div className="mb-16">
                <ImageGallery 
                  images={contributions
                    .filter(c => c.type === "photo")
                    .map(photo => ({
                      id: photo.id,
                      src: photo.image || "",
                      alt: photo.title,
                      ratio: Math.random() > 0.5 ? 9 / 16 : 16 / 9
                    }))}
                />
              </div>
            ) : (
              // Regular Grid for Manuscripts
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {contributions
                  .filter(c => c.type === "manuscript")
                  .map((contribution) => (
                  <Card key={contribution.id} className="group hover:shadow-monastery transition-[var(--transition-monastery)] border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
                    {contribution.image && (
                      <CardHeader className="p-0">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={contribution.image} 
                            alt={contribution.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </CardHeader>
                    )}
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className="text-lg line-clamp-2">{contribution.title}</CardTitle>
                        <Badge variant="outline" className="text-xs ml-2">
                          {contribution.type}
                        </Badge>
                      </div>
                      
                      <CardDescription className="text-sm mb-4 line-clamp-2">
                        {contribution.description}
                      </CardDescription>

                      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                        <div>By {contribution.contributor}</div>
                        <div>{contribution.location} • {contribution.date}</div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border/20">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(contribution.id)}
                            className="text-muted-foreground hover:text-monastery-red"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {contribution.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleComment(contribution.id)}
                            className="text-muted-foreground hover:text-monastery-blue"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {contribution.comments}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(contribution.id)}
                          className="text-muted-foreground hover:text-monastery-gold"
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Impact Stats */}
            <div className="mt-20 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-8">Community Impact</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-monastery-red">1,240</h4>
                  <p className="text-sm text-muted-foreground">Photos Shared</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-monastery-gold">87</h4>
                  <p className="text-sm text-muted-foreground">Oral Histories</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-monastery-blue">156</h4>
                  <p className="text-sm text-muted-foreground">Manuscripts</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-primary">342</h4>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CommunityPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Upload, Camera, BookOpen, Users, Share2, MessageCircle } from "lucide-react";
import MuteButton from "@/components/MuteButton";

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
      image: "/api/placeholder/400/300"
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
      description: "Oral history passed down through generations"
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
    }
  ];

  const features = [
    {
      icon: Upload,
      title: "Share Photos",
      description: "Upload your monastery visits and cultural experiences"
    },
    {
      icon: BookOpen,
      title: "Oral Histories",
      description: "Record and preserve stories from elders and monks"
    },
    {
      icon: Camera,
      title: "Document Heritage",
      description: "Help create a digital archive of Sikkim's monasteries"
    },
    {
      icon: Users,
      title: "Connect",
      description: "Join a community passionate about cultural preservation"
    }
  ];

  const tabs = [
    { id: "photos", label: "Photos", icon: Camera },
    { id: "stories", label: "Stories", icon: BookOpen },
    { id: "manuscripts", label: "Manuscripts", icon: Upload }
  ];

  const handleContribute = (type: string) => {
    alert(`Opening contribution form for ${type}! Share your cultural heritage with the community.`);
  };

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

            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge className="mb-4 bg-monastery-red/10 text-monastery-red hover:bg-monastery-red/20">
                <Heart className="w-3 h-3 mr-2" />
                Participatory Heritage Preservation
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Community
                <span className="bg-gradient-to-r from-monastery-red to-primary bg-clip-text text-transparent"> Archives</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Help preserve Sikkim's monastery heritage by sharing photos, oral histories, and manuscripts. 
                Together, we're creating a living digital archive for future generations.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-monastery-red/10 to-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon className="w-8 h-8 text-monastery-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contribution Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                className="bg-gradient-to-r from-monastery-red to-primary"
                onClick={() => handleContribute("photo")}
              >
                <Camera className="w-4 h-4 mr-2" />
                Share Photos
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleContribute("story")}
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Record Story
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleContribute("manuscript")}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Manuscript
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contributions
                .filter(c => selectedTab === "photos" ? c.type === "photo" : 
                           selectedTab === "stories" ? c.type === "story" : 
                           selectedTab === "manuscripts" ? c.type === "manuscript" : true)
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Bell, Star, ArrowLeft, Plus, Download } from "lucide-react";
import MuteButton from "@/components/MuteButton";

const CulturalCalendarPage = () => {
  const events = [
    {
      id: 1,
      title: "Losar Festival",
      description: "Tibetan New Year celebrations with traditional dances and prayers",
      date: "Feb 15-17, 2024",
      time: "6:00 AM - 8:00 PM",
      location: "Rumtek Monastery",
      type: "Festival",
      attendees: "500+",
      isHighlighted: true
    },
    {
      id: 2,
      title: "Saga Dawa",
      description: "Buddha's birth, enlightenment, and parinirvana commemoration",
      date: "May 23, 2024",
      time: "5:00 AM - 7:00 PM",
      location: "Multiple Monasteries",
      type: "Religious",
      attendees: "1000+",
      isHighlighted: true
    },
    {
      id: 3,
      title: "Pang Lhabsol",
      description: "Worship of Mount Khangchendzonga guardian deity",
      date: "Sep 18, 2024",
      time: "Morning Prayers",
      location: "Pemayangtse Monastery",
      type: "Ceremony",
      attendees: "300+",
      isHighlighted: false
    },
    {
      id: 4,
      title: "Dashain Festival",
      description: "Traditional harvest festival with cultural performances",
      date: "Oct 3-12, 2024",
      time: "All Day",
      location: "Various Locations",
      type: "Festival",
      attendees: "2000+",
      isHighlighted: false
    }
  ];

  const upcomingEvents = [
    { name: "Morning Prayers", time: "Daily 5:30 AM", location: "All Monasteries" },
    { name: "Evening Prayers", time: "Daily 6:00 PM", location: "All Monasteries" },
    { name: "Weekend Meditation", time: "Sat-Sun 7:00 AM", location: "Enchey Monastery" },
    { name: "Cultural Tours", time: "Mon-Fri 10:00 AM", location: "Guided Tours Available" }
  ];

  const handleJoinEvent = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    alert(`Joining event: ${event?.title}! You'll receive notifications and updates.`);
  };

  const handleAddToCalendar = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    alert(`Adding ${event?.title} to your calendar!`);
  };

  const handleNotifications = () => {
    alert("Setting up event notifications! You'll be notified before each event.");
  };

  const handleDownloadCalendar = () => {
    alert("Downloading complete cultural calendar for offline access!");
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
              <Badge className="mb-4 bg-monastery-red/10 text-monastery-red hover:bg-monastery-red/20">
                <Calendar className="w-3 h-3 mr-2" />
                Sacred Celebrations
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Cultural
                <span className="bg-gradient-to-r from-monastery-red to-primary bg-clip-text text-transparent"> Calendar</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Stay connected with Sikkim's spiritual rhythm. Join festivals, ceremonies, and daily practices 
                that have been celebrated for centuries in these sacred spaces.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Events */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-foreground">Upcoming Festivals & Events</h2>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleNotifications}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleDownloadCalendar}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {events.map((event) => (
                  <Card key={event.id} className={`border-0 transition-[var(--transition-monastery)] ${
                    event.isHighlighted 
                      ? 'bg-gradient-to-r from-monastery-red/5 to-primary/5 shadow-monastery' 
                      : 'bg-card/80 backdrop-blur-sm hover:shadow-gentle'
                  }`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <CardTitle className="text-lg">{event.title}</CardTitle>
                            {event.isHighlighted && (
                              <Badge className="bg-monastery-red text-primary-foreground">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm">{event.description}</CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {event.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>{event.attendees} Expected</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-monastery-red to-primary"
                          onClick={() => handleJoinEvent(event.id)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Join Event
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToCalendar(event.id)}
                        >
                          <Calendar className="w-4 h-4 mr-1" />
                          Add to Calendar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Daily Schedule */}
                <Card className="border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Activities</CardTitle>
                    <CardDescription>Regular monastery schedules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
                        onClick={() => alert(`Info about: ${event.name}`)}>
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="font-medium text-sm text-foreground">{event.name}</div>
                          <div className="text-xs text-muted-foreground">{event.time}</div>
                          <div className="text-xs text-muted-foreground">{event.location}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 bg-gradient-to-br from-monastery-blue/10 to-primary/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="ghost"
                      onClick={() => alert("Opening calendar export options")}
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Export Calendar
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="ghost"
                      onClick={() => alert("Setting up event reminders")}
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Event Reminders
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="ghost"
                      onClick={() => alert("Viewing event locations on map")}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Event Locations
                    </Button>
                    <Button 
                      className="w-full bg-gradient-to-r from-monastery-blue to-primary"
                      onClick={() => alert("Opening full calendar view")}
                    >
                      View Full Calendar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Monthly Overview */}
            <div className="mt-20">
              <h3 className="text-2xl font-bold text-center text-foreground mb-8">This Month's Highlights</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-primary">12</h4>
                  <p className="text-sm text-muted-foreground">Festival Days</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-monastery-gold">25</h4>
                  <p className="text-sm text-muted-foreground">Daily Prayers</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-monastery-blue">8</h4>
                  <p className="text-sm text-muted-foreground">Special Ceremonies</p>
                </Card>
                <Card className="p-6 text-center border-0 bg-card/60">
                  <h4 className="font-semibold mb-2 text-2xl text-monastery-red">200+</h4>
                  <p className="text-sm text-muted-foreground">Participants</p>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CulturalCalendarPage;
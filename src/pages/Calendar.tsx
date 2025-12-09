import { useState, useMemo } from "react";
import { ArrowRight, ArrowLeft, Calendar, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ExpandableCard } from "@/components/ui/expandable-card";
import MuteButton from "@/components/MuteButton";

type Season = 'summer' | 'monsoon' | 'winter';
type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';
type EventType = 'Festival' | 'Fair' | 'Event';

interface CulturalEvent {
  id: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  months: Month[];
  season: Season;
  type: EventType;
}

// Event data with months, seasons, and types
const allEvents: CulturalEvent[] = [
  {
    id: 1,
    title: "Maghe Sankranti",
    description: "Harvest and thanksgiving festival marking the Sun's transition into Capricorn, celebrated with river baths, traditional foods, and the famous Jorethang Maghey Mela.",
    image: "/assets/images/maghe sankranti.jpg",
    imageAlt: "Maghe Sankranti celebration at Jorethang",
    months: ['Jan'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 2,
    title: "Sonam Lhochhar",
    description: "Tamang New Year festival celebrating cultural identity, harmony, and renewal with mask dances, monastery visits, and traditional food.",
    image: "/assets/images/sonam-lhochhar-festival1.jpg",
    imageAlt: "Sonam Lhochhar Tamang New Year celebration",
    months: ['Jan'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 3,
    title: "Losar Festival",
    description: "Tibetan New Year marking the beginning of the lunar calendar with prayer ceremonies, masked dances, butter lamps, and community celebrations.",
    image: "/assets/images/Losar-Festival-Sikkim.jpg",
    imageAlt: "Losar Festival Tibetan New Year celebration",
    months: ['Feb'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 4,
    title: "Bumchu Festival",
    description: "Sacred water vessel ceremony at Tashiding Monastery where the water level predicts Sikkim's fortune for the coming year.",
    image: "/assets/images/bumchu.jpeg.jpg",
    imageAlt: "Bumchu Festival sacred water ceremony",
    months: ['Mar'],
    season: 'summer',
    type: 'Festival'
  },
  {
    id: 5,
    title: "Chaite Dashain",
    description: "Spring celebration honoring Goddess Durga, symbolizing protection and the triumph of good over evil, observed by the Nepali Hindu community.",
    image: "/assets/images/Chaite Dashain.jpg",
    imageAlt: "Chaite Dashain spring festival",
    months: ['Mar'],
    season: 'summer',
    type: 'Festival'
  },
  {
    id: 6,
    title: "Flower Festival / Orchid Show",
    description: "Celebration of Sikkim's extraordinary floral heritage, showcasing rare orchids, rhododendrons, and Himalayan blooms in Gangtok and Namchi.",
    image: "/assets/images/flower-festival1.jpg",
    imageAlt: "Sikkim Flower Festival orchid exhibition",
    months: ['Mar', 'Apr'],
    season: 'summer',
    type: 'Fair'
  },
  {
    id: 7,
    title: "Ravangla Crafts Festival",
    description: "Celebration of Sikkim's traditional and contemporary handicrafts, featuring handwoven textiles, bamboo crafts, jewelry, and regional art forms.",
    image: "/assets/images/Ravangla Crafts Festival.jpg",
    imageAlt: "Ravangla Crafts Festival traditional handicrafts",
    months: ['Apr'],
    season: 'summer',
    type: 'Fair'
  },
  {
    id: 8,
    title: "Sakewa Festival",
    description: "Rai (Kirat) community festival centered around nature worship and ancestral traditions with Bhumi Puja, traditional dances, and community feasting.",
    image: "/assets/images/sakewa.jpg",
    imageAlt: "Sakewa Festival Rai community celebration",
    months: ['Apr', 'May'],
    season: 'summer',
    type: 'Festival'
  },
  {
    id: 9,
    title: "Saga Dawa Festival",
    description: "Sacred Buddhist festival commemorating Buddha's birth, enlightenment, and parinirvana with prayers, butter lamps, and acts of compassion.",
    image: "/assets/images/Losar-Festival-Sikkim.jpg",
    imageAlt: "Saga Dawa Buddhist festival",
    months: ['May', 'Jun'],
    season: 'summer',
    type: 'Festival'
  },
  {
    id: 10,
    title: "Drupka Tshechi Festival",
    description: "Commemorates Buddha's first sermon at Sarnath, marking the beginning of the Wheel of Dharma, celebrated in Muguthang and Gangtok.",
    image: "/assets/images/drupka festival.jpg",
    imageAlt: "Drupka Tshechi Festival Buddhist celebration",
    months: ['Jul'],
    season: 'monsoon',
    type: 'Festival'
  },
  {
    id: 11,
    title: "Guru Rinpoche's Thunkar Tshechu",
    description: "Honors Guru Padmasambhava who introduced Buddhism to the Himalayas, featuring sacred chants, offerings, and ceremonial thangka display.",
    image: "/assets/images/guru rimpoche.jpg",
    imageAlt: "Guru Rinpoche Thunkar Tshechu festival",
    months: ['Jul', 'Aug'],
    season: 'monsoon',
    type: 'Festival'
  },
  {
    id: 12,
    title: "Pang Lhabsol",
    description: "Unique Sikkimese festival honoring Mount Khangchendzonga as the guardian deity, featuring masked dances and prayers for unity and protection.",
    image: "/assets/images/Pang Lhabsol.jpg",
    imageAlt: "Pang Lhabsol Khangchendzonga festival",
    months: ['Aug'],
    season: 'monsoon',
    type: 'Festival'
  },
  {
    id: 13,
    title: "Tendong Lho Rum Faat",
    description: "Lepcha festival commemorating how Mount Tendong protected ancestors during a great flood, expressing gratitude to nature and reinforcing cultural identity.",
    image: "/assets/images/Pang Lhabsol.jpg",
    imageAlt: "Tendong Lho Rum Faat Lepcha festival",
    months: ['Aug'],
    season: 'monsoon',
    type: 'Festival'
  },
  {
    id: 14,
    title: "Indrajatra / Yenya Punhi",
    description: "Festival dedicated to Lord Indra, celebrating rainfall and agricultural abundance with traditional Newar dances, music, and offerings.",
    image: "/assets/images/chaku-laddu (1).jpg",
    imageAlt: "Indrajatra Yenya Punhi festival",
    months: ['Sep'],
    season: 'monsoon',
    type: 'Festival'
  },
  {
    id: 15,
    title: "Dashain / Bijaya Dashami",
    description: "Major Nepali Hindu festival celebrating Goddess Durga's victory over evil, featuring family gatherings, puja, tika blessings, and traditional feasts.",
    image: "/assets/images/chaku-laddu (1).jpg",
    imageAlt: "Dashain Bijaya Dashami celebration",
    months: ['Oct'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 16,
    title: "Lhabab Düchen",
    description: "Sacred Buddhist festival commemorating Buddha's descent from heaven, with butter lamps, circumambulation, and multiplied spiritual merit.",
    image: "/assets/images/Saga Dawa Festival.avif",
    imageAlt: "Lhabab Düchen Buddhist festival",
    months: ['Nov'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 17,
    title: "Tihar (Deepawali / Diwali)",
    description: "Five-day Nepali Hindu festival honoring crows, dogs, Lakshmi, cattle, and siblings, celebrating prosperity, gratitude, and relationships.",
    image: "/assets/images/tihar-diwali.jpg",
    imageAlt: "Tihar Deepawali Diwali celebration",
    months: ['Nov'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 18,
    title: "Kagyed Dance Festival",
    description: "Sacred Buddhist ritual with elaborate masked dances to dispel negativity and welcome peace before the new year, featuring Cham performances.",
    image: "/assets/images/Kagyed Dance Festival.jpg",
    imageAlt: "Kagyed Dance Festival Cham dances",
    months: ['Dec'],
    season: 'winter',
    type: 'Festival'
  },
  {
    id: 19,
    title: "Losoong Festival (Namsoong)",
    description: "Sikkimese Lunar New Year marking the end of harvest season with prayer ceremonies, Cham dances, archery competitions, and cultural performances.",
    image: "/assets/images/loosong-festival1.jpg",
    imageAlt: "Losoong Festival Sikkimese New Year",
    months: ['Dec'],
    season: 'winter',
    type: 'Festival'
  }
];

const CulturalCalendarPage = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<Month[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<EventType[]>([]);

  // Month names for display
  const monthNames: Month[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Season definitions
  const seasons = [
    { id: 'summer' as Season, label: 'Summer', months: '(Mar - Jun)' },
    { id: 'monsoon' as Season, label: 'Monsoon', months: '(Jul - Sep)' },
    { id: 'winter' as Season, label: 'Winter', months: '(Oct - Feb)' }
  ];

  // Event types
  const eventTypes: EventType[] = ['Festival', 'Fair', 'Event'];

  // Toggle functions
  const toggleSeason = (season: Season) => {
    setSelectedSeasons(prev =>
      prev.includes(season) ? prev.filter(s => s !== season) : [...prev, season]
    );
  };

  const toggleMonth = (month: Month) => {
    setSelectedMonths(prev =>
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const toggleType = (type: EventType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const removeMonth = (month: Month) => {
    setSelectedMonths(prev => prev.filter(m => m !== month));
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!event.title.toLowerCase().includes(query) &&
          !event.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Season filter
      if (selectedSeasons.length > 0 && !selectedSeasons.includes(event.season)) {
        return false;
      }

      // Month filter
      if (selectedMonths.length > 0) {
        const hasMatchingMonth = event.months.some(month => selectedMonths.includes(month));
        if (!hasMatchingMonth) {
          return false;
        }
      }

      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedSeasons, selectedMonths, selectedTypes]);

  return (
    <div className="min-h-screen bg-background">
      <MuteButton position="bottom-left" />

      <main className="pt-24">
        {/* Header */}
        <section className="py-8 -mt-24 sm:-mt-28 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-6">
              <Button variant="outline" asChild className="mr-4">
                <a href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </a>
              </Button>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-12">
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
              </p>
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Filter Panel */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm sticky top-24">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Season Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Season</h3>
                  <div className="space-y-2">
                    {seasons.map(season => (
                      <div key={season.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`season-${season.id}`}
                          checked={selectedSeasons.includes(season.id)}
                          onCheckedChange={() => toggleSeason(season.id)}
                        />
                        <label
                          htmlFor={`season-${season.id}`}
                          className="text-sm text-foreground cursor-pointer flex-1"
                        >
                          {season.label} <span className="text-muted-foreground">{season.months}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Month</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {monthNames.map(month => (
                      <div key={month} className="flex items-center space-x-2">
                        <Checkbox
                          id={`month-${month}`}
                          checked={selectedMonths.includes(month)}
                          onCheckedChange={() => toggleMonth(month)}
                        />
                        <label
                          htmlFor={`month-${month}`}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {month}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Type</h3>
                  <div className="space-y-2">
                    {eventTypes.map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => toggleType(type)}
                        />
                        <label
                          htmlFor={`type-${type}`}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2">
              {/* Results Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Selected Month Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedMonths.map(month => (
                    <Badge
                      key={month}
                      variant="secondary"
                      className="px-3 py-1 flex items-center gap-2"
                    >
                      {month}
                      <button
                        onClick={() => removeMonth(month)}
                        className="hover:bg-secondary/50 rounded-full p-0.5"
                        aria-label={`Remove ${month}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Results Count */}
                <div className="text-sm text-muted-foreground">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'result' : 'results'}
                </div>
              </div>

              {/* Events List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => {
                  // Generate detailed content for each event
                  const getEventDetails = (eventId: number) => {
                    const details: Record<number, React.ReactNode> = {
                      1: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">14 January 2026 (Wednesday)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Across Sikkim; major fair at Jorethang (South Sikkim)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">For broader festival + fair atmosphere → Jorethang on 14 Jan. For calmer local observance, any nearby village. Early morning for river bathing, whole day for mela & fairs.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Maghe Sankranti marks the beginning of the auspicious month of Magh and the transition of the Sun into the Capricorn zodiac (Makara).
                            In Sikkim, especially among the Nepali community, it is celebrated as a harvest and thanksgiving festival, symbolizing prosperity,
                            purification, and new beginnings. People take holy river baths for spiritual cleansing, enjoy traditional foods like til ko laddu,
                            gheu-chiura, and attend fairs such as the famous Jorethang Maghey Mela, which represents unity and cultural exchange.
                          </p>
                        </>
                      ),
                      2: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">19 January 2026 (Monday)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Rumtek Monastery, Phodong Monastery, Tsuklakhang Palace (Royal Chapel), Enchey Monastery and Depends on where Tamang people live</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">For public celebrations, events often run from early morning (around 8:00 AM) until late evening (around 11:00 PM). To experience the full range of activities, arriving in the morning or early afternoon is recommended.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Sonam Lhochhar is the New Year festival of the Tamang community and marks the start of a fresh lunar year. It is a celebration
                            of cultural identity, harmony, and renewal. Families clean their homes to invite good fortune, visit monasteries, perform Mask
                            dances (Tamang Selo), and share traditional food. The festival honours ancestral spirits, strengthens community ties, and welcomes
                            the New Year with joy, music, and blessings.
                          </p>
                        </>
                      ),
                      3: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">18 February 2026</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Celebrated widely across Sikkim, especially in Buddhist monasteries such as Rumtek Monastery, Phodong Monastery, Pemayangtse Monastery, and in Buddhist communities in Gangtok, Pelling, Lachen, and nearby villages.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">The first three days are the most significant. Visiting monasteries in the morning offers a chance to witness rituals, prayers, and masked dances. Evenings are ideal for experiencing community celebrations, festive food, and cultural performances.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Losar means "New Year" in Tibetan and marks the beginning of the Tibetan lunar calendar. It symbolizes the clearing away of
                            negativity and the welcoming of positive energy for the year ahead. Before Losar, homes and monasteries are thoroughly cleaned
                            to symbolize fresh beginnings. The festival includes prayer ceremonies, offering bowls, religious dances such as Cham, lighting
                            butter lamps, and sharing traditional food and drinks. Losar represents renewal, spiritual cleansing, family unity, and the hope
                            for peace, prosperity, and harmony in the coming year.
                          </p>
                        </>
                      ),
                      4: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (falls on the 14th–15th day of the first Tibetan lunar month)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Tashiding Monastery, West Sikkim</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Arrive one day before the ceremony. The opening of the sacred vase usually begins at midnight and continues into the early morning. The most meaningful time to visit is early morning when rituals are performed and holy water is distributed.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Bumchu means "Holy Water Pot." Once a year, monks open a sealed sacred vase stored in the monastery. The water level inside is
                            believed to predict the fortune of Sikkim for the coming year — balance indicates peace, too full signifies possible unrest,
                            and too low suggests hardship. A small amount of the holy water is then shared with devotees, and the vase is refilled and sealed
                            until the next year, symbolizing continuity, purification, and protection.
                          </p>
                        </>
                      ),
                      5: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">27 March 2026</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Celebrated across Sikkim, mainly in homes, temples, and Nepali-Hindu community spaces.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning temple visits are most meaningful as rituals, prayers, and offerings take place early in the day.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Chaite Dashain is a spring celebration observed by the Nepali Hindu community in Sikkim. It is considered a smaller version of
                            the main Dashain festival held in autumn. The festival honors Goddess Durga, symbolizing protection, strength, and the triumph of
                            good over evil. Families perform puja, offer prayers, and prepare traditional food as a way of seeking blessings for prosperity and
                            well-being. Chaite Dashain is also associated with Ram Navami, marking the birth of Lord Rama, making it both spiritually significant
                            and culturally festive.
                          </p>
                        </>
                      ),
                      6: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (March to April)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">In Gangtok / Namchi</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Mid-March is ideal. Mornings and early afternoons are the best for photography.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            The Flower Festival celebrates Sikkim's extraordinary floral heritage, especially its native orchid species, many of which are rare
                            or endemic. The exhibition showcases a wide array of orchids, rhododendrons, primulas, and other Himalayan blooms. The festival
                            promotes environmental awareness, biodiversity conservation, and pride in Sikkim's natural beauty. It is an important cultural-tourism
                            event that highlights the state's identity as a biodiversity hotspot and "the land of flowers."
                          </p>
                        </>
                      ),
                      7: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (April)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Ravangla, around Cho-Dzo (Cho-Zo) Lake</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Midday to late afternoon.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            The Ravangla Crafts Festival is a celebration of Sikkim's rich traditional and contemporary handicrafts. The event brings together
                            local artisans who showcase handwoven textiles, bamboo and wood craft, traditional jewelry, carpets, organic products, and regional
                            art forms. The festival serves as a platform to preserve local craftsmanship, support artisan livelihoods, and connect culture with
                            tourism. It highlights Sikkim's artistic identity while offering visitors a lively atmosphere of music, dance, food, and handmade heritage.
                          </p>
                        </>
                      ),
                      8: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (April / May)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Celebrated by the Rai (Kirat) community across Sikkim.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning for observing the main rituals and offerings, and afternoon to evening for community dances, feasts, and cultural performances.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Sakewa is an important cultural and spiritual festival of the Rai (Kirat) community, centered around nature worship and ancestral
                            traditions. It begins with Bhumi Puja, an offering to Mother Earth to express gratitude and seek blessings for fertility, health,
                            good harvest, and harmony with nature. After the rituals, people gather for traditional group dances known as Sili, accompanied by
                            chants and folk instruments. The festival represents unity, gratitude, environmental respect, and the deep connection between people
                            and the natural world.
                          </p>
                        </>
                      ),
                      9: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">31 May 2026 (Sunday)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Rumtek, Pemayangtse, Phodong, Tashiding Monasteries and surrounding communities.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning to early afternoon.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Saga Dawa is one of the most sacred Buddhist festivals in Sikkim. It marks three key events in the life of Lord Buddha — his birth,
                            enlightenment, and parinirvana (passing). The day is dedicated to compassion, generosity, and spiritual reflection. Devotees visit
                            monasteries, light butter lamps, offer prayers, chant mantras, and take part in kora (ritual circumambulation). Acts of kindness,
                            charity, and avoiding harm are emphasized, making Saga Dawa not just a celebration but a deeply meaningful spiritual observance.
                          </p>
                        </>
                      ),
                      10: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">18 July 2026 (Saturday)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Muguthang in North Sikkim and the Deer Park in Gangtok</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning and early afternoon.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Drupka Tshechi commemorates the day when Lord Buddha delivered his first sermon at Sarnath after attaining enlightenment. This moment
                            marked the beginning of the "Turning of the Wheel of Dharma," when the core teachings of Buddhism were shared with the world. The
                            festival honors wisdom, compassion, and the spreading of spiritual knowledge. Devotees participate in prayers, listen to teachings,
                            perform acts of kindness, and reflect on the Four Noble Truths. The day serves as a reminder of Buddha's message: to live mindfully,
                            avoid harm, and practice compassion.
                          </p>
                        </>
                      ),
                      11: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (held on the 10th day of the 5th Tibetan lunar month - July / August)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Gangtok, Sikkim — around Do-Drul Chorten Monastery and the Maitri Manjari area near White Hall.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning and early afternoon when ceremonies take place.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Guru Rinpoche's Thunkar Tshechu honors Guru Padmasambhava (Guru Rinpoche), who is believed to have introduced Buddhism to the Himalayan
                            region, including Sikkim. The festival includes sacred chants, offerings, and a religious procession that symbolizes devotion, protection,
                            and spiritual blessings. A key highlight is the ceremonial display of a large silk thangka of Guru Rinpoche, allowing devotees to receive
                            blessings through sight. The festival reflects deep faith, cultural heritage, and the spiritual relationship between Sikkim and Guru Padmasambhava.
                          </p>
                        </>
                      ),
                      12: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (August)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Across Sikkim, Pemayangtse Monastery (West Sikkim), Tsuklakhang Palace Monastery (Gangtok)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning of the main day.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Pang Lhabsol is a unique festival of Sikkim dedicated to honoring Mount Khangchendzonga, regarded as the guardian deity of the land and
                            its people. The festival symbolizes unity, protection, and gratitude. Rituals include prayers to the mountain deity, offerings for peace
                            and harmony, and masked dances representing deities and warriors. The festival also reflects the historical oath of brotherhood between
                            the Lepcha and Bhutia communities, celebrating Sikkim's harmony, identity, and sacred connection to the natural world.
                          </p>
                        </>
                      ),
                      13: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (August)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Near Tendong Hill in South Sikkim</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning and afternoons.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Tendong Lho Rum Faat is one of the oldest and most important festivals of the Lepcha people. It commemorates the belief that Mount Tendong
                            once protected ancestral Lepchas during a great flood by rising like a ship above the waters. The festival is an expression of gratitude to
                            the mountain and nature, symbolizing survival, protection, and harmony. It reinforces Lepcha identity through rituals, prayers, cultural
                            performances, and storytelling that pass ancestral history to younger generations.
                          </p>
                        </>
                      ),
                      14: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (September)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Celebrated mainly by the Newar and Nepali community in Sikkim</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Afternoon and evening.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Indrajatra, also called Yenya Punhi, is a festival dedicated to Lord Indra, the deity of rain and the heavens. It marks gratitude for rainfall,
                            which sustains agriculture, and celebrates the balance between nature and community life. The festival includes traditional Newar dance forms
                            such as Lakhey dance, devotional songs, and offerings. It serves as a cultural bridge, preserving Newar identity and heritage within Sikkim
                            while celebrating abundance, protection, and good harvest. Some households and community halls perform traditional masked dances and processions
                            inspired by the Kathmandu Valley customs.
                          </p>
                        </>
                      ),
                      15: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">21 October 2026</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Celebrated across Sikkim, especially in Nepali Hindu households</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning visits on Maha Ashtami, Maha Navami, and Bijaya Dashami.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Dashain is one of the biggest festivals for the Nepali Hindu community in Sikkim. It celebrates the victory of Goddess Durga over the demon
                            Mahishasura, symbolizing the triumph of good over evil. Families gather to perform puja, offer prayers, and prepare traditional food. On the
                            main day, elders apply tika and jamara to bless younger family members for prosperity, good health, and protection. The festival represents
                            unity, gratitude, renewal, and the strengthening of family and community bonds.
                          </p>
                        </>
                      ),
                      16: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">1 November 2026</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Rumtek, Enchey, Phodong, Pemayangtse, Tashiding, and various local Gompas.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Morning and early evening.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Lhabab Düchen commemorates the day when Lord Buddha descended from the heavenly realm after teaching his mother and celestial beings. It is one
                            of the four most sacred Buddhist festivals. Devotees light butter lamps, circumambulate monasteries, and participate in prayer ceremonies.
                            Some monasteries also perform chanting and short ritual dances. The day symbolizes the Buddha's compassion and wisdom, and it is believed that
                            positive actions, offerings, and good deeds performed on this day are multiplied spiritually. The festival inspires mindfulness, kindness, and
                            a deep connection to Buddhist teachings.
                          </p>
                        </>
                      ),
                      17: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">6–10 November 2026</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Celebrated across Sikkim</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Evenings.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Tihar is one of the most important Nepali Hindu festivals in Sikkim and is celebrated over five thematic days, each honoring a different symbol
                            of life, prosperity, and coexistence.
                          </p>
                          <p className="mb-2"><strong>Day 1 — Kaag Tihar:</strong> Crows are honored as messengers and protectors, symbolizing awareness and connection between the seen and unseen.</p>
                          <p className="mb-2"><strong>Day 2 — Kukur Tihar:</strong> Dogs are worshipped for loyalty, service, and companionship, representing protection and unconditional love.</p>
                          <p className="mb-2"><strong>Day 3 — Laxmi Puja:</strong> Homes are cleaned, decorated with oil lamps and rangoli, and Goddess Lakshmi is worshipped for prosperity and abundance.</p>
                          <p className="mb-2"><strong>Day 4 — Goru / Govardhan Puja:</strong> Cattle are honored as helpers in agriculture and daily life, symbolizing gratitude toward nature and livelihood.</p>
                          <p className="mb-4"><strong>Day 5 — Bhai Tika:</strong> The festival concludes with a ritual that strengthens the bond between siblings, where sisters apply colorful tika to brothers as a blessing for long life, protection, and happiness.</p>
                          <p>
                            Throughout the festival, homes glow with light, traditional songs such as Deusi-Bhailo are performed, and families share sweets and festive meals.
                            Tihar represents gratitude, harmony, prosperity, and the celebration of relationships — both human and spiritual.
                          </p>
                        </>
                      ),
                      18: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">18–19 December 2026</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Rumtek Monastery and Enchey Monastery in Gangtok.</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Afternoon and evening.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            The Kagyed Dance Festival is a sacred Buddhist ritual performed to dispel negativity and welcome peace, harmony, and good fortune before
                            the arrival of the new year. Elaborate masked dances (Cham) are performed by monks, representing guardian deities, spiritual protectors, and
                            symbolic triumph over ignorance and evil. The atmosphere is accompanied by traditional instruments, chanting, and ritual offerings. The festival
                            concludes with the burning of symbolic effigies, marking the cleansing of past negativity and the beginning of a spiritually renewed period.
                          </p>
                        </>
                      ),
                      19: (
                        <>
                          <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-sm font-medium text-muted-foreground mb-1">Date</p>
                            <p className="text-foreground mb-3">To be confirmed (December - Tibetan Lunar Calendar)</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                            <p className="text-foreground mb-3">Tashiding, Phodong, and Rumtek monasteries</p>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Best Time to Visit</p>
                            <p className="text-foreground">Mornings and afternoons.</p>
                          </div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">Significance</h4>
                          <p className="mb-4">
                            Losoong marks the Sikkimese Lunar New Year and the end of the harvest season. Originally a farming celebration, it has evolved into a major
                            cultural and spiritual festival for the Bhutia and Lepcha communities. The festival expresses gratitude for the harvest and welcomes a
                            fresh beginning with renewed hopes and blessings. Monasteries hold prayer ceremonies and sacred Cham (masked dances) that symbolize the
                            victory of good over evil and the clearing away of negative energies before the new year begins. Traditional food, archery competitions,
                            and cultural performances are also part of the celebrations, strengthening community identity and cultural continuity. Losoong embodies
                            joy, renewal, unity, and the deep connection between nature, spirituality, and community life in Sikkim.
                          </p>
                        </>
                      ),
                    };
                    return details[eventId] || <p>More information about this event coming soon.</p>;
                  };

                  return (
                    <ExpandableCard
                      key={event.id}
                      title={event.title}
                      src={event.image}
                      description={`${event.type} • ${event.months.join(', ')}`}
                      classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-medium"
                    >
                      {getEventDetails(event.id)}
                    </ExpandableCard>
                  );
                })}
              </div>

              {/* No Results Message */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No events found matching your filters.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSeasons([]);
                      setSelectedMonths([]);
                      setSelectedTypes([]);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CulturalCalendarPage;

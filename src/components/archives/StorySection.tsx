import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Eye, ArrowRight, X, ChevronRight } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  description: string;
  coverImage: string; // Cover image for the card
  pages: string[]; // Array of page images
  year?: string;
  author?: string;
  totalPages: number;
}

const stories: Story[] = [
  {
    id: 'life-of-buddha',
    title: 'Life of Buddha',
    description: 'A sacred visual journey through the life and enlightenment of Siddhartha Gautama. Witness the transformation from prince to the awakened one who showed the path to inner peace.',
    coverImage: '/assets/stories/buddha-teachings/1.png',
    pages: Array.from({ length: 15 }, (_, i) => `/assets/stories/buddha-teachings/${i + 1}.png`),
    year: '8th century CE ',
    author: 'Guru Rinpoche',
    totalPages: 15
  },
  {
    id: 'yak-dance',
    title: 'Yak Dance',
    description: 'A traditional tale of the sacred Yak Dance ceremony, passed down through generations. Experience the vibrant cultural heritage and spiritual significance of this ancient ritual.',
    coverImage: '/assets/stories/yak-dance/1.png',
    pages: Array.from({ length: 12 }, (_, i) => `/assets/stories/yak-dance/${i + 1}.png`),
    year: '18th century',
    author: 'Chador Namgyal',
    totalPages: 12
  }
];

const StorySection = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [hoveredStory, setHoveredStory] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Keyboard navigation - ESC to close
  useEffect(() => {
    if (!selectedStory) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedStory(null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedStory]);

  // Prevent body scroll when modal is open and track scroll progress
  useEffect(() => {
    if (!selectedStory) {
      document.body.style.overflow = '';
      return;
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    const handleScroll = () => {
      const readerElement = document.getElementById('manga-reader-scroll');
      if (readerElement) {
        const scrolled = readerElement.scrollTop;
        const height = readerElement.scrollHeight - readerElement.clientHeight;
        const progress = height > 0 ? (scrolled / height) * 100 : 0;
        setScrollProgress(progress);
      }
    };

    const readerElement = document.getElementById('manga-reader-scroll');
    if (readerElement) {
      readerElement.addEventListener('scroll', handleScroll);
      // Initial scroll position
      readerElement.scrollTop = 0;
    }

    return () => {
      document.body.style.overflow = '';
      if (readerElement) {
        readerElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedStory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-parchment-100 rounded-full mb-6">
          <BookOpen className="w-5 h-5 text-parchment-700" />
          <span className="text-sm font-medium text-parchment-800 uppercase tracking-wider">Visual Stories</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-4">
          Sacred Tales & Legends
        </h2>
        <p className="text-lg text-ink-600 max-w-2xl mx-auto font-light">
          Immerse yourself in our collection of illustrated stories, 
          where ancient wisdom meets artistic expression
        </p>
      </motion.div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="group max-w-md mx-auto w-full"
            onMouseEnter={() => setHoveredStory(story.id)}
            onMouseLeave={() => setHoveredStory(null)}
          >
              {/* Story Card */}
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-parchment-200 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                
                {/* Image Container - Shorter height */}
                <div className="relative aspect-[5/4] overflow-hidden bg-parchment-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                
                {/* Cover Image */}
                <img 
                  src={story.coverImage} 
                  alt={`${story.title} cover`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-ink-900 shadow-lg">
                    {story.totalPages} Pages
                  </span>
                </div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredStory === story.id ? 1 : 0 }}
                  className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.button
                    initial={{ scale: 0.8 }}
                    animate={{ scale: hoveredStory === story.id ? 1 : 0.8 }}
                    onClick={() => {
                      setSelectedStory(story);
                      setScrollProgress(0);
                    }}
                    className="px-6 py-3 bg-white text-ink-900 rounded-full font-semibold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-shadow"
                  >
                    <Eye className="w-5 h-5" />
                    Start Reading
                  </motion.button>
                </motion.div>
              </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-serif text-parchment-600 italic">
                      {story.year}
                    </span>
                    <span className="text-xs text-ink-500 uppercase tracking-wide">
                      {story.author}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-ink-900 mb-2 group-hover:text-parchment-700 transition-colors">
                    {story.title}
                  </h3>
                  
                  <p className="text-sm text-ink-600 leading-relaxed mb-3">
                    {story.description}
                  </p>

                  <button
                    onClick={() => {
                      setSelectedStory(story);
                      setScrollProgress(0);
                    }}
                    className="inline-flex items-center gap-1.5 text-sm text-parchment-700 font-semibold hover:text-parchment-900 transition-colors group/btn"
                  >
                    Start Reading
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vertical Scroll Manga Reader */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-30 bg-gradient-to-b from-black via-black/80 to-transparent pb-1">
              <div className="flex items-center justify-between p-4 md:p-6">
                <div className="flex-1">
                  <h3 className="text-white font-serif text-lg md:text-2xl font-bold">
                    {selectedStory.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm">
                    {selectedStory.totalPages} Pages • Scroll to read
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    setScrollProgress(0);
                  }}
                  className="p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm ml-4"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Scroll Progress Bar */}
              <div className="w-full bg-white/10 h-1">
                <motion.div
                  className="h-full bg-parchment-500"
                  style={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div
              id="manga-reader-scroll"
              className="fixed inset-0 top-[88px] md:top-[104px] w-full overflow-y-auto overflow-x-hidden scroll-smooth"
              style={{ 
                scrollbarWidth: 'thin', 
                scrollbarColor: '#d9a071 #1a1a1a',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {/* Top Padding for Header */}
              <div className="h-2" />

              {/* Story Pages - Stacked Vertically */}
              <div className="max-w-3xl mx-auto px-2 md:px-4 pb-8">
                {selectedStory.pages.map((page, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-2 md:mb-4"
                  >
                    {/* Page Number Badge */}
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-white/40 text-xs font-medium px-3 py-1 bg-white/5 rounded-full backdrop-blur-sm">
                        Page {index + 1}
                      </span>
                    </div>

                    {/* Page Image */}
                    <div className="relative w-full bg-black rounded-sm md:rounded-lg overflow-hidden shadow-2xl">
                      <img
                        src={page}
                        alt={`${selectedStory.title} - Page ${index + 1}`}
                        className="w-full h-auto object-contain"
                        loading={index > 2 ? "lazy" : "eager"}
                      />
                    </div>
                  </motion.div>
                ))}

                {/* End of Story */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center py-12 mt-8"
                >
                  <div className="mb-6">
                    <BookOpen className="w-16 h-16 text-parchment-500 mx-auto mb-4" />
                    <h4 className="text-white font-serif text-2xl font-bold mb-2">
                      End of Story
                    </h4>
                    <p className="text-white/60 text-sm mb-8">
                      You've reached the end of "{selectedStory.title}"
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStory(null);
                      setScrollProgress(0);
                    }}
                    className="px-8 py-3 bg-parchment-700 hover:bg-parchment-800 text-white rounded-full font-semibold transition-colors shadow-lg"
                  >
                    Back to Stories
                  </button>
                </motion.div>
              </div>

              {/* Bottom Padding */}
              <div className="h-8" />
            </div>

            {/* Scroll to Top Button */}
            {scrollProgress > 20 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  const reader = document.getElementById('manga-reader-scroll');
                  if (reader) reader.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="fixed bottom-6 right-6 z-30 p-3 md:p-4 bg-parchment-700 hover:bg-parchment-800 rounded-full shadow-2xl transition-colors"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white rotate-[-90deg]" />
              </motion.button>
            )}

            {/* Hint - Appears briefly */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
            >
              <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white/70 text-xs text-center">
                  Scroll down to read • Press ESC to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="mt-16 flex items-center justify-center gap-2 text-parchment-400">
        <div className="h-px w-12 bg-parchment-300"></div>
        <BookOpen className="w-5 h-5" />
        <div className="h-px w-12 bg-parchment-300"></div>
      </div>
    </div>
  );
};

export default StorySection;


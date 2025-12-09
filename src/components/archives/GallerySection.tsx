import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryImage {
  id: string;
  title: string;
  image: string;
}

// Gallery data - Order matters for the column layout
const galleryImages: GalleryImage[] = [
  { id: 'g1', title: 'Summer in Sikkim', image: '/gallery/_Embrace summer in Sikkim with lush valleys and….jpg' },
  { id: 'g36', title: 'Somewhere in Sikkim', image: '/gallery/6th-image.jpg' },
  { id: 'g37', title: 'East Sikkim Tour', image: '/gallery/East Sikkim Tour Packages.jpg' },
  { id: 'g3', title: 'Mountain Vistas', image: '/gallery/aakanksha-A0vabw8DVx0-unsplash.jpg' },
  { id: 'g35', title: 'Thukpa Dish', image: '/gallery/Thukpa from Sikkim 🥰.jpg' },
  { id: 'g4', title: 'Traditional Brides', image: '/gallery/Brides of India_ The Seven Sisters & Their….jpg' },
  { id: 'g2', title: 'Historical Archive', image: '/gallery/5cc1f58a8e9cbe2ef6d75b251439fec6.jpg' },
  { id: 'g5', title: 'Choliya Dance', image: '/gallery/Choliya Dance.jpg' },
  { id: 'g6', title: 'Ancient Architecture', image: '/gallery/dc7d36e85e63fff3d6475ce4cdad6b6d.jpg' },
  { id: 'g7', title: 'Scenic Hills', image: '/gallery/debarghya-meikap-Ywo4F7eWDOI-unsplash.jpg' },
  { id: 'g8', title: 'Cultural Heritage', image: '/gallery/download (1).jpg' },
  { id: 'g9', title: 'Local Festival', image: '/gallery/download.jpg' },
  { id: 'g10', title: 'Enchey Monastery', image: '/gallery/enchey side.jpg' },
  { id: 'g11', title: 'Vibrant Culture', image: '/gallery/Experience the vibrant culture and traditions of….jpg' },
  { id: 'g12', title: 'Gorkha Dancers', image: '/gallery/Gorkha (Gurkha) Dancers of Sikkim.jpg' },
  { id: 'g13', title: 'Top Events', image: '/gallery/Here are some top 12 best events in Sikkim to….jpg' },
  { id: 'g14', title: 'Schoolchildren', image: '/gallery/https___flic_kr_p_r9JX8 _ Schoolchildren, Sikkim….jpg' },
  { id: 'g16', title: 'Local Life', image: '/gallery/images (1).jpg' },
  { id: 'g17', title: 'Temple Detail', image: '/gallery/images (2).jpg' },
  { id: 'g18', title: 'Monastic Life', image: '/gallery/images (4).jpg' },
  { id: 'g19', title: 'Archive 2025-1', image: '/gallery/IMG-20251122-WA0034.jpg' },
  { id: 'g20', title: 'Archive 2025-2', image: '/gallery/IMG-20251208-WA0018.jpg' },
  { id: 'g21', title: 'Archive 2025-3', image: '/gallery/IMG-20251208-WA0028.jpg' },
  { id: 'g22', title: 'Archive 2025-4', image: '/gallery/IMG-20251208-WA0030.jpg' },
  { id: 'g23', title: 'Archive 2025-5', image: '/gallery/IMG-20251208-WA0039.jpg' },
  { id: 'g24', title: 'Archive 2025-6', image: '/gallery/IMG-20251208-WA0044.jpg' },
  { id: 'g25', title: 'Archive 2025-7', image: '/gallery/IMG-20251208-WA0045.jpg' },
  { id: 'g26', title: 'Archive 2025-8', image: '/gallery/IMG-20251208-WA0048 (1).jpg' },
  { id: 'g27', title: 'Archive 2025-9', image: '/gallery/IMG-20251208-WA0048.jpg' },
  { id: 'g28', title: 'Archive 2025-10', image: '/gallery/IMG-20251208-WA0053.jpg' },
  { id: 'g29', title: 'Mask Dance', image: '/gallery/istockphoto-606223864-612x612.jpg' },
  { id: 'g30', title: 'Mani Chokhor Ling', image: '/gallery/Mani Chokhor Ling Monastery in Ravangla, Sikkim.jpg' },
  { id: 'g31', title: 'Active Sport', image: '/gallery/Sikkim - A Chance to Mix Wondrous Nature with Active Sport - Shikhar Blog.jpg' },
  { id: 'g32', title: 'Sikkim Cuisine', image: '/gallery/Sikkim Cuisine - Ribbons to Pastas.jpg' },
  { id: 'g33', title: 'Sikkim Market', image: '/gallery/Sikkim market facebook collection.jpg' },
  { id: 'g34', title: 'Sikkim Panorama', image: '/gallery/Sikkim.jpg' }
];

const GallerySection = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowRight') goToNext();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImageIndex]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-parchment-100 rounded-full mb-6">
          <ImageIcon className="w-5 h-5 text-parchment-700" />
          <span className="text-sm font-medium text-parchment-800 uppercase tracking-wider">Photo Gallery</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-4">
          Visual Archives
        </h2>
        <p className="text-lg text-ink-600 max-w-2xl mx-auto font-light">
          Explore our curated collection of historical photographs and artifacts
        </p>
      </motion.div>

      {/* Masonry Layout using CSS Columns - No gaps! */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.02 }}
            className="break-inside-avoid mb-4 group cursor-pointer relative rounded-lg overflow-hidden bg-parchment-100 shadow-md hover:shadow-xl transition-all duration-300"
            onClick={() => openLightbox(index)}
          >
            {/* Image Container - Natural Height */}
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-auto object-cover block"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
              }}
            />
            
            {/* Fallback Icon */}
            <div className="hidden w-full h-64 bg-gradient-to-br from-parchment-200 to-parchment-300 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-parchment-400" />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-all duration-300">
                <ZoomIn className="w-6 h-6 text-ink-900" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white font-medium text-sm">
                {selectedImageIndex + 1} / {galleryImages.length}
              </span>
            </div>

            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Main Image Display */}
            <div className="h-full w-full flex items-center justify-center p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={galleryImages[selectedImageIndex].image}
                    alt={galleryImages[selectedImageIndex].title}
                    className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
              Use arrow keys ← → or click buttons to navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="mt-12 flex items-center justify-center gap-2 text-parchment-400">
        <div className="h-px w-12 bg-parchment-300"></div>
        <ImageIcon className="w-5 h-5" />
        <div className="h-px w-12 bg-parchment-300"></div>
      </div>
    </div>
  );
};

export default GallerySection;

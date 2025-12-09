import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';

interface ManuscriptPage {
  pageNumber: number;
  image: string;
  translation: string;
}

interface Manuscript {
  id: string;
  title: string;
  description: string;
  author?: string;
  year?: string;
  language?: string;
  totalPages: number;
  pages: ManuscriptPage[];
}

// Single manuscript data
const manuscript: Manuscript = {
  id: 'manuscript-1',
  title: 'Ancient Wisdom Texts',
  description: 'Collection of philosophical teachings and spiritual guidance from ancient masters',
  author: 'Unknown Sage',
  year: '1650',
  language: 'Sanskrit',
  totalPages: 6,
  pages: [
    {
      pageNumber: 1,
      image: '/manuscripts/manu.jpg',
      translation: '"Homage to the Buddha, the Enlightened One. May all beings attain wisdom and freedom from suffering. May the teachings bring peace, healing, and clarity to the mind. We seek guidance, compassion, and protection on the path to liberation."'
    },
    {
      pageNumber: 2,
      image: '/manuscripts/manu 2.jpg',
      translation: '"May the Buddha’s teachings illuminate our hearts. May ignorance and suffering be removed. We call upon compassion and wisdom to guide us on the noble path. May all living beings attain peace, clarity, and liberation. With devotion, we follow the Dharma and honor the enlightened ones."'
    },
    {
      pageNumber: 3,
      image: '/manuscripts/manu 3.jpg',
      translation: '"May the enlightened wisdom continue to shine upon the world. May those lost in darkness find the path of truth. We seek guidance from the Buddha to remove obstacles and purify the mind. May compassion grow in every heart, and may all beings be blessed with peace, strength, and clarity."'
    },
    {
      pageNumber: 4,
      image: '/manuscripts/manu 4.jpg',
      translation: '"May the wisdom of the awakened ones continue to guard us. May our doubts be dissolved and clarity arise. Through the Dharma, may the mind become strong and peaceful. We seek discipline, virtue, and guidance to walk the noble path. May every heart awaken to compassion and truth."'
    },
    {
      pageNumber: 5,
      image: '/manuscripts/manu 5.jpg',
      translation: '"We offer devotion to the Buddha and request blessings for all beings. May obstacles be removed from our lives, and may kindness flourish in every step we take. With sincerity and effort, may we purify our thoughts and grow closer to enlightenment."'
    },
    {
      pageNumber: 6,
      image: '/manuscripts/manu 6.jpg',
      translation: '"Let the path of Dharma be our light. May we walk with compassion, wisdom, and courage. May the suffering of all sentient beings come to an end. We pray for strength to act with virtue and to spread peace wherever we go."'
    }
  ]
};

const ManuscriptsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToNext = () => {
    if (currentPage < manuscript.totalPages - 1) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* Reader Content - Vertical Stack Layout */}
      <div className="max-w-5xl mx-auto px-4 py-8 pb-20 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8 relative z-10"
          >
            {/* Manuscript Image Section */}
            <div className="bg-gradient-to-br from-white to-parchment-50 rounded-2xl shadow-xl overflow-hidden border-4 border-parchment-200 relative">
              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-parchment-500 z-10 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-parchment-500 z-10 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-parchment-500 z-10 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-parchment-500 z-10 rounded-br-lg"></div>
              
              <div className="relative w-full">
                {/* Inner Frame */}
                <div className="w-full border-2 border-parchment-300 rounded-lg overflow-hidden flex items-center justify-center bg-white shadow-inner">
                  {/* Placeholder for missing images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-parchment-100 via-parchment-200 to-parchment-100 -z-10">
                    <FileText className="w-24 h-24 text-parchment-400" />
                  </div>

                  <img
                    src={manuscript.pages[currentPage].image}
                    alt={`Page ${currentPage + 1}`}
                    className="w-full h-auto object-contain relative z-10"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Translation Section */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-parchment-200 relative overflow-hidden">
              {/* Decorative Header */}
              <div className="bg-parchment-50 px-6 py-4 border-b border-parchment-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-parchment-100 flex items-center justify-center border border-parchment-200">
                    <span className="font-serif font-bold text-parchment-800">
                      {currentPage + 1}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ink-900 uppercase tracking-wider">English Translation</h4>
                </div>
                <span className="text-xs text-parchment-500 italic">Modern Interpretation</span>
              </div>

              {/* Content Area */}
              <div className="p-8 md:p-10 relative">
                <div className="relative max-w-4xl mx-auto px-8 md:px-12">
                  <span className="absolute -left-4 -top-4 text-6xl text-parchment-100 font-serif">"</span>
                  <div className="text-xl md:text-2xl text-ink-800 leading-relaxed font-serif relative z-10 text-center whitespace-pre-line">
                    {manuscript.pages[currentPage].translation.replace(/^"|"$/g, '')}
                  </div>
                  <span className="absolute -right-4 -bottom-8 text-6xl text-parchment-100 font-serif rotate-180">"</span>
                </div>
              </div>
            </div>

            {/* Bottom Page Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex flex-col items-center bg-white px-6 py-2 rounded-full shadow-md border border-parchment-200">
                <span className="text-[10px] text-parchment-500 uppercase tracking-wider font-bold">Reading Page</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-ink-900">{currentPage + 1}</span>
                  <span className="text-sm text-parchment-400">of</span>
                  <span className="text-sm text-parchment-600 font-medium">{manuscript.totalPages}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Navigation Buttons - Centered relative to the whole content block */}
        <button
          onClick={goToPrevious}
          disabled={currentPage === 0}
          className={`fixed md:absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 p-4 rounded-full shadow-xl border border-parchment-200 transition-all z-20 ${
            currentPage === 0
              ? 'bg-parchment-50 text-parchment-200 cursor-not-allowed opacity-50'
              : 'bg-white text-parchment-800 hover:bg-parchment-100 hover:scale-110 active:scale-95 hover:shadow-2xl'
          }`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <button
          onClick={goToNext}
          disabled={currentPage === manuscript.totalPages - 1}
          className={`fixed md:absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 p-4 rounded-full shadow-xl border border-parchment-200 transition-all z-20 ${
            currentPage === manuscript.totalPages - 1
              ? 'bg-parchment-50 text-parchment-200 cursor-not-allowed opacity-50'
              : 'bg-white text-parchment-800 hover:bg-parchment-100 hover:scale-110 active:scale-95 hover:shadow-2xl'
          }`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default ManuscriptsSection;

import { useState } from 'react';
import { motion } from 'framer-motion';
import StorySection from '@/components/archives/StorySection';
import ThangkasSection from '@/components/archives/ThangkasSection';
import GallerySection from '@/components/archives/GallerySection';
import ManuscriptsSection from '@/components/archives/ManuscriptsSection';
import DictionarySection from '@/components/archives/DictionarySection';
import HistorySection from '@/components/archives/HistorySection';

// Types for our archive content
type Section = 'story' | 'manuscripts' | 'tangkas' | 'dictionaries' | 'gallery' | 'history';

const Archives = () => {
  const [activeSection, setActiveSection] = useState<Section>('story');

  return (
    <div className="min-h-screen bg-parchment-50 text-ink-900 selection:bg-parchment-300 relative z-10">
      {/* Fixed Background Mandalas */}
      <div className="mandala-bottom-left" />
      <div className="mandala-bottom-right" />
      
      {/* Hero Section */}
      <header className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-ink-900 mb-6 tracking-tight">
            Preserving Our <span className="text-parchment-700 italic">Legacy</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-ink-700 font-light leading-relaxed">
            Explore the depths of history through our curated collection of manuscripts, 
            artifacts, and stories. A digital sanctuary for knowledge.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveSection('story')}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'story'
                  ? 'bg-parchment-700 text-white shadow-md'
                  : 'bg-white border border-parchment-300 text-ink-700 hover:border-parchment-500 hover:shadow-sm'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => setActiveSection('manuscripts')}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'manuscripts'
                  ? 'bg-parchment-700 text-white shadow-md'
                  : 'bg-white border border-parchment-300 text-ink-700 hover:border-parchment-500 hover:shadow-sm'
              }`}
            >
              Manuscripts
            </button>
            <button
              onClick={() => setActiveSection('tangkas')}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'tangkas'
                  ? 'bg-parchment-700 text-white shadow-md'
                  : 'bg-white border border-parchment-300 text-ink-700 hover:border-parchment-500 hover:shadow-sm'
              }`}
            >
              Thangkas
            </button>
            <button
              onClick={() => setActiveSection('dictionaries')}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'dictionaries'
                  ? 'bg-parchment-700 text-white shadow-md'
                  : 'bg-white border border-parchment-300 text-ink-700 hover:border-parchment-500 hover:shadow-sm'
              }`}
            >
              Dictionaries
            </button>
            <button
              onClick={() => setActiveSection('gallery')}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'gallery'
                  ? 'bg-parchment-700 text-white shadow-md'
                  : 'bg-white border border-parchment-300 text-ink-700 hover:border-parchment-500 hover:shadow-sm'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveSection('history')}
              className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === 'history'
                  ? 'bg-parchment-700 text-white shadow-md'
                  : 'bg-white border border-parchment-300 text-ink-700 hover:border-parchment-500 hover:shadow-sm'
              }`}
            >
              History
            </button>
          </div>
        </motion.div>
      </header>

      {/* Story Section - Full Featured */}
      {activeSection === 'story' && (
        <StorySection />
      )}

      {/* Thangkas Section - Full Featured */}
      {activeSection === 'tangkas' && (
        <ThangkasSection />
      )}

      {/* Gallery Section - Full Featured */}
      {activeSection === 'gallery' && (
        <GallerySection />
      )}

      {/* Manuscripts Section - Full Featured */}
      {activeSection === 'manuscripts' && (
        <ManuscriptsSection />
      )}

      {/* Dictionary Section - Full Featured */}
      {activeSection === 'dictionaries' && (
        <DictionarySection />
      )}

      {/* History Section - Full Featured */}
      {activeSection === 'history' && (
        <HistorySection />
      )}
    </div>
  );
};

export default Archives;


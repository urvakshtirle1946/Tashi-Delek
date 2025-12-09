import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react';

interface HistoryItem {
  id: string;
  title: string;
  year: string;
  image: string;
  preview: string;
  content: string[]; // Array of paragraphs
}

const historyItems: HistoryItem[] = [
  {
    id: 'history-1',
    title: 'History of Buddhism',
    year: '6th Century BCE - Present',
    image: '/history/ancient-origins.png',
    preview: 'Buddhism is one of the world’s oldest and most influential spiritual traditions, originating in ancient India over 2,500 years ago.',
    content: [
      "Buddhism is one of the world’s oldest and most influential spiritual traditions, originating in ancient India over 2,500 years ago. Rooted in the teachings of Siddhartha Gautama, known as the Buddha, the tradition began as a simple path to understanding suffering and discovering inner freedom. Over centuries, it evolved, spread across continents, and diversified into several philosophical and cultural branches. The history of Buddhism is not only a record of religious development but also a story of human inquiry, compassion, and cross-cultural exchange.",
      
      "Origins in Ancient India (6th–5th Century BCE): Buddhism emerged during a time of profound intellectual and spiritual exploration in the Ganges Valley. Siddhartha Gautama, born a prince, renounced his royal life to seek the truth behind human suffering. After years of searching, he attained Enlightenment under the Bodhi Tree in Bodh Gaya. His realization—summarized in the Four Noble Truths and the Eightfold Path—laid the foundation of Buddhism. The Buddha spent the next 45 years traveling across northern India, teaching a path of self-discovery, ethical living, meditation, and wisdom. His first sermon at Sarnath marked the beginning of the Buddhist community, or Sangha.",

      "Early Councils and the Formation of Buddhist Schools: After the Buddha's passing around 483 BCE, his followers convened the first Buddhist Council to preserve his teachings. Over the next centuries, disagreements in interpretation led to the formation of different schools. Two major early branches emerged: Theravāda (“Teaching of the Elders”) – focusing on early scriptures and monastic discipline, and Mahāsāṃghika and other early schools – more open to philosophical development and reinterpretation.",

      "The Mauryan Empire and Ashoka’s Influence (3rd Century BCE): Buddhism gained immense momentum under Emperor Ashoka, one of India’s greatest rulers. After witnessing the horrors of war, Ashoka embraced non-violence and became a patron of Buddhism. He built stupas, supported monasteries, and sent missionaries to Sri Lanka, Central Asia, and beyond. His efforts transformed Buddhism from a regional movement into a pan-Asian tradition.",

      "Spread Across Asia: By the 1st century BCE, Theravāda Buddhism had firmly taken root in Sri Lanka, later spreading to Myanmar, Thailand, Laos, and Cambodia. At the same time, Buddhist monks traveled along the Silk Road, carrying scriptures, art, and philosophical ideas into Central Asia and China. By the 2nd century CE, Buddhism was flourishing in China, blending with local philosophies.",

      "Emergence of Mahāyāna Buddhism (1st Century CE onward): Around the 1st century CE, new philosophical developments resulted in Mahāyāna Buddhism, the “Great Vehicle.” This tradition introduced the Bodhisattva ideal, emphasizing compassion and universal liberation, expanded scriptures such as the Lotus Sutra, and a more accessible spiritual path for lay practitioners.",

      "Vajrayāna and Himalayan Buddhism: By the 7th–8th century CE, another form of Buddhism emerged in the Himalayas: Vajrayāna, or Tantric Buddhism. Brought to Tibet primarily by Guru Padmasambhava and Shāntarakṣita, this tradition integrated meditation, ritual, symbolism, and esoteric practices with earlier Mahāyāna foundations. Vajrayāna later became the root of Tibetan Buddhism, influencing Bhutan, Nepal, Mongolia, and Sikkim.",

      "Buddhism in India: Decline and Transformation: Despite its success across Asia, Buddhism gradually declined in India after the 12th century due to invasions that destroyed major learning centers and the absorption of practices into Hindu traditions. However, Buddhism never fully vanished and experienced a revival in the 20th century.",

      "Global Revival and Modern Influence: In the 19th and 20th centuries, renewed global interest in meditation, mindfulness, and interfaith dialogue helped Buddhism spread across Europe, the Americas, and Africa. Today, Buddhism influences fields such as psychology, ethics, leadership studies, and environmental thought. Monastic traditions continue to thrive, while modern lay movements and secular mindfulness practices make Buddhist wisdom accessible to new generations."
    ]
  },
  {
    id: 'history-2',
    title: 'History of Buddhism in Sikkim',
    year: '8th Century AD - Present',
    image: '/history/royal-era.jpeg',
    preview: 'Bayul Demojong, which is presently known as Sikkim, is the most Sacred Land in the Himalayas as per the belief of the Northern Buddhists.',
    content: [
      "Bayul Demojong, which is presently known as Sikkim, is most Sacred Land in the Himalayas as per the belief of the Northern Buddhists. The spiritual description of this land has been made in various religious texts such as ‘Dejong Ney-yig’* the volume of Text, which contains many secret notes about the places of worship, lakes, streams as well as the instructions to follow while making entry into this land. Is mentioned that Lord Avalokiteshvara, God Indra and Five Sublime Incarnates showered their blessings to this Hidden Land in time immemorial in the past.",
      
      "Particularly, in 8th century A.D, Guru Padmasambhava paid a visit to this land during his quest for hidden land around Tibet and included it in the list of “Four Great Hidden Lands” which are significantly located in four cardinal direction of Tibet. He consecrated this land by means of concealing sacred objects in its caves, rocks and in the sacred lakes. At the same time, he subdued all the dreadful spirits of this land and appointed them as Guardian of the hidden treasures.",
      
      "In the later era, between 14th to 16th century A.D, many Terton Lamas known as Rigdzin Goedki Demthruchen, Mon Kathok Sonam Gyaltshen and Rigdzin Legden Je( Goedem II) who came from Tibet and blessed this land. The latter even built a Dubde** or Hermitage on the hilltop of present Pawo Hungri hill in west Sikkim and presently one can see its ruins. Legden Je was said to have been arrived in Dejong in earth-dragon year of 10th Rabjung cycle year, which corresponds, to 1568 A.D.",
      
      "Sikkim’s modern history began from the middle of the 17th century. It is said that about 1641-1642, three holy Lamas viz. Lhatsun Namkha Jigme, Ngadag Sempa Chenpo and Kathok Kuntu Zangpo came from Tibet to this sacred land to fulfil the prophecy made by Lord Guru Padmasambhava in 8th century A.D. They opened the door of this Hidden Land by means of entering from three directions of this hidden land i.e. North, South and West and met at the place called Norbugang or present day Yuksam.",
      
      "The three Lamas however, after having been referred Guru’s prophecy text, consulted among themselves to materialize it, which was said- “Four Noble Brothers would meet in this holy land and thereby establish a Kingdom where Buddha Dharma would flourish in this Hidden Land at the time of degenerate age”. They said, “We are three that came from South, West and North. Now still one person named ‘Phuntshog’ would be coming from the place called ‘Gang’, East to make the four Yogi Brothers”",
      
      "Accordingly, they sent a search party towards the East Demojong to find out the destined person called ‘Phuntshog’ and afterwards traced him out at present Gangtok. The search team conveyed him the massage sent by the holy Lamas, following which he agreed to proceed to his new destination along with the attendants and followers. After Phuntshog’s arrival at Yuksam the three Lamas welcomed him and accordingly consecrated him as a patron King or Chhogyal of Demojong in water-horse year, which corresponds to 1642 A.D.",
      
      "Initially, Phuntshog Namgyal subdued all the smaller Chiefs in adjoining areas, divided his Kingdom into 12 Dzongs (District) and formed a system of Monarchy Government by appointing 12 Ministers and 12 District Commissioners. Thereafter, under the patronage of Chhogyal, the three Lamas started founding Buddhist Teaching Centers in nearby hills. Later, their lineage Holders carried further the heritages to other parts of Demojong."
    ]
  },
  {
    id: 'history-3',
    title: 'History of Sikkim',
    year: 'Ancient Times - Present',
    image: '/history/modern-era.png',
    preview: 'The history of Sikkim is a rich tapestry woven from ancient indigenous traditions, Himalayan kingdoms, Buddhist migrations, and political transitions.',
    content: [
      "The history of Sikkim is a rich tapestry woven from ancient indigenous traditions, Himalayan kingdoms, Buddhist migrations, and political transitions that eventually shaped it into the modern Indian state it is today. Nestled between Tibet, Bhutan, and Nepal, Sikkim developed as a unique cultural crossroads where spirituality, tribal heritage, and Himalayan diplomacy played central roles for centuries.",
      
      "Early Indigenous Roots: Long before written records, Sikkim was inhabited by the Lepchas, considered the region’s earliest known people. They refer to Sikkim as Nye-mae-el, “the hidden paradise,” and their mythology describes the land as a sacred creation blessed by guardian deities and spirits. Their deep relationship with nature shaped Sikkim’s early culture—worshiping mountains, rivers, forests, and ancestral spirits. Later, the Bhutias, of Tibetan origin, migrated into Sikkim around the 14th–15th century, bringing with them Tibetan Buddhism, monastic culture, and new socio-political structures.",

      "The Prophecy and the Birth of the Kingdom: The foundations of the Sikkimese kingdom are tied to a Tibetan prophecy. It was foretold that three great lamas from different directions would meet in Sikkim to crown a righteous king. In 1642, this prophecy materialized at Yuksom, where three Nyingma lamas—Lhatsun Namkha Jigme, Katok Kuntu Zangpo, and Ngadak Sempa Chenpo—came together and coronated Phuntsog Namgyal as the first Chogyal (Dharma King) of Sikkim. This marked the beginning of the Namgyal Dynasty, which ruled Sikkim for over three centuries.",

      "Expansion, Conflict, and Diplomacy (17th–19th Century): Over time, Sikkim faced numerous challenges. Conflicts with neighboring Bhutan and Nepal caused territorial losses, while internal disputes and rival claims created periods of instability. Despite this, the Chogyals maintained a delicate balance through diplomacy with Tibet and later with British India. By the early 19th century, Sikkim became a close ally of the British. Treaties such as the Treaty of Titalia (1817) restored peace and recognized the kingdom’s boundaries.",

      "British Influence and Modernization: During the 19th and early 20th centuries, Sikkim underwent gradual modernization under British guidance. Gangtok rose in prominence as an administrative center, roads were built, and new settlements formed. Tea estates were introduced in the south, and the kingdom began interacting more with global trade and culture. The arrival of Nepali settlers over the decades significantly transformed Sikkim’s demographic structure, creating a diverse but complex social fabric of Lepcha, Bhutia, and Nepali communities.",

      "Sikkim in the 20th Century: Political Transition: The 20th century brought increasing political consciousness. After India gained independence in 1947, Sikkim retained its status as a protectorate with internal autonomy under the Chogyal. However, social and political tensions grew between the monarchy and emerging democratic groups. By the early 1970s, widespread demands for democratic reforms led to political unrest. Eventually, following a referendum held in 1975, the monarchy was abolished, and Sikkim formally became the 22nd state of India.",

      "Post-Merger Development and Modern Era: Since joining India, Sikkim has seen rapid development in infrastructure, education, healthcare, and tourism. It is known today for its environmental policies, organic farming initiatives, and preservation of cultural heritage. The state remains a vibrant mosaic of traditions—Buddhist monasteries, Hindu temples, Lepcha folklore, Nepali festivals, and Tibetan cultural influences coexist seamlessly.",

      "Conclusion: The history of Sikkim is unique: shaped by prophecy, guided by spirituality, tempered by diplomacy, and transformed by modern political change. From the ancient Lepcha homeland to a Himalayan monarchy and finally to a progressive Indian state, Sikkim’s story is one of resilience, cultural harmony, and sacred heritage—qualities that continue to define its character today."
    ]
  }
];

const HistorySection = () => {
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);

  // Scroll to top when a history item is selected
  useEffect(() => {
    if (selectedHistory) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedHistory]);

  return (
    <div className="min-h-screen bg-parchment-50">
      <AnimatePresence mode="wait">
        {selectedHistory ? (
          // Detail View
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <button
              onClick={() => setSelectedHistory(null)}
              className="group flex items-center gap-2 text-parchment-600 hover:text-parchment-800 transition-colors mb-8"
            >
              <div className="p-2 rounded-full bg-white border border-parchment-200 group-hover:border-parchment-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-medium">Back to Timeline</span>
            </button>

            <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-parchment-200">
              {/* Image Section in Detail View */}
              <div className="relative w-full bg-parchment-100 flex justify-center items-center overflow-hidden min-h-[300px] md:min-h-[400px]">
                {/* Blurred Background */}
                <div className="absolute inset-0">
                  <img src={selectedHistory.image} className="w-full h-full object-cover opacity-30 blur-2xl transform scale-110" alt="" />
                </div>
                {/* Main Image - Contained */}
                <img
                  src={selectedHistory.image}
                  alt={selectedHistory.title}
                  className="relative z-10 w-full h-auto max-h-[70vh] object-contain shadow-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600/e2e8f0/475569?text=Historical+Image';
                  }}
                />
              </div>

              {/* Title Header Section - Moved below image for clarity in reading mode */}
              <div className="relative z-20 -mt-8 mx-6 md:mx-12 p-6 bg-white rounded-xl shadow-lg border border-parchment-100">
                 <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-parchment-100 text-parchment-800 text-xs font-bold uppercase tracking-wider">
                      History
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-ink-600 bg-parchment-50 px-3 py-1 rounded-full border border-parchment-100">
                      <Calendar className="w-4 h-4" />
                      {selectedHistory.year}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-ink-900 mb-2">
                    {selectedHistory.title}
                  </h1>
              </div>

              <div className="px-8 pb-12 pt-8 md:px-12">
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="flex items-start gap-4 mb-8 p-6 bg-parchment-50 rounded-xl border border-parchment-100">
                    <Clock className="w-6 h-6 text-parchment-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-ink-900 mb-1">Historical Context</h4>
                      <p className="text-ink-600 italic">{selectedHistory.preview}</p>
                    </div>
                  </div>

                  {selectedHistory.content.map((paragraph, index) => (
                    <p key={index} className={`text-lg text-ink-800 leading-relaxed font-serif text-justify ${index === 0 ? 'first-letter:text-5xl first-letter:font-bold first-letter:text-parchment-700 first-letter:mr-3 first-letter:float-left' : ''}`}>
                      {paragraph}
                    </p>
                  ))}
                  
                  <div className="mt-12 pt-8 border-t border-parchment-200 text-center">
                    <div className="inline-flex items-center gap-2 text-parchment-500 italic font-serif">
                      <span>§</span>
                      <span>End of Record</span>
                      <span>§</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        ) : (
          // List View
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-6">
                Echoes of the Past
              </h2>
              <p className="text-lg text-ink-600 max-w-2xl mx-auto font-light leading-relaxed">
                Journey through the defining moments that shaped our heritage. 
                From ancient origins to modern transformations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {historyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-parchment-100 cursor-pointer"
                  onClick={() => setSelectedHistory(item)}
                >
                  {/* Image Container - Fixed Aspect Ratio */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-parchment-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/e2e8f0/475569?text=History';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-parchment-100 text-parchment-800 text-xs font-bold tracking-wider uppercase border border-parchment-200">
                        {item.year.split(' - ')[0]}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-ink-900 mb-3 group-hover:text-parchment-700 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-ink-600 text-sm line-clamp-3 mb-6 flex-1">
                      {item.preview}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-parchment-700 group-hover:text-parchment-900 transition-colors mt-auto">
                      Read History <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistorySection;

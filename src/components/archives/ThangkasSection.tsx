import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

interface Thangka {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  year?: string;
  artist?: string;
  significance?: string;
}

const thangkas: Thangka[] = [
  {
    id: 'tangka-1',
    title: 'Buddha in Heaven',
    description: 'The eternal cycle of existence and rebirth in Buddhist cosmology.',
    detailedDescription: 'Before the Buddha was born into this world as Shakyamuni, he was a bodhisattva in the Tushita heaven, home of the contented gods. As an exemplary bodhisattva, moved by compassion for the human realm, the Buddha decided to manifest himself in this reality to teach the Dharma and save people from spiritual misery and suffering. This episode is represented by the Buddha, surrounded by other divinities, making his promise while holding a golden bowl (in some cases a lotus flower)—a symbol of the purity of his intention. Thus, Buddha, looking down upon the sentient beings suffering and, in accordance with his bodhisattva status, decided to descend to the earth and spread the word of Dharma.',
    image: '/tangkas/Buddha-in-heaven story 1.jpg',
    year: '18th century',
    artist: 'Unknown Master',
    significance: 'Teaching tool for understanding Buddhist cosmology'
  },
  {
    id: 'tangka-2',
    title: 'Mayadevi Dream',
    description: 'The healing deity radiating compassion and therapeutic energy.',
    detailedDescription: 'Buddhas descent to this world is represented by his mother, Princess Maya Devi, dreaming of a white elephant. Legend says that on a full moon night, Maya Devi dreamed of being carried by four devas (spirits to a lake in the Himalayas. There, she encountered a white elephant that pierced the right side of her belly with its tusks. The elephant then disappeared, and the queen awoke knowing she had received an important message—the elephant being a symbol of greatness in Nepal. The elephant is also symbol of strength and intelligence and his color is associated to the gray clouds that carry the rain able to give life to the soil. So the white elephant, in this allegory, is an emblem of fertility and at same time of immaculacy.',
    image: '/tangkas/Mayadevi-dream story2.jpg',
    year: '19th century',
    artist: 'Monastery Tradition',
    significance: 'Used in healing ceremonies and meditation'
  },
  {
    id: 'tangka-3',
    title: 'Birth of Buddha',
    description: 'The compassionate mother of liberation and protection.',
    detailedDescription: 'After ten months of pregnancy, Maya Devi traveled to her father s kingdom to deliver the baby with her mothers assistance. On the way to her childhood home, she stopped to rest in a beautiful garden in Lumbini beneath a blossoming sala tree. According to the story, Buddha was born from his mothers right side while she stood grasping a branch of the tree. This distinctive pose assumed by Maya Devi influenced female iconography throughout Asia. The sinuous gesture has been adopted in traditional dance choreography and has inspired generations of artists. Depictions of the event also show the Hindu gods Indra and Brahma present at the birth. Buddha could walk immediately. He took seven steps forward, and at each step, a lotus flower appeared on the ground. He was named Siddhartha Gautama. In Sanskrit Siddhartha means ” the One who achieves his goal”. The princess Maya Devi will die seven days after Buddha was born.',
    image: '/tangkas/Birth-of-Buddha story 3.jpg',
    year: '18th century',
    artist: 'Traditional School',
    significance: 'Protection and swift action in compassion'
  },
  {
    id: 'tangka-4',
    title: 'Young Siddharta',
    description: 'Sacred geometric representation of the universe and enlightenment.',
    detailedDescription: 'His father had been warned that the boy might abandon his palace and royal destiny to follow a spiritual path. To prevent this, young Siddhartha lived a comfortable and sheltered life. He received the finest education and mastered every lesson. In his younger years, he excelled in sports—particularly horseback riding and archery. He was also renowned for being extraordinarily attractive. When he came of age and assumed royal duties, Prince Siddhartha became a true man of the world, with a retinue of many queens and attendant ladies.',
    image: '/tangkas/Young-Siddharta story 4.jpg',
    year: '19th century',
    artist: 'Tibetan Master',
    significance: 'Meditation focus and spiritual map'
  },
  {
    id: 'tangka-5',
    title: 'Buddha Consort',
    description: 'The bodhisattva of infinite compassion with thousand arms.',
    detailedDescription: 'After assuming royal duties, Prince Siddhartha lived a refined life within the palace, surrounded by attendants and courtly comforts. He married Princess Yashodharā at twenty-one, and their son Rāhula soon followed. The painting shows him in regal attire, enjoying the elegance of the royal court before his spiritual journey began. It reflects the luxury he once knew, the expectations placed upon him, and the sheltered world designed to keep him devoted to kingship. Yet beneath this splendor, Siddhartha quietly felt the stirrings of deeper questions that would soon reshape his destiny.',
    image: '/tangkas/budda consort story 5.jpg',
    year: '17th century',
    artist: 'Royal Court Artist',
    significance: 'Embodiment of universal compassion'
  },
  {
    id: 'tangka-6',
    title: 'Four Encounters',
    description: 'The bodhisattva of transcendent wisdom wielding the sword of knowledge.',
    detailedDescription: 'Having been warned by the court astrologers that his son may well give it all up and choose the path of meditation, Buddhas father tried his best to shield him from the harsh realities of life. This state of affairs continued until one day, Siddharta decides to leave the palace with one of his servants driving the chariot. During his journey the prince encounters an old man, a sick man and a dead man leading to great turbulence in his mind. He also comes across an ascetic monk and after questioning him Gautama decides to follow his example, convinced that herein lay the way to quell his mental agitation. Having made the decision, Siddhartha leaves the palace to pursue his quest and find the truth about life, suffering and genuine happiness.',
    image: '/tangkas/Four-Encounters story 6.jpg',
    year: '18th century',
    artist: 'Monastery Workshop',
    significance: 'Wisdom and learning'
  },
  {
    id: 'tangka-7',
    title: 'Buddha Fasting',
    description: 'The lotus-born guru who brought Buddhism to Tibet.',
    detailedDescription: 'Gautama left the luxurious palace of his father in the middle of the night, leaving behind his sleeping wife and son. Dressed as a beggar, the young prince wanders from place to place with his begging bowl. During this time Siddharta encounters several teachers and he learns how to meditate. Despite what he had learnt he could see that he was still subject to old age, sickness, and death and that his quest was not over. Wandering in his search for enlightenment, Buddha came to a pleasant hermitage by a lovely stream where he joined five mendicants practicing a discipline based on severe fasting. The legend says that he ate a single grain of rice for each of the first two years, drank a single drop of water for each of the second two years, and took nothing at all during the last two. For six long years he did these practices becoming so skinny that when he touched his stomach, he could almost feel his spine.The thangka shows Buddha sitting in lotus position meditating under a tree with his body severely affected by this  experience. In spite of the great pain and suffering Gautama did not find wisdom or the answers to his questions so he decides to go back begging for food and build up his body.',
    image: '/tangkas/Buddha-fasting story 7.jpg',
    year: '19th century',
    artist: 'Bhutanese Tradition',
    significance: 'Founding figure of Tibetan Buddhism'
  },
  {
    id: 'tangka-8',
    title: 'Buddha and Sujata',
    description: 'The deity of longevity, compassion, and healing.',
    detailedDescription: 'Gautama went to Gaya and looked for a suitable place to sit down and meditate. He found a banyan tree and sat on its east side, There he met a village girl named Sujata who offered him a bowl of rice. It was the first food he had accepted in years and it instantly restored his body to lustrous good health. Sujata was so happy and excited that the holy man accepted her food so she starts dancing with joy and comes back in company of her servant with more offering as illustrated in the painting. Abandoning himself to meditation, Gautama vowed not to move from that spot until he had attained full enlightenment.',
    image: '/tangkas/Buddha-and-Sajata story 8.jpg',
    year: '18th century',
    artist: 'Nepalese Master',
    significance: 'Longevity and healing'
  },
  {
    id: 'tangka-9',
    title: 'Buddha Conquering',
    description: 'The wrathful protector embodying the power of enlightenment.',
    detailedDescription: 'Mara, the demon of illusion and temptation, represents the forces that seek to distract beings from enlightenment. As Siddhartha meditated beneath the Bodhi Tree, Mara attacked him with fear, desire, and doubt, trying to break his resolve. But Siddhartha remained unmoved, defeating Mara through unwavering calm and insight. This moment symbolizes the triumph of wisdom over inner turmoil, marking the final step in the Buddha’s awakening.',
    image: '/tangkas/buddha conquering story 9.png',
    year: '17th century',
    artist: 'Traditional Master',
    significance: 'Protection and spiritual power'
  },
  {
    id: 'tangka-10',
    title: 'Proclamation',
    description: 'The Buddha of infinite light and boundless life.',
    detailedDescription: 'After attaining enlightenment, Gautama became known as Shakyamuni, “the silent lion.” He first traveled to Sarnath, where his radiant presence drew back the five ascetics who had abandoned him earlier. After hearing his first sermon, they became his earliest disciples. Among them was Assaji, whose serene demeanor impressed Shariputra, a follower of the skeptic sage Sanjaya. Dissatisfied with his teacher’s philosophy, Shariputra sought the Buddha’s doctrine, quickly recognizing its depth. He and his close friend Maudgalyayana converted, bringing along Sanjaya’s 250 followers. They later became Buddha’s foremost disciples, often depicted beside him in narrative art.',
    image: '/tangkas/proclamation story 10.jpg',
    year: '19th century',
    artist: 'Tibetan School',
    significance: 'Rebirth in Pure Land'
  },
  {
    id: 'tangka-11',
    title: 'The Descent',
    description: 'The primordial Buddha holding the vajra and bell.',
    detailedDescription: 'After Queen Maya’s death, she was believed to be reborn in the Trayatrimsa heaven. After attaining enlightenment, the Buddha ascended there in three strides to teach his mother and the divine assembly. He sat on Indra’s throne and preached for months. When urged to return, he descended on a celestial thirty-three-rung ladder crafted by Vishwakarma—a moment often highlighted in Buddhist art. This legend elevates the Buddha’s status, showing his movement between heaven and earth and echoing Vedic motifs such as Vishnu’s three strides and cosmic connections like Shiva’s lingam, symbolizing the link between divine and earthly realms.',
    image: '/tangkas/the descent story 11.png',
    year: '18th century',
    artist: 'Monastery Commission',
    significance: 'Ultimate enlightenment'
  },
  {
    id: 'tangka-12',
    title: 'Parinirvana',
    description: 'The compassionate one who hears the cries of the world.',
    detailedDescription: 'Traveling widely to teach, the Buddha eventually reached Kushinagara, where he asked his disciples to prepare a couch in a peaceful grove. Lying on his right side with his head supported by his hand, he understood his final hour was near. On that full-moon night, his eightieth birthday, he passed into Parinirvana, moving through increasingly profound states of meditation. Scriptures describe the trees blooming out of season and showering flowers in homage, while heavenly blossoms descended from above. His passing marked not an end but the beginning of an enduring spiritual legacy. The serene, faintly smiling image of the reclining Buddha symbolizes the highest meditative state, turiya, reminding all beings of their own potential for enlightenment and liberation from suffering.',
    image: '/tangkas/parinirvana story 12.jpg',
    year: '19th century',
    artist: 'Traditional Workshop',
    significance: 'Universal compassion and loving-kindness'
  }
];

const ThangkasSection = () => {
  const [selectedThangka, setSelectedThangka] = useState<Thangka | null>(null);

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
          <span className="text-sm font-medium text-parchment-800 uppercase tracking-wider">Sacred Art</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-4">
          Thangka Collection
        </h2>
        <p className="text-lg text-ink-600 max-w-2xl mx-auto font-light">
          Explore our sacred collection of Tibetan Buddhist paintings,
          each a window into profound spiritual teachings
        </p>
      </motion.div>

      {/* Thangkas Grid Layout */}
      <div className="space-y-16">
        {thangkas.map((thangka, index) => (
          <motion.article
            key={thangka.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="group"
          >
            {/* Container with border and padding */}
            <div className="grid md:grid-cols-5 gap-8 p-6 md:p-8 bg-white rounded-xl border border-parchment-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
              
              {/* Image Column - 2/5 width */}
              <div className="md:col-span-2">
                <div className="sticky top-24">
                  <div className="relative overflow-hidden rounded-lg shadow-md bg-parchment-50 cursor-pointer"
                       onClick={() => setSelectedThangka(thangka)}>
                    
                    {/* Thangka Image */}
                    <img
                      src={thangka.image}
                      alt={thangka.title}
                      className={`w-full transition-all duration-500 group-hover:scale-105 ${
                        thangka.id === 'tangka-5' || thangka.id === 'tangka-10' || thangka.id === 'tangka-12'
                          ? 'h-auto object-cover max-h-[500px]'
                          : 'h-auto object-contain'
                      }`}
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ZoomIn className="w-4 h-4 text-ink-900" />
                        <span className="text-sm font-semibold text-ink-900">View Larger</span>
                      </div>
                    </div>
                  </div>

                  {/* Image Number Badge */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-parchment-100 flex items-center justify-center border-2 border-parchment-300">
                      <span className="text-sm font-bold text-parchment-700">{index + 1}</span>
                    </div>
                    <div className="flex-1 h-px bg-parchment-200"></div>
                  </div>
                </div>
              </div>

              {/* Text Column - 3/5 width */}
              <div className="md:col-span-3 flex flex-col justify-center">
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-ink-900 mb-6 leading-tight">
                  {thangka.title}
                </h3>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-base md:text-lg text-ink-600 leading-relaxed">
                    {thangka.detailedDescription}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="mt-6 flex items-center gap-2 text-parchment-400">
                  <div className="h-px w-16 bg-parchment-300"></div>
                  <ImageIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Detailed View Modal - Image Only */}
      <AnimatePresence>
        {selectedThangka && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md cursor-zoom-out"
            onClick={() => setSelectedThangka(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center"
            >
              <img
                src={selectedThangka.image}
                alt={selectedThangka.title}
                className={`max-w-full max-h-[90vh] rounded-lg shadow-2xl ${
                  selectedThangka.id === 'tangka-5' || selectedThangka.id === 'tangka-10' || selectedThangka.id === 'tangka-12'
                    ? 'object-cover'
                    : 'object-contain'
                }`}
              />
              
              {/* Subtle Close Hint/Button */}
              <button
                onClick={() => setSelectedThangka(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
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

export default ThangkasSection;


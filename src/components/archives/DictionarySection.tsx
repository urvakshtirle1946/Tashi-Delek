import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

interface DictionaryEntry {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  etymology?: string;
  example: string;
  synonyms: string[];
  category: 'Spiritual' | 'Cultural' | 'Historical' | 'Philosophy';
}

const dictionaryEntries: DictionaryEntry[] = [
  {
    id: 'word-1',
    word: 'Bardo',
    phonetic: '/ˈbɑːrdoʊ/',
    partOfSpeech: 'noun',
    definition: 'The intermediate state between death and rebirth.',
    etymology: 'Tibetan bar-do "interval"',
    example: 'According to Tibetan tradition, consciousness navigates the bardo before finding a new life.',
    synonyms: ['Intermediate state', 'Transition', 'Limbo'],
    category: 'Spiritual'
  },
  {
    id: 'word-2',
    word: 'Beyul',
    phonetic: '/ˈbeɪjuːl/',
    partOfSpeech: 'noun',
    definition: 'A hidden sacred valley blessed by Guru Rinpoche.',
    etymology: 'Tibetan sbas-yul "hidden land"',
    example: 'Pilgrims seek the beyul as a sanctuary for spiritual practice during difficult times.',
    synonyms: ['Hidden land', 'Sanctuary', 'Sacred valley'],
    category: 'Historical'
  },
  {
    id: 'word-3',
    word: 'Bhumpa',
    phonetic: '/ˈbʊmpə/',
    partOfSpeech: 'noun',
    definition: 'A ritual vase symbolizing long life and blessings.',
    etymology: 'Tibetan bum-pa "vase"',
    example: 'The lama sprinkled blessed water from the bhumpa during the initiation ceremony.',
    synonyms: ['Ritual vase', 'Holy vessel'],
    category: 'Cultural'
  },
  {
    id: 'word-4',
    word: 'Cham',
    phonetic: '/tʃɑːm/',
    partOfSpeech: 'noun',
    definition: 'A sacred ritual dance performed during monastery festivals.',
    etymology: 'Tibetan \'cham "dance"',
    example: 'Monks performed the cham dance wearing colorful masks to subdue negative forces.',
    synonyms: ['Sacred dance', 'Masked dance'],
    category: 'Cultural'
  },
  {
    id: 'word-5',
    word: 'Chogyal',
    phonetic: '/ˈtʃoʊɡjæl/',
    partOfSpeech: 'noun',
    definition: 'The Buddhist kings who ruled Sikkim until 1975.',
    etymology: 'Tibetan chos-rgyal "Dharma King"',
    example: 'The Chogyal established many monasteries throughout the kingdom.',
    synonyms: ['Dharma King', 'Religious ruler'],
    category: 'Historical'
  },
  {
    id: 'word-6',
    word: 'Chö-Kyong',
    phonetic: '/tʃøˈkjɒŋ/',
    partOfSpeech: 'noun',
    definition: 'A guardian spirit who protects one\'s spiritual path.',
    etymology: 'Tibetan chos-skyong "Dharma protector"',
    example: 'Devotees make offerings to the Chö-Kyong for protection against obstacles.',
    synonyms: ['Dharma protector', 'Guardian deity'],
    category: 'Spiritual'
  },
  {
    id: 'word-7',
    word: 'Chö-Zhi',
    phonetic: '/tʃøˈʒiː/',
    partOfSpeech: 'noun',
    definition: 'The four noble qualities of virtue, clarity, kindness, and balance.',
    etymology: 'Tibetan chos-bzhi',
    example: 'Cultivating Chö-Zhi is essential for a harmonious life.',
    synonyms: ['Four qualities', 'Noble virtues'],
    category: 'Philosophy'
  },
  {
    id: 'word-8',
    word: 'Dorje (Vajra)',
    phonetic: '/ˈdɔːrdʒeɪ/',
    partOfSpeech: 'noun',
    definition: 'A ritual thunderbolt symbolizing unbreakable wisdom.',
    etymology: 'Tibetan rdo-rje "lord of stones"',
    example: 'The master held the dorje in his right hand, representing skillful means.',
    synonyms: ['Vajra', 'Thunderbolt', 'Diamond scepter'],
    category: 'Spiritual'
  },
  {
    id: 'word-9',
    word: 'Drima Med',
    phonetic: '/ˈdriːmə med/',
    partOfSpeech: 'adjective',
    definition: 'Stainless purity of mind free from negativity.',
    etymology: 'Tibetan dri-ma med-pa "without stain"',
    example: 'Through meditation, one seeks to realize the Drima Med nature of the mind.',
    synonyms: ['Stainless', 'Immaculate', 'Pure'],
    category: 'Spiritual'
  },
  {
    id: 'word-10',
    word: 'Drowa Drolo',
    phonetic: '/ˈdroʊwə ˈdroʊloʊ/',
    partOfSpeech: 'noun',
    definition: 'Liberation achieved through fearless transformation.',
    etymology: 'Tibetan',
    example: 'The practice of Drowa Drolo transforms fear into awakened energy.',
    synonyms: ['Liberation', 'Transformation'],
    category: 'Philosophy'
  },
  {
    id: 'word-11',
    word: 'Dzongu',
    phonetic: '/ˈzɒŋɡuː/',
    partOfSpeech: 'noun',
    definition: 'The protected homeland of the Lepcha people in North Sikkim.',
    etymology: 'Lepcha language',
    example: 'Dzongu remains a sanctuary for traditional Lepcha culture and biodiversity.',
    synonyms: ['Lepcha reserve', 'Sacred homeland'],
    category: 'Historical'
  },
  {
    id: 'word-12',
    word: 'Dzogchen',
    phonetic: '/ˈzɒɡtʃɛn/',
    partOfSpeech: 'noun',
    definition: 'Teachings on the natural, perfect state of mind.',
    etymology: 'Tibetan rdzogs-chen "Great Perfection"',
    example: 'Dzogchen practices emphasize resting in the nature of mind without effort.',
    synonyms: ['Great Perfection', 'Ati Yoga'],
    category: 'Spiritual'
  },
  {
    id: 'word-13',
    word: 'Ghau (Gau)',
    phonetic: '/ɡaʊ/',
    partOfSpeech: 'noun',
    definition: 'A portable shrine or amulet box used for protection.',
    etymology: 'Tibetan ga\'u',
    example: 'She wore a silver ghau containing a relic of a high lama.',
    synonyms: ['Amulet box', 'Portable shrine', 'Reliquary'],
    category: 'Cultural'
  },
  {
    id: 'word-14',
    word: 'Gompa',
    phonetic: '/ˈɡɒmpə/',
    partOfSpeech: 'noun',
    definition: 'A Buddhist monastery for prayer, meditation, and learning.',
    etymology: 'Tibetan dgon-pa "solitary place"',
    example: 'The ancient gompa stood high on the mountain ridge.',
    synonyms: ['Monastery', 'Vihara', 'Temple'],
    category: 'Cultural'
  },
  {
    id: 'word-15',
    word: 'Guru Rinpoche',
    phonetic: '/ˈɡʊruː rɪnˈpoʊtʃeɪ/',
    partOfSpeech: 'noun',
    definition: 'The master who brought Buddhism to Tibet and Sikkim (Padmasambhava).',
    etymology: 'Sanskrit/Tibetan "Precious Teacher"',
    example: 'Guru Rinpoche is revered as the "Second Buddha" in the Himalayan region.',
    synonyms: ['Padmasambhava', 'Lotus-Born', 'Precious Master'],
    category: 'Historical'
  },
  {
    id: 'word-16',
    word: 'Gyalpo Losel',
    phonetic: '/ˈɡjælpoʊ ˈloʊsɛl/',
    partOfSpeech: 'phrase',
    definition: 'A blessing for wise leadership and prosperity.',
    etymology: 'Tibetan',
    example: 'The elders offered the Gyalpo Losel blessing to the new village head.',
    synonyms: ['Leadership blessing', 'Royal wisdom'],
    category: 'Cultural'
  },
  {
    id: 'word-17',
    word: 'Kagyur',
    phonetic: '/ˈkɑːɡjʊər/',
    partOfSpeech: 'noun',
    definition: 'The Tibetan Buddhist canon containing the Buddha’s teachings.',
    etymology: 'Tibetan bka\'-\'gyur "Translation of the Word"',
    example: 'Monks spent days chanting verses from the Kagyur during the festival.',
    synonyms: ['Kangyur', 'Buddha\'s Word', 'Canon'],
    category: 'Spiritual'
  },
  {
    id: 'word-18',
    word: 'Karmapa',
    phonetic: '/kɑːrˈmɑːpə/',
    partOfSpeech: 'noun',
    definition: 'The spiritual leader of the Karma Kagyu lineage.',
    etymology: 'Tibetan "Man of Action"',
    example: 'The Karmapa is known as the "Black Hat Lama" of Tibet.',
    synonyms: ['Lineage holder', 'Spiritual head'],
    category: 'Historical'
  },
  {
    id: 'word-19',
    word: 'Khamzang',
    phonetic: '/ˈkæmzæŋ/',
    partOfSpeech: 'phrase',
    definition: 'A warm greeting asking if someone is well.',
    etymology: 'Tibetan khams-bzang "good health"',
    example: '"Khamzang?" he asked with a smile upon meeting his old friend.',
    synonyms: ['Greeting', 'How are you?', 'Well-being'],
    category: 'Cultural'
  },
  {
    id: 'word-20',
    word: 'Khacho (Khechö)',
    phonetic: '/ˈkætʃoʊ/',
    partOfSpeech: 'noun',
    definition: 'The sky realm of enlightened wisdom and clarity.',
    etymology: 'Tibetan mkha\'-spyod "sky-goer"',
    example: 'Dakinis are said to dance in the pure land of Khacho.',
    synonyms: ['Sky realm', 'Pure land', 'Celestial domain'],
    category: 'Spiritual'
  },
  {
    id: 'word-21',
    word: 'Khada',
    phonetic: '/ˈkɑːdə/',
    partOfSpeech: 'noun',
    definition: 'A ceremonial scarf offered with respect and blessing.',
    etymology: 'Tibetan kha-btags',
    example: 'He offered a white khada to the lama as a sign of devotion.',
    synonyms: ['Kata', 'Ceremonial scarf', 'Greeting scarf'],
    category: 'Cultural'
  },
  {
    id: 'word-22',
    word: 'Kora',
    phonetic: '/ˈkɔːrə/',
    partOfSpeech: 'noun',
    definition: 'Walking in a circle around a sacred place in devotion.',
    etymology: 'Tibetan skor-ba "circumambulation"',
    example: 'Pilgrims performed a kora around the holy mountain.',
    synonyms: ['Circumambulation', 'Round', 'Circuit'],
    category: 'Spiritual'
  },
  {
    id: 'word-23',
    word: 'Kunzang',
    phonetic: '/ˈkʊnzæŋ/',
    partOfSpeech: 'noun',
    definition: 'Pure goodness and wholesome qualities.',
    etymology: 'Tibetan kun-bzang "all-good"',
    example: 'Samantabhadra is often referred to as Kunzang, the primordial Buddha.',
    synonyms: ['All-good', 'Ever-excellent', 'Primordial goodness'],
    category: 'Philosophy'
  },
  {
    id: 'word-24',
    word: 'Larchey',
    phonetic: '/ˈlɑːrtʃeɪ/',
    partOfSpeech: 'interjection',
    definition: 'A ritual shout expressing victory or celebration.',
    etymology: 'Local dialect',
    example: 'The crowd shouted "Larchey!" as the prayer flags were raised.',
    synonyms: ['Victory shout', 'Celebration cry'],
    category: 'Cultural'
  },
  {
    id: 'word-25',
    word: 'Lha',
    phonetic: '/lɑː/',
    partOfSpeech: 'noun',
    definition: 'A divine spirit or deity.',
    etymology: 'Tibetan lha "god"',
    example: 'Offerings were made to the local Lha of the mountain pass.',
    synonyms: ['Deity', 'God', 'Spirit'],
    category: 'Spiritual'
  },
  {
    id: 'word-26',
    word: 'Lhakang',
    phonetic: '/ˈlɑːkɑːŋ/',
    partOfSpeech: 'noun',
    definition: 'A temple or shrine room inside a monastery.',
    etymology: 'Tibetan lha-khang "god-house"',
    example: 'We entered the lhakang to light butter lamps before the statues.',
    synonyms: ['Shrine room', 'Temple hall', 'Sanctuary'],
    category: 'Cultural'
  },
  {
    id: 'word-27',
    word: 'Lhaksam',
    phonetic: '/ˈlɑːksæm/',
    partOfSpeech: 'noun',
    definition: 'Pure intention guided by compassion.',
    etymology: 'Tibetan lhag-bsam "superior intention"',
    example: 'True bodhisattvas act with Lhaksam for the benefit of all beings.',
    synonyms: ['Altruism', 'Pure motivation', 'Good heart'],
    category: 'Philosophy'
  },
  {
    id: 'word-28',
    word: 'Lungta',
    phonetic: '/ˈlʊŋtə/',
    partOfSpeech: 'noun',
    definition: 'Wind-horse prayer flags that carry blessings on the wind.',
    etymology: 'Tibetan rlung-rta "wind horse"',
    example: 'Colorful lungta fluttered in the breeze, spreading prayers across the valley.',
    synonyms: ['Wind horse', 'Prayer flag', 'Luck energy'],
    category: 'Cultural'
  },
  {
    id: 'word-29',
    word: 'Mandala',
    phonetic: '/ˈmændələ/',
    partOfSpeech: 'noun',
    definition: 'A sacred geometric diagram used for meditation.',
    etymology: 'Sanskrit maṇḍala "circle"',
    example: 'The monks constructed a sand mandala representing the celestial palace.',
    synonyms: ['Cosmic diagram', 'Sacred circle'],
    category: 'Spiritual'
  },
  {
    id: 'word-30',
    word: 'Mani',
    phonetic: '/ˈmɑːni/',
    partOfSpeech: 'noun',
    definition: 'Stones carved with sacred prayers like "Om Mani Padme Hum."',
    etymology: 'Sanskrit maṇi "jewel"',
    example: 'The path was lined with thousands of mani stones carved by devotees.',
    synonyms: ['Mani stone', 'Prayer stone', 'Carved mantra'],
    category: 'Cultural'
  },
  {
    id: 'word-31',
    word: 'Mantra',
    phonetic: '/ˈmæntrə/',
    partOfSpeech: 'noun',
    definition: 'A sacred chant repeated for spiritual power and focus.',
    etymology: 'Sanskrit mantra "instrument of thought"',
    example: 'She recited the mantra silently during her morning meditation.',
    synonyms: ['Chant', 'Sacred syllable', 'Invocation'],
    category: 'Spiritual'
  },
  {
    id: 'word-32',
    word: 'Menchoe',
    phonetic: '/ˈmɛntʃoʊ/',
    partOfSpeech: 'noun',
    definition: 'A healing ritual offering for purification.',
    etymology: 'Tibetan sman-mchod "medicine offering"',
    example: 'The Menchoe ceremony was performed to cleanse the village of illness.',
    synonyms: ['Healing offering', 'Medicine ritual'],
    category: 'Spiritual'
  },
  {
    id: 'word-33',
    word: 'Mudra',
    phonetic: '/ˈmuːdrə/',
    partOfSpeech: 'noun',
    definition: 'Sacred hand gestures used in meditation and ritual.',
    etymology: 'Sanskrit mudrā "seal, mark"',
    example: 'The Buddha statue depicted the earth-touching mudra.',
    synonyms: ['Hand gesture', 'Sacred sign', 'Seal'],
    category: 'Cultural'
  },
  {
    id: 'word-34',
    word: 'Namthar',
    phonetic: '/ˈnɑːmtɑːr/',
    partOfSpeech: 'noun',
    definition: 'The spiritual biography of an enlightened master.',
    etymology: 'Tibetan rnam-thar "liberation story"',
    example: 'Reading the namthar of Milarepa inspired her practice.',
    synonyms: ['Spiritual biography', 'Hagiography', 'Life story'],
    category: 'Historical'
  },
  {
    id: 'word-35',
    word: 'Ney',
    phonetic: '/neɪ/',
    partOfSpeech: 'noun',
    definition: 'A sacred place or spiritually powerful site.',
    etymology: 'Tibetan gnas "place"',
    example: 'This cave is considered a powerful ney where masters have meditated.',
    synonyms: ['Sacred site', 'Pilgrimage place', 'Holy spot'],
    category: 'Spiritual'
  },
  {
    id: 'word-36',
    word: 'Nga',
    phonetic: '/ŋɑː/',
    partOfSpeech: 'noun',
    definition: 'Monastic drums used in chanting and ceremonies.',
    etymology: 'Tibetan rnga "drum"',
    example: 'The deep beat of the nga signaled the start of the puja.',
    synonyms: ['Ritual drum', 'Monastic drum'],
    category: 'Cultural'
  },
  {
    id: 'word-37',
    word: 'Ngondro',
    phonetic: '/ˈŋɒndroʊ/',
    partOfSpeech: 'noun',
    definition: 'Foundation practices that prepare one for advanced meditation.',
    etymology: 'Tibetan sngon-\'gro "preliminary"',
    example: 'He completed the ngondro practices before receiving higher teachings.',
    synonyms: ['Preliminaries', 'Foundational practices'],
    category: 'Spiritual'
  },
  {
    id: 'word-38',
    word: 'Nyidok',
    phonetic: '/ˈnjiːdɒk/',
    partOfSpeech: 'noun',
    definition: 'Mutual understanding through sincerity and open-hearted connection.',
    etymology: 'Tibetan',
    example: 'The community thrived on nyidok and shared responsibility.',
    synonyms: ['Harmony', 'Mutual understanding', 'Heart connection'],
    category: 'Philosophy'
  },
  {
    id: 'word-39',
    word: 'Phurba',
    phonetic: '/ˈpʊrbə/',
    partOfSpeech: 'noun',
    definition: 'A ritual dagger symbolizing the destruction of negativity.',
    etymology: 'Tibetan phur-ba "peg"',
    example: 'The phurba is used to pin down demons of the ego.',
    synonyms: ['Ritual dagger', 'Kila', 'Magic dart'],
    category: 'Spiritual'
  },
  {
    id: 'word-40',
    word: 'Protector Deities',
    phonetic: '/prəˈtɛktər ˈdeɪɪtiz/',
    partOfSpeech: 'noun',
    definition: 'Spirits who safeguard practitioners and teachings.',
    etymology: 'English translation of Dharmapala',
    example: 'Mahakala is one of the fierce protector deities of the lineage.',
    synonyms: ['Dharmapala', 'Guardians', 'Defenders'],
    category: 'Spiritual'
  },
  {
    id: 'word-41',
    word: 'Rinpoche',
    phonetic: '/rɪnˈpoʊtʃeɪ/',
    partOfSpeech: 'noun',
    definition: 'A title meaning "precious teacher."',
    etymology: 'Tibetan rin-po-che "precious one"',
    example: 'The disciples bowed respectfully as Rinpoche entered the hall.',
    synonyms: ['Precious One', 'Master', 'Lama'],
    category: 'Cultural'
  },
  {
    id: 'word-42',
    word: 'Samten',
    phonetic: '/ˈsɑːmtɛn/',
    partOfSpeech: 'noun',
    definition: 'Deep meditative concentration and calmness.',
    etymology: 'Tibetan bsam-gtan "meditative stability"',
    example: 'Through years of retreat, he achieved stable samten.',
    synonyms: ['Meditation', 'Concentration', 'Dhyana'],
    category: 'Spiritual'
  },
  {
    id: 'word-43',
    word: 'Sampa Lhundrup',
    phonetic: '/ˈsɑːmpə ˈlʊndrʊp/',
    partOfSpeech: 'phrase',
    definition: 'The spontaneous fulfillment of positive spiritual aspirations.',
    etymology: 'Tibetan bsam-pa lhun-grub',
    example: 'Devotees chant the Sampa Lhundrup prayer to remove obstacles.',
    synonyms: ['Wish-fulfilling', 'Spontaneous accomplishment'],
    category: 'Spiritual'
  },
  {
    id: 'word-44',
    word: 'Sangay Menlha',
    phonetic: '/ˈsɑːŋɡeɪ ˈmɛnlə/',
    partOfSpeech: 'noun',
    definition: 'The Medicine Buddha who brings healing and protection.',
    etymology: 'Tibetan sangs-rgyas sman-bla',
    example: 'Practitioners visualize Sangay Menlha as blue like lapis lazuli.',
    synonyms: ['Medicine Buddha', 'Healing Buddha'],
    category: 'Spiritual'
  },
  {
    id: 'word-45',
    word: 'Sangha',
    phonetic: '/ˈsɑːŋɡə/',
    partOfSpeech: 'noun',
    definition: 'The community of monks, nuns, and Buddhist practitioners.',
    etymology: 'Sanskrit saṅgha "association, assembly"',
    example: 'Taking refuge in the Buddha, Dharma, and Sangha is central to Buddhism.',
    synonyms: ['Community', 'Assembly', 'Brotherhood'],
    category: 'Cultural'
  },
  {
    id: 'word-46',
    word: 'Semkye',
    phonetic: '/ˈsɛmkjeɪ/',
    partOfSpeech: 'noun',
    definition: 'The awakening of compassion and wisdom.',
    etymology: 'Tibetan sems-bskyed "generating the mind"',
    example: 'Bodhicitta, or Semkye, is the wish to attain enlightenment for others.',
    synonyms: ['Bodhicitta', 'Awakening mind', 'Altruistic intention'],
    category: 'Philosophy'
  },
  {
    id: 'word-47',
    word: 'Serkim',
    phonetic: '/ˈsɛrkɪm/',
    partOfSpeech: 'noun',
    definition: 'A golden drink-offering ritual for deities and protectors.',
    etymology: 'Tibetan gser-skyems "golden drink"',
    example: 'Black tea or alcohol is often used for the serkim offering.',
    synonyms: ['Golden drink', 'Libation offering'],
    category: 'Cultural'
  },
  {
    id: 'word-48',
    word: 'Tashi Delek',
    phonetic: '/ˈtɑːʃiː ˈdɛlɛk/',
    partOfSpeech: 'phrase',
    definition: 'A greeting meaning auspicious blessings and good fortune.',
    etymology: 'Tibetan bkra-shis bde-legs "auspicious goodness"',
    example: '"Tashi Delek!" is the common greeting during Tibetan New Year.',
    synonyms: ['Greetings', 'Good luck', 'Blessings'],
    category: 'Cultural'
  },
  {
    id: 'word-49',
    word: 'Tashi Sho',
    phonetic: '/ˈtɑːʃiː ʃoʊ/',
    partOfSpeech: 'phrase',
    definition: 'A phrase invoking rising luck and positive energy.',
    etymology: 'Tibetan',
    example: 'May your lungta rise! Tashi Sho!',
    synonyms: ['Good fortune', 'Rising luck'],
    category: 'Cultural'
  },
  {
    id: 'word-50',
    word: 'Tathata',
    phonetic: '/təˈtɑːtə/',
    partOfSpeech: 'noun',
    definition: 'The true nature of reality, meaning "suchness."',
    etymology: 'Sanskrit tathatā "thusness"',
    example: 'Seeing things as they truly are is resting in tathata.',
    synonyms: ['Suchness', 'Thusness', 'Ultimate reality'],
    category: 'Philosophy'
  },
  {
    id: 'word-51',
    word: 'Tendrel',
    phonetic: '/ˈtɛndrɛl/',
    partOfSpeech: 'noun',
    definition: 'Auspicious cause-and-effect leading to meaningful outcomes.',
    etymology: 'Tibetan rten-\'brel "dependent arising"',
    example: 'Meeting his teacher was considered a very good tendrel.',
    synonyms: ['Interdependence', 'Omen', 'Connection'],
    category: 'Philosophy'
  },
  {
    id: 'word-52',
    word: 'Terma',
    phonetic: '/ˈtɛrmə/',
    partOfSpeech: 'noun',
    definition: 'Hidden spiritual teachings revealed at the right time.',
    etymology: 'Tibetan gter-ma "treasure"',
    example: 'Tertons are masters who discover terma hidden by Guru Rinpoche.',
    synonyms: ['Hidden treasure', 'Revealed teaching'],
    category: 'Historical'
  },
  {
    id: 'word-53',
    word: 'Thangka',
    phonetic: '/ˈtɑːŋkə/',
    partOfSpeech: 'noun',
    definition: 'A sacred painted scroll showing deities or teachings.',
    etymology: 'Tibetan thang-ka "flat painting"',
    example: 'The monastery walls were hung with vibrant silk thangkas.',
    synonyms: ['Scroll painting', 'Religious art'],
    category: 'Cultural'
  },
  {
    id: 'word-54',
    word: 'Torma',
    phonetic: '/ˈtɔːrmə/',
    partOfSpeech: 'noun',
    definition: 'A ritual offering cake made from barley flour and butter.',
    etymology: 'Tibetan gtor-ma "cast out"',
    example: 'Elaborate tormas were sculpted for the annual puja.',
    synonyms: ['Ritual cake', 'Food offering', 'Effigy'],
    category: 'Cultural'
  },
  {
    id: 'word-55',
    word: 'Tso-Kyi Khorlo',
    phonetic: '/tsoʊ kjiː ˈkɔːrloʊ/',
    partOfSpeech: 'noun',
    definition: 'The sacred wheel of life-energy and balance.',
    etymology: 'Tibetan',
    example: 'Practices involving the Tso-Kyi Khorlo harmonize the body\'s energy.',
    synonyms: ['Wheel of life', 'Energy wheel'],
    category: 'Spiritual'
  },
  {
    id: 'word-56',
    word: 'Tsok Offering',
    phonetic: '/tsɒk/',
    partOfSpeech: 'noun',
    definition: 'A sacred feast honoring enlightened beings.',
    etymology: 'Tibetan tshogs "gathering"',
    example: 'The community gathered for a ganachakra or tsok offering feast.',
    synonyms: ['Feast offering', 'Ganachakra', 'Gathering'],
    category: 'Cultural'
  },
  {
    id: 'word-57',
    word: 'Yarlung',
    phonetic: '/ˈjɑːrlʊŋ/',
    partOfSpeech: 'noun',
    definition: 'An upward-flowing energy symbolizing spiritual growth.',
    etymology: 'Tibetan (Name of the first Tibetan dynasty valley)',
    example: 'The Yarlung dynasty marked the beginning of Tibetan civilization.',
    synonyms: ['Royal lineage', 'Spiritual energy'],
    category: 'Historical'
  },
  {
    id: 'word-58',
    word: 'Zangdok Palri',
    phonetic: '/ˈzɑːŋdɒk ˈpɑːlriː/',
    partOfSpeech: 'noun',
    definition: 'Guru Rinpoche\'s copper-colored paradise of enlightenment.',
    etymology: 'Tibetan zangs-mdog dpal-ri "Copper-Colored Mountain"',
    example: 'Devotees aspire to be reborn in the pure land of Zangdok Palri.',
    synonyms: ['Copper Mountain', 'Pure Land', 'Paradise'],
    category: 'Spiritual'
  }
];

const DictionarySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-parchment-100 rounded-full mb-6">
          <Book className="w-5 h-5 text-parchment-700" />
          <span className="text-sm font-medium text-parchment-800 uppercase tracking-wider">Lexicon</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink-900 mb-6">
          Dictionary of Wisdom
        </h2>
        <p className="text-lg text-ink-600 max-w-2xl mx-auto font-light leading-relaxed">
          Unlock the profound meanings behind ancient words. Each term is a key 
          that opens a door to deeper understanding of history, culture, and spirituality.
        </p>
      </motion.div>

      {/* Dictionary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {dictionaryEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white rounded-2xl border border-parchment-200 shadow-sm hover:shadow-xl hover:border-parchment-300 transition-all duration-300 overflow-hidden"
          >
            {/* Decorative Top Border */}
            <div className="h-2 bg-gradient-to-r from-parchment-300 via-parchment-500 to-parchment-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-3 mb-1">
                    <h3 className="text-3xl font-serif font-bold text-ink-900 group-hover:text-parchment-800 transition-colors">
                      {entry.word}
                    </h3>
                    <span className="text-sm font-mono text-parchment-600">{entry.phonetic}</span>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-parchment-500 bg-parchment-50 px-2 py-1 rounded">
                    {entry.category}
                  </span>
                </div>
              </div>

              {/* Definition */}
              <p className="text-lg text-ink-800 leading-relaxed font-serif">
                {entry.definition}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Footer Element */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-4 text-parchment-300">
          <div className="h-px w-20 bg-parchment-300"></div>
          <span className="text-2xl font-serif italic">§</span>
          <div className="h-px w-20 bg-parchment-300"></div>
        </div>
        <p className="mt-4 text-sm text-parchment-500 font-serif italic">
          "Language is the dress of thought."
        </p>
      </div>
    </div>
  );
};

export default DictionarySection;

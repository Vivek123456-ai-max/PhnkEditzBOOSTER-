import { PhonkGenre, PhonkMood, ViralReference } from '@/types';

export const GENRE_LABELS: Record<PhonkGenre, { label: string; icon: string; desc: string }> = {
  drift_phonk: { label: 'Drift Phonk', icon: '🏎️', desc: 'Heavy cowbell, 808 bass, JDM/Car drift sync' },
  brazilian_phonk: { label: 'Brazilian Phonk', icon: '🇧🇷', desc: 'Funk carioca rhythms, montagem, aggressive club bounce' },
  aggressive_phonk: { label: 'Aggressive / Rage', icon: '⚡', desc: 'Distorted 808s, high tempo, intense workout/fight edits' },
  slowed_reverb: { label: 'Slowed + Reverb', icon: '🌑', desc: 'Atmospheric night drive, aesthetic chill, reverb tails' },
  gym_phonk: { label: 'Gym / Sigma Phonk', icon: '💪', desc: 'PR motivation, heavy lifting, pre-workout energy' },
  anime_phonk: { label: 'Anime Dark Edit', icon: '⚔️', desc: 'AMV, villain arcs, sharp transition sync' },
  chill_lofi: { label: 'Chill / Lo-Fi Phonk', icon: '🌧️', desc: 'Mellow melody, vintage cassette tape texture' },
  wave_phonk: { label: 'Wave Phonk', icon: '🌊', desc: 'Cyberpunk synths, melodic futuristic bass' },
};

export const MOOD_OPTIONS: { id: PhonkMood; label: string; emoji: string }[] = [
  { id: 'dark', label: 'Dark Aesthetic', emoji: '💀' },
  { id: 'aggressive', label: 'Aggressive', emoji: '🔥' },
  { id: 'night_drive', label: 'Night Drive', emoji: '🌃' },
  { id: 'fast_drift', label: 'Fast Drift / JDM', emoji: '🏎️' },
  { id: 'bass_boosted', label: 'Bass Boosted', emoji: '🔊' },
  { id: 'gym_pump', label: 'Gym PR / Pump', emoji: '💪' },
  { id: 'sigma', label: 'Sigma / Chad', emoji: '🗿' },
  { id: 'rage', label: 'Rage Mode', emoji: '⚡' },
  { id: 'sad_nostalgic', label: 'Sad / Nostalgic', emoji: '💔' },
  { id: 'chill', label: 'Chill / Vibe', emoji: '🧘' },
];

export const PRESET_INPUTS = [
  {
    title: '🏎️ JDM Night Drift',
    description: 'Nissan Skyline R34 sliding through rainy Tokyo streets at midnight, heavy cowbell phonk beat drop',
    genre: 'drift_phonk' as PhonkGenre,
    moods: ['night_drive', 'fast_drift', 'dark'] as PhonkMood[],
  },
  {
    title: '💪 200kg PR Gym Motivation',
    description: 'Deadlift PR moment, aggressive gym workout edit, insane bass drop, pure adrenaline and pre-workout vibe',
    genre: 'gym_phonk' as PhonkGenre,
    moods: ['gym_pump', 'aggressive', 'rage'] as PhonkMood[],
  },
  {
    title: '🇧🇷 Brazilian Montagem Phonk',
    description: 'Ultra fast transitions, Brazilian phonk beat drop, supercar exhaust flames and high energy bounce',
    genre: 'brazilian_phonk' as PhonkGenre,
    moods: ['bass_boosted', 'aggressive', 'fast_drift'] as PhonkMood[],
  },
  {
    title: '🌑 Slowed + Reverb 3AM Drive',
    description: 'Empty highway at 3 AM, nostalgic slowed and reverb phonk, rainy windshield, deep aesthetic feeling',
    genre: 'slowed_reverb' as PhonkGenre,
    moods: ['sad_nostalgic', 'night_drive', 'chill'] as PhonkMood[],
  },
  {
    title: '⚔️ Dark Anime Villain Edit',
    description: 'Gojō / Sukuna battle scene edit, high FPS sync, dark aggressive wave phonk, 4K smooth transitions',
    genre: 'anime_phonk' as PhonkGenre,
    moods: ['dark', 'sigma', 'aggressive'] as PhonkMood[],
  },
];

export const TOP_PHONK_ARTISTS = [
  'Kordhell',
  'DVRST',
  'Hensonn',
  'Pharmacist',
  'Playaphonk',
  'Ghostface Playa',
  'SXMPRA',
  'MoonDeity',
  'Shadxwbxrn',
  'g3ox_em',
  'Pranav.wav',
  'Kute',
  'MUPP',
  'LXST CXNTURY',
  'Interworld',
  'Dxrk ダーク',
];

export const VIRAL_TITLE_TEMPLATES = [
  {
    pattern: 'Shorts Hook + Audio Warning',
    template: (subject: string) => `POV: The Bass Drops at 3 AM... 💀 (Wear Headphones 🎧)`,
    hookType: 'Audio Warning / Curiosity',
    highlightTag: 'Viral Hook',
  },
  {
    pattern: 'Bracket Power Tag + Scene',
    template: (subject: string) => `This Phonk Hit Different [SLOWED + REVERB] 🌃🔥`,
    hookType: 'Sound First',
    highlightTag: 'High CTR',
  },
  {
    pattern: 'Aggressive Adrenaline Hook',
    template: (subject: string) => `DONT BLINK 💀 | Aggressive Drift Phonk Edit 🔥 #shorts`,
    hookType: 'High Energy Shock',
    highlightTag: 'Algorithm Boost',
  },
  {
    pattern: 'Nostalgic Night Drive',
    template: (subject: string) => `3 AM Drive Vibes That Feel Like a Dream 🌧️ [Phonk Edit]`,
    hookType: 'Emotional / Vibe',
    highlightTag: 'Deep Retention',
  },
  {
    pattern: 'Sigma / Gym PR Hook',
    template: (subject: string) => `When The Pre-Workout Finally Kicks In 😈🔥 (PR Energy)`,
    hookType: 'Relatable Challenge',
    highlightTag: 'Gym Trend',
  },
  {
    pattern: 'Brazilian Phonk Beatdrop',
    template: (subject: string) => `Brazilian Phonk Goes CRAZY 🇧🇷🔊 (Supercar Edit)`,
    hookType: 'Genre Authority',
    highlightTag: 'Trending 2026',
  },
];

export const VIRAL_REFERENCE_BANK: ViralReference[] = [
  {
    pattern: 'POV: [Relatable/Aesthetic Situation] + [Sound Bracket]',
    example: 'POV: You are driving alone at 3:00 AM [SLOWED PHONK]',
    whyItWorks: 'Triggers instant visual imagination within the first 0.5s of scrolling, keeping viewers on the Short for the 100%+ retention threshold.',
    avgViews: '2.4M+ avg',
  },
  {
    pattern: 'Audio Warning / Challenge Hook: [Warning] + [Emoji]',
    example: 'WARNING: Clean Headphones Only 💀 | Drift Phonk Edit',
    whyItWorks: 'Increases comments as viewers react to audio quality, pushing engagement signals directly into the YouTube Shorts shelf.',
    avgViews: '1.8M+ avg',
  },
  {
    pattern: 'Superlative Shock: The Most Aggressive [Subject] You Will Hear',
    example: 'The Heaviest Brazilian Phonk Bassline Ever Created 🇧🇷🔥',
    whyItWorks: 'Creates intense curiosity gap that prevents skipping before the drop.',
    avgViews: '3.1M+ avg',
  },
  {
    pattern: 'Anime / Car Identity: [Car / Character] x [Phonk Subgenre]',
    example: 'R34 Skyline Midnight Drift x Brazilian Phonk [4K 60FPS]',
    whyItWorks: 'Targets passionate search queries on YouTube search + Suggested videos index for specific car & anime fanbases.',
    avgViews: '1.2M+ avg',
  },
];

export const GENERAL_DOS_AND_DONTS = {
  dos: [
    {
      title: 'Shorts ki Length 12 se 22 Seconds rakho',
      reason: 'Phonk edits mein looping feature kaam karta hai. Agar short 15s ka hai aur user usse do baar dekh leta hai (Loop), toh Retention 130%+ ho jata hai aur YouTube video ko seed audience se nikal kar millions mein push karta hai.',
    },
    {
      title: 'Title mein Curiosity Hook + Bracket Sound Tag daalo',
      reason: 'Jaise: "POV: The Bass Drops at 3 AM... 💀 [SLOWED + REVERB]". Aise titles swipe rate ko 30-45% tak drop kar dete hain (zyada log rukte hain).',
    },
    {
      title: 'First 1.5 Seconds mein Beat Drop ya Visual Shock do',
      reason: 'Shorts feed mein 80% log first 2 seconds mein swipe kar dete hain. Initial hook (flash, exhaust flame, bass kick) se swipe-away rate kam hota hai.',
    },
    {
      title: 'Description mein Song Name & Producer Credit zaroor likho',
      reason: 'YouTube ka Sound ID algorithm track identify karke similar phonk lovers ke feed mein video suggest karta hai, plus copyright strike risk 90% kam ho jata hai.',
    },
    {
      title: 'YouTube Studio Tags ko 350-480 Characters tak fill karo',
      reason: 'Mix broad tags (#phonk, #drift) + niche tags (#jdmphonk, #brazilianphonk) daalo taaki search aur browse feature dono index karein.',
    },
  ],
  donts: [
    {
      title: 'Title mein 5 se zyada Hashtags mat daalo',
      reason: 'Title mein sirf 1-2 hashtags daalo (e.g. #shorts #phonk). 5-6 hashtags title ko spammy bana dete hain aur CTR gir jaata hai.',
    },
    {
      title: 'Description mein 100+ Tags ki List (Tag Stuffing) mat daalo',
      reason: 'Description mein comma-separated ya long block tags daalna YouTube Community Guidelines (Spam/Misleading Metadata) ke khilaf hai — isse channel shadowban ho sakta hai.',
    },
    {
      title: 'Flat/Boring Titles mat rakho (e.g. "Phonk Edit #4" ya "Car Video")',
      reason: 'Aise titles se Browse CTR 2% se bhi neeche rehta hai, aur algorithm 1k views par hi video freeze kar deta hai.',
    },
    {
      title: 'Bina Transitions/Color Grading ke direct raw clips mat daalo',
      reason: 'YouTube Shorts algorithm visual motion aur high frame rate sync detect karta hai. Simple unedited clip par average watch time kam rehta hai.',
    },
    {
      title: 'Pehle 5 Second tak Silent / Slow buildup mat rakho',
      reason: 'Mobile viewers instant gratification chahte hain. Slow intro dekhte hi scroll kar dete hain, jisse "Viewed vs Swiped Away" ratio 60% se neeche chala jata hai.',
    },
  ],
  proTips: [
    '🎯 Pinned Comment Strategy: Pinned comment mein likho: "Headphones use kiya ya normal speakers? 🎧👇 Track name description mein hai!" — Isse comments spike honge aur algorithm boost karega.',
    '⚡ Seamless Loop Cut: Video ke end ko video ke starting beat se match karo, taaki viewer ko pata hi na chale ki video dubara start ho gayi hai.',
    '🔥 Upload Consistency: Daily ek specific time (Shaam 7:30 - 10:00 PM IST) par post karo taaki subscriber notification response strong mile.',
  ],
};

export const GENRE_TAG_MAP: Record<PhonkGenre, string[]> = {
  drift_phonk: [
    'drift phonk', 'drift phonk music', 'jdm drift', 'car edit', 'car phonk',
    'tokyo drift', 'night drive phonk', 'cowbell phonk', 'aggressive drift phonk',
    'drift car edit', 'jdm phonk edit', 'phonk 2026', 'drift music'
  ],
  brazilian_phonk: [
    'brazilian phonk', 'montagem phonk', 'funk phonk', 'brazilian phonk edit',
    'brazilian phonk bass boosted', 'funk carioca phonk', 'montagem edit',
    'brazilian drift phonk', 'tropa do phonk', 'favela phonk', 'brazil phonk shorts'
  ],
  aggressive_phonk: [
    'aggressive phonk', 'rage phonk', 'hard phonk', 'distorted phonk',
    'heavy bass phonk', 'fight phonk', 'demon phonk', 'phonk beat drop',
    'phonk workout', 'aggressive phonk music', 'phonk rage edit'
  ],
  slowed_reverb: [
    'slowed and reverb', 'slowed reverb phonk', '3am phonk', 'sad phonk',
    'chill phonk slowed', 'aesthetic phonk', 'night drive slowed',
    'slowed phonk edit', 'nostalgic phonk', 'rainy night drive phonk'
  ],
  gym_phonk: [
    'gym phonk', 'workout phonk', 'gym motivation phonk', 'pr phonk',
    'sigma phonk', 'hardstyle phonk', 'gym edit phonk', 'heavy lifting phonk',
    'pre workout phonk', 'gym shorts phonk', 'sigma gym motivation'
  ],
  anime_phonk: [
    'anime phonk', 'anime edit phonk', 'amv phonk', 'anime dark phonk',
    'anime badass edit', '4k anime edit', 'anime 60fps phonk', 'villain edit phonk',
    'anime phonk shorts', 'dark anime phonk'
  ],
  chill_lofi: [
    'chill phonk', 'lofi phonk', 'relaxing phonk', 'mellow phonk',
    'vintage phonk', 'cassette phonk', 'smooth phonk', 'chill drift phonk'
  ],
  wave_phonk: [
    'wave phonk', 'cyberpunk phonk', 'synth phonk', 'future phonk wave',
    'atmospheric wave phonk', 'wave edit phonk', 'neon phonk'
  ],
};

export const BASE_PHONK_TAGS = [
  'phonk',
  'phonk music',
  'phonk edit',
  'phonk shorts',
  'best phonk',
  'phonk song',
  'phonkeditz',
  'viral phonk',
  'phonk 2026',
  'bass boosted',
  'tiktok phonk',
  'phonk playlist'
];

export const TRENDING_HASHTAGS = [
  '#phonk',
  '#phonkmusic',
  '#phonkedit',
  '#driftphonk',
  '#shorts',
  '#viral',
  '#trending',
  '#caredit',
  '#gymphonk',
  '#brazilianphonk',
  '#bassboosted',
  '#nightdrive'
];

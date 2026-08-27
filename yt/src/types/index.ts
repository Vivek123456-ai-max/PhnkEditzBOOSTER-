export type PhonkGenre =
  | 'drift_phonk'
  | 'brazilian_phonk'
  | 'aggressive_phonk'
  | 'slowed_reverb'
  | 'gym_phonk'
  | 'anime_phonk'
  | 'chill_lofi'
  | 'wave_phonk';

export type VideoType = 'shorts' | 'long_form' | 'long';
export type VideoFormat = VideoType;

export type PhonkMood =
  | 'dark'
  | 'aggressive'
  | 'night_drive'
  | 'fast_drift'
  | 'bass_boosted'
  | 'gym_pump'
  | 'sigma'
  | 'rage'
  | 'sad_nostalgic'
  | 'chill'
  | 'chill_night'
  | 'gym_sigma'
  | 'rainy_aesthetic';

export interface GenerationInput {
  description: string;
  videoType: VideoType;
  genre: PhonkGenre;
  moods: PhonkMood[];
  trackName?: string;
  artistName?: string;
  channelName?: string;
  targetAudience?: 'global' | 'india' | 'us_europe';
  customKeywords?: string;
}

export interface ViralReference {
  pattern: string;
  example: string;
  whyItWorks: string;
  avgViews: string;
}

export interface GeneratedTitle {
  title: string;
  hookType: string;
  charCount: number;
  isFavorite?: boolean;
  highlightTag?: string;
  millionViewsPotential?: {
    rank: 'WINNER_1M' | 'RUNNER_UP' | 'SEARCH_KING' | 'CTR_MONSTER';
    badge: string;
    whyItHits1M: string;
    estimatedCTR: string;
    retentionMultiplier: string;
  };
}

export interface DosAndDonts {
  dos: Array<{ title: string; reason: string }>;
  donts: Array<{ title: string; reason: string }>;
  proTips: string[];
}

export interface ViralProbability {
  percentage: number;
  tier: 'ULTRA_VIRAL' | 'HIGH_POTENTIAL' | 'MODERATE' | 'NEEDS_OPTIMIZATION';
  tierLabel: string;
  factors: Array<{ label: string; score: number; desc: string }>;
}

export interface VisualEditBlueprint {
  frameTimings: Array<{
    time: string;
    action: string;
    effect: string;
    audioCue: string;
  }>;
  colorGradingLUT: string;
  soundDesignAdvice: string;
}

export interface AuditCheckItem {
  id: string;
  label: string;
  status: 'passed' | 'warning';
  detail: string;
  impactOn1M: string;
}

export interface MetadataResult {
  id: string;
  timestamp: number;
  input: GenerationInput;
  titles: GeneratedTitle[];
  description: string;
  tags: string[];
  tagsFormatted: string; // Comma separated for direct paste
  tagsCharCount: number;
  hashtags: string[];
  thumbnailHooks: string[];
  bestUploadTime: {
    peakHoursIST: string;
    peakHoursEST: string;
    audienceInsight: string;
  };
  seoScore: number;
  seoBreakdown: {
    titlePower: number;
    tagCoverage: number;
    descriptionRichness: number;
  };
  dosAndDonts?: DosAndDonts;
  viralProbability?: ViralProbability;
  visualEditBlueprint?: VisualEditBlueprint;
  auditChecks?: AuditCheckItem[];
  isFavorite?: boolean;
}

export interface UserSettings {
  geminiApiKey?: string;
  defaultChannelName: string;
  defaultVideoType: VideoType;
  includeEmojis: boolean;
  includeBrackets: boolean;
}

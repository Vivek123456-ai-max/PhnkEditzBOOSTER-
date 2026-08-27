'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Flame,
  Music,
  Video,
  Layers,
  Smile,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { GenerationInput, PhonkGenre, PhonkMood, VideoFormat } from '@/types';
import {
  GENRE_LABELS,
  MOOD_OPTIONS,
  PRESET_INPUTS,
} from '@/lib/phonkKnowledge';

interface InputPanelProps {
  onGenerate: (input: GenerationInput) => void;
  isLoading: boolean;
  defaultChannelName?: string;
  defaultVideoType?: VideoFormat;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  onGenerate,
  isLoading,
  defaultChannelName = 'PhnkEditz',
  defaultVideoType = 'shorts',
}) => {
  const [description, setDescription] = useState('');
  const [videoType, setVideoType] = useState<VideoFormat>(defaultVideoType);
  const [genre, setGenre] = useState<PhonkGenre>('drift_phonk');
  const [moods, setMoods] = useState<PhonkMood[]>(['dark', 'night_drive', 'fast_drift']);
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [customKeywords, setCustomKeywords] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const toggleMood = (moodId: PhonkMood) => {
    if (moods.includes(moodId)) {
      setMoods(moods.filter((m) => m !== moodId));
    } else {
      setMoods([...moods, moodId]);
    }
  };

  const handleApplyPreset = (preset: typeof PRESET_INPUTS[0]) => {
    setDescription(preset.description);
    setGenre(preset.genre);
    setMoods(preset.moods);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !trackName.trim()) {
      return;
    }
    onGenerate({
      description: description.trim() || `${GENRE_LABELS[genre].label} music edit with heavy bass drop`,
      videoType,
      genre,
      moods,
      trackName: trackName.trim(),
      artistName: artistName.trim(),
      channelName: defaultChannelName,
      customKeywords: customKeywords.trim(),
    });
  };

  const handleReset = () => {
    setDescription('');
    setTrackName('');
    setArtistName('');
    setCustomKeywords('');
    setMoods(['dark', 'night_drive']);
    setGenre('drift_phonk');
  };

  return (
    <div className="bg-glass-card rounded-2xl p-5 sm:p-6 shadow-2xl border border-zinc-800/80 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-phonk-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Preset Chips */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-phonk-accent" />
            Quick Viral Presets
          </span>
          <span className="text-[11px] text-zinc-500 hidden sm:inline">
            Click to auto-fill trending edit themes
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_INPUTS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-phonk-accent/50 text-xs font-medium text-zinc-300 hover:text-white transition-all transform active:scale-95 shadow-sm"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Main Video Description Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-phonk-accent" />
              What is your video / edit about? *
            </label>
            {description && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Slowed reverb phonk edit, car drift clip with Nissan Skyline R34, dark aesthetic night drive vibe in Tokyo rain..."
              className="w-full px-4 py-3 bg-zinc-950/90 border border-zinc-800 rounded-xl text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-phonk-accent focus:ring-1 focus:ring-phonk-accent transition-all resize-none shadow-inner leading-relaxed"
            />
          </div>
        </div>

        {/* Video Format & Sub-Genre Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Video Format */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-purple-400" />
              Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setVideoType('shorts')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  videoType === 'shorts'
                    ? 'bg-phonk-accent/20 border-phonk-accent text-white shadow-md shadow-phonk-accent/20'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Shorts (&lt;60s)
              </button>
              <button
                type="button"
                onClick={() => setVideoType('long')}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  videoType === 'long'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-500/20'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Long Video
              </button>
            </div>
          </div>

          {/* Phonk Subgenre Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-cyan-400" />
              Phonk Sub-Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value as PhonkGenre)}
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs sm:text-sm font-medium text-zinc-200 focus:outline-none focus:border-phonk-accent transition-colors cursor-pointer"
            >
              {(Object.keys(GENRE_LABELS) as PhonkGenre[]).map((g) => (
                <option key={g} value={g} className="bg-zinc-900 py-1">
                  {GENRE_LABELS[g].icon} {GENRE_LABELS[g].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mood & Vibe Multi-select Pills */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-emerald-400" />
            Mood / Theme Tags (Select Multiple)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {MOOD_OPTIONS.map((mood) => {
              const isSelected = moods.includes(mood.id);
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => toggleMood(mood.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-950 border-white shadow-sm font-semibold'
                      : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <span>{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Optional Fields Collapsible */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-phonk-accent" />
            <span>Optional Track Credits & Custom Keywords</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-xl space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Track / Song Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={trackName}
                    onChange={(e) => setTrackName(e.target.value)}
                    placeholder="e.g. Murder In My Mind, Close Eyes"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-phonk-accent"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Artist / Producer (Optional)
                  </label>
                  <input
                    type="text"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    placeholder="e.g. Kordhell, DVRST, Hensonn"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-phonk-accent"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Custom Keywords to Prioritize (Comma-separated)
                </label>
                <input
                  type="text"
                  value={customKeywords}
                  onChange={(e) => setCustomKeywords(e.target.value)}
                  placeholder="e.g. supra mk4, jdm drift, sigma phonk, 4k 60fps"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-phonk-accent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Generate CTA Button */}
        <button
          type="submit"
          disabled={isLoading || (!description.trim() && !trackName.trim())}
          className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl ${
            isLoading || (!description.trim() && !trackName.trim())
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
              : 'bg-gradient-to-r from-phonk-accent via-red-600 to-purple-600 hover:from-red-500 hover:via-phonk-accent hover:to-purple-500 text-white shadow-phonk-accent/30 hover:shadow-phonk-accent/50 transform active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing 2026 Trends & Generating Boost...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-white text-white" />
              <span>Boost & Generate Viral Metadata 🚀</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

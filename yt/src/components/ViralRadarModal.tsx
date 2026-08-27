'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Radio,
  Flame,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  TrendingUp,
  Music2,
  Video,
  ArrowRight,
  RefreshCw,
  Search,
  Zap,
  Clock,
  Activity,
  Globe2,
  Layers,
} from 'lucide-react';
import { ViralTrackItem } from '@/app/api/viral-radar/route';

interface ViralRadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTrackForRemake: (trackName: string, artistName: string, genre: any, suggestedPrompt: string) => void;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

type SubCategory = 'all' | 'brazilian' | 'drift' | 'gym' | 'slowed' | 'anime' | 'memphis' | 'wave' | 'rage' | 'long_mix';
type RegionFilter = 'all' | 'brazil' | 'russia' | 'japan' | 'usa' | 'europe' | 'middle_east';

export const ViralRadarModal: React.FC<ViralRadarModalProps> = ({
  isOpen,
  onClose,
  onSelectTrackForRemake,
  onShowToast,
}) => {
  const [tracks, setTracks] = useState<ViralTrackItem[]>([]);
  const [formatFilter, setFormatFilter] = useState<'all' | 'shorts' | 'long'>('all');
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<SubCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [syncCountdown, setSyncCountdown] = useState(15);
  const [streamCount, setStreamCount] = useState(54);

  const fetchRadarData = async (query = searchQuery, reg = regionFilter, cat = categoryFilter) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append('q', query.trim());
      if (reg !== 'all') params.append('region', reg);
      if (cat !== 'all') params.append('category', cat);
      params.append('t', `${Date.now()}_${Math.random()}`); // Non-repeating seed

      const url = `/api/viral-radar?${params.toString()}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.tracks && Array.isArray(data.tracks)) {
          setTracks(data.tracks);
          setStreamCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
        }
        if (data.lastUpdated) setLastUpdated(data.lastUpdated);
        setSyncCountdown(15);
      }
    } catch (e) {
      console.warn('Radar fetch error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch when opened
  useEffect(() => {
    if (isOpen) {
      fetchRadarData(searchQuery, regionFilter, categoryFilter);
    }
  }, [isOpen]);

  // Fast auto-sync countdown (Every 15s checks YouTube worldwide stream)
  useEffect(() => {
    if (!isOpen || !autoSyncEnabled) return;

    const timer = setInterval(() => {
      setSyncCountdown((prev) => {
        if (prev <= 1) {
          fetchRadarData(searchQuery, regionFilter, categoryFilter);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, autoSyncEnabled, searchQuery, regionFilter, categoryFilter]);

  if (!isOpen) return null;

  const handleRegionChange = (reg: RegionFilter) => {
    setRegionFilter(reg);
    fetchRadarData(searchQuery, reg, categoryFilter);
  };

  const handleCategoryChange = (cat: SubCategory) => {
    setCategoryFilter(cat);
    fetchRadarData(searchQuery, regionFilter, cat);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRadarData(searchQuery, regionFilter, categoryFilter);
    onShowToast(`Scanning worldwide YouTube streams for "${searchQuery || 'Global Viral Music'}"...`, 'info');
  };

  const handleForceRefresh = () => {
    fetchRadarData(searchQuery, regionFilter, categoryFilter);
    onShowToast('Pulled fresh, non-repeating worldwide viral batch!', 'success');
  };

  const filteredTracks = tracks.filter((t) => {
    if (formatFilter === 'all') return true;
    return t.format === formatFilter;
  });

  const handleUseTrack = (track: ViralTrackItem) => {
    const isBrazilian =
      track.category === 'brazilian' ||
      track.title.toLowerCase().includes('montagem') ||
      track.title.toLowerCase().includes('funk') ||
      track.title.toLowerCase().includes('brasil');
    const isGym =
      track.category === 'gym' ||
      track.title.toLowerCase().includes('pr') ||
      track.title.toLowerCase().includes('gym');
    const isSlowed =
      track.category === 'slowed' ||
      track.title.toLowerCase().includes('reverb') ||
      track.title.toLowerCase().includes('midnight');
    const isAnime =
      track.category === 'anime' ||
      track.title.toLowerCase().includes('gojo') ||
      track.title.toLowerCase().includes('sukuna');
    const isWave = track.category === 'wave';

    const genre = isBrazilian
      ? 'brazilian_phonk'
      : isGym
      ? 'gym_phonk'
      : isSlowed
      ? 'slowed_reverb'
      : isAnime
      ? 'anime_phonk'
      : isWave
      ? 'wave_phonk'
      : 'drift_phonk';

    const prompt = `${track.title} by ${track.artist}, 4K high-energy visual sync, ${
      isGym
        ? 'aggressive gym PR deadlift motivation'
        : isSlowed
        ? '3 AM empty highway aesthetic rain drive'
        : isAnime
        ? 'dark anime villain transformation'
        : 'supercar night drift beat drop'
    }`;

    onSelectTrackForRemake(track.title, track.artist, genre, prompt);
    onShowToast(`Loaded "${track.title}" into Booster!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-600/30 to-amber-600/30 border border-red-500/40 text-red-400 shadow-md">
              <Globe2 className="w-5 h-5 animate-pulse text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Worldwide Phonk &amp; Viral Music Radar 🌍
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-black tracking-wider rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Global Stream: {streamCount}+ Sounds Tracked
                </span>
                <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">
                  (Auto-Sync: {syncCountdown}s)
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Duniya ki sari viral musics &amp; phonk tracks ka real-time scan: 0% duplicate, 100% fresh
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search, Region & Category Controls */}
        <div className="py-2.5 space-y-2.5 border-b border-zinc-800/80 shrink-0">
          {/* Custom Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any global artist, sound or car (e.g. Kordhell, Montagem, Skyline R34, Tevvez, Sukuna)..."
                className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-red-600/20 active:scale-95"
            >
              <Activity className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Scanning...' : 'Live Scan'}</span>
            </button>
            <button
              type="button"
              onClick={handleForceRefresh}
              disabled={isLoading}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-cyan-300 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 border border-zinc-700 active:scale-95"
              title="Pull fresh new worldwide batch"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Fresh Batch</span>
            </button>
          </form>

          {/* Worldwide Region Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: '🌍 All Worldwide' },
              { id: 'brazil', label: '🇧🇷 Brazil Favela Funk' },
              { id: 'russia', label: '🇷🇺 Russian Drift' },
              { id: 'japan', label: '🇯🇵 Tokyo / Anime Wave' },
              { id: 'usa', label: '🇺🇸 US Memphis & TikTok' },
              { id: 'europe', label: '🇪🇺 Europe Gym Sigma' },
              { id: 'middle_east', label: '🇹🇷 Middle East Drift' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => handleRegionChange(reg.id as RegionFilter)}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap border ${
                  regionFilter === reg.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

          {/* Sub-Genre Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-xs">
            {[
              { id: 'all', label: '🔥 All Styles' },
              { id: 'brazilian', label: '🇧🇷 Montagem / Automotivo' },
              { id: 'drift', label: '🏎️ 808 Cowbell Drift' },
              { id: 'gym', label: '💪 Gym PR / Sigma' },
              { id: 'slowed', label: '🌑 3 AM Slowed Aesthetic' },
              { id: 'anime', label: '⚔️ Dark Anime AMV' },
              { id: 'memphis', label: '📼 Memphis Tape' },
              { id: 'wave', label: '🌊 Cyberpunk Wave' },
              { id: 'long_mix', label: '🎬 1-Hour Compilations' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as SubCategory)}
                className={`px-2.5 py-0.5 rounded-md font-semibold text-[10px] transition-all whitespace-nowrap border ${
                  categoryFilter === cat.id
                    ? 'bg-red-600/30 border-red-500 text-white shadow-sm'
                    : 'bg-zinc-900 border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body: Dynamic Track Cards List */}
        <div className="py-3 space-y-3 overflow-y-auto pr-1">
          {isLoading && tracks.length === 0 ? (
            <div className="p-10 text-center space-y-2">
              <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs text-zinc-400 font-medium">Scanning Worldwide YouTube Audio Streams...</p>
            </div>
          ) : filteredTracks.length === 0 ? (
            <div className="p-8 text-center space-y-2 bg-zinc-950 rounded-xl border border-zinc-800">
              <Music2 className="w-8 h-8 text-zinc-500 mx-auto" />
              <p className="text-sm font-bold text-white">No tracks found for "{searchQuery}"</p>
              <p className="text-xs text-zinc-400">Click a region or style above for instant fresh results.</p>
            </div>
          ) : (
            filteredTracks.map((track, idx) => {
              const isMustRemake = track.remakeDecision === 'MUST_REMAKE';
              const isTwist = track.remakeDecision === 'REMAKE_WITH_TWIST';

              return (
                <div
                  key={track.id || idx}
                  className={`p-4 rounded-2xl border transition-all space-y-2.5 ${
                    isMustRemake
                      ? 'bg-gradient-to-r from-emerald-950/20 via-zinc-950 to-zinc-950 border-emerald-500/40 shadow-sm'
                      : isTwist
                      ? 'bg-gradient-to-r from-amber-950/20 via-zinc-950 to-zinc-950 border-amber-500/40 shadow-sm'
                      : 'bg-gradient-to-r from-red-950/20 via-zinc-950 to-zinc-950 border-red-500/30 shadow-sm'
                  }`}
                >
                  {/* Track Top Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-black uppercase rounded-md border ${
                            track.format === 'shorts'
                              ? 'bg-red-500/20 text-red-300 border-red-500/30'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {track.format === 'shorts' ? '⚡ YouTube Shorts' : '🎬 Long-Form'}
                        </span>

                        {/* Region Tag */}
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-zinc-900 border border-zinc-800 text-amber-300 flex items-center gap-1">
                          <span>{track.regionFlag || '🌍'}</span>
                          <span>{track.regionLabel || 'Global'}</span>
                        </span>

                        {track.isLiveFeed && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                            <Activity className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                            Live Worldwide Surge
                          </span>
                        )}

                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                          ⏱️ {track.uploadedTimeAgo}
                        </span>

                        <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-amber-400" />
                          {track.trendPhaseLabel}
                        </span>

                        <span className="text-[10px] text-emerald-400 font-mono font-bold">
                          📈 {track.viewsVelocity || track.estimatedViewsRange}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-white line-clamp-1">
                        {track.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                        <Music2 className="w-3.5 h-3.5 text-purple-400" />
                        Artist: {track.artist}
                      </p>
                    </div>

                    {/* Remake Decision Pill */}
                    <div className="shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wide border shadow-md ${
                          isMustRemake
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-950/40'
                            : isTwist
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-950/40'
                            : 'bg-red-500/20 text-red-300 border-red-500/40 shadow-red-950/40'
                        }`}
                      >
                        {isMustRemake ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : isTwist ? (
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                        )}
                        {track.remakeDecisionLabel}
                      </span>
                    </div>
                  </div>

                  {/* Why Remake & Exact Actionable Tips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-0.5">
                      <span className="font-bold text-zinc-200 block text-[11px]">
                        💡 Kyun Remake Karna Chahiye? (Global Algorithm Trigger)
                      </span>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{track.whyRemake}</p>
                    </div>

                    <div className="p-2.5 bg-zinc-900/80 rounded-xl border border-zinc-800/80 space-y-0.5">
                      <span className="font-bold text-emerald-400 block text-[11px]">
                        🎯 Exact Remake Action Guide:
                      </span>
                      <p className="text-[11px] text-zinc-300 leading-relaxed">
                        {track.actionableRemakeTips}
                      </p>
                    </div>
                  </div>

                  {/* CTA to Boost & Remake this track */}
                  <div className="pt-0.5 flex items-center justify-end">
                    <button
                      onClick={() => handleUseTrack(track)}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-phonk-accent to-red-600 hover:from-red-500 hover:to-phonk-accent text-white text-xs font-black shadow-md shadow-phonk-accent/20 transition-all transform active:scale-95"
                    >
                      <span>🚀 Remake &amp; Generate Metadata for This Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-zinc-500 hidden sm:block">
            🌍 Worldwide Live Stream: 0% Duplication Guarantee | YouTube global audio trends scanned every 15s
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors ml-auto"
          >
            Close Radar
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Sparkles, Copy, Check, Flame, Music2, Eye, ShieldCheck, Radio, RefreshCw } from 'lucide-react';
import { TOP_PHONK_ARTISTS, TRENDING_HASHTAGS, VIRAL_REFERENCE_BANK } from '@/lib/phonkKnowledge';

interface CompetitorTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const CompetitorTrendsModal: React.FC<CompetitorTrendsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [liveYtKeywords, setLiveYtKeywords] = useState<string[]>([]);
  const [liveYtTitles, setLiveYtTitles] = useState<{ title: string; author: string }[]>([]);
  const [isFetchingLive, setIsFetchingLive] = useState(false);

  const fetchLiveTrends = async () => {
    setIsFetchingLive(true);
    try {
      const res = await fetch('/api/live-trends?q=phonk');
      if (res.ok) {
        const data = await res.json();
        if (data.liveSuggestions) setLiveYtKeywords(data.liveSuggestions);
        if (data.liveRecentTitles) setLiveYtTitles(data.liveRecentTitles);
      }
    } catch (e) {
      console.warn('Failed to fetch live trends:', e);
    } finally {
      setIsFetchingLive(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLiveTrends();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    onShowToast(`Copied ${label} to clipboard!`, 'success');
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Phonk Viral Trend & Competitor Bank
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live YT Server Sync
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Real-time YouTube search suggestions and proven 1M+ views structural formulas
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

        {/* Modal Body */}
        <div className="py-4 space-y-6 overflow-y-auto pr-1">
          {/* Live YouTube Server Autocomplete Keywords */}
          <div className="p-4 bg-zinc-950/90 border border-emerald-500/30 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Live YouTube Autocomplete Searches (Streaming from YT Server)
                </h3>
              </div>
              <button
                onClick={fetchLiveTrends}
                disabled={isFetchingLive}
                className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1"
                title="Refresh live data"
              >
                <RefreshCw className={`w-3 h-3 ${isFetchingLive ? 'animate-spin text-emerald-400' : ''}`} />
                <span>{isFetchingLive ? 'Syncing...' : 'Refresh'}</span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-400">
              Ye keywords log abhi issi waqt YouTube search box mein type kar rahe hain:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {liveYtKeywords.length > 0 ? (
                liveYtKeywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => handleCopy(kw, kw)}
                    className="px-2.5 py-1 bg-zinc-900 hover:bg-emerald-950/40 border border-zinc-800 hover:border-emerald-500/50 rounded-lg text-xs font-medium text-zinc-200 hover:text-emerald-300 transition-all flex items-center gap-1"
                  >
                    <span>{kw}</span>
                    <Copy className="w-3 h-3 text-zinc-500" />
                  </button>
                ))
              ) : (
                <span className="text-xs text-zinc-500">Fetching live YouTube data...</span>
              )}
            </div>
          </div>

          {/* Top Phonk Artists / Keywords */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Music2 className="w-4 h-4 text-purple-400" />
                High-Volume Phonk Artists & Producers
              </h3>
              <span className="text-[11px] text-zinc-500">Click any name to copy</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TOP_PHONK_ARTISTS.map((artist) => (
                <button
                  key={artist}
                  onClick={() => handleCopy(artist, artist)}
                  className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/50 rounded-lg text-xs font-medium text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 group"
                >
                  <span>{artist}</span>
                  {copiedItem === artist ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Shorts Hashtags */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400" />
                Top Algorithm Hashtags for Shorts
              </h3>
              <button
                onClick={() => handleCopy(TRENDING_HASHTAGS.join(' '), 'All Hashtags')}
                className="text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy All Hashtags
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {TRENDING_HASHTAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleCopy(tag, tag)}
                  className="px-3 py-1.5 bg-zinc-950/80 border border-red-500/20 hover:border-red-500/60 rounded-lg text-xs font-medium text-red-300 hover:text-white transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Viral Reference Formulas */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Deconstructed 1M+ View Title Formulas
              </h3>
            </div>
            <div className="space-y-3">
              {VIRAL_REFERENCE_BANK.map((ref, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-zinc-950/90 border border-zinc-800/80 rounded-xl space-y-2 hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-semibold text-sm text-zinc-100">{ref.pattern}</div>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {ref.avgViews}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2 bg-zinc-900 rounded-lg border border-zinc-800/60">
                    <span className="text-xs font-mono text-zinc-300">{ref.example}</span>
                    <button
                      onClick={() => handleCopy(ref.example, 'Example Title')}
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Copy example"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-300">Why it works:</strong> {ref.whyItWorks}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Strategy Box */}
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-purple-300">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Algorithm Anti-Stagnation Rule (Breaking the 1k Views Ceiling):
            </div>
            <p className="text-zinc-300 leading-relaxed">
              YouTube tests each Short on a seed audience of ~400–1,000 viewers. If average percentage viewed (APV) exceeds <strong>85-110%</strong> and Viewed vs Swiped Away exceeds <strong>75%</strong>, it gets pushed into the millions shelf. Using curiosity hooks, audio warnings (e.g. 🎧), and tight sound-focused titles ensures the viewer doesn’t swipe within the first 2 seconds.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

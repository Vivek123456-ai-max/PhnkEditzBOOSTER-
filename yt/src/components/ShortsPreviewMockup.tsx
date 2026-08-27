'use client';

import React, { useState } from 'react';
import { Smartphone, Flame, ThumbsUp, MessageSquare, Share2, Music2, Eye, Sparkles } from 'lucide-react';
import { GeneratedTitle } from '@/types';

interface ShortsPreviewMockupProps {
  titles: GeneratedTitle[];
  channelName: string;
  selectedTitleIndex: number;
  onSelectTitleIndex: (index: number) => void;
  thumbnailHook: string;
  genre: string;
}

export const ShortsPreviewMockup: React.FC<ShortsPreviewMockupProps> = ({
  titles,
  channelName,
  selectedTitleIndex,
  onSelectTitleIndex,
  thumbnailHook,
  genre,
}) => {
  const currentTitle = titles[selectedTitleIndex]?.title || titles[0]?.title || 'Phonk Edit';

  return (
    <div className="bg-glass-card rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 text-phonk-accent">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Live YouTube Shorts Mobile Feed Simulator
            </h3>
            <p className="text-xs text-zinc-400">
              Dekhein mobile screen pe aapka Short aur Title viewers ko kaisa dikhega
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Feed Preview
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Title Selector Tabs */}
        <div className="md:col-span-6 space-y-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
            Select Title to Test in Mobile Feed:
          </label>
          <div className="space-y-1.5 max-h-[320px] overflow-y-auto pr-1">
            {titles.slice(0, 5).map((t, idx) => (
              <button
                key={idx}
                onClick={() => onSelectTitleIndex(idx)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between gap-2 ${
                  selectedTitleIndex === idx
                    ? 'bg-red-950/40 border-phonk-accent text-white shadow-md'
                    : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                }`}
              >
                <span className="truncate">{t.title}</span>
                {t.millionViewsPotential && (
                  <span className="px-1.5 py-0.2 text-[9px] font-extrabold rounded bg-zinc-900 text-amber-400 border border-amber-500/30 shrink-0">
                    1M+
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Realistic Mobile Shorts Screen Preview */}
        <div className="md:col-span-6 flex justify-center">
          <div className="w-[240px] h-[440px] bg-zinc-950 rounded-[32px] border-[5px] border-zinc-800 p-3 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none">
            {/* Background Aesthetic Mockup */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-radial-gradient from-red-900/30 via-zinc-900 to-black z-0 flex items-center justify-center">
              <div className="text-center space-y-2 z-0 opacity-80">
                <span className="px-3 py-1 bg-red-600/40 backdrop-blur-md rounded-lg text-white font-black text-xs uppercase tracking-wider border border-red-500/50 shadow-lg inline-block animate-pulse">
                  {thumbnailHook || 'DONT BLINK 💀'}
                </span>
                <p className="text-[10px] text-zinc-500 font-mono">4K 60FPS Sync</p>
              </div>
            </div>

            {/* Top Phone Notch */}
            <div className="relative z-20 flex items-center justify-between text-[9px] font-bold text-zinc-400 px-2 pt-1">
              <span>Shorts</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Live Feed</span>
              </div>
            </div>

            {/* Right Action Icons (Like, Comment, Share) */}
            <div className="absolute right-2 bottom-16 z-20 flex flex-col items-center gap-3.5">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                  <ThumbsUp className="w-4 h-4 fill-white" />
                </div>
                <span className="text-[9px] font-bold text-white mt-0.5 block">142K</span>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-white mt-0.5 block">1.8K</span>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                  <Share2 className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-bold text-white mt-0.5 block">Share</span>
              </div>
            </div>

            {/* Bottom Shorts Title & Channel Details */}
            <div className="relative z-20 space-y-1.5 pr-10 pb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-red-500 to-purple-600 flex items-center justify-center text-[9px] font-black text-white">
                  P
                </div>
                <span className="text-[11px] font-bold text-white">@{channelName || 'PhnkEditz'}</span>
                <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[8px] font-bold">Subscribe</span>
              </div>

              <p className="text-[11px] font-bold text-zinc-100 line-clamp-2 leading-tight drop-shadow-md">
                {currentTitle}
              </p>

              <div className="flex items-center gap-1 text-[9px] text-zinc-300 font-medium">
                <Music2 className="w-2.5 h-2.5 text-purple-400" />
                <span className="truncate">Original Audio - Phonk Sound ID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { X, Zap, Target, BarChart3, Clock, Repeat, Flame, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface ViralFormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViralFormulaModal: React.FC<ViralFormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-purple-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                YouTube Real-Time Algorithm Blueprint (2026)
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Tested Formula
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Exact numbers aur metrics jo 1k views freeze tod kar millions tak le jaate hain
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

        {/* Body */}
        <div className="py-4 space-y-5 overflow-y-auto pr-1">
          {/* 1. The Realtime Algorithm Funnel */}
          <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4" />
              1. YouTube Ka 3-Stage Testing Funnel (Real-Time Mechanism)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-zinc-400">Stage 1: Seed Test</span>
                <p className="font-bold text-white">0 – 1,000 Views</p>
                <p className="text-[11px] text-zinc-400">
                  Upload ke 30-120 min me algorithm ~400 se 1000 logo ko video dikhata hai.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-amber-400">Stage 2: Evaluation</span>
                <p className="font-bold text-white">The Viral Gate</p>
                <p className="text-[11px] text-zinc-400">
                  Agar Viewed vs Swiped &gt; 70% aur Retention &gt; 90% hai toh agla push milta hai.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-emerald-400">Stage 3: Viral Shelf</span>
                <p className="font-bold text-white">100k – 10M+ Views</p>
                <p className="text-[11px] text-zinc-400">
                  Global Shorts shelf & Search recommendations me continuous push milta hai.
                </p>
              </div>
            </div>
          </div>

          {/* 2. The 3 Golden Metrics Checklist */}
          <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              2. The 3 Golden Viral Targets (Target Numbers)
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between gap-3 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="font-bold text-zinc-100">A. Viewed vs. Swiped Away:</span>
                  <p className="text-[11px] text-zinc-400">
                    70%+ Log rukne chahiye (Sirf 30% swipe). 50% pe video ruk jaati hai.
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-black rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  Target: &gt; 72%
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="font-bold text-zinc-100">B. Average Percentage Viewed (APV):</span>
                  <p className="text-[11px] text-zinc-400">
                    12-18s video ka target 110%-130% hona chahiye (Looping ke zariye).
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-black rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  Target: &gt; 110%
                </span>
              </div>

              <div className="flex items-start justify-between gap-3 p-2.5 bg-zinc-900/60 rounded-lg border border-zinc-800/80">
                <div>
                  <span className="font-bold text-zinc-100">C. Engagement Velocity (Likes/Comments in 1 hr):</span>
                  <p className="text-[11px] text-zinc-400">
                    Har 100 views par kam se kam 7-10 likes aur 2-3 comments chahiye.
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-black rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  Target: 8% Ratio
                </span>
              </div>
            </div>
          </div>

          {/* 3. The 4-Step Viral Execution Formula */}
          <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              3. The 4-Step Instant Viral Action Formula
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="font-bold text-red-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" /> Step 1: 0.5s Visual Explosion
                </span>
                <p className="text-[11px] text-zinc-300">
                  Pehle frame par flash/motion blur ya exhaust flame sync do. Viewer ka brain turant pause hoga.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1">
                  <Repeat className="w-3.5 h-3.5" /> Step 2: The Infinite Loop Cut
                </span>
                <p className="text-[11px] text-zinc-300">
                  Video ke aakhri 1 second ko pehle 1 second ke beat se match karo taaki video 2 baar dekhi jaye.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="font-bold text-cyan-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Step 3: Peak Audio Window
                </span>
                <p className="text-[11px] text-zinc-300">
                  Shaam 7:30 PM - 10:30 PM IST me upload karo jab gym/gaming listeners Shorts feed scroll kar rahe hote hain.
                </p>
              </div>

              <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Step 4: Metadata Optimization
                </span>
                <p className="text-[11px] text-zinc-300">
                  Is booster tool se Title, 500-char tags aur sound credits generate karke direct paste karo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

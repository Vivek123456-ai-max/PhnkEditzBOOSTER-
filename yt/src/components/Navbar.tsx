'use client';

import React, { useState } from 'react';
import {
  Flame,
  Sparkles,
  Sliders,
  History,
  TrendingUp,
  Zap,
  Radio,
  Clock,
  Image as ImageIcon,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

interface NavbarProps {
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onOpenTrends: () => void;
  onOpenFormula: () => void;
  onOpenRadar: () => void;
  onOpenTiming: () => void;
  onOpenThumbnails: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSettings,
  onOpenHistory,
  onOpenTrends,
  onOpenFormula,
  onOpenRadar,
  onOpenTiming,
  onOpenThumbnails,
  historyCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileClick = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-phonk-accent via-red-600 to-purple-700 shadow-lg shadow-phonk-accent/30 text-white font-black text-base sm:text-lg shrink-0">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-black tracking-tight text-white text-sm sm:text-base md:text-lg">
                Phnk<span className="text-phonk-accent">Editz</span>
              </span>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] uppercase font-black tracking-wider rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700 flex items-center gap-0.5 sm:gap-1">
                <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
                <span>Booster</span>
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden md:block">
              1M+ Views SEO &amp; Viral Growth Ecosystem
            </p>
          </div>
        </div>

        {/* Desktop Quick Nav (Visible on lg+) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-2.5">
          {/* Thumbnail Studio */}
          <button
            onClick={onOpenThumbnails}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/50 border border-purple-500/40 text-xs font-bold text-purple-300 transition-all hover:text-white group shadow-sm"
          >
            <ImageIcon className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>Thumbnail Studio</span>
          </button>

          {/* Upload Timing & Protocol */}
          <button
            onClick={onOpenTiming}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-500/40 text-xs font-bold text-cyan-300 transition-all hover:text-white group shadow-sm"
          >
            <Clock className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Upload Timing</span>
          </button>

          {/* Live Phonk Radar */}
          <button
            onClick={onOpenRadar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600/30 to-purple-600/30 hover:from-red-600/50 hover:to-purple-600/50 border border-red-500/40 text-xs font-bold text-red-300 transition-all hover:text-white group shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse group-hover:scale-110 transition-transform" />
            <span>Phonk Radar</span>
          </button>

          {/* Viral Blueprint */}
          <button
            onClick={onOpenFormula}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-amber-300 transition-all hover:text-white group shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
            <span>Formula</span>
          </button>

          {/* Trends */}
          <button
            onClick={onOpenTrends}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 transition-all hover:text-white group shadow-sm"
          >
            <TrendingUp className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
            <span>Trends</span>
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-zinc-200 transition-all hover:text-white group shadow-sm"
          >
            <History className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-300 border border-purple-500/40">
                {historyCount}
              </span>
            )}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
            title="Settings & API Key"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Mobile & Tablet Compact Action Bar (< lg) */}
        <div className="flex lg:hidden items-center gap-1.5">
          {/* Quick Radar Button on Mobile */}
          <button
            onClick={onOpenRadar}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-[11px] font-bold text-red-300"
          >
            <Radio className="w-3 h-3 text-red-400 animate-pulse" />
            <span>Radar</span>
          </button>

          {/* Quick Thumbnails Button on Mobile */}
          <button
            onClick={onOpenThumbnails}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-600/20 border border-purple-500/40 text-[11px] font-bold text-purple-300"
          >
            <ImageIcon className="w-3 h-3 text-purple-400" />
            <span>Studio</span>
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950/98 p-3.5 space-y-2 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => handleMobileClick(onOpenRadar)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-red-950/30 border border-red-500/30 text-red-300"
            >
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <span>Phonk Radar</span>
            </button>

            <button
              onClick={() => handleMobileClick(onOpenThumbnails)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-300"
            >
              <ImageIcon className="w-4 h-4 text-purple-400" />
              <span>Thumbnail Studio</span>
            </button>

            <button
              onClick={() => handleMobileClick(onOpenTiming)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300"
            >
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Upload Timing</span>
            </button>

            <button
              onClick={() => handleMobileClick(onOpenFormula)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-300"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Viral Formula</span>
            </button>

            <button
              onClick={() => handleMobileClick(onOpenTrends)}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span>Viral Trends Bank</span>
            </button>

            <button
              onClick={() => handleMobileClick(onOpenHistory)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-purple-400" />
                <span>History</span>
              </div>
              {historyCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-300 border border-purple-500/40">
                  {historyCount}
                </span>
              )}
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => handleMobileClick(onOpenSettings)}
              className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Settings &amp; Gemini API Key</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

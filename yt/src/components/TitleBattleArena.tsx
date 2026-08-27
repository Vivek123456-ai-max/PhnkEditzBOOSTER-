'use client';

import React, { useState } from 'react';
import { Swords, Trophy, Sparkles, TrendingUp, AlertTriangle, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { GeneratedTitle } from '@/types';

interface TitleBattleArenaProps {
  titles: GeneratedTitle[];
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const TitleBattleArena: React.FC<TitleBattleArenaProps> = ({ titles, onShowToast }) => {
  const [indexA, setIndexA] = useState<number>(0);
  const [indexB, setIndexB] = useState<number>(1 < titles.length ? 1 : 0);

  const titleA = titles[indexA]?.title || '';
  const titleB = titles[indexB]?.title || '';

  // Algorithmic evaluation score calculations
  const calculateMetrics = (t: string, idx: number) => {
    let ctr = 11.5;
    let swipeRisk = 26;
    let searchPower = 88;

    const lower = t.toLowerCase();
    if (lower.includes('pov') || lower.includes('when') || lower.includes('bro')) {
      ctr += 3.5;
      swipeRisk -= 5;
    }
    if (lower.includes('warning') || lower.includes('dont blink') || lower.includes('volume')) {
      ctr += 4.2;
      swipeRisk -= 8;
    }
    if (lower.includes('[') && lower.includes(']')) {
      searchPower += 8;
    }
    if (t.length > 85) {
      ctr -= 2.0;
      swipeRisk += 4;
    }

    const overallScore = Math.round(ctr * 3 + (100 - swipeRisk) * 0.4 + searchPower * 0.3);

    return {
      ctr: Math.min(18.9, Math.max(7.2, parseFloat(ctr.toFixed(1)))),
      swipeRisk: Math.min(48, Math.max(16, swipeRisk)),
      searchPower: Math.min(99, searchPower),
      overallScore,
    };
  };

  const scoreA = calculateMetrics(titleA, indexA);
  const scoreB = calculateMetrics(titleB, indexB);

  const winner = scoreA.overallScore >= scoreB.overallScore ? 'A' : 'B';
  const winningTitle = winner === 'A' ? titleA : titleB;

  return (
    <div className="bg-glass-card rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              A/B Title Battle Arena (Split-Test Simulator)
            </h3>
            <p className="text-xs text-zinc-400">
              2 candidate titles ko head-to-head ladakar dekhein kaunsa title algorithm mein jeetega
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
          A/B Simulator
        </span>
      </div>

      {/* Arena Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {/* Fighter A */}
        <div
          className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
            winner === 'A'
              ? 'bg-gradient-to-br from-amber-950/30 via-zinc-950 to-zinc-950 border-amber-500/60 shadow-lg'
              : 'bg-zinc-950/80 border-zinc-800/80'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-black text-[10px] uppercase">
                Candidate Title A
              </span>
              {winner === 'A' && (
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-400">
                  <Trophy className="w-3.5 h-3.5 fill-amber-400" />
                  Winner Champion
                </span>
              )}
            </div>

            <select
              value={indexA}
              onChange={(e) => setIndexA(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-blue-500"
            >
              {titles.map((t, idx) => (
                <option key={idx} value={idx}>
                  #{idx + 1}: {t.title.slice(0, 50)}...
                </option>
              ))}
            </select>

            <p className="text-xs sm:text-sm font-bold text-white min-h-[42px]">{titleA}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center text-xs">
            <div className="p-2 bg-zinc-900/60 rounded-lg">
              <span className="text-[10px] text-zinc-400 block">Est. CTR</span>
              <strong className="text-emerald-400 font-black">{scoreA.ctr}%</strong>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-lg">
              <span className="text-[10px] text-zinc-400 block">Swipe Risk</span>
              <strong className="text-amber-400 font-black">{scoreA.swipeRisk}%</strong>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-lg">
              <span className="text-[10px] text-zinc-400 block">Power Score</span>
              <strong className="text-cyan-400 font-black">{scoreA.overallScore}</strong>
            </div>
          </div>
        </div>

        {/* Fighter B */}
        <div
          className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
            winner === 'B'
              ? 'bg-gradient-to-br from-amber-950/30 via-zinc-950 to-zinc-950 border-amber-500/60 shadow-lg'
              : 'bg-zinc-950/80 border-zinc-800/80'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-black text-[10px] uppercase">
                Candidate Title B
              </span>
              {winner === 'B' && (
                <span className="flex items-center gap-1 text-[11px] font-extrabold text-amber-400">
                  <Trophy className="w-3.5 h-3.5 fill-amber-400" />
                  Winner Champion
                </span>
              )}
            </div>

            <select
              value={indexB}
              onChange={(e) => setIndexB(Number(e.target.value))}
              className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
            >
              {titles.map((t, idx) => (
                <option key={idx} value={idx}>
                  #{idx + 1}: {t.title.slice(0, 50)}...
                </option>
              ))}
            </select>

            <p className="text-xs sm:text-sm font-bold text-white min-h-[42px]">{titleB}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center text-xs">
            <div className="p-2 bg-zinc-900/60 rounded-lg">
              <span className="text-[10px] text-zinc-400 block">Est. CTR</span>
              <strong className="text-emerald-400 font-black">{scoreB.ctr}%</strong>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-lg">
              <span className="text-[10px] text-zinc-400 block">Swipe Risk</span>
              <strong className="text-amber-400 font-black">{scoreB.swipeRisk}%</strong>
            </div>
            <div className="p-2 bg-zinc-900/60 rounded-lg">
              <span className="text-[10px] text-zinc-400 block">Power Score</span>
              <strong className="text-cyan-400 font-black">{scoreB.overallScore}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Battle Verdict Advice */}
      <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs space-y-1">
        <div className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-amber-400" />
          A/B Split Test Recommendation:
        </div>
        <p className="text-[11px] text-zinc-300 leading-relaxed">
          Pehle 24 ghante <strong className="text-white">Title {winner}</strong> ke sath upload karein. Agar video 1k views pe slow ho, tab candidate <strong>Title {winner === 'A' ? 'B' : 'A'}</strong> se rename kar dein taaki YouTube algorithm video ko nayi audience shelf par re-test kare!
        </p>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Activity, Flame, Eye, Repeat, ShieldCheck, Zap } from 'lucide-react';

export const RetentionTimeline: React.FC = () => {
  const phases = [
    {
      timeRange: '0.0s – 1.5s',
      title: 'The Visual Hook / Shock Window',
      target: 'Swipe Rate < 25%',
      color: 'border-red-500/50 bg-red-950/20 text-red-300',
      badge: '🚨 CRITICAL (80% Swipes Happen Here)',
      instruction: 'Start direct in motion. No slow black screen, no fade-in. Use exhaust flame, bass shake, or sudden transition.',
    },
    {
      timeRange: '1.5s – 4.5s',
      title: 'Rhythm Buildup & Velocity Shakes',
      target: 'Hold 90%+ Audience',
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
      badge: '⚡ PACING SYNC',
      instruction: 'Fast velocity cuts on every 1/2 beat. Keep viewer eyes focused on center screen.',
    },
    {
      timeRange: '4.5s – 11.0s',
      title: 'Main Drop Payoff & Climax',
      target: 'Audience Satisfaction',
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-300',
      badge: '🔊 BASS CLIMAX',
      instruction: 'Heaviest bass impact sync. Deliver on the title promise (clean drift, gym PR, anime attack).',
    },
    {
      timeRange: '11.0s – 15.0s',
      title: 'The Seamless Loop Bridge',
      target: 'Trigger 130%+ Re-watch APV',
      color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
      badge: '♾️ INFINITE LOOP TRIGGER',
      instruction: 'End audio & video on the exact same chord/frame as 0.0s so viewers automatically re-watch the video.',
    },
  ];

  return (
    <div className="bg-glass-card rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Second-by-Second Retention Blueprint (0s to 15s)
            </h3>
            <p className="text-xs text-zinc-400">
              Shorts banate waqt har second pe kya lagana hai taaki 130%+ retention mile
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Algorithm Blueprint
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {phases.map((phase, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border space-y-2 flex flex-col justify-between ${phase.color}`}
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-white px-2 py-0.5 bg-zinc-950 rounded-md">
                  {phase.timeRange}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider">{phase.target}</span>
              </div>
              <h4 className="text-xs font-bold text-zinc-100">{phase.title}</h4>
              <p className="text-[11px] text-zinc-300 leading-relaxed">{phase.instruction}</p>
            </div>
            <div className="pt-2 border-t border-zinc-800/40 text-[10px] font-extrabold">{phase.badge}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

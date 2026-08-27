'use client';

import React, { useState } from 'react';
import { Sliders, Music, Zap, Copy, Check, Sparkles, Clock, Layers } from 'lucide-react';

interface AudioSyncCalculatorProps {
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const AudioSyncCalculator: React.FC<AudioSyncCalculatorProps> = ({ onShowToast }) => {
  const [bpm, setBpm] = useState<number>(145);
  const [copiedKeyframes, setCopiedKeyframes] = useState(false);

  // Calculate beat intervals in milliseconds
  // 1 beat = 60,000 / BPM ms
  const beatMs = Math.round(60000 / bpm);
  const halfBeatMs = Math.round(beatMs / 2);
  const quarterBeatMs = Math.round(beatMs / 4);

  // Timestamps for a standard 14-second Phonk Short (assuming 32 beats)
  const dropBeat = 8; // Drop typically hits on beat 8 (approx 3.3s to 3.7s)
  const dropMs = dropBeat * beatMs;
  const loopCutMs = 32 * beatMs; // 32 beats loop
  const loopSeconds = (loopCutMs / 1000).toFixed(2);

  const keyframesText = `🎵 PHONK BPM & VELOCITY TIMINGS (${bpm} BPM):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ 1 Beat Interval: ${beatMs} ms
⚡ 1/2 Beat Transition: ${halfBeatMs} ms
⚡ 1/4 Beat Velocity Flash: ${quarterBeatMs} ms

🎯 SECOND-BY-SECOND EDIT TIMINGS:
- 0:00.00s : 0.5s Visual Shock (Initial Hook)
- ${(dropMs / 1000).toFixed(2)}s : Main Bass Drop Impact (Flash + Shake Keyframe)
- ${loopSeconds}s : PERFECT SEAMLESS LOOP CUT (Cut here for 130%+ Retention!)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const handleCopyKeyframes = () => {
    navigator.clipboard.writeText(keyframesText);
    setCopiedKeyframes(true);
    onShowToast('Copied BPM keyframes for CapCut / Video Editor!', 'success');
    setTimeout(() => setCopiedKeyframes(false), 2000);
  };

  return (
    <div className="bg-glass-card rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Audio BPM & Velocity Sync Calculator
            </h3>
            <p className="text-xs text-zinc-400">
              CapCut / Premiere mein perfect beat-drop sync aur seamless loop cut ke liye exact milliseconds
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyKeyframes}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-bold transition-all"
        >
          {copiedKeyframes ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKeyframes ? 'Copied' : 'Copy Timings'}</span>
        </button>
      </div>

      {/* Preset BPM Buttons */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
          Select Sub-Genre BPM Preset:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: '🇧🇷 Brazilian Funk', val: 130 },
            { label: '🏎️ Drift Phonk', val: 145 },
            { label: '⚡ Aggressive / Rage', val: 155 },
            { label: '🌑 Slowed Phonk', val: 115 },
          ].map((preset) => (
            <button
              key={preset.val}
              onClick={() => setBpm(preset.val)}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                bpm === preset.val
                  ? 'bg-cyan-950/40 border-cyan-500 text-cyan-300 shadow-md'
                  : 'bg-zinc-950/70 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <div>{preset.label}</div>
              <div className="text-[10px] text-zinc-500 font-mono">{preset.val} BPM</div>
            </button>
          ))}
        </div>
      </div>

      {/* Calculated Millisecond Keyframes Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 block">Velocity Flash Keyframe</span>
          <p className="text-base font-black text-cyan-400">{quarterBeatMs} ms</p>
          <p className="text-[10px] text-zinc-500">Every 1/4 beat quick shake / zoom in CapCut</p>
        </div>

        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 block">Bass Drop Keyframe</span>
          <p className="text-base font-black text-amber-400">{(dropMs / 1000).toFixed(2)}s</p>
          <p className="text-[10px] text-zinc-500">Primary explosion / exhaust flash moment</p>
        </div>

        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 block">Infinite Loop Cut Duration</span>
          <p className="text-base font-black text-emerald-400">{loopSeconds}s</p>
          <p className="text-[10px] text-zinc-500">Exact length for 32-beat perfect loop (130%+ retention)</p>
        </div>
      </div>
    </div>
  );
};

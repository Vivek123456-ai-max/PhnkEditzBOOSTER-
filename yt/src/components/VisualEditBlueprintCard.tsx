'use client';

import React, { useState } from 'react';
import { Film, Sparkles, Copy, Check, Scissors, Sliders, Volume2, Eye, Layers } from 'lucide-react';
import { VisualEditBlueprint } from '@/types';

interface VisualEditBlueprintCardProps {
  blueprint?: VisualEditBlueprint;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const VisualEditBlueprintCard: React.FC<VisualEditBlueprintCardProps> = ({
  blueprint,
  onShowToast,
}) => {
  const [copiedScript, setCopiedScript] = useState(false);

  if (!blueprint) return null;

  const handleCopyScript = () => {
    const text = `🎬 CAPCUT / PREMIERE VISUAL EDIT BLUEPRINT (1M+ VIEWS SYNC):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎨 COLOR GRADING LUT:
${blueprint.colorGradingLUT}

🔊 SOUND DESIGN ADVICE:
${blueprint.soundDesignAdvice}

⏱️ SECOND-BY-SECOND FRAME TIMELINES:
${blueprint.frameTimings
  .map(
    (f, idx) => `
[Frame ${idx + 1}] ${f.time}
• Visual Action: ${f.action}
• Video FX: ${f.effect}
• Audio Cue: ${f.audioCue}`
  )
  .join('\n')}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    navigator.clipboard.writeText(text);
    setCopiedScript(true);
    onShowToast('Copied Visual Edit Blueprint for CapCut / Premiere!', 'success');
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="bg-glass-card rounded-2xl p-5 sm:p-6 border border-zinc-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 text-phonk-accent">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              AI Visual Edit & CapCut Frame Blueprint
            </h3>
            <p className="text-xs text-zinc-400">
              Aapke subject ke according frame-by-frame visual cuts aur transitions ka exact guide
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyScript}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 rounded-xl text-xs font-bold transition-all transform active:scale-95"
        >
          {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedScript ? 'Blueprint Copied!' : 'Copy Script for Editor'}</span>
        </button>
      </div>

      {/* Frame Timelines List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {blueprint.frameTimings.map((frame, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-zinc-950/90 rounded-xl border border-zinc-800/80 space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-amber-400 text-xs px-2 py-0.5 bg-zinc-900 rounded-md border border-zinc-800">
                  {frame.time}
                </span>
                <span className="text-[10px] uppercase font-bold text-zinc-500">
                  Frame #{idx + 1}
                </span>
              </div>

              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">Visual Action:</span>
                <p className="font-bold text-zinc-100">{frame.action}</p>
              </div>

              <div>
                <span className="text-zinc-400 block text-[10px] uppercase font-bold">FX &amp; Shake:</span>
                <p className="text-[11px] text-cyan-300">{frame.effect}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-900 flex items-start gap-1.5 text-[11px] text-purple-300 font-medium">
              <Volume2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
              <span>{frame.audioCue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Grading & Sound Design Advice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1">
          <span className="font-bold text-emerald-400 block text-[11px] uppercase tracking-wider">
            🎨 Color Grading LUT:
          </span>
          <p className="text-[11px] text-zinc-300 leading-relaxed">{blueprint.colorGradingLUT}</p>
        </div>

        <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-1">
          <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider">
            🔊 Sound Design Advice:
          </span>
          <p className="text-[11px] text-zinc-300 leading-relaxed">{blueprint.soundDesignAdvice}</p>
        </div>
      </div>
    </div>
  );
};

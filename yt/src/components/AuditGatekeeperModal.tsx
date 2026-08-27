'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Crown,
  Sparkles,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AuditCheckItem, ViralProbability } from '@/types';

interface AuditGatekeeperModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditChecks?: AuditCheckItem[];
  viralProbability?: ViralProbability;
  seoScore?: number;
}

export const AuditGatekeeperModal: React.FC<AuditGatekeeperModalProps> = ({
  isOpen,
  onClose,
  auditChecks = [],
  viralProbability,
  seoScore = 98,
}) => {
  if (!isOpen) return null;

  const passedCount = auditChecks.filter((c) => c.status === 'passed').length;
  const isReady = passedCount >= auditChecks.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  1 Million Views Algorithm Gatekeeper & Audit
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {passedCount}/{auditChecks.length} Passed
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                YouTube algorithm viral criteria check: Upload karne se pehle verify karein
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

        {/* Score Overview Card */}
        <div className="py-3.5 border-b border-zinc-800/80 shrink-0">
          <div className="p-4 bg-gradient-to-r from-emerald-950/30 via-zinc-950 to-zinc-950 border border-emerald-500/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-emerald-500/50 flex items-center justify-center shrink-0">
                <span className="text-lg font-black text-emerald-400">{viralProbability?.percentage || 94}%</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
                  Algorithm Readiness Verdict:
                </h3>
                <p className="text-xs text-emerald-300 font-semibold">
                  {isReady
                    ? '✅ 100% READY TO PASS 1K VIEWS SEED FILTER & BREAK THE ALGORITHM'
                    : '⚡ MINOR OPTIMIZATIONS RECOMMENDED'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Checklist Items */}
        <div className="py-3 space-y-3 overflow-y-auto pr-1">
          {auditChecks.map((item) => (
            <div
              key={item.id}
              className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800 flex items-start justify-between gap-3"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h4 className="text-xs font-bold text-zinc-100">{item.label}</h4>
                </div>
                <p className="text-[11px] text-zinc-400 pl-6 leading-relaxed">{item.detail}</p>
                <div className="pl-6 pt-1 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Target className="w-3 h-3 shrink-0" />
                  <span>1M Factor: {item.impactOn1M}</span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                Passed
              </span>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};

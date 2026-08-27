'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Zap,
  Video,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Flame,
  Globe,
  Bell,
  Sliders,
} from 'lucide-react';

interface UploadProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadProtocolModal: React.FC<UploadProtocolModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'shorts' | 'long'>('shorts');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isPeakNow, setIsPeakNow] = useState<{ status: 'PEAK' | 'GOOD' | 'OFF_PEAK'; label: string; text: string }>({
    status: 'PEAK',
    label: '🟢 PEAK UPLOAD WINDOW (Optimal Now)',
    text: 'Shaam ka peak scroll time chal raha hai, upload ke liye best window hai!',
  });

  useEffect(() => {
    const updateTimeStatus = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      const hours = now.getHours();

      // Hours in IST:
      // 19:30 - 23:30 (7:30 PM - 11:30 PM) -> Peak
      // 13:00 - 16:00 (1:00 PM - 4:00 PM) -> Good
      // 23:30 - 01:30 (11:30 PM - 1:30 AM) -> Late night Phonk Peak
      if (hours >= 19 && hours <= 23) {
        setIsPeakNow({
          status: 'PEAK',
          label: '🔥 EVENING PRIME PEAK (Best Time Right Now!)',
          text: 'Phonk/Music listeners aur gaming audience active hai. Abhi upload karne par initial 1-hour velocity maximum milegi!',
        });
      } else if (hours >= 13 && hours <= 16) {
        setIsPeakNow({
          status: 'GOOD',
          label: '⚡ AFTERNOON SCROLL WINDOW (Good Time)',
          text: 'College/office break time audience scroll kar rahi hai. Good for initial seed testing.',
        });
      } else if (hours >= 23 || hours <= 1) {
        setIsPeakNow({
          status: 'PEAK',
          label: '🌌 3 AM NIGHT DRIVE / GAMING PEAK',
          text: 'Dark aesthetic aur slowed phonk sunne wale late night active hote hain.',
        });
      } else {
        setIsPeakNow({
          status: 'OFF_PEAK',
          label: '⏳ PREPARATION WINDOW (Upload Unlisted / Schedule for 7:30 PM)',
          text: 'Abhi video edit karke Unlisted upload karein aur 7:30 PM ke liye schedule kar dein.',
        });
      }
    };

    updateTimeStatus();
    const interval = setInterval(updateTimeStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-red-500" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Smart Upload Timing & Step-by-Step Publishing Protocol
              </h2>
              <p className="text-xs text-zinc-400">
                Kab aur kaise upload karna hai taaki algorithm maximum reach de
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

        {/* Live Current Time & Status Card */}
        <div className="py-3.5 border-b border-zinc-800/80 shrink-0">
          <div
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isPeakNow.status === 'PEAK'
                ? 'bg-red-950/30 border-red-500/40 text-red-300'
                : isPeakNow.status === 'GOOD'
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-300'
                : 'bg-zinc-950 border-zinc-800 text-zinc-300'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-black text-xs uppercase tracking-wider">{isPeakNow.label}</span>
                <span className="text-[11px] font-mono text-zinc-400">({currentTime})</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">{isPeakNow.text}</p>
            </div>
          </div>
        </div>

        {/* Format Selector Tabs */}
        <div className="pt-3 pb-2 flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('shorts')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'shorts'
                ? 'bg-red-600/20 border border-red-500 text-white shadow-md'
                : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>YouTube Shorts Protocol (&lt;60s)</span>
          </button>

          <button
            onClick={() => setActiveTab('long')}
            className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'long'
                ? 'bg-purple-600/20 border border-purple-500 text-white shadow-md'
                : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-cyan-400" />
            <span>Long Video / 1-Hour Mix Protocol</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="py-3 space-y-5 overflow-y-auto pr-1">
          {activeTab === 'shorts' ? (
            /* SHORTS SECTION */
            <div className="space-y-4 text-xs">
              {/* 1. Best Time Slots for Shorts */}
              <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
                <h3 className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 1. Shorts Upload Timing Windows (Phonk Niche)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-red-400">🔥 Slot #1 (Primary Prime)</span>
                    <p className="font-bold text-white text-sm">7:30 PM – 10:00 PM IST</p>
                    <p className="text-[11px] text-zinc-400">Gaming, gym aur mobile viewers ka peak rush time.</p>
                  </div>

                  <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400">⚡ Slot #2 (Afternoon Break)</span>
                    <p className="font-bold text-white text-sm">1:00 PM – 3:30 PM IST</p>
                    <p className="text-[11px] text-zinc-400">Lunch break scroll; US audience ke liye night peak.</p>
                  </div>

                  <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-cyan-400">🌌 Slot #3 (Late Night 3AM)</span>
                    <p className="font-bold text-white text-sm">11:00 PM – 1:00 AM IST</p>
                    <p className="text-[11px] text-zinc-400">Slowed/reverb phonk aur night drive listeners ke liye best.</p>
                  </div>
                </div>

                <div className="pt-1 flex items-center gap-2 text-[11px] text-zinc-400">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    <strong>Best Days for Shorts:</strong> Friday, Saturday, Sunday (Weekend binge) aur Wednesday.
                  </span>
                </div>
              </div>

              {/* 2. Step-by-Step HOW TO UPLOAD Shorts (The 7-Step Protocol) */}
              <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
                <h3 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Shorts Upload Kaise Karein (Exact 7 Steps)
                </h3>
                <div className="space-y-2">
                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Upload as UNLISTED first (Direct Public mat karein):</span>
                      <p className="text-[11px] text-zinc-400">
                        YouTube ko 10-15 minute lagte hain SD se HD 60FPS video process karne aur Audio ID match karne mein.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Mobile App se Best Thumbnail Frame choose karein:</span>
                      <p className="text-[11px] text-zinc-400">
                        Upload screen pe pencil ✏️ icon dabakar video ka sabse explosive visual frame thumbnail set karein.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Booster se 👑 1M+ Winner Title Paste karein:</span>
                      <p className="text-[11px] text-zinc-400">
                        Title 80 characters ke andar rakhein with curiosity hook + bracket sound tag + #shorts.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      4
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">YouTube Studio Tags Box (480 chars):</span>
                      <p className="text-[11px] text-zinc-400">
                        Booster se comma-separated tags copy karke Studio ke Tags box mein paste kar dein.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      5
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Category & Audience Settings:</span>
                      <p className="text-[11px] text-zinc-400">
                        Category: <strong>Music</strong> ya <strong>Entertainment</strong> | Audience: <strong>"No, it's not made for kids"</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      6
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Make PUBLIC at Peak Time:</span>
                      <p className="text-[11px] text-zinc-400">
                        Peak window (7:30 PM – 10:00 PM) aate hi video ko Public set karein.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      7
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">First Minute Pinned Comment:</span>
                      <p className="text-[11px] text-zinc-400">
                        Upload hote hi turant question comment pin karein: <em>"Headphones 🎧 ya speakers? Song name description me hai! 👇"</em>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* LONG-FORM VIDEO SECTION */
            <div className="space-y-4 text-xs">
              {/* 1. Best Time Slots for Long Videos */}
              <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
                <h3 className="font-bold text-purple-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 1. Long Video & 1-Hour Mixes Upload Timing
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-purple-400">👑 Primary Slot (Evening Pre-Peak)</span>
                    <p className="font-bold text-white text-sm">5:30 PM – 7:30 PM IST</p>
                    <p className="text-[11px] text-zinc-400">
                      Long video upload hone ke baad 2 ghante algorithm indexing aur subscribers tak notification pahunchne mein lagte hain.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-cyan-400">☕ Weekend Study/Chill Slot</span>
                    <p className="font-bold text-white text-sm">11:00 AM – 2:00 PM IST (Sat/Sun)</p>
                    <p className="text-[11px] text-zinc-400">
                      Weekend par log lambe background music mixes laga kar gaming ya coding karte hain.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Step-by-Step HOW TO UPLOAD Long Videos */}
              <div className="p-4 bg-zinc-950/90 border border-zinc-800 rounded-xl space-y-3">
                <h3 className="font-bold text-cyan-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 2. Long Video Upload Protocol (Step-by-Step)
                </h3>
                <div className="space-y-2">
                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Upload 3 Hours Before Peak Time as Unlisted:</span>
                      <p className="text-[11px] text-zinc-400">
                        1-hour mix ki 4K/1080p processing complete hone ka wait karein taaki viewer ko direct HD quality mile.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Custom Dark Aesthetic Thumbnail (1920x1080):</span>
                      <p className="text-[11px] text-zinc-400">
                        Rainy night drive ya high-contrast supercar graphic with bold text (e.g. <em>3 AM PHONK MIX 🌧️</em>).
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">Description mein Tracklist Timestamps dalein:</span>
                      <p className="text-[11px] text-zinc-400">
                        Example: 00:00 Track 1, 03:20 Track 2. YouTube chapters search indexing mein bohot helpful hote hain.
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-zinc-900/80 rounded-lg border border-zinc-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center shrink-0 text-xs">
                      4
                    </span>
                    <div>
                      <span className="font-bold text-zinc-100">End Screen & Cards Link karein:</span>
                      <p className="text-[11px] text-zinc-400">
                        Video ke end mein apne best performing Shorts ya Playlist ko link karein taaki audience channel pe ghoome.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};

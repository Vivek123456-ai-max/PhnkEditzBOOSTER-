'use client';

import React, { useState, useEffect } from 'react';
import { X, Key, Sliders, Shield, Sparkles, Youtube, Check } from 'lucide-react';
import { UserSettings, VideoFormat } from '@/types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onSave: (newSettings: UserSettings) => void;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSave,
  onShowToast,
}) => {
  const [apiKey, setApiKey] = useState(settings.geminiApiKey);
  const [channelName, setChannelName] = useState(settings.defaultChannelName);
  const [videoType, setVideoType] = useState<VideoFormat>(settings.defaultVideoType);
  const [includeEmojis, setIncludeEmojis] = useState(settings.includeEmojis);
  const [includeBrackets, setIncludeBrackets] = useState(settings.includeBrackets);

  useEffect(() => {
    setApiKey(settings.geminiApiKey);
    setChannelName(settings.defaultChannelName);
    setVideoType(settings.defaultVideoType);
    setIncludeEmojis(settings.includeEmojis);
    setIncludeBrackets(settings.includeBrackets);
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      geminiApiKey: (apiKey || '').trim(),
      defaultChannelName: channelName.trim() || 'PhnkEditz',
      defaultVideoType: videoType,
      includeEmojis,
      includeBrackets,
    });
    onShowToast('Settings saved successfully!', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Top Accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-phonk-accent via-phonk-purple to-phonk-neonCyan" />

        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-phonk-accent/10 text-phonk-accent">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Booster Settings</h2>
              <p className="text-xs text-zinc-400">Configure AI provider & generator defaults</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {/* Gemini API Key */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              <Key className="w-3.5 h-3.5 text-phonk-neonCyan" />
              Gemini API Key (Optional)
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy... (Leave empty for built-in algorithmic engine)"
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-phonk-neonCyan transition-colors font-mono"
              />
            </div>
            <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Stored strictly in your local browser storage. The app works 100% offline & out of the box even without a key!
            </p>
          </div>

          {/* Default Channel Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              <Youtube className="w-3.5 h-3.5 text-red-500" />
              Default Channel Name / Handle
            </label>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="e.g. PhnkEditz, PhonkVibes"
              className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-phonk-accent transition-colors"
            />
            <p className="text-[11px] text-zinc-500">
              Auto-inserted in credits, watermarks, and subscribe call-to-actions.
            </p>
          </div>

          {/* Default Video Format */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
              Default Upload Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVideoType('shorts')}
                className={`py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  videoType === 'shorts'
                    ? 'bg-phonk-accent/15 border-phonk-accent text-white shadow-lg shadow-phonk-accent/20'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                ⚡ YouTube Shorts (&lt; 60s)
              </button>
              <button
                type="button"
                onClick={() => setVideoType('long')}
                className={`py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                  videoType === 'long'
                    ? 'bg-phonk-purple/20 border-phonk-neonPurple text-white shadow-lg shadow-phonk-purple/20'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                🎬 Full Track / Long Video
              </button>
            </div>
          </div>

          {/* Formatting Toggles */}
          <div className="pt-2 border-t border-zinc-800/80 space-y-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                Include High-CTR Viral Emojis in Titles (🔥, 💀, 🚗, 🇧🇷)
              </span>
              <input
                type="checkbox"
                checked={includeEmojis}
                onChange={(e) => setIncludeEmojis(e.target.checked)}
                className="w-4 h-4 accent-phonk-accent rounded cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                Include Sound & Visual Brackets ([SLOWED], [4K 60FPS])
              </span>
              <input
                type="checkbox"
                checked={includeBrackets}
                onChange={(e) => setIncludeBrackets(e.target.checked)}
                className="w-4 h-4 accent-phonk-accent rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-phonk-accent to-red-600 hover:from-red-500 hover:to-phonk-accent text-white text-sm font-semibold rounded-xl shadow-lg shadow-phonk-accent/25 transition-all transform active:scale-95"
          >
            <Check className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

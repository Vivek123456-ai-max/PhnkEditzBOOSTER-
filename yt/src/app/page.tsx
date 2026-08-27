'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { InputPanel } from '@/components/InputPanel';
import { OutputResults } from '@/components/OutputResults';
import { SettingsModal } from '@/components/SettingsModal';
import { CompetitorTrendsModal } from '@/components/CompetitorTrendsModal';
import { ViralFormulaModal } from '@/components/ViralFormulaModal';
import { ViralRadarModal } from '@/components/ViralRadarModal';
import { UploadProtocolModal } from '@/components/UploadProtocolModal';
import { ThumbnailStudioModal } from '@/components/ThumbnailStudioModal';
import { AuditGatekeeperModal } from '@/components/AuditGatekeeperModal';
import { HistoryDrawer } from '@/components/HistoryDrawer';
import { Toast, ToastMessage } from '@/components/Toast';
import { GenerationInput, MetadataResult, UserSettings, PhonkGenre } from '@/types';
import { generateMetadata } from '@/lib/generator';
import { Flame, Sparkles, TrendingUp, ShieldCheck, Zap, Music2, ArrowUpRight, Radio, Clock, Image as ImageIcon } from 'lucide-react';

const DEFAULT_SETTINGS: UserSettings = {
  geminiApiKey: '',
  defaultChannelName: 'PhnkEditz',
  defaultVideoType: 'shorts',
  includeEmojis: true,
  includeBrackets: true,
};

const STORAGE_KEYS = {
  SETTINGS: 'phnkeditz_settings_v1',
  HISTORY: 'phnkeditz_history_v1',
};

export default function Home() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [history, setHistory] = useState<MetadataResult[]>([]);
  const [currentResult, setCurrentResult] = useState<MetadataResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal visibility states
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState(false);
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [isTimingOpen, setIsTimingOpen] = useState(false);
  const [isThumbnailStudioOpen, setIsThumbnailStudioOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  // Load persisted data on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
      const savedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setHistory(parsed);
        if (parsed.length > 0 && !currentResult) {
          setCurrentResult(parsed[0]);
        }
      }
    } catch (err) {
      console.error('Error loading localStorage data:', err);
    }
  }, []);

  const showToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
  };

  const handleGenerate = async (input: GenerationInput) => {
    setIsLoading(true);
    try {
      const result = await generateMetadata(input, settings.geminiApiKey);
      setCurrentResult(result);

      // Save to history
      const updatedHistory = [result, ...history.slice(0, 49)];
      setHistory(updatedHistory);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updatedHistory));

      showToast('Viral metadata suite generated successfully!', 'success');

      // Smooth scroll down to results on mobile
      setTimeout(() => {
        const element = document.getElementById('results-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (error) {
      console.error('Generation failed:', error);
      showToast('Generation encountered an issue. Fallback applied.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    const updated = history.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setHistory(updated);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));

    if (currentResult && currentResult.id === id) {
      setCurrentResult({
        ...currentResult,
        isFavorite: !currentResult.isFavorite,
      });
    }
    showToast('Updated favorites!', 'info');
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    showToast('Deleted from history', 'info');
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all generation history?')) {
      setHistory([]);
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      showToast('History cleared', 'info');
    }
  };

  const handleSelectTrackForRemake = (
    trackName: string,
    artistName: string,
    genre: PhonkGenre,
    suggestedPrompt: string
  ) => {
    handleGenerate({
      description: suggestedPrompt,
      videoType: 'shorts',
      genre,
      moods: ['dark', 'fast_drift', 'bass_boosted'],
      trackName,
      artistName,
      channelName: settings.defaultChannelName,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-phonk-bg text-zinc-100">
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenTrends={() => setIsTrendsOpen(true)}
        onOpenFormula={() => setIsFormulaOpen(true)}
        onOpenRadar={() => setIsRadarOpen(true)}
        onOpenTiming={() => setIsTimingOpen(true)}
        onOpenThumbnails={() => setIsThumbnailStudioOpen(true)}
        historyCount={history.length}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3 px-1">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] sm:text-xs font-semibold text-zinc-300 shadow-sm flex-wrap justify-center">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-emerald-400 font-bold">Live YouTube Server Connected</span>
            <span className="text-zinc-500 hidden xs:inline">•</span>
            <span className="text-zinc-200">Real-time Search &amp; Trend Sync</span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Stop Getting Stuck at 1k Views.{' '}
            <span className="bg-gradient-to-r from-phonk-accent via-red-500 to-purple-500 bg-clip-text text-transparent">
              Dominate the Shorts Feed.
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Generate high-CTR viral titles, 500-char YouTube tag clouds, retention-boosting descriptions, and trending hashtags in under 5 seconds.
          </p>

          {/* Quick Stats Pill */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>500-Char Tag Limiter</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>High-CTR Hook Formulas</span>
            </div>
            <div className="flex items-center gap-1.5 bg-zinc-950/80 px-2.5 py-1 rounded-lg border border-zinc-800">
              <Music2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Phonk &amp; Music Optimized</span>
            </div>
          </div>
        </div>

        {/* Workspace Layout: Left Input / Right Output */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className="lg:col-span-5 space-y-6">
            <InputPanel
              onGenerate={handleGenerate}
              isLoading={isLoading}
              defaultChannelName={settings.defaultChannelName}
              defaultVideoType={settings.defaultVideoType}
            />

            {/* Quick Helper / Competitor Teaser */}
            <div className="bg-glass rounded-2xl p-4 border border-zinc-800/80 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-red-400" />
                  Need Title & Keyword Inspiration?
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Explore top phonk artists, 1M+ view title structures, and live tags.
                </p>
              </div>
              <button
                onClick={() => setIsTrendsOpen(true)}
                className="shrink-0 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-bold text-red-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View Bank</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Output Results */}
          <div id="results-section" className="lg:col-span-7 space-y-6">
            {currentResult ? (
              <OutputResults
                result={currentResult}
                onToggleFavorite={handleToggleFavorite}
                onReRoll={() => currentResult && handleGenerate(currentResult.input)}
                isLoading={isLoading}
                onOpenThumbnailStudio={() => setIsThumbnailStudioOpen(true)}
                onOpenAudit={() => setIsAuditOpen(true)}
                onShowToast={showToast}
              />
            ) : (
              <div className="bg-glass-card rounded-2xl p-10 sm:p-14 border border-dashed border-zinc-800 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center text-zinc-500">
                  <Music2 className="w-8 h-8 text-phonk-accent animate-pulse" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="text-base sm:text-lg font-bold text-white">No Metadata Generated Yet</h3>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Fill in the prompt on the left or click one of the quick presets to generate an algorithm-breaking metadata package.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-800/60 bg-zinc-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">PhnkEditz YT Booster</span>
            <span>•</span>
            <span>Empowering Phonk & Music Creators</span>
          </div>
          <p>© 2026 PhnkEditz. Engineered for YouTube Recommendation Algorithms.</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
        onShowToast={showToast}
      />

      <CompetitorTrendsModal
        isOpen={isTrendsOpen}
        onClose={() => setIsTrendsOpen(false)}
        onShowToast={showToast}
      />

      <ViralFormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
      />

      <ViralRadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
        onSelectTrackForRemake={handleSelectTrackForRemake}
        onShowToast={showToast}
      />

      <UploadProtocolModal
        isOpen={isTimingOpen}
        onClose={() => setIsTimingOpen(false)}
      />

      <ThumbnailStudioModal
        isOpen={isThumbnailStudioOpen}
        onClose={() => setIsThumbnailStudioOpen(false)}
        defaultText={currentResult?.thumbnailHooks?.[0] || 'DONT BLINK 💀'}
        channelName={settings.defaultChannelName}
        onShowToast={showToast}
      />

      <AuditGatekeeperModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        auditChecks={currentResult?.auditChecks}
        viralProbability={currentResult?.viralProbability}
        seoScore={currentResult?.seoScore}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={(res) => setCurrentResult(res)}
        onToggleFavorite={handleToggleFavorite}
        onDeleteResult={handleDeleteHistoryItem}
        onClearAll={handleClearAllHistory}
        onShowToast={showToast}
      />

      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  X,
  History,
  Trash2,
  Star,
  Search,
  Copy,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { MetadataResult } from '@/types';
import { GENRE_LABELS } from '@/lib/phonkKnowledge';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: MetadataResult[];
  onSelectResult: (result: MetadataResult) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteResult: (id: string) => void;
  onClearAll: () => void;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onToggleFavorite,
  onDeleteResult,
  onClearAll,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  if (!isOpen) return null;

  const filteredHistory = history.filter((item) => {
    if (onlyFavorites && !item.isFavorite) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchDesc = item.input.description.toLowerCase().includes(q);
    const matchTitle = item.titles.some((t) => t.title.toLowerCase().includes(q));
    const matchTrack = (item.input.trackName || '').toLowerCase().includes(q);
    return matchDesc || matchTitle || matchTrack;
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onShowToast(`Copied ${label} to clipboard!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-zinc-900 border-l border-zinc-800 h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Generation History</h2>
              <p className="text-xs text-zinc-400">
                {history.length} saved {history.length === 1 ? 'generation' : 'generations'}
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

        {/* Search & Filters */}
        <div className="p-4 border-b border-zinc-800/80 space-y-2.5 shrink-0 bg-zinc-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search past titles or keywords..."
              className="w-full pl-9 pr-4 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                onlyFavorites
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>Favorites Only</span>
            </button>

            {history.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredHistory.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <Sparkles className="w-8 h-8 text-zinc-600" />
              <p className="text-sm font-semibold text-zinc-400">No records found</p>
              <p className="text-xs text-zinc-600">
                {searchQuery
                  ? 'Try searching for another keyword'
                  : 'Generate your first video metadata to build your history!'}
              </p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const genreLabel = GENRE_LABELS[item.input.genre]?.label || 'Phonk';
              const topTitle = item.titles[0]?.title || 'Untitled Boost';
              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-zinc-950/80 hover:bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 rounded-xl space-y-2 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {genreLabel}
                        </span>
                        <span className="text-[10px] text-zinc-500">
                          {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-zinc-100 group-hover:text-white line-clamp-2">
                        {topTitle}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className="p-1 text-zinc-500 hover:text-amber-400 transition-colors"
                        title="Toggle Favorite"
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => onDeleteResult(item.id)}
                        className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-1 italic">
                    "{item.input.description}"
                  </p>

                  <div className="pt-1.5 flex items-center justify-between gap-2 border-t border-zinc-900">
                    <button
                      onClick={() => handleCopy(topTitle, 'Title')}
                      className="text-[11px] text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Copy className="w-3 h-3" /> Copy Top Title
                    </button>
                    <button
                      onClick={() => {
                        onSelectResult(item);
                        onClose();
                      }}
                      className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-0.5"
                    >
                      <span>Load Full Suite</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

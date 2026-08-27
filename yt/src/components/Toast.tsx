'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-2xl border transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-zinc-900/95 border-emerald-500/50 text-emerald-400 shadow-emerald-950/40'
              : toast.type === 'error'
              ? 'bg-zinc-900/95 border-red-500/50 text-red-400 shadow-red-950/40'
              : 'bg-zinc-900/95 border-phonk-accent/50 text-zinc-200 shadow-phonk-accent/20'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 shrink-0 text-phonk-accent" />}
            <span className="text-xs sm:text-sm font-medium text-zinc-100 truncate">{toast.text}</span>
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-zinc-400 hover:text-zinc-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Image as ImageIcon,
  Download,
  Upload,
  Sparkles,
  Sliders,
  Palette,
  Type,
  Maximize2,
  Check,
  Flame,
  Zap,
  Trash2,
  Layers,
  Move,
} from 'lucide-react';

interface ThumbnailStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultText?: string;
  channelName?: string;
  onShowToast: (text: string, type?: 'success' | 'error' | 'info') => void;
}

type AspectRatio = '9:16' | '16:9';
type ThemeStyle = 'crimson_drift' | 'tokyo_rain' | 'cyber_purple' | 'emerald_ghost' | 'dark_void';
type TextPosition = 'top' | 'center' | 'bottom';

export const ThumbnailStudioModal: React.FC<ThumbnailStudioModalProps> = ({
  isOpen,
  onClose,
  defaultText = 'DONT BLINK 💀',
  channelName = 'PhnkEditz',
  onShowToast,
}) => {
  const [hookText, setHookText] = useState(defaultText);
  const [subText, setSubText] = useState('4K 60FPS • MAX BASS');
  const [theme, setTheme] = useState<ThemeStyle>('crimson_drift');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [textPosition, setTextPosition] = useState<TextPosition>('center');
  const [glowIntensity, setGlowIntensity] = useState<number>(30);
  const [fontSize, setFontSize] = useState<number>(64);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [imageDarkness, setImageDarkness] = useState<number>(35); // 0 to 80%
  const [imageBlur, setImageBlur] = useState<number>(0);
  const [imageContrast, setImageContrast] = useState<number>(120);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (defaultText) setHookText(defaultText);
  }, [defaultText]);

  // Handle Photo Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        onShowToast('Photo uploaded successfully! Adjust darkness & text.', 'success');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onShowToast('Removed photo, switched to Neon Gradient background.', 'info');
  };

  // Render Thumbnail to HTML5 Canvas
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions: 9:16 = 720x1280, 16:9 = 1280x720
    const width = aspectRatio === '9:16' ? 720 : 1280;
    const height = aspectRatio === '9:16' ? 1280 : 720;
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (uploadedImage) {
      // 1. Draw Uploaded Photo (Cover Mode: fill canvas while keeping aspect ratio)
      ctx.save();
      if (imageBlur > 0 || imageContrast !== 100) {
        ctx.filter = `blur(${imageBlur}px) contrast(${imageContrast}%)`;
      }

      const imgWidth = uploadedImage.width;
      const imgHeight = uploadedImage.height;
      const hRatio = width / imgWidth;
      const vRatio = height / imgHeight;
      const ratio = Math.max(hRatio, vRatio);
      const centerShiftX = (width - imgWidth * ratio) / 2;
      const centerShiftY = (height - imgHeight * ratio) / 2;

      ctx.drawImage(
        uploadedImage,
        0,
        0,
        imgWidth,
        imgHeight,
        centerShiftX,
        centerShiftY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      ctx.restore();

      // 2. Apply Customizable Dark Overlay & Vignette on top of photo
      ctx.fillStyle = `rgba(0, 0, 0, ${imageDarkness / 100})`;
      ctx.fillRect(0, 0, width, height);

      // Radial vignette for edge darkening
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        height / 3.5,
        width / 2,
        height / 2,
        height / 1.1
      );
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    } else {
      // 1. Fallback: Draw Neon Aesthetic Gradients
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.2
      );

      if (theme === 'crimson_drift') {
        bgGrad.addColorStop(0, '#7f1d1d');
        bgGrad.addColorStop(0.5, '#450a0a');
        bgGrad.addColorStop(1, '#050508');
      } else if (theme === 'tokyo_rain') {
        bgGrad.addColorStop(0, '#0e7490');
        bgGrad.addColorStop(0.5, '#164e63');
        bgGrad.addColorStop(1, '#020617');
      } else if (theme === 'cyber_purple') {
        bgGrad.addColorStop(0, '#6b21a8');
        bgGrad.addColorStop(0.5, '#3b0764');
        bgGrad.addColorStop(1, '#090514');
      } else if (theme === 'emerald_ghost') {
        bgGrad.addColorStop(0, '#047857');
        bgGrad.addColorStop(0.5, '#064e3b');
        bgGrad.addColorStop(1, '#02120b');
      } else {
        bgGrad.addColorStop(0, '#27272a');
        bgGrad.addColorStop(0.6, '#18181b');
        bgGrad.addColorStop(1, '#09090b');
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Cyber Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Determine Y Position for Hook Text
    let glowY = height * 0.42;
    if (textPosition === 'top') {
      glowY = aspectRatio === '9:16' ? height * 0.22 : height * 0.25;
    } else if (textPosition === 'bottom') {
      glowY = aspectRatio === '9:16' ? height * 0.68 : height * 0.65;
    } else {
      glowY = aspectRatio === '9:16' ? height * 0.42 : height * 0.45;
    }

    // Accent Glow & Text Shadow
    ctx.shadowColor =
      theme === 'crimson_drift'
        ? '#ff1a4a'
        : theme === 'tokyo_rain'
        ? '#06b6d4'
        : theme === 'cyber_purple'
        ? '#a855f7'
        : theme === 'emerald_ghost'
        ? '#10b981'
        : '#ffffff';
    ctx.shadowBlur = glowIntensity * 1.5;

    // Main Hook Text (Bold Impact Font)
    ctx.font = `900 ${fontSize}px -apple-system, BlinkMacSystemFont, "Impact", "Arial Black", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Black Stroke Outline for 100% Readability on any background
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = Math.max(8, fontSize * 0.14);
    ctx.strokeText(hookText.toUpperCase(), width / 2, glowY);

    // Text Fill
    ctx.fillStyle = '#ffffff';
    ctx.fillText(hookText.toUpperCase(), width / 2, glowY);

    // Subtext Tagline / Badge
    if (subText.trim()) {
      ctx.shadowBlur = 10;
      ctx.font = '800 24px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeText(subText.toUpperCase(), width / 2, glowY + fontSize * 0.8 + 20);
      ctx.fillText(subText.toUpperCase(), width / 2, glowY + fontSize * 0.8 + 20);
    }

    // Channel Tag / Watermark at bottom
    ctx.shadowBlur = 0;
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(`@${channelName || 'PhnkEditz'}`, width / 2, height - 35);
  }, [
    isOpen,
    hookText,
    subText,
    theme,
    aspectRatio,
    textPosition,
    glowIntensity,
    fontSize,
    uploadedImage,
    imageDarkness,
    imageBlur,
    imageContrast,
    channelName,
  ]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `phnkeditz-thumbnail-${aspectRatio === '9:16' ? 'shorts' : 'long'}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onShowToast(`Downloaded ${aspectRatio} Thumbnail PNG!`, 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Top Glow Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-600/30 to-purple-600/30 border border-red-500/40 text-red-400 shadow-md">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Thumbnail Studio (Photo Upload & Custom Text Exporter)
              </h2>
              <p className="text-xs text-zinc-400">
                Apni photo upload karein ya aesthetic background chun kar high-contrast 4K PNG thumbnail banayein
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

        {/* Modal Body */}
        <div className="py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto pr-1 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-4 text-xs">
            {/* 1. PHOTO UPLOAD SECTION */}
            <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="font-black uppercase tracking-wider text-white flex items-center gap-1.5 text-xs">
                  <Upload className="w-3.5 h-3.5 text-red-400" />
                  1. Apni Photo Upload Karein:
                </label>
                {uploadedImage && (
                  <button
                    onClick={handleRemoveImage}
                    className="flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-bold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="thumbnail-image-upload"
              />

              <label
                htmlFor="thumbnail-image-upload"
                className={`w-full py-3 px-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  uploadedImage
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300'
                    : 'border-zinc-700 hover:border-red-500/50 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-300'
                }`}
              >
                {uploadedImage ? (
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-xs">Photo Loaded! Click to Change</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-red-400" />
                    <span className="font-bold text-xs">Click / Drag Photo (Car, Anime, Gym, Drift)</span>
                    <span className="text-[10px] text-zinc-500">JPG, PNG, WEBP (Any aspect ratio auto-fits)</span>
                  </>
                )}
              </label>

              {/* Photo Darkness & Contrast Sliders (When Image Uploaded) */}
              {uploadedImage && (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">
                      Dark Overlay ({imageDarkness}%):
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={imageDarkness}
                      onChange={(e) => setImageDarkness(Number(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-zinc-400 block mb-1">
                      Contrast ({imageContrast}%):
                    </label>
                    <input
                      type="range"
                      min={80}
                      max={180}
                      value={imageContrast}
                      onChange={(e) => setImageContrast(Number(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Aspect Ratio Switch */}
            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-zinc-400 block text-[11px]">
                Thumbnail Size / Format:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    aspectRatio === '9:16'
                      ? 'bg-red-600/20 border-red-500 text-white shadow-md'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  ⚡ 9:16 Shorts Cover (720x1280)
                </button>
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    aspectRatio === '16:9'
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-md'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  🎬 16:9 Long Video (1280x720)
                </button>
              </div>
            </div>

            {/* Main Hook Text Input */}
            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-zinc-300 block text-[11px]">
                Main Hook Text:
              </label>
              <input
                type="text"
                value={hookText}
                onChange={(e) => setHookText(e.target.value)}
                placeholder="e.g. DONT BLINK 💀, MAX BASS 🔊"
                className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 uppercase"
              />
            </div>

            {/* Subtext Badge Input */}
            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-zinc-400 block text-[11px]">
                Subtitle / Tagline:
              </label>
              <input
                type="text"
                value={subText}
                onChange={(e) => setSubText(e.target.value)}
                placeholder="e.g. 4K 60FPS • WEAR HEADPHONES"
                className="w-full px-3.5 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Text Position Selector */}
            <div className="space-y-1.5">
              <label className="font-bold uppercase tracking-wider text-zinc-400 block text-[11px]">
                Text Position On Photo:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'top', label: '⬆️ Top Center' },
                  { id: 'center', label: '⏺️ Center Focus' },
                  { id: 'bottom', label: '⬇️ Lower Third' },
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setTextPosition(pos.id as TextPosition)}
                    className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold transition-all ${
                      textPosition === pos.id
                        ? 'bg-zinc-800 border-white text-white shadow-sm'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Neon Glow & Font Size Sliders */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Font Size ({fontSize}px):
                </label>
                <input
                  type="range"
                  min={36}
                  max={92}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Neon Glow ({glowIntensity}):
                </label>
                <input
                  type="range"
                  min={0}
                  max={60}
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(Number(e.target.value))}
                  className="w-full accent-red-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Canvas Live Preview Column */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-3 bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              Live Canvas Render ({aspectRatio} {uploadedImage ? '• Custom Photo Mode' : '• Gradient Mode'})
            </span>

            <div className="max-h-[380px] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl border border-zinc-800">
              <canvas
                ref={canvasRef}
                className="max-h-[360px] max-w-full object-contain rounded-lg shadow-inner"
              />
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-phonk-accent to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all transform active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download High-Res Thumbnail PNG</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-zinc-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};

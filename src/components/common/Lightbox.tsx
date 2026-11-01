import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  captions?: string[];
  title?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  captions = [],
  title,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];
  const currentCaption = captions[currentIndex] || title || '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-[100] bg-espresso-900/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-6 animate-in fade-in duration-200"
    >
      {/* Top Bar: Counter & Close Button */}
      <div className="flex items-center justify-between text-cream-100 max-w-6xl mx-auto w-full z-10">
        <div className="flex items-center gap-3">
          <span className="font-sans text-sm font-medium bg-espresso-800/80 px-3.5 py-1.5 rounded-full border border-espresso-700/80">
            {currentIndex + 1} / {images.length}
          </span>
          {title && (
            <span className="hidden sm:inline font-serif text-sm text-cream-200/90 font-medium">
              {title}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image lightbox"
          className="w-10 h-10 rounded-full bg-espresso-800 hover:bg-espresso-700 text-cream-100 flex items-center justify-center transition-colors border border-espresso-700"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4">
        {/* Previous Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 md:left-4 z-20 w-11 h-11 rounded-full bg-espresso-800/80 hover:bg-espresso-700 text-cream-100 flex items-center justify-center backdrop-blur-sm border border-espresso-700 transition-all hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Center Display Image */}
        <div className="relative max-h-[75vh] max-w-full flex flex-col items-center justify-center">
          <img
            src={currentImage}
            alt={currentCaption || `Photo ${currentIndex + 1}`}
            className="max-h-[72vh] max-w-full object-contain rounded-xl shadow-2xl transition-opacity duration-200"
          />
          {currentCaption && (
            <p className="mt-3 text-cream-200/90 text-sm md:text-base font-serif text-center max-w-lg px-4">
              {currentCaption}
            </p>
          )}
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 md:right-4 z-20 w-11 h-11 rounded-full bg-espresso-800/80 hover:bg-espresso-700 text-cream-100 flex items-center justify-center backdrop-blur-sm border border-espresso-700 transition-all hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Hint */}
      <div className="text-center text-xs text-cream-300/60 pb-2">
        <span className="hidden sm:inline">Use Arrow keys (← →) or Escape to close</span>
      </div>
    </div>
  );
};

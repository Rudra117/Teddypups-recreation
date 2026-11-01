import React from 'react';
import { siteConfig } from '../../data/siteConfig';

export const StickyBottomBar: React.FC = () => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Safe Demo Mode: WhatsApp link (+971 54 167 6733). Live message dispatch disabled for safety.`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Safe Demo Mode: Phone dialer (${siteConfig.phone}). Live calls disabled for safety.`);
  };

  return (
    <aside
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-espresso-800 bg-cream-50 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden shadow-lg"
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <button
          onClick={handleWhatsApp}
          className="flex-1 h-12 rounded-full bg-whatsapp text-white font-semibold flex items-center justify-center gap-2 text-sm shadow-sm active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.07 16.3C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
          </svg>
          <span>WhatsApp us</span>
        </button>
        <button
          onClick={handleCall}
          className="h-12 px-6 rounded-full border-2 border-espresso-800 bg-white text-espresso-800 font-semibold text-sm active:scale-95 transition-transform hover:bg-cream-100"
        >
          Call
        </button>
      </div>
    </aside>
  );
};

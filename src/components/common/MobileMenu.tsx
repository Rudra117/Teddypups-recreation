import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Safe Demo Mode: WhatsApp link (+971 54 167 6733). Direct messaging disabled in demonstration mode.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-honey text-espresso-900 flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <span className="font-handwriting text-2xl text-espresso-800">
          where to, friend?
        </span>
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-full bg-espresso-800 px-6 font-semibold text-cream-100 hover:bg-espresso-900 transition-colors shadow-sm"
        >
          Close
        </button>
      </div>

      {/* Big plush nav links */}
      <nav aria-label="Mobile" className="my-auto py-6">
        <ul className="space-y-2">
          {siteConfig.navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={onClose}
                  className={`font-serif block py-2 text-[clamp(2.2rem,9vw,3.2rem)] font-bold tracking-tight transition-colors flex items-center justify-between ${
                    isActive ? 'text-espresso-950 underline decoration-terracotta underline-offset-8' : 'text-espresso-800 hover:text-espresso-950'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <svg viewBox="0 0 64 64" className="w-8 h-8 text-terracotta" aria-hidden="true" fill="currentColor">
                      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom info */}
      <div className="space-y-3 pt-4 border-t border-espresso-800/20">
        <button
          onClick={handleWhatsApp}
          className="w-full h-12 rounded-full bg-whatsapp text-white font-semibold flex items-center justify-center shadow-md hover:bg-whatsapp-dark transition-colors"
        >
          WhatsApp us
        </button>
        <p className="text-center text-sm font-medium text-espresso-700">
          Downtown Dubai showroom • {siteConfig.phone}
        </p>
      </div>
    </div>
  );
};

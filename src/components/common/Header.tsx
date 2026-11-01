import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { MobileMenu } from './MobileMenu';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Safe Demo Mode: WhatsApp link is set to safe demonstration mode (+971 54 167 6733). In production this connects directly to TeddyPups UAE customer support.');
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-cream-50/95 backdrop-blur-md transition-shadow duration-300">
        <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="TeddyPups U.A.E. Home">
            <img
              src="/brand/logo.png"
              alt="TeddyPups U.A.E."
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-espresso-800 object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="font-serif font-bold text-2xl md:text-3xl text-espresso-900 tracking-tight">
              TeddyPups
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main">
            <ul className="flex items-center gap-1 xl:gap-2">
              {siteConfig.navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`relative px-3.5 py-2 rounded-full text-[0.95rem] font-semibold transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'text-espresso-900 bg-cream-200/80 shadow-sm'
                          : 'text-espresso-700 hover:text-espresso-900 hover:bg-cream-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <svg
                          viewBox="0 0 64 64"
                          className="w-3.5 h-3.5 text-terracotta inline-block"
                          aria-hidden="true"
                          fill="currentColor"
                        >
                          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsAppClick}
              className="hidden sm:inline-flex items-center justify-center h-11 px-5 rounded-full bg-whatsapp text-white font-semibold text-sm shadow-sm hover:bg-whatsapp-dark transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              WhatsApp us
            </button>

            {/* Mobile Menu Button with Paw Icon */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden inline-flex h-10 items-center gap-2 rounded-full border-2 border-espresso-800 bg-cream-50 px-4 text-sm font-semibold text-espresso-800 hover:bg-cream-200 transition-colors"
              aria-label="Open navigation menu"
            >
              <svg viewBox="0 0 64 64" className="w-4 h-4 text-espresso-800" aria-hidden="true" fill="currentColor">
                <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Scalloped Lower Hem SVG Pattern */}
        <div className="w-full overflow-hidden leading-none -mb-[1px]">
          <svg
            aria-hidden="true"
            className="w-full h-3.5 block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 14"
          >
            <defs>
              <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
                <path d="M0 0H44V2A22 11 0 0 1 0 2Z" fill="#FAF6F0" />
                <path d="M0 2A22 11 0 0 0 44 2" stroke="#2D1E18" strokeWidth="1.6" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="14" fill="url(#tp-hem)" />
          </svg>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

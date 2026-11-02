import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { MascotTeddy } from './MascotTeddy';

export const Footer: React.FC = () => {
  const handleSafeClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    alert(`Safe Demo Mode: Link "${label}" is disabled in demo mode to protect real contact channels.`);
  };

  return (
    <footer id="site-footer" className="relative bg-espresso-800 text-cream-100 pt-16 pb-28 md:pb-16 mt-20 overflow-hidden">
      {/* Curved Hill SVG Transition */}
      <div className="absolute inset-x-0 -top-1 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-12 md:h-16 text-espresso-800 fill-current block"
          aria-hidden="true"
        >
          <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
        </svg>
      </div>

      {/* Night Sky: Moon & Twinkling Stars */}
      <div className="absolute inset-x-0 top-0 h-64 pointer-events-none opacity-80" aria-hidden="true">
        {/* Crescent Moon */}
        <div className="absolute right-12 md:right-24 top-14 w-10 h-10 rounded-full shadow-[inset_6px_2px_0_0_#F8D489] opacity-90" />

        {/* 4-Point Sparkle Stars */}
        {[
          { left: '6%', top: '25%', size: 13, delay: '0s' },
          { left: '16%', top: '45%', size: 9, delay: '0.4s' },
          { left: '26%', top: '20%', size: 10, delay: '0.8s' },
          { left: '38%', top: '35%', size: 8, delay: '1.2s' },
          { left: '50%', top: '18%', size: 12, delay: '1.6s' },
          { left: '62%', top: '40%', size: 8, delay: '2.0s' },
          { left: '74%', top: '22%', size: 11, delay: '2.4s' },
          { left: '88%', top: '38%', size: 9, delay: '2.8s' },
        ].map((star, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            className="absolute text-honey animate-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: '3s',
            }}
          >
            <path
              d="M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      {/* Footer Content */}
      <div className="relative max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          {/* Brand & Story */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-honey-light tracking-tight">
              Home, at last.
            </h2>
            <p className="text-cream-200/80 text-base md:text-lg leading-relaxed max-w-md">
              TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering ethical care, verified health certificates, and worldwide delivery.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <div className="pup-stop-placeholder">
                <MascotTeddy variant="sitting" className="w-24 h-20" />
              </div>
              <div className="text-xs text-cream-300 font-handwriting text-xl">
                every puppy is family ♥
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-serif text-lg font-bold text-honey-light">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-cream-200">
              <li>
                <Link to="/puppies" className="hover:text-honey transition-colors">
                  Available puppies
                </Link>
              </li>
              <li>
                <Link to="/gone-home" className="hover:text-honey transition-colors">
                  Gone home
                </Link>
              </li>
              <li>
                <Link to="/happy-families" className="hover:text-honey transition-colors">
                  Happy families (64 moments)
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-honey transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-honey transition-colors">
                  Questions & answers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-honey transition-colors">
                  Visit our showroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="font-serif text-lg font-bold text-honey-light">
              Say hello
            </h3>
            <div className="space-y-2 text-sm text-cream-200 leading-relaxed">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-honey-light">Showroom:</span>
                <span>{siteConfig.showroom}</span>
              </p>
              <p>
                <a
                  href="#"
                  onClick={(e) => handleSafeClick(e, siteConfig.phone)}
                  className="hover:text-honey underline decoration-honey/40 transition-colors"
                >
                  {siteConfig.phone} (WhatsApp & Call)
                </a>
              </p>
              <p>
                <a
                  href="#"
                  onClick={(e) => handleSafeClick(e, siteConfig.email)}
                  className="hover:text-honey underline decoration-honey/40 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-xs text-cream-300 pt-1">
                Showroom visits by appointment • 7 days a week
              </p>
              <div className="flex gap-3 pt-2 text-xs font-semibold">
                <a
                  href="#"
                  onClick={(e) => handleSafeClick(e, 'Instagram')}
                  className="px-3 py-1.5 rounded-full bg-espresso-700 hover:bg-espresso-600 text-cream-100 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  onClick={(e) => handleSafeClick(e, 'TikTok')}
                  className="px-3 py-1.5 rounded-full bg-espresso-700 hover:bg-espresso-600 text-cream-100 transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 pt-6 border-t border-espresso-700/60 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300 gap-3">
          <p>© {new Date().getFullYear()} TeddyPups U.A.E. • Website Recreation</p>
          <p className="font-handwriting text-base text-honey-light">
            Safe Demonstration Build • No real transactions or external calls
          </p>
        </div>
      </div>
    </footer>
  );
};

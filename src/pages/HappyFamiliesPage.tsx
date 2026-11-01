import React, { useState } from 'react';
import { happyFamilyMoments } from '../data/happyFamilies';
import { Lightbox } from '../components/common/Lightbox';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { Heart } from 'lucide-react';

const TAPE_COLORS = ['#F6D79A', '#CFE5F6', '#F9CDBF', '#D2E8D4', '#E5D4F6'];

export const HappyFamiliesPage: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = happyFamilyMoments.map((m) => m.image);
  const captions = happyFamilyMoments.map((m) => m.caption);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-28 pb-28 bg-milk min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* ==============================================================
            Header Section: Scrapbook Wall of Happy Endings
           ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 pb-12 border-b-2 border-cocoa/10">
          <div className="lg:col-span-7">
            <span className="font-scrawl text-2xl text-toffee block mb-2">
              our wall of happy endings
            </span>
            <h1 className="font-plush text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cocoa tracking-tight leading-[1.05] inline-flex flex-wrap items-center gap-4">
              <span>Happy families</span>
              <svg viewBox="0 0 48 44" className="w-10 h-10 sm:w-14 sm:h-14 text-toffee fill-none stroke-current stroke-[3] stroke-linecap-round stroke-linejoin-round inline-block animate-pulse" aria-hidden="true">
                <path d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z" />
              </svg>
            </h1>
            <p className="text-cocoa/80 text-lg sm:text-xl mt-4 max-w-2xl leading-relaxed font-sans">
              Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
            </p>
            <p className="font-scrawl text-2xl text-toffee mt-4">
              64 moments and counting
            </p>
          </div>

          {/* Testimonial taped paper note */}
          <figure className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-9 border-2 border-cocoa/15 shadow-paper relative">
            {/* Washi Tape Strip across top center */}
            <div
              className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-6 rounded-sm opacity-90 shadow-xs z-10 border border-black/10"
              style={{ backgroundColor: '#CFE5F6' }}
            />

            <blockquote className="font-plush italic text-cocoa text-base sm:text-lg leading-relaxed pt-2">
              “TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.”
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-between text-sm text-cocoa/75 font-sans">
              <span className="font-bold text-cocoa font-plush">— Sarah M.</span>
              <span className="font-scrawl text-toffee">Dubai, UAE</span>
            </figcaption>

            {/* Little mascot sticker */}
            <div className="absolute -bottom-4 -right-2 pointer-events-none">
              <MascotTeddy variant="sitting" className="w-16 h-14" />
            </div>
          </figure>
        </div>

        {/* ==============================================================
            Scrapbook Photo Wall Grid with Varied Layout Density
           ============================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8">
          {happyFamilyMoments.map((moment, idx) => {
            const isFeatured = idx === 0 || idx === 7 || idx === 18 || idx === 31;
            const tapeColor = moment.tape || TAPE_COLORS[idx % TAPE_COLORS.length];

            return (
              <button
                key={moment.id}
                type="button"
                onClick={() => openLightbox(idx)}
                aria-label={`Open photo ${moment.index} of 64`}
                className={`group text-left relative bg-white p-3 sm:p-4 pb-6 sm:pb-7 rounded-2xl border-2 border-cocoa/15 shadow-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 focus:outline-none ${
                  isFeatured ? 'col-span-2 row-span-2' : 'col-span-1'
                }`}
                style={{
                  transform: `rotate(${moment.tilt})`,
                }}
              >
                {/* Authentic Washi Tape Accent */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-5 rounded-xs opacity-85 shadow-xs z-10 border border-black/10"
                  style={{
                    backgroundColor: tapeColor,
                    transform: `rotate(${idx % 2 === 0 ? '-3deg' : '3deg'})`,
                  }}
                />

                {/* Photo Area */}
                <div
                  className={`w-full rounded-xl overflow-hidden bg-cream-200 border border-cocoa/10 relative ${
                    isFeatured ? 'aspect-[4/4.5]' : 'aspect-[4/5]'
                  }`}
                >
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Subtle stamp accent on featured polaroids */}
                  {isFeatured && (
                    <span className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-white/95 border border-cocoa text-[0.65rem] font-bold font-scrawl text-toffee shadow-xs">
                      family favorite ♥
                    </span>
                  )}
                </div>

                {/* Polaroid Footer Handwritten Caption */}
                <div className="mt-3 px-1 text-center flex items-center justify-center gap-1.5">
                  <span className="font-scrawl text-xs sm:text-sm text-cocoa block truncate">
                    Moment #{moment.index}
                  </span>
                  <Heart className="w-3 h-3 text-toffee fill-toffee inline-block shrink-0" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        captions={captions}
        title="Happy Families Scrapbook"
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
        onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
      />
    </div>
  );
};

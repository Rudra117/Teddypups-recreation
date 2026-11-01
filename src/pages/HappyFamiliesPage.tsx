import React, { useState } from 'react';
import { happyFamilyMoments } from '../data/happyFamilies';
import { Lightbox } from '../components/common/Lightbox';
import { MascotTeddy } from '../components/common/MascotTeddy';

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
    <div className="pt-28 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-7">
            <span className="font-handwriting text-xl text-terracotta">
              64 moments and counting
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-900 tracking-tight mt-1">
              Happy families &amp; puppies
            </h1>
            <p className="text-espresso-700 text-base md:text-lg mt-4 max-w-xl leading-relaxed">
              Every photograph is a real family in Dubai and around the world who welcomed a Teddy Pup into their hearts. Click any photo to flip through our family scrapbook.
            </p>
          </div>

          {/* Testimonial speech bubble note */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border-2 border-espresso-800/15 shadow-paper relative">
            <div className="flex items-start gap-4">
              <span className="text-4xl text-honey select-none font-serif leading-none">“</span>
              <div>
                <p className="font-serif italic text-espresso-800 text-sm sm:text-base leading-relaxed">
                  We could not be happier with our sweet teacup pup. From the very first video consultation to picking him up in Downtown Dubai, the TeddyPups team made the journey pure magic.
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-espresso-500 font-sans">
                  <span className="font-semibold text-espresso-800">— The Al Mansoori Family</span>
                  <span>Downtown Dubai</span>
                </div>
              </div>
            </div>
            {/* Little paw sticker */}
            <div className="absolute -bottom-3 -right-2">
              <MascotTeddy variant="sitting" className="w-16 h-12" />
            </div>
          </div>
        </div>

        {/* Scrapbook Photo Wall Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {happyFamilyMoments.map((moment, idx) => (
            <button
              key={moment.id}
              type="button"
              onClick={() => openLightbox(idx)}
              aria-label={`Open photo ${moment.index} of 64`}
              className="group text-left relative bg-white p-3 sm:p-3.5 pb-6 sm:pb-8 rounded-2xl border border-espresso-800/15 shadow-polaroid hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:z-20 focus:outline-none"
              style={{
                transform: `rotate(${moment.tilt})`,
              }}
            >
              {/* Washi Tape Accent */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 rounded-sm opacity-80 shadow-xs z-10"
                style={{ backgroundColor: moment.tape || '#f6d79a' }}
              />

              {/* Photo Area */}
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-cream-200 border border-espresso-800/10">
                <img
                  src={moment.image}
                  alt={moment.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Polaroid Footer Caption */}
              <div className="mt-2.5 px-1 text-center">
                <span className="font-handwriting text-xs sm:text-sm text-espresso-700 block truncate">
                  Moment #{moment.index}
                </span>
              </div>
            </button>
          ))}
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

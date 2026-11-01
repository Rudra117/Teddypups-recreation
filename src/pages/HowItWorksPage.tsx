import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { Home, Plane, ShieldCheck, Heart, Award } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<'local' | 'imported'>('local');

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Safe Demo Mode: WhatsApp link (+971 54 167 6733). Direct messaging disabled in demonstration mode.');
  };

  return (
    <div className="pt-28 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="font-handwriting text-xl text-terracotta">adoption roadmap</span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-900 tracking-tight mt-1">
              How it works
            </h1>
            <p className="text-espresso-700 text-base md:text-lg mt-3 leading-relaxed">
              Whether you are meeting your puppy in our Downtown Dubai showroom or importing a rare Korean teacup line, we ensure an ethical, transparent, and loving journey.
            </p>
          </div>

          {/* Quick anchor pills */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <a href="#two-ways" className="px-4 py-2 rounded-full bg-white border border-espresso-800/15 hover:bg-cream-200 text-espresso-800 transition-colors">
              Two ways home
            </a>
            <a href="#promise" className="px-4 py-2 rounded-full bg-white border border-espresso-800/15 hover:bg-cream-200 text-espresso-800 transition-colors">
              Puppy promise
            </a>
            <a href="#delivery" className="px-4 py-2 rounded-full bg-white border border-espresso-800/15 hover:bg-cream-200 text-espresso-800 transition-colors">
              Delivery &amp; collection
            </a>
            <a href="#why-us" className="px-4 py-2 rounded-full bg-white border border-espresso-800/15 hover:bg-cream-200 text-espresso-800 transition-colors">
              Why choose us
            </a>
          </div>
        </div>

        {/* 1. TWO WAYS HOME SELECTOR */}
        <div id="two-ways" className="pt-8 pb-16">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900">
              Two ways home
            </h2>
            <p className="text-espresso-600 text-sm mt-1">
              Select your preferred path below to see the four-step journey
            </p>

            {/* Segmented Selector */}
            <div className="inline-flex p-1.5 rounded-full bg-cream-200 border-2 border-espresso-800/20 mt-6 shadow-xs">
              <button
                type="button"
                onClick={() => setSelectedJourney('local')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedJourney === 'local'
                    ? 'bg-espresso-800 text-cream-100 shadow-sm'
                    : 'text-espresso-700 hover:text-espresso-900'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>In Dubai (Local Showroom)</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedJourney('imported')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  selectedJourney === 'imported'
                    ? 'bg-espresso-800 text-cream-100 shadow-sm'
                    : 'text-espresso-700 hover:text-espresso-900'
                }`}
              >
                <Plane className="w-4 h-4" />
                <span>Imported (Order Upon Request)</span>
              </button>
            </div>
          </div>

          {/* Journey Display: Local vs. Imported */}
          {selectedJourney === 'local' ? (
            /* LOCAL JOURNEY */
            <div className="bg-white rounded-[36px] border-2 border-espresso-800/15 p-8 sm:p-12 shadow-paper animate-in fade-in duration-300">
              <div className="max-w-2xl mb-10">
                <span className="font-handwriting text-lg text-terracotta">meet in person</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mt-1">
                  Meet your puppy in person
                </h3>
                <p className="text-espresso-700 text-sm sm:text-base mt-2 leading-relaxed">
                  Visit our Downtown Dubai showroom to interact with puppies that are already in the UAE, fully vet-checked and ready to join their new families today.
                </p>
              </div>

              {/* 4 Step Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-espresso-800 text-white font-bold flex items-center justify-center text-sm">
                    1
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Explore our puppies</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Browse our online catalogue or contact us on WhatsApp to view available puppies in Dubai.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-espresso-800 text-white font-bold flex items-center justify-center text-sm">
                    2
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Choose your puppy</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Pick your favourite pup based on size, breed, colour, and personality preferences.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-espresso-800 text-white font-bold flex items-center justify-center text-sm">
                    3
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Meet before you choose</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Book an appointment to visit our Downtown Dubai showroom and bond with your puppy.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-espresso-800 text-white font-bold flex items-center justify-center text-sm">
                    4
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Pick-up or delivery</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Take your puppy home the same day or have our team safely deliver to your doorstep in Dubai.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* IMPORTED JOURNEY */
            <div className="bg-white rounded-[36px] border-2 border-espresso-800/15 p-8 sm:p-12 shadow-paper animate-in fade-in duration-300">
              <div className="max-w-2xl mb-8">
                <span className="font-handwriting text-lg text-terracotta">order upon request</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mt-1">
                  Imported Korean teacups &amp; rare breeds
                </h3>
                <p className="text-espresso-700 text-sm sm:text-base mt-2 leading-relaxed">
                  We handle the entire journey from reputable breeders in South Korea to your loving home in Dubai, with strict veterinary checks at every border.
                </p>
              </div>

              {/* Flight path illustration arc */}
              <div className="bg-cream-100/70 rounded-2xl p-6 border border-espresso-800/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-espresso-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-terracotta" />
                  <span>Seoul, South Korea</span>
                </div>
                <div className="flex-1 w-full flex items-center justify-center px-4">
                  <div className="w-full border-t-2 border-dashed border-espresso-800/30 relative flex items-center justify-center">
                    <Plane className="w-5 h-5 text-terracotta -top-2.5 absolute bg-cream-100 px-0.5" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-whatsapp" />
                  <span>Downtown Dubai, UAE</span>
                </div>
              </div>

              {/* 4 Step Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-terracotta text-white font-bold flex items-center justify-center text-sm">
                    1
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Reserve your puppy</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Select your rare teacup line and reserve through our Order Upon Request service.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-terracotta text-white font-bold flex items-center justify-center text-sm">
                    2
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Personalized consultation</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Receive ongoing video check-ins, health certificates, and travel schedule updates.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-terracotta text-white font-bold flex items-center justify-center text-sm">
                    3
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Import and arrival</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    We manage all paperwork, ministry clearances, and safe climate-controlled flights.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3">
                  <span className="w-9 h-9 rounded-full bg-terracotta text-white font-bold flex items-center justify-center text-sm">
                    4
                  </span>
                  <h4 className="font-serif font-bold text-lg text-espresso-900">Welcome home</h4>
                  <p className="text-xs text-espresso-600 leading-relaxed">
                    Your puppy arrives safely in Dubai for showroom collection or white-glove home delivery.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. OUR PREMIUM PUPPY PROMISE */}
        <div id="promise" className="py-16">
          <div className="bg-white rounded-[36px] border-2 border-espresso-800/15 p-8 sm:p-12 shadow-paper">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-handwriting text-xl text-terracotta">ethical standard</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 mt-1">
                Our premium puppy promise
              </h2>
              <p className="text-espresso-600 text-sm sm:text-base mt-2">
                We believe that bringing a puppy into your life must be rooted in transparency, animal welfare, and certified health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3 p-6 rounded-2xl bg-cream-50 border border-espresso-800/10">
                <ShieldCheck className="w-8 h-8 text-terracotta" />
                <h3 className="font-serif font-bold text-xl text-espresso-900">Veterinary Certified</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  Every puppy is examined thoroughly by certified veterinarians and accompanied by an official health card and vaccine passport.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-cream-50 border border-espresso-800/10">
                <Heart className="w-8 h-8 text-terracotta" />
                <h3 className="font-serif font-bold text-xl text-espresso-900">Ethical Breeders Only</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  We partner only with verified, licensed, humane home breeders in Korea and Europe who prioritize parent health and socialization.
                </p>
              </div>

              <div className="space-y-3 p-6 rounded-2xl bg-cream-50 border border-espresso-800/10">
                <Award className="w-8 h-8 text-terracotta" />
                <h3 className="font-serif font-bold text-xl text-espresso-900">1-Year Health Guarantee</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  All puppies come with our comprehensive 1-year genetic health guarantee and 24/7 post-adoption care support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DELIVERY & COLLECTION */}
        <div id="delivery" className="py-16">
          <div className="bg-espresso-800 text-cream-100 rounded-[36px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="font-handwriting text-xl text-honey-light">safe journey</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1 mb-4">
                Delivery &amp; collection
              </h2>
              <p className="text-cream-200/90 text-base leading-relaxed mb-8">
                We make bringing your puppy home seamless and secure, whether you visit our showroom or request doorstep delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2 p-5 rounded-2xl bg-espresso-700/60 border border-espresso-600">
                  <h4 className="font-serif font-bold text-honey-light text-base">Take home the same day</h4>
                  <p className="text-xs text-cream-200/80 leading-relaxed">
                    Local puppies can be collected directly from our Downtown Dubai showroom after meeting and completing adoption paperwork.
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-espresso-700/60 border border-espresso-600">
                  <h4 className="font-serif font-bold text-honey-light text-base">Delivery within Dubai</h4>
                  <p className="text-xs text-cream-200/80 leading-relaxed">
                    Our dedicated team provides direct, stress-free transport in comfortable air-conditioned vehicles straight to your home.
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-espresso-700/60 border border-espresso-600">
                  <h4 className="font-serif font-bold text-honey-light text-base">Safe international cargo</h4>
                  <p className="text-xs text-cream-200/80 leading-relaxed">
                    Imported puppies travel with approved pet cargo carriers adhering to strict IATA live animal regulations.
                  </p>
                </div>

                <div className="space-y-2 p-5 rounded-2xl bg-espresso-700/60 border border-espresso-600">
                  <h4 className="font-serif font-bold text-honey-light text-base">Worldwide delivery</h4>
                  <p className="text-xs text-cream-200/80 leading-relaxed">
                    We also support international adoptions to loving families worldwide through trusted cargo flight logistics.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block absolute -right-6 -bottom-6 opacity-80">
              <MascotTeddy variant="sitting" className="w-48 h-36" />
            </div>
          </div>
        </div>

        {/* 4. WHY CHOOSE US */}
        <div id="why-us" className="py-16 text-center">
          <div className="max-w-2xl mx-auto mb-10">
            <span className="font-handwriting text-xl text-terracotta">the TeddyPups difference</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-espresso-900 mt-1">
              Unique and high quality puppies
            </h2>
            <p className="text-espresso-600 text-sm sm:text-base mt-2">
              Every pup is raised with gentle training, socialization, and premium nutrition.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/puppies"
              className="h-12 px-8 rounded-full bg-espresso-800 hover:bg-espresso-900 text-white font-semibold text-sm shadow-sm transition-all"
            >
              See available puppies
            </Link>
            <button
              onClick={handleWhatsApp}
              className="h-12 px-8 rounded-full border-2 border-espresso-800 bg-white hover:bg-cream-100 text-espresso-800 font-semibold text-sm transition-all"
            >
              Ask us on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

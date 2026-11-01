import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { Home, Plane, ShieldCheck, Heart, Award, CheckCircle2, Sparkles } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [selectedJourney, setSelectedJourney] = useState<'local' | 'imported'>('local');

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Safe Demo Mode: WhatsApp link (+971 54 167 6733). Direct messaging disabled in demonstration mode.');
  };

  return (
    <div className="pt-28 pb-28 bg-milk min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* ==============================================================
            Prominent Two-Column Page Header (Priority 5)
           ============================================================== */}
        <header className="grid gap-8 md:grid-cols-12 md:items-end pt-4 pb-12 border-b-2 border-cocoa/10">
          <div className="md:col-span-7">
            <span className="font-scrawl text-2xl text-toffee block mb-2">
              adoption roadmap
            </span>
            <h1 className="font-plush text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-cocoa tracking-tight leading-[1.05]">
              How it works
            </h1>
          </div>
          <div className="md:col-span-5 md:pb-2">
            <p className="text-cocoa/80 text-lg sm:text-xl leading-relaxed font-sans">
              Whether you choose to visit us locally in Downtown Dubai or order a rare Korean teacup line from overseas, TeddyPups is here to make your adoption journey unforgettable.
            </p>
          </div>
        </header>

        {/* Quick Chapter Navigation Chips */}
        <nav aria-label="On this page" className="mt-8 mb-16 flex flex-wrap gap-3">
          <a
            href="#two-ways"
            className="h-11 sm:h-12 border-2 border-cocoa bg-white px-5 rounded-full hover:bg-honey-soft text-cocoa font-semibold text-sm transition-all shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span className="font-plush text-toffee font-bold text-base">1</span>
            <span>Two ways home</span>
          </a>
          <a
            href="#promise"
            className="h-11 sm:h-12 border-2 border-cocoa bg-white px-5 rounded-full hover:bg-honey-soft text-cocoa font-semibold text-sm transition-all shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span className="font-plush text-toffee font-bold text-base">2</span>
            <span>Our premium puppy promise</span>
          </a>
          <a
            href="#delivery"
            className="h-11 sm:h-12 border-2 border-cocoa bg-white px-5 rounded-full hover:bg-honey-soft text-cocoa font-semibold text-sm transition-all shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span className="font-plush text-toffee font-bold text-base">3</span>
            <span>Delivery &amp; collection</span>
          </a>
          <a
            href="#why-us"
            className="h-11 sm:h-12 border-2 border-cocoa bg-white px-5 rounded-full hover:bg-honey-soft text-cocoa font-semibold text-sm transition-all shadow-xs flex items-center gap-2 hover:-translate-y-0.5"
          >
            <span className="font-plush text-toffee font-bold text-base">4</span>
            <span>Why choose us</span>
          </a>
        </nav>

        {/* ==============================================================
            1. TWO WAYS HOME SELECTOR
           ============================================================== */}
        <section id="two-ways" className="pt-4 pb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <p className="font-scrawl text-2xl text-toffee">choose your way</p>
              <h2 className="font-plush text-3xl sm:text-5xl font-bold text-cocoa mt-1">
                Two ways home
              </h2>
            </div>

            {/* Segmented Switch with Mascot Accent */}
            <div className="flex items-center gap-4">
              <div className="inline-flex p-1.5 rounded-full bg-cream-200 border-2 border-cocoa/20 shadow-inner">
                <button
                  type="button"
                  onClick={() => setSelectedJourney('local')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedJourney === 'local'
                      ? 'bg-cocoa text-milk shadow-sm'
                      : 'text-cocoa/75 hover:text-cocoa'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>In Dubai</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedJourney('imported')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                    selectedJourney === 'imported'
                      ? 'bg-cocoa text-milk shadow-sm'
                      : 'text-cocoa/75 hover:text-cocoa'
                  }`}
                >
                  <Plane className="w-4 h-4" />
                  <span>Imported</span>
                </button>
              </div>

              <div className="hidden lg:block">
                <MascotTeddy variant="sitting" className="w-16 h-14" />
              </div>
            </div>
          </div>

          {/* Journey Display: Local vs. Imported */}
          {selectedJourney === 'local' ? (
            /* LOCAL JOURNEY */
            <div className="bg-white rounded-[36px] border-2 border-cocoa/15 p-8 sm:p-12 shadow-paper animate-in fade-in duration-300">
              <div className="max-w-2xl mb-10">
                <span className="font-scrawl text-xl text-toffee">meet in person</span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-1">
                  Meet your puppy in Downtown Dubai
                </h3>
                <p className="text-cocoa/80 text-base sm:text-lg mt-2 leading-relaxed">
                  Visit our Downtown Dubai showroom to interact with puppies that are already in the UAE, fully vet-checked, microchipped, and ready to join their new families today.
                </p>
              </div>

              {/* 4 Step Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-cocoa text-milk font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    1
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Explore our puppies</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Browse our online catalogue or contact our team on WhatsApp to review current puppies in Dubai.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-cocoa text-milk font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    2
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Choose your puppy</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Pick your favourite pup based on size, breed, temperament, and personal family lifestyle.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-cocoa text-milk font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    3
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Meet before you decide</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Book a private appointment in our Downtown Dubai showroom to bond with your puppy in a calm room.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-cocoa text-milk font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    4
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Same-day home take-home</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Take your puppy home immediately or have our team coordinate white-glove doorstep delivery anywhere in UAE.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* IMPORTED JOURNEY */
            <div className="bg-white rounded-[36px] border-2 border-cocoa/15 p-8 sm:p-12 shadow-paper animate-in fade-in duration-300">
              <div className="max-w-2xl mb-8">
                <span className="font-scrawl text-xl text-toffee">order upon request</span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-1">
                  Imported Korean teacups &amp; rare lines
                </h3>
                <p className="text-cocoa/80 text-base sm:text-lg mt-2 leading-relaxed">
                  We handle the entire journey from reputable certified breeders in South Korea to your loving home in Dubai, with strict veterinary checks at every stage.
                </p>
              </div>

              {/* Flight path illustration arc */}
              <div className="bg-[#FAF4EB] rounded-2xl p-6 border-2 border-cocoa/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-cocoa shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-toffee" />
                  <span className="text-sm font-plush font-bold">Seoul, South Korea (ICN)</span>
                </div>
                <div className="flex-1 w-full flex items-center justify-center px-4">
                  <div className="w-full border-t-2 border-dashed border-cocoa/30 relative flex items-center justify-center">
                    <Plane className="w-5 h-5 text-toffee -top-2.5 absolute bg-[#FAF4EB] px-0.5" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-whatsapp" />
                  <span className="text-sm font-plush font-bold">Downtown Dubai, UAE (DXB)</span>
                </div>
              </div>

              {/* 4 Step Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-toffee text-white font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    1
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Reserve your puppy</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Select your rare teacup line and reserve through our certified bespoke adoption service.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-toffee text-white font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    2
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Personal consultation</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Receive nursery video check-ins, veterinary health cards, and flight transit confirmations.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-toffee text-white font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    3
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Import &amp; arrival</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    We manage all paperwork, UAE ministry clearances, and climate-controlled flight transit.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 space-y-3 hover:border-toffee transition-colors shadow-xs">
                  <span className="w-10 h-10 rounded-full bg-toffee text-white font-bold flex items-center justify-center text-sm shadow-sm font-plush">
                    4
                  </span>
                  <h4 className="font-plush font-bold text-lg text-cocoa">Welcome home</h4>
                  <p className="text-sm text-cocoa/75 leading-relaxed">
                    Your puppy arrives safely in Dubai for showroom collection or white-glove home delivery.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ==============================================================
            2. OUR PREMIUM PUPPY PROMISE
           ============================================================== */}
        <section id="promise" className="py-16">
          <div className="bg-white rounded-[36px] border-2 border-cocoa/15 p-8 sm:p-12 shadow-paper">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-scrawl text-2xl text-toffee">ethical standard</span>
              <h2 className="font-plush text-3xl sm:text-5xl font-bold text-cocoa mt-1">
                Our premium puppy promise
              </h2>
              <p className="text-cocoa/75 text-base sm:text-lg mt-3 leading-relaxed">
                We believe that welcoming a puppy into your life must be rooted in complete transparency, animal welfare, and certified veterinary assurance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4 p-8 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 shadow-xs hover:border-toffee transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-7 h-7 text-toffee" />
                </div>
                <h3 className="font-plush font-bold text-xl text-cocoa">Veterinary Certified</h3>
                <p className="text-sm text-cocoa/75 leading-relaxed">
                  Every puppy is examined thoroughly by certified veterinarians and accompanied by an official health card and vaccine passport.
                </p>
              </div>

              <div className="space-y-4 p-8 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 shadow-xs hover:border-toffee transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center shadow-inner">
                  <Heart className="w-7 h-7 text-toffee" />
                </div>
                <h3 className="font-plush font-bold text-xl text-cocoa">Ethical Breeders Only</h3>
                <p className="text-sm text-cocoa/75 leading-relaxed">
                  We partner only with verified, licensed, humane home breeders in Korea and Europe who prioritize parent health and gentle socialization.
                </p>
              </div>

              <div className="space-y-4 p-8 rounded-3xl bg-[#FFFDF8] border-2 border-cocoa/10 shadow-xs hover:border-toffee transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center shadow-inner">
                  <Award className="w-7 h-7 text-toffee" />
                </div>
                <h3 className="font-plush font-bold text-xl text-cocoa">1-Year Health Guarantee</h3>
                <p className="text-sm text-cocoa/75 leading-relaxed">
                  All puppies come with our comprehensive 1-year genetic health guarantee and 24/7 post-adoption care guidance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==============================================================
            3. DELIVERY & COLLECTION
           ============================================================== */}
        <section id="delivery" className="py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-scrawl text-2xl text-toffee">safe transit</span>
            <h2 className="font-plush text-3xl sm:text-5xl font-bold text-cocoa mt-1">
              Delivery &amp; collection
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Showroom Option */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-cocoa/15 shadow-paper flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center mb-6 shadow-inner">
                  <Home className="w-7 h-7 text-cocoa" />
                </div>
                <span className="font-scrawl text-lg text-toffee">downtown dubai</span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-1 mb-4">
                  Showroom Collection
                </h3>
                <p className="text-cocoa/80 leading-relaxed text-base mb-6">
                  Experience a warm, relaxed private appointment in our Downtown Dubai showroom. Spend quality time interacting with your puppy before completing your adoption.
                </p>
                <ul className="space-y-2.5 text-sm text-cocoa font-medium mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Private viewing suites with complete hygiene</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Starter pack, toys &amp; premium food included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Complete documentation and microchip transfer</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="w-full h-12 rounded-full border-2 border-cocoa bg-[#FFFDF8] hover:bg-cocoa hover:text-white text-cocoa font-semibold text-sm flex items-center justify-center transition-colors shadow-sm"
              >
                Book a showroom visit
              </Link>
            </div>

            {/* Delivery Option */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-cocoa/15 shadow-paper flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center mb-6 shadow-inner">
                  <Plane className="w-7 h-7 text-cocoa" />
                </div>
                <span className="font-scrawl text-lg text-toffee">white-glove transit</span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-1 mb-4">
                  Doorstep Delivery
                </h3>
                <p className="text-cocoa/80 leading-relaxed text-base mb-6">
                  Prefer home delivery? Our trained pet handlers safely transport your puppy in a temperature-controlled vehicle directly to your residence anywhere in Dubai and across the UAE.
                </p>
                <ul className="space-y-2.5 text-sm text-cocoa font-medium mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Climate-controlled, stress-free vehicle transport</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Handled with loving care by trained puppy specialists</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Direct doorstep handover with complete initial guidance</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full h-12 rounded-full bg-cocoa hover:bg-cocoa-light text-milk font-semibold text-sm flex items-center justify-center transition-colors shadow-sm"
              >
                Inquire about UAE delivery
              </button>
            </div>
          </div>
        </section>

        {/* ==============================================================
            4. WHY CHOOSE US
           ============================================================== */}
        <section id="why-us" className="py-16">
          <div className="bg-white rounded-[36px] border-2 border-cocoa/15 p-8 sm:p-12 shadow-paper">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="font-scrawl text-2xl text-toffee">confidence &amp; care</span>
              <h2 className="font-plush text-3xl sm:text-5xl font-bold text-cocoa mt-1">
                Why choose TeddyPups
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3">
                <span className="font-scrawl text-2xl text-toffee block">01</span>
                <h4 className="font-plush font-bold text-lg text-cocoa">Real Photos Always</h4>
                <p className="text-sm text-cocoa/75 leading-relaxed">
                  We photograph and film each puppy individually. You will always see the exact pup that will join your family.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3">
                <span className="font-scrawl text-2xl text-toffee block">02</span>
                <h4 className="font-plush font-bold text-lg text-cocoa">Lifelong Support</h4>
                <p className="text-sm text-cocoa/75 leading-relaxed">
                  Our team remains available 24/7 on WhatsApp for feeding advice, training tips, and veterinary questions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3">
                <span className="font-scrawl text-2xl text-toffee block">03</span>
                <h4 className="font-plush font-bold text-lg text-cocoa">Ethical Sourcing</h4>
                <p className="text-sm text-cocoa/75 leading-relaxed">
                  Zero tolerance for puppy mills. We partner exclusively with certified, compassionate family breeders.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/puppies"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cocoa text-milk font-semibold text-base hover:bg-cocoa-light transition-all shadow-md transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-honey" />
                <span>Browse available puppies</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { availablePuppies } from '../data/puppies';
import { faqItems } from '../data/faq';
import { happyFamilyMoments } from '../data/happyFamilies';
import { HeroLineup } from '../components/home/HeroLineup';
import { MeetThePupsDoors } from '../components/home/MeetThePupsDoors';
import { ChevronDown, CheckCircle2, MessageCircle, Heart, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const previewFamilies = happyFamilyMoments.slice(0, 8);
  const previewFaqs = faqItems.slice(0, 4);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Safe Demo Mode: WhatsApp link (+971 54 167 6733). Live message dispatch disabled for safety.`);
  };

  return (
    <div className="pt-20">
      {/* ==============================================================
          1. HERO SECTION (Priority 3 & 5)
          - Background: #FFFDF8 ivory gradient into #FFF1D8
          - Headline: Fraunces plush retro serif
          - Handwriting: Shantell Sans "every puppy is family ♥"
          - Arched 7-seat puppy lineup with center peeking mascot
          - Quilted diamond waffle skirt with scalloped rim
         ============================================================== */}
      <section className="relative bg-gradient-to-b from-[#FFFDF8] via-[#FFFDF8] to-[#FFF1D8] pt-8 md:pt-12 pb-0 overflow-hidden">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
            <span className="font-scrawl text-xl md:text-2xl text-toffee inline-flex items-center gap-2">
              <Heart className="w-4 h-4 fill-toffee text-toffee inline-block animate-pulse" />
              <span>every puppy is family ♥</span>
              <Heart className="w-4 h-4 fill-toffee text-toffee inline-block animate-pulse" />
            </span>

            <h1 className="font-plush text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cocoa tracking-tight leading-[1.1]">
              Premium teacup puppies in Dubai
            </h1>

            <p className="text-cocoa/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
              Teddy bear and miniature puppies raised with love. Meet local puppies in our Downtown Dubai showroom or welcome a rare Korean teacup breed imported with care.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/puppies"
                className="h-12 md:h-14 px-8 rounded-full bg-cocoa text-milk font-semibold text-base hover:bg-cocoa-light transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>View available puppies</span>
                <span>→</span>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="h-12 md:h-14 px-8 rounded-full border-2 border-cocoa bg-white/80 backdrop-blur-sm text-cocoa font-semibold text-base hover:bg-cream-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-whatsapp" />
                <span>WhatsApp enquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Priority 3: 7 Arched Window Seats Hero Lineup with rotating puppies */}
        <div className="mt-8 md:mt-12">
          <HeroLineup puppies={availablePuppies} />
        </div>
      </section>

      {/* ==============================================================
          2. MEET THE PUPS SECTION (Priority 4 & 5)
          - Background: #FBF3DF warm golden
          - 3D Swinging wooden doors with perspective
          - Wooden floor platform & standing mascot
          - Arched "Meet them all" destination card
         ============================================================== */}
      <MeetThePupsDoors puppies={availablePuppies} />

      {/* ==============================================================
          3. TWO WAYS TO MEET YOUR PUPPY (Priority 5 & 7)
          - Background: #FAEED2 warm honey
          - Showroom Window with striped awning & wooden signpost
          - Airplane flight path arc Korea -> Dubai
         ============================================================== */}
      <section className="py-20 md:py-24 bg-[#FAEED2] border-t border-cocoa/10 relative overflow-hidden">
        {/* Subtle decorative background paw accents */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="tp-quilt-pattern w-full h-full" />
        </div>

        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-scrawl text-2xl text-toffee">choose your journey</span>
            <h2 className="font-plush text-3xl md:text-5xl font-bold text-cocoa mt-1">
              Two ways to meet your puppy
            </h2>
            <p className="text-cocoa/75 text-base md:text-lg mt-2">
              Whether you want to cuddle today in Downtown Dubai or commission a rare Korean teacup puppy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Way 1: Puppies in Dubai (Showroom with Striped Awning & Signpost) */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-cocoa/15 shadow-paper flex flex-col justify-between relative overflow-hidden group hover:shadow-card transition-all">
              {/* Decorative Awning Illustration at top edge */}
              <div className="h-6 -mx-10 -mt-10 mb-6 bg-gradient-to-r from-toffee via-terracotta to-toffee flex">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-full ${i % 2 === 0 ? 'bg-[#C2622B]' : 'bg-[#FFF8EE]'}`}
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center shadow-inner">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  {/* Priority 7: Cute Wooden Signpost Badge */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8A5238] text-cream-100 text-xs font-semibold shadow-sm border border-[#5A3420]">
                    <span>📍</span>
                    <span>Downtown Dubai</span>
                  </span>
                </div>

                <span className="font-scrawl text-lg text-toffee">locally available</span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-1 mb-4">
                  Puppies in Dubai
                </h3>
                <p className="text-cocoa/80 leading-relaxed text-base mb-6">
                  Visit our Downtown Dubai showroom and meet our locally available teacup and miniature puppies in person. Bond together in a comfortable, relaxed environment before making your decision. Same-day take-home or Dubai home delivery available.
                </p>

                <ul className="space-y-2.5 text-sm text-cocoa font-medium mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Downtown Dubai private viewing suites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Health checks, vaccines &amp; passport ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Same-day collection or white-glove UAE delivery</span>
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

            {/* Way 2: Imported for You (Flight Path Arc Korea -> Dubai) */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-cocoa/15 shadow-paper flex flex-col justify-between relative overflow-hidden group hover:shadow-card transition-all">
              {/* Decorative Airplane Flight Path Header */}
              <div className="h-6 -mx-10 -mt-10 mb-6 bg-gradient-to-r from-[#2A170E] via-[#4A2A1A] to-[#2A170E] flex items-center justify-center text-xs text-honey-light font-scrawl tracking-wider">
                Seoul (ICN) ✈ Dubai (DXB) White-Glove Transit
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-honey-soft text-cocoa flex items-center justify-center shadow-inner">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" />
                    </svg>
                  </div>
                  {/* Priority 7: Flight Path Arc Tag */}
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1F4E5B] text-cream-100 text-xs font-semibold shadow-sm border border-[#14343D]">
                    <span>🇰🇷</span>
                    <span>Direct Korean Import</span>
                  </span>
                </div>

                <span className="font-scrawl text-lg text-toffee">bespoke commission</span>
                <h3 className="font-plush text-2xl sm:text-3xl font-bold text-cocoa mt-1 mb-4">
                  Imported for you
                </h3>
                <p className="text-cocoa/80 leading-relaxed text-base mb-6">
                  Looking for a rare teacup line? We partner directly with ethical certified breeders in South Korea. Our veterinary team oversees health screenings, pedigree verification, cabin transit documentation, and safe handover in Dubai.
                </p>

                <ul className="space-y-2.5 text-sm text-cocoa font-medium mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Real-time nursery videos &amp; veterinary verification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Complete UAE Ministry import permits &amp; customs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp shrink-0" />
                    <span>Accompanied climate-controlled flight transit</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/how-it-works"
                className="w-full h-12 rounded-full bg-cocoa hover:bg-cocoa-light text-milk font-semibold text-sm flex items-center justify-center transition-colors shadow-sm"
              >
                Learn how import works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          4. CHAT CONSULTATION MOCKUP (Priority 5: #ECC880 Golden Amber)
         ============================================================== */}
      <section className="py-20 md:py-24 bg-[#ECC880] border-t border-b border-cocoa/15 relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="tp-quilt-pattern w-full h-full" />
        </div>

        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-scrawl text-2xl text-cocoa">guided adoption</span>
              <h2 className="font-plush text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa leading-tight">
                Your puppy journey, guided step by step
              </h2>
              <p className="text-cocoa/85 text-base md:text-lg leading-relaxed">
                Finding the right puppy should be a joyous, worry-free experience. Our puppy specialists consult with you on breed temperament, care requirements, and send personal video updates so you feel completely confident before welcoming your pup home.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-cocoa/10 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-toffee text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-plush font-bold text-cocoa">Choose your breed &amp; size</h4>
                    <p className="text-sm text-cocoa/75">Explore Maltipoos, Pomeranians, Poodles, Cavapoos, and Korean teacups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-cocoa/10 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-toffee text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-plush font-bold text-cocoa">Get real-time photos &amp; videos</h4>
                    <p className="text-sm text-cocoa/75">Receive nursery video clips, veterinary certificates, and pedigree details on WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/90 backdrop-blur-sm border border-cocoa/10 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-toffee text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-plush font-bold text-cocoa">Secure &amp; safe delivery</h4>
                    <p className="text-sm text-cocoa/75">Pick up from our Downtown Dubai showroom or enjoy safe doorstep delivery anywhere in UAE.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Chat Interface Phone Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-[36px] border-4 border-cocoa shadow-2xl overflow-hidden p-6 relative">
                {/* Chat Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-cream-300">
                  <div className="w-11 h-11 rounded-full bg-toffee text-white font-plush font-bold flex items-center justify-center shadow-sm">
                    TP
                  </div>
                  <div>
                    <span className="font-plush font-bold text-cocoa block leading-tight text-base">
                      TeddyPups Concierge
                    </span>
                    <span className="text-xs text-whatsapp flex items-center gap-1.5 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse" /> Online • Downtown Dubai
                    </span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="py-6 space-y-4">
                  <div className="bg-[#FFFDF8] p-3.5 rounded-2xl rounded-tl-sm text-sm text-cocoa max-w-[85%] border border-cream-300 shadow-sm">
                    Hello! Welcome to TeddyPups UAE. Are you looking for a local puppy in Dubai or interested in an imported Korean teacup?
                  </div>

                  <div className="bg-cocoa text-cream-100 p-3.5 rounded-2xl rounded-tr-sm text-sm ml-auto max-w-[85%] shadow-sm">
                    Hi! I&apos;m looking for a gentle apricot Maltipoo or teacup Poodle girl. Could you share videos?
                  </div>

                  <div className="bg-[#FFFDF8] p-3.5 rounded-2xl rounded-tl-sm text-sm text-cocoa max-w-[85%] border border-cream-300 shadow-sm">
                    We have sweet Max and our Korean Teacup Poodle ready! Both are fully vaccinated, microchipped, and certified healthy.
                  </div>

                  <div className="bg-honey-soft/50 p-3 rounded-xl border border-cocoa/15 flex items-center gap-3">
                    <img
                      src={availablePuppies[0]?.image || '/brand/logo.png'}
                      alt="Sample Pup"
                      className="w-14 h-14 rounded-lg object-cover border border-cocoa/20"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-cocoa font-plush">{availablePuppies[0]?.name || 'Max'}</p>
                      <p className="text-cocoa/75">{availablePuppies[0]?.breed}</p>
                      <p className="text-toffee font-semibold mt-0.5">Health Certificate Verified ✓</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full h-12 rounded-full bg-whatsapp hover:bg-[#20b857] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat with our team on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          5. PUPPY PASSPORT & TRUST SECTION
         ============================================================== */}
      <section className="py-20 md:py-24 bg-milk border-t border-cocoa/10">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white rounded-[36px] border-2 border-cocoa/15 p-8 sm:p-12 shadow-paper">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-scrawl text-2xl text-toffee">health assurance</span>
              <h2 className="font-plush text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa mt-1">
                Why families trust TeddyPups
              </h2>
              <p className="text-cocoa/75 text-base md:text-lg mt-3">
                Every puppy is placed with certified health records, ethical breeding verification, and comprehensive lifetime support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3 text-center hover:border-toffee transition-colors">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-cocoa mx-auto flex items-center justify-center font-bold text-xl shadow-inner">
                  ✓
                </div>
                <h3 className="font-plush font-bold text-lg text-cocoa">Vaccinated &amp; Dewormed</h3>
                <p className="text-xs text-cocoa/75 leading-relaxed">
                  Up-to-date vaccinations and comprehensive preventative care administered by licensed veterinarians.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3 text-center hover:border-toffee transition-colors">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-cocoa mx-auto flex items-center justify-center font-bold text-xl shadow-inner">
                  🏷
                </div>
                <h3 className="font-plush font-bold text-lg text-cocoa">Microchipped</h3>
                <p className="text-xs text-cocoa/75 leading-relaxed">
                  ISO-compliant international microchip registered for permanent safety and identification.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3 text-center hover:border-toffee transition-colors">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-cocoa mx-auto flex items-center justify-center font-bold text-xl shadow-inner">
                  📄
                </div>
                <h3 className="font-plush font-bold text-lg text-cocoa">Health Certificate</h3>
                <p className="text-xs text-cocoa/75 leading-relaxed">
                  Official veterinary health certificate and travel documentation provided with every adoption.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFDF8] border border-cocoa/10 space-y-3 text-center hover:border-toffee transition-colors">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-cocoa mx-auto flex items-center justify-center font-bold text-xl shadow-inner">
                  🛡
                </div>
                <h3 className="font-plush font-bold text-lg text-cocoa">Health Guarantee</h3>
                <p className="text-xs text-cocoa/75 leading-relaxed">
                  Comprehensive genetic health guarantee for complete confidence and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
          6. HAPPY FAMILIES PREVIEW (Priority 5: #5C341E Rich Cocoa Brown)
         ============================================================== */}
      <section className="py-20 md:py-24 bg-[#5C341E] text-cream-100 border-t border-cocoa/20 relative overflow-hidden">
        {/* Subtle diamond quilted background */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="tp-quilt-pattern w-full h-full" />
        </div>

        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-scrawl text-2xl text-honey-light">real adoption moments</span>
              <h2 className="font-plush text-3xl md:text-5xl font-bold text-white mt-1">
                Happy families &amp; puppies
              </h2>
              <p className="text-cream-200/80 text-base md:text-lg mt-2">
                Over 64 moments and counting of puppies joining their forever families in Dubai and across the UAE.
              </p>
            </div>

            <Link
              to="/happy-families"
              className="text-sm font-semibold text-honey-light hover:text-white underline decoration-honey underline-offset-4 flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View all 64 moments</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {previewFamilies.map((moment) => (
              <div
                key={moment.id}
                className="bg-white p-3 rounded-2xl border border-black/20 shadow-md transform hover:-translate-y-1.5 transition-all"
                style={{ transform: `rotate(${moment.tilt})` }}
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-cream-200">
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="font-scrawl text-xs text-cocoa mt-2 text-center truncate">
                  Family Moment #{moment.index}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
          7. FAQ PREVIEW
         ============================================================== */}
      <section className="py-20 md:py-24 bg-milk border-t border-cocoa/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <span className="font-scrawl text-2xl text-toffee">questions, answered</span>
            <h2 className="font-plush text-3xl md:text-4xl font-bold text-cocoa mt-1">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {previewFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border-2 border-cocoa/10 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left font-plush font-bold text-cocoa flex items-center justify-between gap-4 hover:text-toffee transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-cocoa/50 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-cocoa/80 leading-relaxed border-t border-cream-200 font-sans">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/faq"
              className="text-sm font-semibold text-cocoa hover:text-toffee underline decoration-toffee underline-offset-4"
            >
              See all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================================================
          8. COZY PORCH DOGHOUSE BANNER (Priority 5 & 7: #21140E Dark Espresso)
          - Glowing lantern #F6C86E
          - Doghouse with arched entrance
          - Cozy mascot pup & action buttons
         ============================================================== */}
      <section className="py-20 md:py-28 bg-[#21140E] text-cream-100 relative overflow-hidden border-t-4 border-[#140C08]">
        {/* Glowing lantern illumination radial gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#F6C86E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10 space-y-6">
          {/* Lantern and Doghouse Icon */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#F6C86E]/20 border border-[#F6C86E]/50 flex items-center justify-center text-2xl shadow-lg">
              🏮
            </div>
            <span className="font-scrawl text-2xl text-honey-light">
              your new best friend is waiting
            </span>
          </div>

          <h2 className="font-plush text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to meet your new best friend?
          </h2>
          <p className="text-cream-200/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Visit our Downtown Dubai showroom to spend time together, or ask us about our imported Korean teacup puppies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/puppies"
              className="h-12 md:h-14 px-8 rounded-full bg-honey text-cocoa font-bold text-base hover:bg-honey-light transition-all shadow-md transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cocoa" />
              <span>View available puppies</span>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="h-12 md:h-14 px-8 rounded-full border-2 border-cream-200 text-cream-100 font-semibold text-base hover:bg-cream-100 hover:text-cocoa transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-whatsapp" />
              <span>WhatsApp enquiry</span>
            </button>
          </div>

          {/* Porch Planks & Doghouse Mascot */}
          <div className="pt-10 flex justify-center">
            <div className="relative inline-block px-12 py-4 bg-[#2A170E] rounded-2xl border-2 border-[#3F2215] shadow-inner">
              <div className="flex items-center gap-4">
                {/* Doghouse Silhouette */}
                <svg className="w-16 h-16 text-[#ECC880]" viewBox="0 0 64 64" fill="currentColor">
                  {/* Roof */}
                  <polygon points="32,4 4,28 60,28" fill="#8A5238" />
                  <polygon points="32,8 9,28 55,28" fill="#B8644A" />
                  {/* Body */}
                  <rect x="10" y="28" width="44" height="32" fill="#D4893F" rx="2" />
                  {/* Arched Door */}
                  <path d="M22 60 V40 A10 10 0 0 1 42 40 V60 Z" fill="#21140E" />
                  {/* Nameplate */}
                  <rect x="24" y="32" width="16" height="5" rx="1.5" fill="#FFF8EE" stroke="#21140E" strokeWidth="0.8" />
                </svg>

                <div className="text-left">
                  <p className="font-plush font-bold text-white text-base">Teddy&apos;s Home</p>
                  <p className="font-scrawl text-xs text-honey-light">Downtown Dubai Nursery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

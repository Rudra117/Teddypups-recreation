import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { availablePuppies } from '../data/puppies';
import { faqItems } from '../data/faq';
import { happyFamilyMoments } from '../data/happyFamilies';
import { PuppyCard } from '../components/puppy/PuppyCard';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { Plane, Home, ChevronDown, CheckCircle2, MessageCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'korean'>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const displayedPuppies =
    activeTab === 'korean'
      ? availablePuppies.filter((p) => p.origin === 'Korean Teacup')
      : availablePuppies.slice(0, 6);

  const previewFamilies = happyFamilyMoments.slice(0, 8);
  const previewFaqs = faqItems.slice(0, 4);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Safe Demo Mode: WhatsApp link (+971 54 167 6733). Live message dispatch disabled for safety.`);
  };

  return (
    <div className="pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-cream-100 overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <span className="font-handwriting text-xl md:text-2xl text-terracotta inline-block tracking-wide">
              every puppy is family ♥
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-espresso-900 tracking-tight leading-[1.1]">
              Premium teacup puppies in Dubai
            </h1>

            <p className="text-espresso-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-sans">
              Teddy bear and miniature puppies raised with love. Meet local puppies in our Downtown Dubai showroom or welcome a rare Korean teacup breed imported with care.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/puppies"
                className="h-12 md:h-14 px-8 rounded-full bg-espresso-800 text-cream-100 font-semibold text-base hover:bg-espresso-900 transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>View available puppies</span>
                <span>→</span>
              </Link>
              <button
                onClick={handleWhatsApp}
                className="h-12 md:h-14 px-8 rounded-full border-2 border-espresso-800 bg-white/80 backdrop-blur-sm text-espresso-900 font-semibold text-base hover:bg-cream-200 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-whatsapp" />
                <span>WhatsApp enquiry</span>
              </button>
            </div>
          </div>

          {/* Hero Illustrated Feature Gallery */}
          <div className="mt-14 relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {availablePuppies.slice(0, 6).map((pup) => (
                <Link
                  key={pup.id}
                  to={`/puppies/${pup.slug}`}
                  className="group relative aspect-[3/4] rounded-[24px] overflow-hidden border-2 border-espresso-800/15 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <img
                    src={pup.image}
                    alt={pup.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-espresso-900/80 via-espresso-900/40 to-transparent text-white">
                    <p className="font-serif font-bold text-sm truncate">{pup.name}</p>
                    <p className="text-[0.7rem] text-cream-200 truncate">{pup.breed}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mascot Accent */}
            <div className="hidden lg:block absolute -right-6 -bottom-8 pointer-events-none">
              <MascotTeddy variant="running" className="w-32 h-24" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MEET THE PUPS SECTION */}
      <section className="py-20 bg-cream-50 border-t border-espresso-800/10">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-handwriting text-xl text-terracotta">
                from Teddy&apos;s nursery
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-espresso-900 mt-1">
                Meet the pups
              </h2>
              <p className="text-espresso-600 text-base md:text-lg mt-2 max-w-xl">
                Every puppy is vaccinated, microchipped, vet checked, and accompanied by a health guarantee.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 bg-cream-200/80 p-1.5 rounded-full border border-espresso-800/10 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'all'
                    ? 'bg-espresso-800 text-cream-100 shadow-sm'
                    : 'text-espresso-700 hover:text-espresso-900'
                }`}
              >
                All available ({availablePuppies.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('korean')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'korean'
                    ? 'bg-espresso-800 text-cream-100 shadow-sm'
                    : 'text-espresso-700 hover:text-espresso-900'
                }`}
              >
                Korean Teacups
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPuppies.map((puppy) => (
              <PuppyCard key={puppy.id} puppy={puppy} />
            ))}
          </div>

          {/* View Catalogue Link */}
          <div className="text-center mt-14">
            <Link
              to="/puppies"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cream-200 hover:bg-cream-300 text-espresso-900 font-semibold text-base border border-espresso-800/15 transition-all shadow-sm"
            >
              <span>Explore all {availablePuppies.length} available puppies</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. TWO WAYS TO MEET YOUR PUPPY */}
      <section className="py-20 bg-cream-100 border-t border-espresso-800/10">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-handwriting text-xl text-terracotta">choose your journey</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-espresso-900 mt-1">
              Two ways to meet your puppy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Way 1: Puppies in Dubai */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-espresso-800/15 shadow-paper flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-honey flex items-center justify-center mb-6">
                  <Home className="w-7 h-7 text-espresso-800" />
                </div>
                <span className="font-handwriting text-lg text-terracotta">locally available</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mt-1 mb-4">
                  Puppies in Dubai
                </h3>
                <p className="text-espresso-700 leading-relaxed text-base mb-6">
                  Visit our Downtown Dubai showroom and meet our locally available teacup and miniature puppies in person. Bond together in a comfortable, relaxed environment before making your decision. Same-day take-home or Dubai home delivery available.
                </p>
                <ul className="space-y-2 text-sm text-espresso-800 font-medium mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                    <span>Meet in Downtown Dubai showroom</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                    <span>Health checks and certificates ready</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                    <span>Same-day collection or home delivery</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/contact"
                className="w-full h-12 rounded-full border-2 border-espresso-800 bg-cream-50 hover:bg-espresso-800 hover:text-white text-espresso-900 font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Book a showroom visit
              </Link>
            </div>

            {/* Way 2: Imported for You */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-espresso-800/15 shadow-paper flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-honey-soft text-honey flex items-center justify-center mb-6">
                  <Plane className="w-7 h-7 text-espresso-800" />
                </div>
                <span className="font-handwriting text-lg text-terracotta">order upon request</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso-900 mt-1 mb-4">
                  Imported for you
                </h3>
                <p className="text-espresso-700 leading-relaxed text-base mb-6">
                  Looking for a rare teacup line? We source directly from certified, reputable breeders in South Korea and across Europe. Our team coordinates travel logistics, health clearances, veterinary paperwork, and white-glove arrival in Dubai.
                </p>
                <ul className="space-y-2 text-sm text-espresso-800 font-medium mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                    <span>Photos, videos & health records shared before travel</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                    <span>Full travel documentation & import clearance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-whatsapp" />
                    <span>Arrival directly in Dubai with ongoing care</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/how-it-works"
                className="w-full h-12 rounded-full bg-espresso-800 hover:bg-espresso-900 text-white font-semibold text-sm flex items-center justify-center transition-colors"
              >
                Learn how import works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHAT CONSULTATION MOCKUP */}
      <section className="py-20 bg-cream-50 border-t border-espresso-800/10">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-handwriting text-xl text-terracotta">guided adoption</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 leading-tight">
                Your puppy journey, guided step by step
              </h2>
              <p className="text-espresso-700 text-base md:text-lg leading-relaxed">
                Finding the right puppy should be a joyous, worry-free experience. Our puppy specialists consult with you on breed temperament, care requirements, and send personal video updates so you feel completely confident before welcoming your pup home.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-espresso-800/10">
                  <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-espresso-900">Choose your breed</h4>
                    <p className="text-sm text-espresso-600">Explore Maltipoos, Pomeranians, Poodles, Cavapoos, and Korean teacups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-espresso-800/10">
                  <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-espresso-900">Get photos & videos</h4>
                    <p className="text-sm text-espresso-600">Receive real-time video clips, veterinary certificates, and pedigree details on WhatsApp.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-espresso-800/10">
                  <div className="w-10 h-10 rounded-full bg-terracotta text-white flex items-center justify-center font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-espresso-900">Secure & safe delivery</h4>
                    <p className="text-sm text-espresso-600">Pick up from our Downtown Dubai showroom or enjoy safe doorstep delivery anywhere in UAE.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Chat Interface Phone Frame */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-[36px] border-4 border-espresso-800 shadow-2xl overflow-hidden p-6 relative">
                {/* Chat Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-cream-300">
                  <div className="w-10 h-10 rounded-full bg-terracotta text-white font-serif font-bold flex items-center justify-center">
                    TP
                  </div>
                  <div>
                    <span className="font-serif font-bold text-espresso-900 block leading-tight">
                      TeddyPups Adoption Concierge
                    </span>
                    <span className="text-xs text-whatsapp flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-whatsapp" /> Online now
                    </span>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="py-6 space-y-4">
                  <div className="bg-cream-100 p-3.5 rounded-2xl rounded-tl-sm text-sm text-espresso-800 max-w-[85%] border border-cream-300">
                    Hello! Welcome to TeddyPups UAE. Are you looking for a local puppy in Dubai or interested in an imported Korean teacup?
                  </div>

                  <div className="bg-espresso-800 text-cream-100 p-3.5 rounded-2xl rounded-tr-sm text-sm ml-auto max-w-[85%]">
                    Hi! I&apos;m looking for a gentle apricot Maltipoo or teacup Poodle girl. Could you share photos?
                  </div>

                  <div className="bg-cream-100 p-3.5 rounded-2xl rounded-tl-sm text-sm text-espresso-800 max-w-[85%] border border-cream-300">
                    We have sweet Max and our Korean Teacup Poodle ready! Both are fully vaccinated, microchipped, and certified healthy.
                  </div>

                  <div className="bg-cream-200/60 p-3 rounded-xl border border-espresso-800/10 flex items-center gap-3">
                    <img
                      src={availablePuppies[0]?.image || '/brand/logo.png'}
                      alt="Sample Pup"
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="text-xs">
                      <p className="font-bold text-espresso-900">{availablePuppies[0]?.name || 'Max'}</p>
                      <p className="text-espresso-600">{availablePuppies[0]?.breed}</p>
                      <p className="text-terracotta font-semibold mt-0.5">Health Certificate Verified ✓</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleWhatsApp}
                    className="w-full h-11 rounded-full bg-whatsapp text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat with our team on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PUPPY PASSPORT & TRUST SECTION */}
      <section className="py-20 bg-cream-100 border-t border-espresso-800/10">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-white rounded-[36px] border-2 border-espresso-800/15 p-8 sm:p-12 shadow-paper">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="font-handwriting text-xl text-terracotta">health assurance</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-espresso-900 mt-1">
                Why families trust TeddyPups
              </h2>
              <p className="text-espresso-600 text-base md:text-lg mt-3">
                Every puppy is placed with certified health records, ethical breeding verification, and comprehensive lifetime support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-espresso-900 mx-auto flex items-center justify-center font-bold text-xl">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-lg text-espresso-900">Vaccinated & Dewormed</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  Up-to-date vaccinations and comprehensive preventative care administered by licensed veterinarians.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-espresso-900 mx-auto flex items-center justify-center font-bold text-xl">
                  🏷
                </div>
                <h3 className="font-serif font-bold text-lg text-espresso-900">Microchipped</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  ISO-compliant international microchip registered for safety and identification.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-espresso-900 mx-auto flex items-center justify-center font-bold text-xl">
                  📄
                </div>
                <h3 className="font-serif font-bold text-lg text-espresso-900">Health Certificate</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  Official veterinary health certificate and travel documentation provided with every adoption.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-cream-50 border border-espresso-800/10 space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-honey-soft text-espresso-900 mx-auto flex items-center justify-center font-bold text-xl">
                  🛡
                </div>
                <h3 className="font-serif font-bold text-lg text-espresso-900">Health Guarantee</h3>
                <p className="text-xs text-espresso-600 leading-relaxed">
                  Comprehensive 1-year genetic health guarantee for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HAPPY FAMILIES PREVIEW */}
      <section className="py-20 bg-cream-50 border-t border-espresso-800/10">
        <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-handwriting text-xl text-terracotta">real adoption moments</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-espresso-900 mt-1">
                Happy families &amp; puppies
              </h2>
              <p className="text-espresso-600 text-base md:text-lg mt-2">
                Over 64 moments and counting of puppies joining their forever families in Dubai and beyond.
              </p>
            </div>

            <Link
              to="/happy-families"
              className="text-sm font-semibold text-espresso-800 hover:text-terracotta underline decoration-terracotta underline-offset-4 flex items-center gap-1.5"
            >
              <span>View all 64 moments</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {previewFamilies.map((moment) => (
              <div
                key={moment.id}
                className="bg-white p-3 rounded-2xl border border-espresso-800/15 shadow-sm transform hover:-translate-y-1 transition-all"
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
                <p className="font-handwriting text-xs text-espresso-600 mt-2 text-center truncate">
                  Family Moment #{moment.index}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ PREVIEW */}
      <section className="py-20 bg-cream-100 border-t border-espresso-800/10">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <span className="font-handwriting text-xl text-terracotta">questions, answered</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-espresso-900 mt-1">
              Frequently asked questions
            </h2>
          </div>

          <div className="space-y-4">
            {previewFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border-2 border-espresso-800/10 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left font-serif font-bold text-espresso-900 flex items-center justify-between gap-4 hover:text-terracotta transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-espresso-500 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-espresso-700 leading-relaxed border-t border-cream-200 font-sans">
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
              className="text-sm font-semibold text-espresso-800 hover:text-terracotta underline decoration-terracotta underline-offset-4"
            >
              See all frequently asked questions →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL HIGH CONTRAST CTA BANNER */}
      <section className="py-20 bg-espresso-800 text-cream-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 text-center relative z-10 space-y-6">
          <span className="font-handwriting text-2xl text-honey-light">
            your new best friend is waiting
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to meet your new best friend?
          </h2>
          <p className="text-cream-200/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Visit our Downtown Dubai showroom to spend time together, or ask us about our imported teacup puppies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/puppies"
              className="h-12 md:h-14 px-8 rounded-full bg-honey text-espresso-900 font-bold text-base hover:bg-honey-light transition-all shadow-md transform hover:-translate-y-0.5"
            >
              View available puppies
            </Link>
            <button
              onClick={handleWhatsApp}
              className="h-12 md:h-14 px-8 rounded-full border-2 border-cream-200 text-cream-100 font-semibold text-base hover:bg-cream-100 hover:text-espresso-900 transition-all transform hover:-translate-y-0.5"
            >
              WhatsApp enquiry
            </button>
          </div>

          <div className="pt-8">
            <MascotTeddy variant="reading" className="w-28 h-24 mx-auto" />
          </div>
        </div>
      </section>
    </div>
  );
};

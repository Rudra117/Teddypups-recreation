import React, { useState, useMemo } from 'react';
import { faqItems } from '../data/faq';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { Search, ChevronDown, MessageCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(faqItems[0].id);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqItems;
    const q = searchQuery.toLowerCase().trim();
    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Safe Demo Mode: WhatsApp link (+971 54 167 6733). Direct messaging disabled in demonstration mode.');
  };

  return (
    <div className="pt-28 pb-24 bg-espresso-900 text-cream-100 min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Page Header */}
        <header className="max-w-3xl mb-12">
          <span className="font-handwriting text-xl text-honey">
            everything you need to know
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mt-1">
            Questions &amp; answers
          </h1>
          <p className="text-cream-200/80 text-base md:text-lg mt-3 leading-relaxed">
            Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our adoption team is available 24/7.
          </p>
        </header>

        {/* Two-Column FAQ Layout: Left Sidebar + Right Question Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sidebar: Search & Mascot */}
          <aside className="lg:col-span-4 bg-espresso-800/80 rounded-3xl p-6 sm:p-7 border border-espresso-700/80 backdrop-blur-sm space-y-6">
            <div>
              <label
                htmlFor="faq-search"
                className="font-handwriting text-2xl text-honey block mb-2"
              >
                sniff out a question
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-espresso-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="faq-search"
                  type="search"
                  placeholder="delivery, Korea, vaccinated…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-full bg-cream-50 text-espresso-900 placeholder:text-espresso-400 text-sm font-medium outline-none focus:ring-2 focus:ring-honey shadow-sm"
                />
              </div>
              <p className="text-xs text-cream-300/80 mt-2.5 font-medium" aria-live="polite">
                {filteredFaqs.length} {filteredFaqs.length === 1 ? 'note' : 'notes'} on the board
              </p>
            </div>

            <div className="pt-4 border-t border-espresso-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-cream-200">Have a unique question?</p>
                <p className="text-[0.75rem] text-cream-300/70">Our puppy concierge can help</p>
              </div>
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2 rounded-full bg-whatsapp text-white text-xs font-bold hover:bg-whatsapp-dark transition-colors shadow-sm"
              >
                Ask WhatsApp
              </button>
            </div>

            <div className="pt-2 flex justify-center">
              <MascotTeddy variant="reading" className="w-28 h-24" />
            </div>
          </aside>

          {/* Right Question Board */}
          <main className="lg:col-span-8 bg-cream-100 rounded-3xl p-6 sm:p-10 border-4 border-espresso-800 shadow-2xl text-espresso-900 min-h-[500px]">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-2xl border-2 border-espresso-800/10 overflow-hidden shadow-sm hover:border-espresso-800/25 transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleOpen(faq.id)}
                        className="w-full p-5 sm:p-6 text-left font-serif font-bold text-lg sm:text-xl text-espresso-900 flex items-center justify-between gap-4 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-terracotta shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-espresso-700 leading-relaxed border-t border-cream-200 font-sans">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty Search State matching reference */
              <div className="py-20 text-center max-w-md mx-auto space-y-4">
                <span className="font-handwriting text-3xl text-terracotta block">
                  No note about &apos;{searchQuery}&apos; yet.
                </span>
                <p className="text-sm text-espresso-600 leading-relaxed">
                  Our puppy team can answer any specific question directly on WhatsApp.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-whatsapp text-white font-semibold text-sm shadow-sm hover:bg-whatsapp-dark transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ask about &apos;{searchQuery}&apos; on WhatsApp</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

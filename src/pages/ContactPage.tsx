import React, { useState } from 'react';
import { availablePuppies } from '../data/puppies';
import { siteConfig } from '../data/siteConfig';
import { MascotTeddy } from '../components/common/MascotTeddy';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: '',
    message: '',
  });

  const [submittedLetter, setSubmittedLetter] = useState<typeof formData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honest local demo persistence
    const saved = { ...formData };
    setSubmittedLetter(saved);
  };

  const handleSafeAction = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    alert(`Safe Demo Mode: Link (${text}) disabled in demonstration mode to protect real contact channels.`);
  };

  return (
    <div className="pt-28 pb-24 bg-cream-100 min-h-screen">
      <div className="max-w-[110rem] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <header className="max-w-3xl mb-12">
          <span className="font-handwriting text-xl text-terracotta">
            we&apos;d love to hear from you!
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-espresso-900 tracking-tight mt-1">
            Get in touch with us
          </h1>
          <p className="text-espresso-700 text-base md:text-lg mt-3 leading-relaxed">
            Visit our Downtown Dubai showroom, send us a WhatsApp message, or post a letter below to start your puppy journey.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Showroom & Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-espresso-800/15 shadow-paper space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-honey-soft text-espresso-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-900">Showroom Location</h3>
                  <p className="text-sm text-espresso-700 mt-0.5">{siteConfig.showroom}</p>
                  <p className="text-xs text-espresso-500 mt-1">Visits strictly by appointment • 7 days a week</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-honey-soft text-espresso-900 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-900">Phone &amp; WhatsApp</h3>
                  <a
                    href="#"
                    onClick={(e) => handleSafeAction(e, siteConfig.phone)}
                    className="text-sm text-terracotta font-semibold hover:underline block mt-0.5"
                  >
                    {siteConfig.phone}
                  </a>
                  <p className="text-xs text-espresso-500 mt-1">Direct support &amp; video consultations</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-honey-soft text-espresso-900 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-900">Email Enquiries</h3>
                  <a
                    href="#"
                    onClick={(e) => handleSafeAction(e, siteConfig.email)}
                    className="text-sm text-espresso-700 hover:text-espresso-900 block mt-0.5"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-honey-soft text-espresso-900 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-espresso-900">Visiting Hours</h3>
                  <p className="text-sm text-espresso-700 mt-0.5">10:00 AM – 9:00 PM</p>
                  <p className="text-xs text-espresso-500 mt-1">Private 1-on-1 bonding sessions</p>
                </div>
              </div>
            </div>

            {/* Mascot buddy under contact cards */}
            <div className="hidden lg:flex justify-center pt-2">
              <MascotTeddy variant="sitting" className="w-36 h-28" />
            </div>
          </div>

          {/* Right Column: "Dear TeddyPups" Letter Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-espresso-800 shadow-paper relative">
              {/* Postage Stamp Accent */}
              <div className="absolute top-6 right-6 w-14 h-16 rounded-md border-2 border-dashed border-terracotta bg-cream-50 flex flex-col items-center justify-center text-center p-1 select-none">
                <span className="font-serif text-[0.65rem] font-bold text-espresso-900 leading-none">DUBAI</span>
                <span className="text-xs text-terracotta">🐾</span>
                <span className="font-serif text-[0.6rem] text-espresso-600 leading-none mt-0.5">POST</span>
              </div>

              {submittedLetter ? (
                /* Submitted Confirmation */
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-whatsapp text-white mx-auto flex items-center justify-center text-2xl shadow-sm">
                    ✓
                  </div>
                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-espresso-900">
                    Your letter is safely recorded!
                  </h2>
                  <p className="text-espresso-700 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-espresso-900">{submittedLetter.name}</span>. Your letter has been stored in your local session log.
                  </p>
                  <div className="bg-cream-50 border border-espresso-800/10 rounded-2xl p-4 text-xs text-espresso-600 max-w-md mx-auto text-left space-y-1">
                    <p><span className="font-semibold text-espresso-800">Phone:</span> {submittedLetter.phone}</p>
                    {submittedLetter.email && <p><span className="font-semibold text-espresso-800">Email:</span> {submittedLetter.email}</p>}
                    {submittedLetter.area && <p><span className="font-semibold text-espresso-800">Area:</span> {submittedLetter.area}</p>}
                    {submittedLetter.message && <p><span className="font-semibold text-espresso-800">Note:</span> {submittedLetter.message}</p>}
                    <p className="text-[0.7rem] text-terracotta font-semibold pt-1">
                      *(Safe Demo Mode: Letter was recorded locally and not dispatched to real recipients).*
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedLetter(null);
                      setFormData({ name: '', phone: '', email: '', area: '', puppyId: '', message: '' });
                    }}
                    className="text-xs font-semibold text-terracotta underline"
                  >
                    Write another letter
                  </button>
                </div>
              ) : (
                /* Active Conversational Letter Form */
                <form onSubmit={handleSubmit} className="space-y-6 pt-2">
                  <p className="font-handwriting text-3xl sm:text-4xl text-espresso-900">
                    Dear TeddyPups,
                  </p>

                  <div className="space-y-5 font-serif text-base sm:text-lg text-espresso-900 leading-loose">
                    <p>
                      my name is{' '}
                      <input
                        type="text"
                        required
                        placeholder="your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="font-sans text-sm sm:text-base border-b-2 border-espresso-800 bg-cream-50/80 px-2.5 py-0.5 outline-none focus:border-terracotta text-espresso-900 transition-colors w-44"
                      />
                      , and you can reach me on{' '}
                      <input
                        type="tel"
                        required
                        placeholder="+971 50 123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="font-sans text-sm sm:text-base border-b-2 border-espresso-800 bg-cream-50/80 px-2.5 py-0.5 outline-none focus:border-terracotta text-espresso-900 transition-colors w-44"
                      />{' '}
                      or by email at{' '}
                      <input
                        type="email"
                        placeholder="optional"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="font-sans text-sm sm:text-base border-b-2 border-espresso-800 bg-cream-50/80 px-2.5 py-0.5 outline-none focus:border-terracotta text-espresso-900 transition-colors w-48"
                      />
                      .
                    </p>

                    <p>
                      I live in{' '}
                      <input
                        type="text"
                        placeholder="e.g. Dubai Marina"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="font-sans text-sm sm:text-base border-b-2 border-espresso-800 bg-cream-50/80 px-2.5 py-0.5 outline-none focus:border-terracotta text-espresso-900 transition-colors w-44"
                      />
                      , and I&apos;m curious about{' '}
                      <select
                        value={formData.puppyId}
                        onChange={(e) => setFormData({ ...formData, puppyId: e.target.value })}
                        className="font-sans text-sm sm:text-base border-b-2 border-espresso-800 bg-cream-50/80 px-2 py-0.5 outline-none focus:border-terracotta text-espresso-900 transition-colors rounded-none"
                      >
                        <option value="">any puppy (not sure yet)</option>
                        {availablePuppies.map((p) => (
                          <option key={p.id} value={p.slug}>
                            {p.name} ({p.breed}, {p.gender.toLowerCase()})
                          </option>
                        ))}
                      </select>
                      .
                    </p>
                  </div>

                  {/* Note Area */}
                  <div className="pt-2">
                    <label className="block text-xs font-sans font-bold text-espresso-600 uppercase tracking-wider mb-2">
                      Your note (optional)
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Anything else you'd like to tell us about your home, questions about import, or dates for a visit…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-2xl border-2 border-espresso-800/15 bg-cream-50 text-sm font-sans text-espresso-900 outline-none focus:border-espresso-800 resize-none"
                    />
                  </div>

                  {/* Sign-off & Submit */}
                  <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-espresso-800/10">
                    <p className="font-handwriting text-2xl text-espresso-700">
                      with love, a future puppy parent
                    </p>
                    <button
                      type="submit"
                      className="h-12 px-8 rounded-full bg-espresso-800 hover:bg-espresso-900 text-white font-semibold text-sm transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Post my letter
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

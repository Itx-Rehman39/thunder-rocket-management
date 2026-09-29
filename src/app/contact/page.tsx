'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Media Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>COMMUNICATIONS & PARTNERSHIPS</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            CONTACT CLUB
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Get in touch with Thunder Rockets media relations, sponsorship inquiries, fan clubs, or academy trials.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#D1EAEF] shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-[#0B222E]">Franchise Secretariat</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                For administrative requests, sponsorship proposals, press passes, and match ticketing info.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#00B4D8] mt-0.5 shrink-0" />
                  <span>Thunder Rockets High Performance Sports Complex, National Stadium Road, Karachi, Pakistan</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0A9396] shrink-0" />
                  <span>+92 (21) 3456-7890 / +92 300 1234567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#881337] shrink-0" />
                  <span>contact@thunderrockets.com / media@thunderrockets.com</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0B222E] p-6 rounded-3xl border border-[#0A9396]/30 text-white space-y-2">
              <span className="text-xs font-bold text-[#00DF82] uppercase tracking-wider block">Academy Trials 2025</span>
              <h4 className="font-bold text-base text-white">Emerging Fast Bowlers & Power Hitters</h4>
              <p className="text-xs text-slate-300">
                Open trials for U-19 and U-23 cricketers commence next month. Registered candidates will receive notification.
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#D1EAEF] shadow-sm">
              <h3 className="font-bold text-xl text-[#0B222E] mb-2">Send an Official Message</h3>
              <p className="text-xs text-slate-500 mb-6">Fill in your information and our management office will respond promptly.</p>

              {submitted ? (
                <div className="p-6 bg-[#E0F7FA] rounded-2xl border border-[#00B4D8]/40 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#00DF82] mx-auto" />
                  <h4 className="font-bold text-base text-[#005F73]">Message Successfully Dispatched</h4>
                  <p className="text-xs text-slate-600">
                    Thank you for contacting Thunder Rockets. A club official will follow up with you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-[#0B222E] text-white text-xs font-bold"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Asad Siddiqui"
                        className="w-full bg-[#F8FCFD] border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#00B4D8]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full bg-[#F8FCFD] border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#00B4D8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Inquiry Department</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#F8FCFD] border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Media Inquiry">Media & Press Relations</option>
                      <option value="Sponsorship">Corporate Sponsorship & Brands</option>
                      <option value="Academy Trials">Academy Trials & Talent Hunt</option>
                      <option value="Fan Club">Fan Merchandise & Tickets</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Message Content</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your detailed inquiry..."
                      className="w-full bg-[#F8FCFD] border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0B222E] to-[#0A9396] hover:from-[#00DF82] hover:to-[#0B222E] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Official Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

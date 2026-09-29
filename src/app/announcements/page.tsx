'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store/appStore';
import { Megaphone, Calendar, User, Search, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AnnouncementsPage() {
  const { announcements } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Match', 'Team Kit', 'Fitness & Strength', 'Coaching Staff', 'General'];

  const filtered = announcements.filter((a) => {
    const matchCat = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <Megaphone className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>OFFICIAL PRESS & BULLETINS</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            CLUB ANNOUNCEMENTS
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Important franchise updates, squad travel itineraries, kit launches, and training communications.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B222E] text-[#00B4D8] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#00B4D8] shadow-sm"
            />
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-6 pt-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1EAEF] shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#E0F7FA] text-[#005F73] font-bold text-xs">
                    {item.category}
                  </span>
                  {item.priority === 'Urgent' && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Priority Bulletin
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#0A9396]" />
                  <span>{item.date}</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0B222E]">
                {item.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {item.content}
              </p>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#00B4D8]" />
                  <span>Dispatched by <strong className="text-slate-700">{item.author}</strong> ({item.authorRole})</span>
                </span>
                <span className="text-[11px] font-mono text-[#00DF82] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Official Club Notice
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

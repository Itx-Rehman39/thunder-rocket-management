'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MatchCard } from '@/components/cricket/MatchCard';
import { useApp } from '@/lib/store/appStore';
import { MatchStatus } from '@/types';
import { Calendar, Search, Radio, Trophy, Filter } from 'lucide-react';

export default function MatchesPage() {
  const { matches } = useApp();
  const [statusFilter, setStatusFilter] = useState<'All' | MatchStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: ('All' | MatchStatus)[] = ['All', 'Live', 'Upcoming', 'Completed'];

  const filteredMatches = matches.filter((match) => {
    const matchesStatus = statusFilter === 'All' || match.status === statusFilter;
    const matchesSearch =
      match.opponent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.competition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>SEASON FIXTURES & RESULTS</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            MATCHES & FIXTURES
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Track live scores, ball-by-ball commentary, match statistics, and upcoming tournament fixtures for Thunder Rockets.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === tab
                    ? 'bg-[#0B222E] text-[#00B4D8] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'Live' && <Radio className="w-3 h-3 text-red-500 animate-pulse" />}
                <span>{tab === 'All' ? 'All Matches' : tab}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search opponent or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#00B4D8] shadow-sm"
            />
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

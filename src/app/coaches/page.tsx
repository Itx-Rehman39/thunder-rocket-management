'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CoachCard } from '@/components/cricket/CoachCard';
import { useApp } from '@/lib/store/appStore';
import { Shield, Users, Search } from 'lucide-react';

export default function CoachesPage() {
  const { coaches } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCoaches = coaches.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>ELITE BRAIN TRUST</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            COACHES & STAFF
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            The visionary tactical thinkers, performance analysts, fitness trainers, and medical team driving Thunder Rockets to tournament glory.
          </p>
        </div>
      </section>

      {/* Content Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-[#0B222E]">
              High Performance Department
            </h2>
            <p className="text-xs text-slate-500">
              {filteredCoaches.length} appointed technical staff members
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search coach by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#00B4D8] shadow-sm"
            />
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {filteredCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

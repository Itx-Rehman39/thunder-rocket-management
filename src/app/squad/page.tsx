'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PlayerCard } from '@/components/cricket/PlayerCard';
import { useApp } from '@/lib/store/appStore';
import { PlayerRole } from '@/types';
import { Search, Users, Filter, Trophy, Shield } from 'lucide-react';

export default function SquadPage() {
  const { players } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'All' | PlayerRole>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs: ('All' | PlayerRole)[] = [
    'All',
    'Batsman',
    'Bowler',
    'All-Rounder',
    'Wicketkeeper',
  ];

  const filteredPlayers = players.filter((player) => {
    const matchesFilter = selectedFilter === 'All' || player.role === selectedFilter;
    const matchesSearch =
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.jerseyNumber.toString().includes(searchQuery) ||
      player.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Squad Header Banner with Jersey Camouflage */}
      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#00E5FF_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-cyan-300 border border-[#0A9396]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>OFFICIAL 2025/2026 ROSTER</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            OUR SQUAD
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Meet the players who represent Thunder Rocket 138/10R. Powered by skill, resilience, and fearless execution.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        
        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-slate-200">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedFilter === tab
                    ? 'bg-[#0B222E] text-[#00B4D8] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {tab === 'All' ? 'All Squad' : `${tab}s`}
              </button>
            ))}
          </div>

          {/* Player Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, # or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-[#00B4D8] shadow-sm"
            />
          </div>

        </div>

        {/* Players Count & Active filter indicator */}
        <div className="flex items-center justify-between py-4 text-xs font-semibold text-slate-500">
          <span>
            Showing <strong className="text-[#0B222E]">{filteredPlayers.length}</strong> players
          </span>
          <span className="text-[11px] font-mono">
            Thunder Rockets High Performance Roster
          </span>
        </div>

        {/* Squad Grid */}
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 my-6">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No players found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              We couldn't find any players matching "{searchQuery}". Try searching for another name or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0B222E] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

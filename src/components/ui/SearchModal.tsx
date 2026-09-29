'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/appStore';
import { Search, X, Users, Calendar, Megaphone, Shield, Dumbbell, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, players, matches, coaches, announcements, trainingSessions } = useApp();
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredPlayers = q
    ? players.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.jerseyNumber.toString().includes(q)
      )
    : players.slice(0, 4);

  const filteredMatches = q
    ? matches.filter(
        (m) =>
          m.opponent.toLowerCase().includes(q) ||
          m.venue.toLowerCase().includes(q) ||
          m.competition.toLowerCase().includes(q)
      )
    : matches.slice(0, 3);

  const filteredCoaches = q
    ? coaches.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.specialization.some((s) => s.toLowerCase().includes(q))
      )
    : [];

  const filteredAnnouncements = q
    ? announcements.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B222E] border border-[#0A9396]/40 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-700/80 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#00B4D8] shrink-0" />
          <input
            type="text"
            placeholder="Search players, matches, coaches, training, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-400 text-base font-medium outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 bg-slate-800 text-slate-400 hover:text-white rounded text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Players Section */}
          {filteredPlayers.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00DF82] mb-2.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Players</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredPlayers.map((player) => (
                  <Link
                    key={player.id}
                    href={`/players/${player.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2.5 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] border border-slate-700/60 hover:border-[#00B4D8]/50 flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="w-9 h-9 rounded-full object-cover shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-xs font-bold text-white group-hover:text-[#00B4D8] truncate block">
                          #{player.jerseyNumber} {player.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block">
                          {player.role} • {player.stats.runs} Runs
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00B4D8] shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Matches Section */}
          {filteredMatches.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#00B4D8] mb-2.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Matches & Fixtures</span>
              </div>
              <div className="space-y-2">
                {filteredMatches.map((match) => (
                  <Link
                    key={match.id}
                    href={`/matches/${match.id}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] border border-slate-700/60 hover:border-[#00B4D8]/50 flex items-center justify-between group transition-all"
                  >
                    <div>
                      <span className="text-xs font-bold text-white group-hover:text-[#00B4D8] block">
                        Thunder Rockets vs {match.opponent}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {match.date} • {match.venue} ({match.status})
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-cyan-300 bg-[#0B222E] px-2 py-1 rounded border border-[#0A9396]/30">
                      {match.matchType}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Coaches Section */}
          {filteredCoaches.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Coaching Staff</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCoaches.map((coach) => (
                  <Link
                    key={coach.id}
                    href="/coaches"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2.5 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] border border-slate-700/60 flex items-center gap-2.5 group"
                  >
                    <img
                      src={coach.photoUrl}
                      alt={coach.name}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-xs font-bold text-white group-hover:text-amber-300 block truncate">
                        {coach.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {coach.role}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Announcements Section */}
          {filteredAnnouncements.length > 0 && (
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#9F1239] mb-2.5 flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" />
                <span>Announcements</span>
              </div>
              <div className="space-y-2">
                {filteredAnnouncements.map((ann) => (
                  <Link
                    key={ann.id}
                    href="/announcements"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] border border-slate-700/60 block group"
                  >
                    <span className="text-xs font-bold text-white group-hover:text-[#67E8F9] block">
                      {ann.title}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {ann.date} • {ann.category}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {q &&
            filteredPlayers.length === 0 &&
            filteredMatches.length === 0 &&
            filteredCoaches.length === 0 &&
            filteredAnnouncements.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">
                No matching results found for "{query}". Try searching for "Ali", "Falcons", "Net Practice", or "Coach".
              </div>
            )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#071820] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Search the entire Thunder Rockets franchise</span>
          <span className="hidden sm:inline font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

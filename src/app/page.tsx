'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JerseyGraphic } from '@/components/brand/JerseyGraphic';
import { PlayerCard } from '@/components/cricket/PlayerCard';
import { CoachCard } from '@/components/cricket/CoachCard';
import { MatchCard } from '@/components/cricket/MatchCard';
import { useApp } from '@/lib/store/appStore';
import { 
  Trophy, 
  ArrowRight, 
  Flame, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  TrendingUp,
  Shirt,
  Camera,
  Check,
  Eye,
  Lock
} from 'lucide-react';
import { OFFICIAL_KIT_PRESETS } from '@/components/brand/JerseyGraphic';

export default function HomePage() {
  const { players, matches, coaches, announcements, galleryItems } = useApp();

  const nextMatch = matches.find((m) => m.status === 'Upcoming') || matches[2];
  const lastMatch = matches.find((m) => m.status === 'Completed') || matches[0];
  const topPerformer = players[0]; // Ali Khan

  const featuredPlayers = players.slice(0, 4);
  const featuredCoaches = coaches.slice(0, 4);
  const latestNews = announcements.slice(0, 4);
  const previewGallery = galleryItems.slice(0, 4);
  const [activeKitPreset, setActiveKitPreset] = React.useState(OFFICIAL_KIT_PRESETS[0]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* =========================================================================
          HERO SECTION (Matches Top Left of Reference Image)
          ========================================================================= */}
      <section className="relative overflow-hidden tr-camo-bg text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
        {/* Subtle Camouflage & Stadium Floodlight Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#00B4D8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#0A9396]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#881337]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              
              {/* Season Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F2C3A]/90 border border-[#0A9396]/50 shadow-inner">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00DF82] animate-ping" />
                <span className="text-xs font-black tracking-widest text-[#00E5FF] uppercase">
                  OFFICIAL 2025/2026 TEAM PLATFORM
                </span>
              </div>

              {/* Main Headline */}
              <div>
                <div className="font-athletic text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-white drop-shadow-md">
                  THUNDER <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] via-[#00B4D8] to-[#0A9396]">
                    ROCKET 138/10R
                  </span>
                </div>
                <p className="mt-4 text-xs sm:text-sm md:text-base font-bold tracking-[0.18em] text-cyan-200 uppercase font-sans">
                  STRIKE LIKE THUNDER • SOAR LIKE A ROCKET • 138/10R
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Welcome to the official digital hub of Thunder Rocket 138/10R. Driven by high-intensity power cricket, state-of-the-art sports science, and championship caliber.
              </p>

              {/* Primary Call To Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/squad"
                  className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#00E5FF] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00E5FF] shadow-[0_4px_25px_rgba(0,180,216,0.45)] hover:shadow-[0_6px_30px_rgba(0,223,130,0.55)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <span>Explore Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/matches"
                  className="px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-[#0F2C3A] hover:bg-[#13384A] border border-[#0A9396]/40 shadow-md transition-all flex items-center gap-2"
                >
                  <span>View Matches</span>
                  <Calendar className="w-4 h-4 text-[#00B4D8]" />
                </Link>
              </div>

              {/* Quick Trophy Tagline */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Defending PSL Champions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00DF82]" />
                  <span>Elite PCB Registered</span>
                </div>
              </div>

            </div>

            {/* Right Jersey Representation Column (The Visual Source of Truth!) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-lg p-4 sm:p-6 rounded-3xl bg-[#0B222E]/80 border border-[#0A9396]/30 backdrop-blur-md shadow-2xl">
                {/* Visual Label */}
                <div className="flex items-center justify-between mb-4 border-b border-slate-700/60 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                    <span className="text-xs font-black tracking-wider uppercase text-cyan-200">
                      OFFICIAL THUNDER ROCKETS TEAM KIT
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">2025/2026 EDITION</span>
                </div>

                {/* Jersey Presentation Graphic */}
                <JerseyGraphic view="both" playerNumber={10} playerName="USMAN TARIQ" />

                <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400 font-sans">
                    Features White & Ice Base with Cyan/Aqua Camouflage Brushwork, Dark Teal Side Panels, and Crimson Crest.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* =========================================================================
          KEY STATS & HIGHLIGHTS BILLBOARD ROW (Directly from Mockup)
          Next Match | Last Match | Team Stats | Top Performer
          ========================================================================= */}
      <section className="-mt-12 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Next Match Card */}
          <div className="bg-[#0B222E] rounded-2xl p-5 border border-[#0A9396]/40 text-white shadow-xl flex flex-col justify-between group hover:border-[#00B4D8] transition-all">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                <span className="text-[#00DF82] uppercase tracking-wider font-bold">NEXT MATCH</span>
                <span className="bg-[#0F2C3A] text-cyan-300 px-2 py-0.5 rounded text-[10px] font-bold">
                  {nextMatch.matchType}
                </span>
              </div>
              <h4 className="font-bold text-base text-white truncate">
                Thunder Rockets vs {nextMatch.opponent}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                {nextMatch.date} • {nextMatch.time}
              </p>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {nextMatch.venue}
              </p>
            </div>
            <Link
              href={`/matches/${nextMatch.id}`}
              className="mt-4 w-full py-2 rounded-xl bg-[#0F2C3A] hover:bg-[#00B4D8] text-cyan-300 hover:text-slate-950 font-bold text-xs text-center transition-all"
            >
              View Match Details
            </Link>
          </div>

          {/* 2. Last Match Result Card */}
          <div className="bg-[#0B222E] rounded-2xl p-5 border border-[#0A9396]/40 text-white shadow-xl flex flex-col justify-between group hover:border-[#00B4D8] transition-all">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                <span className="text-[#00B4D8] uppercase tracking-wider font-bold">LAST MATCH RESULT</span>
                <span className="bg-[#0F2C3A] text-[#00DF82] px-2 py-0.5 rounded text-[10px] font-bold">
                  Won
                </span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Thunder Rockets</span>
                  <span className="text-[#00DF82]">
                    {lastMatch.thunderRocketsScore?.runs}/{lastMatch.thunderRocketsScore?.wickets} ({lastMatch.thunderRocketsScore?.overs} ov)
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>{lastMatch.opponent}</span>
                  <span>
                    {lastMatch.opponentScore?.runs}/{lastMatch.opponentScore?.wickets} ({lastMatch.opponentScore?.overs} ov)
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs font-bold text-amber-300">
                {lastMatch.result}
              </div>
            </div>
            <Link
              href={`/scorecards/${lastMatch.id}`}
              className="mt-4 w-full py-2 rounded-xl bg-[#0F2C3A] hover:bg-[#00B4D8] text-cyan-300 hover:text-slate-950 font-bold text-xs text-center transition-all"
            >
              View Scorecard
            </Link>
          </div>

          {/* 3. Team Stats Card */}
          <div className="bg-[#0B222E] rounded-2xl p-5 border border-[#0A9396]/40 text-white shadow-xl flex flex-col justify-between group hover:border-[#00B4D8] transition-all">
            <div>
              <div className="text-xs text-slate-400 font-semibold mb-2 uppercase tracking-wider">
                <span className="text-cyan-300 font-bold">TEAM STATS</span> (PSL 2025)
              </div>
              <div className="grid grid-cols-4 gap-2 text-center py-1">
                <div>
                  <span className="font-athletic text-2xl font-black text-white">24</span>
                  <span className="text-[10px] text-slate-400 block uppercase">Matches</span>
                </div>
                <div>
                  <span className="font-athletic text-2xl font-black text-[#00DF82]">16</span>
                  <span className="text-[10px] text-slate-400 block uppercase">Wins</span>
                </div>
                <div>
                  <span className="font-athletic text-2xl font-black text-rose-400">8</span>
                  <span className="text-[10px] text-slate-400 block uppercase">Losses</span>
                </div>
                <div>
                  <span className="font-athletic text-2xl font-black text-[#00B4D8]">66.7%</span>
                  <span className="text-[10px] text-slate-400 block uppercase">Win Rate</span>
                </div>
              </div>
            </div>
            <Link
              href="/statistics"
              className="mt-4 w-full py-2 rounded-xl bg-[#0F2C3A] hover:bg-[#00B4D8] text-cyan-300 hover:text-slate-950 font-bold text-xs text-center transition-all"
            >
              Full Analytics
            </Link>
          </div>

          {/* 4. Top Performer Card */}
          <div className="bg-[#0B222E] rounded-2xl p-5 border border-[#0A9396]/40 text-white shadow-xl flex flex-col justify-between group hover:border-[#00B4D8] transition-all">
            <div className="flex items-center gap-3">
              <img
                src={topPerformer.photoUrl}
                alt={topPerformer.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#00DF82] shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#00DF82] block">
                  TOP PERFORMER
                </span>
                <h4 className="font-bold text-base text-white truncate">
                  {topPerformer.name}
                </h4>
                <p className="text-xs text-slate-400">
                  {topPerformer.stats.runs} Runs • {topPerformer.stats.wickets} Wickets
                </p>
              </div>
            </div>
            <Link
              href={`/players/${topPerformer.id}`}
              className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-[#881337] to-[#700F2B] hover:brightness-110 text-white font-bold text-xs text-center transition-all shadow-md"
            >
              View Player Profile
            </Link>
          </div>

        </div>
      </section>


      {/* =========================================================================
          LATEST NEWS & ANNOUNCEMENTS (4 CARDS ROW)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0A9396]">
              DISPATCHES & UPDATES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B222E]">
              Latest News & Press
            </h2>
          </div>
          <Link
            href="/announcements"
            className="text-xs sm:text-sm font-bold text-[#005F73] hover:text-[#00B4D8] flex items-center gap-1 transition-colors"
          >
            <span>View All News</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#D1EAEF] shadow-sm hover:shadow-xl hover:border-[#00B4D8]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#005F73] font-bold text-[11px]">
                    {news.category}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{news.date}</span>
                </div>
                <h3 className="font-bold text-base text-[#0B222E] group-hover:text-[#0A9396] transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed flex-1">
                  {news.content}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 italic">By {news.author}</span>
                  <Link
                    href="/announcements"
                    className="font-bold text-[#0A9396] hover:text-[#00B4D8] flex items-center gap-1"
                  >
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          KEY PLAYERS SPOTLIGHT (OUR SQUAD)
          ========================================================================= */}
      <section className="bg-slate-50 border-y border-[#D1EAEF] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0A9396]">
                STAR ATHLETES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B222E]">
                Featured Squad Members
              </h2>
            </div>
            <Link
              href="/squad"
              className="text-xs sm:text-sm font-bold text-[#005F73] hover:text-[#00B4D8] flex items-center gap-1 transition-colors"
            >
              <span>Explore Complete 15-Man Squad</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          OFFICIAL 2025/2026 TEAM KIT REVEAL & SHOWCASE (Pure Authentic Armor)
          ========================================================================= */}
      <section className="bg-gradient-to-b from-[#06161F] via-[#0B222E] to-[#071820] text-white py-18 sm:py-24 border-y border-[#0A9396]/30 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#0A9396]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/40 text-xs font-mono font-bold uppercase tracking-wider">
              <Shirt className="w-3.5 h-3.5 text-[#00DF82]" />
              <span>OFFICIAL 2025/2026 TEAM ARMOR • THUNDER ROCKET 138/10R</span>
            </div>
            <h2 className="font-athletic text-4xl sm:text-6xl tracking-tight text-white uppercase">
              THE OFFICIAL MATCH KIT REVEAL
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Crafted with high-performance aerodynamic DryCell Pro technology, turquoise wave camouflage brush strokes, and proud 138/10R emblems. Explore the official match fits and player editions.
            </p>
          </div>

          {/* Interactive Dual-Column Kit Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: High-Res Dynamic Viewport */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B222E]/90 border border-[#0A9396]/40 shadow-2xl backdrop-blur-md relative group">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/60 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#00DF82] animate-pulse" />
                    <span className="text-xs font-black tracking-wider uppercase text-[#00E5FF]">
                      {activeKitPreset.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0F2C3A] text-cyan-300 border border-cyan-800">
                    {activeKitPreset.badge}
                  </span>
                </div>

                {/* Main Authentic Photo */}
                <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-2">
                  <img
                    src={activeKitPreset.url}
                    alt={activeKitPreset.title}
                    className="max-h-[400px] sm:max-h-[440px] w-auto max-w-full object-contain rounded-2xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 text-center space-y-1">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {activeKitPreset.description}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 pt-1">
                    OFFICIAL AUTHENTIC PRODUCT • THUNDER ROCKETS ATHLETIC APPAREL
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Angle Selection & Design Highlights */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-mono font-bold text-[#00DF82] uppercase tracking-wider block mb-1">
                  SELECT MATCH ANGLE & EDITION
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Match Day Fits & Custom Back Print
                </h3>
              </div>

              {/* 4 Angle Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {OFFICIAL_KIT_PRESETS.map((preset) => {
                  const isSelected = activeKitPreset.id === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setActiveKitPreset(preset)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-[#00B4D8] bg-[#00B4D8]/15 ring-2 ring-[#00B4D8]/40 shadow-lg'
                          : 'border-slate-800 bg-[#0B222E]/80 hover:border-slate-600 hover:bg-[#0B222E]'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#071820] shrink-0 border border-slate-700/60 p-1 flex items-center justify-center">
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase">
                            {preset.badge}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#00DF82]" />}
                        </div>
                        <h4 className="font-bold text-xs text-white truncate mt-0.5">
                          {preset.shortLabel}
                        </h4>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">
                          {preset.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Key Features Bullet Grid */}
              <div className="p-4 rounded-2xl bg-[#0F2C3A]/70 border border-slate-700/60 grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Embossed Crest</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Golden King Rider emblem with official club lightning badge.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#00DF82]" />
                    <span>DryCell Moisture Pro</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Breathable mesh panels keeping players cool in high-heat PSL matches.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Asadullah #7 Edition</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Signature tournament custom player edition with navy bold fonts.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
                    <span>138/10R Pride</span>
                  </span>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    Full franchise coordinates woven directly into the lower hem.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/gallery"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>View Official Kit in Gallery</span>
                </Link>
                <Link
                  href="/about"
                  className="px-5 py-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-cyan-300 font-bold text-xs uppercase tracking-wider border border-[#0A9396]/40 transition-all flex items-center gap-2"
                >
                  <Shirt className="w-4 h-4" />
                  <span>About Franchise Identity</span>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          COACHING STAFF & HIGH PERFORMANCE LEADERSHIP
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#0A9396]">
              MASTER TACTICIANS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B222E]">
              Coaching & High Performance Staff
            </h2>
          </div>
          <Link
            href="/coaches"
            className="text-xs sm:text-sm font-bold text-[#005F73] hover:text-[#00B4D8] flex items-center gap-1 transition-colors"
          >
            <span>View All Staff</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </section>


      {/* =========================================================================
          GALLERY PREVIEW SECTION
          ========================================================================= */}
      <section className="bg-[#0B222E] text-white py-16 tr-camo-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#00DF82]">
                CAPTURED MOMENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Team Gallery & Championship Memories
              </h2>
            </div>
            <Link
              href="/gallery"
              className="text-xs sm:text-sm font-bold text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Full Gallery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewGallery.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-[#0F2C3A] border border-[#0A9396]/30 aspect-[4/3] shadow-lg"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06161F] via-[#06161F]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E5FF]">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold text-white leading-tight">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-300 font-mono mt-0.5">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================================
          BOTTOM CALL TO ACTION: "FOLLOW THE JOURNEY"
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-br from-[#06161F] via-[#0B222E] to-[#0A9396] text-white shadow-2xl border border-[#00B4D8]/30">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="inline-block px-3 py-1 rounded-full bg-[#881337] text-white text-xs font-black uppercase tracking-widest">
              OFFICIAL FRANCHISE PORTAL
            </span>

            <h2 className="font-athletic text-4xl sm:text-6xl tracking-tight leading-tight">
              FOLLOW THE JOURNEY
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Step into the inner sanctum of Thunder Rockets. Access tactical lineups, live ball-by-ball match feeds, fitness metrics, and role-specific coaching portals.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="px-8 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#00E5FF] to-[#00DF82] hover:brightness-110 shadow-lg transition-all flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#071820]" />
                <span>Authorized Staff Portal (Login Required)</span>
              </Link>
              <Link
                href="/squad"
                className="px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider text-white bg-[#0F2C3A] hover:bg-[#13384A] border border-[#0A9396]/40 transition-all"
              >
                Meet All Players
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

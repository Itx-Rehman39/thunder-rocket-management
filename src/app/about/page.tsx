'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JerseyGraphic } from '@/components/brand/JerseyGraphic';
import { Trophy, Target, Shield, Heart, Users, Sparkles, Award } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>CLUB PHILOSOPHY & HERITAGE</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            ABOUT THUNDER ROCKET 138/10R
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Strike Like Thunder • Soar Like a Rocket • 138/10R. The story of our rise, our values, and our commitment to modern sports excellence.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        
        {/* Intro Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#0A9396]">
              OUR MISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B222E] leading-tight">
              Redefining Cricket Through High Performance & Fearless Intent
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded with the vision to modernize cricket franchise operations, <strong className="text-slate-900">Thunder Rocket 138/10R</strong> combines tactical data intelligence, athletic conditioning, and an aggressive powerplay philosophy.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every match is approached with meticulous analytical preparation: matchup analysis by our analysts, high-speed biomechanics by our coaching staff, and an unbreakable bond of brotherhood among our players.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#D1EAEF] shadow-sm">
                <span className="font-athletic text-3xl font-black text-[#00B4D8]">66.7%</span>
                <span className="text-xs text-slate-500 block">Overall Win Rate</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#D1EAEF] shadow-sm">
                <span className="font-athletic text-3xl font-black text-[#881337]">2025</span>
                <span className="text-xs text-slate-500 block">PSL Champions</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-[#0B222E] p-6 rounded-3xl border border-[#0A9396]/30 text-white shadow-xl w-full">
              <h3 className="font-bold text-base text-center mb-4 text-[#00E5FF]">
                The Official Identity: Kit & Colors
              </h3>
              <JerseyGraphic view="front" playerNumber={10} playerName="USMAN TARIQ" />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#0A9396]">
              PILLARS OF SUCCESS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B222E]">
              Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#D1EAEF] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#005F73] flex items-center justify-center font-bold">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B222E]">Relentless Intent</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We believe in fearless shot-making, proactive field placements, and aggressive running between the wickets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#D1EAEF] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#0A9396] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B222E]">Unity in Brotherhood</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                One team, one dream. Whether top-order stars or bench talent, we stand together through triumph and adversity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#D1EAEF] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E0F7FA] text-[#881337] flex items-center justify-center font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0B222E]">Championship Standard</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every drill, warm-up routine, and video session is executed at international world-class quality.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

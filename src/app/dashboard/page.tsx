'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { 
  Users, 
  Shield, 
  Calendar, 
  Radio, 
  Dumbbell, 
  TrendingUp, 
  Award, 
  Plus, 
  ExternalLink,
  Target,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function DashboardHomePage() {
  const { currentRole, currentUser, players, coaches, matches, trainingSessions, announcements } = useApp();

  // If role is PLAYER, render dedicated Player Portal
  if (currentRole === 'PLAYER') {
    const player = players[0]; // Ali Khan #07
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Welcome Player Banner */}
          <div className="p-6 rounded-3xl bg-[#0B222E] text-white border border-[#0A9396]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={player.photoUrl}
                alt={player.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#00DF82]"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00DF82]">
                  ATHLETE DASHBOARD
                </span>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {player.name} #{player.jerseyNumber}
                </h1>
                <p className="text-xs text-slate-300">
                  {player.role} • Captain • Match Day Status: Cleared 100%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/players/${player.id}`}
                className="px-4 py-2 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-cyan-300 text-xs font-bold transition-colors border border-[#0A9396]/30"
              >
                View Public Profile
              </Link>
            </div>
          </div>

          {/* Player Personal Key Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Matches</span>
              <span className="font-athletic text-3xl font-black text-[#0B222E] block mt-1">{player.stats.matches}</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Runs</span>
              <span className="font-athletic text-3xl font-black text-[#0A9396] block mt-1">{player.stats.runs}</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Wickets</span>
              <span className="font-athletic text-3xl font-black text-[#881337] block mt-1">{player.stats.wickets}</span>
            </div>
            <div className="bg-white p-5 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Strike Rate</span>
              <span className="font-athletic text-3xl font-black text-[#00B4D8] block mt-1">{player.stats.strikeRate}</span>
            </div>
          </div>

          {/* Next Match & Training Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#0B222E] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#00B4D8]" />
                <span>Next Scheduled Fixture</span>
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-[#005F73]">T20 • PSL 2025</span>
                <div className="text-lg font-bold text-[#0B222E] mt-1">
                  Thunder Rockets vs Kings
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  02 May 2025 • 04:00 PM • National Cricket Ground
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <h3 className="font-bold text-base text-[#0B222E] flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-[#0A9396]" />
                <span>Upcoming Training Session</span>
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold text-[#0A9396]">Fielding Drills & Direct Hits</span>
                <div className="text-sm font-bold text-[#0B222E] mt-1">
                  National Cricket Ground
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  29 Apr 2025 • 10:00 AM - 12:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Coach Notes for Player */}
          <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-3">
            <h3 className="font-bold text-base text-[#0B222E]">Coaching Staff Feedback for You</h3>
            {player.coachNotes && player.coachNotes.length > 0 ? (
              player.coachNotes.map((note, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8FCFD] border border-[#D1EAEF] space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-[#0B222E]">{note.coachName} ({note.coachRole})</span>
                    <span className="text-slate-400 font-mono">{note.date}</span>
                  </div>
                  <p className="text-xs text-slate-600">{note.note}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No notes recorded yet.</p>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // General Admin / Coach / Staff Dashboard
  const nextMatch = matches.find((m) => m.status === 'Upcoming') || matches[2];
  const nextTraining = trainingSessions[0];

  const recentPerformanceData = [
    { match: 'vs Falcons', TR: 165, Opp: 158 },
    { match: 'vs Warriors', TR: 142, Opp: 172 },
    { match: 'vs Kings', TR: 184, Opp: 160 },
    { match: 'vs United', TR: 175, Opp: 140 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* Top Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B222E] text-white border border-[#0A9396]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00DF82] animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-[#00E5FF]">
                THUNDER ROCKETS COMMAND CENTER
              </span>
            </div>
            <h1 className="font-athletic text-3xl sm:text-4xl text-white mt-1">
              Operations & Performance Portal
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Logged in as <strong className="text-white">{currentUser.name}</strong> • Permission Scope: <span className="text-cyan-300 font-bold">{currentRole}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dashboard/scoring"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#881337] to-[#700F2B] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
            >
              <Radio className="w-4 h-4 text-white animate-pulse" />
              <span>Live Scorer</span>
            </Link>

            <Link
              href="/dashboard/playing-xi"
              className="px-4 py-2.5 rounded-xl bg-[#00B4D8] hover:bg-[#00DF82] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-all"
            >
              <Target className="w-4 h-4 text-slate-950" />
              <span>Playing XI Lineup</span>
            </Link>
          </div>
        </div>

        {/* 6 Key Management KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Players</span>
            <span className="font-athletic text-3xl font-black text-[#0B222E] block mt-1">{players.length}</span>
            <span className="text-[9px] text-[#00DF82] font-semibold">11 Active XI</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Coaching Staff</span>
            <span className="font-athletic text-3xl font-black text-[#0A9396] block mt-1">{coaches.length}</span>
            <span className="text-[9px] text-slate-400">High Performance</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Matches</span>
            <span className="font-athletic text-3xl font-black text-[#00B4D8] block mt-1">
              {matches.filter((m) => m.status === 'Upcoming').length}
            </span>
            <span className="text-[9px] text-[#005F73]">Scheduled</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Matches</span>
            <span className="font-athletic text-3xl font-black text-red-500 block mt-1">
              {matches.filter((m) => m.status === 'Live').length}
            </span>
            <span className="text-[9px] text-red-500 font-bold">In Progress</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Training Drills</span>
            <span className="font-athletic text-3xl font-black text-[#881337] block mt-1">{trainingSessions.length}</span>
            <span className="text-[9px] text-slate-400">Sessions Logged</span>
          </div>

          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Win Rate</span>
            <span className="font-athletic text-3xl font-black text-[#00DF82] block mt-1">66.7%</span>
            <span className="text-[9px] text-[#00DF82] font-semibold">16 of 24 Won</span>
          </div>
        </div>

        {/* Middle Grid: Team Performance Chart + Upcoming Fixture Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recent Match Run Comparisons (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-[#0B222E]">Recent Matches Run Output</h3>
                <p className="text-xs text-slate-400">Thunder Rockets runs vs Opponent runs in recent T20 clashes</p>
              </div>
              <span className="text-xs font-mono text-[#0A9396] font-bold">PSL 2025</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recentPerformanceData} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="match" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="TR" name="Thunder Rockets" fill="#00B4D8" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Opp" name="Opponent" fill="#0F2C3A" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Next Match & Readiness (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-base text-[#0B222E]">Next Matchday</h3>
                <span className="text-xs font-bold text-[#005F73] bg-[#E0F7FA] px-2 py-0.5 rounded-full">
                  Upcoming
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0B222E] text-white space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#00E5FF] tracking-wider block">
                  {nextMatch.competition}
                </span>
                <div className="font-bold text-lg text-white">
                  Thunder Rockets vs {nextMatch.opponent}
                </div>
                <div className="text-xs text-slate-300">
                  {nextMatch.date} • {nextMatch.time}
                </div>
                <div className="text-[11px] text-slate-400">
                  Venue: {nextMatch.venue}
                </div>
              </div>
            </div>

            <Link
              href={`/matches/${nextMatch.id}`}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0B222E] text-slate-800 hover:text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Match Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* Quick Management Actions Grid */}
        <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#0B222E]">Quick Administrative Shortcuts</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/dashboard/players"
              className="p-4 rounded-2xl bg-[#F8FCFD] hover:bg-[#E0F7FA] border border-[#D1EAEF] transition-all group flex flex-col items-center text-center"
            >
              <Users className="w-6 h-6 text-[#00B4D8] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-[#0B222E]">Manage Squad</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Add / Edit Players</span>
            </Link>

            <Link
              href="/dashboard/scoring"
              className="p-4 rounded-2xl bg-[#F8FCFD] hover:bg-rose-50 border border-[#D1EAEF] transition-all group flex flex-col items-center text-center"
            >
              <Radio className="w-6 h-6 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-[#0B222E]">Live Scoring</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Ball-by-Ball Feed</span>
            </Link>

            <Link
              href="/dashboard/playing-xi"
              className="p-4 rounded-2xl bg-[#F8FCFD] hover:bg-emerald-50 border border-[#D1EAEF] transition-all group flex flex-col items-center text-center"
            >
              <Target className="w-6 h-6 text-[#00DF82] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-[#0B222E]">Select Playing XI</span>
              <span className="text-[10px] text-slate-400 mt-0.5">Field Formation</span>
            </Link>

            <Link
              href="/dashboard/reports"
              className="p-4 rounded-2xl bg-[#F8FCFD] hover:bg-[#E0F7FA] border border-[#D1EAEF] transition-all group flex flex-col items-center text-center"
            >
              <TrendingUp className="w-6 h-6 text-[#0A9396] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-[#0B222E]">Export Reports</span>
              <span className="text-[10px] text-slate-400 mt-0.5">CSV / Print Sheets</span>
            </Link>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

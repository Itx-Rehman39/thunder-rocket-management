'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store/appStore';
import { 
  Award, 
  Calendar, 
  ShieldCheck, 
  Activity, 
  Zap, 
  User, 
  TrendingUp,
  FileText,
  Plus,
  Target,
  Clock,
  Edit3,
  Save,
  X,
  Sparkles,
  Lock
} from 'lucide-react';
import Link from 'next/link';

export default function PlayerProfilePage() {
  const params = useParams();
  const playerId = params.id as string;
  const { players, currentRole, addCoachNote, updatePlayer } = useApp();

  const player = players.find((p) => p.id === playerId);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Batting' | 'Bowling' | 'Fielding' | 'Career' | 'Matches' | 'Awards'>('Overview');

  // Edit Career Stats modal state
  const [isEditStatsOpen, setIsEditStatsOpen] = useState(false);
  const [statsForm, setStatsForm] = useState({
    matches: 0,
    runs: 0,
    wickets: 0,
    highestScore: 0,
    battingAverage: 0,
    strikeRate: 0,
    fifties: 0,
    hundreds: 0,
    fours: 0,
    sixes: 0,
    bowlingEconomy: 0,
    bestBowling: '0/0',
    catches: 0,
  });

  // Coach note form state
  const [noteText, setNoteText] = useState('');
  const [noteCategory, setNoteCategory] = useState<'Batting' | 'Bowling' | 'Fitness' | 'Strategy' | 'General'>('Batting');

  if (!player) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F6FBFC]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <User className="w-16 h-16 text-slate-300 mb-3" />
          <h2 className="text-2xl font-bold text-slate-800">Player Not Found</h2>
          <p className="text-sm text-slate-500 mt-1">The requested squad member does not exist in our roster.</p>
          <Link href="/squad" className="mt-4 px-6 py-2.5 rounded-xl bg-[#0B222E] text-white text-xs font-bold">
            Back to Squad
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isStaffAuthorized = [
    'SUPER_ADMIN',
    'TEAM_MANAGER',
    'HEAD_COACH',
    'BATTING_COACH',
    'BOWLING_COACH',
    'FIELDING_COACH',
    'FITNESS_COACH',
    'PERFORMANCE_ANALYST',
    'PHYSIOTHERAPIST',
  ].includes(currentRole);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    addCoachNote(player.id, {
      coachName: currentRole.replace('_', ' '),
      coachRole: currentRole,
      category: noteCategory,
      note: noteText.trim(),
    });
    setNoteText('');
  };

  const tabs: ('Overview' | 'Batting' | 'Bowling' | 'Fielding' | 'Career' | 'Matches' | 'Awards')[] = [
    'Overview',
    'Batting',
    'Bowling',
    'Fielding',
    'Career',
    'Matches',
    'Awards',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Player Profile Hero Banner matching Screenshot */}
      <section className="relative tr-camo-bg text-white py-12 sm:py-16 border-b border-[#0A9396]/30 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 sm:gap-8">
            
            {/* Player Avatar */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shrink-0 group">
              <img
                src={player.photoUrl}
                alt={player.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-[#0B222E]/90 text-[#00E5FF] font-black text-xs border border-[#00B4D8]/40">
                #{player.jerseyNumber < 10 ? `0${player.jerseyNumber}` : player.jerseyNumber}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00DF82] text-xs font-bold uppercase tracking-wider border border-[#0A9396]/40">
                  {player.role}
                </span>
                {player.isCaptain && (
                  <span className="px-3 py-1 rounded-full bg-[#881337] text-white text-xs font-bold uppercase tracking-wider shadow">
                    Captain
                  </span>
                )}
                {player.isViceCaptain && (
                  <span className="px-3 py-1 rounded-full bg-[#0A9396] text-white text-xs font-bold uppercase tracking-wider shadow">
                    Vice Captain
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                  {player.status}
                </span>
              </div>

              <h1 className="font-athletic text-4xl sm:text-6xl text-white tracking-tight">
                {player.name}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-slate-300 font-medium">
                <div>Batting: <strong className="text-white">{player.battingStyle}</strong></div>
                <div>Bowling: <strong className="text-white">{player.bowlingStyle}</strong></div>
                <div>Age: <strong className="text-white">{player.age} yrs</strong></div>
                <div>Height: <strong className="text-white">{player.height}</strong></div>
                <div>Nationality: <strong className="text-white">{player.nationality}</strong></div>
                <div>Joined: <strong className="text-white">{player.joinedYear}</strong></div>
              </div>
            </div>

            {/* Thunder Rockets Jersey Watermark Badge */}
            <div className="hidden lg:block text-right">
              <div className="font-athletic text-3xl font-black italic text-[#00B4D8]">
                THUNDER <span className="text-[#881337]">ROCKET 138/10R</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                THUNDER ROCKET SQUAD
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#0B222E] text-[#00B4D8] shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Main Stats Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 4 Key Player Stats Cards with Edit Button */}
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wide">
                Career Performance Highlights
              </h3>
              <button
                onClick={() => {
                  setStatsForm({
                    matches: player.stats?.matches || 0,
                    runs: player.stats?.runs || 0,
                    wickets: player.stats?.wickets || 0,
                    highestScore: player.stats?.highestScore || 0,
                    battingAverage: player.stats?.battingAverage || 0,
                    strikeRate: player.stats?.strikeRate || 0,
                    fifties: player.stats?.fifties || 0,
                    hundreds: player.stats?.hundreds || 0,
                    fours: player.stats?.fours || 0,
                    sixes: player.stats?.sixes || 0,
                    bowlingEconomy: player.stats?.bowlingEconomy || 0,
                    bestBowling: player.stats?.bestBowling || '0/0',
                    catches: player.stats?.catches || 0,
                  });
                  setIsEditStatsOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Career Score & Wickets</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#D1EAEF] shadow-sm text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Matches</span>
                <span className="font-athletic text-3xl font-black text-[#0B222E]">{player.stats.matches}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#D1EAEF] shadow-sm text-center">
                <span className="text-[11px] font-bold text-[#005F73] uppercase tracking-wider block">Career Score (Runs)</span>
                <span className="font-athletic text-3xl font-black text-[#0A9396]">{player.stats.runs}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#D1EAEF] shadow-sm text-center">
                <span className="text-[11px] font-bold text-[#881337] uppercase tracking-wider block">Career Wickets</span>
                <span className="font-athletic text-3xl font-black text-[#881337]">{player.stats.wickets}</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#D1EAEF] shadow-sm text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Catches</span>
                <span className="font-athletic text-3xl font-black text-[#00B4D8]">{player.stats.catches}</span>
              </div>
            </div>

            {/* Tab 1: OVERVIEW / BATTING / BOWLING */}
            {(activeTab === 'Overview' || activeTab === 'Batting') && (
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-[#0B222E] flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#0A9396]" />
                    <span>Batting Career Statistics</span>
                  </h3>
                  <span className="text-xs font-semibold text-[#005F73] bg-[#E0F7FA] px-2.5 py-0.5 rounded-full">
                    {player.battingStyle}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Average</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.battingAverage}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Strike Rate</span>
                    <span className="font-bold text-lg text-[#00B4D8]">{player.stats.strikeRate}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Highest Score</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.highestScore}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">50s / 100s</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.fifties} / {player.stats.hundreds}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Fours (4s)</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.fours}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Sixes (6s)</span>
                    <span className="font-bold text-lg text-[#881337]">{player.stats.sixes}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl sm:col-span-2">
                    <span className="text-slate-400 text-xs block">Boundary Percentage</span>
                    <span className="font-bold text-lg text-[#0A9396]">
                      {(((player.stats.fours * 4 + player.stats.sixes * 6) / Math.max(1, player.stats.runs)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'Overview' || activeTab === 'Bowling') && (
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-[#0B222E] flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#881337]" />
                    <span>Bowling Career Statistics</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                    {player.bowlingStyle}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Total Wickets</span>
                    <span className="font-bold text-lg text-[#881337]">{player.stats.wickets}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Economy</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.bowlingEconomy}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Best Bowling</span>
                    <span className="font-bold text-lg text-[#0A9396]">{player.stats.bestBowling}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Bowling Avg</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.bowlingAverage}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Overs Bowled</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.overs}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 text-xs block">Maidens</span>
                    <span className="font-bold text-lg text-slate-800">{player.stats.maidens}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: FIELDING */}
            {activeTab === 'Fielding' && (
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#0B222E]">Fielding Metrics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl text-center">
                    <span className="text-xs text-slate-400 block uppercase">Catches Taken</span>
                    <span className="font-athletic text-3xl font-black text-[#00B4D8]">{player.stats.catches}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-center">
                    <span className="text-xs text-slate-400 block uppercase">Run Outs Effected</span>
                    <span className="font-athletic text-3xl font-black text-[#0A9396]">{player.stats.runOuts}</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl text-center">
                    <span className="text-xs text-slate-400 block uppercase">Stumpings</span>
                    <span className="font-athletic text-3xl font-black text-[#881337]">{player.stats.stumpings}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: AWARDS */}
            {(activeTab === 'Overview' || activeTab === 'Awards') && player.awards && (
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#0B222E] flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>Honors & Accolades</span>
                </h3>
                <div className="space-y-2">
                  {player.awards.map((award, idx) => (
                    <div key={idx} className="p-3 bg-[#F8FCFD] rounded-xl border border-[#D1EAEF] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-slate-800">{award.title}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">{award.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: CAREER */}
            {activeTab === 'Career' && (
              <div className="space-y-6">
                {/* Career Trajectory Card */}
                <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h3 className="font-bold text-lg text-[#0B222E] flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#0A9396]" />
                      <span>Career Trajectory & Milestones</span>
                    </h3>
                    <span className="text-xs font-bold text-[#005F73] bg-[#E0F7FA] px-2.5 py-0.5 rounded-full">
                      Inducted {player.joinedYear}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 text-xs block">Debut Season</span>
                      <span className="font-bold text-base text-[#0B222E]">{player.joinedYear}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 text-xs block">Experience</span>
                      <span className="font-bold text-base text-[#0A9396]">{new Date().getFullYear() - player.joinedYear + 1} Seasons</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 text-xs block">Career High</span>
                      <span className="font-bold text-base text-[#00B4D8]">{player.stats.highestScore} Runs</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl">
                      <span className="text-slate-400 text-xs block">Win Contribution</span>
                      <span className="font-bold text-base text-[#00DF82]">68.4%</span>
                    </div>
                  </div>

                  {/* Career Season-by-Season Breakdown Table */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Franchise Season Log</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3 font-sans">Season</th>
                            <th className="py-2.5 px-3 font-sans">Tournament</th>
                            <th className="py-2.5 px-3 text-right font-sans">Matches</th>
                            <th className="py-2.5 px-3 text-right font-sans">Runs</th>
                            <th className="py-2.5 px-3 text-right font-sans">Avg</th>
                            <th className="py-2.5 px-3 text-right font-sans">SR</th>
                            <th className="py-2.5 px-3 text-right font-sans">Wkts</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-bold text-[#0B222E]">2025</td>
                            <td className="py-2.5 px-3 font-sans text-slate-600">Pakistan Super League</td>
                            <td className="py-2.5 px-3 text-right">{player.stats.matches}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-[#0A9396]">{player.stats.runs}</td>
                            <td className="py-2.5 px-3 text-right">{player.stats.battingAverage}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-[#00B4D8]">{player.stats.strikeRate}</td>
                            <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{player.stats.wickets}</td>
                          </tr>
                          <tr className="hover:bg-slate-50 text-slate-500">
                            <td className="py-2.5 px-3 font-bold text-[#0B222E]">2024</td>
                            <td className="py-2.5 px-3 font-sans">National T20 Cup</td>
                            <td className="py-2.5 px-3 text-right">{Math.max(1, Math.round(player.stats.matches * 0.8))}</td>
                            <td className="py-2.5 px-3 text-right font-bold">{Math.round(player.stats.runs * 0.75)}</td>
                            <td className="py-2.5 px-3 text-right">{(player.stats.battingAverage * 0.95).toFixed(1)}</td>
                            <td className="py-2.5 px-3 text-right font-bold">{(player.stats.strikeRate * 0.96).toFixed(1)}</td>
                            <td className="py-2.5 px-3 text-right font-bold">{Math.round(player.stats.wickets * 0.8)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: MATCHES */}
            {activeTab === 'Matches' && (
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-[#0B222E] flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#00B4D8]" />
                    <span>Match-by-Match Log & Scorecards</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500">Recent PSL Fixtures</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Opponent</th>
                        <th className="py-2.5 px-3 text-right">Runs</th>
                        <th className="py-2.5 px-3 text-right">Balls</th>
                        <th className="py-2.5 px-3 text-right">SR</th>
                        <th className="py-2.5 px-3 text-right">Wkts</th>
                        <th className="py-2.5 px-3 text-right">Overs</th>
                        <th className="py-2.5 px-3 text-right">Runs Conc.</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {player.recentMatches && player.recentMatches.length > 0 ? (
                        player.recentMatches.map((m) => (
                          <tr key={m.id} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 text-slate-500 font-sans">{m.date}</td>
                            <td className="py-2.5 px-3 font-sans font-bold text-slate-800">vs {m.opponent}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-[#0A9396]">{m.runsScored}</td>
                            <td className="py-2.5 px-3 text-right text-slate-500">{m.ballsFaced}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-[#00B4D8]">
                              {m.ballsFaced > 0 ? ((m.runsScored / m.ballsFaced) * 100).toFixed(1) : '-'}
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-[#881337]">{m.wicketsTaken}</td>
                            <td className="py-2.5 px-3 text-right text-slate-500">{m.oversBowled}</td>
                            <td className="py-2.5 px-3 text-right text-slate-500">{m.runsConceded}</td>
                            <td className="py-2.5 px-3 text-right font-sans">
                              <Link
                                href={`/scorecards/${m.id}`}
                                className="text-[#005F73] hover:text-[#00B4D8] font-bold text-[11px] underline"
                              >
                                Scorecard
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={9} className="py-6 text-center text-slate-400 font-sans italic">
                            No match-by-match performances logged for this player yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* COACH NOTES SECTION (RESTRICTED ROLE ACCESS) */}
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#005F73]" />
                  <h3 className="font-bold text-lg text-[#0B222E]">Coaches Tactical & Development Notes</h3>
                </div>
                {!isStaffAuthorized ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    Staff Only
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00DF82] bg-[#0F2C3A] px-2.5 py-0.5 rounded-full">
                    Authorized Staff Access
                  </span>
                )}
              </div>

              {isStaffAuthorized ? (
                <div className="space-y-4">
                  {/* Form to add note */}
                  <form onSubmit={handleAddNote} className="p-4 bg-[#F8FCFD] rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Add Tactical Assessment:</span>
                      <select
                        value={noteCategory}
                        onChange={(e) => setNoteCategory(e.target.value as any)}
                        className="bg-white text-xs border border-slate-300 rounded-lg px-2 py-1 outline-none"
                      >
                        <option value="Batting">Batting</option>
                        <option value="Bowling">Bowling</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Strategy">Strategy</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <textarea
                      rows={2}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Enter private coaching remarks, grip adjustments, technical feedback..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:border-[#00B4D8]"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Save Coach Note</span>
                      </button>
                    </div>
                  </form>

                  {/* List of existing notes */}
                  <div className="space-y-3">
                    {player.coachNotes && player.coachNotes.length > 0 ? (
                      player.coachNotes.map((note, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-[#0B222E]">
                              {note.coachName} <span className="text-slate-400 font-normal">({note.coachRole})</span>
                            </span>
                            <span className="font-mono text-slate-400">{note.date}</span>
                          </div>
                          <span className="inline-block px-2 py-0.5 rounded bg-[#E0F7FA] text-[#005F73] font-bold text-[10px]">
                            {note.category}
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed pt-1">
                            {note.note}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">No coaching notes added yet.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  <Lock className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                  Tactical notes and biomechanical evaluations are confidential to Head Coach, Specialist Coaches, and Club Doctors. Switch your active role in the header to view or append notes.
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar (4 cols): Recent Matches & Bio */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bio Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-3">
              <h3 className="font-bold text-base text-[#0B222E]">Athlete Bio</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {player.bio}
              </p>
            </div>

            {/* Recent Matches Widget (Matches Screenshot) */}
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-[#0B222E]">Recent Matches</h3>
                <span className="text-[11px] font-mono text-[#0A9396]">PSL 2025</span>
              </div>

              <div className="space-y-3">
                {player.recentMatches && player.recentMatches.length > 0 ? (
                  player.recentMatches.map((match) => (
                    <div
                      key={match.id}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-[#F0FDFA] border border-slate-200/80 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-[#0B222E] block">
                          vs {match.opponent}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {match.date}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#005F73] block">
                          {match.runsScored} ({match.ballsFaced}b)
                        </span>
                        {match.oversBowled > 0 && (
                          <span className="text-[10px] text-[#881337] block font-mono">
                            {match.wicketsTaken}/{match.runsConceded}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic">No recent match history logged.</p>
                )}
              </div>

              <Link
                href="/matches"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0B222E] text-slate-700 hover:text-white text-xs font-bold flex items-center justify-center transition-colors"
              >
                View All Team Matches
              </Link>
            </div>

          </div>

        </div>

      </main>

      {/* Edit Career Stats Modal */}
      {isEditStatsOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-[#0B222E]">
                  Update Career Stats for {player.name}
                </h3>
                <span className="text-xs text-slate-500">
                  Changes automatically recalculate team statistical totals across the platform.
                </span>
              </div>
              <button
                onClick={() => setIsEditStatsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updatePlayer(player.id, {
                  stats: {
                    ...player.stats,
                    matches: Number(statsForm.matches) || 0,
                    runs: Number(statsForm.runs) || 0,
                    wickets: Number(statsForm.wickets) || 0,
                    highestScore: Number(statsForm.highestScore) || 0,
                    battingAverage: Number(statsForm.battingAverage) || 0,
                    strikeRate: Number(statsForm.strikeRate) || 0,
                    fifties: Number(statsForm.fifties) || 0,
                    hundreds: Number(statsForm.hundreds) || 0,
                    fours: Number(statsForm.fours) || 0,
                    sixes: Number(statsForm.sixes) || 0,
                    bowlingEconomy: Number(statsForm.bowlingEconomy) || 0,
                    bestBowling: statsForm.bestBowling || '0/0',
                    catches: Number(statsForm.catches) || 0,
                  }
                });
                setIsEditStatsOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Career Matches</label>
                  <input
                    type="number"
                    min={0}
                    value={statsForm.matches}
                    onChange={(e) => setStatsForm({ ...statsForm, matches: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#005F73] block mb-1">Career Score / Runs</label>
                  <input
                    type="number"
                    min={0}
                    value={statsForm.runs}
                    onChange={(e) => setStatsForm({ ...statsForm, runs: Number(e.target.value) })}
                    className="w-full border border-cyan-300 bg-cyan-50/50 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono font-bold text-cyan-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#881337] block mb-1">Career Wickets</label>
                  <input
                    type="number"
                    min={0}
                    value={statsForm.wickets}
                    onChange={(e) => setStatsForm({ ...statsForm, wickets: Number(e.target.value) })}
                    className="w-full border border-rose-300 bg-rose-50/50 rounded-xl p-2.5 outline-none focus:border-[#881337] font-mono font-bold text-rose-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Highest Score</label>
                  <input
                    type="number"
                    min={0}
                    value={statsForm.highestScore}
                    onChange={(e) => setStatsForm({ ...statsForm, highestScore: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Batting Average</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={statsForm.battingAverage}
                    onChange={(e) => setStatsForm({ ...statsForm, battingAverage: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Strike Rate</label>
                  <input
                    type="number"
                    step="0.1"
                    min={0}
                    value={statsForm.strikeRate}
                    onChange={(e) => setStatsForm({ ...statsForm, strikeRate: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">50s / 100s</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      placeholder="50s"
                      value={statsForm.fifties}
                      onChange={(e) => setStatsForm({ ...statsForm, fifties: Number(e.target.value) })}
                      className="w-1/2 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="100s"
                      value={statsForm.hundreds}
                      onChange={(e) => setStatsForm({ ...statsForm, hundreds: Number(e.target.value) })}
                      className="w-1/2 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fours / Sixes</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min={0}
                      placeholder="4s"
                      value={statsForm.fours}
                      onChange={(e) => setStatsForm({ ...statsForm, fours: Number(e.target.value) })}
                      className="w-1/2 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                    />
                    <input
                      type="number"
                      min={0}
                      placeholder="6s"
                      value={statsForm.sixes}
                      onChange={(e) => setStatsForm({ ...statsForm, sixes: Number(e.target.value) })}
                      className="w-1/2 border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Bowling Economy</label>
                  <input
                    type="number"
                    step="0.01"
                    min={0}
                    value={statsForm.bowlingEconomy}
                    onChange={(e) => setStatsForm({ ...statsForm, bowlingEconomy: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Best Bowling</label>
                  <input
                    type="text"
                    placeholder="e.g. 4/18"
                    value={statsForm.bestBowling}
                    onChange={(e) => setStatsForm({ ...statsForm, bestBowling: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Catches Taken</label>
                  <input
                    type="number"
                    min={0}
                    value={statsForm.catches}
                    onChange={(e) => setStatsForm({ ...statsForm, catches: Number(e.target.value) })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditStatsOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 rounded-xl font-bold transition-all shadow cursor-pointer"
                >
                  Save Career Stats
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

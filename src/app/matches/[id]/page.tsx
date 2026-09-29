'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CricketPitchField } from '@/components/cricket/CricketPitchField';
import { LiveScorer } from '@/components/cricket/LiveScorer';
import { useApp } from '@/lib/store/appStore';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Radio, 
  CheckCircle, 
  ArrowLeft, 
  Zap, 
  Layers, 
  Activity,
  Users
} from 'lucide-react';
import Link from 'next/link';

export default function MatchDetailPage() {
  const params = useParams();
  const matchId = params.id as string;
  const { matches, currentRole } = useApp();

  const match = matches.find((m) => m.id === matchId) || matches[0];
  const [activeTab, setActiveTab] = useState<'Scorecard' | 'Commentary' | 'PlayingXI' | 'Partnerships' | 'LiveConsole'>('Scorecard');

  const canLiveScore = ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'PERFORMANCE_ANALYST'].includes(currentRole);

  const tabs: ('Scorecard' | 'Commentary' | 'PlayingXI' | 'Partnerships' | 'LiveConsole')[] = [
    'Scorecard',
    'Commentary',
    'PlayingXI',
    'Partnerships',
    ...(canLiveScore ? (['LiveConsole'] as const) : []),
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Match Center Billboard Header */}
      <section className="relative tr-camo-bg text-white py-10 sm:py-14 border-b border-[#0A9396]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <Link href="/matches" className="hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Matches</span>
            </Link>
            <span>/</span>
            <span className="text-[#00B4D8]">{match.competition}</span>
          </div>

          {/* Main Billboard Header */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B222E]/90 border border-[#0A9396]/40 shadow-2xl backdrop-blur-md">
            
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-700/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0F2C3A] text-cyan-300 font-bold text-xs uppercase tracking-wider border border-[#0A9396]/30">
                    {match.matchType}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    {match.competition}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00B4D8]" />
                    {match.date} • {match.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0A9396]" />
                    {match.venue}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div>
                {match.status === 'Live' ? (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 text-red-400 font-black text-xs uppercase tracking-wider border border-red-500/40 animate-pulse">
                    <Radio className="w-4 h-4 text-red-500 animate-spin" />
                    LIVE MATCH
                  </span>
                ) : match.status === 'Completed' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00DF82] font-bold text-xs border border-[#0A9396]/40">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00DF82]" />
                    Match Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
                    Upcoming
                  </span>
                )}
              </div>
            </div>

            {/* Score Comparison Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 items-center">
              {/* Thunder Rockets Score */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0F2C3A] border border-[#0A9396]/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#071820] flex items-center justify-center font-athletic text-lg font-black text-[#00E5FF] border border-[#00B4D8]/40">
                    TR
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">Thunder Rockets</h3>
                    <span className="text-[11px] text-cyan-300">Home Franchise</span>
                  </div>
                </div>
                <div className="text-right">
                  {match.thunderRocketsScore ? (
                    <div>
                      <span className="font-athletic text-3xl sm:text-4xl font-black text-[#00E5FF]">
                        {match.thunderRocketsScore.runs}/{match.thunderRocketsScore.wickets}
                      </span>
                      <span className="text-xs text-slate-400 block font-mono">
                        ({match.thunderRocketsScore.overs} ov)
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Yet to bat</span>
                  )}
                </div>
              </div>

              {/* Opponent Score */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0F2C3A] border border-slate-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center font-athletic text-lg font-black text-slate-200 border border-slate-700">
                    {match.opponent.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{match.opponent}</h3>
                    <span className="text-[11px] text-slate-400">Challenger</span>
                  </div>
                </div>
                <div className="text-right">
                  {match.opponentScore ? (
                    <div>
                      <span className="font-athletic text-3xl sm:text-4xl font-black text-slate-200">
                        {match.opponentScore.runs}/{match.opponentScore.wickets}
                      </span>
                      <span className="text-xs text-slate-400 block font-mono">
                        ({match.opponentScore.overs} ov)
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">Yet to bat</span>
                  )}
                </div>
              </div>
            </div>

            {/* Match Result Banner */}
            {match.result && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#881337]/50 via-[#0F2C3A] to-[#0A9396]/40 border border-[#00B4D8]/30 text-center">
                <p className="text-sm font-bold text-white flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>{match.result}</span>
                </p>
              </div>
            )}
            
            {match.toss && (
              <p className="text-xs text-slate-400 text-center mt-2 italic">
                {match.toss}
              </p>
            )}

          </div>

        </div>
      </section>

      {/* Main Tabbed Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab
                  ? 'bg-[#0B222E] text-[#00B4D8] shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab === 'LiveConsole' && <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />}
              <span>
                {tab === 'PlayingXI' ? 'Playing XI Lineup' : tab === 'LiveConsole' ? 'Live Scoring Tool' : tab}
              </span>
            </button>
          ))}
        </div>

        {/* Tab 1: FULL SCORECARD */}
        {activeTab === 'Scorecard' && (
          match.innings ? (
            <div className="mt-8 space-y-8">
              {/* 1st Innings */}
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-[#0B222E]">
                    1st Innings: {match.innings.first.teamName}
                  </h3>
                  <span className="font-athletic text-2xl font-black text-[#0A9396]">
                    {match.innings.first.totalRuns}/{match.innings.first.wickets} ({match.innings.first.overs} ov)
                  </span>
                </div>

                {/* Batting Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Batter</th>
                        <th className="py-2.5 px-3">Dismissal</th>
                        <th className="py-2.5 px-3 text-right">R</th>
                        <th className="py-2.5 px-3 text-right">B</th>
                        <th className="py-2.5 px-3 text-right">4s</th>
                        <th className="py-2.5 px-3 text-right">6s</th>
                        <th className="py-2.5 px-3 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {match.innings.first.batting.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-[#0B222E]">{row.playerName}</td>
                          <td className="py-2.5 px-3 text-slate-500">{row.dismissal}</td>
                          <td className="py-2.5 px-3 text-right font-black text-[#0B222E]">{row.runs}</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">{row.balls}</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">{row.fours}</td>
                          <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{row.sixes}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-[#0A9396]">{row.strikeRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bowling Table */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bowling Analysis</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Bowler</th>
                          <th className="py-2.5 px-3 text-right">O</th>
                          <th className="py-2.5 px-3 text-right">M</th>
                          <th className="py-2.5 px-3 text-right">R</th>
                          <th className="py-2.5 px-3 text-right">W</th>
                          <th className="py-2.5 px-3 text-right">Econ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {match.innings.first.bowling.map((b, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-bold text-slate-800">{b.playerName}</td>
                            <td className="py-2 px-3 text-right font-mono">{b.overs}</td>
                            <td className="py-2 px-3 text-right font-mono">{b.maidens}</td>
                            <td className="py-2 px-3 text-right font-mono">{b.runs}</td>
                            <td className="py-2 px-3 text-right font-black text-[#881337]">{b.wickets}</td>
                            <td className="py-2 px-3 text-right font-mono text-[#0A9396]">{b.economy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 2nd Innings */}
              <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-[#0B222E]">
                    2nd Innings: {match.innings.second.teamName}
                  </h3>
                  <span className="font-athletic text-2xl font-black text-[#0A9396]">
                    {match.innings.second.totalRuns}/{match.innings.second.wickets} ({match.innings.second.overs} ov)
                  </span>
                </div>

                {/* Batting Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-3">Batter</th>
                        <th className="py-2.5 px-3">Dismissal</th>
                        <th className="py-2.5 px-3 text-right">R</th>
                        <th className="py-2.5 px-3 text-right">B</th>
                        <th className="py-2.5 px-3 text-right">4s</th>
                        <th className="py-2.5 px-3 text-right">6s</th>
                        <th className="py-2.5 px-3 text-right">SR</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {match.innings.second.batting.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-bold text-[#0B222E]">{row.playerName}</td>
                          <td className="py-2.5 px-3 text-slate-500">{row.dismissal}</td>
                          <td className="py-2.5 px-3 text-right font-black text-[#0B222E]">{row.runs}</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">{row.balls}</td>
                          <td className="py-2.5 px-3 text-right text-slate-500">{row.fours}</td>
                          <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{row.sixes}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-[#0A9396]">{row.strikeRate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bowling Table */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bowling Analysis</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Bowler</th>
                          <th className="py-2.5 px-3 text-right">O</th>
                          <th className="py-2.5 px-3 text-right">M</th>
                          <th className="py-2.5 px-3 text-right">R</th>
                          <th className="py-2.5 px-3 text-right">W</th>
                          <th className="py-2.5 px-3 text-right">Econ</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {match.innings.second.bowling.map((b, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2 px-3 font-bold text-slate-800">{b.playerName}</td>
                            <td className="py-2 px-3 text-right font-mono">{b.overs}</td>
                            <td className="py-2 px-3 text-right font-mono">{b.maidens}</td>
                            <td className="py-2 px-3 text-right font-mono">{b.runs}</td>
                            <td className="py-2 px-3 text-right font-black text-[#881337]">{b.wickets}</td>
                            <td className="py-2 px-3 text-right font-mono text-[#0A9396]">{b.economy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 text-center py-16 bg-white rounded-3xl border border-[#D1EAEF] p-8 shadow-sm">
              <Calendar className="w-12 h-12 text-[#0A9396] mx-auto mb-3 opacity-60" />
              <h3 className="text-base font-bold text-slate-800">Detailed Scorecard Scheduled</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Official ball-by-ball scorecard data will populate in real time once this fixture commences on {match.date}.
              </p>
              {canLiveScore && (
                <button
                  onClick={() => setActiveTab('LiveConsole')}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#0B222E] text-white hover:bg-[#00B4D8] hover:text-slate-950 text-xs font-bold transition-all shadow"
                >
                  Launch Live Scoring Console
                </button>
              )}
            </div>
          )
        )}

        {/* Tab 2: COMMENTARY */}
        {activeTab === 'Commentary' && (
          <div className="mt-8 bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-[#0B222E]">Live Ball-by-Ball Feed</h3>
            <div className="space-y-3">
              {(match.liveState?.timeline || []).length > 0 ? (
                match.liveState?.timeline.map((event, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                    <div className="px-2.5 py-1 rounded-xl bg-[#0B222E] text-white font-mono text-xs font-bold shrink-0">
                      {event.overNumber}.{event.ballNumber}
                    </div>
                    <div>
                      <p className="text-xs text-slate-800 font-medium">
                        {event.commentaryText}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                        <span>Bowler: {event.bowlerName}</span>
                        <span>Batter: {event.batsmanName}</span>
                        <span className="font-bold text-[#0A9396]">{event.runs} Run(s)</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No ball events recorded yet for this fixture.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: PLAYING XI ON THE FIELD */}
        {activeTab === 'PlayingXI' && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#0B222E]">Tactical Pitch Alignment</h3>
                <p className="text-xs text-slate-500">Visual position assignments of Thunder Rockets Playing XI</p>
              </div>
            </div>
            <CricketPitchField interactive={true} />
          </div>
        )}

        {/* Tab 4: PARTNERSHIPS */}
        {activeTab === 'Partnerships' && (
          <div className="mt-8 bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-[#0B222E]">Key Match Partnerships</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#0B222E]">
                  <span>3rd Wicket: Ali Khan & Usman Tariq</span>
                  <span className="text-[#0A9396]">62 Runs (38 Balls)</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-[#00B4D8] h-full" style={{ width: '60%' }} title="Ali Khan 37 runs" />
                  <div className="bg-[#0A9396] h-full" style={{ width: '40%' }} title="Usman Tariq 25 runs" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Ali Khan: 37 (21)</span>
                  <span>Usman Tariq: 25 (17)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: LIVE SCORER CONSOLE (AUTHORIZED STAFF) */}
        {activeTab === 'LiveConsole' && canLiveScore && (
          <div className="mt-8">
            <LiveScorer matchId={match.id} />
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

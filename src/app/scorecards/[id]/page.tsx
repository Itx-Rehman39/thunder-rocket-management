'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store/appStore';
import { ArrowLeft, Trophy, Calendar, MapPin, Printer } from 'lucide-react';
import Link from 'next/link';

export default function ScorecardPage() {
  const params = useParams();
  const matchId = params.id as string;
  const { matches } = useApp();

  const match = matches.find((m) => m.id === matchId) || matches[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200">
          <Link
            href={`/matches/${match.id}`}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#00B4D8]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Match Center</span>
          </Link>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Scorecard</span>
          </button>
        </div>

        {/* Match Header Summary */}
        <div className="mt-6 p-6 rounded-3xl bg-[#0B222E] text-white border border-[#0A9396]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-[#00E5FF] uppercase tracking-wider block">
              OFFICIAL PSL MATCH SCORECARD
            </span>
            <h1 className="font-athletic text-3xl sm:text-4xl text-white mt-1">
              Thunder Rockets vs {match.opponent}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {match.competition} • {match.venue} • {match.date}
            </p>
          </div>

          <div className="text-center md:text-right">
            {match.result && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#881337] text-white text-xs font-black uppercase tracking-wider shadow">
                {match.result}
              </span>
            )}
            <div className="mt-2 text-xs text-slate-300 font-mono">
              TR: {match.thunderRocketsScore?.runs}/{match.thunderRocketsScore?.wickets} ({match.thunderRocketsScore?.overs} ov)
              {'  '}vs{'  '}
              {match.opponent}: {match.opponentScore?.runs}/{match.opponentScore?.wickets} ({match.opponentScore?.overs} ov)
            </div>
          </div>
        </div>

        {/* Both Innings Tables */}
        {match.innings ? (
          <div className="mt-8 space-y-8">
            {/* 1st Innings */}
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="font-bold text-lg text-[#0B222E]">
                  1st Innings: {match.innings.first.teamName}
                </h2>
                <span className="font-athletic text-2xl font-black text-[#0A9396]">
                  {match.innings.first.totalRuns}/{match.innings.first.wickets} ({match.innings.first.overs} ov)
                </span>
              </div>

              {/* Batting */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Batter</th>
                      <th className="py-2.5 px-3">Dismissal</th>
                      <th className="py-2.5 px-3 text-right">Runs</th>
                      <th className="py-2.5 px-3 text-right">Balls</th>
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
                        <td className="py-2.5 px-3 text-right font-black text-[#0B222E] text-sm">{row.runs}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{row.balls}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{row.fours}</td>
                        <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{row.sixes}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#0A9396]">{row.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Extras and Fall of Wickets */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <strong>Extras:</strong> {match.innings.first.extras.total} (wd {match.innings.first.extras.wides}, nb {match.innings.first.extras.noBalls}, b {match.innings.first.extras.byes}, lb {match.innings.first.extras.legByes})
                </div>
                <div>
                  <strong>Total:</strong> {match.innings.first.totalRuns}/{match.innings.first.wickets} in {match.innings.first.overs} overs
                </div>
              </div>

              {/* Bowling */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bowling</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Bowler</th>
                        <th className="py-2 px-3 text-right">O</th>
                        <th className="py-2 px-3 text-right">M</th>
                        <th className="py-2 px-3 text-right">R</th>
                        <th className="py-2 px-3 text-right">W</th>
                        <th className="py-2 px-3 text-right">Econ</th>
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
                <h2 className="font-bold text-lg text-[#0B222E]">
                  2nd Innings: {match.innings.second.teamName}
                </h2>
                <span className="font-athletic text-2xl font-black text-[#0A9396]">
                  {match.innings.second.totalRuns}/{match.innings.second.wickets} ({match.innings.second.overs} ov)
                </span>
              </div>

              {/* Batting */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Batter</th>
                      <th className="py-2.5 px-3">Dismissal</th>
                      <th className="py-2.5 px-3 text-right">Runs</th>
                      <th className="py-2.5 px-3 text-right">Balls</th>
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
                        <td className="py-2.5 px-3 text-right font-black text-[#0B222E] text-sm">{row.runs}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{row.balls}</td>
                        <td className="py-2.5 px-3 text-right text-slate-500">{row.fours}</td>
                        <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{row.sixes}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-[#0A9396]">{row.strikeRate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bowling */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Bowling</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">Bowler</th>
                        <th className="py-2 px-3 text-right">O</th>
                        <th className="py-2 px-3 text-right">M</th>
                        <th className="py-2 px-3 text-right">R</th>
                        <th className="py-2 px-3 text-right">W</th>
                        <th className="py-2 px-3 text-right">Econ</th>
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
          <div className="mt-8 text-center py-16 bg-white rounded-3xl border border-slate-200 p-6">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">Detailed Scorecard Pending</h3>
            <p className="text-xs text-slate-500 mt-1">This fixture has not commenced yet.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

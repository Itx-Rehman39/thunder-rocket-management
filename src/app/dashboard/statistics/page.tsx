'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { BarChart3, TrendingUp, Zap, Target, Award, Download } from 'lucide-react';

export default function DashboardStatisticsPage() {
  const { players, matches } = useApp();
  const [filterDept, setFilterDept] = useState<'All' | 'Batting' | 'Bowling'>('All');

  // Chart: Batting Strike Rate vs Average
  const battingData = players
    .filter((p) => p.stats.runs > 50)
    .map((p) => ({
      name: p.shortName,
      StrikeRate: p.stats.strikeRate,
      Average: p.stats.battingAverage,
      Runs: p.stats.runs,
    }));

  // Chart: Bowling Economy vs Wickets
  const bowlingData = players
    .filter((p) => p.stats.wickets > 0)
    .map((p) => ({
      name: p.shortName,
      Economy: p.stats.bowlingEconomy,
      Wickets: p.stats.wickets,
      Average: p.stats.bowlingAverage,
    }));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Performance Analyst Analytics Engine
            </h1>
            <p className="text-xs text-slate-500">
              Correlate strike rates, death-over economies, boundary percentages, and matchup advantages.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {(['All', 'Batting', 'Bowling'] as const).map((dept) => (
              <button
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterDept === dept
                    ? 'bg-[#0B222E] text-[#00B4D8]'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {dept} Metrics
              </button>
            ))}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Batting Strike Rates & Averages */}
          {(filterDept === 'All' || filterDept === 'Batting') && (
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-[#0B222E]">Batting Strike Rate vs Average</h3>
                  <p className="text-xs text-slate-400">Higher strike rate reflects powerplay and death-over efficiency</p>
                </div>
                <span className="text-xs font-bold text-[#0A9396] bg-[#E0F7FA] px-2 py-0.5 rounded">
                  Batting Unit
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={battingData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="StrikeRate" fill="#00B4D8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Average" fill="#0A9396" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Bowling Wickets & Economy */}
          {(filterDept === 'All' || filterDept === 'Bowling') && (
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-[#0B222E]">Bowling Wickets vs Economy Rate</h3>
                  <p className="text-xs text-slate-400">Evaluating wicket-taking threat alongside run containment</p>
                </div>
                <span className="text-xs font-bold text-[#881337] bg-rose-50 px-2 py-0.5 rounded">
                  Bowling Attack
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bowlingData} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Wickets" fill="#881337" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Economy" fill="#0F2C3A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

        </div>

        {/* Player Metric Comparison Table */}
        <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
          <h3 className="font-bold text-base text-[#0B222E]">Full Squad Advanced Stat Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Player</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3 text-right">Runs</th>
                  <th className="py-2.5 px-3 text-right">Avg</th>
                  <th className="py-2.5 px-3 text-right">SR</th>
                  <th className="py-2.5 px-3 text-right">6s</th>
                  <th className="py-2.5 px-3 text-right">Wickets</th>
                  <th className="py-2.5 px-3 text-right">Econ</th>
                  <th className="py-2.5 px-3 text-right">Catches</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {players.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 font-sans text-slate-500">{p.role}</td>
                    <td className="py-2.5 px-3 text-right text-[#0A9396] font-bold">{p.stats.runs}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{p.stats.battingAverage}</td>
                    <td className="py-2.5 px-3 text-right text-[#00B4D8] font-bold">{p.stats.strikeRate}</td>
                    <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{p.stats.sixes}</td>
                    <td className="py-2.5 px-3 text-right text-[#881337] font-bold">{p.stats.wickets}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{p.stats.bowlingEconomy}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{p.stats.catches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

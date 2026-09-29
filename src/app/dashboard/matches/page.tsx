'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { Match, MatchType, MatchStatus } from '@/types';
import { Calendar, Plus, Edit3, Trash2, Radio, CheckCircle, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';

export default function DashboardMatchesPage() {
  const { matches, addMatch, updateMatch, deleteMatch } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMatchId, setEditingMatchId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    competition: 'Premier Cricket Super League 2025',
    matchType: 'T20' as MatchType,
    totalOvers: 20,
    opponent: '',
    date: '2025-05-18',
    time: '04:00 PM',
    venue: 'National Cricket Ground',
    status: 'Upcoming' as MatchStatus,
    isHomeMatch: true,
  });

  const openAddModal = () => {
    setEditingMatchId(null);
    setFormData({
      competition: 'Premier Cricket Super League 2025',
      matchType: 'T20',
      totalOvers: 20,
      opponent: 'Stallions',
      date: '20 May 2025',
      time: '07:30 PM',
      venue: 'ABC Cricket Ground',
      status: 'Upcoming',
      isHomeMatch: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (m: Match) => {
    setEditingMatchId(m.id);
    setFormData({
      competition: m.competition,
      matchType: m.matchType,
      totalOvers: m.totalOvers || (m.matchType === 'T10' ? 10 : m.matchType === 'ODI' ? 50 : 20),
      opponent: m.opponent,
      date: m.date,
      time: m.time,
      venue: m.venue,
      status: m.status,
      isHomeMatch: m.isHomeMatch,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      totalOvers: Number(formData.totalOvers) || 20,
    };
    if (editingMatchId) {
      updateMatch(editingMatchId, payload);
    } else {
      addMatch(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Match Fixtures & Operations
            </h1>
            <p className="text-xs text-slate-500">
              Schedule official team fixtures, update match results, and initiate live ball feeds.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Fixture</span>
          </button>
        </div>

        {/* Matches Table */}
        <div className="bg-white rounded-3xl border border-[#D1EAEF] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Match / Opponent</th>
                  <th className="py-3 px-4">Type & League</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Venue</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Scores</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matches.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#0B222E] text-sm">
                        Thunder Rocket 138/10R vs {m.opponent}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {m.isHomeMatch ? 'Home Game' : 'Away Game'}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[#E0F7FA] text-[#005F73] font-bold text-[10px]">
                          {m.matchType}
                        </span>
                        {m.totalOvers && (
                          <span className="px-2 py-0.5 rounded bg-[#0B222E] text-[#00E5FF] font-bold text-[10px]">
                            {m.totalOvers} Overs
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 truncate max-w-[140px]">
                        {m.competition}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      <div>{m.date}</div>
                      <span className="text-[10px] text-slate-400 font-mono">{m.time}</span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 truncate max-w-[140px]">
                      {m.venue}
                    </td>

                    <td className="py-3 px-4">
                      {m.status === 'Live' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold animate-pulse">
                          <Radio className="w-3 h-3" />
                          LIVE
                        </span>
                      ) : m.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                          Done
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold">
                          Upcoming
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px]">
                      {m.thunderRocketsScore ? (
                        <div>
                          TR: <strong className="text-[#0A9396]">{m.thunderRocketsScore.runs}/{m.thunderRocketsScore.wickets}</strong> ({m.thunderRocketsScore.overs} ov)
                        </div>
                      ) : (
                        <span className="text-slate-400 italic">No score yet</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {m.status === 'Live' && (
                        <Link
                          href="/dashboard/scoring"
                          className="px-2.5 py-1 rounded-lg bg-[#881337] hover:bg-[#9F1239] text-white font-bold text-[11px] inline-flex items-center gap-1"
                          title="Open Live Scoring"
                        >
                          <Radio className="w-3 h-3 animate-spin" />
                          <span>Score</span>
                        </Link>
                      )}

                      <button
                        onClick={() => openEditModal(m)}
                        className="p-1.5 text-slate-500 hover:text-[#00B4D8] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Fixture"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Permanently delete match vs ${m.opponent}?`)) {
                            deleteMatch(m.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Fixture"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/matches/${m.id}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#0B222E] hover:text-white text-slate-700 font-bold text-[11px] inline-block transition-colors"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Match Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#0B222E]">Schedule New Fixture</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Opponent Team</label>
                  <input
                    type="text"
                    required
                    value={formData.opponent}
                    onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Competition / League</label>
                    <input
                      type="text"
                      required
                      value={formData.competition}
                      onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Match Format</label>
                    <select
                      value={formData.matchType}
                      onChange={(e) => {
                        const newType = e.target.value as MatchType;
                        let defaultOvers = formData.totalOvers;
                        if (newType === 'T10') defaultOvers = 10;
                        if (newType === 'T20') defaultOvers = 20;
                        if (newType === 'ODI') defaultOvers = 50;
                        setFormData({ ...formData, matchType: newType, totalOvers: defaultOvers });
                      }}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Custom">Custom Overs Match</option>
                      <option value="T20">T20 (20 Overs)</option>
                      <option value="T10">T10 (10 Overs)</option>
                      <option value="ODI">ODI (50 Overs)</option>
                      <option value="Test">Test Match</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Total Overs <span className="text-[#00B4D8] font-normal">(Any custom number)</span>
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={formData.totalOvers}
                      onChange={(e) => setFormData({ ...formData, totalOvers: Number(e.target.value) })}
                      placeholder="e.g. 6, 8, 12, 15, 20..."
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Date</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g. 15 May 2025"
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Time</label>
                    <input
                      type="text"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g. 04:00 PM"
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Venue / Stadium</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Match Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as MatchStatus })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Upcoming">Upcoming</option>
                      <option value="Live">Live</option>
                      <option value="Completed">Completed</option>
                      <option value="Abandoned">Abandoned</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isHomeMatch}
                        onChange={(e) => setFormData({ ...formData, isHomeMatch: e.target.checked })}
                        className="rounded"
                      />
                      <span>Home Ground Fixture</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 rounded-xl font-bold transition-all shadow"
                  >
                    Save Fixture
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}

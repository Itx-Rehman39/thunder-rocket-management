'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { Player, PlayerRole, BattingStyle, BowlingStyle, PlayerStatus } from '@/types';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Archive, 
  Trash2,
  CheckCircle, 
  AlertCircle, 
  X,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

export default function DashboardPlayersPage() {
  const { players, addPlayer, updatePlayer, archivePlayer, deletePlayer } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | PlayerStatus>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    jerseyNumber: 1,
    role: 'Batsman' as PlayerRole,
    battingStyle: 'Right Handed' as BattingStyle,
    bowlingStyle: 'Right Arm Fast' as BowlingStyle,
    age: 24,
    height: "5'11\"",
    nationality: 'Pakistan',
    joinedYear: 2025,
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    status: 'Active' as PlayerStatus,
    bio: '',
    email: '',
    phone: '',
    isCaptain: false,
    isViceCaptain: false,
    stats: {
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
      overs: 0,
      catches: 0,
    },
  });

  const openAddModal = () => {
    setEditingPlayerId(null);
    setFormData({
      name: '',
      shortName: '',
      jerseyNumber: Math.max(...players.map((p) => p.jerseyNumber), 1) + 1,
      role: 'Batsman',
      battingStyle: 'Right Handed',
      bowlingStyle: 'Right Arm Fast',
      age: 23,
      height: "6'0\"",
      nationality: 'Pakistan',
      joinedYear: 2025,
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      status: 'Active',
      bio: 'Promising talent inducted into Thunder Rockets high-performance system.',
      email: 'player@thunderrockets.com',
      phone: '+92 300 0000000',
      isCaptain: false,
      isViceCaptain: false,
      stats: {
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
        overs: 0,
        catches: 0,
      },
    });
    setIsModalOpen(true);
  };

  const openEditModal = (player: Player) => {
    setEditingPlayerId(player.id);
    setFormData({
      name: player.name,
      shortName: player.shortName,
      jerseyNumber: player.jerseyNumber,
      role: player.role,
      battingStyle: player.battingStyle,
      bowlingStyle: player.bowlingStyle,
      age: player.age,
      height: player.height,
      nationality: player.nationality,
      joinedYear: player.joinedYear,
      photoUrl: player.photoUrl,
      status: player.status,
      bio: player.bio,
      email: player.contact?.email || '',
      phone: player.contact?.phone || '',
      isCaptain: !!player.isCaptain,
      isViceCaptain: !!player.isViceCaptain,
      stats: {
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
        overs: player.stats?.overs || 0,
        catches: player.stats?.catches || 0,
      },
    });
    setIsModalOpen(true);
  };

  const handleSavePlayer = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPlayerId) {
      updatePlayer(editingPlayerId, {
        name: formData.name,
        shortName: formData.shortName || formData.name.split(' ')[0],
        jerseyNumber: Number(formData.jerseyNumber),
        role: formData.role,
        battingStyle: formData.battingStyle,
        bowlingStyle: formData.bowlingStyle,
        age: Number(formData.age),
        height: formData.height,
        nationality: formData.nationality,
        joinedYear: Number(formData.joinedYear),
        photoUrl: formData.photoUrl,
        status: formData.status,
        bio: formData.bio,
        isCaptain: formData.isCaptain,
        isViceCaptain: formData.isViceCaptain,
        contact: {
          email: formData.email,
          phone: formData.phone,
        },
        stats: {
          matches: Number(formData.stats.matches) || 0,
          runs: Number(formData.stats.runs) || 0,
          wickets: Number(formData.stats.wickets) || 0,
          highestScore: Number(formData.stats.highestScore) || 0,
          battingAverage: Number(formData.stats.battingAverage) || 0,
          strikeRate: Number(formData.stats.strikeRate) || 0,
          fifties: Number(formData.stats.fifties) || 0,
          hundreds: Number(formData.stats.hundreds) || 0,
          fours: Number(formData.stats.fours) || 0,
          sixes: Number(formData.stats.sixes) || 0,
          bowlingEconomy: Number(formData.stats.bowlingEconomy) || 0,
          bestBowling: formData.stats.bestBowling || '0/0',
          bowlingAverage: Number(formData.stats.bowlingEconomy) || 0,
          overs: Number(formData.stats.overs) || 0,
          maidens: 0,
          catches: Number(formData.stats.catches) || 0,
          runOuts: 0,
          stumpings: 0,
        },
      });
    } else {
      addPlayer({
        name: formData.name,
        shortName: formData.shortName || formData.name.split(' ')[0],
        jerseyNumber: Number(formData.jerseyNumber),
        role: formData.role,
        battingStyle: formData.battingStyle,
        bowlingStyle: formData.bowlingStyle,
        age: Number(formData.age),
        height: formData.height,
        nationality: formData.nationality,
        joinedYear: Number(formData.joinedYear),
        photoUrl: formData.photoUrl,
        status: formData.status,
        bio: formData.bio,
        isCaptain: formData.isCaptain,
        isViceCaptain: formData.isViceCaptain,
        contact: {
          email: formData.email,
          phone: formData.phone,
        },
        stats: {
          matches: Number(formData.stats.matches) || 0,
          runs: Number(formData.stats.runs) || 0,
          wickets: Number(formData.stats.wickets) || 0,
          highestScore: Number(formData.stats.highestScore) || 0,
          battingAverage: Number(formData.stats.battingAverage) || 0,
          strikeRate: Number(formData.stats.strikeRate) || 0,
          fifties: Number(formData.stats.fifties) || 0,
          hundreds: Number(formData.stats.hundreds) || 0,
          fours: Number(formData.stats.fours) || 0,
          sixes: Number(formData.stats.sixes) || 0,
          bowlingEconomy: Number(formData.stats.bowlingEconomy) || 0,
          bestBowling: formData.stats.bestBowling || '0/0',
          bowlingAverage: Number(formData.stats.bowlingEconomy) || 0,
          overs: Number(formData.stats.overs) || 0,
          maidens: 0,
          catches: Number(formData.stats.catches) || 0,
          runOuts: 0,
          stumpings: 0,
        },
      });
    }

    setIsModalOpen(false);
  };

  const filteredPlayers = players.filter((p) => {
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jerseyNumber.toString().includes(searchQuery) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header & Add Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Player Roster Management
            </h1>
            <p className="text-xs text-slate-500">
              Manage registered athletes, assign status, update jersey numbers, and monitor health clearance.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Induct New Player</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {(['All', 'Active', 'Injured', 'Recovering', 'Archived'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  statusFilter === st
                    ? 'bg-[#0B222E] text-[#00B4D8]'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

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

        {/* Players Data Table */}
        <div className="bg-white rounded-3xl border border-[#D1EAEF] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Player</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Styles</th>
                  <th className="py-3 px-4">Career Stats</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#005F73]">
                      #{player.jerseyNumber < 10 ? `0${player.jerseyNumber}` : player.jerseyNumber}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={player.photoUrl}
                          alt={player.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{player.name}</span>
                            {player.isCaptain && (
                              <span className="text-[9px] bg-[#881337] text-white px-1.5 py-0.2 rounded font-bold">
                                (C)
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Age {player.age} • Joined {player.joinedYear}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#005F73] font-bold text-[11px]">
                        {player.role}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">
                      <div>{player.battingStyle}</div>
                      <div className="text-[10px] text-slate-400">{player.bowlingStyle}</div>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <div>
                        <strong className="text-[#0A9396]">{player.stats.runs}</strong> runs ({player.stats.matches}m)
                      </div>
                      <div className="text-[10px] text-[#881337]">
                        <strong>{player.stats.wickets}</strong> wkts
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          player.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : player.status === 'Injured'
                            ? 'bg-red-100 text-red-800'
                            : player.status === 'Recovering'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {player.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(player)}
                        className="p-1.5 text-slate-500 hover:text-[#00B4D8] hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Player Info"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => archivePlayer(player.id)}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        title="Archive Player"
                      >
                        <Archive className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Permanently delete player "${player.name}" (#${player.jerseyNumber})? This cannot be undone.`)) {
                            deletePlayer(player.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Permanently Delete Player"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <Link
                        href={`/players/${player.id}`}
                        className="p-1.5 text-slate-500 hover:text-[#0A9396] hover:bg-slate-100 rounded-lg inline-block transition-colors"
                        title="View Public Profile"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Player Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#0B222E]">
                  {editingPlayerId ? 'Edit Player Profile' : 'Induct New Athlete to Roster'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePlayer} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Shaheen Afridi"
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Display Short Name</label>
                    <input
                      type="text"
                      value={formData.shortName}
                      onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                      placeholder="e.g. S. Afridi"
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jersey Number</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={99}
                      value={formData.jerseyNumber}
                      onChange={(e) => setFormData({ ...formData, jerseyNumber: Number(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Playing Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as PlayerRole })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-Rounder">All-Rounder</option>
                      <option value="Wicketkeeper">Wicketkeeper</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Batting Style</label>
                    <select
                      value={formData.battingStyle}
                      onChange={(e) => setFormData({ ...formData, battingStyle: e.target.value as BattingStyle })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Right Handed">Right Handed</option>
                      <option value="Left Handed">Left Handed</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Bowling Style</label>
                    <select
                      value={formData.bowlingStyle}
                      onChange={(e) => setFormData({ ...formData, bowlingStyle: e.target.value as BowlingStyle })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Right Arm Fast">Right Arm Fast</option>
                      <option value="Right Arm Fast Medium">Right Arm Fast Medium</option>
                      <option value="Right Arm Medium">Right Arm Medium</option>
                      <option value="Right Arm Off-Spin">Right Arm Off-Spin</option>
                      <option value="Right Arm Leg-Spin">Right Arm Leg-Spin</option>
                      <option value="Left Arm Fast">Left Arm Fast</option>
                      <option value="Left Arm Medium">Left Arm Medium</option>
                      <option value="Left Arm Orthodox">Left Arm Orthodox</option>
                      <option value="Left Arm Chinaman">Left Arm Chinaman</option>
                      <option value="None">None (Pure Batsman/Keeper)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Age</label>
                    <input
                      type="number"
                      min={16}
                      max={45}
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as PlayerStatus })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Active">Active</option>
                      <option value="Injured">Injured</option>
                      <option value="Recovering">Recovering</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <ImageUploadInput
                    label="Player Photograph"
                    value={formData.photoUrl}
                    onChange={(url) => setFormData((prev) => ({ ...prev, photoUrl: url }))}
                    helperText="Upload athlete JPG/PNG photo from device or enter image URL."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Biography / Career Profile</label>
                  <textarea
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                {/* Career Statistics Section */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00B4D8]" />
                      Player Career Statistics (Auto-Calculates Totals)
                    </span>
                    <span className="text-[10px] text-[#0A9396] font-mono font-bold">Live Synced</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Career Matches</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.stats.matches}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, matches: Number(e.target.value) }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#005F73] block mb-1">Career Runs (Score)</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.stats.runs}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, runs: Number(e.target.value) }
                        })}
                        className="w-full border border-cyan-300 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-cyan-50/50 font-mono font-bold text-cyan-900"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-[#881337] block mb-1">Career Wickets</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.stats.wickets}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, wickets: Number(e.target.value) }
                        })}
                        className="w-full border border-rose-300 rounded-xl p-2 outline-none focus:border-[#881337] bg-rose-50/50 font-mono font-bold text-rose-900"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Highest Score</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.stats.highestScore}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, highestScore: Number(e.target.value) }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Batting Average</label>
                      <input
                        type="number"
                        step="0.01"
                        min={0}
                        value={formData.stats.battingAverage}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, battingAverage: Number(e.target.value) }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Strike Rate</label>
                      <input
                        type="number"
                        step="0.1"
                        min={0}
                        value={formData.stats.strikeRate}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, strikeRate: Number(e.target.value) }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">50s / 100s</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          min={0}
                          placeholder="50s"
                          value={formData.stats.fifties}
                          onChange={(e) => setFormData({
                            ...formData,
                            stats: { ...formData.stats, fifties: Number(e.target.value) }
                          })}
                          className="w-1/2 border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                        />
                        <input
                          type="number"
                          min={0}
                          placeholder="100s"
                          value={formData.stats.hundreds}
                          onChange={(e) => setFormData({
                            ...formData,
                            stats: { ...formData.stats, hundreds: Number(e.target.value) }
                          })}
                          className="w-1/2 border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">4s / 6s Hit</label>
                      <div className="flex gap-1">
                        <input
                          type="number"
                          min={0}
                          placeholder="4s"
                          value={formData.stats.fours}
                          onChange={(e) => setFormData({
                            ...formData,
                            stats: { ...formData.stats, fours: Number(e.target.value) }
                          })}
                          className="w-1/2 border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                        />
                        <input
                          type="number"
                          min={0}
                          placeholder="6s"
                          value={formData.stats.sixes}
                          onChange={(e) => setFormData({
                            ...formData,
                            stats: { ...formData.stats, sixes: Number(e.target.value) }
                          })}
                          className="w-1/2 border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Economy</label>
                      <input
                        type="number"
                        step="0.01"
                        min={0}
                        value={formData.stats.bowlingEconomy}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, bowlingEconomy: Number(e.target.value) }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Best Bowling</label>
                      <input
                        type="text"
                        placeholder="e.g. 4/18"
                        value={formData.stats.bestBowling}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, bestBowling: e.target.value }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Catches Taken</label>
                      <input
                        type="number"
                        min={0}
                        value={formData.stats.catches}
                        onChange={(e) => setFormData({
                          ...formData,
                          stats: { ...formData.stats, catches: Number(e.target.value) }
                        })}
                        className="w-full border border-slate-200 rounded-xl p-2 outline-none focus:border-[#00B4D8] bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 font-bold shadow-md transition-all"
                  >
                    {editingPlayerId ? 'Save Updates' : 'Add Player to Roster'}
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

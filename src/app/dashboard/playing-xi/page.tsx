'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CricketPitchField } from '@/components/cricket/CricketPitchField';
import { useApp } from '@/lib/store/appStore';
import { Target, Users, Shield, Award, CheckCircle2, Plus, Trash2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DashboardPlayingXIPage() {
  const { players, playingXIIds, togglePlayerInPlayingXI, setPlayingXIIds, currentRole } = useApp();
  const [successMsg, setSuccessMsg] = useState('');

  const canEdit = ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH'].includes(currentRole);

  const selectedPlayers = playingXIIds
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean);

  const benchPlayers = players.filter((p) => !playingXIIds.includes(p.id));

  const handleAnnounceXI = () => {
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch (e) {}
    setSuccessMsg('Playing XI successfully locked & announced to squad members!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Playing XI & Tactical Field Formation
            </h1>
            <p className="text-xs text-slate-500">
              Select 11 match-day starters, designate captain/keeper, and align defensive ring positions.
            </p>
          </div>

          {canEdit && (
            <button
              onClick={handleAnnounceXI}
              disabled={selectedPlayers.length !== 11}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 ${
                selectedPlayers.length === 11
                  ? 'bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Announce Official XI ({selectedPlayers.length}/11)</span>
            </button>
          )}
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Split Grid: Left Lineup Selectors & Right Stadium Field Pitch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): 11 Starters + Bench */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Selected 11 Starters */}
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#00B4D8]" />
                  <h3 className="font-bold text-base text-[#0B222E]">
                    Starting XI ({selectedPlayers.length} / 11)
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#005F73] bg-[#E0F7FA] px-2.5 py-0.5 rounded-full">
                  Primary Lineup
                </span>
              </div>

              <div className="space-y-2">
                {selectedPlayers.map((player: any, idx) => (
                  <div
                    key={player.id}
                    className="p-2.5 rounded-2xl bg-[#F8FCFD] border border-[#D1EAEF] flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 font-mono text-xs text-slate-400 font-bold">{idx + 1}</span>
                      <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#0B222E] flex items-center gap-1.5">
                          <span>{player.name}</span>
                          {player.isCaptain && (
                            <span className="text-[9px] bg-[#881337] text-white px-1.5 py-0.2 rounded font-bold">
                              (C)
                            </span>
                          )}
                          {player.isViceCaptain && (
                            <span className="text-[9px] bg-[#0A9396] text-white px-1.5 py-0.2 rounded font-bold">
                              (VC)
                            </span>
                          )}
                          {player.isWicketkeeper && (
                            <span className="text-[9px] bg-[#0B222E] text-[#00E5FF] px-1.5 py-0.2 rounded font-bold">
                              (WK)
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          #{player.jerseyNumber} • {player.role}
                        </span>
                      </div>
                    </div>

                    {canEdit && (
                      <button
                        onClick={() => togglePlayerInPlayingXI(player.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Remove from Starting XI"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bench / Reserves */}
            <div className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400" />
                  <h3 className="font-bold text-base text-[#0B222E]">
                    Substitutes / Reserves ({benchPlayers.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                {benchPlayers.map((player) => (
                  <div
                    key={player.id}
                    className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={player.photoUrl}
                        alt={player.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-800">{player.name}</div>
                        <span className="text-[10px] text-slate-400">
                          #{player.jerseyNumber} • {player.role}
                        </span>
                      </div>
                    </div>

                    {canEdit && (
                      <button
                        onClick={() => togglePlayerInPlayingXI(player.id)}
                        disabled={selectedPlayers.length >= 11}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          selectedPlayers.length < 11
                            ? 'bg-[#0B222E] text-white hover:bg-[#00B4D8] hover:text-slate-950'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to XI</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Stadium Pitch Field Layout */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[#0B222E]">
                Defensive Field Formation Diagram
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                Click any player on pitch to inspect
              </span>
            </div>
            
            <CricketPitchField interactive={true} />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

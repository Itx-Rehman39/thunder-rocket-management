'use client';

import React, { useState } from 'react';
import { Player } from '@/types';
import { useApp } from '@/lib/store/appStore';
import { Shield, Award, Eye, UserCheck } from 'lucide-react';
import Link from 'next/link';

interface CricketPitchFieldProps {
  interactive?: boolean;
}

// Tactical field coordinate percentages on a 100x100 stadium layout
const FIELD_POSITIONS = [
  { role: 'WK', title: 'Wicketkeeper', x: 50, y: 76 },
  { role: 'SLIP', title: 'First Slip', x: 62, y: 76 },
  { role: 'POINT', title: 'Backward Point', x: 78, y: 60 },
  { role: 'COVER', title: 'Extra Cover', x: 26, y: 55 },
  { role: 'MID_OFF', title: 'Mid-off', x: 38, y: 38 },
  { role: 'MID_ON', title: 'Mid-on', x: 62, y: 38 },
  { role: 'BOWLER', title: 'Bowler', x: 50, y: 32 },
  { role: 'MID_WICKET', title: 'Mid-wicket', x: 74, y: 44 },
  { role: 'SQUARE_LEG', title: 'Deep Square Leg', x: 82, y: 26 },
  { role: 'LONG_OFF', title: 'Long-off', x: 22, y: 22 },
  { role: 'LONG_ON', title: 'Deep Mid-Wicket / Long-on', x: 68, y: 15 },
];

export const CricketPitchField: React.FC<CricketPitchFieldProps> = ({ interactive = true }) => {
  const { players, playingXIIds, togglePlayerInPlayingXI } = useApp();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Get active 11 players
  const activeXI = playingXIIds
    .map((id) => players.find((p) => p.id === id))
    .filter(Boolean) as Player[];

  return (
    <div className="relative w-full bg-[#081B24] rounded-3xl p-4 sm:p-8 overflow-hidden shadow-2xl border border-[#0A9396]/30">
      
      {/* Stadium Pitch Canvas */}
      <div className="relative w-full aspect-[4/3] max-h-[640px] mx-auto rounded-full overflow-hidden border-4 border-[#0A9396]/40 shadow-inner">
        
        {/* Lush Turf Radial Gradient with Field Cut Stripes */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-[#14532D] via-[#166534] to-[#15803D]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.15) 0%, transparent 70%),
              repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, rgba(255, 255, 255, 0.03) 28px, transparent 28px, transparent 56px)
            `
          }}
        />

        {/* Outer Boundary Rope (White Circle) */}
        <div className="absolute inset-4 rounded-full border-2 border-white/30 border-dashed pointer-events-none" />

        {/* 30-Yard Inner Circle (Teal Glowing Ring) */}
        <div className="absolute inset-[18%] rounded-full border-2 border-[#00B4D8]/50 shadow-[0_0_15px_rgba(0,180,216,0.2)] pointer-events-none" />

        {/* Center Cricket Pitch Rectangle (Clay & Turf) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-24 h-44 sm:h-56 md:h-64 bg-[#C2B280] rounded-sm border border-[#A89868] shadow-md flex flex-col justify-between p-2">
          {/* Bowling Crease & Stumps Top */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full h-0.5 bg-white shadow-sm" />
            <div className="flex gap-1 mt-1">
              <span className="w-1 h-3 bg-amber-800 rounded-t-sm" />
              <span className="w-1 h-3 bg-amber-800 rounded-t-sm" />
              <span className="w-1 h-3 bg-amber-800 rounded-t-sm" />
            </div>
          </div>

          {/* Pitch Center Emblem */}
          <div className="text-[9px] font-black text-amber-900/40 text-center tracking-widest uppercase">
            TR PITCH
          </div>

          {/* Batting Crease & Stumps Bottom */}
          <div className="w-full flex flex-col items-center">
            <div className="flex gap-1 mb-1">
              <span className="w-1 h-3 bg-amber-800 rounded-t-sm" />
              <span className="w-1 h-3 bg-amber-800 rounded-t-sm" />
              <span className="w-1 h-3 bg-amber-800 rounded-t-sm" />
            </div>
            <div className="w-full h-0.5 bg-white shadow-sm" />
          </div>
        </div>

        {/* 11 Positioned Player Nodes */}
        {activeXI.map((player, idx) => {
          const position = FIELD_POSITIONS[idx] || { role: 'FLD', title: 'Fielder', x: 50, y: 50 };
          const isSelected = selectedPlayer?.id === player.id;

          return (
            <div
              key={player.id}
              onClick={() => interactive && setSelectedPlayer(player)}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 cursor-pointer group flex flex-col items-center transition-all duration-300 hover:scale-125"
            >
              {/* Player Avatar Bubble */}
              <div
                className={`relative w-8 h-8 sm:w-11 sm:h-11 rounded-full p-0.5 transition-all shadow-lg ${
                  isSelected
                    ? 'ring-4 ring-[#00DF82] scale-110 bg-[#00DF82]'
                    : 'bg-[#0B222E] group-hover:ring-2 group-hover:ring-[#00B4D8]'
                }`}
              >
                <img
                  src={player.photoUrl}
                  alt={player.name}
                  className="w-full h-full object-cover rounded-full"
                />

                {/* Badge for Captain / Vice Captain / Wicketkeeper */}
                {player.isCaptain && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#881337] text-white text-[9px] font-black flex items-center justify-center border border-white shadow">
                    C
                  </span>
                )}
                {player.isViceCaptain && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0A9396] text-white text-[9px] font-black flex items-center justify-center border border-white shadow">
                    VC
                  </span>
                )}
                {player.isWicketkeeper && (
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0B222E] text-[#00E5FF] text-[8px] font-black flex items-center justify-center border border-[#00B4D8] shadow">
                    WK
                  </span>
                )}
              </div>

              {/* Name Tag Pill */}
              <div className="mt-1 px-1.5 py-0.5 rounded-md bg-[#071820]/90 border border-[#0A9396]/40 text-center shadow-md backdrop-blur-xs whitespace-nowrap">
                <span className="text-[10px] sm:text-xs font-bold text-white block leading-tight">
                  {player.shortName}
                </span>
                <span className="text-[8px] text-[#00B4D8] font-bold uppercase tracking-tight block">
                  {position.title}
                </span>
              </div>
            </div>
          );
        })}

      </div>

      {/* Selected Player Details Modal / Drawer Preview */}
      {selectedPlayer && (
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-[#0B222E] border border-[#00B4D8]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={selectedPlayer.photoUrl}
              alt={selectedPlayer.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#00B4D8]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00DF82] bg-[#0F2C3A] px-2 py-0.5 rounded">
                  #{selectedPlayer.jerseyNumber}
                </span>
                <h4 className="text-base font-bold text-white">
                  {selectedPlayer.name}
                </h4>
                {selectedPlayer.isCaptain && (
                  <span className="text-[10px] bg-[#881337] text-white px-1.5 py-0.5 rounded font-bold">
                    Captain
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedPlayer.role} • {selectedPlayer.battingStyle} • {selectedPlayer.stats.runs} Runs • {selectedPlayer.stats.wickets} Wkts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Link
              href={`/players/${selectedPlayer.id}`}
              className="px-4 py-2 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-cyan-300 text-xs font-bold transition-colors border border-[#0A9396]/40 flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Profile</span>
            </Link>

            <button
              onClick={() => setSelectedPlayer(null)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Field Controls Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3 border-t border-slate-800/80 pt-4">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#881337]" />
            <span>(C) Captain</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0A9396]" />
            <span>(VC) Vice Captain</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B4D8]" />
            <span>(WK) Wicketkeeper</span>
          </span>
        </div>

        <div className="text-slate-400 text-[11px]">
          Formation: <strong className="text-white">T20 Attacking Ring (4-3-3)</strong> • 11 Active Players
        </div>
      </div>

    </div>
  );
};

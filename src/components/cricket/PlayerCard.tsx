import React from 'react';
import Link from 'next/link';
import { Player } from '@/types';
import { Award, ChevronRight, Activity } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  variant?: 'grid' | 'compact';
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, variant = 'grid' }) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#D1EAEF] shadow-sm hover:shadow-xl hover:border-[#00B4D8]/50 transition-all duration-300 flex flex-col justify-between">
      {/* Top Banner with Camouflage Accent */}
      <div className="h-2 bg-gradient-to-r from-[#0B222E] via-[#0A9396] to-[#00B4D8]" />

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Header row: Jersey # and Captaincy/WK Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#005F73] font-black text-xs tracking-wider border border-[#00B4D8]/30">
            #{player.jerseyNumber < 10 ? `0${player.jerseyNumber}` : player.jerseyNumber}
          </div>

          <div className="flex items-center gap-1.5">
            {player.isCaptain && (
              <span className="px-2 py-0.5 rounded bg-[#881337] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Captain
              </span>
            )}
            {player.isViceCaptain && (
              <span className="px-2 py-0.5 rounded bg-[#0A9396] text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Vice Captain
              </span>
            )}
            {player.isWicketkeeper && (
              <span className="px-2 py-0.5 rounded bg-[#0B222E] text-[#67E8F9] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                WK
              </span>
            )}
          </div>
        </div>

        {/* Player Photo with Glow Ring */}
        <div className="relative mx-auto my-2 w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-105 group-hover:border-[#00B4D8] transition-all duration-300">
          <img
            src={player.photoUrl}
            alt={player.name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          {/* Subtle camo overlay on bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B222E]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Player Name and Role */}
        <div className="text-center mt-3 flex-1">
          <h3 className="text-lg font-bold text-[#0B222E] group-hover:text-[#0A9396] transition-colors leading-tight">
            {player.name}
          </h3>
          <p className="text-xs font-semibold text-[#00B4D8] mt-0.5 uppercase tracking-wide">
            {player.role}
          </p>

          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            {player.battingStyle} • {player.bowlingStyle !== 'None' ? player.bowlingStyle : 'Wicketkeeper'}
          </p>

          {/* Quick Stat Pill */}
          <div className="mt-3.5 py-1.5 px-3 bg-[#F0FDFA] rounded-xl border border-[#D1EAEF] flex items-center justify-around text-xs font-bold text-[#0F2C3A]">
            <span className="flex items-center gap-1">
              <span className="text-[#0A9396]">{player.stats.runs}</span>
              <span className="text-[10px] font-normal text-slate-500 uppercase">Runs</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <span className="text-[#881337]">{player.stats.wickets}</span>
              <span className="text-[10px] font-normal text-slate-500 uppercase">Wickets</span>
            </span>
          </div>
        </div>

        {/* View Profile Action Link */}
        <Link
          href={`/players/${player.id}`}
          className="mt-4 w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#00B4D8] text-slate-700 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 border border-slate-200 hover:border-transparent shadow-sm"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

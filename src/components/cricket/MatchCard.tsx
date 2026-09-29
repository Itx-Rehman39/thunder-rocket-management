import React from 'react';
import Link from 'next/link';
import { Match } from '@/types';
import { useApp } from '@/lib/store/appStore';
import { Calendar, Clock, MapPin, Trophy, Play, CheckCircle, Radio } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { currentRole } = useApp();
  const canLiveScore = ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'PERFORMANCE_ANALYST'].includes(currentRole);

  const isLive = match.status === 'Live';
  const isCompleted = match.status === 'Completed';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#D1EAEF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Status Header */}
      <div className="px-5 py-3 bg-[#F8FCFD] border-b border-[#D1EAEF] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#005F73] px-2.5 py-0.5 rounded-full bg-[#E0F7FA] border border-[#00B4D8]/20">
            {match.totalOvers ? `${match.totalOvers} Overs` : match.matchType}
          </span>
          <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
            {match.competition}
          </span>
        </div>

        {/* Status Pill */}
        <div>
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold text-xs uppercase tracking-wider animate-pulse">
              <Radio className="w-3 h-3 text-red-600 animate-spin" />
              LIVE
            </span>
          ) : isCompleted ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#0A9396] font-bold text-xs">
              <CheckCircle className="w-3 h-3 text-[#00DF82]" />
              Completed
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
              Upcoming
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Teams and Scores Display */}
        <div className="space-y-4">
          {/* Thunder Rockets Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0B222E] flex items-center justify-center text-white font-bold text-xs shadow-sm border border-[#00B4D8]/30">
                TR
              </div>
              <div>
                <span className="font-extrabold text-[#0B222E] text-base group-hover:text-[#0A9396] transition-colors">
                  Thunder Rockets
                </span>
                <span className="text-[11px] text-slate-400 block">Home Club</span>
              </div>
            </div>

            <div className="text-right">
              {match.thunderRocketsScore ? (
                <div>
                  <span className="font-athletic text-2xl font-black text-[#0B222E]">
                    {match.thunderRocketsScore.runs}/{match.thunderRocketsScore.wickets}
                  </span>
                  <span className="text-xs text-slate-500 font-medium ml-1.5">
                    ({match.thunderRocketsScore.overs} ov)
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400 font-medium italic">Yet to bat</span>
              )}
            </div>
          </div>

          {/* VS Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-[11px] font-black text-slate-400 uppercase tracking-widest">
              VS
            </span>
          </div>

          {/* Opponent Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs border border-slate-200">
                {match.opponent.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-bold text-slate-800 text-base">
                  {match.opponent}
                </span>
                <span className="text-[11px] text-slate-400 block">Challenger</span>
              </div>
            </div>

            <div className="text-right">
              {match.opponentScore ? (
                <div>
                  <span className="font-athletic text-2xl font-black text-slate-700">
                    {match.opponentScore.runs}/{match.opponentScore.wickets}
                  </span>
                  <span className="text-xs text-slate-500 font-medium ml-1.5">
                    ({match.opponentScore.overs} ov)
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400 font-medium italic">Yet to bat</span>
              )}
            </div>
          </div>
        </div>

        {/* Result or Match Info Pill */}
        <div className="mt-5">
          {match.result ? (
            <div className="p-2.5 rounded-xl bg-[#E0F7FA]/70 border border-[#00B4D8]/30 text-center">
              <p className="text-xs font-bold text-[#005F73]">
                🏆 {match.result}
              </p>
            </div>
          ) : isLive && match.liveState?.requiredRuns ? (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <p className="text-xs font-bold text-amber-900">
                Need {match.liveState.requiredRuns} runs in {match.liveState.ballsRemaining} balls
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 text-xs text-slate-500 py-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#0A9396]" />
                <span>{match.date} • {match.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span className="truncate">{match.venue}</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions Button Group */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
          <Link
            href={`/matches/${match.id}`}
            className="flex-1 py-2 px-3 rounded-xl bg-[#0B222E] hover:bg-[#0F2C3A] text-white font-bold text-xs text-center transition-colors shadow-sm"
          >
            Match Center
          </Link>

          <Link
            href={`/scorecards/${match.id}`}
            className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#E0F7FA] text-[#005F73] font-bold text-xs text-center transition-colors border border-slate-200"
          >
            Scorecard
          </Link>

          {isLive && canLiveScore && (
            <Link
              href="/dashboard/scoring"
              className="py-2 px-3 rounded-xl bg-[#881337] hover:bg-[#9F1239] text-white font-bold text-xs flex items-center gap-1 transition-colors shadow-sm"
              title="Open Live Scoring Console"
            >
              <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>Score</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

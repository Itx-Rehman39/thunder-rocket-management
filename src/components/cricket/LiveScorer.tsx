'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/appStore';
import { Match, Player } from '@/types';
import { Radio, RefreshCw, Zap, ShieldAlert, Award, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LiveScorerProps {
  matchId?: string;
}

export const LiveScorer: React.FC<LiveScorerProps> = ({ matchId = 'm-2' }) => {
  const {
    matches,
    players,
    recordBall,
    rotateStrike,
    setLiveStriker,
    setLiveNonStriker,
    setLiveBowler,
  } = useApp();

  const match = matches.find((m) => m.id === matchId) || matches[1];

  const [wicketModalOpen, setWicketModalOpen] = useState(false);
  const [selectedWicketType, setSelectedWicketType] = useState<any>('Caught');
  const [customCommentary, setCustomCommentary] = useState('');

  const live = match?.liveState || {
    battingTeam: 'Thunder Rockets',
    currentOver: 16,
    currentBall: 2,
    strikerId: 'p-1',
    nonStrikerId: 'p-2',
    currentBowlerId: 'w-bowler',
    target: 173,
    requiredRuns: 31,
    ballsRemaining: 22,
    recentBalls: ['1', '4', '2', '0', '6', '1'],
    timeline: [],
  };

  const striker = players.find((p) => p.id === live.strikerId) || players[0];
  const nonStriker = players.find((p) => p.id === live.nonStrikerId) || players[1];

  const currentScore = match?.thunderRocketsScore || { runs: 142, wickets: 3, overs: 16.2 };
  const currentRR = (currentScore.runs / (Math.max(1, currentScore.overs))).toFixed(2);
  const reqRR =
    live.requiredRuns && live.ballsRemaining
      ? ((live.requiredRuns / live.ballsRemaining) * 6).toFixed(2)
      : '0.00';

  const handleScoreRuns = (runs: number) => {
    if (runs === 6) {
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      } catch (e) {}
    }
    recordBall(match.id, {
      runs,
      commentary: customCommentary.trim() || undefined,
    });
    setCustomCommentary('');
  };

  const handleExtra = (type: 'wide' | 'noBall' | 'bye' | 'legBye') => {
    recordBall(match.id, {
      runs: 0,
      isWide: type === 'wide',
      isNoBall: type === 'noBall',
      isBye: type === 'bye',
      isLegBye: type === 'legBye',
      commentary: customCommentary.trim() || `${type.toUpperCase()} signal by umpire!`,
    });
    setCustomCommentary('');
  };

  const handleWicketConfirm = () => {
    recordBall(match.id, {
      runs: 0,
      isWicket: true,
      wicketType: selectedWicketType,
      commentary: customCommentary.trim() || `OUT! ${striker.name} ${selectedWicketType}!`,
    });
    setWicketModalOpen(false);
    setCustomCommentary('');
  };

  return (
    <div className="bg-[#0B222E] rounded-3xl p-4 sm:p-6 text-white border border-[#0A9396]/40 shadow-2xl space-y-6">
      
      {/* Live Header Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#881337] to-[#700F2B] flex items-center justify-center shadow-lg">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-[#00E5FF]">
                LIVE SCORING CONSOLE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-red-600/30 text-red-400 text-[10px] font-bold">
                OFFICIAL UMPIRE FEED
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Thunder Rockets vs {match?.opponent || 'Opponent'}
            </h3>
          </div>
        </div>

        {/* Big Score Billboard */}
        <div className="flex items-baseline gap-3 bg-[#071820] px-5 py-2.5 rounded-2xl border border-[#0A9396]/30">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
              Thunder Rockets Batting
            </span>
            <span className="font-athletic text-3xl font-black text-[#00E5FF]">
              {currentScore.runs}/{currentScore.wickets}
            </span>
          </div>
          <span className="text-slate-400 font-mono text-sm">
            ({currentScore.overs} / 20 ov)
          </span>
        </div>
      </div>

      {/* Target & Run Rates Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#071820]/80 p-3 rounded-2xl border border-slate-800 text-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Target</span>
          <span className="text-base font-bold text-white">{live.target || 'N/A'}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Need</span>
          <span className="text-base font-bold text-amber-400">
            {live.requiredRuns ?? 0} runs in {live.ballsRemaining ?? 0}b
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Current RR</span>
          <span className="text-base font-bold text-[#00DF82]">{currentRR}</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Required RR</span>
          <span className="text-base font-bold text-cyan-300">{reqRR}</span>
        </div>
      </div>

      {/* Crease Selectors: Striker & Non-Striker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Striker Card */}
        <div className="p-4 rounded-2xl bg-[#0F2C3A] border-2 border-[#00DF82]/60 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#00DF82]">
              <Zap className="w-3.5 h-3.5 fill-[#00DF82]" />
              Striker (On Strike)
            </span>
            <button
              onClick={() => rotateStrike(match.id)}
              className="text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 bg-[#13384A] px-2 py-1 rounded-lg"
              title="Rotate Strike"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Rotate Strike</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={striker.photoUrl}
              alt={striker.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#00DF82]"
            />
            <div className="flex-1">
              <select
                value={live.strikerId}
                onChange={(e) => setLiveStriker(match.id, e.target.value)}
                className="w-full bg-[#071820] text-white text-sm font-bold border border-slate-700 rounded-lg p-1.5 focus:border-[#00DF82] outline-none"
              >
                {players.map((p) => (
                  <option key={p.id} value={p.id}>
                    #{p.jerseyNumber} {p.name} ({p.role})
                  </option>
                ))}
              </select>
              <div className="text-xs text-slate-400 mt-1">
                Batting Style: <strong className="text-slate-200">{striker.battingStyle}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Striker Card */}
        <div className="p-4 rounded-2xl bg-[#0F2C3A] border border-slate-700 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">
              Non-Striker
            </span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={nonStriker.photoUrl}
              alt={nonStriker.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-slate-600"
            />
            <div className="flex-1">
              <select
                value={live.nonStrikerId}
                onChange={(e) => setLiveNonStriker(match.id, e.target.value)}
                className="w-full bg-[#071820] text-white text-sm font-bold border border-slate-700 rounded-lg p-1.5 focus:border-[#00B4D8] outline-none"
              >
                {players.map((p) => (
                  <option key={p.id} value={p.id}>
                    #{p.jerseyNumber} {p.name} ({p.role})
                  </option>
                ))}
              </select>
              <div className="text-xs text-slate-400 mt-1">
                Batting Style: <strong className="text-slate-200">{nonStriker.battingStyle}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scoring Buttons */}
      <div className="space-y-4 bg-[#071820] p-4 sm:p-5 rounded-2xl border border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Record Ball Runs:
          </span>
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {[0, 1, 2, 3, 4, 6].map((run) => (
              <button
                key={run}
                onClick={() => handleScoreRuns(run)}
                className={`py-3 sm:py-4 rounded-xl font-athletic text-2xl font-black transition-all transform active:scale-95 shadow-md ${
                  run === 6
                    ? 'bg-gradient-to-r from-[#9F1239] to-[#700F2B] text-white hover:brightness-110 shadow-[0_0_15px_rgba(159,18,57,0.4)]'
                    : run === 4
                    ? 'bg-gradient-to-r from-[#00B4D8] to-[#0A9396] text-white hover:brightness-110'
                    : run === 0
                    ? 'bg-[#0F2C3A] text-slate-300 hover:bg-[#13384A]'
                    : 'bg-[#13384A] text-white hover:bg-[#00B4D8] hover:text-[#06161F]'
                }`}
              >
                {run}
              </button>
            ))}
          </div>
        </div>

        {/* Extras and Wicket Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleExtra('wide')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-xs font-bold text-amber-300 border border-amber-500/30 transition-colors"
          >
            +1 Wide (WD)
          </button>
          <button
            onClick={() => handleExtra('noBall')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-xs font-bold text-orange-300 border border-orange-500/30 transition-colors"
          >
            +1 No Ball (NB)
          </button>
          <button
            onClick={() => handleExtra('bye')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-xs font-bold text-cyan-300 border border-[#00B4D8]/30 transition-colors"
          >
            Bye (B)
          </button>
          <button
            onClick={() => handleExtra('legBye')}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0F2C3A] hover:bg-[#13384A] text-xs font-bold text-teal-300 border border-[#0A9396]/30 transition-colors"
          >
            Leg Bye (LB)
          </button>
          
          {/* Red Wicket Button */}
          <button
            onClick={() => setWicketModalOpen(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>WICKET! (OUT)</span>
          </button>
        </div>

        {/* Quick Commentary Input */}
        <div className="pt-2">
          <input
            type="text"
            placeholder="Add custom ball commentary (optional)..."
            value={customCommentary}
            onChange={(e) => setCustomCommentary(e.target.value)}
            className="w-full bg-[#0F2C3A] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#00B4D8]"
          />
        </div>
      </div>

      {/* Recent Balls Carousel Bar */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
          This Over Delivery History:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(live.recentBalls || []).map((ball, idx) => (
            <div
              key={idx}
              className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${
                ball === 'W'
                  ? 'bg-red-600 text-white'
                  : ball === '6'
                  ? 'bg-[#881337] text-white border border-[#9F1239]'
                  : ball === '4'
                  ? 'bg-[#00B4D8] text-[#06161F]'
                  : ball === '0'
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-[#0F2C3A] text-white border border-slate-700'
              }`}
            >
              {ball}
            </div>
          ))}
        </div>
      </div>

      {/* Wicket Confirmation Modal */}
      {wicketModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0B222E] border-2 border-red-500/60 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <ShieldAlert className="w-6 h-6" />
              <h4 className="text-lg font-black uppercase tracking-wider text-white">
                Record Fall of Wicket
              </h4>
            </div>

            <p className="text-xs text-slate-300">
              Dismissing batsman: <strong className="text-white font-bold">{striker.name}</strong>
            </p>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">
                Select Dismissal Method:
              </label>
              <select
                value={selectedWicketType}
                onChange={(e) => setSelectedWicketType(e.target.value)}
                className="w-full bg-[#071820] text-white text-sm border border-slate-700 rounded-xl p-2.5 outline-none focus:border-red-500"
              >
                <option value="Bowled">Bowled (Clean bowled)</option>
                <option value="Caught">Caught (Catch taken)</option>
                <option value="LBW">LBW (Leg before wicket)</option>
                <option value="Run Out">Run Out</option>
                <option value="Stumped">Stumped (Keeper dismisses)</option>
                <option value="Hit Wicket">Hit Wicket</option>
                <option value="Retired">Retired Hurt</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setWicketModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleWicketConfirm}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-lg"
              >
                Confirm Wicket
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LiveScorer } from '@/components/cricket/LiveScorer';
import { useApp } from '@/lib/store/appStore';
import { Radio, RefreshCw, Layers } from 'lucide-react';
import Link from 'next/link';

export default function DashboardScoringPage() {
  const { matches } = useApp();
  const [selectedMatchId, setSelectedMatchId] = useState<string>('m-2');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <h1 className="text-2xl font-bold text-[#0B222E]">
                Official Live Ball-by-Ball Scoring Console
              </h1>
            </div>
            <p className="text-xs text-slate-500">
              Record live delivery outcomes, umpire signals, strike rotation, and fall of wickets in real time.
            </p>
          </div>

          {/* Match selector dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Select Fixture:</span>
            <select
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00B4D8]"
            >
              {matches.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.opponent} ({m.status}) - {m.date}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Scorer Embedded Engine */}
        <LiveScorer matchId={selectedMatchId} />

        {/* Quick Links */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>Official Digital Scorebook • Thunder Rockets Club Operations</span>
          <Link
            href={`/scorecards/${selectedMatchId}`}
            className="font-bold text-[#0A9396] hover:text-[#00B4D8] flex items-center gap-1"
          >
            <span>View Generated Public Scorecard</span>
          </Link>
        </div>

      </div>
    </DashboardLayout>
  );
}

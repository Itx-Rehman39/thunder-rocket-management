'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { AttendanceStatus } from '@/types';
import { ClipboardCheck, CheckCircle2, XCircle, Clock, AlertTriangle, UserCheck } from 'lucide-react';

export default function DashboardAttendancePage() {
  const { players, trainingSessions, updatePlayerAttendance, currentRole } = useApp();
  const [selectedSessionId, setSelectedSessionId] = useState(trainingSessions[0]?.id || 'tr-1');

  const session = trainingSessions.find((s) => s.id === selectedSessionId) || trainingSessions[0];
  const canMark = ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'FITNESS_COACH'].includes(currentRole);

  const getPlayerStatus = (playerId: string): AttendanceStatus => {
    const record = session?.attendance.find((a) => a.playerId === playerId);
    return record?.status || 'Present';
  };

  const calculateOverallRate = (playerId: string) => {
    let presentCount = 0;
    let totalSessions = 0;
    trainingSessions.forEach((s) => {
      const rec = s.attendance.find((a) => a.playerId === playerId);
      if (rec) {
        totalSessions++;
        if (rec.status === 'Present' || rec.status === 'Late') presentCount++;
      }
    });
    if (totalSessions === 0) return '100%';
    return `${Math.round((presentCount / totalSessions) * 100)}%`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Training & Match Attendance Register
            </h1>
            <p className="text-xs text-slate-500">
              Track athlete punctuality, injury absences, excused leaves, and aggregate monthly compliance.
            </p>
          </div>

          {/* Session Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Select Session:</span>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-[#00B4D8]"
            >
              {trainingSessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.date})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Attendance Summary Billboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Session Venue</span>
            <span className="font-bold text-base text-[#0B222E] block mt-1">{session?.venue}</span>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Time Slot</span>
            <span className="font-bold text-base text-[#0A9396] block mt-1">{session?.startTime} - {session?.endTime}</span>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Squad Compliance</span>
            <span className="font-athletic text-3xl font-black text-[#00DF82] block mt-1">94.8%</span>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-[#D1EAEF] shadow-sm text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Fitness Coach</span>
            <span className="font-bold text-base text-slate-800 block mt-1">Usman Mahmood</span>
          </div>
        </div>

        {/* Players Attendance Table */}
        <div className="bg-white rounded-3xl border border-[#D1EAEF] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Player Name</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Attendance Status (Click to Toggle)</th>
                  <th className="py-3 px-4">Monthly Rate</th>
                  <th className="py-3 px-4">Absence / Delay Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {players.map((player) => {
                  const status = getPlayerStatus(player.id);
                  const rate = calculateOverallRate(player.id);

                  return (
                    <tr key={player.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-400">
                        #{player.jerseyNumber}
                      </td>

                      <td className="py-3 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={player.photoUrl}
                            alt={player.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{player.name}</span>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-500">
                        {player.role}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          {(['Present', 'Late', 'Absent', 'Excused'] as AttendanceStatus[]).map((st) => (
                            <button
                              key={st}
                              disabled={!canMark}
                              onClick={() => session && updatePlayerAttendance(session.id, player.id, st)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                                status === st
                                  ? st === 'Present'
                                    ? 'bg-emerald-600 text-white shadow'
                                    : st === 'Late'
                                    ? 'bg-amber-500 text-white shadow'
                                    : st === 'Absent'
                                    ? 'bg-red-600 text-white shadow'
                                    : 'bg-slate-700 text-white shadow'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              } ${!canMark ? 'opacity-80 cursor-default' : ''}`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono font-bold text-[#0A9396]">
                        {rate}
                      </td>

                      <td className="py-3 px-4 text-slate-400 text-[11px] italic">
                        {session?.attendance.find((a) => a.playerId === player.id)?.note || 'Cleared on time'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { TrainingSession, TrainingType } from '@/types';
import { Dumbbell, Plus, Calendar, Clock, MapPin, CheckCircle, Edit3, Trash2, X, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DashboardTrainingPage() {
  const { trainingSessions, addTrainingSession, updateTrainingSession, deleteTrainingSession, currentRole } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);

  const canManage = ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'BATTING_COACH', 'BOWLING_COACH', 'FIELDING_COACH', 'FITNESS_COACH'].includes(currentRole);

  const [formData, setFormData] = useState({
    title: '',
    type: 'Batting Practice' as TrainingType,
    date: '2025-05-04',
    startTime: '09:30 AM',
    endTime: '11:30 AM',
    venue: 'ABC Cricket Ground',
    coachId: 'c-2',
    coachName: 'Salman Ahmed (Batting Coach)',
    status: 'Scheduled' as 'Scheduled' | 'Completed' | 'Cancelled',
    drills: 'Death-overs boundary hitting, Spin sweep practice',
    notes: 'Bring match-grade balls and high-speed sensors.',
  });

  const openAddModal = () => {
    setEditingSessionId(null);
    setFormData({
      title: 'Powerplay Hitting & Death Yorker Drill',
      type: 'Batting Practice',
      date: '04 May 2025',
      startTime: '09:00 AM',
      endTime: '11:00 AM',
      venue: 'National Cricket Ground Nets',
      coachId: 'c-2',
      coachName: 'Salman Ahmed & Waqas Ahmed',
      status: 'Scheduled',
      drills: 'Powerplay Lofted Drives, Yorker Accuracy Under 10cm',
      notes: 'High intensity session for top 6 batsmen and pace arsenal.',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (session: TrainingSession) => {
    setEditingSessionId(session.id);
    setFormData({
      title: session.title,
      type: session.type,
      date: session.date,
      startTime: session.startTime,
      endTime: session.endTime,
      venue: session.venue,
      coachId: session.coachId,
      coachName: session.coachName,
      status: session.status,
      drills: session.drills.join(', '),
      notes: session.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const drillsArray = formData.drills.split(',').map((d) => d.trim()).filter(Boolean);

    if (editingSessionId) {
      updateTrainingSession(editingSessionId, {
        title: formData.title,
        type: formData.type,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: formData.venue,
        coachName: formData.coachName,
        status: formData.status,
        drills: drillsArray,
        notes: formData.notes,
      });
    } else {
      addTrainingSession({
        title: formData.title,
        type: formData.type,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: formData.venue,
        coachId: formData.coachId,
        coachName: formData.coachName,
        status: formData.status,
        drills: drillsArray,
        notes: formData.notes,
        attendance: [],
      });
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Training Modules & High-Performance Nets
            </h1>
            <p className="text-xs text-slate-500">
              Schedule technical drills, manage coaching workloads, and review workout evaluations.
            </p>
          </div>

          {canManage && (
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule New Session</span>
            </button>
          )}
        </div>

        {/* Training Sessions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#005F73] font-bold text-xs">
                    {session.type}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      session.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : session.status === 'Scheduled'
                        ? 'bg-cyan-100 text-[#005F73]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {session.status}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-[#0B222E]">
                  {session.title}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-600 mt-2 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#0A9396]" />
                    <span>{session.date} • {session.startTime} - {session.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#00B4D8]" />
                    <span>{session.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="text-[11px]">Led by: <strong className="text-slate-800">{session.coachName}</strong></span>
                  </div>
                </div>

                {/* Drills List */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Specific Drills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {session.drills.map((drill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-[#F8FCFD] border border-[#D1EAEF] text-[11px] text-slate-700"
                      >
                        • {drill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Session Notes */}
                {session.notes && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs text-slate-600">
                    <strong className="text-slate-700">Coach Feedback:</strong> {session.notes}
                  </div>
                )}
              </div>

              {/* Attendance and action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {session.attendance.length > 0 ? `${session.attendance.length} logged` : 'Pending'}
                </span>
                
                <div className="flex items-center gap-2">
                  {canManage && (
                    <>
                      <button
                        onClick={() => openEditModal(session)}
                        className="p-1.5 text-slate-500 hover:text-[#00B4D8] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Session"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete training session "${session.title}"?`)) {
                            deleteTrainingSession(session.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Session"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <Link
                    href="/dashboard/attendance"
                    className="font-bold text-[#005F73] hover:text-[#00B4D8] flex items-center gap-1 ml-1"
                  >
                    <span>Register</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#0B222E]">Schedule Training Session</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Session Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Training Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as TrainingType })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Batting Practice">Batting Practice</option>
                      <option value="Bowling Practice">Bowling Practice</option>
                      <option value="Fielding Drills">Fielding Drills</option>
                      <option value="Fitness & Strength">Fitness & Strength</option>
                      <option value="Match Simulation">Match Simulation</option>
                      <option value="Recovery Session">Recovery Session</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Date</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Start Time</label>
                    <input
                      type="text"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">End Time</label>
                    <input
                      type="text"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Venue / Ground</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Drills (comma separated)</label>
                  <input
                    type="text"
                    value={formData.drills}
                    onChange={(e) => setFormData({ ...formData, drills: e.target.value })}
                    placeholder="e.g. Catching high balls, Bowling death yorkers"
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Coaching Staff Notes / Directives</label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
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
                    className="px-6 py-2 bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 rounded-xl font-bold shadow"
                  >
                    Save Training
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

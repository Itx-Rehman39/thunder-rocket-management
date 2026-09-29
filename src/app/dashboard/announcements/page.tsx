'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { Announcement } from '@/types';
import { Megaphone, Plus, Trash2, Edit3, Calendar, User, AlertCircle, X, CheckCircle2 } from 'lucide-react';

export default function DashboardAnnouncementsPage() {
  const { announcements, addAnnouncement, updateAnnouncement, deleteAnnouncement, currentUser } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Match' as any,
    content: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    author: currentUser.name,
    authorRole: currentUser.role,
    priority: 'Normal' as 'Normal' | 'High' | 'Urgent',
  });

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Match',
      content: '',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: currentUser.name,
      authorRole: currentUser.role,
      priority: 'Normal',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ann: Announcement) => {
    setEditingId(ann.id);
    setFormData({
      title: ann.title,
      category: ann.category,
      content: ann.content,
      date: ann.date,
      author: ann.author,
      authorRole: ann.authorRole as any,
      priority: ann.priority,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateAnnouncement(editingId, {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        priority: formData.priority,
      });
    } else {
      addAnnouncement({
        title: formData.title,
        category: formData.category,
        content: formData.content,
        date: formData.date,
        author: currentUser.name,
        authorRole: currentUser.role,
        priority: formData.priority,
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
              Franchise Communications & Bulletins
            </h1>
            <p className="text-xs text-slate-500">
              Publish official club news, match day itineraries, and notify squad members for Thunder Rocket 138/10R.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-3xl p-6 border border-[#D1EAEF] shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#005F73] text-[10px] font-bold">
                    {ann.category}
                  </span>
                  {ann.priority === 'Urgent' && (
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Urgent
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-mono">{ann.date}</span>
                </div>

                <h3 className="text-base font-bold text-[#0B222E]">{ann.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{ann.content}</p>

                <div className="text-[11px] text-slate-400 pt-1">
                  Posted by: <strong className="text-slate-700">{ann.author}</strong> ({ann.authorRole})
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(ann)}
                  className="p-2 text-slate-500 hover:text-[#00B4D8] hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  title="Edit Announcement"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete announcement "${ann.title}"?`)) {
                      deleteAnnouncement(ann.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0 cursor-pointer"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#0B222E]">
                  {editingId ? 'Edit Official Dispatch' : 'Publish Official Dispatch'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Headline Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Travel Advisory for Lahore Fixture"
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Match">Match</option>
                      <option value="Team Kit">Team Kit</option>
                      <option value="Fitness & Strength">Fitness & Strength</option>
                      <option value="Coaching Staff">Coaching Staff</option>
                      <option value="General">General</option>
                      <option value="Important">Important</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Urgency Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent (Broadcasts Alert)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Detailed Content</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write detailed dispatch details, timings, dress code, instructions..."
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 rounded-xl font-bold shadow cursor-pointer transition-colors"
                  >
                    {editingId ? 'Update Bulletin' : 'Publish Bulletin'}
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

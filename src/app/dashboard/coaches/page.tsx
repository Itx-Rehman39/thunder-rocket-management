'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { Coach, UserRole } from '@/types';
import { Shield, Plus, Edit3, Trash2, Phone, Mail, X, CheckCircle2 } from 'lucide-react';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';

export default function DashboardCoachesPage() {
  const { coaches, addCoach, updateCoach, deleteCoach } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoachId, setEditingCoachId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Batting Coach',
    roleType: 'BATTING_COACH' as UserRole,
    experience: '10+ Years Professional Coaching',
    specialization: 'Shot Selection, Power Hitting',
    phone: '+92 300 1234567',
    email: 'coach@thunderrockets.com',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated technical trainer focusing on elite match preparation.',
  });

  const openAddModal = () => {
    setEditingCoachId(null);
    setFormData({
      name: '',
      role: 'Assistant Coach',
      roleType: 'HEAD_COACH',
      experience: '8+ Years Coaching',
      specialization: 'Tactical Analysis, Fielding Drills',
      phone: '+92 300 7778899',
      email: 'staff@thunderrockets.com',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'High performance specialist joining the Thunder Rockets technical department.',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (c: Coach) => {
    setEditingCoachId(c.id);
    setFormData({
      name: c.name,
      role: c.role,
      roleType: c.roleType,
      experience: c.experience,
      specialization: c.specialization.join(', '),
      phone: c.phone,
      email: c.email,
      photoUrl: c.photoUrl,
      bio: c.bio,
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const specs = formData.specialization.split(',').map((s) => s.trim()).filter(Boolean);

    if (editingCoachId) {
      updateCoach(editingCoachId, {
        name: formData.name,
        role: formData.role,
        roleType: formData.roleType,
        experience: formData.experience,
        specialization: specs,
        phone: formData.phone,
        email: formData.email,
        photoUrl: formData.photoUrl,
        bio: formData.bio,
      });
    } else {
      addCoach({
        name: formData.name,
        role: formData.role,
        roleType: formData.roleType,
        experience: formData.experience,
        specialization: specs,
        phone: formData.phone,
        email: formData.email,
        photoUrl: formData.photoUrl,
        bio: formData.bio,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-[#0B222E]">
              Coaching Staff & Management
            </h1>
            <p className="text-xs text-slate-500">
              Appoint coaches, assign role permissions, and maintain technical staff directory.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Appoint Staff Member</span>
          </button>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-3xl border border-[#D1EAEF] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FCFD] text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Assigned Role</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Specialization</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coaches.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.photoUrl}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900">{c.name}</div>
                          <span className="text-[10px] text-slate-400 font-mono">{c.roleType}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E0F7FA] text-[#005F73] font-bold text-[11px]">
                        {c.role}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {c.experience}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {c.specialization.map((s, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-600">
                      <div>{c.phone}</div>
                      <div className="text-[10px] text-[#0A9396]">{c.email}</div>
                    </td>

                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(c)}
                        className="p-1.5 text-slate-500 hover:text-[#00B4D8] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Edit Coach Details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Permanently remove coach "${c.name}" (${c.role})?`)) {
                            deleteCoach(c.id);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Coach"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#0B222E]">
                  {editingCoachId ? 'Edit Coach Information' : 'Appoint New Coach / Staff'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Display Role Title</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Spin Bowling Coach"
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">RBAC System Role</label>
                    <select
                      value={formData.roleType}
                      onChange={(e) => setFormData({ ...formData, roleType: e.target.value as UserRole })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    >
                      <option value="HEAD_COACH">HEAD_COACH</option>
                      <option value="BATTING_COACH">BATTING_COACH</option>
                      <option value="BOWLING_COACH">BOWLING_COACH</option>
                      <option value="FIELDING_COACH">FIELDING_COACH</option>
                      <option value="FITNESS_COACH">FITNESS_COACH</option>
                      <option value="PERFORMANCE_ANALYST">PERFORMANCE_ANALYST</option>
                      <option value="PHYSIOTHERAPIST">PHYSIOTHERAPIST</option>
                      <option value="TEAM_MANAGER">TEAM_MANAGER</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Specializations (comma separated)</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    placeholder="e.g. Pace Bowling, Yorker Execution, Video Analytics"
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <ImageUploadInput
                    label="Coach Photograph"
                    value={formData.photoUrl}
                    onChange={(url) => setFormData((prev) => ({ ...prev, photoUrl: url }))}
                    helperText="Upload JPG/PNG coach photo from device or enter image URL."
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
                    className="px-6 py-2 bg-[#0B222E] hover:bg-[#00B4D8] text-white hover:text-slate-950 rounded-xl font-bold transition-all shadow"
                  >
                    Save Staff Record
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

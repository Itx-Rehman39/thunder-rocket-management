'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { Image as ImageIcon, Plus, X, Trash2, Edit3 } from 'lucide-react';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';
import { GalleryItem } from '@/types';

export default function DashboardGalleryPage() {
  const { galleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Matches' as GalleryItem['category'],
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
    date: '28 Apr 2025',
    description: 'Electrifying atmosphere under the stadium lights.',
  });

  const openAddModal = () => {
    setEditingItemId(null);
    setFormData({
      title: '',
      category: 'Matches',
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1000&q=80',
      date: '28 Apr 2025',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItemId(item.id);
    setFormData({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      date: item.date,
      description: item.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItemId) {
      updateGalleryItem(editingItemId, formData);
    } else {
      addGalleryItem(formData);
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
              Media Asset & Photo Library Management
            </h1>
            <p className="text-xs text-slate-500">
              Curate official team photos, kit reveals, trophy moments, and press gallery for Thunder Rocket 138/10R.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Media Asset</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#D1EAEF] overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* On-the-spot edit and delete overlay buttons */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-xl bg-[#0B222E]/80 hover:bg-[#0B222E] text-[#00E5FF] backdrop-blur-xs transition-colors cursor-pointer"
                    title="Edit Photo"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete photo "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-xs transition-colors cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold text-[#0A9396] uppercase">{item.category}</span>
                  <span className="text-slate-400 font-mono">{item.date}</span>
                </div>
                <h4 className="font-bold text-sm text-[#0B222E]">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                )}
                
                {/* Bottom Quick Action Bar */}
                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-[11px] font-bold text-cyan-700 hover:text-cyan-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={() => {
                      if (confirm(`Delete photo "${item.title}"?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-lg text-[#0B222E]">
                  {editingItemId ? 'Edit Media Asset' : 'Add Photo to Gallery'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    placeholder="e.g. Thunder Rocket 138/10R Squad Celebration"
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
                      <option value="Matches">Matches</option>
                      <option value="Training">Training</option>
                      <option value="Team">Team</option>
                      <option value="Kit">Kit</option>
                      <option value="Trophies">Trophies</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Date</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                      placeholder="e.g. 28 Apr 2025"
                    />
                  </div>
                </div>

                <div>
                  <ImageUploadInput
                    label="Photo Asset"
                    value={formData.imageUrl}
                    onChange={(url) => setFormData((prev) => ({ ...prev, imageUrl: url }))}
                    helperText="Upload JPG/PNG photo from device or enter image URL."
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                    placeholder="Brief description or caption..."
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
                    {editingItemId ? 'Update Photo' : 'Add Photo'}
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

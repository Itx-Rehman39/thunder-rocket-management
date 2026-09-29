'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useApp } from '@/lib/store/appStore';
import { GalleryItem } from '@/types';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

export default function GalleryPage() {
  const { galleryItems } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Matches', 'Training', 'Team', 'Kit', 'Trophies'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((i) => i.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-[#F6FBFC]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative tr-camo-bg text-white py-14 sm:py-20 border-b border-[#0A9396]/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/40 text-xs font-bold uppercase tracking-wider mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>MOMENTS & TRIUMPHS</span>
          </div>
          <h1 className="font-athletic text-4xl sm:text-6xl uppercase tracking-tight text-white">
            TEAM GALLERY
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2">
            Relive the greatest moments, kit reveals, trophy ceremonies, and intensive training sessions of Thunder Rockets.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#0B222E] text-[#00B4D8] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className="group relative rounded-3xl overflow-hidden bg-[#0B222E] border border-[#D1EAEF] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                  item.category === 'Kit'
                    ? 'object-contain p-3 bg-gradient-to-b from-[#0B222E] to-[#06161F]'
                    : 'object-cover'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06161F] via-[#06161F]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00E5FF]">
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <span className="text-xs text-slate-400 font-mono mt-1">{item.date}</span>
                <div className="mt-3 flex items-center gap-1 text-xs text-[#00DF82] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Click to expand</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Lightbox */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="relative bg-[#0B222E] rounded-3xl max-w-4xl w-full overflow-hidden border border-[#0A9396]/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="bg-[#06161F] flex items-center justify-center min-h-[300px]">
              <img
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                className={`w-full max-h-[72vh] ${
                  activeModalItem.category === 'Kit' ? 'object-contain p-4' : 'object-cover'
                }`}
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-[#0F2C3A] text-[#00E5FF] text-xs font-bold">
                  {activeModalItem.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{activeModalItem.date}</span>
              </div>
              <h3 className="text-xl font-bold text-white">{activeModalItem.title}</h3>
              {activeModalItem.description && (
                <p className="text-sm text-slate-300 mt-2">{activeModalItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

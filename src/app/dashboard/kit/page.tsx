'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import { JerseyGraphic, OFFICIAL_KIT_PRESETS } from '@/components/brand/JerseyGraphic';
import { ImageUploadInput } from '@/components/ui/ImageUploadInput';
import { KitConfig } from '@/types';
import { 
  Palette, 
  RotateCcw, 
  Save, 
  Sparkles, 
  Check, 
  Shirt, 
  Type, 
  Image as ImageIcon,
  CheckCircle2,
  Layers,
  Camera
} from 'lucide-react';

const PRESET_PALETTES = [
  {
    name: 'Thunder Official (138/10R)',
    baseColor: '#F4FBFD',
    primaryColor: '#00B4D8',
    secondaryColor: '#0A9396',
    accentColor: '#881337',
  },
  {
    name: 'Midnight Electric',
    baseColor: '#071820',
    primaryColor: '#00E5FF',
    secondaryColor: '#00DF82',
    accentColor: '#FF0055',
  },
  {
    name: 'Emerald Pride',
    baseColor: '#0D3B2E',
    primaryColor: '#00DF82',
    secondaryColor: '#0A9396',
    accentColor: '#F59E0B',
  },
  {
    name: 'Crimson Fury',
    baseColor: '#1A0B12',
    primaryColor: '#EF4444',
    secondaryColor: '#F97316',
    accentColor: '#FFFFFF',
  },
];

export default function KitDesignerPage() {
  const { kitConfig, updateKitConfig, resetKitConfig } = useApp();
  const [formState, setFormState] = useState<KitConfig>({ ...kitConfig });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleColorChange = (key: keyof KitConfig, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelectPresetPhoto = (url: string) => {
    setFormState((prev) => ({ ...prev, customKitImageUrl: url }));
  };

  const handleClearPhoto = () => {
    setFormState((prev) => ({ ...prev, customKitImageUrl: '' }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateKitConfig(formState);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the kit to official club defaults?')) {
      resetKitConfig();
      setFormState({
        primaryColor: '#00B4D8',
        secondaryColor: '#0A9396',
        accentColor: '#881337',
        baseColor: '#F4FBFD',
        patternStyle: 'camo',
        teamName: 'THUNDER ROCKET 138/10R',
        sponsorName: 'OFFICIAL 2025/2026 KIT',
        jerseyNumber: '10',
        jerseyName: 'USMAN TARIQ',
        customKitImageUrl: '/images/kit/official_kit_mockup.jpg',
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-300 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#071820] to-[#0F2C3A] p-6 rounded-3xl border border-[#0A9396]/30 text-white shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/20 text-[#00E5FF] text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Shirt className="w-3.5 h-3.5" />
            <span>Official Jersey Customizer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Team Kit & Jersey Designer
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Customise the match jersey for <strong className="text-[#00E5FF]">Thunder Rocket 138/10R</strong>. Select official 3D mockups, Asadullah #7 player edition, live Fan Zone match fits, or upload your custom kit photo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00DF82] to-[#0A9396] hover:from-[#00B4D8] hover:to-[#00DF82] text-[#071820] font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_14px_rgba(0,223,130,0.35)] cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Saved Live!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Kit Live</span>
              </>
            )}
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 font-bold text-sm flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Team Kit updated successfully! Changes are now applied across the whole website and player profiles.</span>
        </div>
      )}

      {/* Main Designer Grid: Controls Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <form onSubmit={handleSave} className="lg:col-span-6 space-y-6">
          
          {/* SECTION 1: OFFICIAL REAL KIT PHOTO PRESETS */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <Camera className="w-4 h-4 text-[#00B4D8]" />
                <span>Official Kit Photo Presets (Real Design)</span>
              </h3>
              {formState.customKitImageUrl && (
                <button
                  type="button"
                  onClick={handleClearPhoto}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold underline"
                >
                  Clear & Use 2D Vector
                </button>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Select one of the official high-definition kit photos to showcase on the platform:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OFFICIAL_KIT_PRESETS.map((preset) => {
                const isSelected = formState.customKitImageUrl === preset.url;
                return (
                  <div
                    key={preset.id}
                    onClick={() => handleSelectPresetPhoto(preset.url)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#00B4D8] bg-[#00B4D8]/10 ring-2 ring-[#00B4D8]/40 shadow-md'
                        : 'border-slate-200 hover:border-slate-400 bg-slate-50/60'
                    }`}
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900/10 mb-2.5">
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-full h-full object-contain p-1 hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-[#071820]/90 text-cyan-300 border border-cyan-800/80">
                        {preset.badge}
                      </span>
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[#00DF82] text-slate-950 shadow">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-black text-xs text-slate-900 leading-tight">
                        {preset.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {preset.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPresetPhoto(preset.url);
                      }}
                      className={`mt-2.5 w-full py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        isSelected
                          ? 'bg-[#00B4D8] text-slate-950 font-black'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                    >
                      {isSelected ? 'Currently Selected' : 'Select This Kit'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Custom Kit Image Upload */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <ImageIcon className="w-4 h-4 text-[#00B4D8]" />
              <span>Upload Additional Custom Kit Photo</span>
            </h3>
            <p className="text-xs text-slate-500">
              Have another custom kit picture or photo? Upload it directly from your computer or paste an image URL:
            </p>

            <ImageUploadInput
              label="Upload Custom Kit Image (JPG / PNG)"
              value={formState.customKitImageUrl || ''}
              onChange={(url) => setFormState((prev) => ({ ...prev, customKitImageUrl: url }))}
              helperText="Upload any JPG or PNG from your computer. It will be displayed without distortion in high resolution."
            />
          </div>

          {/* SECTION 3: Vector 2D Customizer (Colors & Text) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                <Palette className="w-4 h-4 text-[#00B4D8]" />
                <span>2D Vector Colors & Print Customization</span>
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                Vector Mode
              </span>
            </div>

            {/* Quick Palettes */}
            <div className="grid grid-cols-2 gap-2">
              {PRESET_PALETTES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => {
                    setFormState((prev) => ({
                      ...prev,
                      baseColor: p.baseColor,
                      primaryColor: p.primaryColor,
                      secondaryColor: p.secondaryColor,
                      accentColor: p.accentColor,
                    }));
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-[#00B4D8] text-left transition-all bg-slate-50/50"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.primaryColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.secondaryColor }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: p.accentColor }} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 block truncate">{p.name}</span>
                </button>
              ))}
            </div>

            {/* Text Customizer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Chest Team Name</label>
                <input
                  type="text"
                  value={formState.teamName}
                  onChange={(e) => setFormState({ ...formState, teamName: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Jersey Number</label>
                <input
                  type="text"
                  value={formState.jerseyNumber}
                  onChange={(e) => setFormState({ ...formState, jerseyNumber: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Player Name on Back</label>
                <input
                  type="text"
                  value={formState.jerseyName}
                  onChange={(e) => setFormState({ ...formState, jerseyName: e.target.value })}
                  placeholder="e.g. ASADULLAH"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Pattern Style</label>
                <select
                  value={formState.patternStyle}
                  onChange={(e) => setFormState({ ...formState, patternStyle: e.target.value as any })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium"
                >
                  <option value="camo">Wave Camouflage (Official)</option>
                  <option value="stripes">Athletic Diagonal Stripes</option>
                  <option value="modern-gradient">Modern Gradient Splash</option>
                  <option value="solid">Minimal Solid Tone</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#00DF82] to-[#0A9396] hover:from-[#00B4D8] hover:to-[#00DF82] text-[#071820] font-black text-sm transition-all shadow-[0_6px_20px_rgba(0,223,130,0.35)] flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
          >
            <Save className="w-4 h-4" />
            <span>Apply & Save Official Team Kit Live</span>
          </button>
        </form>

        {/* Live Preview Column Right */}
        <div className="lg:col-span-6 sticky top-24 space-y-6">
          <div className="bg-gradient-to-b from-[#071820] via-[#0F2C3A] to-[#071820] p-6 sm:p-8 rounded-3xl border border-[#0A9396]/30 shadow-2xl text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00DF82]/20 text-[#00DF82] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00DF82] animate-pulse" />
              <span>Real-Time Kit Showcase</span>
            </div>

            {/* Jersey Graphic with formState */}
            <div className="py-2">
              <JerseyGraphic
                view="both"
                customConfig={formState}
                showAngleSwitcher={true}
              />
            </div>

            {/* Information badges footer */}
            <div className="mt-4 pt-4 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
              <div className="bg-[#0B222E] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Team</span>
                <span className="text-xs font-bold text-white truncate block">{formState.teamName}</span>
              </div>
              <div className="bg-[#0B222E] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Pattern</span>
                <span className="text-xs font-bold text-[#00DF82] capitalize block">{formState.patternStyle}</span>
              </div>
              <div className="bg-[#0B222E] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Number</span>
                <span className="text-xs font-bold text-[#00E5FF] font-mono block">#{formState.jerseyNumber}</span>
              </div>
              <div className="bg-[#0B222E] p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Photo Mode</span>
                <span className="text-xs font-bold text-amber-400 block">
                  {formState.customKitImageUrl ? 'Real Photo' : 'Vector 2D'}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
      </div>
    </DashboardLayout>
  );
}

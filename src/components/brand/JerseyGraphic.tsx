'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/appStore';
import { KitConfig } from '@/types';
import { Sparkles, Check, Eye, Layers } from 'lucide-react';

export interface KitPreset {
  id: string;
  title: string;
  shortLabel: string;
  url: string;
  badge: string;
  description: string;
}

export const OFFICIAL_KIT_PRESETS: KitPreset[] = [
  {
    id: 'mockup-both',
    title: 'Official 3D Mockup (Front & Back)',
    shortLabel: '3D Mockup',
    url: '/images/kit/official_kit_mockup.jpg',
    badge: '3D Render (Both)',
    description: 'Official tournament kit featuring King Rider crest & Thunder Rocket emblem with turquoise wave graphics.',
  },
  {
    id: 'asadullah-7',
    title: 'Asadullah #7 Official Edition',
    shortLabel: 'Asadullah #7',
    url: '/images/kit/kit_asadullah_back.jpg',
    badge: 'Custom Edition #7',
    description: 'Official back jersey print: ASADULLAH 7 in athletic bold navy with turquoise wave design.',
  },
  {
    id: 'player-front',
    title: 'Player Match Fit (Front View)',
    shortLabel: 'Fan Zone Front',
    url: '/images/kit/kit_player_front.jpg',
    badge: 'Player In Action',
    description: 'Official kit worn by player in the stadium Fan Zone arena.',
  },
  {
    id: 'player-back',
    title: 'Player Match Fit (Back #39)',
    shortLabel: 'Fan Zone Back',
    url: '/images/kit/kit_player_back.jpg',
    badge: 'Player In Action',
    description: 'Official kit back view (Abdulrehman #39) worn in Fan Zone stadium.',
  },
];

interface JerseyGraphicProps {
  view?: 'front' | 'back' | 'both';
  playerNumber?: number | string;
  playerName?: string;
  customConfig?: Partial<KitConfig>;
  className?: string;
  showAngleSwitcher?: boolean;
}

export const JerseyGraphic: React.FC<JerseyGraphicProps> = ({
  view = 'both',
  playerNumber,
  playerName,
  customConfig,
  className = '',
  showAngleSwitcher = true,
}) => {
  let appKitConfig: KitConfig | undefined;
  try {
    const store = useApp();
    appKitConfig = store.kitConfig;
  } catch {
    appKitConfig = undefined;
  }

  // Merge store config with props / custom overrides
  const kit: KitConfig = {
    primaryColor: customConfig?.primaryColor || appKitConfig?.primaryColor || '#00B4D8',
    secondaryColor: customConfig?.secondaryColor || appKitConfig?.secondaryColor || '#0A9396',
    accentColor: customConfig?.accentColor || appKitConfig?.accentColor || '#881337',
    baseColor: customConfig?.baseColor || appKitConfig?.baseColor || '#F4FBFD',
    patternStyle: customConfig?.patternStyle || appKitConfig?.patternStyle || 'camo',
    teamName: customConfig?.teamName || appKitConfig?.teamName || 'THUNDER ROCKET 138/10R',
    sponsorName: customConfig?.sponsorName || appKitConfig?.sponsorName || 'OFFICIAL 2025/2026 KIT',
    jerseyNumber: playerNumber !== undefined ? String(playerNumber) : (customConfig?.jerseyNumber || appKitConfig?.jerseyNumber || '10'),
    jerseyName: playerName !== undefined ? playerName : (customConfig?.jerseyName || appKitConfig?.jerseyName || 'USMAN TARIQ'),
    customKitImageUrl: customConfig?.customKitImageUrl !== undefined ? customConfig.customKitImageUrl : (appKitConfig?.customKitImageUrl || '/images/kit/official_kit_mockup.jpg'),
  };

  const [activePresetUrl, setActivePresetUrl] = useState<string>(kit.customKitImageUrl || '/images/kit/official_kit_mockup.jpg');
  const [showVectorMode, setShowVectorMode] = useState<boolean>(!kit.customKitImageUrl);

  // When customKitImageUrl changes externally, update active url
  React.useEffect(() => {
    if (kit.customKitImageUrl) {
      setActivePresetUrl(kit.customKitImageUrl);
      setShowVectorMode(false);
    }
  }, [kit.customKitImageUrl]);

  const activePreset = OFFICIAL_KIT_PRESETS.find((p) => p.url === activePresetUrl) || {
    id: 'custom',
    title: 'Custom Uploaded Kit',
    shortLabel: 'Custom Photo',
    url: activePresetUrl,
    badge: 'Uploaded Photo',
    description: 'Custom jersey photo uploaded for Thunder Rocket 138/10R',
  };

  // -------------------------------------------------------------------------
  // VECTOR 2D SVG RENDERING (Fallback & Vector Builder)
  // -------------------------------------------------------------------------
  const renderFrontJersey = () => (
    <div className="relative group transition-transform duration-500 hover:scale-105 filter drop-shadow-2xl">
      <svg
        viewBox="0 0 400 480"
        className="w-full h-auto max-w-[260px] md:max-w-[320px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="jerseyPattern" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill={kit.baseColor} />
            <path d="M10 20 Q 30 10, 60 35 T 110 25 Q 90 60, 45 45 Z" fill={kit.primaryColor} opacity="0.35" />
            <path d="M40 70 Q 75 55, 95 90 T 30 110 Q 15 85, 40 70 Z" fill={kit.secondaryColor} opacity="0.4" />
            <path d="M70 10 Q 100 25, 115 5 T 90 40 Z" fill={kit.primaryColor} opacity="0.25" />
            <path d="M5 60 Q 25 75, 45 65 T 20 95 Z" fill={kit.secondaryColor} opacity="0.3" />
            <path d="M80 75 Q 95 90, 110 80 T 100 115 Z" fill="#071820" opacity="0.15" />
          </pattern>
          <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B222E" />
            <stop offset="100%" stopColor="#06161F" />
          </linearGradient>
          <linearGradient id="tealAccent" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={kit.primaryColor} />
            <stop offset="100%" stopColor={kit.secondaryColor} />
          </linearGradient>
          <filter id="jerseyShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#06161F" floodOpacity="0.35" />
          </filter>
        </defs>

        <g filter="url(#jerseyShadow)">
          <path
            d="M 120 40 L 80 80 L 30 140 L 70 170 L 100 120 L 95 440 L 305 440 L 300 120 L 330 170 L 370 140 L 320 80 L 280 40 Q 200 65, 120 40 Z"
            fill="url(#jerseyPattern)"
            stroke="#D1EAEF"
            strokeWidth="2"
          />
          <path d="M 95 180 L 120 220 L 115 440 L 95 440 Z" fill="#0B222E" opacity="0.9" />
          <path d="M 305 180 L 280 220 L 285 440 L 305 440 Z" fill="#0B222E" opacity="0.9" />
          <path d="M 30 140 L 70 170 L 60 180 L 20 150 Z" fill="url(#tealAccent)" />
          <path d="M 370 140 L 330 170 L 340 180 L 380 150 Z" fill="url(#tealAccent)" />
          <path d="M 130 40 Q 200 65, 270 40 L 250 85 L 200 115 L 150 85 Z" fill="url(#collarGrad)" />
          <path d="M 150 85 L 200 115 L 250 85" stroke={kit.primaryColor} strokeWidth="3.5" fill="none" />
          <g transform="translate(200, 205)">
            <text x="0" y="0" textAnchor="middle" fontWeight="900" fontSize="22" fontStyle="italic" fill="#06161F" opacity="0.3" dx="2" dy="3">
              {kit.teamName}
            </text>
            <text x="0" y="0" textAnchor="middle" fontWeight="900" fontSize="22" fontStyle="italic" fill={kit.accentColor} stroke="#FFFFFF" strokeWidth="1.2">
              {kit.teamName}
            </text>
          </g>
          <rect x="95" y="432" width="210" height="8" fill="url(#tealAccent)" />
        </g>
      </svg>
      <div className="text-center mt-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#00E5FF]">
        MATCH KIT • FRONT
      </div>
    </div>
  );

  const renderBackJersey = () => (
    <div className="relative group transition-transform duration-500 hover:scale-105 filter drop-shadow-2xl">
      <svg
        viewBox="0 0 400 480"
        className="w-full h-auto max-w-[260px] md:max-w-[320px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="jerseyPatternBack" width="120" height="120" patternUnits="userSpaceOnUse">
            <rect width="120" height="120" fill={kit.baseColor} />
            <path d="M10 20 Q 30 10, 60 35 T 110 25 Q 90 60, 45 45 Z" fill={kit.primaryColor} opacity="0.35" />
            <path d="M40 70 Q 75 55, 95 90 T 30 110 Q 15 85, 40 70 Z" fill={kit.secondaryColor} opacity="0.4" />
          </pattern>
          <linearGradient id="tealAccentBack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={kit.primaryColor} />
            <stop offset="100%" stopColor={kit.secondaryColor} />
          </linearGradient>
        </defs>
        <g>
          <path
            d="M 120 40 L 80 80 L 30 140 L 70 170 L 100 120 L 95 440 L 305 440 L 300 120 L 330 170 L 370 140 L 320 80 L 280 40 Q 200 55, 120 40 Z"
            fill="url(#jerseyPatternBack)"
            stroke="#D1EAEF"
            strokeWidth="2"
          />
          <path d="M 125 40 Q 200 55, 275 40 L 265 65 Q 200 75, 135 65 Z" fill="#0B222E" />
          <g transform="translate(200, 235)">
            <text x="0" y="0" textAnchor="middle" fontWeight="900" fontSize="120" fontFamily="Impact, sans-serif" fill="#0B222E" stroke={kit.primaryColor} strokeWidth="4">
              {kit.jerseyNumber}
            </text>
          </g>
          <g transform="translate(200, 310)">
            <text x="0" y="0" textAnchor="middle" fontWeight="800" fontSize="16" letterSpacing="3" fill={kit.secondaryColor}>
              {kit.jerseyName}
            </text>
          </g>
          <rect x="95" y="432" width="210" height="8" fill="url(#tealAccentBack)" />
        </g>
      </svg>
      <div className="text-center mt-2 font-mono text-[11px] font-bold uppercase tracking-widest text-[#0A9396]">
        MATCH KIT • BACK #{kit.jerseyNumber}
      </div>
    </div>
  );

  // -------------------------------------------------------------------------
  // REALISTIC 3D KIT PHOTO SHOWCASE (Authentic high-def rendering)
  // -------------------------------------------------------------------------
  return (
    <div className={`w-full max-w-xl mx-auto space-y-4 ${className}`}>
      
      {/* View / Angle Selector Tabs */}
      {showAngleSwitcher && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#071820]/90 border border-slate-800 rounded-2xl backdrop-blur-md">
          {OFFICIAL_KIT_PRESETS.map((preset) => {
            const isActive = !showVectorMode && activePresetUrl === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setActivePresetUrl(preset.url);
                  setShowVectorMode(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00B4D8] to-[#0A9396] text-slate-950 shadow-md font-black scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-slate-950" />}
                <span>{preset.shortLabel}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setShowVectorMode(true)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
              showVectorMode
                ? 'bg-gradient-to-r from-[#00DF82] to-[#0A9396] text-[#071820] shadow-md font-black scale-105'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {showVectorMode && <Check className="w-3 h-3 text-[#071820]" />}
            <Layers className="w-3 h-3" />
            <span>2D Builder</span>
          </button>
        </div>
      )}

      {/* Main Display Window */}
      {showVectorMode ? (
        <div className="p-6 rounded-3xl bg-[#06161F]/80 border border-[#0A9396]/30 shadow-2xl flex flex-wrap items-center justify-center gap-6 animate-in fade-in duration-300">
          {(view === 'front' || view === 'both') && renderFrontJersey()}
          {(view === 'back' || view === 'both') && renderBackJersey()}
        </div>
      ) : (
        <div className="relative group rounded-3xl bg-gradient-to-b from-[#0B222E]/90 via-[#071820]/95 to-[#06161F] p-4 sm:p-6 border border-[#0A9396]/40 shadow-2xl backdrop-blur-md overflow-hidden animate-in fade-in duration-300">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge & Title Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-xs font-black tracking-wider uppercase text-[#00E5FF]">
                {activePreset.title}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#0F2C3A] text-cyan-300 border border-cyan-800/60">
              {activePreset.badge}
            </span>
          </div>

          {/* High-Definition Kit Photo */}
          <div className="relative z-10 flex items-center justify-center min-h-[340px] sm:min-h-[420px] py-2">
            <img
              src={activePresetUrl}
              alt={activePreset.title}
              className="max-h-[360px] sm:max-h-[440px] w-auto max-w-full object-contain rounded-2xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Description & Official Details */}
          <div className="pt-3 border-t border-slate-800/80 text-center relative z-10 space-y-1">
            <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
              {activePreset.description}
            </p>
            <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400">
              <span>TEAM: <strong className="text-cyan-300">THUNDER ROCKET 138/10R</strong></span>
              <span>•</span>
              <span>FABRIC: <strong className="text-emerald-400">DRYCELL PRO</strong></span>
              <span>•</span>
              <span>SEASON: <strong className="text-amber-300">2025/2026</strong></span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSlogan?: boolean;
  variant?: 'light' | 'dark' | 'color';
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = false,
  variant = 'color',
  linkToHome = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    hero: 'w-16 h-16 md:w-20 md:h-20',
  };

  const textSizes = {
    sm: 'text-lg leading-tight',
    md: 'text-2xl leading-tight',
    lg: 'text-3xl leading-tight',
    hero: 'text-4xl md:text-6xl leading-tight',
  };

  const sloganSizes = {
    sm: 'text-[9px] tracking-widest',
    md: 'text-[11px] tracking-wider',
    lg: 'text-xs tracking-widest',
    hero: 'text-sm md:text-base tracking-[0.25em]',
  };

  const content = (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Rocket + Cricket Ball Emblemed Vector */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#00B4D8" />
              <stop offset="100%" stopColor="#0A9396" />
            </linearGradient>
            <linearGradient id="rocketAccent" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#881337" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>
            <linearGradient id="flame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00DF82" />
              <stop offset="100%" stopColor="#00B4D8" />
            </linearGradient>
          </defs>

          {/* Rocket Nose and Aerodynamic Fuselage */}
          <path
            d="M 60 12 C 75 22, 85 45, 78 70 L 68 62 C 65 42, 52 28, 42 22 Z"
            fill="url(#rocketBody)"
          />
          <path
            d="M 38 24 C 50 32, 60 48, 55 76 L 44 68 C 42 48, 32 36, 24 30 Z"
            fill="#06B6D4"
            opacity="0.85"
          />

          {/* Wing / Fin with Maroon accent */}
          <path
            d="M 28 58 L 12 76 C 10 78, 14 82, 20 80 L 38 72 Z"
            fill="url(#rocketAccent)"
          />

          {/* Cricket Seam details on the ball inside core */}
          <circle cx="58" cy="50" r="14" fill="#0B222E" stroke="#00E5FF" strokeWidth="2.5" />
          <path
            d="M 48 44 C 52 46, 64 54, 68 56"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeDasharray="2,2"
          />
          <path
            d="M 50 56 C 54 54, 62 46, 66 44"
            stroke="#9F1239"
            strokeWidth="1.5"
          />

          {/* Propulsion trail */}
          <path
            d="M 34 78 Q 22 92, 10 90 Q 24 82, 28 72 Z"
            fill="url(#flame)"
          />
        </svg>
      </div>

      {/* Typography Branding */}
      <div className="flex flex-col">
        <div className={`font-black italic uppercase tracking-tighter ${textSizes[size]} flex items-baseline font-athletic`}>
          <span className="text-[#00B4D8] drop-shadow-sm mr-1">THUNDER</span>
          <span className="text-[#881337] bg-clip-text text-transparent bg-gradient-to-r from-[#9F1239] via-[#881337] to-[#700F2B] mr-1.5">
            ROCKET
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-black tracking-normal px-1.5 py-0.5 rounded-md bg-[#0F2C3A] text-[#00E5FF] border border-[#0A9396]/50 shadow-xs">
            138/10R
          </span>
        </div>
        
        {showSlogan && (
          <div className={`font-bold uppercase tracking-widest text-[#0A9396] ${sloganSizes[size]}`}>
            STRIKE LIKE THUNDER • SOAR LIKE A ROCKET • 138/10R
          </div>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return <Link href="/">{content}</Link>;
  }

  return content;
};

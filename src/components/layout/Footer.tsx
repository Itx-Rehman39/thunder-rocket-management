import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Mail, Phone, MapPin, Trophy, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#06161F] text-slate-300 border-t border-[#0A9396]/20 relative overflow-hidden">
      {/* Subtle Brush Texture in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00B4D8_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Official Color Swatch Bar representing the Jersey Kit */}
      <div className="h-1.5 w-full flex">
        <div className="h-full flex-1 bg-[#06161F]" title="Deep Navy" />
        <div className="h-full flex-1 bg-[#0A9396]" title="Teal" />
        <div className="h-full flex-1 bg-[#00B4D8]" title="Aqua" />
        <div className="h-full flex-1 bg-[#67E8F9]" title="Cyan" />
        <div className="h-full flex-1 bg-[#FFFFFF]" title="Pure White" />
        <div className="h-full flex-1 bg-[#881337]" title="Maroon Crest" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showSlogan={true} />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              <strong className="text-white">Thunder Rocket 138/10R</strong> is a premier franchise cricket club built on relentless passion, modern sports analytics, high-performance coaching, and extraordinary teamwork.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2C3A] text-xs font-semibold text-[#00DF82] border border-[#0A9396]/30">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                PSL Cup Finalists 2025
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2C3A] text-xs font-semibold text-cyan-300 border border-[#0A9396]/30">
                <Shield className="w-3.5 h-3.5 text-[#00B4D8]" />
                Official Club
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00B4D8]" />
              The Team
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/squad" className="hover:text-[#00B4D8] transition-colors">
                  Current Squad
                </Link>
              </li>
              <li>
                <Link href="/coaches" className="hover:text-[#00B4D8] transition-colors">
                  Coaching Staff
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-[#00B4D8] transition-colors">
                  Fixtures & Results
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:text-[#00B4D8] transition-colors">
                  Team Statistics
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#00B4D8] transition-colors">
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Management Portal Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#881337]" />
              Management
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-[#00B4D8] transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/scoring" className="hover:text-[#00B4D8] transition-colors">
                  Live Ball-by-Ball
                </Link>
              </li>
              <li>
                <Link href="/dashboard/playing-xi" className="hover:text-[#00B4D8] transition-colors">
                  Field Lineup & XI
                </Link>
              </li>
              <li>
                <Link href="/dashboard/training" className="hover:text-[#00B4D8] transition-colors">
                  Training & Drills
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reports" className="hover:text-[#00B4D8] transition-colors">
                  Performance Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00DF82]" />
              Club Headquarters
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00B4D8] mt-1 shrink-0" />
                <span>Thunder Rocket 138/10R High Performance Arena, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <span>+92 (21) 3456-7890</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00B4D8] shrink-0" />
                <span>info@thunderrockets.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom divider and copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} THUNDER ROCKET 138/10R. All rights reserved. Official franchise portal.
          </div>
          <div className="flex items-center space-x-6 text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/announcements" className="hover:text-white transition-colors">Press Releases</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

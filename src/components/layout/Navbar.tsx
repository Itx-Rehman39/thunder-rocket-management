'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useApp } from '@/lib/store/appStore';
import { UserRole } from '@/types';
import { 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  User, 
  Bell, 
  ExternalLink,
  ChevronDown,
  Lock,
  Unlock
} from 'lucide-react';

const ROLE_OPTIONS: { role: UserRole; label: string }[] = [
  { role: 'SUPER_ADMIN', label: 'Super Admin' },
  { role: 'TEAM_MANAGER', label: 'Team Manager' },
  { role: 'HEAD_COACH', label: 'Head Coach' },
  { role: 'BATTING_COACH', label: 'Batting Coach' },
  { role: 'BOWLING_COACH', label: 'Bowling Coach' },
  { role: 'FIELDING_COACH', label: 'Fielding Coach' },
  { role: 'FITNESS_COACH', label: 'Fitness Coach' },
  { role: 'PERFORMANCE_ANALYST', label: 'Performance Analyst' },
  { role: 'PHYSIOTHERAPIST', label: 'Physiotherapist' },
  { role: 'PLAYER', label: 'Player (Ali Khan #07)' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { currentRole, setCurrentRole, notifications, setIsSearchOpen, isAdminAuthenticated } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/squad', label: 'Squad' },
    { href: '/matches', label: 'Matches' },
    { href: '/statistics', label: 'Statistics' },
    { href: '/coaches', label: 'Coaches' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/announcements', label: 'Announcements' },
    { href: '/about', label: 'About' },
  ];

  const isCurrentActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#071820]/95 backdrop-blur-md border-b border-[#0A9396]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <div className="flex items-center">
            <Logo size="md" showSlogan={false} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isCurrentActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                    active
                      ? 'text-[#00B4D8] bg-[#0F2C3A] shadow-[0_0_12px_rgba(0,180,216,0.25)] border-b-2 border-[#00B4D8]'
                      : 'text-slate-300 hover:text-white hover:bg-[#0B222E]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Dashboard Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-[#00B4D8] hover:bg-[#0F2C3A] rounded-lg transition-colors border border-transparent hover:border-[#0A9396]/30"
              title="Global Search (Press to search players, matches, staff)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Role Switcher Pill (For Instant Testing of All 10 Roles) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-cyan-300 bg-[#0F2C3A] border border-[#0A9396]/40 rounded-full hover:bg-[#13384A] transition-all"
                title="Switch role to test specific role permissions"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#00DF82]" />
                <span className="truncate max-w-[110px]">
                  {ROLE_OPTIONS.find((r) => r.role === currentRole)?.label}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0B222E] border border-[#0A9396]/40 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-lg">
                  <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-700/50">
                    Active System Role:
                  </div>
                  {ROLE_OPTIONS.map((item) => (
                    <button
                      key={item.role}
                      onClick={() => {
                        setCurrentRole(item.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#0F2C3A] transition-colors ${
                        currentRole === item.role
                          ? 'text-[#00B4D8] font-bold bg-[#0F2C3A]/60'
                          : 'text-slate-300'
                      }`}
                    >
                      <span>{item.label}</span>
                      {currentRole === item.role && (
                        <span className="w-2 h-2 rounded-full bg-[#00DF82] shadow-[0_0_8px_#00DF82]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dashboard / Management Portal Button */}
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                isAdminAuthenticated
                  ? 'bg-gradient-to-r from-[#00DF82] to-[#0A9396] text-[#071820] shadow-[0_4px_14px_rgba(0,223,130,0.35)]'
                  : 'bg-gradient-to-r from-[#00B4D8] to-[#0A9396] text-white shadow-[0_4px_14px_rgba(0,180,216,0.35)]'
              }`}
            >
              {isAdminAuthenticated ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login</span>
                </>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-300 hover:text-white"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071820] border-b border-[#0A9396]/30 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                isCurrentActive(link.href)
                  ? 'bg-[#0F2C3A] text-[#00B4D8] font-bold border-l-4 border-[#00B4D8]'
                  : 'text-slate-300 hover:bg-[#0B222E]'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Switch Role for Demo:
            </div>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="w-full bg-[#0F2C3A] text-white border border-[#0A9396]/40 rounded-lg p-2 text-sm"
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.role} value={opt.role}>
                  {opt.label}
                </option>
              ))}
            </select>

            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold rounded-lg shadow-md ${
                isAdminAuthenticated
                  ? 'bg-gradient-to-r from-[#00DF82] to-[#0A9396] text-[#071820]'
                  : 'bg-gradient-to-r from-[#00B4D8] to-[#0A9396] text-white'
              }`}
            >
              {isAdminAuthenticated ? (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Admin Dashboard (Unlocked)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Login (Protected)</span>
                </>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { useApp } from '@/lib/store/appStore';
import { AdminLoginGate } from '@/components/auth/AdminLoginGate';
import { UserRole } from '@/types';
import {
  LayoutDashboard,
  Users,
  Shield,
  Calendar,
  Radio,
  Dumbbell,
  ClipboardCheck,
  Megaphone,
  Image as ImageIcon,
  BarChart3,
  FileSpreadsheet,
  Settings,
  Bell,
  Menu,
  X,
  Search,
  ChevronDown,
  LogOut,
  ExternalLink,
  Target,
  Activity,
  Award,
  Palette,
  Lock
} from 'lucide-react';

const ROLE_OPTIONS: { role: UserRole; label: string; desc: string }[] = [
  { role: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Full System Access' },
  { role: 'TEAM_MANAGER', label: 'Team Manager', desc: 'Operations & Logistics' },
  { role: 'HEAD_COACH', label: 'Head Coach', desc: 'Tactics & Playing XI' },
  { role: 'BATTING_COACH', label: 'Batting Coach', desc: 'Batting Technique & Runs' },
  { role: 'BOWLING_COACH', label: 'Bowling Coach', desc: 'Pace & Spin Arsenal' },
  { role: 'FIELDING_COACH', label: 'Fielding Coach', desc: 'Drills & Catching' },
  { role: 'FITNESS_COACH', label: 'Fitness Coach', desc: 'Endurance & Yo-Yo' },
  { role: 'PERFORMANCE_ANALYST', label: 'Performance Analyst', desc: 'Data & Match Reports' },
  { role: 'PHYSIOTHERAPIST', label: 'Physiotherapist', desc: 'Injury & Rehab Log' },
  { role: 'PLAYER', label: 'Player (Ali Khan #07)', desc: 'Athlete Dashboard' },
];

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const {
    currentRole,
    setCurrentRole,
    currentUser,
    notifications,
    markNotificationAsRead,
    setIsSearchOpen,
    isAdminAuthenticated,
    adminLogout,
    activeAdminUser,
  } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);

  // Permission mapper based on currentRole
  const allNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ALL'] },
    { href: '/dashboard/players', label: 'Players', icon: Users, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'BATTING_COACH', 'BOWLING_COACH', 'FIELDING_COACH', 'PHYSIOTHERAPIST'] },
    { href: '/dashboard/coaches', label: 'Coaches', icon: Shield, roles: ['SUPER_ADMIN', 'TEAM_MANAGER'] },
    { href: '/dashboard/matches', label: 'Matches', icon: Calendar, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'PERFORMANCE_ANALYST', 'PLAYER'] },
    { href: '/dashboard/scoring', label: 'Live Scoring', icon: Radio, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'PERFORMANCE_ANALYST'] },
    { href: '/dashboard/playing-xi', label: 'Playing XI', icon: Target, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'PLAYER'] },
    { href: '/dashboard/kit', label: 'Team Kit Designer', icon: Palette, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH'] },
    { href: '/dashboard/training', label: 'Training Sessions', icon: Dumbbell, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'BATTING_COACH', 'BOWLING_COACH', 'FIELDING_COACH', 'FITNESS_COACH', 'PLAYER'] },
    { href: '/dashboard/attendance', label: 'Attendance', icon: ClipboardCheck, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'FITNESS_COACH', 'PLAYER'] },
    { href: '/dashboard/statistics', label: 'Team Analytics', icon: BarChart3, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'BATTING_COACH', 'BOWLING_COACH', 'PERFORMANCE_ANALYST', 'PLAYER'] },
    { href: '/dashboard/announcements', label: 'Announcements', icon: Megaphone, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'FITNESS_COACH', 'PLAYER'] },
    { href: '/dashboard/gallery', label: 'Gallery Admin', icon: ImageIcon, roles: ['SUPER_ADMIN', 'TEAM_MANAGER'] },
    { href: '/dashboard/reports', label: 'Reports & Export', icon: FileSpreadsheet, roles: ['SUPER_ADMIN', 'TEAM_MANAGER', 'HEAD_COACH', 'PERFORMANCE_ANALYST'] },
    { href: '/dashboard/settings', label: 'Club Settings', icon: Settings, roles: ['SUPER_ADMIN'] },
  ];

  if (!isAdminAuthenticated) {
    return <AdminLoginGate />;
  }

  const allowedNavItems = allNavItems.filter((item) =>
    item.roles.includes('ALL') || item.roles.includes(currentRole)
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F6FBFC] flex flex-col md:flex-row">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#071820] text-slate-300 border-r border-[#0A9396]/20 select-none shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <Logo size="md" showSlogan={false} />
          <div className="mt-2 text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DF82] animate-pulse" />
            <span>MANAGEMENT SYSTEM</span>
          </div>
        </div>

        {/* Current Active Role Card in Sidebar */}
        <div className="p-3 mx-3 my-3 rounded-2xl bg-[#0F2C3A] border border-[#0A9396]/30">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Active Role:
          </div>
          <div className="text-xs font-black text-[#00E5FF] truncate mt-0.5">
            {ROLE_OPTIONS.find((r) => r.role === currentRole)?.label}
          </div>
          <div className="text-[10px] text-slate-400 truncate mt-0.5">
            {ROLE_OPTIONS.find((r) => r.role === currentRole)?.desc}
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <nav className="flex-1 px-3 space-y-1 py-2">
          {allowedNavItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#0F2C3A] to-[#0A9396]/40 text-[#00E5FF] border-l-4 border-[#00B4D8] shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#0B222E]'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-[#00E5FF]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.href === '/dashboard/scoring' && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-ping" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-2.5">
          {activeAdminUser && (
            <div className="p-2.5 rounded-xl bg-[#0B222E] border border-slate-800 text-[11px]">
              <div className="flex items-center justify-between font-bold text-slate-300">
                <span className="truncate max-w-[130px]">{activeAdminUser.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {activeAdminUser.role}
                </span>
              </div>
              <div className="text-cyan-400 font-mono truncate text-[10px] mt-0.5">
                {activeAdminUser.email}
              </div>
              <Link
                href="/dashboard/settings"
                className="text-[10px] text-slate-400 hover:text-[#00E5FF] underline block mt-1"
              >
                Change password / email &rarr;
              </Link>
            </div>
          )}

          <button
            onClick={adminLogout}
            className="w-full py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 text-xs font-bold flex items-center justify-between transition-colors border border-red-800/40 cursor-pointer"
            title="Lock & Logout Admin Session"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-red-400" />
              <span>Lock Admin Session</span>
            </span>
            <LogOut className="w-3.5 h-3.5 text-red-400" />
          </button>
          <Link
            href="/"
            className="w-full py-2 px-3 rounded-xl bg-[#0B222E] hover:bg-[#0F2C3A] text-slate-300 hover:text-white text-xs font-bold flex items-center justify-between transition-colors border border-slate-800"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0A9396]" />
          </Link>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden bg-[#071820] text-white p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 z-40">
        <Logo size="sm" showSlogan={false} />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1.5 text-slate-300"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-300"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Dropdown */}
      {sidebarOpen && (
        <div className="md:hidden bg-[#071820] text-slate-300 p-4 border-b border-slate-800 space-y-2 z-50">
          <div className="text-xs font-bold text-[#00E5FF] pb-2 border-b border-slate-800">
            {currentUser.name} ({currentRole})
          </div>
          {allowedNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                pathname === item.href ? 'bg-[#0F2C3A] text-[#00E5FF]' : 'hover:bg-[#0B222E]'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => {
              setSidebarOpen(false);
              adminLogout();
            }}
            className="w-full py-2 px-3 bg-red-950/50 hover:bg-red-900/60 rounded-xl text-xs font-bold text-red-300 flex items-center justify-center gap-2 border border-red-800/40"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Admin Session</span>
          </button>
          <Link
            href="/"
            onClick={() => setSidebarOpen(false)}
            className="block text-center py-2 bg-[#0B222E] rounded-xl text-xs font-bold text-[#0A9396]"
          >
            Back to Public Website
          </Link>
        </div>
      )}

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Management Bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
          
          {/* Breadcrumb / Title */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#0A9396]">
              PORTAL:
            </span>
            <span className="text-sm font-bold text-[#0B222E]">
              {allNavItems.find((n) => n.href === pathname)?.label || 'Team Console'}
            </span>
          </div>

          {/* Right Action Widgets: Search, Role Switcher, Notifications, Profile */}
          <div className="flex items-center gap-3">
            
            {/* Global Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs text-slate-600 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Quick Search</span>
              <kbd className="px-1.5 py-0.5 bg-white text-[10px] rounded font-mono text-slate-400 border border-slate-200">
                ⌘K
              </kbd>
            </button>

            {/* Quick Role Switcher Dropdown (Allows testing all 10 roles easily) */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E0F7FA] text-[#005F73] border border-[#00B4D8]/30 hover:bg-[#D1EAEF] transition-all text-xs font-bold"
              >
                <Shield className="w-3.5 h-3.5 text-[#0A9396]" />
                <span className="truncate max-w-[130px]">
                  Role: {ROLE_OPTIONS.find((r) => r.role === currentRole)?.label}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#0B222E] border border-[#0A9396]/40 rounded-2xl shadow-2xl p-2 z-50 text-white animate-in fade-in duration-200">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-700">
                    Switch Active System Role:
                  </div>
                  <div className="max-h-80 overflow-y-auto space-y-1 py-1">
                    {ROLE_OPTIONS.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          setCurrentRole(r.role);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          currentRole === r.role
                            ? 'bg-[#0F2C3A] text-[#00E5FF] font-bold border border-[#0A9396]/40'
                            : 'hover:bg-[#0F2C3A]/60 text-slate-300'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{r.label}</div>
                          <div className="text-[10px] text-slate-400">{r.desc}</div>
                        </div>
                        {currentRole === r.role && (
                          <span className="w-2 h-2 rounded-full bg-[#00DF82] shadow-[0_0_8px_#00DF82]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="text-xs font-bold text-slate-800">System Notifications</span>
                    <span className="text-[10px] text-slate-400 font-mono">{unreadCount} unread</span>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={`p-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                          n.read ? 'bg-slate-50 text-slate-600' : 'bg-[#E0F7FA]/70 text-[#005F73] font-medium border border-[#00B4D8]/20'
                        }`}
                      >
                        <div className="font-bold">{n.title}</div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                        <span className="text-[9px] text-slate-400 font-mono block mt-1">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Current User Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0B222E] text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-slate-800 block leading-tight">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentRole}
                </span>
              </div>
            </div>

            {/* Lock / Logout Action Button */}
            <button
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/70 transition-colors text-xs font-bold cursor-pointer"
              title="Lock Admin Session"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>

          </div>

        </div>

        {/* Dashboard Main Viewport */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (Matches Requirement 7 & 31) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071820]/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              pathname === '/dashboard' ? 'text-[#00E5FF]' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Home</span>
          </Link>

          <Link
            href="/dashboard/players"
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              pathname.startsWith('/dashboard/players') ? 'text-[#00E5FF]' : 'text-slate-400'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Squad</span>
          </Link>

          <Link
            href="/dashboard/matches"
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              pathname.startsWith('/dashboard/matches') ? 'text-[#00E5FF]' : 'text-slate-400'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Matches</span>
          </Link>

          <Link
            href="/dashboard/scoring"
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              pathname.startsWith('/dashboard/scoring') ? 'text-[#00E5FF]' : 'text-slate-400'
            }`}
          >
            <Radio className="w-5 h-5 text-red-500 animate-pulse" />
            <span>Score</span>
          </Link>

          <Link
            href="/dashboard/reports"
            className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
              pathname.startsWith('/dashboard/reports') ? 'text-[#00E5FF]' : 'text-slate-400'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>Stats</span>
          </Link>
        </div>

      </div>

    </div>
  );
};

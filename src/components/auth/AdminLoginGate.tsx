'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { useApp } from '@/lib/store/appStore';
import { Lock, KeyRound, ShieldAlert, ArrowLeft, Eye, EyeOff, Sparkles, UserCheck, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const AdminLoginGate: React.FC = () => {
  const { adminLogin, adminAccounts } = useApp();
  const [email, setEmail] = useState(adminAccounts[0]?.email || 'admin@thunderrocket.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccountList, setShowAccountList] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = adminLogin(email, password);
      if (!success) {
        setError('Invalid email or password. Please verify credentials or select one of the registered accounts below.');
        setLoading(false);
      }
    }, 350);
  };

  const handleSelectAccount = (accountEmail: string, accountPass: string) => {
    setEmail(accountEmail);
    setPassword(accountPass);
    setError('');
  };

  const handleQuickLogin = (accountEmail: string, accountPass: string) => {
    setEmail(accountEmail);
    setPassword(accountPass);
    setError('');
    setLoading(true);
    setTimeout(() => {
      adminLogin(accountEmail, accountPass);
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#071820] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#881337]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg bg-[#0B222E]/95 border border-[#0A9396]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative z-10 space-y-5">
        
        {/* Brand Header */}
        <div className="text-center space-y-2.5">
          <div className="flex justify-center">
            <Logo size="lg" showSlogan={false} />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F2C3A] text-[#00E5FF] text-[11px] font-bold uppercase tracking-wider border border-[#0A9396]/30">
            <Lock className="w-3.5 h-3.5 text-[#00DF82]" />
            <span>Authorized Management Access Only</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Club Admin & Management Portal
          </h2>
          <p className="text-xs text-slate-400">
            Login with your registered admin credentials or select an authorized club account below.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Account Selector */}
        <div className="bg-[#0F2C3A]/80 border border-slate-700/70 rounded-2xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
              <span>Registered Accounts ({adminAccounts.length})</span>
            </span>
            <button
              type="button"
              onClick={() => setShowAccountList(!showAccountList)}
              className="text-[11px] text-[#00B4D8] hover:text-[#00E5FF] flex items-center gap-1 font-semibold"
            >
              <span>{showAccountList ? 'Hide' : 'Show Accounts'}</span>
              {showAccountList ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {showAccountList && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {adminAccounts.map((acc) => (
                <div
                  key={acc.id}
                  onClick={() => handleSelectAccount(acc.email, acc.password)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer text-left ${
                    email.toLowerCase() === acc.email.toLowerCase()
                      ? 'bg-[#00B4D8]/15 border-[#00B4D8] text-white ring-1 ring-[#00B4D8]'
                      : 'bg-[#071820]/70 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:bg-[#071820]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="truncate max-w-[130px]">{acc.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {acc.role}
                    </span>
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono truncate mt-0.5">{acc.email}</div>
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                    <span>Pass: <strong className="text-slate-300 font-mono">{acc.password}</strong></span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickLogin(acc.email, acc.password);
                      }}
                      className="text-[#00DF82] hover:text-[#00E5FF] font-bold text-[10px] underline ml-1"
                    >
                      Login &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1">Login Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@thunderrocket.com"
              className="w-full bg-[#0F2C3A] border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 outline-none focus:border-[#00B4D8] transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-slate-300 font-bold block">Password</label>
              <span className="text-[10px] text-slate-400">Case-sensitive</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter account password"
                className="w-full bg-[#0F2C3A] border border-slate-700 rounded-xl p-3 pr-10 text-white placeholder-slate-500 outline-none focus:border-[#00B4D8] transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <KeyRound className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Unlock Management Console'}</span>
          </button>
        </form>

        {/* Change info pill */}
        <div className="p-3 bg-cyan-950/30 border border-cyan-800/40 rounded-xl text-center text-[11px] text-cyan-200">
          Tip: You can edit emails, change passwords, and create additional accounts anytime in <strong>Settings &rarr; Admin Accounts</strong>.
        </div>

        {/* Back Link */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useApp } from '@/lib/store/appStore';
import {
  Settings,
  Shield,
  CheckCircle2,
  Lock,
  Save,
  KeyRound,
  UserPlus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  AlertCircle,
  Globe,
  Compass,
  Laptop,
  Check,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardSettingsPage() {
  const {
    clubSettings,
    updateClubSettings,
    adminAccounts,
    activeAdminUser,
    addAdminAccount,
    updateAdminAccount,
    deleteAdminAccount,
    resetAdminAccounts,
  } = useApp();

  const [savedMsg, setSavedMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Franchise general settings
  const [settings, setSettings] = useState({
    clubName: clubSettings.clubName || 'Thunder Rocket 138/10R',
    franchiseCode: clubSettings.franchiseCode || 'TR-138/10R-2025',
    slogan: clubSettings.slogan || 'STRIKE LIKE THUNDER • SOAR LIKE A ROCKET • 138/10R PRIDE',
    homeVenue: clubSettings.homeVenue || '138/10R Cricket Arena / National Cricket Ground',
    activeSeason: 'PSL 2025/2026',
    autoRotateStrike: true,
    broadcastAlerts: true,
  });

  // Account editing modal / form state
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  // Add new account form state
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [newAccountForm, setNewAccountForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Assistant Admin',
  });

  // Password visibility map
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFranchiseSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateClubSettings({
      clubName: settings.clubName,
      slogan: settings.slogan,
      franchiseCode: settings.franchiseCode,
      homeVenue: settings.homeVenue,
    });
    setSavedMsg('Franchise identity and slogan updated successfully across the platform!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  // Account handlers
  const handleStartEdit = (acc: typeof adminAccounts[0]) => {
    setEditingAccountId(acc.id);
    setEditForm({
      name: acc.name,
      email: acc.email,
      password: acc.password,
      role: acc.role,
    });
    setErrorMsg('');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAccountId) return;
    const res = updateAdminAccount(editingAccountId, editForm);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }
    setEditingAccountId(null);
    setSavedMsg('Admin account credentials updated successfully!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const res = addAdminAccount(newAccountForm);
    if (!res.success) {
      setErrorMsg(res.message);
      return;
    }
    setIsAddingAccount(false);
    setNewAccountForm({
      name: '',
      email: '',
      password: '',
      role: 'Assistant Admin',
    });
    setSavedMsg('New login account created! You can now use it on the login page.');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const handleDelete = (id: string, email: string) => {
    if (confirm(`Are you sure you want to delete login account "${email}"?`)) {
      const res = deleteAdminAccount(id);
      if (!res.success) {
        setErrorMsg(res.message);
        return;
      }
      setSavedMsg(`Account ${email} deleted.`);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  const handleResetAccounts = () => {
    if (confirm('Reset all admin accounts to the default 4 accounts? Any custom passwords will revert.')) {
      resetAdminAccounts();
      setSavedMsg('All admin accounts have been reset to factory defaults.');
      setTimeout(() => setSavedMsg(''), 3500);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl pb-12">
        
        {/* Header */}
        <div className="pb-4 border-b border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B222E] tracking-tight">
                Settings & Admin Credentials
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage login emails & passwords, multi-admin users, club identity, and Google Chrome quick launch.
              </p>
            </div>
            {activeAdminUser && (
              <div className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold flex items-center gap-2 self-start sm:self-auto">
                <UserCheck className="w-4 h-4 text-cyan-600" />
                <span>Logged in: <strong>{activeAdminUser.email}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Global Feedback Notifications */}
        {savedMsg && (
          <div className="p-3.5 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 text-rose-900 border border-rose-300 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ================================================================ */}
        {/* SECTION 1: ADMIN LOGIN EMAILS & PASSWORDS (MULTI-USER)          */}
        {/* ================================================================ */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1EAEF] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="font-black text-lg text-[#0B222E] flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#0A9396]" />
                <span>Admin Login Accounts & Passwords</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Change your login email or password, or manage multiple authorized team accounts.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAddingAccount(true);
                  setErrorMsg('');
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#00B4D8] to-[#0A9396] hover:from-[#00DF82] hover:to-[#00B4D8] text-slate-950 font-black text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Add New Account</span>
              </button>
              <button
                type="button"
                onClick={handleResetAccounts}
                title="Reset to default accounts"
                className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add Account Form */}
          {isAddingAccount && (
            <form
              onSubmit={handleCreateAccount}
              className="p-5 rounded-2xl bg-[#F0F9FB] border border-[#00B4D8]/40 space-y-4 animate-in fade-in"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#0B222E] flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4 text-[#00B4D8]" />
                  <span>Create New Authorized Login Account</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asif Ali (Secretary)"
                    value={newAccountForm.name}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Login Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. asif@thunderrocket.com"
                    value={newAccountForm.email}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Set Password</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. asif2025"
                    value={newAccountForm.password}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, password: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 font-mono outline-none focus:border-[#00B4D8]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role / Designation</label>
                  <select
                    value={newAccountForm.role}
                    onChange={(e) => setNewAccountForm({ ...newAccountForm, role: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Team Manager">Team Manager</option>
                    <option value="Head Coach">Head Coach</option>
                    <option value="Match Scorer">Match Scorer</option>
                    <option value="Assistant Admin">Assistant Admin</option>
                    <option value="Club Official">Club Official</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0A9396] hover:bg-[#00B4D8] text-white font-bold text-xs shadow"
                >
                  Save & Activate Account
                </button>
              </div>
            </form>
          )}

          {/* Accounts List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adminAccounts.map((acc) => {
              const isEditing = editingAccountId === acc.id;
              const isVisible = visiblePasswords[acc.id] || false;

              if (isEditing) {
                return (
                  <form
                    key={acc.id}
                    onSubmit={handleSaveEdit}
                    className="p-5 rounded-2xl bg-amber-50/70 border-2 border-amber-400 space-y-3 col-span-1 md:col-span-2 shadow-sm animate-in fade-in"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                        <Edit3 className="w-4 h-4 text-amber-600" />
                        <span>Edit Credentials for &quot;{acc.name}&quot;</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditingAccountId(null)}
                        className="text-xs text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Official Name</label>
                        <input
                          type="text"
                          required
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Login Email</label>
                        <input
                          type="email"
                          required
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Password</label>
                        <input
                          type="text"
                          required
                          value={editForm.password}
                          onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 font-mono outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Role / Designation</label>
                        <input
                          type="text"
                          required
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setEditingAccountId(null)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Update Credentials</span>
                      </button>
                    </div>
                  </form>
                );
              }

              return (
                <div
                  key={acc.id}
                  className="p-5 rounded-2xl bg-[#071820] text-white border border-[#0A9396]/30 shadow-md space-y-3 relative group hover:border-[#00B4D8] transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-white">{acc.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold uppercase tracking-wider">
                          {acc.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <span>Created: {acc.createdAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(acc)}
                        title="Edit Email & Password"
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {adminAccounts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDelete(acc.id, acc.email)}
                          title="Delete Account"
                          className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:text-red-200 hover:bg-red-900 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-[#0B222E] rounded-xl border border-slate-800 space-y-2 text-xs">
                    {/* Email row */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Email:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-cyan-300 font-semibold">{acc.email}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(acc.email, `email-${acc.id}`)}
                          className="text-slate-400 hover:text-white p-0.5"
                          title="Copy Email"
                        >
                          {copiedId === `email-${acc.id}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Password row */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">Password:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[#00DF82] font-bold">
                          {isVisible ? acc.password : '••••••••'}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(acc.id)}
                          className="text-slate-400 hover:text-white p-0.5"
                          title={isVisible ? 'Hide Password' : 'Show Password'}
                        >
                          {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(acc.password, `pass-${acc.id}`)}
                          className="text-slate-400 hover:text-white p-0.5"
                          title="Copy Password"
                        >
                          {copiedId === `pass-${acc.id}` ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Login Status:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Active & Ready
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 2: GOOGLE CHROME QUICK ACCESS & LIVE SITE GUIDE          */}
        {/* ================================================================ */}
        <section className="bg-gradient-to-br from-[#071820] to-[#0F2C3A] text-white rounded-3xl p-6 sm:p-8 border border-[#0A9396]/40 shadow-lg space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-[#00E5FF] border border-cyan-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                How to Open Instantly in Chrome by typing &quot;Thunder Rocket Management&quot;
              </h2>
              <p className="text-xs text-slate-400">
                Setup Google Chrome address bar keyword shortcut so typing the club name opens the site directly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Step 1: Chrome Custom Search Shortcut */}
            <div className="p-4 rounded-2xl bg-[#0B222E] border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Compass className="w-4 h-4 text-[#00DF82]" />
                <span>Method A: Chrome Search Shortcut (1 Minute Setup)</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>In Chrome, click the <strong>3 dots (Menu) &rarr; Settings</strong>.</li>
                <li>Go to <strong>Search engine &rarr; Manage search engines and site search</strong>.</li>
                <li>Under <strong>Site search</strong>, click <strong>Add</strong>.</li>
                <li>
                  Enter:
                  <div className="mt-1 p-2 bg-[#071820] rounded-lg font-mono text-[10px] space-y-0.5 border border-slate-700">
                    <div>Name: <span className="text-cyan-300">Thunder Rocket Management</span></div>
                    <div>Shortcut: <span className="text-[#00DF82]">thunder rocket management</span></div>
                    <div>URL: <span className="text-amber-300">http://localhost:3000</span></div>
                  </div>
                </li>
                <li>
                  Click <strong>Save</strong>. Now typing <code>thunder rocket management</code> in Chrome address bar opens the site immediately!
                </li>
              </ol>
            </div>

            {/* Step 2: Install as Chrome App Shortcut */}
            <div className="p-4 rounded-2xl bg-[#0B222E] border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Laptop className="w-4 h-4 text-[#00E5FF]" />
                <span>Method B: Desktop App Icon & Chrome Taskbar</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                <li>Open this site in Chrome (<code>http://localhost:3000</code>).</li>
                <li>Click Chrome&apos;s <strong>3 dots menu &rarr; Save and share &rarr; Create shortcut...</strong></li>
                <li>Check the box <strong>&quot;Open as window&quot;</strong> and click <strong>Create</strong>.</li>
                <li>
                  A desktop app icon named <strong>Thunder Rocket Management</strong> is created!
                </li>
                <li>
                  You can now search &quot;Thunder Rocket&quot; in Windows Start Menu or taskbar and it opens instantly like an official native app!
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* SECTION 3: FRANCHISE IDENTITY & SLOGAN FORM                      */}
        {/* ================================================================ */}
        <form onSubmit={handleFranchiseSave} className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1EAEF] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#0B222E] flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#0A9396]" />
              <span>Official Franchise Identity & Slogan</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Team Name</label>
                <input
                  type="text"
                  value={settings.clubName}
                  onChange={(e) => setSettings({ ...settings, clubName: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Official Team Slogan</label>
                <input
                  type="text"
                  value={settings.slogan}
                  onChange={(e) => setSettings({ ...settings, slogan: e.target.value })}
                  placeholder="e.g. STRIKE LIKE THUNDER • SOAR LIKE A ROCKET • 138/10R PRIDE"
                  className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8] font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Home Stadium</label>
                <input
                  type="text"
                  value={settings.homeVenue}
                  onChange={(e) => setSettings({ ...settings, homeVenue: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Active Championship Season</label>
                <input
                  type="text"
                  value={settings.activeSeason}
                  onChange={(e) => setSettings({ ...settings, activeSeason: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-[#00B4D8]"
                />
              </div>
            </div>
          </div>

          {/* Quick link to Kit Designer */}
          <div className="bg-gradient-to-r from-[#071820] to-[#0F2C3A] text-white rounded-3xl p-6 border border-[#0A9396]/30 shadow-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#00E5FF] block mb-1">
                Visual Customization
              </span>
              <h4 className="text-base font-bold text-white">Team Kit & Jersey Designer</h4>
              <p className="text-xs text-slate-300">
                Change primary colors, fabric patterns, chest lettering, or upload custom kit image.
              </p>
            </div>
            <Link
              href="/dashboard/kit"
              className="px-4 py-2 bg-gradient-to-r from-[#00DF82] to-[#0A9396] text-[#071820] font-black text-xs rounded-xl shadow transition-all hover:scale-105 shrink-0"
            >
              Open Kit Designer
            </Link>
          </div>

          {/* Operations & Scoring Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D1EAEF] shadow-sm space-y-4">
            <h3 className="font-bold text-base text-[#0B222E] flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#0A9396]" />
              <span>Operations & Live Scoring Logic</span>
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoRotateStrike}
                  onChange={(e) => setSettings({ ...settings, autoRotateStrike: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00B4D8]"
                />
                <div>
                  <span className="font-bold text-slate-800 block">Automatic Batsman Strike Rotation</span>
                  <span className="text-slate-500">Auto switch striker on odd runs (1, 3) and after over boundaries.</span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.broadcastAlerts}
                  onChange={(e) => setSettings({ ...settings, broadcastAlerts: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00B4D8]"
                />
                <div>
                  <span className="font-bold text-slate-800 block">Broadcast Push Notifications</span>
                  <span className="text-slate-500">Notify squad on urgent dispatches and injury status transitions.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00DF82] to-[#0A9396] hover:from-[#00B4D8] hover:to-[#00DF82] text-[#071820] font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Franchise Settings Live</span>
            </button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}

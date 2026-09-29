'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Player,
  Coach,
  Match,
  TrainingSession,
  Announcement,
  GalleryItem,
  UserRole,
  User,
  BallEvent,
  AttendanceStatus,
  KitConfig,
  AdminAccount,
} from '@/types';
import {
  INITIAL_PLAYERS,
  INITIAL_COACHES,
  INITIAL_MATCHES,
  INITIAL_TRAINING,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_GALLERY,
  INITIAL_PLAYING_XI_IDS,
} from '@/lib/data/initialData';
import {
  DEFAULT_ADMIN_ACCOUNTS,
  DEFAULT_KIT,
  DEFAULT_CLUB_SETTINGS,
  AppNotification,
  ClubSettings,
} from '@/lib/data/defaults';

export { DEFAULT_ADMIN_ACCOUNTS, DEFAULT_KIT, DEFAULT_CLUB_SETTINGS };
export type { AppNotification, ClubSettings };

interface AppContextType {
  // Roles & Authentication
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentUser: User;
  isLoggedIn: boolean;
  loginAs: (role: UserRole, playerId?: string) => void;
  logout: () => void;

  // Admin Security System & Multi-Account Management
  adminAccounts: AdminAccount[];
  activeAdminUser: AdminAccount | null;
  isAdminAuthenticated: boolean;
  adminLogin: (passwordOrEmail: string, password?: string) => boolean;
  adminLogout: () => void;
  addAdminAccount: (account: Omit<AdminAccount, 'id' | 'createdAt'>) => { success: boolean; message: string };
  updateAdminAccount: (id: string, updates: Partial<AdminAccount>) => { success: boolean; message: string };
  deleteAdminAccount: (id: string) => { success: boolean; message: string };
  resetAdminAccounts: () => void;

  // Team Kit Customizer
  kitConfig: KitConfig;
  updateKitConfig: (updates: Partial<KitConfig>) => void;
  resetKitConfig: () => void;

  // Club Identity & Slogan Settings
  clubSettings: ClubSettings;
  updateClubSettings: (updates: Partial<ClubSettings>) => void;

  // Data Collections
  players: Player[];
  coaches: Coach[];
  matches: Match[];
  trainingSessions: TrainingSession[];
  announcements: Announcement[];
  galleryItems: GalleryItem[];
  playingXIIds: string[];

  // Server Sync
  refreshServerData: () => Promise<void>;

  // Player CRUD
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
  archivePlayer: (id: string) => void;
  addCoachNote: (playerId: string, note: { coachName: string; coachRole: string; category: any; note: string }) => void;

  // Coach CRUD
  addCoach: (coach: Omit<Coach, 'id'>) => void;
  updateCoach: (id: string, updates: Partial<Coach>) => void;
  deleteCoach: (id: string) => void;

  // Match Management & Live Scoring
  addMatch: (match: Omit<Match, 'id'>) => void;
  updateMatch: (id: string, updates: Partial<Match>) => void;
  deleteMatch: (id: string) => void;
  recordBall: (
    matchId: string,
    ballData: {
      runs: number;
      isWide?: boolean;
      isNoBall?: boolean;
      isBye?: boolean;
      isLegBye?: boolean;
      isWicket?: boolean;
      wicketType?: any;
      dismissedPlayer?: string;
      commentary?: string;
    }
  ) => void;
  rotateStrike: (matchId: string) => void;
  setLiveBowler: (matchId: string, bowlerId: string) => void;
  setLiveStriker: (matchId: string, strikerId: string) => void;
  setLiveNonStriker: (matchId: string, nonStrikerId: string) => void;

  // Playing XI
  setPlayingXIIds: (ids: string[]) => void;
  togglePlayerInPlayingXI: (playerId: string) => void;

  // Training & Attendance
  addTrainingSession: (session: Omit<TrainingSession, 'id'>) => void;
  updateTrainingSession: (id: string, updates: Partial<TrainingSession>) => void;
  deleteTrainingSession: (id: string) => void;
  updatePlayerAttendance: (sessionId: string, playerId: string, status: AttendanceStatus, note?: string) => void;

  // Announcements CRUD
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Gallery CRUD
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, updates: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Notifications & Global Search
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Security: Default to PUBLIC and UNPROTECTED until explicit valid admin authentication
  const [currentRole, setCurrentRole] = useState<UserRole>('PUBLIC');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(DEFAULT_ADMIN_ACCOUNTS);
  const [activeAdminUser, setActiveAdminUser] = useState<AdminAccount | null>(null);
  const [kitConfig, setKitConfig] = useState<KitConfig>(DEFAULT_KIT);
  const [clubSettings, setClubSettings] = useState<ClubSettings>(DEFAULT_CLUB_SETTINGS);

  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [coaches, setCoaches] = useState<Coach[]>(INITIAL_COACHES);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(INITIAL_TRAINING);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [playingXIIds, setPlayingXIIdsState] = useState<string[]>(INITIAL_PLAYING_XI_IDS);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      title: 'Match Day Approaching',
      message: 'Next T20 match vs Kings scheduled on 02 May 2025 at National Ground.',
      time: '10 mins ago',
      read: false,
      type: 'match',
    },
    {
      id: 'notif-2',
      title: 'Net Practice Confirmed',
      message: 'Batting and bowling nets scheduled for tomorrow at 09:30 AM.',
      time: '1 hour ago',
      read: false,
      type: 'training',
    },
    {
      id: 'notif-3',
      title: 'Playing XI Selected',
      message: 'Head Coach Rashid Latif has updated the provisional squad for the weekend.',
      time: '3 hours ago',
      read: true,
      type: 'match',
    },
  ]);

  // Helper to persist data changes to server API (db.json)
  const syncToServer = useCallback(async (key: string, data: any) => {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data }),
      });
    } catch (err) {
      console.warn(`[Sync] Failed to persist ${key} to server:`, err);
    }
  }, []);

  // Helper to fetch persistent data from server API
  const refreshServerData = useCallback(async () => {
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (data.players && Array.isArray(data.players)) {
        setPlayers(data.players);
        try { localStorage.setItem('tr_players', JSON.stringify(data.players)); } catch (e) {}
      }
      if (data.coaches && Array.isArray(data.coaches)) {
        setCoaches(data.coaches);
        try { localStorage.setItem('tr_coaches', JSON.stringify(data.coaches)); } catch (e) {}
      }
      if (data.matches && Array.isArray(data.matches)) {
        setMatches(data.matches);
        try { localStorage.setItem('tr_matches', JSON.stringify(data.matches)); } catch (e) {}
      }
      if (data.trainingSessions && Array.isArray(data.trainingSessions)) {
        setTrainingSessions(data.trainingSessions);
        try { localStorage.setItem('tr_training', JSON.stringify(data.trainingSessions)); } catch (e) {}
      }
      if (data.announcements && Array.isArray(data.announcements)) {
        setAnnouncements(data.announcements);
        try { localStorage.setItem('tr_announcements', JSON.stringify(data.announcements)); } catch (e) {}
      }
      if (data.galleryItems && Array.isArray(data.galleryItems)) {
        setGalleryItems(data.galleryItems);
      }
      if (data.playingXIIds && Array.isArray(data.playingXIIds)) {
        setPlayingXIIdsState(data.playingXIIds);
        try { localStorage.setItem('tr_playing_xi', JSON.stringify(data.playingXIIds)); } catch (e) {}
      }
      if (data.kitConfig) {
        setKitConfig(data.kitConfig);
        try { localStorage.setItem('tr_kit_config', JSON.stringify(data.kitConfig)); } catch (e) {}
      }
      if (data.clubSettings) {
        setClubSettings(data.clubSettings);
        try { localStorage.setItem('tr_club_settings', JSON.stringify(data.clubSettings)); } catch (e) {}
      }
      if (data.adminAccounts && Array.isArray(data.adminAccounts)) {
        setAdminAccounts(data.adminAccounts);
        try { localStorage.setItem('tr_admin_accounts', JSON.stringify(data.adminAccounts)); } catch (e) {}
      }
    } catch (e) {
      console.warn('Could not connect to /api/data, using local cache:', e);
    }
  }, []);

  // Initialization & Live Polling
  useEffect(() => {
    // 1. Check Auth State - strictly only true if stored as 'true'
    try {
      const storedAuth = localStorage.getItem('tr_admin_auth');
      if (storedAuth === 'true') {
        setIsAdminAuthenticated(true);
        const storedActive = localStorage.getItem('tr_active_admin');
        if (storedActive) {
          try {
            const parsed = JSON.parse(storedActive);
            setActiveAdminUser(parsed);
            setCurrentRole('SUPER_ADMIN');
          } catch (e) {}
        }
      } else {
        setIsAdminAuthenticated(false);
        setActiveAdminUser(null);
        setCurrentRole('PUBLIC');
      }

      // Fast-load local cache while server fetch completes
      const storedPlayers = localStorage.getItem('tr_players');
      if (storedPlayers) setPlayers(JSON.parse(storedPlayers));

      const storedCoaches = localStorage.getItem('tr_coaches');
      if (storedCoaches) setCoaches(JSON.parse(storedCoaches));

      const storedMatches = localStorage.getItem('tr_matches');
      if (storedMatches) setMatches(JSON.parse(storedMatches));

      const storedTraining = localStorage.getItem('tr_training');
      if (storedTraining) setTrainingSessions(JSON.parse(storedTraining));

      const storedAnnouncements = localStorage.getItem('tr_announcements');
      if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));

      const storedPlayingXI = localStorage.getItem('tr_playing_xi');
      if (storedPlayingXI) setPlayingXIIdsState(JSON.parse(storedPlayingXI));

      const storedKit = localStorage.getItem('tr_kit_config');
      if (storedKit) setKitConfig({ ...DEFAULT_KIT, ...JSON.parse(storedKit) });

      const storedClub = localStorage.getItem('tr_club_settings');
      if (storedClub) setClubSettings({ ...DEFAULT_CLUB_SETTINGS, ...JSON.parse(storedClub) });

      const storedGallery = localStorage.getItem('tr_gallery');
      if (storedGallery) setGalleryItems(JSON.parse(storedGallery));

      const storedAccounts = localStorage.getItem('tr_admin_accounts');
      if (storedAccounts) setAdminAccounts(JSON.parse(storedAccounts));
    } catch (e) {}

    // 2. Fetch fresh persistent data from server immediately
    refreshServerData();

    // 3. Keep open tabs/devices synced in background (every 8 seconds + window focus)
    const syncInterval = setInterval(refreshServerData, 8000);
    const onWindowFocus = () => refreshServerData();
    window.addEventListener('focus', onWindowFocus);

    return () => {
      clearInterval(syncInterval);
      window.removeEventListener('focus', onWindowFocus);
    };
  }, [refreshServerData]);

  // Save role to state
  const saveRole = (role: UserRole) => {
    setCurrentRole(role);
    try {
      localStorage.setItem('tr_role', role);
    } catch (e) {}
  };

  const loginAs = (role: UserRole, playerId?: string) => {
    saveRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  // Admin Authentication & Multi-Account Methods
  const adminLogin = (passwordOrEmail: string, password?: string): boolean => {
    // Single parameter mode: password only
    if (password === undefined) {
      const cleanPass = passwordOrEmail.trim();
      const legacyMatches = ['admin', 'admin123', 'admin138', '138', '138/10r'].includes(cleanPass.toLowerCase());
      const accountByPass = adminAccounts.find((a) => a.password === cleanPass);
      if (accountByPass || legacyMatches) {
        const selected = accountByPass || adminAccounts[0] || DEFAULT_ADMIN_ACCOUNTS[0];
        setIsAdminAuthenticated(true);
        setActiveAdminUser(selected);
        setCurrentRole('SUPER_ADMIN');
        try {
          localStorage.setItem('tr_admin_auth', 'true');
          localStorage.setItem('tr_active_admin', JSON.stringify(selected));
        } catch (e) {}
        return true;
      }
      return false;
    }

    // Two parameter mode: Email + Password
    const cleanEmail = passwordOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();

    const matched = adminAccounts.find(
      (a) => a.email.trim().toLowerCase() === cleanEmail && a.password === cleanPass
    );

    if (matched) {
      setIsAdminAuthenticated(true);
      setActiveAdminUser(matched);
      setCurrentRole('SUPER_ADMIN');
      try {
        localStorage.setItem('tr_admin_auth', 'true');
        localStorage.setItem('tr_active_admin', JSON.stringify(matched));
      } catch (e) {}
      return true;
    }

    // Master legacy check
    if (
      (cleanEmail === 'admin@thunderrocket.com' || cleanEmail === 'admin') &&
      ['admin', 'admin123', 'admin138', '138', '138/10r'].includes(cleanPass.toLowerCase())
    ) {
      const fallbackAccount = adminAccounts[0] || DEFAULT_ADMIN_ACCOUNTS[0];
      setIsAdminAuthenticated(true);
      setActiveAdminUser(fallbackAccount);
      setCurrentRole('SUPER_ADMIN');
      try {
        localStorage.setItem('tr_admin_auth', 'true');
        localStorage.setItem('tr_active_admin', JSON.stringify(fallbackAccount));
      } catch (e) {}
      return true;
    }

    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    setActiveAdminUser(null);
    setCurrentRole('PUBLIC');
    try {
      localStorage.setItem('tr_admin_auth', 'false');
      localStorage.removeItem('tr_active_admin');
    } catch (e) {}
  };

  const addAdminAccount = (accountData: Omit<AdminAccount, 'id' | 'createdAt'>): { success: boolean; message: string } => {
    const emailClean = accountData.email.trim().toLowerCase();
    const passClean = accountData.password.trim();
    if (!emailClean || !passClean) {
      return { success: false, message: 'Both Email and Password are required.' };
    }
    const exists = adminAccounts.some((a) => a.email.trim().toLowerCase() === emailClean);
    if (exists) {
      return { success: false, message: `An account with email "${emailClean}" already exists.` };
    }
    const newAccount: AdminAccount = {
      ...accountData,
      id: `admin-${Date.now()}`,
      email: emailClean,
      password: passClean,
      name: accountData.name.trim() || 'Club Official',
      role: accountData.role.trim() || 'Admin / Management',
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...adminAccounts, newAccount];
    setAdminAccounts(updated);
    syncToServer('adminAccounts', updated);
    try {
      localStorage.setItem('tr_admin_accounts', JSON.stringify(updated));
    } catch (e) {}
    return { success: true, message: `Account "${newAccount.email}" created successfully!` };
  };

  const updateAdminAccount = (id: string, updates: Partial<AdminAccount>): { success: boolean; message: string } => {
    if (updates.email) {
      const emailClean = updates.email.trim().toLowerCase();
      const duplicate = adminAccounts.some((a) => a.id !== id && a.email.trim().toLowerCase() === emailClean);
      if (duplicate) {
        return { success: false, message: 'This email is already taken by another account.' };
      }
    }
    const updated = adminAccounts.map((a) => {
      if (a.id === id) {
        const next = { ...a, ...updates };
        if (updates.email) next.email = updates.email.trim().toLowerCase();
        if (updates.password) next.password = updates.password.trim();
        return next;
      }
      return a;
    });
    setAdminAccounts(updated);
    syncToServer('adminAccounts', updated);
    try {
      localStorage.setItem('tr_admin_accounts', JSON.stringify(updated));
      if (activeAdminUser && activeAdminUser.id === id) {
        const refreshed = updated.find((a) => a.id === id);
        if (refreshed) {
          setActiveAdminUser(refreshed);
          localStorage.setItem('tr_active_admin', JSON.stringify(refreshed));
        }
      }
    } catch (e) {}
    return { success: true, message: 'Account updated successfully!' };
  };

  const deleteAdminAccount = (id: string): { success: boolean; message: string } => {
    if (adminAccounts.length <= 1) {
      return { success: false, message: 'At least one admin account must remain active.' };
    }
    const updated = adminAccounts.filter((a) => a.id !== id);
    setAdminAccounts(updated);
    syncToServer('adminAccounts', updated);
    try {
      localStorage.setItem('tr_admin_accounts', JSON.stringify(updated));
      if (activeAdminUser && activeAdminUser.id === id) {
        setActiveAdminUser(updated[0]);
        localStorage.setItem('tr_active_admin', JSON.stringify(updated[0]));
      }
    } catch (e) {}
    return { success: true, message: 'Account removed successfully.' };
  };

  const resetAdminAccounts = () => {
    setAdminAccounts(DEFAULT_ADMIN_ACCOUNTS);
    syncToServer('adminAccounts', DEFAULT_ADMIN_ACCOUNTS);
    try {
      localStorage.setItem('tr_admin_accounts', JSON.stringify(DEFAULT_ADMIN_ACCOUNTS));
    } catch (e) {}
  };

  // Kit Configuration
  const updateKitConfig = (updates: Partial<KitConfig>) => {
    setKitConfig((prev) => {
      const next = { ...prev, ...updates };
      syncToServer('kitConfig', next);
      try {
        localStorage.setItem('tr_kit_config', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const resetKitConfig = () => {
    setKitConfig(DEFAULT_KIT);
    syncToServer('kitConfig', DEFAULT_KIT);
    try {
      localStorage.setItem('tr_kit_config', JSON.stringify(DEFAULT_KIT));
    } catch (e) {}
  };

  const updateClubSettings = (updates: Partial<ClubSettings>) => {
    setClubSettings((prev) => {
      const next = { ...prev, ...updates };
      syncToServer('clubSettings', next);
      try {
        localStorage.setItem('tr_club_settings', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Current User Object
  const currentUser: User = {
    id: activeAdminUser?.id || 'u-public',
    name: activeAdminUser?.name || 'Public Visitor',
    email: activeAdminUser?.email || 'visitor@thunderrockets.com',
    role: currentRole,
    playerId: currentRole === 'PLAYER' ? 'p-1' : undefined,
  };

  // Player CRUD
  const addPlayer = (newPlayerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...newPlayerData,
      id: `p-${Date.now()}`,
    };
    const updated = [newPlayer, ...players];
    setPlayers(updated);
    syncToServer('players', updated);
    try {
      localStorage.setItem('tr_players', JSON.stringify(updated));
    } catch (e) {}
  };

  const updatePlayer = (id: string, updates: Partial<Player>) => {
    const updated = players.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          stats: updates.stats ? { ...p.stats, ...updates.stats } : p.stats,
          contact: updates.contact ? { ...p.contact, ...updates.contact } : p.contact,
        };
      }
      return p;
    });
    setPlayers(updated);
    syncToServer('players', updated);
    try {
      localStorage.setItem('tr_players', JSON.stringify(updated));
    } catch (e) {}
  };

  const archivePlayer = (id: string) => {
    updatePlayer(id, { status: 'Archived' });
  };

  const deletePlayer = (id: string) => {
    const updated = players.filter((p) => p.id !== id);
    setPlayers(updated);
    syncToServer('players', updated);
    const updatedXI = playingXIIds.filter((pId) => pId !== id);
    setPlayingXIIds(updatedXI);
    syncToServer('playingXIIds', updatedXI);
    try {
      localStorage.setItem('tr_players', JSON.stringify(updated));
      localStorage.setItem('tr_playing_xi', JSON.stringify(updatedXI));
    } catch (e) {}
  };

  const addCoachNote = (
    playerId: string,
    note: { coachName: string; coachRole: string; category: any; note: string }
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = players.map((p) => {
      if (p.id === playerId) {
        return {
          ...p,
          coachNotes: [{ ...note, date: today }, ...(p.coachNotes || [])],
        };
      }
      return p;
    });
    setPlayers(updated);
    syncToServer('players', updated);
    try {
      localStorage.setItem('tr_players', JSON.stringify(updated));
    } catch (e) {}
  };

  // Coach CRUD
  const addCoach = (coachData: Omit<Coach, 'id'>) => {
    const newCoach: Coach = { ...coachData, id: `c-${Date.now()}` };
    const updated = [newCoach, ...coaches];
    setCoaches(updated);
    syncToServer('coaches', updated);
    try {
      localStorage.setItem('tr_coaches', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    const updated = coaches.map((c) => (c.id === id ? { ...c, ...updates } : c));
    setCoaches(updated);
    syncToServer('coaches', updated);
    try {
      localStorage.setItem('tr_coaches', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteCoach = (id: string) => {
    const updated = coaches.filter((c) => c.id !== id);
    setCoaches(updated);
    syncToServer('coaches', updated);
    try {
      localStorage.setItem('tr_coaches', JSON.stringify(updated));
    } catch (e) {}
  };

  // Match Management & Interactive Live Scorer
  const addMatch = (matchData: Omit<Match, 'id'>) => {
    const newMatch: Match = { ...matchData, id: `m-${Date.now()}` };
    const updated = [newMatch, ...matches];
    setMatches(updated);
    syncToServer('matches', updated);
    try {
      localStorage.setItem('tr_matches', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateMatch = (id: string, updates: Partial<Match>) => {
    const updated = matches.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setMatches(updated);
    syncToServer('matches', updated);
    try {
      localStorage.setItem('tr_matches', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteMatch = (id: string) => {
    const updated = matches.filter((m) => m.id !== id);
    setMatches(updated);
    syncToServer('matches', updated);
    try {
      localStorage.setItem('tr_matches', JSON.stringify(updated));
    } catch (e) {}
  };

  const rotateStrike = (matchId: string) => {
    setMatches((prev) => {
      const updated = prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            strikerId: m.liveState.nonStrikerId,
            nonStrikerId: m.liveState.strikerId,
          },
        };
      });
      syncToServer('matches', updated);
      return updated;
    });
  };

  const setLiveBowler = (matchId: string, bowlerId: string) => {
    setMatches((prev) => {
      const updated = prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            currentBowlerId: bowlerId,
          },
        };
      });
      syncToServer('matches', updated);
      return updated;
    });
  };

  const setLiveStriker = (matchId: string, strikerId: string) => {
    setMatches((prev) => {
      const updated = prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            strikerId,
          },
        };
      });
      syncToServer('matches', updated);
      return updated;
    });
  };

  const setLiveNonStriker = (matchId: string, nonStrikerId: string) => {
    setMatches((prev) => {
      const updated = prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            nonStrikerId,
          },
        };
      });
      syncToServer('matches', updated);
      return updated;
    });
  };

  const recordBall = (
    matchId: string,
    ballData: {
      runs: number;
      isWide?: boolean;
      isNoBall?: boolean;
      isBye?: boolean;
      isLegBye?: boolean;
      isWicket?: boolean;
      wicketType?: any;
      dismissedPlayer?: string;
      commentary?: string;
    }
  ) => {
    setMatches((prevMatches) => {
      const updated = prevMatches.map((match) => {
        if (match.id !== matchId) return match;

        const live = match.liveState || {
          battingTeam: 'Thunder Rockets',
          currentOver: 16,
          currentBall: 2,
          strikerId: 'p-1',
          nonStrikerId: 'p-2',
          currentBowlerId: 'opp-1',
          target: 173,
          requiredRuns: 31,
          ballsRemaining: 22,
          recentBalls: [],
          timeline: [],
        };

        const runsScored = ballData.runs + (ballData.isWide || ballData.isNoBall ? 1 : 0);
        const isLegalDelivery = !ballData.isWide && !ballData.isNoBall;

        let nextBall = live.currentBall;
        let nextOver = live.currentOver;

        if (isLegalDelivery) {
          nextBall += 1;
          if (nextBall > 6) {
            nextOver += 1;
            nextBall = 1;
          }
        }

        const currentTRScore = match.thunderRocketsScore || { runs: 142, wickets: 3, overs: 16.2 };
        const newTotalRuns = currentTRScore.runs + runsScored;
        const newWickets = currentTRScore.wickets + (ballData.isWicket ? 1 : 0);
        const newOvers = parseFloat(`${nextOver}.${nextBall === 6 ? 0 : nextBall}`);

        const ballSymbol = ballData.isWicket
          ? 'W'
          : ballData.isWide
          ? `${ballData.runs}wd`
          : ballData.isNoBall
          ? `${ballData.runs}nb`
          : `${ballData.runs}`;

        const newRecentBalls = [ballSymbol, ...(live.recentBalls || [])].slice(0, 8);

        // Commentary text
        const strikerObj = players.find((p) => p.id === live.strikerId);
        const commentary =
          ballData.commentary ||
          (ballData.isWicket
            ? `OUT! Wicket falls! ${strikerObj?.name || 'Batsman'} is ${ballData.wicketType || 'dismissed'}!`
            : ballData.runs === 6
            ? `SIX RUNS! Smashed high and handsome over the boundary rope!`
            : ballData.runs === 4
            ? `FOUR! Pierces the gap with sheer precision and elegance.`
            : ballData.runs === 0
            ? `Dot ball. Excellent tight line by the bowler.`
            : `${ballData.runs} run(s) taken.`);

        const event: BallEvent = {
          overNumber: live.currentOver,
          ballNumber: live.currentBall,
          bowlerName: 'Bowler',
          batsmanName: strikerObj?.name || 'Batsman',
          runs: ballData.runs,
          isWide: ballData.isWide,
          isNoBall: ballData.isNoBall,
          isBye: ballData.isBye,
          isLegBye: ballData.isLegBye,
          isWicket: ballData.isWicket,
          wicketType: ballData.wicketType,
          dismissedPlayer: strikerObj?.name,
          commentaryText: commentary,
        };

        // Determine strike rotation
        let nextStriker = live.strikerId;
        let nextNonStriker = live.nonStrikerId;

        // If odd runs on legal ball, batsmen cross
        if (isLegalDelivery && ballData.runs % 2 !== 0) {
          nextStriker = live.nonStrikerId;
          nextNonStriker = live.strikerId;
        }

        // At end of over, strike rotates
        if (isLegalDelivery && nextBall === 1 && nextOver > live.currentOver) {
          const temp = nextStriker;
          nextStriker = nextNonStriker;
          nextNonStriker = temp;
        }

        const requiredRuns = live.target ? Math.max(0, live.target - newTotalRuns) : undefined;
        const ballsRemaining = live.ballsRemaining ? Math.max(0, live.ballsRemaining - (isLegalDelivery ? 1 : 0)) : undefined;

        return {
          ...match,
          thunderRocketsScore: {
            runs: newTotalRuns,
            wickets: newWickets,
            overs: newOvers,
          },
          liveState: {
            ...live,
            currentOver: nextOver,
            currentBall: nextBall,
            strikerId: nextStriker,
            nonStrikerId: nextNonStriker,
            requiredRuns,
            ballsRemaining,
            recentBalls: newRecentBalls,
            timeline: [event, ...(live.timeline || [])],
          },
        };
      });

      syncToServer('matches', updated);
      try {
        localStorage.setItem('tr_matches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Playing XI
  const setPlayingXIIds = (ids: string[]) => {
    setPlayingXIIdsState(ids);
    syncToServer('playingXIIds', ids);
    try {
      localStorage.setItem('tr_playing_xi', JSON.stringify(ids));
    } catch (e) {}
  };

  const togglePlayerInPlayingXI = (playerId: string) => {
    let updated: string[];
    if (playingXIIds.includes(playerId)) {
      if (playingXIIds.length <= 11) {
        // Can still remove or replace
        updated = playingXIIds.filter((id) => id !== playerId);
      } else {
        updated = playingXIIds.filter((id) => id !== playerId);
      }
    } else {
      if (playingXIIds.length < 11) {
        updated = [...playingXIIds, playerId];
      } else {
        alert('Playing XI already has 11 players! Remove a player first before adding another.');
        return;
      }
    }
    setPlayingXIIdsState(updated);
    syncToServer('playingXIIds', updated);
    try {
      localStorage.setItem('tr_playing_xi', JSON.stringify(updated));
    } catch (e) {}
  };

  // Training & Attendance
  const addTrainingSession = (sessionData: Omit<TrainingSession, 'id'>) => {
    const newSession: TrainingSession = { ...sessionData, id: `tr-${Date.now()}` };
    const updated = [newSession, ...trainingSessions];
    setTrainingSessions(updated);
    syncToServer('trainingSessions', updated);
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateTrainingSession = (id: string, updates: Partial<TrainingSession>) => {
    const updated = trainingSessions.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setTrainingSessions(updated);
    syncToServer('trainingSessions', updated);
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  const updatePlayerAttendance = (
    sessionId: string,
    playerId: string,
    status: AttendanceStatus,
    note?: string
  ) => {
    const updated = trainingSessions.map((session) => {
      if (session.id !== sessionId) return session;
      const existing = session.attendance.find((a) => a.playerId === playerId);
      let newAttendance = [...session.attendance];
      const playerObj = players.find((p) => p.id === playerId);
      if (existing) {
        newAttendance = newAttendance.map((a) =>
          a.playerId === playerId ? { ...a, status, note: note || a.note } : a
        );
      } else {
        newAttendance.push({
          playerId,
          playerName: playerObj?.name || 'Player',
          status,
          note,
        });
      }
      return { ...session, attendance: newAttendance };
    });
    setTrainingSessions(updated);
    syncToServer('trainingSessions', updated);
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteTrainingSession = (id: string) => {
    const updated = trainingSessions.filter((s) => s.id !== id);
    setTrainingSessions(updated);
    syncToServer('trainingSessions', updated);
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  // Announcements CRUD
  const addAnnouncement = (data: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = { ...data, id: `ann-${Date.now()}` };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    syncToServer('announcements', updated);
    try {
      localStorage.setItem('tr_announcements', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    const updated = announcements.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAnnouncements(updated);
    syncToServer('announcements', updated);
    try {
      localStorage.setItem('tr_announcements', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    syncToServer('announcements', updated);
    try {
      localStorage.setItem('tr_announcements', JSON.stringify(updated));
    } catch (e) {}
  };

  // Gallery CRUD
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...itemData, id: `g-${Date.now()}` };
    const updated = [newItem, ...galleryItems];
    setGalleryItems(updated);
    syncToServer('galleryItems', updated);
    try {
      localStorage.setItem('tr_gallery', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    const updated = galleryItems.map((g) => (g.id === id ? { ...g, ...updates } : g));
    setGalleryItems(updated);
    syncToServer('galleryItems', updated);
    try {
      localStorage.setItem('tr_gallery', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteGalleryItem = (id: string) => {
    const updated = galleryItems.filter((g) => g.id !== id);
    setGalleryItems(updated);
    syncToServer('galleryItems', updated);
    try {
      localStorage.setItem('tr_gallery', JSON.stringify(updated));
    } catch (e) {}
  };

  // Notification helper
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole: saveRole,
        currentUser,
        isLoggedIn,
        loginAs,
        logout,

        adminAccounts,
        activeAdminUser,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        addAdminAccount,
        updateAdminAccount,
        deleteAdminAccount,
        resetAdminAccounts,

        kitConfig,
        updateKitConfig,
        resetKitConfig,

        clubSettings,
        updateClubSettings,

        players,
        coaches,
        matches,
        trainingSessions,
        announcements,
        galleryItems,
        playingXIIds,

        refreshServerData,

        addPlayer,
        updatePlayer,
        deletePlayer,
        archivePlayer,
        addCoachNote,

        addCoach,
        updateCoach,
        deleteCoach,

        addMatch,
        updateMatch,
        deleteMatch,
        recordBall,
        rotateStrike,
        setLiveBowler,
        setLiveStriker,
        setLiveNonStriker,

        setPlayingXIIds,
        togglePlayerInPlayingXI,

        addTrainingSession,
        updateTrainingSession,
        deleteTrainingSession,
        updatePlayerAttendance,

        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,

        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,

        notifications,
        markNotificationAsRead,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const DEFAULT_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 'admin-1',
    name: 'Master Admin / Club President',
    email: 'admin@thunderrocket.com',
    password: 'admin123',
    role: 'Club President / Super Admin',
    createdAt: '2025-01-01',
  },
  {
    id: 'admin-2',
    name: 'Team Operations Manager',
    email: 'manager@thunderrocket.com',
    password: 'manager123',
    role: 'Team Manager',
    createdAt: '2025-01-05',
  },
  {
    id: 'admin-3',
    name: 'Head Cricket Coach',
    email: 'coach@thunderrocket.com',
    password: 'coach123',
    role: 'Head Coach',
    createdAt: '2025-01-10',
  },
  {
    id: 'admin-4',
    name: 'Chief Match Scorer',
    email: 'scorer@thunderrocket.com',
    password: 'scorer123',
    role: 'Match Scorer',
    createdAt: '2025-01-15',
  },
];

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'match' | 'training' | 'announcement' | 'system';
}

export const DEFAULT_KIT: KitConfig = {
  primaryColor: '#071820',
  secondaryColor: '#00B4D8',
  accentColor: '#881337',
  baseColor: '#F4FBFD',
  patternStyle: 'camo',
  teamName: 'THUNDER ROCKET 138/10R',
  sponsorName: 'ROCKET ENERGY',
  jerseyNumber: 10,
  jerseyName: 'USMAN TARIQ',
  customKitImageUrl: '/images/kit/official_kit_mockup.jpg',
};

export interface ClubSettings {
  clubName: string;
  slogan: string;
  franchiseCode: string;
  homeVenue: string;
}

export const DEFAULT_CLUB_SETTINGS: ClubSettings = {
  clubName: 'Thunder Rocket 138/10R',
  slogan: 'STRIKE LIKE THUNDER • SOAR LIKE A ROCKET • 138/10R PRIDE',
  franchiseCode: 'TR-138/10R-2025',
  homeVenue: '138/10R Cricket Arena / National Cricket Ground',
};

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
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(true);
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(DEFAULT_ADMIN_ACCOUNTS);
  const [activeAdminUser, setActiveAdminUser] = useState<AdminAccount | null>(DEFAULT_ADMIN_ACCOUNTS[0]);
  const [kitConfig, setKitConfig] = useState<KitConfig>(DEFAULT_KIT);
  const [clubSettings, setClubSettings] = useState<ClubSettings>(DEFAULT_CLUB_SETTINGS);

  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [coaches, setCoaches] = useState<Coach[]>(INITIAL_COACHES);
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(INITIAL_TRAINING);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [playingXIIds, setPlayingXIIds] = useState<string[]>(INITIAL_PLAYING_XI_IDS);

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

  // Load from LocalStorage if available
  useEffect(() => {
    try {
      const storedRole = localStorage.getItem('tr_role');
      if (storedRole) setCurrentRole(storedRole as UserRole);

      const storedAuth = localStorage.getItem('tr_admin_auth');
      if (storedAuth === 'false') {
        setIsAdminAuthenticated(false);
        setActiveAdminUser(null);
      } else {
        setIsAdminAuthenticated(true);
      }

      const storedAccounts = localStorage.getItem('tr_admin_accounts');
      if (storedAccounts) {
        try {
          const parsed = JSON.parse(storedAccounts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAdminAccounts(parsed);
          }
        } catch (e) {}
      }

      const storedActiveAdmin = localStorage.getItem('tr_active_admin');
      if (storedActiveAdmin) {
        try {
          setActiveAdminUser(JSON.parse(storedActiveAdmin));
        } catch (e) {}
      } else if (storedAuth !== 'false') {
        setActiveAdminUser(DEFAULT_ADMIN_ACCOUNTS[0]);
      }

      const storedKit = localStorage.getItem('tr_kit_config');
      if (storedKit) {
        try {
          setKitConfig({ ...DEFAULT_KIT, ...JSON.parse(storedKit) });
        } catch (e) {}
      }

      const storedClub = localStorage.getItem('tr_club_settings');
      if (storedClub) {
        try {
          setClubSettings({ ...DEFAULT_CLUB_SETTINGS, ...JSON.parse(storedClub) });
        } catch (e) {}
      }

      const storedPlayers = localStorage.getItem('tr_players');
      if (storedPlayers) setPlayers(JSON.parse(storedPlayers));

      const storedMatches = localStorage.getItem('tr_matches');
      if (storedMatches) setMatches(JSON.parse(storedMatches));

      const storedTraining = localStorage.getItem('tr_training');
      if (storedTraining) setTrainingSessions(JSON.parse(storedTraining));

      const storedAnnouncements = localStorage.getItem('tr_announcements');
      if (storedAnnouncements) setAnnouncements(JSON.parse(storedAnnouncements));

      const storedPlayingXI = localStorage.getItem('tr_playing_xi');
      if (storedPlayingXI) setPlayingXIIds(JSON.parse(storedPlayingXI));
    } catch (e) {
      console.warn('LocalStorage not available or parse error', e);
    }
  }, []);

  // Save changes to LocalStorage
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
    // If only one param is passed (e.g. quick password or master code)
    if (password === undefined) {
      const cleanPass = passwordOrEmail.trim();
      const legacyMatches = ['admin', 'admin123', 'admin138', '138', '138/10r'].includes(cleanPass.toLowerCase());
      const accountByPass = adminAccounts.find((a) => a.password === cleanPass);
      if (accountByPass || legacyMatches) {
        const selected = accountByPass || adminAccounts[0] || DEFAULT_ADMIN_ACCOUNTS[0];
        setIsAdminAuthenticated(true);
        setActiveAdminUser(selected);
        try {
          localStorage.setItem('tr_admin_auth', 'true');
          localStorage.setItem('tr_active_admin', JSON.stringify(selected));
        } catch (e) {}
        return true;
      }
      return false;
    }

    // Both email and password provided
    const cleanEmail = passwordOrEmail.trim().toLowerCase();
    const cleanPass = password.trim();

    const matched = adminAccounts.find(
      (a) => a.email.trim().toLowerCase() === cleanEmail && a.password === cleanPass
    );

    if (matched) {
      setIsAdminAuthenticated(true);
      setActiveAdminUser(matched);
      try {
        localStorage.setItem('tr_admin_auth', 'true');
        localStorage.setItem('tr_active_admin', JSON.stringify(matched));
      } catch (e) {}
      return true;
    }

    // Fallback: master legacy check for main admin
    if (
      (cleanEmail === 'admin@thunderrocket.com' || cleanEmail === 'admin') &&
      ['admin', 'admin123', 'admin138', '138', '138/10r'].includes(cleanPass.toLowerCase())
    ) {
      const fallbackAccount = adminAccounts[0] || DEFAULT_ADMIN_ACCOUNTS[0];
      setIsAdminAuthenticated(true);
      setActiveAdminUser(fallbackAccount);
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
    try {
      localStorage.setItem('tr_admin_accounts', JSON.stringify(DEFAULT_ADMIN_ACCOUNTS));
    } catch (e) {}
  };

  // Kit Configuration
  const updateKitConfig = (updates: Partial<KitConfig>) => {
    setKitConfig((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('tr_kit_config', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const resetKitConfig = () => {
    setKitConfig(DEFAULT_KIT);
    try {
      localStorage.setItem('tr_kit_config', JSON.stringify(DEFAULT_KIT));
    } catch (e) {}
  };

  const updateClubSettings = (updates: Partial<ClubSettings>) => {
    setClubSettings((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem('tr_club_settings', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Current User Object Derived from Role
  const currentUser: User = {
    id: 'user-active',
    name:
      currentRole === 'SUPER_ADMIN'
        ? 'Chief Operations Officer (Admin)'
        : currentRole === 'TEAM_MANAGER'
        ? 'Saadullah Khan (Manager)'
        : currentRole === 'HEAD_COACH'
        ? 'Rashid Latif (Head Coach)'
        : currentRole === 'BATTING_COACH'
        ? 'Salman Ahmed (Batting Coach)'
        : currentRole === 'BOWLING_COACH'
        ? 'Waqas Ahmed (Bowling Coach)'
        : currentRole === 'FIELDING_COACH'
        ? 'Imran Khan (Fielding Coach)'
        : currentRole === 'FITNESS_COACH'
        ? 'Usman Mahmood (Fitness Coach)'
        : currentRole === 'PERFORMANCE_ANALYST'
        ? 'Ahsan Raza (Analyst)'
        : currentRole === 'PHYSIOTHERAPIST'
        ? 'Dr. Ayesha Malik (Physio)'
        : 'Ali Khan (Player #07)',
    email: 'admin@thunderrockets.com',
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
    setPlayingXIIds((prev) => prev.filter((pId) => pId !== id));
    try {
      localStorage.setItem('tr_players', JSON.stringify(updated));
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
    try {
      localStorage.setItem('tr_players', JSON.stringify(updated));
    } catch (e) {}
  };

  // Coach CRUD
  const addCoach = (coachData: Omit<Coach, 'id'>) => {
    const newCoach: Coach = { ...coachData, id: `c-${Date.now()}` };
    setCoaches((prev) => [newCoach, ...prev]);
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoaches((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCoach = (id: string) => {
    setCoaches((prev) => prev.filter((c) => c.id !== id));
  };

  // Match Management & Interactive Live Scorer
  const addMatch = (matchData: Omit<Match, 'id'>) => {
    const newMatch: Match = { ...matchData, id: `m-${Date.now()}` };
    const updated = [newMatch, ...matches];
    setMatches(updated);
    try {
      localStorage.setItem('tr_matches', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateMatch = (id: string, updates: Partial<Match>) => {
    const updated = matches.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setMatches(updated);
    try {
      localStorage.setItem('tr_matches', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteMatch = (id: string) => {
    const updated = matches.filter((m) => m.id !== id);
    setMatches(updated);
    try {
      localStorage.setItem('tr_matches', JSON.stringify(updated));
    } catch (e) {}
  };

  const rotateStrike = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            strikerId: m.liveState.nonStrikerId,
            nonStrikerId: m.liveState.strikerId,
          },
        };
      })
    );
  };

  const setLiveBowler = (matchId: string, bowlerId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            currentBowlerId: bowlerId,
          },
        };
      })
    );
  };

  const setLiveStriker = (matchId: string, strikerId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            strikerId,
          },
        };
      })
    );
  };

  const setLiveNonStriker = (matchId: string, nonStrikerId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id !== matchId || !m.liveState) return m;
        return {
          ...m,
          liveState: {
            ...m.liveState,
            nonStrikerId,
          },
        };
      })
    );
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

      try {
        localStorage.setItem('tr_matches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Playing XI
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
    setPlayingXIIds(updated);
    try {
      localStorage.setItem('tr_playing_xi', JSON.stringify(updated));
    } catch (e) {}
  };

  // Training & Attendance
  const addTrainingSession = (sessionData: Omit<TrainingSession, 'id'>) => {
    const newSession: TrainingSession = { ...sessionData, id: `tr-${Date.now()}` };
    const updated = [newSession, ...trainingSessions];
    setTrainingSessions(updated);
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateTrainingSession = (id: string, updates: Partial<TrainingSession>) => {
    const updated = trainingSessions.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setTrainingSessions(updated);
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
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteTrainingSession = (id: string) => {
    const updated = trainingSessions.filter((s) => s.id !== id);
    setTrainingSessions(updated);
    try {
      localStorage.setItem('tr_training', JSON.stringify(updated));
    } catch (e) {}
  };

  // Announcements CRUD
  const addAnnouncement = (data: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = { ...data, id: `ann-${Date.now()}` };
    const updated = [newAnn, ...announcements];
    setAnnouncements(updated);
    try {
      localStorage.setItem('tr_announcements', JSON.stringify(updated));
    } catch (e) {}
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    const updated = announcements.map((a) => (a.id === id ? { ...a, ...updates } : a));
    setAnnouncements(updated);
    try {
      localStorage.setItem('tr_announcements', JSON.stringify(updated));
    } catch (e) {}
  };

  const deleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    try {
      localStorage.setItem('tr_announcements', JSON.stringify(updated));
    } catch (e) {}
  };

  // Gallery CRUD
  const addGalleryItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...itemData, id: `g-${Date.now()}` };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updates: Partial<GalleryItem>) => {
    setGalleryItems((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
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
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        adminAccounts,
        activeAdminUser,
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

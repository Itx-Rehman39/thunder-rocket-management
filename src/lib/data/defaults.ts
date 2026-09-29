import { AdminAccount, KitConfig } from '@/types';

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

export interface ClubSettings {
  clubName: string;
  slogan: string;
  franchiseCode: string;
  homeVenue: string;
  activeSeason?: string;
  autoRotateStrike?: boolean;
  broadcastAlerts?: boolean;
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

export const DEFAULT_CLUB_SETTINGS: ClubSettings = {
  clubName: 'Thunder Rocket 138/10R',
  slogan: 'STRIKE LIKE THUNDER • SOAR LIKE A ROCKET • 138/10R PRIDE',
  franchiseCode: 'TR-138/10R-2025',
  homeVenue: '138/10R Cricket Arena / National Cricket Ground',
  activeSeason: 'PSL 2025/2026',
  autoRotateStrike: true,
  broadcastAlerts: true,
};

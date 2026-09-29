export type UserRole =
  | 'PUBLIC'
  | 'SUPER_ADMIN'
  | 'TEAM_MANAGER'
  | 'HEAD_COACH'
  | 'BATTING_COACH'
  | 'BOWLING_COACH'
  | 'FIELDING_COACH'
  | 'FITNESS_COACH'
  | 'PERFORMANCE_ANALYST'
  | 'PHYSIOTHERAPIST'
  | 'PLAYER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  playerId?: string;
}

export interface AdminAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
}

export type PlayerRole = 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicketkeeper';
export type BattingStyle = 'Right Handed' | 'Left Handed';
export type BowlingStyle = 
  | 'Right Arm Fast'
  | 'Right Arm Fast Medium'
  | 'Right Arm Medium'
  | 'Right Arm Off-Spin'
  | 'Right Arm Leg-Spin'
  | 'Left Arm Fast'
  | 'Left Arm Medium'
  | 'Left Arm Orthodox'
  | 'Left Arm Chinaman'
  | 'None';

export type PlayerStatus = 'Active' | 'Injured' | 'Recovering' | 'Inactive' | 'Archived';

export interface PlayerStats {
  matches: number;
  runs: number;
  highestScore: number;
  battingAverage: number;
  strikeRate: number;
  fifties: number;
  hundreds: number;
  fours: number;
  sixes: number;
  wickets: number;
  bowlingEconomy: number;
  bestBowling: string;
  bowlingAverage: number;
  overs: number;
  maidens: number;
  catches: number;
  runOuts: number;
  stumpings: number;
}

export interface Player {
  id: string;
  jerseyNumber: number;
  name: string;
  shortName: string;
  role: PlayerRole;
  battingStyle: BattingStyle;
  bowlingStyle: BowlingStyle;
  age: number;
  height: string;
  nationality: string;
  joinedYear: number;
  photoUrl: string;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isWicketkeeper?: boolean;
  status: PlayerStatus;
  stats: PlayerStats;
  bio: string;
  contact?: {
    email: string;
    phone: string;
  };
  coachNotes?: {
    date: string;
    coachName: string;
    coachRole: string;
    note: string;
    category: 'Batting' | 'Bowling' | 'Fitness' | 'Strategy' | 'General';
  }[];
  awards?: {
    title: string;
    year: string;
    match?: string;
  }[];
  recentMatches?: {
    id: string;
    opponent: string;
    date: string;
    runsScored: number;
    ballsFaced: number;
    wicketsTaken: number;
    oversBowled: number;
    runsConceded: number;
  }[];
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  roleType: UserRole;
  experience: string;
  specialization: string[];
  phone: string;
  email: string;
  photoUrl: string;
  bio: string;
  achievements?: string[];
}

export type MatchStatus = 'Upcoming' | 'Live' | 'Completed' | 'Abandoned';
export type MatchType = 'T20' | 'ODI' | 'Test' | 'T10' | 'Custom';

export interface BattingScorecardRow {
  playerId: string;
  playerName: string;
  dismissal: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isNotOut?: boolean;
}

export interface BowlingScorecardRow {
  playerId: string;
  playerName: string;
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

export interface FallOfWicket {
  wicket: number;
  score: number;
  overs: string;
  playerOut: string;
}

export interface Partnership {
  wicket: number;
  player1: string;
  runs1: number;
  player2: string;
  runs2: number;
  totalRuns: number;
  balls: number;
}

export interface BallEvent {
  overNumber: number;
  ballNumber: number;
  bowlerName: string;
  batsmanName: string;
  runs: number;
  isWide?: boolean;
  isNoBall?: boolean;
  isBye?: boolean;
  isLegBye?: boolean;
  isWicket?: boolean;
  wicketType?: 'Bowled' | 'Caught' | 'LBW' | 'Run Out' | 'Stumped' | 'Hit Wicket' | 'Retired';
  dismissedPlayer?: string;
  commentaryText: string;
}

export interface MatchInnings {
  teamName: string;
  totalRuns: number;
  wickets: number;
  overs: number;
  batting: BattingScorecardRow[];
  bowling: BowlingScorecardRow[];
  extras: {
    wides: number;
    noBalls: number;
    byes: number;
    legByes: number;
    total: number;
  };
  fallOfWickets?: FallOfWicket[];
  partnerships?: Partnership[];
}

export interface Match {
  id: string;
  competition: string;
  matchType: MatchType;
  totalOvers?: number;
  opponent: string;
  opponentLogo?: string;
  date: string;
  time: string;
  venue: string;
  status: MatchStatus;
  toss?: string;
  result?: string;
  isHomeMatch: boolean;
  thunderRocketsScore?: {
    runs: number;
    wickets: number;
    overs: number;
    isAllOut?: boolean;
  };
  opponentScore?: {
    runs: number;
    wickets: number;
    overs: number;
    isAllOut?: boolean;
  };
  innings?: {
    first: MatchInnings;
    second: MatchInnings;
  };
  liveState?: {
    battingTeam: string;
    currentOver: number;
    currentBall: number;
    strikerId: string;
    nonStrikerId: string;
    currentBowlerId: string;
    target?: number;
    requiredRuns?: number;
    ballsRemaining?: number;
    recentBalls: string[];
    timeline: BallEvent[];
  };
  playingXI?: {
    thunderRockets: string[]; // playerIds
    opponent: string[];
  };
}

export type TrainingType = 
  | 'Batting Practice'
  | 'Bowling Practice'
  | 'Fielding Drills'
  | 'Fitness & Strength'
  | 'Match Simulation'
  | 'Recovery Session';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Excused';

export interface TrainingAttendance {
  playerId: string;
  playerName: string;
  status: AttendanceStatus;
  note?: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  type: TrainingType;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  coachId: string;
  coachName: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  drills: string[];
  notes?: string;
  attendance: TrainingAttendance[];
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Practice Match' | 'Fitness & Strength' | 'Team Kit' | 'Coaching Staff' | 'Match' | 'General' | 'Important';
  content: string;
  date: string;
  author: string;
  authorRole: string;
  priority: 'High' | 'Normal' | 'Urgent';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Matches' | 'Training' | 'Team' | 'Events' | 'Kit' | 'Trophies';
  imageUrl: string;
  date: string;
  description?: string;
}

export interface FieldPosition {
  playerId: string;
  positionName: string;
  x: number; // percentage 0-100 on cricket ground
  y: number; // percentage 0-100 on cricket ground
}

export interface KitConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  baseColor: string;
  patternStyle: 'camo' | 'geometric' | 'stripes' | 'solid' | 'modern-gradient';
  teamName: string;
  sponsorName: string;
  jerseyNumber: number | string;
  jerseyName: string;
  customKitImageUrl?: string;
}


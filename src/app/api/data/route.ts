import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
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
} from '@/lib/data/defaults';

let memoryDb: any = null;

function getDefaultDb() {
  return {
    players: INITIAL_PLAYERS,
    coaches: INITIAL_COACHES,
    matches: INITIAL_MATCHES,
    trainingSessions: INITIAL_TRAINING,
    announcements: INITIAL_ANNOUNCEMENTS,
    galleryItems: INITIAL_GALLERY,
    playingXIIds: INITIAL_PLAYING_XI_IDS,
    kitConfig: DEFAULT_KIT,
    clubSettings: DEFAULT_CLUB_SETTINGS,
    adminAccounts: DEFAULT_ADMIN_ACCOUNTS,
    lastUpdated: new Date().toISOString(),
  };
}

function getDbFilePath() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', 'db.json');
  }
  return path.join(process.cwd(), 'src', 'lib', 'data', 'db.json');
}

function readDb() {
  if (memoryDb) return memoryDb;
  try {
    const filePath = getDbFilePath();
    if (!fs.existsSync(filePath)) {
      const projectPath = path.join(process.cwd(), 'src', 'lib', 'data', 'db.json');
      if (fs.existsSync(projectPath)) {
        const raw = fs.readFileSync(projectPath, 'utf-8');
        memoryDb = JSON.parse(raw);
        return memoryDb;
      }
      const defaultData = getDefaultDb();
      try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8');
      } catch (e) {}
      memoryDb = defaultData;
      return defaultData;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    memoryDb = JSON.parse(raw);
    return memoryDb;
  } catch (err) {
    console.error('Error reading db:', err);
    memoryDb = getDefaultDb();
    return memoryDb;
  }
}

function writeDb(data: any) {
  memoryDb = data;
  try {
    const filePath = getDbFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('Filesystem write notice (using fallback persistence):', err);
    try {
      const tmpPath = path.join('/tmp', 'db.json');
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      return true; // Still ok in memory
    }
  }
}

export async function GET() {
  const data = readDb();
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentDb = readDb();

    if (body.action === 'reset') {
      const resetData = getDefaultDb();
      writeDb(resetData);
      return NextResponse.json({ success: true, message: 'Database reset to initial defaults', data: resetData });
    }

    if (body.key && body.data !== undefined) {
      currentDb[body.key] = body.data;
      currentDb.lastUpdated = new Date().toISOString();
      writeDb(currentDb);
      return NextResponse.json({ success: true, key: body.key, timestamp: currentDb.lastUpdated });
    }

    if (body.allData) {
      const merged = {
        ...currentDb,
        ...body.allData,
        lastUpdated: new Date().toISOString(),
      };
      writeDb(merged);
      return NextResponse.json({ success: true, timestamp: merged.lastUpdated });
    }

    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  } catch (err: any) {
    console.error('Error in POST /api/data:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

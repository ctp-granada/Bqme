import { ClinicalCase } from '../types';

export interface DailyChallengeState {
  dateString: string; // 'YYYY-MM-DD'
  caseId: string;
  isCompletedToday: boolean;
  completedAt?: string;
  scoreEarned?: number;
  timeTakenSeconds?: number;
  bonusMultiplierApplied?: number;
}

/**
 * Returns today's ISO date string 'YYYY-MM-DD'
 */
export function getTodayDateKey(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns formatted localized date string
 */
export function getFormattedDailyDate(): string {
  const d = new Date();
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Deterministically or randomly picks a difficult/expert case for today's challenge
 */
export function getDailyChallengeCase(cases: ClinicalCase[]): ClinicalCase {
  // Filter for difficult or expert cases first
  const difficultCases = cases.filter(
    (c) => c.difficulty === 'experto' || c.difficulty === 'avanzado'
  );
  const pool = difficultCases.length > 0 ? difficultCases : cases;

  // Use the date string hash to pick deterministically for all users today
  const dateKey = getTodayDateKey();
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) {
    hash = (hash << 5) - hash + dateKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}

/**
 * Get daily challenge saved state from localStorage
 */
export function loadDailyChallengeState(): DailyChallengeState | null {
  try {
    const saved = localStorage.getItem('biomark_daily_challenge');
    if (saved) {
      const parsed: DailyChallengeState = JSON.parse(saved);
      const today = getTodayDateKey();
      if (parsed.dateString === today) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load daily challenge state', e);
  }
  return null;
}

/**
 * Save daily challenge completion in localStorage
 */
export function saveDailyChallengeCompletion(
  caseId: string,
  scoreEarned: number,
  timeTakenSeconds: number,
  bonusMultiplier: number
): DailyChallengeState {
  const state: DailyChallengeState = {
    dateString: getTodayDateKey(),
    caseId,
    isCompletedToday: true,
    completedAt: new Date().toISOString(),
    scoreEarned,
    timeTakenSeconds,
    bonusMultiplierApplied: bonusMultiplier
  };

  try {
    localStorage.setItem('biomark_daily_challenge', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save daily challenge state', e);
  }

  return state;
}

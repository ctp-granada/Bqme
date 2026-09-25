import { OrganSystem, SystemBadge, UserProgress } from '../types';

export interface BadgeDefinition {
  id: string;
  system?: OrganSystem;
  title: string;
  shortTitle: string;
  category: 'system' | 'special';
  description: string;
  requirementDescription: string;
  icon: string;
  themeColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeTextColor: string;
  minCasesRequired: number;
  targetAccuracy: number; // 90 for system badges
}

export const SYSTEM_BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'badge_pancreatic',
    system: 'pancreatic',
    title: 'Experto en Pancreático',
    shortTitle: 'Pancreático',
    category: 'system',
    description: 'Dominio de la pancreatitis aguda/crónica, lipemia analítica, malabsorción y patología digestiva.',
    requirementDescription: 'Alcanza ≥90% de precisión en casos del sistema pancreático-digestivo (mín. 3 casos).',
    icon: '🔬',
    themeColor: 'from-blue-600 to-cyan-700',
    badgeBg: 'bg-cyan-50',
    badgeBorder: 'border-cyan-400',
    badgeTextColor: 'text-cyan-900',
    minCasesRequired: 3,
    targetAccuracy: 90
  },
  {
    id: 'badge_cardiac',
    system: 'cardiac',
    title: 'Experto en Cardíaco',
    shortTitle: 'Cardíaco',
    category: 'system',
    description: 'Discriminación de necrosis miocárdica (hs-cTn), reinfartos (CK-MB) e insuficiencia cardíaca (NT-proBNP).',
    requirementDescription: 'Alcanza ≥90% de precisión en casos de patología cardiovascular e infartos (mín. 3 casos).',
    icon: '🫀',
    themeColor: 'from-rose-600 to-red-700',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-400',
    badgeTextColor: 'text-rose-900',
    minCasesRequired: 3,
    targetAccuracy: 90
  },
  {
    id: 'badge_hepatic',
    system: 'hepatic',
    title: 'Experto en Hepático',
    shortTitle: 'Hepático',
    category: 'system',
    description: 'Diagnóstico diferencial de ictericias pre/intra/posthepáticas, colestasis y citólisis aguda.',
    requirementDescription: 'Alcanza ≥90% de precisión en casos hepatobiliares e ictericias (mín. 3 casos).',
    icon: '🪵',
    themeColor: 'from-amber-600 to-orange-700',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-400',
    badgeTextColor: 'text-amber-900',
    minCasesRequired: 3,
    targetAccuracy: 90
  },
  {
    id: 'badge_metabolic',
    system: 'metabolic',
    title: 'Experto en Metabólico',
    shortTitle: 'Metabólico',
    category: 'system',
    description: 'Identificación de defectos de β-oxidación (MCADD), cetoacidosis y dislipidemias aterogénicas.',
    requirementDescription: 'Alcanza ≥90% de precisión en casos de metabolismo y β-oxidación (mín. 3 casos).',
    icon: '⚡',
    themeColor: 'from-yellow-500 to-amber-600',
    badgeBg: 'bg-yellow-50',
    badgeBorder: 'border-yellow-400',
    badgeTextColor: 'text-yellow-950',
    minCasesRequired: 3,
    targetAccuracy: 90
  },
  {
    id: 'badge_renal',
    system: 'renal',
    title: 'Experto en Renal',
    shortTitle: 'Renal',
    category: 'system',
    description: 'Manejo de hiperamonemias del ciclo de la urea (OTC), hiperuricemia gotosa y lisis tumoral.',
    requirementDescription: 'Alcanza ≥90% de precisión en casos renales, urea y purinas (mín. 3 casos).',
    icon: '🫘',
    themeColor: 'from-indigo-600 to-purple-700',
    badgeBg: 'bg-indigo-50',
    badgeBorder: 'border-indigo-400',
    badgeTextColor: 'text-indigo-950',
    minCasesRequired: 3,
    targetAccuracy: 90
  },
  {
    id: 'badge_grandmaster',
    title: 'Gran Maestro de Bioquímica',
    shortTitle: 'Gran Maestro',
    category: 'special',
    description: 'Máxima distinción académica por conquistar la maestría clínica en todos los sistemas orgánicos.',
    requirementDescription: 'Desbloquea las 5 insignias de experto de todos los sistemas orgánicos.',
    icon: '👑',
    themeColor: 'from-amber-400 via-yellow-500 to-amber-600',
    badgeBg: 'bg-amber-100',
    badgeBorder: 'border-amber-500',
    badgeTextColor: 'text-amber-950',
    minCasesRequired: 15,
    targetAccuracy: 90
  },
  {
    id: 'badge_streak_legend',
    title: 'Racha Legendaria',
    shortTitle: 'Racha Élite',
    category: 'special',
    description: 'Precisión impecable sostenida bajo presión clínica en el laboratorio de urgencias.',
    requirementDescription: 'Alcanza una racha activa de más de 3 aciertos seguidos en modo desafío.',
    icon: '🔥',
    themeColor: 'from-orange-500 to-rose-600',
    badgeBg: 'bg-orange-50',
    badgeBorder: 'border-orange-400',
    badgeTextColor: 'text-orange-950',
    minCasesRequired: 4,
    targetAccuracy: 100
  },
  {
    id: 'badge_budget_master',
    title: 'Gestor Sanitario de Excelencia',
    shortTitle: 'Costo-Efectivo',
    category: 'special',
    description: 'Diagnósticos concluyentes optimizando los recursos del laboratorio hospitalario.',
    requirementDescription: 'Resuelve ≥5 casos clínicos manteniendo un presupuesto sanitario ≥80%.',
    icon: '🛡️',
    themeColor: 'from-emerald-600 to-teal-700',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-400',
    badgeTextColor: 'text-emerald-950',
    minCasesRequired: 5,
    targetAccuracy: 80
  }
];

/**
 * Calculates current status and progress of all badges for a given user progress
 */
export function evaluateUserBadges(userProgress: UserProgress): SystemBadge[] {
  const evaluatedBadges: SystemBadge[] = [];

  // First evaluate the 5 organ system badges
  const systemBadgesUnlocked: string[] = [];

  for (const def of SYSTEM_BADGE_DEFINITIONS) {
    if (def.category === 'system' && def.system) {
      const stats = userProgress.systemStats?.[def.system] || { attempted: 0, correct: 0 };
      const currentAccuracy = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
      const isUnlocked = stats.attempted >= def.minCasesRequired && currentAccuracy >= def.targetAccuracy;

      if (isUnlocked) {
        systemBadgesUnlocked.push(def.id);
      }

      // Calculate progress towards unlocking:
      // Weight: 50% case count (up to minCasesRequired), 50% accuracy (up to targetAccuracy)
      const caseRatio = Math.min(1, stats.attempted / def.minCasesRequired);
      const accRatio = stats.attempted > 0 ? Math.min(1, currentAccuracy / def.targetAccuracy) : 0;
      const progressPct = isUnlocked ? 100 : Math.round((caseRatio * 0.5 + accRatio * 0.5) * 100);

      evaluatedBadges.push({
        ...def,
        isUnlocked,
        currentAccuracy,
        currentAttempted: stats.attempted,
        currentCorrect: stats.correct,
        progressPct
      });
    }
  }

  // Evaluate Special Badges
  // 1. Grandmaster (Requires all 5 system badges)
  const grandmasterDef = SYSTEM_BADGE_DEFINITIONS.find((b) => b.id === 'badge_grandmaster')!;
  const systemBadgesCount = systemBadgesUnlocked.length;
  const isGrandmasterUnlocked = systemBadgesCount >= 5;
  evaluatedBadges.push({
    ...grandmasterDef,
    isUnlocked: isGrandmasterUnlocked,
    currentAccuracy: Math.round((systemBadgesCount / 5) * 100),
    currentAttempted: systemBadgesCount,
    currentCorrect: systemBadgesCount,
    progressPct: Math.round((systemBadgesCount / 5) * 100)
  });

  // 2. Streak Legend (Streak > 3)
  const streakDef = SYSTEM_BADGE_DEFINITIONS.find((b) => b.id === 'badge_streak_legend')!;
  const isStreakUnlocked = (userProgress.streak || 0) > 3 || (userProgress.unlockedBadges || []).includes('badge_streak_legend');
  const streakProgress = Math.min(100, Math.round(((userProgress.streak || 0) / 4) * 100));
  evaluatedBadges.push({
    ...streakDef,
    isUnlocked: isStreakUnlocked,
    currentAccuracy: 100,
    currentAttempted: userProgress.streak || 0,
    currentCorrect: userProgress.streak || 0,
    progressPct: isStreakUnlocked ? 100 : streakProgress
  });

  // 3. Budget Master (>=5 cases attempted and budget >= 80)
  const budgetDef = SYSTEM_BADGE_DEFINITIONS.find((b) => b.id === 'badge_budget_master')!;
  const isBudgetUnlocked = userProgress.casesAttempted >= 5 && userProgress.budget >= 80;
  const budgetProgress = isBudgetUnlocked 
    ? 100 
    : Math.min(100, Math.round(((Math.min(5, userProgress.casesAttempted) / 5) * 0.5 + (Math.min(80, userProgress.budget) / 80) * 0.5) * 100));
  evaluatedBadges.push({
    ...budgetDef,
    isUnlocked: isBudgetUnlocked,
    currentAccuracy: userProgress.budget,
    currentAttempted: userProgress.casesAttempted,
    currentCorrect: userProgress.casesCorrect,
    progressPct: isBudgetUnlocked ? 100 : budgetProgress
  });

  return evaluatedBadges;
}

/**
 * Checks if a recent case resolution resulted in newly unlocked badges
 */
export function getNewlyUnlockedBadges(
  prevBadges: SystemBadge[],
  currentBadges: SystemBadge[]
): SystemBadge[] {
  const prevUnlockedIds = new Set(prevBadges.filter((b) => b.isUnlocked).map((b) => b.id));
  return currentBadges.filter((b) => b.isUnlocked && !prevUnlockedIds.has(b.id));
}

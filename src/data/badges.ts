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
    id: 'badge_renal',
    system: 'renal',
    title: 'Especialista Renal',
    shortTitle: 'Especialista Renal',
    category: 'system',
    description: 'Dominio de la patología nefrológica, aclaramiento de creatinina, proteinuria, ciclo de la urea y metabolismo de purinas.',
    requirementDescription: 'Resuelve 5 casos clínicos del sistema renal y excreción nitrogenada.',
    icon: '🫘',
    themeColor: 'from-indigo-600 to-purple-700',
    badgeBg: 'bg-indigo-50',
    badgeBorder: 'border-indigo-400',
    badgeTextColor: 'text-indigo-950',
    minCasesRequired: 5,
    targetAccuracy: 80
  },
  {
    id: 'badge_cardiac',
    system: 'cardiac',
    title: 'Especialista Cardíaco',
    shortTitle: 'Especialista Cardíaco',
    category: 'system',
    description: 'Discriminación de necrosis miocárdica (hs-cTn), reinfarto precoz (CK-MB) e insuficiencia cardíaca aguda (NT-proBNP).',
    requirementDescription: 'Resuelve 5 casos clínicos del sistema cardiovascular e isquemia miocárdica.',
    icon: '🫀',
    themeColor: 'from-rose-600 to-red-700',
    badgeBg: 'bg-rose-50',
    badgeBorder: 'border-rose-400',
    badgeTextColor: 'text-rose-900',
    minCasesRequired: 5,
    targetAccuracy: 80
  },
  {
    id: 'badge_hepatic',
    system: 'hepatic',
    title: 'Especialista Hepático',
    shortTitle: 'Especialista Hepático',
    category: 'system',
    description: 'Diagnóstico diferencial de ictericias pre/intra/posthepáticas, colestasis biliar y citólisis aguda.',
    requirementDescription: 'Resuelve 5 casos clínicos del sistema hepatobiliar e ictericias.',
    icon: '🪵',
    themeColor: 'from-amber-600 to-orange-700',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-400',
    badgeTextColor: 'text-amber-900',
    minCasesRequired: 5,
    targetAccuracy: 80
  },
  {
    id: 'badge_metabolic',
    system: 'metabolic',
    title: 'Especialista Metabólico',
    shortTitle: 'Especialista Metabólico',
    category: 'system',
    description: 'Identificación de defectos de β-oxidación (MCADD), cetoacidosis, perfil lipídico aterogénico y resistencia insulínica.',
    requirementDescription: 'Resuelve 5 casos clínicos de metabolismo energético y β-oxidación.',
    icon: '⚡',
    themeColor: 'from-yellow-500 to-amber-600',
    badgeBg: 'bg-yellow-50',
    badgeBorder: 'border-yellow-400',
    badgeTextColor: 'text-yellow-950',
    minCasesRequired: 5,
    targetAccuracy: 80
  },
  {
    id: 'badge_pancreatic',
    system: 'pancreatic',
    title: 'Especialista Pancreático',
    shortTitle: 'Especialista Pancreático',
    category: 'system',
    description: 'Dominio de la pancreatitis aguda/crónica, lipasa sérica de alta especificidad, malabsorción y celíaca.',
    requirementDescription: 'Resuelve 5 casos clínicos del sistema pancreático-digestivo.',
    icon: '🔬',
    themeColor: 'from-blue-600 to-cyan-700',
    badgeBg: 'bg-cyan-50',
    badgeBorder: 'border-cyan-400',
    badgeTextColor: 'text-cyan-900',
    minCasesRequired: 5,
    targetAccuracy: 80
  },
  {
    id: 'badge_neuromuscular',
    system: 'neuromuscular',
    title: 'Especialista Neuromuscular',
    shortTitle: 'Especialista Neuromuscular',
    category: 'system',
    description: 'Dominio de la neurotransmisión colinérgica, receptores acoplados a canales iónicos, miastenia gravis y placa motora.',
    requirementDescription: 'Resuelve 5 casos clínicos del sistema neuromuscular y señalización celular.',
    icon: '🧠',
    themeColor: 'from-violet-600 to-purple-700',
    badgeBg: 'bg-purple-50',
    badgeBorder: 'border-purple-400',
    badgeTextColor: 'text-purple-950',
    minCasesRequired: 5,
    targetAccuracy: 80
  },
  {
    id: 'badge_grandmaster',
    title: 'Especialista Clínico Multidisciplinar',
    shortTitle: 'Gran Maestro',
    category: 'special',
    description: 'Máxima distinción académica por conquistar la maestría clínica en todos los sistemas orgánicos de la medicina interna.',
    requirementDescription: 'Desbloquea las 6 Medallas de Especialidad completando al menos 5 casos en cada sistema.',
    icon: '👑',
    themeColor: 'from-amber-400 via-yellow-500 to-amber-600',
    badgeBg: 'bg-amber-100',
    badgeBorder: 'border-amber-500',
    badgeTextColor: 'text-amber-950',
    minCasesRequired: 6,
    targetAccuracy: 80
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

  // First evaluate the 6 organ system specialty medals
  const systemBadgesUnlocked: string[] = [];

  for (const def of SYSTEM_BADGE_DEFINITIONS) {
    if (def.category === 'system' && def.system) {
      const stats = userProgress.systemStats?.[def.system] || { attempted: 0, correct: 0 };
      const currentResolved = stats.correct || 0;
      const isUnlocked = currentResolved >= def.minCasesRequired || (userProgress.unlockedBadges || []).includes(def.id);

      if (isUnlocked) {
        systemBadgesUnlocked.push(def.id);
      }

      // Progress based on cases completed towards the specialty requirement (5 cases)
      const progressPct = isUnlocked 
        ? 100 
        : Math.min(100, Math.round((currentResolved / def.minCasesRequired) * 100));

      evaluatedBadges.push({
        ...def,
        isUnlocked,
        currentAccuracy: stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0,
        currentAttempted: stats.attempted,
        currentCorrect: currentResolved,
        progressPct
      });
    }
  }

  // Evaluate Special Badges
  // 1. Multidisciplinary Specialist (Requires all 6 system specialty badges)
  const grandmasterDef = SYSTEM_BADGE_DEFINITIONS.find((b) => b.id === 'badge_grandmaster')!;
  const systemBadgesCount = systemBadgesUnlocked.length;
  const isGrandmasterUnlocked = systemBadgesCount >= 6 || (userProgress.unlockedBadges || []).includes('badge_grandmaster');
  const grandmasterProgress = isGrandmasterUnlocked ? 100 : Math.min(100, Math.round((systemBadgesCount / 6) * 100));
  evaluatedBadges.push({
    ...grandmasterDef,
    isUnlocked: isGrandmasterUnlocked,
    currentAccuracy: Math.round((systemBadgesCount / 6) * 100),
    currentAttempted: systemBadgesCount,
    currentCorrect: systemBadgesCount,
    progressPct: grandmasterProgress
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

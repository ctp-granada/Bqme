export interface PlayerRank {
  title: string;
  shortTitle: string;
  icon: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeBorder: string;
  minXp: number;
  maxXp: number;
  levelNumber: number;
  nextRankTitle: string;
  progressPct: number;
}

export function getPlayerRank(xp: number): PlayerRank {
  if (xp <= 150) {
    const minXp = 0;
    const maxXp = 150;
    const progressPct = Math.min(100, Math.max(0, Math.round(((xp - minXp) / (maxXp - minXp)) * 100)));
    return {
      title: "Alumno de Bioquímica",
      shortTitle: "Alumno",
      icon: "🎓",
      badgeBg: "bg-slate-100",
      badgeTextColor: "text-slate-800",
      badgeBorder: "border-slate-300",
      minXp,
      maxXp,
      levelNumber: 1,
      nextRankTitle: "Médico Interno",
      progressPct
    };
  } else if (xp <= 400) {
    const minXp = 151;
    const maxXp = 400;
    const progressPct = Math.min(100, Math.max(0, Math.round(((xp - minXp) / (maxXp - minXp)) * 100)));
    return {
      title: "Médico Interno",
      shortTitle: "Interno",
      icon: "🩺",
      badgeBg: "bg-emerald-50",
      badgeTextColor: "text-emerald-800",
      badgeBorder: "border-emerald-300",
      minXp,
      maxXp,
      levelNumber: 2,
      nextRankTitle: "Residente R1-R4",
      progressPct
    };
  } else if (xp <= 700) {
    const minXp = 401;
    const maxXp = 700;
    const progressPct = Math.min(100, Math.max(0, Math.round(((xp - minXp) / (maxXp - minXp)) * 100)));
    return {
      title: "Residente de R1-R4",
      shortTitle: "Residente",
      icon: "🏥",
      badgeBg: "bg-slate-100",
      badgeTextColor: "text-slate-800",
      badgeBorder: "border-slate-300",
      minXp,
      maxXp,
      levelNumber: 3,
      nextRankTitle: "Facultativo Adjunto",
      progressPct
    };
  } else if (xp <= 1000) {
    const minXp = 701;
    const maxXp = 1000;
    const progressPct = Math.min(100, Math.max(0, Math.round(((xp - minXp) / (maxXp - minXp)) * 100)));
    return {
      title: "Facultativo Adjunto",
      shortTitle: "Adjunto",
      icon: "🔬",
      badgeBg: "bg-emerald-50",
      badgeTextColor: "text-emerald-800",
      badgeBorder: "border-emerald-200",
      minXp,
      maxXp,
      levelNumber: 4,
      nextRankTitle: "Jefe de Servicio",
      progressPct
    };
  } else {
    return {
      title: "Jefe de Servicio de Bioquímica Clínica",
      shortTitle: "Jefe Servicio",
      icon: "👑",
      badgeBg: "bg-slate-900",
      badgeTextColor: "text-emerald-300",
      badgeBorder: "border-emerald-500/40",
      minXp: 1001,
      maxXp: 1001,
      levelNumber: 5,
      nextRankTitle: "Rango Máximo Cátedra",
      progressPct: 100
    };
  }
}

export function getStreakMultiplier(streak: number): { multiplier: number; label: string; icon: string } {
  if (streak <= 1) {
    return { multiplier: 1.0, label: "x1.0", icon: "🔥" };
  } else if (streak === 2) {
    return { multiplier: 1.2, label: "x1.2 XP", icon: "🔥" };
  } else if (streak === 3) {
    return { multiplier: 1.5, label: "x1.5 XP", icon: "🔥🔥" };
  } else {
    return { multiplier: 2.0, label: "x2.0 XP MAX", icon: "🔥🔥🔥" };
  }
}

export function getPatientHealth(lives: number): {
  statusText: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  icon: string;
} {
  if (lives >= 3) {
    return {
      statusText: "Estable / Compensado",
      colorClass: "text-emerald-700",
      bgClass: "bg-emerald-50",
      borderClass: "border-emerald-200",
      icon: "💚"
    };
  } else if (lives === 2) {
    return {
      statusText: "En Riesgo / Inestable",
      colorClass: "text-amber-700",
      bgClass: "bg-amber-50",
      borderClass: "border-amber-200",
      icon: "💛"
    };
  } else if (lives === 1) {
    return {
      statusText: "Estado Crítico / Urgencias",
      colorClass: "text-orange-700",
      bgClass: "bg-orange-50",
      borderClass: "border-orange-200",
      icon: "🧡"
    };
  } else {
    return {
      statusText: "Paro Diagnóstico / Guardia Parada",
      colorClass: "text-red-700",
      bgClass: "bg-red-50",
      borderClass: "border-red-200",
      icon: "💔"
    };
  }
}

export function getBudgetInfo(budget: number): {
  statusText: string;
  isRedAlert: boolean;
  colorClass: string;
  barColor: string;
  badgeBg: string;
} {
  if (budget <= 30) {
    return {
      statusText: "ZONA ROJA: Alarma Presupuestaria",
      isRedAlert: true,
      colorClass: "text-red-600 font-bold animate-pulse",
      barColor: "bg-red-600",
      badgeBg: "bg-red-100 text-red-800 border-red-300"
    };
  } else if (budget <= 60) {
    return {
      statusText: "Precaución Presupuestaria",
      isRedAlert: false,
      colorClass: "text-amber-600 font-semibold",
      barColor: "bg-amber-500",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-300"
    };
  } else {
    return {
      statusText: "Presupuesto Óptimo",
      isRedAlert: false,
      colorClass: "text-emerald-600 font-semibold",
      barColor: "bg-emerald-500",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300"
    };
  }
}

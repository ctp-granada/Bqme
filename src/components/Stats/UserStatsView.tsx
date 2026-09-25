import React, { useState, useMemo } from 'react';
import { UserProgress, OrganSystem, SystemBadge } from '../../types';
import { getPlayerRank, getPatientHealth, getBudgetInfo } from '../../utils/gamification';
import { evaluateUserBadges } from '../../data/badges';
import { MOCK_LEADERBOARD_PEERS } from '../../data/leaderboardData';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import {
  BarChart3,
  Award,
  Flame,
  CheckCircle2,
  XCircle,
  BookOpen,
  RotateCcw,
  Heart,
  Wallet,
  Trophy,
  Users,
  Medal,
  Crown,
  Sparkles,
  Zap,
  Target,
  Lock,
  Check,
  ShieldCheck,
  Filter,
  TrendingUp,
  Activity
} from 'lucide-react';

interface UserStatsViewProps {
  userProgress: UserProgress;
  onResetProgress: () => void;
}

type TabType = 'rendimiento' | 'insignias' | 'leaderboard';
type BadgeFilter = 'all' | 'unlocked' | 'locked';

export const UserStatsView: React.FC<UserStatsViewProps> = ({
  userProgress,
  onResetProgress
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('rendimiento');
  const [badgeFilter, setBadgeFilter] = useState<BadgeFilter>('all');

  const total = userProgress.casesAttempted;
  const correct = userProgress.casesCorrect;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const userXp = userProgress.xp || userProgress.score;

  const rank = getPlayerRank(userXp);
  const health = getPatientHealth(userProgress.lives);
  const budgetInfo = getBudgetInfo(userProgress.budget);

  // Evaluate all badges
  const allBadges = evaluateUserBadges(userProgress);
  const unlockedBadgesCount = allBadges.filter((b) => b.isUnlocked).length;

  const systemNames: Record<OrganSystem, string> = {
    cardiac: '🫀 Cardíaco',
    hepatic: '🪵 Hepático / Ictericias',
    metabolic: '⚡ Metabólico / β-Oxidación',
    renal: '🫘 Renal / Urea / Uricemia',
    pancreatic: '🔬 Pancreático-Digestivo'
  };

  // Build combined Leaderboard list with user dynamically inserted
  const userEntry = {
    id: 'current-user-entry',
    name: 'Tú (Médico en Guardia)',
    avatar: '🧑‍⚕️',
    institution: 'Tu Facultad / Hospital de Guardia',
    xp: userXp,
    accuracyPct: accuracy,
    streak: userProgress.streak,
    badgeTitle: `${rank.icon} ${rank.shortTitle}`,
    specialty: 'Simulación Clínica',
    isCurrentUser: true
  };

  const allLeaderboardEntries = [...MOCK_LEADERBOARD_PEERS, userEntry]
    .sort((a, b) => b.xp - a.xp)
    .map((entry, idx) => ({
      ...entry,
      position: idx + 1
    }));

  const userLeaderboardPos = allLeaderboardEntries.find((e) => e.isCurrentUser)?.position || 1;
  const nextAboveUser = allLeaderboardEntries.find((e) => e.position === userLeaderboardPos - 1);
  const xpNeededForNextPos = nextAboveUser ? nextAboveUser.xp - userXp + 10 : 0;

  const filteredBadges = allBadges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.isUnlocked;
    if (badgeFilter === 'locked') return !b.isUnlocked;
    return true;
  });

  // Calculate evolution of accuracy rate over time for Recharts
  const accuracyEvolutionData = useMemo(() => {
    if (!userProgress.history || userProgress.history.length === 0) return [];

    let runningCorrect = 0;
    return userProgress.history.map((item, idx) => {
      if (item.isCorrect) runningCorrect += 1;
      const attemptNum = idx + 1;
      const cumulativeAccuracy = Math.round((runningCorrect / attemptNum) * 100);

      let formattedDate = `Caso #${attemptNum}`;
      if (item.timestamp) {
        try {
          const d = new Date(item.timestamp);
          formattedDate = `${d.getDate()}/${d.getMonth() + 1} #${attemptNum}`;
        } catch {
          formattedDate = `Caso #${attemptNum}`;
        }
      }

      return {
        attemptNumber: attemptNum,
        name: `Caso #${attemptNum}`,
        shortLabel: `#${attemptNum}`,
        dateLabel: formattedDate,
        caseTitle: item.caseTitle,
        system: item.system,
        systemName: systemNames[item.system] || item.system,
        isCorrect: item.isCorrect,
        accuracyPct: cumulativeAccuracy,
        scoreEarned: item.scoreEarned,
        biomarkerName: item.selectedBiomarkerName
      };
    });
  }, [userProgress.history]);

  // Helper color for bar depending on accuracy percentage
  const getBarColor = (pct: number) => {
    if (pct >= 90) return '#10b981'; // Emerald (Maestría)
    if (pct >= 70) return '#0284c7'; // Clinical Blue (Aprobado)
    if (pct >= 50) return '#f59e0b'; // Amber (Regular)
    return '#f43f5e'; // Rose (Bajo)
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header & View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2.5">
            <Activity className="w-6 h-6 text-emerald-600" />
            <span>Métricas Clínicas y Evaluación Diagnóstica</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Estadísticas cuantitativas, acreditaciones por sistema orgánico y tabla de clasificación formativa.
          </p>
        </div>

        <button
          onClick={onResetProgress}
          className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-700 hover:border-rose-200 hover:bg-rose-50 font-semibold text-xs flex items-center space-x-1.5 self-start sm:self-auto transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restablecer Progreso</span>
        </button>
      </div>

      {/* Sub-Navigation Tabs: Rendimiento vs. Insignias vs. Leaderboard */}
      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit flex-wrap">
        <button
          onClick={() => setActiveTab('rendimiento')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'rendimiento'
              ? 'bg-white text-slate-950 shadow-xs border border-slate-200/80'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Mi Rendimiento</span>
        </button>

        <button
          onClick={() => setActiveTab('insignias')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'insignias'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Insignias de Especialidad</span>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono">
            {unlockedBadgesCount}/{allBadges.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-slate-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Ranking de Cátedra</span>
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono">
            #{userLeaderboardPos}
          </span>
        </button>
      </div>

      {/* TAB 1: MI RENDIMIENTO CLÍNICO */}
      {activeTab === 'rendimiento' && (
        <div className="space-y-6">
          {/* Player Rank Gamified Banner */}
          <div className="bg-slate-950 text-white p-6 rounded-2xl shadow-xs border border-slate-800">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl shadow-inner shrink-0 text-emerald-400">
                  {rank.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Rango Clínico Actual</span>
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[10px] px-2 py-0.5 rounded uppercase">
                      Nivel {rank.levelNumber}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-white">{rank.title}</h2>
                  <p className="text-xs text-slate-400 font-mono font-medium mt-0.5">
                    {userXp} XP Acumulados
                  </p>
                </div>
              </div>

              <div className="w-full md:w-72 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Siguiente Rango</span>
                  <span className="text-white font-semibold">{rank.nextRankTitle}</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${rank.progressPct}%` }}
                  />
                </div>
                <div className="text-[10px] text-right text-slate-400 font-mono">
                  {rank.progressPct}% Completado
                </div>
              </div>
            </div>
          </div>

          {/* Global Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="p-3 bg-red-100 text-red-800 rounded-xl">
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Vidas Restantes</span>
                <span className="text-2xl font-bold text-slate-900">{userProgress.lives}/3 Corazones</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Presupuesto Sanitario</span>
                <span className="text-2xl font-bold text-slate-900">{userProgress.budget}% Restante</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Racha de Aciertos</span>
                <span className="text-2xl font-bold text-slate-900">{userProgress.streak} seguidos</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-800 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Precisión Global</span>
                <span className="text-2xl font-bold text-slate-900">{accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Recharts Bar Chart: Evolución Temporal del Porcentaje de Aciertos */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Evolución del Porcentaje de Aciertos en el Tiempo
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Muestra la curva de precisión acumulada conforme resuelves casos clínicos secuenciales.
                </p>
              </div>

              {/* Benchmarks Badge Legend */}
              <div className="flex items-center gap-3 text-[11px] font-semibold flex-wrap">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span className="text-slate-600">≥90% Maestría</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
                  <span className="text-slate-600">70-89% Aprobado</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="text-slate-600">&lt;70% Refuerzo</span>
                </div>
              </div>
            </div>

            {accuracyEvolutionData.length === 0 ? (
              <div className="py-12 px-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <BarChart3 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">Sin datos de evolución aún</p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Resuelve casos en el <strong className="text-purple-700">Modo Desafío Clínico</strong> para registrar tu curva de aprendizaje y ver cómo evoluciona tu tasa de aciertos con cada diagnóstico.
                </p>
              </div>
            ) : (
              <div className="w-full h-72 sm:h-80 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={accuracyEvolutionData}
                    margin={{ top: 20, right: 20, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="shortLabel"
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                      label={{
                        value: 'Secuencia de Casos Resueltos',
                        position: 'insideBottom',
                        offset: -15,
                        fontSize: 11,
                        fill: '#94a3b8'
                      }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 70, 90, 100]}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                      tickFormatter={(val) => `${val}%`}
                      tickLine={false}
                      axisLine={{ stroke: '#cbd5e1' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload;
                          return (
                            <div className="bg-slate-950/95 text-white p-3 rounded-xl shadow-2xl border border-slate-700 text-xs max-w-xs space-y-1.5 backdrop-blur-md">
                              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5">
                                <span className="font-bold text-amber-300 flex items-center gap-1">
                                  <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                                  {item.name}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    item.isCorrect
                                      ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/30'
                                      : 'bg-rose-900/80 text-rose-300 border border-rose-500/30'
                                  }`}
                                >
                                  {item.isCorrect ? `✓ Acierto (+${item.scoreEarned} XP)` : '✗ Error'}
                                </span>
                              </div>
                              <p className="font-semibold text-slate-100 truncate">{item.caseTitle}</p>
                              <div className="text-[11px] text-slate-400 space-y-0.5">
                                <p>Sistema: <span className="text-slate-200 font-medium">{item.systemName}</span></p>
                                <p>Prueba: <span className="text-slate-200 font-medium">{item.biomarkerName}</span></p>
                              </div>
                              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between">
                                <span className="text-slate-400 font-medium">Precisión acumulada:</span>
                                <span
                                  className={`font-mono font-black text-sm ${
                                    item.accuracyPct >= 90
                                      ? 'text-emerald-400'
                                      : item.accuracyPct >= 70
                                      ? 'text-blue-400'
                                      : 'text-rose-400'
                                  }`}
                                >
                                  {item.accuracyPct}%
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    {/* Umbral de Maestría (90%) */}
                    <ReferenceLine
                      y={90}
                      stroke="#10b981"
                      strokeDasharray="4 4"
                      label={{
                        value: 'Meta Maestría (90%)',
                        position: 'top',
                        fill: '#059669',
                        fontSize: 10,
                        fontWeight: 'bold'
                      }}
                    />
                    {/* Umbral Aprobado (70%) */}
                    <ReferenceLine
                      y={70}
                      stroke="#3b82f6"
                      strokeDasharray="3 3"
                      label={{
                        value: 'Aprobado (70%)',
                        position: 'top',
                        fill: '#2563eb',
                        fontSize: 10,
                        fontWeight: 'bold'
                      }}
                    />
                    <Bar
                      dataKey="accuracyPct"
                      radius={[6, 6, 0, 0]}
                      name="Precisión Acumulada (%)"
                      animationDuration={1000}
                    >
                      {accuracyEvolutionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getBarColor(entry.accuracyPct)}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* System Performance Grid with Badge Status */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Desglose por Sistema Orgánico y Maestría (≥90%)
              </h2>
              <button
                onClick={() => setActiveTab('insignias')}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Insignias de Especialidad</span>
                <Award className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {(Object.keys(systemNames) as OrganSystem[]).map((sys) => {
                const stats = userProgress.systemStats?.[sys] || { attempted: 0, correct: 0 };
                const sysAcc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
                const isMastered = stats.attempted >= 3 && sysAcc >= 90;

                return (
                  <div 
                    key={sys} 
                    className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                      isMastered 
                        ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/30' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 block">{systemNames[sys]}</span>
                      {isMastered ? (
                        <span className="px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-extrabold text-[9px] uppercase tracking-wider flex items-center gap-0.5">
                          <Crown className="w-2.5 h-2.5" /> Experto
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">
                          Meta: 90%
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between text-slate-500 text-[11px]">
                      <span>Casos: {stats.attempted}</span>
                      <span className={`font-bold ${isMastered ? 'text-amber-700' : 'text-slate-900'}`}>{sysAcc}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full transition-all ${isMastered ? 'bg-amber-500' : 'bg-purple-600'}`}
                        style={{ width: `${stats.attempted > 0 ? sysAcc : 0}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Resolution History Log */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 font-bold text-sm text-slate-900 uppercase tracking-wider">
              Historial de Intentos y Evaluación
            </div>

            {userProgress.history.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                Aún no has resuelto ningún caso en el modo desafío. ¡Inicia un caso para registrar tu progreso!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3">Caso Clínico</th>
                      <th className="p-3">Sistema</th>
                      <th className="p-3">Biomarcador Elegido</th>
                      <th className="p-3 text-center">Biblio</th>
                      <th className="p-3 text-center">Resultado</th>
                      <th className="p-3 text-right">Puntos</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {userProgress.history.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-3 font-bold text-slate-900 max-w-[220px] truncate">{item.caseTitle}</td>
                        <td className="p-3 capitalize">{item.system}</td>
                        <td className="p-3 text-slate-700">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span>{item.selectedBiomarkerName}</span>
                            {item.isMultiOrder && (
                              <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[9px] font-extrabold uppercase tracking-wider">
                                📋 Orden Laboratorio
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          {item.consultedLibrary ? (
                            <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                              Sí (-10%)
                            </span>
                          ) : (
                            <span className="text-slate-400">No</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          {item.isCorrect ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Acierto</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-rose-700 font-bold">
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Error</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right font-bold font-mono text-slate-900">
                          +{item.scoreEarned}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GALERÍA DE INSIGNIAS Y LOGROS DE ESPECIALIDAD */}
      {activeTab === 'insignias' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-slate-950 text-white p-6 rounded-2xl shadow-xs border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20 mb-2">
                <Crown className="w-3.5 h-3.5" />
                <span>Cuadro de Acreditación de Cátedra</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Insignias de Maestría y Competencias Clínicas
              </h2>
              <p className="text-xs text-slate-400 max-w-xl mt-1 leading-relaxed">
                Desbloquea insignias de perito alcanzando al menos un <strong className="text-emerald-400">90% de precisión diagnóstica</strong> en casos de cada sistema orgánico específico (mínimo 3 casos evaluados).
              </p>
            </div>

            {/* Badges Progress Metric Box */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center shrink-0 w-full md:w-auto min-w-[200px]">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Insignias Desbloqueadas</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 my-1 flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <span>{unlockedBadgesCount} / {allBadges.length}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {Math.round((unlockedBadgesCount / allBadges.length) * 100)}% Colección Completada
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filtrar:
              </span>
              <button
                onClick={() => setBadgeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  badgeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todas ({allBadges.length})
              </button>
              <button
                onClick={() => setBadgeFilter('unlocked')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  badgeFilter === 'unlocked'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
              >
                🏆 Desbloqueadas ({unlockedBadgesCount})
              </button>
              <button
                onClick={() => setBadgeFilter('locked')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  badgeFilter === 'locked'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                🔒 En Progreso ({allBadges.length - unlockedBadgesCount})
              </button>
            </div>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBadges.map((badge) => {
              const isUnlocked = badge.isUnlocked;

              return (
                <motion.div
                  key={badge.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isUnlocked
                      ? 'bg-white border-amber-300 shadow-md ring-1 ring-amber-400/20'
                      : 'bg-slate-50/80 border-slate-200 opacity-80'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon & Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner shrink-0 border-2 ${
                            isUnlocked
                              ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300 text-amber-950 shadow-amber-200/50'
                              : 'bg-slate-200 border-slate-300 text-slate-400 grayscale'
                          }`}
                        >
                          {badge.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                              {badge.category === 'system' ? 'Especialidad Orgánica' : 'Logro Especial'}
                            </span>
                          </div>
                          <h3 className="text-base font-black text-slate-900 leading-tight flex items-center gap-1.5">
                            <span>{badge.title}</span>
                            {isUnlocked && <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />}
                          </h3>
                        </div>
                      </div>

                      {/* Status Tag */}
                      {isUnlocked ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-2xs shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>¡Desbloqueada!</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shrink-0">
                          <Lock className="w-3 h-3" />
                          <span>Bloqueada</span>
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">
                      {badge.description}
                    </p>

                    {/* Requirement Note */}
                    <div className={`p-2.5 rounded-xl border text-[11px] font-medium leading-tight mb-4 ${
                      isUnlocked
                        ? 'bg-amber-50 border-amber-200 text-amber-950'
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      <span className="font-bold">Criterio: </span>
                      {badge.requirementDescription}
                    </div>
                  </div>

                  {/* Progress Bar & Current Stats */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-500 text-[11px]">
                        {badge.category === 'system' 
                          ? `Precisión: ${badge.currentAccuracy}% (Mín. 90%) • ${badge.currentAttempted}/${badge.minCasesRequired} casos`
                          : badge.id === 'badge_grandmaster'
                          ? `Sistemas Dominados: ${badge.currentAttempted}/5`
                          : badge.id === 'badge_streak_legend'
                          ? `Racha Actual: ${badge.currentAttempted} casos`
                          : `Presupuesto: ${badge.currentAccuracy}% • ${badge.currentAttempted} casos`}
                      </span>
                      <span className={`font-mono text-[11px] ${isUnlocked ? 'text-emerald-700' : 'text-slate-700'}`}>
                        {badge.progressPct}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${badge.progressPct}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          isUnlocked 
                            ? 'bg-gradient-to-r from-amber-500 to-emerald-500' 
                            : 'bg-purple-600'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SIMULATED GLOBAL LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Top Banner: League & Competitive Context */}
          <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xs border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 border border-slate-800 text-emerald-400 font-semibold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Liga Formativa Hospitalaria - Convocatoria 2026
                  </span>
                  <span className="text-slate-400 text-xs font-medium">Cierre de Ronda: En 3 días</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Clasificación de Residentes y Estudiantes Clínicos
                </h2>
                <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
                  Compara tu peritaje con otros médicos en formación. Los puntos de experiencia (XP) premian diagnósticos analíticos certeros sin sobrecoste analítico.
                </p>
              </div>

              {/* User Position Highlight Box */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center shrink-0 w-full md:w-auto min-w-[200px]">
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Tu Clasificación Actual</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 my-1 flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <span>#{userLeaderboardPos}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {userXp} XP Acumulados
                </p>
                {xpNeededForNextPos > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                    A <span className="font-semibold text-slate-200">{xpNeededForNextPos} XP</span> de subir al puesto #{userLeaderboardPos - 1}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Leaderboard Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                  Top 10 Estudiantes & Residentes Nacionales
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Actualizado en tiempo real | {allLeaderboardEntries.length} Participantes
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-3.5 text-center w-16">Puesto</th>
                    <th className="p-3.5">Estudiante / Médico</th>
                    <th className="p-3.5">Institución / Hospital</th>
                    <th className="p-3.5 text-center">Precisión</th>
                    <th className="p-3.5 text-center">Racha</th>
                    <th className="p-3.5 text-right font-mono">Experiencia (XP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {allLeaderboardEntries.map((entry) => {
                    const isTop1 = entry.position === 1;
                    const isTop2 = entry.position === 2;
                    const isTop3 = entry.position === 3;
                    const isUser = entry.isCurrentUser;

                    return (
                      <tr
                        key={entry.id}
                        className={`transition-colors ${
                          isUser
                            ? 'bg-blue-50/90 border-l-4 border-l-blue-600 font-bold'
                            : isTop1
                            ? 'bg-amber-50/50 hover:bg-amber-50'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Rank Position */}
                        <td className="p-3.5 text-center">
                          {isTop1 ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm shadow-xs">
                              🥇 1
                            </span>
                          ) : isTop2 ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-black text-sm shadow-xs">
                              🥈 2
                            </span>
                          ) : isTop3 ? (
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700 text-amber-50 font-black text-sm shadow-xs">
                              🥉 3
                            </span>
                          ) : (
                            <span className="font-mono text-slate-500 font-bold text-sm">
                              #{entry.position}
                            </span>
                          )}
                        </td>

                        {/* Name & Avatar */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <span className="text-xl shrink-0">{entry.avatar}</span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${isUser ? 'text-blue-900' : 'text-slate-900'}`}>
                                  {entry.name}
                                </span>
                                {isUser && (
                                  <span className="bg-blue-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    TÚ
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-500 block font-normal">
                                {entry.badgeTitle} • {entry.specialty}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Institution */}
                        <td className="p-3.5 text-slate-600">
                          {entry.institution}
                        </td>

                        {/* Accuracy */}
                        <td className="p-3.5 text-center">
                          <span
                            className={`px-2 py-1 rounded text-[11px] font-bold font-mono ${
                              entry.accuracyPct >= 85
                                ? 'bg-emerald-100 text-emerald-800'
                                : entry.accuracyPct >= 70
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {entry.accuracyPct}%
                          </span>
                        </td>

                        {/* Streak */}
                        <td className="p-3.5 text-center font-mono">
                          {entry.streak > 0 ? (
                            <span className="inline-flex items-center gap-1 text-orange-600 font-bold">
                              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                              <span>{entry.streak}</span>
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>

                        {/* XP */}
                        <td className="p-3.5 text-right font-mono font-bold text-sm text-slate-900">
                          <span className={`${isUser ? 'text-blue-700' : isTop1 ? 'text-amber-600' : ''}`}>
                            {entry.xp} XP
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Motivational Advice Banner */}
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">¿Cómo conseguir más insignias y subir en el ranking?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Resuelve casos del sistema orgánico objetivo. Si alcanzas al menos 3 casos con una precisión del 90% o superior, desbloquearás la insignia de experto de esa especialidad.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('insignias')}
              className="px-4 py-2 bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              Ver Insignias
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

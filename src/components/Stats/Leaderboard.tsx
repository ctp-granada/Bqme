import React, { useState, useMemo } from 'react';
import { UserProgress } from '../../types';
import { getPlayerRank } from '../../utils/gamification';
import { MOCK_LEADERBOARD_PEERS, PeerStudent } from '../../data/leaderboardData';
import {
  Trophy,
  Medal,
  Award,
  Users,
  Search,
  Flame,
  ChevronRight,
  GraduationCap,
  Activity,
  CheckCircle2,
  Stethoscope,
  X,
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export interface LeaderboardProps {
  userProgress: UserProgress;
  onNavigateToCases?: () => void;
  onNavigateToGames?: () => void;
}

type RankingScope = 'top10' | 'all' | 'ugr' | 'weekly';

export interface EnrichedStudentEntry extends PeerStudent {
  position: number;
  isCurrentUser: boolean;
  scoreVal: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  userProgress,
  onNavigateToCases,
  onNavigateToGames
}) => {
  const [scope, setScope] = useState<RankingScope>('top10');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<EnrichedStudentEntry | null>(null);

  const userXp = userProgress.xp || userProgress.score || 0;
  const userAccuracy =
    userProgress.casesAttempted > 0
      ? Math.round((userProgress.casesCorrect / userProgress.casesAttempted) * 100)
      : 0;
  const rank = getPlayerRank(userXp);

  // Generate Current User's enriched peer entry
  const currentUserEntry: PeerStudent = useMemo(() => {
    return {
      id: 'current-user-student',
      name: 'Tú (Médico en Guardia)',
      avatar: '🧑‍⚕️',
      institution: 'Facultad de Medicina UGR / H. PTS Granada',
      city: 'Granada',
      xp: userXp,
      score: userXp,
      casesResolved: userProgress.casesCorrect,
      accuracyPct: userAccuracy,
      streak: userProgress.streak,
      badgeTitle: `${rank.icon} ${rank.shortTitle}`,
      specialty: 'Simulación Bioquímica & MIR',
      weeklyXp: Math.round(userXp * 0.4),
      isUgr: true,
      isCurrentUser: true,
      biomarkerFocus: 'Diagnóstico Integral Multiorgánico',
      lastActive: 'Activo ahora'
    };
  }, [userXp, userAccuracy, userProgress.casesCorrect, userProgress.streak, rank.icon, rank.shortTitle]);

  // Combine mock peers with current user and sort by points (score/xp)
  const allRankedEntries: EnrichedStudentEntry[] = useMemo(() => {
    const combined = [...MOCK_LEADERBOARD_PEERS, currentUserEntry];
    // sort based on selected metric (weekly or global score)
    const sorted = combined.sort((a, b) => {
      const valB = scope === 'weekly' ? b.weeklyXp : (b.score || b.xp);
      const valA = scope === 'weekly' ? a.weeklyXp : (a.score || a.xp);
      return valB - valA;
    });

    return sorted.map((entry, idx) => ({
      ...entry,
      position: idx + 1,
      isCurrentUser: Boolean(entry.isCurrentUser),
      scoreVal: scope === 'weekly' ? entry.weeklyXp : (entry.score || entry.xp)
    }));
  }, [currentUserEntry, scope]);

  // Identify Current User's global rank & entry
  const userRankedInfo = useMemo(() => {
    return allRankedEntries.find((e) => e.isCurrentUser) || null;
  }, [allRankedEntries]);

  // Filtered entries according to tab and search
  const displayedEntries = useMemo(() => {
    let list = [...allRankedEntries];

    if (scope === 'top10') {
      list = list.slice(0, 10);
    } else if (scope === 'ugr') {
      list = list.filter((e) => e.isUgr);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.institution.toLowerCase().includes(q) ||
          e.specialty.toLowerCase().includes(q)
      );
    }

    return list;
  }, [allRankedEntries, scope, searchTerm]);

  // Specific Top 10 list for comparison metrics and curves
  const top10List = useMemo(() => {
    return allRankedEntries.slice(0, 10);
  }, [allRankedEntries]);

  // Top 3 Podium Students
  const podiumStudents = useMemo(() => {
    return top10List.slice(0, 3);
  }, [top10List]);

  // Key Clinical Metrics
  const leaderScore = top10List[0]?.scoreVal || 0;
  const top10Threshold = top10List[9]?.scoreVal || top10List[top10List.length - 1]?.scoreVal || 0;
  const top10AvgAccuracy = Math.round(
    top10List.reduce((acc, curr) => acc + curr.accuracyPct, 0) / (top10List.length || 1)
  );

  // Points needed by user to reach Top 10 or climb
  const pointsToTop10 = userRankedInfo
    ? userRankedInfo.position > 10
      ? Math.max(1, top10Threshold - userRankedInfo.scoreVal + 10)
      : 0
    : 0;

  // Chart data for Top 10 progression curve
  const chartData = useMemo(() => {
    return top10List.map((st) => ({
      puesto: `#${st.position}`,
      nombre: st.name.split(' ')[0] + ' ' + (st.name.split(' ')[1] ? st.name.split(' ')[1].charAt(0) + '.' : ''),
      puntos: st.scoreVal,
      precision: st.accuracyPct,
      esUsuario: st.isCurrentUser
    }));
  }, [top10List]);

  return (
    <div className="space-y-6">
      {/* 1. HERO HEADER: Clinical Modern Style (Pure White, Deep Navy, Titanium Gray, Subtle Emerald) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative clinical ambient lines */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500/5 via-slate-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Escalafón Académico & Rendimiento Clínico
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                Curso 2025/2026
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ranking Global de Estudiantes
            </h1>
            
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Clasificación meritocrática basada en la resolución de casos clínicos de bioquímica médica, 
              precisión diagnóstica en guardia y gestión óptima de biomarcadores. 
              Visualiza en tiempo real a los 10 mejores alumnos.
            </p>
          </div>

          {/* Quick User Rank Summary Badge */}
          {userRankedInfo && (
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 sm:p-4 shrink-0 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center text-lg font-black font-mono shadow-xs border border-slate-800">
                #{userRankedInfo.position}
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">
                  Tu Puesto Actual
                </div>
                <div className="text-base font-bold text-slate-900">
                  {userRankedInfo.scoreVal} <span className="text-xs font-normal text-slate-500">puntos (XP)</span>
                </div>
                <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                  {userRankedInfo.position <= 10 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Dentro del Cuadro de Honor Top 10
                    </span>
                  ) : (
                    <span className="text-slate-600 font-medium">
                      A <strong className="text-slate-900">{pointsToTop10} pts</strong> del Top 10
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. CLINICAL KPI CARDS (Apple Health / Medical Suite precision style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          {/* KPI 1: Líder Clínico */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5">
            <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Puntuación del Líder (#1)</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">
              {leaderScore} <span className="text-xs font-medium text-slate-500">pts</span>
            </div>
            <div className="text-[11px] text-slate-600 truncate mt-0.5">
              {top10List[0]?.name || 'Líder del servicio'}
            </div>
          </div>

          {/* KPI 2: Umbral de Acceso Top 10 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5">
            <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <Medal className="w-3.5 h-3.5 text-slate-600" />
              <span>Corte Acceso Top 10</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">
              {top10Threshold} <span className="text-xs font-medium text-slate-500">pts</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Puesto 10: {top10List[9]?.name.split(' ')[0] || '10º alumno'}
            </div>
          </div>

          {/* KPI 3: Precisión Media del Top 10 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5">
            <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Precisión Media Top 10</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono mt-1">
              {top10AvgAccuracy}%
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Acierto diagnóstico medio
            </div>
          </div>

          {/* KPI 4: Tu Posición Relativa */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-xl p-3.5">
            <div className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Tu Rendimiento</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-1">
              {userRankedInfo?.position ? `#${userRankedInfo.position}` : '-'}
              <span className="text-xs font-medium text-slate-500 ml-1">/ {allRankedEntries.length}</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Precisión propia: {userAccuracy}%
            </div>
          </div>
        </div>
      </div>

      {/* 3. PODIUM DE HONOR: Top 3 Alumnos Destacados */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Podio de Honor Médico
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Los 3 mejores estudiantes de la promoción
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {podiumStudents.map((st, idx) => {
            const isFirst = idx === 0;
            const isSecond = idx === 1;
            const isThird = idx === 2;

            const podiumMeta = isFirst
              ? {
                  badge: '🥇 Puesto 1 · Oro Clínico',
                  border: 'border-amber-300/80',
                  bg: 'bg-gradient-to-b from-amber-50/40 via-white to-white',
                  textBadge: 'text-amber-900 bg-amber-100/90 border-amber-300',
                  iconColor: 'text-amber-500'
                }
              : isSecond
              ? {
                  badge: '🥈 Puesto 2 · Plata Quirúrgica',
                  border: 'border-slate-300',
                  bg: 'bg-gradient-to-b from-slate-100/40 via-white to-white',
                  textBadge: 'text-slate-800 bg-slate-200/80 border-slate-300',
                  iconColor: 'text-slate-500'
                }
              : {
                  badge: '🥉 Puesto 3 · Bronce Hospitalario',
                  border: 'border-amber-200/60',
                  bg: 'bg-gradient-to-b from-orange-50/30 via-white to-white',
                  textBadge: 'text-amber-950 bg-amber-100/60 border-amber-200',
                  iconColor: 'text-amber-700'
                };

            return (
              <div
                key={st.id}
                onClick={() => setSelectedStudent(st)}
                className={`relative rounded-2xl p-5 border ${podiumMeta.border} ${podiumMeta.bg} shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${podiumMeta.textBadge}`}>
                      {podiumMeta.badge}
                    </span>
                    {st.isCurrentUser && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-600 text-white">
                        TÚ
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-3xl p-1 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      {st.avatar}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {st.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">{st.institution}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-[10px] font-medium text-slate-500 uppercase">Puntos</div>
                      <div className="text-sm font-black text-slate-900 font-mono">{st.scoreVal}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-slate-500 uppercase">Acierto</div>
                      <div className="text-sm font-bold text-emerald-700 font-mono">{st.accuracyPct}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-medium text-slate-500 uppercase">Racha</div>
                      <div className="text-sm font-bold text-orange-600 font-mono flex items-center justify-center gap-0.5">
                        <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                        {st.streak}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 text-[11px] text-slate-400 flex items-center justify-between group-hover:text-blue-600">
                  <span className="truncate">{st.specialty}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. PERFORMANCE CURVE OF TOP 10 (Smooth Line Chart with Apple Health / Medical Aesthetic) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Curva de Distribución de Puntos · Los 10 Mejores Alumnos
            </h3>
            <p className="text-xs text-slate-500">
              Gradiente descendente de puntuación acumulada entre los puestos 1 y 10.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              Puntos Acumulados
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Precisión (%)
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="puesto"
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: '#e2e8f0' }}
                tick={{ fill: '#64748b', fontSize: 11 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-950 text-white rounded-xl p-3 shadow-lg border border-slate-800 text-xs">
                        <div className="font-bold flex items-center justify-between gap-3">
                          <span>{data.puesto} · {data.nombre}</span>
                          {data.esUsuario && (
                            <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-extrabold">
                              TÚ
                            </span>
                          )}
                        </div>
                        <div className="mt-1.5 text-slate-300 space-y-0.5">
                          <div>Puntuación: <strong className="text-white font-mono">{data.puntos} XP</strong></div>
                          <div>Precisión: <strong className="text-emerald-400 font-mono">{data.precision}%</strong></div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="puntos"
                stroke="#0f172a"
                strokeWidth={2.5}
                fill="url(#scoreAreaGradient)"
                activeDot={{ r: 5, stroke: '#0f172a', strokeWidth: 2, fill: '#10b981' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. INTERACTIVE CONTROLS BAR: SEGMENTED FILTER & SEARCH */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Segmented Controls (Interactive buttons, clean rectangular aesthetic) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setScope('top10')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              scope === 'top10'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏆 Top 10 Alumnos
          </button>

          <button
            type="button"
            onClick={() => setScope('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              scope === 'all'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🌍 Todos ({allRankedEntries.length})
          </button>

          <button
            type="button"
            onClick={() => setScope('ugr')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              scope === 'ugr'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏛️ Alumnos UGR Granada
          </button>

          <button
            type="button"
            onClick={() => setScope('weekly')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              scope === 'weekly'
                ? 'bg-white text-slate-900 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚡ Ranking Semanal
          </button>
        </div>

        {/* Search input with clean clinical look */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por alumno, hospital o especialidad..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 6. MAIN RANKING DATA TABLE: Clinical Modern Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">
              {scope === 'top10'
                ? 'Listado de los 10 Mejores Alumnos'
                : scope === 'ugr'
                ? 'Listado de Estudiantes UGR Granada'
                : scope === 'weekly'
                ? 'Puntuación Semanal Activa'
                : 'Listado General de Estudiantes'}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-mono">
              Mostrando {displayedEntries.length} de {allRankedEntries.length} alumnos
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Haz clic en un alumno para inspeccionar su ficha clínica
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4 text-center w-16">Puesto</th>
                <th className="py-3 px-4">Estudiante / Rango</th>
                <th className="py-3 px-4 hidden md:table-cell">Facultad / Hospital</th>
                <th className="py-3 px-4 text-center">Precisión</th>
                <th className="py-3 px-4 text-center hidden sm:table-cell">Racha</th>
                <th className="py-3 px-4 text-center hidden lg:table-cell">Casos</th>
                <th className="py-3 px-4 text-right">Puntos Acumulados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedEntries.map((st) => {
                const isTop1 = st.position === 1;
                const isTop2 = st.position === 2;
                const isTop3 = st.position === 3;
                const isUser = st.isCurrentUser;

                return (
                  <tr
                    key={st.id}
                    onClick={() => setSelectedStudent(st)}
                    className={`transition-colors cursor-pointer ${
                      isUser
                        ? 'bg-blue-50/70 border-l-4 border-l-blue-600 font-bold hover:bg-blue-50'
                        : isTop1
                        ? 'bg-amber-50/30 hover:bg-amber-50/60'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Position / Rank */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {isTop1 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-400 text-amber-950 font-black text-xs shadow-2xs">
                          #1
                        </span>
                      ) : isTop2 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-300 text-slate-900 font-black text-xs shadow-2xs">
                          #2
                        </span>
                      ) : isTop3 ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-700 text-amber-50 font-black text-xs shadow-2xs">
                          #3
                        </span>
                      ) : (
                        <span className={`font-bold ${st.position <= 10 ? 'text-slate-800' : 'text-slate-400'}`}>
                          #{st.position}
                        </span>
                      )}
                    </td>

                    {/* Student Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl shrink-0 p-1 bg-white rounded-lg border border-slate-200">
                          {st.avatar}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold truncate ${isUser ? 'text-blue-900' : 'text-slate-900'}`}>
                              {st.name}
                            </span>
                            {isUser && (
                              <span className="bg-blue-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0">
                                TÚ
                              </span>
                            )}
                            {st.isUgr && (
                              <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 hidden sm:inline shrink-0">
                                UGR
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 font-normal truncate mt-0.5">
                            {st.badgeTitle} · {st.specialty}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Institution */}
                    <td className="py-3.5 px-4 text-slate-600 hidden md:table-cell max-w-[200px] truncate">
                      {st.institution}
                    </td>

                    {/* Accuracy */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md font-mono font-bold text-xs ${
                          st.accuracyPct >= 85
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                            : st.accuracyPct >= 70
                            ? 'bg-amber-50 text-amber-800 border border-amber-200/60'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {st.accuracyPct}%
                      </span>
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center font-mono hidden sm:table-cell">
                      {st.streak > 0 ? (
                        <span className="inline-flex items-center gap-1 text-orange-600 font-bold">
                          <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                          {st.streak}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* Cases completed */}
                    <td className="py-3.5 px-4 text-center font-mono text-slate-600 hidden lg:table-cell">
                      {st.casesResolved}
                    </td>

                    {/* Points / XP */}
                    <td className="py-3.5 px-4 text-right font-mono font-black text-sm text-slate-900">
                      <span className={isUser ? 'text-blue-700' : isTop1 ? 'text-amber-600' : ''}>
                        {st.scoreVal}{' '}
                        <span className="text-[10px] font-normal text-slate-500">
                          {scope === 'weekly' ? 'XP/sem' : 'pts'}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {displayedEntries.length === 0 && (
          <div className="p-8 text-center text-slate-500 space-y-2">
            <p className="text-sm font-semibold">No se encontraron estudiantes con ese criterio.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setScope('top10');
              }}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Restablecer a los 10 mejores alumnos
            </button>
          </div>
        )}
      </div>

      {/* 7. CURRENT USER STANDING CARD (If outside Top 10 or to encourage climbing) */}
      {userRankedInfo && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
              🧑‍⚕️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-white text-base">
                  Tu Estado Clínico: Puesto #{userRankedInfo.position} de {allRankedEntries.length}
                </h4>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-700/60 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {userRankedInfo.badgeTitle}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                {userRankedInfo.position <= 10
                  ? `¡Enhorabuena! Te encuentras dentro de los 10 mejores alumnos con ${userRankedInfo.scoreVal} puntos acumulados y un ${userAccuracy}% de precisión diagnóstica.`
                  : `Te faltan solo ${pointsToTop10} puntos para alcanzar el puesto 10 del escalafón y entrar al podio de honor de la Facultad de Medicina.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            {onNavigateToCases && (
              <button
                type="button"
                onClick={onNavigateToCases}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Resolver Casos Clínicos</span>
              </button>
            )}

            {onNavigateToGames && (
              <button
                type="button"
                onClick={onNavigateToGames}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-all border border-slate-700 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Minijuegos & Reto</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 8. STUDENT CLINICAL DOSSIER INSPECTOR (Modal slide-in when clicking a student) */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-1 bg-slate-800 rounded-xl border border-slate-700">
                  {selectedStudent.avatar}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">
                      {selectedStudent.name}
                    </h3>
                    {selectedStudent.isCurrentUser && (
                      <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                        TÚ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300">{selectedStudent.institution}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] text-slate-500 font-medium uppercase block">Puesto Escalafón</span>
                  <span className="text-xl font-black font-mono text-slate-900">#{selectedStudent.position}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] text-slate-500 font-medium uppercase block">Puntos Acumulados</span>
                  <span className="text-xl font-black font-mono text-slate-900">{selectedStudent.scoreVal} pts</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] text-slate-500 font-medium uppercase block">Precisión Diagnóstica</span>
                  <span className="text-xl font-black font-mono text-emerald-700">{selectedStudent.accuracyPct}%</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <span className="text-[10px] text-slate-500 font-medium uppercase block">Casos Completados</span>
                  <span className="text-xl font-black font-mono text-slate-900">{selectedStudent.casesResolved}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Rango / Categoría:</span>
                  <span className="font-semibold text-slate-900">{selectedStudent.badgeTitle}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Área de Especialidad:</span>
                  <span className="font-semibold text-slate-900">{selectedStudent.specialty}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Biomarcadores de Dominio:</span>
                  <span className="font-medium text-slate-700 text-right max-w-[200px]">
                    {selectedStudent.biomarkerFocus || 'Diagnóstico clínico general'}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Última Actividad:</span>
                  <span className="font-medium text-slate-700">{selectedStudent.lastActive || 'Reciente'}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudent(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Leaderboard;

import React from 'react';
import { UserProgress, OrganSystem } from '../types';
import {
  getPlayerRank,
  getPatientHealth,
  getBudgetInfo,
  getStreakMultiplier
} from '../utils/gamification';
import { evaluateUserBadges } from '../data/badges';
import { Heart, Flame, Wallet, RefreshCw, Trophy, AlertTriangle, Award, Crown, Sparkles, HelpCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface GamifiedDashboardProps {
  userProgress: UserProgress;
  onResetGuardia: () => void;
  onOpenStats?: () => void;
}

export const GamifiedDashboard: React.FC<GamifiedDashboardProps> = ({
  userProgress,
  onResetGuardia,
  onOpenStats
}) => {
  const [showBudgetTooltip, setShowBudgetTooltip] = React.useState(false);
  const rank = getPlayerRank(userProgress.xp || userProgress.score);
  const health = getPatientHealth(userProgress.lives);
  const budgetInfo = getBudgetInfo(userProgress.budget);
  const streakInfo = getStreakMultiplier(userProgress.streak);

  const badges = evaluateUserBadges(userProgress);
  const unlockedBadges = badges.filter((b) => b.isUnlocked);

  const systemNames: Record<OrganSystem, string> = {
    cardiac: 'Cardíaco',
    hepatic: 'Hepático / Ictericias',
    metabolic: 'Metabolismo / β-Oxidación',
    renal: 'Renal / Urea / Uricemia',
    pancreatic: 'Pancreático-Digestivo'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-6 overflow-hidden">
      {/* Top Header: Player Profile Rank & Hearts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-5 border-b border-slate-100">
        
        {/* Card 1: Perfil y Rango Médico (Deep Navy Clinical Master) */}
        <div className="bg-slate-950 text-white rounded-xl p-4 flex flex-col justify-between shadow-xs border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Perfil Facultativo</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${rank.badgeBg} ${rank.badgeTextColor} ${rank.badgeBorder}`}>
              Nivel {rank.levelNumber}
            </span>
          </div>

          <div className="flex items-center gap-3 my-1">
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0">
              {rank.icon}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-sm text-white leading-tight truncate">{rank.title}</h3>
              <p className="text-xs text-emerald-400 font-mono font-bold mt-0.5">{userProgress.xp || userProgress.score} XP</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span className="truncate pr-1">Sig: {rank.nextRankTitle}</span>
              <span className="font-mono font-bold text-slate-300">{rank.progressPct}%</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${rank.progressPct}%` }}
                className="bg-emerald-500 h-full rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Salud del Paciente (Vidas) - Pure White & Titanium */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Salud del Paciente</span>
              <span className={`text-[11px] font-bold ${health.colorClass}`}>{health.statusText}</span>
            </div>

            <div className="flex items-center gap-2 my-2">
              {[1, 2, 3].map((heartIndex) => {
                const isAlive = heartIndex <= userProgress.lives;
                return (
                  <motion.div
                    key={heartIndex}
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <Heart
                      className={`w-7 h-7 transition-all ${
                        isAlive
                          ? 'text-rose-500 fill-rose-500'
                          : 'text-slate-200 fill-slate-100'
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-600 border-t border-slate-100">
            <span>Guardia: <strong className="text-slate-900 font-mono">{userProgress.lives}/3</strong> vidas</span>
            {userProgress.lives < 3 && (
              <button
                onClick={onResetGuardia}
                className="text-[10px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Restablecer</span>
              </button>
            )}
          </div>
        </div>

        {/* Card 3: Presupuesto Sanitario en Tiempo Real */}
        {(() => {
          const isCriticalUnder10 = userProgress.budget < 10;
          return (
            <div
              className={`rounded-xl p-4 border flex flex-col justify-between relative transition-all bg-white ${
                isCriticalUnder10
                  ? 'border-rose-400 ring-2 ring-rose-500/20'
                  : budgetInfo.isRedAlert
                  ? 'border-amber-300'
                  : 'border-slate-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Wallet className={`w-3.5 h-3.5 ${isCriticalUnder10 ? 'text-rose-600' : 'text-emerald-600'}`} />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-slate-600">
                      Presupuesto
                    </span>
                    
                    {/* Tooltip trigger button */}
                    <div className="relative inline-block">
                      <button
                        type="button"
                        onClick={() => setShowBudgetTooltip((prev) => !prev)}
                        onMouseEnter={() => setShowBudgetTooltip(true)}
                        onMouseLeave={() => setShowBudgetTooltip(false)}
                        aria-label="Información de gestión presupuestaria"
                        className="text-slate-400 hover:text-slate-700 transition-colors p-0.5 rounded cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>

                      {/* Tooltip Card Popover */}
                      {showBudgetTooltip && (
                        <div
                          onMouseEnter={() => setShowBudgetTooltip(true)}
                          onMouseLeave={() => setShowBudgetTooltip(false)}
                          className="absolute z-50 left-0 top-full mt-2 w-72 sm:w-80 bg-slate-950 text-white rounded-xl p-3.5 shadow-2xl border border-slate-800 text-xs backdrop-blur-md pointer-events-auto transition-all animate-in fade-in zoom-in-95 duration-150"
                        >
                          <div className="flex items-center gap-1.5 font-bold text-slate-100 pb-2 border-b border-slate-800 text-[11px] uppercase tracking-wide">
                            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Gestión de Presupuesto Clínico</span>
                          </div>

                          <div className="space-y-2 mt-2.5 text-[11px] leading-relaxed">
                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                              <strong className="text-rose-400 block font-semibold">Costes de Pruebas</strong>
                              <span className="text-slate-300 text-[10px]">
                                Cada biomarcador solicitado descuenta un coste de laboratorio (5% a 20%). Solicitar paneles innecesarios penaliza la eficiencia.
                              </span>
                            </div>

                            <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                              <strong className="text-emerald-400 block font-semibold">Reembolsos de Eficiencia</strong>
                              <span className="text-slate-300 text-[10px]">
                                Diagnosticar con batería analítica exacta otorga reembolsos asistenciales (+10% a +20%).
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isCriticalUnder10
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : budgetInfo.badgeBg
                  }`}>
                    {userProgress.budget}%
                  </span>
                </div>

                <div className="my-2">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200 p-0.5">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: `${Math.max(0, userProgress.budget)}%` }}
                      className={`h-full rounded-full transition-all ${
                        isCriticalUnder10 ? 'bg-rose-600' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {isCriticalUnder10 ? (
                <div className="mt-1 bg-rose-50 border border-rose-200 rounded-lg px-2 py-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <p className="text-[10px] font-bold text-rose-700 leading-tight">
                    Presupuesto crítico (&lt;10%). Optimiza tus peticiones analíticas.
                  </p>
                </div>
              ) : (
                <p className={`text-[11px] ${budgetInfo.colorClass} flex items-center gap-1 mt-1`}>
                  {budgetInfo.isRedAlert && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  <span>{budgetInfo.statusText}</span>
                </p>
              )}
            </div>
          );
        })()}

        {/* Card 4: Racha Activa y Multiplicador (Pure White + Emerald Tone) */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-4 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-emerald-600" />
              <span>Racha de Aciertos</span>
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-[10px] px-2 py-0.5 rounded-full">
              {streakInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-2 my-1">
            <span className="text-xl">✨</span>
            <div>
              <span className="text-2xl font-bold text-slate-900 font-mono leading-none">{userProgress.streak}</span>
              <span className="text-xs text-slate-500 ml-1.5 font-medium">seguidos</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-100">
            {userProgress.streak >= 2 ? `Multiplicador x${streakInfo.multiplier} activo` : '2 aciertos consecutivos activan multiplicador'}
          </div>
        </div>

      </div>

      {/* System Stats Mini Breakdown & Badges Row */}
      <div className="mt-4 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Especialidades:</span>
          {(Object.keys(systemNames) as OrganSystem[]).map((sys) => {
            const stats = userProgress.systemStats?.[sys] || { attempted: 0, correct: 0 };
            const sysAcc = stats.attempted > 0 ? Math.round((stats.correct / stats.attempted) * 100) : 0;
            const isExpert = stats.attempted >= 3 && sysAcc >= 90;

            return (
              <div
                key={sys}
                className={`border px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-colors ${
                  isExpert
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <span>{systemNames[sys]}</span>
                <span className={`font-mono text-[11px] font-bold ${isExpert ? 'text-emerald-700' : sysAcc >= 80 ? 'text-slate-900' : 'text-slate-500'}`}>
                  {stats.attempted > 0 ? `${sysAcc}%` : '—'}
                </span>
                {isExpert && <Crown className="w-3 h-3 text-emerald-600" />}
              </div>
            );
          })}
        </div>

        {/* Unlocked Badges count or shortcut */}
        <div className="flex items-center gap-3">
          {unlockedBadges.length > 0 && (
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg text-xs">
              <Award className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-slate-800 text-[11px]">
                {unlockedBadges.length} {unlockedBadges.length === 1 ? 'Insignia' : 'Insignias'}
              </span>
              <div className="flex items-center -space-x-1 ml-1">
                {unlockedBadges.slice(0, 4).map((b) => (
                  <span key={b.id} title={b.title} className="text-sm cursor-help">
                    {b.icon}
                  </span>
                ))}
              </div>
            </div>
          )}

          {onOpenStats && (
            <button
              onClick={onOpenStats}
              className="text-xs font-semibold text-slate-800 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trophy className="w-3.5 h-3.5 text-slate-700" />
              <span>Insignias & Analíticas</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

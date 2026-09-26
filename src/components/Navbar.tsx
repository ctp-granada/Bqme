import React from 'react';
import { ActiveModule, UserProgress } from '../types';
import { getPlayerRank, getStreakMultiplier } from '../utils/gamification';
import { User } from '@supabase/supabase-js';
import {
  Home,
  Building2,
  Stethoscope,
  Target,
  FlaskConical,
  GraduationCap,
  BookOpen,
  BarChart3,
  Heart,
  Flame,
  Sparkles,
  Zap,
  LogIn,
  LogOut,
  User as UserIcon,
  Cloud,
  RefreshCw,
  ArrowLeft,
  Trees
} from 'lucide-react';

interface NavbarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  userProgress: UserProgress;
  onStartTour?: () => void;
  user?: User | null;
  syncStatus?: 'idle' | 'syncing' | 'saved' | 'error';
  onOpenAuthModal?: () => void;
  onSignOut?: () => void;
  onOpenFirebaseModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeModule,
  setActiveModule,
  userProgress,
  onStartTour,
  user,
  syncStatus = 'idle',
  onOpenAuthModal,
  onSignOut,
  onOpenFirebaseModal
}) => {
  const rank = getPlayerRank(userProgress.xp || userProgress.score);
  const streakInfo = getStreakMultiplier(userProgress.streak);
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Alumno';

  // Check if user has entered one of the 3 key districts or stats
  const isHospital = activeModule === 'casos' || activeModule === 'desafio';
  const isLibrary = activeModule === 'docencia' || activeModule === 'biblioteca';
  const isPark = activeModule === 'laboratorios' || activeModule === 'reto-diario';
  const isStats = activeModule === 'estadisticas';
  const isInsideKeyPlace = isHospital || isLibrary || isPark || isStats;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      {/* 1. TOP HEADER: Deep Navy Institutional Bar with UGR Medical Identity */}
      <div className="bg-slate-950 text-white px-4 py-2.5 sm:py-3 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          {/* Main Brand Identifier: Bioquímica Médica UGR */}
          <div 
            id="tour-brand-header"
            className="flex items-center justify-center gap-3 cursor-pointer group"
            onClick={() => setActiveModule('inicio')}
          >
            {/* Logo Badge: Deep Slate & Emerald Accent with UGR insignia */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xs sm:text-sm tracking-tight shadow-xs border border-slate-700 group-hover:border-emerald-500/60 transition-all shrink-0 relative">
              <span className="text-slate-100 font-extrabold">U</span>
              <span className="text-emerald-400 font-black">·</span>
              <span className="text-slate-300 font-extrabold">GR</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-none">
                  BIOQUÍMICA<span className="text-emerald-400 font-extrabold"> MÉDICA</span>
                </h1>
                <span className="bg-slate-900 border border-slate-700 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Facultad de Medicina UGR
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-normal text-slate-300 tracking-normal mt-0.5 max-w-xl">
                Cátedra de Bioquímica y Biología Molecular • Simulador Clínico & Laboratorios
              </p>
            </div>
          </div>

          {/* User Auth and Cloud Sync Status in Top Right */}
          <div className="flex items-center gap-2">
            {/* Cloud Sync Status Indicator */}
            {user && (
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300"
                title={
                  syncStatus === 'syncing'
                    ? 'Sincronizando con Supabase...'
                    : syncStatus === 'saved'
                    ? 'Progreso guardado en la nube'
                    : 'Conectado a la nube'
                }
              >
                {syncStatus === 'syncing' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span className="text-emerald-200 hidden sm:inline">Sincronizando...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 font-medium hidden sm:inline">Nube Activa</span>
                  </>
                )}
              </div>
            )}

            {/* Auth Button: Login / User Profile */}
            {user ? (
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px] uppercase">
                  {userName.charAt(0)}
                </div>
                <span className="font-semibold max-w-[100px] truncate hidden sm:inline text-slate-200">{userName}</span>
                <button
                  onClick={onSignOut}
                  title="Cerrar sesión de alumno"
                  className="p-1 text-slate-400 hover:text-red-300 transition-colors ml-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-2xs border border-slate-700 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span>Acceso Alumno UGR</span>
              </button>
            )}

            {/* Firebase Hub Button */}
            {onOpenFirebaseModal && (
              <button
                onClick={onOpenFirebaseModal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/80 hover:bg-amber-900/90 border border-amber-600/70 text-amber-200 hover:text-white text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                title="Configuración de Firebase Firestore & Hosting UGR"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span className="hidden sm:inline">Firebase Hub</span>
              </button>
            )}

            {/* Quick Tour Button */}
            {onStartTour && (
              <button
                onClick={onStartTour}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer"
                title="Iniciar Tour Guiado de Bienvenida"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden lg:inline">Guía Rápida</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. CONTEXTUAL LOWER BAR: Visible ONLY when user enters Hospital, Biblioteca, Parque, or Estadísticas */}
      {isInsideKeyPlace && (
        <div className="px-4 sm:px-8 py-2.5 bg-white border-b border-slate-200/90 shadow-2xs animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Left: Back to City Plano + Contextual Place Tabs */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto overflow-x-auto">
              {/* Back to Landing Page / City Entrance Button */}
              <button
                onClick={() => setActiveModule('inicio')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer group"
                title="Volver a la Pantalla Principal (Hospital, Biblioteca, Parque)"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
                <span>Volver al Inicio</span>
              </button>

              <div className="h-5 w-px bg-slate-200 shrink-0 hidden sm:block" />

              {/* HOSPITAL TABS */}
              {isHospital && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
                    <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
                    <span>HOSPITAL CLÍNICO</span>
                  </span>

                  <button
                    onClick={() => setActiveModule('casos')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeModule === 'casos'
                        ? 'bg-rose-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Casos Clínicos</span>
                  </button>

                  <button
                    onClick={() => setActiveModule('desafio')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeModule === 'desafio'
                        ? 'bg-slate-950 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Target className="w-3.5 h-3.5 text-rose-400" />
                    <span>Modo Desafío (Guardia)</span>
                  </button>
                </div>
              )}

              {/* BIBLIOTECA TABS */}
              {isLibrary && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>BIBLIOTECA MÉDICA</span>
                  </span>

                  <button
                    onClick={() => setActiveModule('docencia')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeModule === 'docencia'
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Material Docente & MIR</span>
                  </button>

                  <button
                    onClick={() => setActiveModule('biblioteca')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeModule === 'biblioteca'
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Vademécum de Biomarcadores</span>
                  </button>
                </div>
              )}

              {/* PARQUE TABS */}
              {isPark && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <Trees className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PARQUE LÚDICO</span>
                  </span>

                  <button
                    onClick={() => setActiveModule('laboratorios')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeModule === 'laboratorios'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <FlaskConical className="w-3.5 h-3.5" />
                    <span>Laboratorios Virtuales</span>
                  </button>

                  <button
                    onClick={() => setActiveModule('reto-diario')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeModule === 'reto-diario'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>Reto Diario (2x XP)</span>
                  </button>
                </div>
              )}

              {/* STATS TABS */}
              {isStats && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold">
                    <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
                    <span>EXPEDIENTE ACADÉMICO</span>
                  </span>

                  <button
                    onClick={() => setActiveModule('estadisticas')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white shadow-xs"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Progreso & Insignias</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Gamification Status */}
            <div className="flex items-center justify-end gap-2 sm:gap-2.5 shrink-0">
              {/* Challenge Mode Live Status: Hearts & Streak */}
              {activeModule === 'desafio' && (
                <>
                  <div 
                    className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5 shadow-2xs" 
                    title="Vidas del Paciente (3 vidas por guardia médica)"
                  >
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight hidden sm:inline">Vidas:</span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3].map((h) => (
                        <Heart
                          key={h}
                          className={`w-3.5 h-3.5 transition-all ${
                            h <= userProgress.lives
                              ? 'text-rose-500 fill-rose-500'
                              : 'text-slate-300 fill-slate-200 opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {userProgress.streak > 0 && (
                    <div 
                      className="bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl flex items-center gap-1 text-emerald-900 text-xs font-semibold shadow-2xs"
                      title={`Racha Actual: ${userProgress.streak} aciertos seguidos (+${(streakInfo.multiplier - 1) * 100}% bonus)`}
                    >
                      <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                      <span>{userProgress.streak}</span>
                      <span className="text-[10px] text-emerald-700 font-mono hidden sm:inline">x{streakInfo.multiplier}</span>
                    </div>
                  )}
                </>
              )}

              {/* Rank Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-semibold shadow-2xs ${rank.badgeBg} ${rank.badgeTextColor} ${rank.badgeBorder}`}>
                <span>{rank.icon}</span>
                <span className="truncate max-w-[110px] sm:max-w-[130px]">{rank.shortTitle}</span>
              </div>

              {/* XP Score Badge */}
              <div className="bg-slate-900 text-white px-3 py-1 rounded-xl flex items-center gap-1.5 text-xs font-bold font-mono shadow-2xs border border-slate-800">
                <span className="text-emerald-400">XP</span>
                <span>{userProgress.xp || userProgress.score}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Sub-Navigation Bar for Small Screens: Only visible inside places */}
      {isInsideKeyPlace && (
        <div className="md:hidden flex items-center justify-around bg-slate-950 px-2 py-2 text-xs font-medium fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 text-white">
          <button
            onClick={() => setActiveModule('inicio')}
            className="px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 text-emerald-400 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[9px]">Plano Ciudad</span>
          </button>
          {isHospital && (
            <>
              <button
                onClick={() => setActiveModule('casos')}
                className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
                  activeModule === 'casos' ? 'text-rose-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Stethoscope className="w-4 h-4" />
                <span className="text-[9px]">Casos</span>
              </button>
              <button
                onClick={() => setActiveModule('desafio')}
                className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
                  activeModule === 'desafio' ? 'text-rose-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Target className="w-4 h-4" />
                <span className="text-[9px]">Desafío</span>
              </button>
            </>
          )}
          {isLibrary && (
            <>
              <button
                onClick={() => setActiveModule('docencia')}
                className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
                  activeModule === 'docencia' ? 'text-blue-400 font-bold' : 'text-slate-400'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="text-[9px]">Temario</span>
              </button>
              <button
                onClick={() => setActiveModule('biblioteca')}
                className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
                  activeModule === 'biblioteca' ? 'text-blue-400 font-bold' : 'text-slate-400'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-[9px]">Biomarcadores</span>
              </button>
            </>
          )}
          {isPark && (
            <>
              <button
                onClick={() => setActiveModule('laboratorios')}
                className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
                  activeModule === 'laboratorios' ? 'text-emerald-400 font-bold' : 'text-slate-400'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                <span className="text-[9px]">Labs</span>
              </button>
              <button
                onClick={() => setActiveModule('reto-diario')}
                className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
                  activeModule === 'reto-diario' ? 'text-amber-400 font-bold' : 'text-slate-400'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="text-[9px]">Reto Diario</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};



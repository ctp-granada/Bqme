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
  RefreshCw
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

      {/* 2. LOWER BAR: Complete Academic Navigation Sections */}
      <div className="px-4 sm:px-8 py-2 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Main Navigation Modules */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-auto justify-center overflow-x-auto">
            {/* 1. Portal Home */}
            <button
              onClick={() => setActiveModule('inicio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'inicio'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Home className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'inicio' ? 'text-emerald-600' : 'text-slate-500'}`} />
              <span>Inicio</span>
            </button>

            {/* 2. Ciudad Biomédica (Mapa Interactivo: Hospital, Biblioteca, Parque) */}
            <button
              onClick={() => setActiveModule('ciudad')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'ciudad'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60 font-semibold'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'ciudad' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span>Ciudad Biomédica</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                activeModule === 'ciudad' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
              }`}>
                3 Lugares
              </span>
            </button>

            {/* 3. Clinical Simulator Cases */}
            <button
              onClick={() => setActiveModule('casos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'casos'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Stethoscope className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'casos' ? 'text-slate-900' : 'text-slate-500'}`} />
              <span>Simulador de Casos</span>
            </button>

            {/* 3. Challenge Mode */}
            <button
              onClick={() => setActiveModule('desafio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'desafio'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Target className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'desafio' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>Modo Desafío</span>
            </button>

            {/* 4. Daily Challenge */}
            <button
              onClick={() => setActiveModule('reto-diario')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'reto-diario'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'reto-diario' ? 'text-white fill-white' : 'text-emerald-600 fill-emerald-600'}`} />
              <span>Reto Diario</span>
            </button>

            {/* 5. Interactive Labs (Randle, Ictericias, Hemostasia) */}
            <button
              onClick={() => setActiveModule('laboratorios')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'laboratorios'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FlaskConical className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'laboratorios' ? 'text-amber-700' : 'text-slate-500'}`} />
              <span>Laboratorios Virtuales</span>
            </button>

            {/* 6. Teaching Material (Temario, Seminarios, MIR) */}
            <button
              onClick={() => setActiveModule('docencia')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'docencia'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <GraduationCap className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'docencia' ? 'text-blue-600' : 'text-slate-500'}`} />
              <span>Material Docente</span>
            </button>

            {/* 7. Biomarker Reference Library */}
            <button
              onClick={() => setActiveModule('biblioteca')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'biblioteca'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'biblioteca' ? 'text-slate-900' : 'text-slate-500'}`} />
              <span>Biblioteca</span>
            </button>

            {/* 8. Progress & Stats */}
            <button
              onClick={() => setActiveModule('estadisticas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeModule === 'estadisticas'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BarChart3 className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'estadisticas' ? 'text-slate-900' : 'text-slate-500'}`} />
              <span>Progreso</span>
            </button>
          </nav>

          {/* Gamification Bar: Level Rank, XP and Active Simulation Status */}
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap">
            {/* Challenge Mode Live Status: Hearts & Streak */}
            {activeModule === 'desafio' && (
              <>
                {/* Hearts / Patient Lives */}
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

                {/* Flame Streak */}
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

      {/* Mobile Sub-Navigation Bar for Small Screens */}
      <div className="md:hidden flex items-center justify-around bg-slate-950 px-2 py-2 text-xs font-medium fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 text-white">
        <button
          onClick={() => setActiveModule('inicio')}
          className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
            activeModule === 'inicio' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px]">Inicio</span>
        </button>
        <button
          onClick={() => setActiveModule('casos')}
          className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
            activeModule === 'casos' ? 'text-white font-bold' : 'text-slate-400'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span className="text-[9px]">Casos</span>
        </button>
        <button
          onClick={() => setActiveModule('laboratorios')}
          className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
            activeModule === 'laboratorios' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span className="text-[9px]">Labs</span>
        </button>
        <button
          onClick={() => setActiveModule('docencia')}
          className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
            activeModule === 'docencia' ? 'text-blue-400 font-bold' : 'text-slate-400'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-[9px]">Docencia</span>
        </button>
        <button
          onClick={() => setActiveModule('estadisticas')}
          className={`px-2 py-1 rounded-lg flex flex-col items-center gap-0.5 ${
            activeModule === 'estadisticas' ? 'text-white font-bold' : 'text-slate-400'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span className="text-[9px]">Stats</span>
        </button>
      </div>
    </header>
  );
};



import React, { useState, useEffect } from 'react';
import { RandleCycleLab } from './RandleCycleLab';
import { JaundiceSimulatorLab } from './JaundiceSimulatorLab';
import { HemostasisLab } from './HemostasisLab';
import { GamesHub } from './GamesHub';
import { UserProgress, ActiveModule } from '../../types';
import { RefreshCw, Droplets, FlaskConical, Layers, ArrowLeft, Gamepad2, Heart, Sparkles } from 'lucide-react';

interface InteractiveLabsContainerProps {
  initialLab?: 'randle' | 'ictericias' | 'hemostasia' | 'juegos';
  onBackToPortal?: () => void;
  userProgress?: UserProgress;
  onRechargeLife?: (amount?: number) => void;
  onAddBonusXP?: (amount: number, reason: string) => void;
  onNavigate?: (module: ActiveModule) => void;
}

export const InteractiveLabsContainer: React.FC<InteractiveLabsContainerProps> = ({
  initialLab = 'randle',
  onBackToPortal,
  userProgress,
  onRechargeLife,
  onAddBonusXP,
  onNavigate = () => {}
}) => {
  const [selectedLab, setSelectedLab] = useState<'randle' | 'ictericias' | 'hemostasia' | 'juegos'>(initialLab);

  useEffect(() => {
    if (initialLab) {
      setSelectedLab(initialLab);
    }
  }, [initialLab]);

  const hasLostLives = userProgress ? userProgress.lives < (userProgress.maxLives || 3) : false;

  return (
    <div className="space-y-6">
      {/* Top Bar Switcher between the interactive tools and recovery minigames */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBackToPortal && (
            <button
              onClick={onBackToPortal}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Volver al Portal de la Asignatura"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Parque Biomédico & Laboratorios Virtuales
            </span>
            <h2 className="text-base font-bold text-slate-900">
              {selectedLab === 'juegos'
                ? 'Kiosco Lúdico: Minijuegos, Recarga de Vidas y Bonificación'
                : 'Modelos Moleculares y Simuladores Fisiopatológicos'}
            </h2>
          </div>
        </div>

        {/* 4 Switcher Tabs: 3 Labs + 1 Minigames Hub */}
        <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 w-full lg:w-auto overflow-x-auto">
          <button
            onClick={() => setSelectedLab('juegos')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer relative ${
              selectedLab === 'juegos'
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/50'
            }`}
          >
            <Gamepad2 className={`w-3.5 h-3.5 ${selectedLab === 'juegos' ? 'text-white' : 'text-emerald-600'}`} />
            <span>Minijuegos & Vidas</span>
            {hasLostLives && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            )}
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              selectedLab === 'juegos' ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-100 text-emerald-800'
            }`}>
              +1 ❤️
            </span>
          </button>

          <button
            onClick={() => setSelectedLab('randle')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedLab === 'randle'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${selectedLab === 'randle' ? 'text-emerald-600' : 'text-slate-500'}`} />
            <span>Ciclo de Randle</span>
          </button>

          <button
            onClick={() => setSelectedLab('ictericias')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedLab === 'ictericias'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FlaskConical className={`w-3.5 h-3.5 ${selectedLab === 'ictericias' ? 'text-amber-700' : 'text-slate-500'}`} />
            <span>Simulador Ictericias</span>
          </button>

          <button
            onClick={() => setSelectedLab('hemostasia')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedLab === 'hemostasia'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90 font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplets className={`w-3.5 h-3.5 ${selectedLab === 'hemostasia' ? 'text-rose-700' : 'text-slate-500'}`} />
            <span>Hemostasia</span>
          </button>
        </div>
      </div>

      {/* Render active tool */}
      {selectedLab === 'juegos' && (
        <GamesHub
          userProgress={userProgress || {
            score: 0,
            xp: 0,
            lives: 3,
            maxLives: 3,
            budget: 100,
            casesAttempted: 0,
            casesCorrect: 0,
            streak: 0,
            currentLevel: 'intermedio',
            libraryConsultations: 0,
            systemStats: { cardiac: { attempted: 0, correct: 0 }, hepatic: { attempted: 0, correct: 0 }, metabolic: { attempted: 0, correct: 0 }, renal: { attempted: 0, correct: 0 }, pancreatic: { attempted: 0, correct: 0 } },
            history: []
          }}
          onRechargeLife={onRechargeLife || (() => {})}
          onAddBonusXP={onAddBonusXP || (() => {})}
          onNavigate={onNavigate}
        />
      )}
      {selectedLab === 'randle' && <RandleCycleLab />}
      {selectedLab === 'ictericias' && <JaundiceSimulatorLab />}
      {selectedLab === 'hemostasia' && <HemostasisLab />}
    </div>
  );
};


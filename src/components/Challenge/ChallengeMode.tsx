import React, { useState, useEffect } from 'react';
import { ClinicalCase, BiomarkerOption, UserProgress } from '../../types';
import { getPatientHealth, getBudgetInfo, getStreakMultiplier } from '../../utils/gamification';
import { MultiBiomarkerLabPanel } from './MultiBiomarkerLabPanel';
import { DutyAssistantWidget } from './DutyAssistantWidget';
import { DailyTimerHUD } from './DailyTimerHUD';
import { 
  Target, 
  BookOpen, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight, 
  Activity, 
  Heart, 
  Flame, 
  Wallet, 
  ShieldAlert, 
  ClipboardList, 
  SlidersHorizontal,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface ChallengeModeProps {
  currentCase: ClinicalCase;
  userProgress: UserProgress;
  isDailyChallenge?: boolean;
  dailyTimeRemaining?: number;
  dailyBonusMultiplier?: number;
  isDailyTimerExpired?: boolean;
  onDailyTimerExpire?: () => void;
  onOpenLibraryModal: () => void;
  onSubmitAnswer: (selectedOption: BiomarkerOption, consultedLibrary: boolean) => void;
  onSubmitLabOrder: (orderedBiomarkerIds: string[], consultedLibrary: boolean) => void;
  consultedLibrary: boolean;
  onNextCase: () => void;
}

export const ChallengeMode: React.FC<ChallengeModeProps> = ({
  currentCase,
  userProgress,
  isDailyChallenge = false,
  dailyTimeRemaining = 120,
  dailyBonusMultiplier = 2.0,
  isDailyTimerExpired = false,
  onDailyTimerExpire,
  onOpenLibraryModal,
  onSubmitAnswer,
  onSubmitLabOrder,
  consultedLibrary,
  onNextCase
}) => {
  const [resolutionMode, setResolutionMode] = useState<'multi' | 'single'>('multi');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const health = getPatientHealth(userProgress.lives);
  const budgetInfo = getBudgetInfo(userProgress.budget);
  const streakInfo = getStreakMultiplier(userProgress.streak);

  const selectedOption = currentCase.biomarkerOptions.find((o) => o.id === selectedOptionId);

  const handleSingleSubmit = () => {
    if (!selectedOption) return;
    onSubmitAnswer(selectedOption, consultedLibrary);
  };

  const handleMultiSubmit = (orderedBiomarkerIds: string[]) => {
    onSubmitLabOrder(orderedBiomarkerIds, consultedLibrary);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Reto Clínico Diario HUD Timer if active */}
      {isDailyChallenge && (
        <DailyTimerHUD
          timeRemainingSeconds={dailyTimeRemaining}
          totalSeconds={120}
          bonusMultiplier={dailyBonusMultiplier}
          isExpired={isDailyTimerExpired}
          onTimeExpire={onDailyTimerExpire}
        />
      )}

      {/* Real-time Gamified HUD for Challenge Mode */}
      <div id="tour-gamification-hud" className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Patient Vidas */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 ${
                  h <= userProgress.lives
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-slate-800 fill-slate-900'
                }`}
              />
            ))}
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Salud del Paciente</div>
            <div className={`text-xs font-semibold ${health.colorClass}`}>{health.statusText}</div>
          </div>
        </div>

        {/* Realtime Budget Meter */}
        <div className="flex-1 min-w-[180px] max-w-xs">
          <div className="flex justify-between items-center text-[10px] mb-1">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              Presupuesto Sanitario
            </span>
            <span className={`font-mono font-bold ${budgetInfo.isRedAlert ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
              {userProgress.budget}%
            </span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              animate={{ width: `${Math.max(0, userProgress.budget)}%` }}
              className={`h-full rounded-full transition-all ${budgetInfo.isRedAlert ? 'bg-rose-600' : 'bg-emerald-500'}`}
            />
          </div>
          {budgetInfo.isRedAlert && (
            <span className="text-[9px] text-rose-400 font-bold flex items-center gap-1 mt-0.5">
              <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
              Alerta de gasto asistencial
            </span>
          )}
        </div>

        {/* Streak Multiplier */}
        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-2">
          <Flame className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <div>
            <div className="text-[9px] text-slate-400 font-bold uppercase">Multiplicador</div>
            <div className="text-xs font-mono font-bold text-emerald-300">{streakInfo.label}</div>
          </div>
        </div>
      </div>

      {/* Case Clinical Presentation Header Card */}
      <div id="tour-clinical-scenario" className="bg-white rounded-2xl border border-slate-200/90 shadow-xs flex flex-col overflow-hidden">
        <div className="bg-slate-50/70 px-6 py-3 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
          <h2 className="text-xs font-bold uppercase text-slate-600 tracking-wider flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-slate-700" />
            <span>Escenario Clínico #{currentCase.id.slice(-4).toUpperCase()}</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-semibold uppercase">
              Etapa Diferencial
            </span>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold uppercase border border-slate-200">
              {currentCase.system}
            </span>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-[10px] font-semibold uppercase border border-slate-200">
              Nivel {currentCase.difficulty}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5">{currentCase.title}</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100">
              "{currentCase.clinicalHistory.presentIllness}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Hallazgos Físicos y Signos Vitales
              </h4>
              <ul className="text-xs space-y-1 text-slate-700 font-medium">
                <li>• P.A: {currentCase.physicalExam.vitalSigns.bp} | F.C: {currentCase.physicalExam.vitalSigns.hr}</li>
                <li>• Temp: {currentCase.physicalExam.vitalSigns.temp} | SatO₂: {currentCase.physicalExam.vitalSigns.sao2}</li>
                {currentCase.physicalExam.findings.map((f, idx) => (
                  <li key={idx}>• {f.systemName}: {f.description}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Diagnósticos Diferenciales en Discusión
                  </h4>
                  <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {currentCase.differentialDiagnoses.length} Entidades
                  </span>
                </div>
                <ul className="text-xs space-y-1 text-slate-700 font-medium">
                  {currentCase.differentialDiagnoses.map((diff, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-slate-500 font-bold">•</span>
                      <span>{diff.disease}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guided Learning Tip */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 flex items-center gap-1 font-medium">
                  <span className="text-emerald-600">🎯</span> Biomarcadores discriminatorios en biblioteca
                </span>
                <button
                  type="button"
                  onClick={onOpenLibraryModal}
                  className="font-semibold text-slate-800 hover:text-emerald-700 hover:underline cursor-pointer"
                >
                  Consultar Guía
                </button>
              </div>
            </div>
          </div>

          {/* Initial complement lab data if present */}
          {currentCase.initialLabWork.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">
                Laboratorio Inicial Disponible en Urgencias:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentCase.initialLabWork.map((lab, idx) => (
                  <span key={idx} className="text-xs bg-white px-2.5 py-1 rounded-lg border border-slate-200 font-medium text-slate-800 shadow-2xs">
                    <strong className="font-semibold text-slate-900">{lab.test}:</strong> {lab.result} {lab.unit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reference / Library Banner */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-xs font-bold text-slate-900">Biblioteca Técnica de Biomarcadores</h4>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wide flex items-center gap-1">
                  <span>🎯 Aprendizaje Guiado</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Los biomarcadores del diagnóstico diferencial para <strong>"{currentCase.title}"</strong> aparecen <span className="text-slate-900 font-semibold">resaltados automáticamente con sus fichas de discriminación</span>.
              </p>
            </div>

            <button
              onClick={onOpenLibraryModal}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all cursor-pointer shrink-0 shadow-2xs ${
                consultedLibrary
                  ? 'bg-slate-100 text-slate-800 border-slate-300'
                  : 'text-white bg-slate-900 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>CONSULTAR BIBLIOTECA</span>
              <span className="bg-slate-800 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                -10% Ptos
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Multi-Biomarker Laboratory Order vs Direct Choice */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setResolutionMode('multi')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              resolutionMode === 'multi'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-emerald-400" />
            <span>Panel de Petición Múltiple (Orden de Laboratorio)</span>
            <span className="bg-slate-800 text-emerald-300 text-[10px] px-1.5 py-0.2 rounded font-mono">
              Recomendado
            </span>
          </button>

          <button
            onClick={() => setResolutionMode('single')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              resolutionMode === 'single'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Selección Rápida de Biomarcador Clave</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
          {resolutionMode === 'multi' 
            ? 'Simula peticiones multianalíticas realistas'
            : 'Formato test de opción única'}
        </span>
      </div>

      {/* RESOLUTION MODE 1: MULTI-BIOMARKER LAB PANEL */}
      {resolutionMode === 'multi' && (
        <MultiBiomarkerLabPanel
          currentCase={currentCase}
          userBudget={userProgress.budget}
          onSubmitLabOrder={handleMultiSubmit}
        />
      )}

      {/* RESOLUTION MODE 2: CLASSIC SINGLE SELECTION */}
      {resolutionMode === 'single' && (
        <div className="space-y-4">
          <DutyAssistantWidget
            currentCase={currentCase}
            budget={userProgress.budget}
          />

          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/90 text-slate-900 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.15em]">
                  Selección Rápida Directa
                </h2>
                <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase font-semibold">
                  {currentCase.difficulty}
                </span>
              </div>

              <h3 className="text-slate-900 text-base sm:text-lg font-bold tracking-tight">
                Seleccione el Biomarcador de Mayor Discriminación
              </h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Elija la prueba analítica con mayor sensibilidad y especificidad para confirmar la sospecha dentro de la ventana de oportunidad clínica.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentCase.biomarkerOptions.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all group flex justify-between items-center cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                          isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700 group-hover:bg-slate-300 transition-colors'
                        }`}
                      >
                        {letter}
                      </span>
                      <span className={`text-xs sm:text-sm font-semibold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {option.biomarkerName}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-emerald-400' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSingleSubmit}
              disabled={!selectedOptionId}
              className={`w-full py-3.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center space-x-2 ${
                selectedOptionId
                  ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer shadow-xs'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <span>Confirmar Selección y Evaluar Diagnóstico</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

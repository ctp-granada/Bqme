import React, { useState, useEffect, useMemo } from 'react';
import { ClinicalCase, BiomarkerOption, UserProgress } from '../../types';
import { BIOMARKERS_DATABASE } from '../../data/biomarkers';
import { getPatientHealth, getBudgetInfo, getStreakMultiplier } from '../../utils/gamification';
import { 
  getInitialBiomarkerOptions, 
  getPathognomonicConfirmatoryOptions, 
  isBiomarkerPathognomonicOrEssential 
} from '../../utils/labOrderEvaluator';
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
  Coins,
  Flame, 
  Wallet, 
  ShieldAlert, 
  ClipboardList, 
  SlidersHorizontal,
  Clock,
  Sparkles,
  Zap,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Check,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChallengeModeProps {
  currentCase: ClinicalCase;
  userProgress: UserProgress;
  isDailyChallenge?: boolean;
  dailyTimeRemaining?: number;
  dailyBonusMultiplier?: number;
  isDailyTimerExpired?: boolean;
  onDailyTimerExpire?: () => void;
  onOpenLibraryModal: () => void;
  onDeductBudget?: (amount: number, reason?: string) => void;
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
  onDeductBudget,
  onSubmitAnswer,
  onSubmitLabOrder,
  consultedLibrary,
  onNextCase
}) => {
  const [resolutionMode, setResolutionMode] = useState<'multi' | 'single'>('multi');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [consultedBiomarkerIds, setConsultedBiomarkerIds] = useState<string[]>([]);
  const [singleConsultPrompt, setSingleConsultPrompt] = useState<{ id: string; name: string } | null>(null);

  // Pathognomonic biomarker filter: increases diagnostic rigor by hiding dead-giveaways from initial options
  const [filterPathognomonic, setFilterPathognomonic] = useState<boolean>(true);
  const [diagnosticPhase, setDiagnosticPhase] = useState<'differential' | 'confirmatory'>('differential');
  const [differentialRationaleNotice, setDifferentialRationaleNotice] = useState<{
    optionName: string;
    whySuboptimal: string;
    biochemicalRationale: string;
  } | null>(null);

  useEffect(() => {
    setConsultedBiomarkerIds([]);
    setSelectedOptionId(null);
    setDiagnosticPhase('differential');
    setDifferentialRationaleNotice(null);
  }, [currentCase.id]);

  const initialOptions = useMemo(() => getInitialBiomarkerOptions(currentCase), [currentCase]);
  const pathognomonicOptions = useMemo(() => getPathognomonicConfirmatoryOptions(currentCase), [currentCase]);

  const displayedOptions = useMemo(() => {
    if (!filterPathognomonic) {
      return currentCase.biomarkerOptions;
    }
    return diagnosticPhase === 'confirmatory' ? pathognomonicOptions : initialOptions;
  }, [filterPathognomonic, diagnosticPhase, currentCase.biomarkerOptions, pathognomonicOptions, initialOptions]);

  const handleConsultBiomarker = (biomarkerId: string, cost = 5): boolean => {
    if (consultedBiomarkerIds.includes(biomarkerId)) return true;
    if (userProgress.budget < cost) return false;
    onDeductBudget?.(cost, 'Consulta de indicación clínica');
    setConsultedBiomarkerIds((prev) => [...prev, biomarkerId]);
    return true;
  };

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
        {/* Fondos y Presupuesto de Guardia (Dinero) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-2xs">
            <Coins className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Fondos Hospitalarios</div>
            <div className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
              <span>{userProgress.budget}% Restante</span>
              {userProgress.budget < 30 && (
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-rose-500/20 text-rose-300 border border-rose-500/30 font-sans">
                  ¡Alarma!
                </span>
              )}
            </div>
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
              {budgetInfo.statusText}
            </span>
          </div>
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              animate={{ width: `${Math.min(100, Math.max(0, userProgress.budget))}%` }}
              className={`h-full rounded-full transition-all ${budgetInfo.isRedAlert ? 'bg-rose-600' : 'bg-emerald-500'}`}
            />
          </div>
          {budgetInfo.isRedAlert && (
            <span className="text-[9px] text-rose-400 font-bold flex items-center gap-1 mt-0.5">
              <ShieldAlert className="w-3 h-3 text-rose-400 shrink-0" />
              Alerta de gasto asistencial (gana fondos en el Parque)
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

        <div className="p-6 space-y-5">
          {/* Filiación y Datos del Paciente */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Paciente en Consulta / Guardia
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">{currentCase.title}</h3>
            </div>
            <div className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
              <span className="font-bold text-slate-900">
                {currentCase.clinicalHistory.patientDemographics.gender}, {currentCase.clinicalHistory.patientDemographics.age} años
              </span>
              <span className="text-slate-400 mx-1.5">•</span>
              <span>{currentCase.clinicalHistory.patientDemographics.occupation}</span>
            </div>
          </div>

          {/* Anamnesis y Enfermedad Actual */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
              Anamnesis & Enfermedad Actual
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-slate-50 p-4 rounded-xl border border-slate-100 font-normal">
              "{currentCase.clinicalHistory.presentIllness}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Exploración Física & Signos Vitales
              </h4>
              <ul className="text-xs space-y-1 text-slate-700 font-medium">
                <li>• P.A: {currentCase.physicalExam.vitalSigns.bp} | F.C: {currentCase.physicalExam.vitalSigns.hr}</li>
                <li>• Temp: {currentCase.physicalExam.vitalSigns.temp} | SatO₂: {currentCase.physicalExam.vitalSigns.sao2}</li>
                {currentCase.physicalExam.findings.map((f, idx) => (
                  <li key={idx}>• {f.systemName}: {f.description}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Antecedentes y Contexto Clínico
              </h4>
              <ul className="text-xs space-y-1 text-slate-700 font-medium">
                {currentCase.clinicalHistory.pastMedicalHistory.length > 0 ? (
                  currentCase.clinicalHistory.pastMedicalHistory.slice(0, 3).map((pmh, idx) => (
                    <li key={idx} className="flex items-start gap-1">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{pmh}</span>
                    </li>
                  ))
                ) : (
                  <li>• Sin antecedentes médicos de interés.</li>
                )}
                {currentCase.clinicalHistory.medications.length > 0 && (
                  <li className="pt-1 text-[11px] text-slate-500">
                    <strong className="text-slate-700">Tratamiento:</strong> {currentCase.clinicalHistory.medications.join(', ')}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Initial complement lab data if present */}
          {currentCase.initialLabWork.length > 0 && (
            <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/90">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-600" />
                  Analítica Básica de Triaje / Rutina de Urgencias:
                </span>
                <span className="text-[10px] text-slate-500 italic">
                  Parámetros generales basales. Solicita abajo los biomarcadores específicos para confirmar el diagnóstico.
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentCase.initialLabWork.map((lab, idx) => (
                  <span
                    key={idx}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium shadow-2xs ${
                      lab.isAbnormal
                        ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <strong className="font-semibold text-slate-900">{lab.test}:</strong> {lab.result} {lab.unit}
                  </span>
                ))}
              </div>
            </div>
          )}
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
          consultedBiomarkerIds={consultedBiomarkerIds}
          onConsultBiomarker={handleConsultBiomarker}
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
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-emerald-700 text-[10px] font-bold uppercase tracking-[0.15em]">
                    {filterPathognomonic
                      ? diagnosticPhase === 'confirmatory'
                        ? 'Fase 2: Confirmación Patognomónica'
                        : 'Fase 1: Diagnóstico Diferencial'
                      : 'Selección Rápida Directa'}
                  </h2>
                  <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase font-semibold">
                    {currentCase.difficulty}
                  </span>
                </div>

                {/* Difficulty Anti-Triviality Filter Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setFilterPathognomonic(!filterPathognomonic);
                    setSelectedOptionId(null);
                    setDifferentialRationaleNotice(null);
                    setDiagnosticPhase('differential');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer border ${
                    filterPathognomonic
                      ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100 shadow-2xs'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                  title="Filtro anti-trivialidad: oculta biomarcadores patognomónicos en la lista inicial para evitar deducciones obvias"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                  <span>Filtro Anti-Trivialidad: {filterPathognomonic ? 'Activo (Oculta Patognomónicos)' : 'Inactivo (Ver Todos)'}</span>
                </button>
              </div>

              <h3 className="text-slate-900 text-base sm:text-lg font-bold tracking-tight">
                {filterPathognomonic
                  ? diagnosticPhase === 'confirmatory'
                    ? 'Seleccione el Biomarcador Patognomónico Confirmatorio'
                    : 'Evaluación Diferencial: Seleccione o Razone la Ausencia de Patognomónico'
                  : 'Seleccione el Biomarcador de Mayor Discriminación'}
              </h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                {filterPathognomonic
                  ? diagnosticPhase === 'confirmatory'
                    ? 'Elija el estándar de oro de máxima sensibilidad y especificidad diagnóstica para confirmar definitivamente el caso.'
                    : 'Los biomarcadores patognomónicos obvios han sido filtrados para exigir razonamiento clínico diferencial y evitar respuestas triviales.'
                  : 'Elija la prueba analítica con mayor sensibilidad y especificidad para confirmar la sospecha dentro de la ventana de oportunidad clínica.'}
              </p>
            </div>

            {/* Pathognomonic Filter Banner */}
            {filterPathognomonic && diagnosticPhase === 'differential' && (
              <div className="p-3.5 bg-amber-50/90 rounded-xl border border-amber-200 text-amber-950 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-[11px] text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    Filtro Anti-Trivialidad Activo (Marcadores Patognomónicos Ocultos)
                  </span>
                  <span className="px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded font-semibold text-[9px] uppercase">
                    Mayor Dificultad Diagnóstica
                  </span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-relaxed font-normal">
                  Para evitar deducciones inmediatas, el biomarcador patognomónico confirmatorio no figura en esta lista inicial. Analiza las alternativas diferenciales disponibles o solicita el escalado confirmatorio al identificar la patología.
                </p>
              </div>
            )}

            {filterPathognomonic && diagnosticPhase === 'confirmatory' && (
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-[11px] text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Fase 2: Confirmación Patognomónica Desbloqueada
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDiagnosticPhase('differential');
                      setSelectedOptionId(null);
                    }}
                    className="text-[10px] text-emerald-800 hover:text-emerald-950 font-bold underline cursor-pointer"
                  >
                    ← Volver a opciones diferenciales
                  </button>
                </div>
                <p className="text-[11px] text-emerald-900/90 leading-relaxed font-normal">
                  Has escalado a la fase de confirmación. Selecciona el biomarcador patognomónico definitivo para validar el diagnóstico.
                </p>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {displayedOptions.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx);
                const isSelected = selectedOptionId === option.id;
                const biomarker = BIOMARKERS_DATABASE.find((b) => b.id === option.biomarkerId);
                const isConsulted = option.biomarkerId ? consultedBiomarkerIds.includes(option.biomarkerId) : false;

                return (
                  <div key={option.id} className="space-y-1.5">
                    <div
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

                      <div className="flex items-center gap-2">
                        {!isConsulted ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSingleConsultPrompt({ id: option.biomarkerId, name: option.biomarkerName });
                            }}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                            }`}
                            title="Consultar para qué sirve (-5% presupuesto)"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                            <span>¿Para qué sirve?</span>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                              -5%
                            </span>
                          </button>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>Ficha Consultada</span>
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-opacity ${isSelected ? 'opacity-100 text-emerald-400' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`} />
                      </div>
                    </div>

                    {/* Unlocked clinical sheet for this option */}
                    {isConsulted && biomarker && (
                      <div className="mx-2 p-3 bg-slate-50 rounded-xl border border-emerald-200 text-xs text-slate-800 space-y-1 animate-fadeIn">
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                            Ficha Diagnóstica Consultada:
                          </span>
                          <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-semibold border border-emerald-200">
                            -5% Presupuesto Aplicado
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">Para qué sirve / Indicación: </span>
                          <span className="text-slate-700">{biomarker.diagnosticIndication}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 border-t border-slate-200/80 pt-1 leading-relaxed">
                          <span className="font-semibold text-slate-700">Mecanismo: </span>
                          <span>{biomarker.clinicalRelevance}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Differential Selection Feedback Note */}
            {selectedOption && filterPathognomonic && diagnosticPhase === 'differential' && (
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-600" />
                    Opción Diferencial: {selectedOption.biomarkerName}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Orientación Diferencial / No Patognomónica
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {selectedOption.whyOptimalOrSuboptimal}
                </p>
                <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 italic">
                    ¿Reconoces que esta prueba es subóptima y necesitas el estándar de oro?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setDiagnosticPhase('confirmatory');
                      setSelectedOptionId(null);
                    }}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Escalar a Biomarcador Patognomónico Confirmatorio</span>
                  </button>
                </div>
              </div>
            )}

            {/* Direct Clinical Reasoning Escalation Button */}
            {filterPathognomonic && diagnosticPhase === 'differential' && (
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5 max-w-md">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    <Zap className="w-4 h-4 fill-current" />
                    <span>¿Sospecha diagnóstica clara?</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Si has deducido el diagnóstico a partir del cuadro clínico y reconoces que las opciones iniciales son subóptimas, solicita directamente la prueba patognomónica de certeza.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDiagnosticPhase('confirmatory');
                    setSelectedOptionId(null);
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Solicitar Biomarcador Patognomónico Confirmatorio</span>
                </button>
              </div>
            )}

            {/* Submission Actions */}
            {(!filterPathognomonic || diagnosticPhase === 'confirmatory') ? (
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
            ) : (
              <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <button
                  onClick={handleSingleSubmit}
                  disabled={!selectedOptionId}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center space-x-2 ${
                    selectedOptionId
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer border border-slate-300'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  }`}
                  title="Enviar esta opción diferencial para evaluación inmediata"
                >
                  <span>Confirmar Opción Diferencial Seleccionada</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDiagnosticPhase('confirmatory');
                    setSelectedOptionId(null);
                  }}
                  className="py-3 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 cursor-pointer shadow-xs whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Pasar a Confirmación Patognomónica</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Consultation Modal for Single Selection Mode */}
      <AnimatePresence>
        {singleConsultPrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-slate-900 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Interconsulta de Biomarcador</h4>
                    <p className="text-[10px] text-slate-500 font-medium">Consulta de indicación y utilidad</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSingleConsultPrompt(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm">{singleConsultPrompt.name}</div>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  ¿Deseas consultar para qué sirve este parámetro? Esta acción deducirá un 5% de tu presupuesto sanitario restante.
                </p>

                <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5 text-[11px] text-amber-950">
                  <div className="flex justify-between items-center font-bold">
                    <span>Coste de Interconsulta:</span>
                    <span className="font-mono text-amber-800 font-extrabold">-5% Presupuesto</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Presupuesto actual:</span>
                    <span className="font-mono font-semibold">{userProgress.budget}%</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Presupuesto tras consulta:</span>
                    <span className={`font-mono font-bold ${userProgress.budget - 5 < 20 ? 'text-rose-600' : 'text-slate-900'}`}>
                      {Math.max(0, userProgress.budget - 5)}%
                    </span>
                  </div>
                </div>

                {userProgress.budget < 5 && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-[11px] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>Presupuesto insuficiente (&lt;5%). No dispones de saldo suficiente para interconsultar este parámetro.</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSingleConsultPrompt(null)}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={userProgress.budget < 5}
                  onClick={() => {
                    if (singleConsultPrompt) {
                      handleConsultBiomarker(singleConsultPrompt.id, 5);
                      setSingleConsultPrompt(null);
                    }
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                    userProgress.budget >= 5
                      ? 'bg-slate-900 hover:bg-slate-800 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Confirmar e Interconsultar (-5%)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

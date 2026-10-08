import React, { useState, useEffect, useRef } from 'react';
import { ROSCO_EDITIONS, RoscoItem, RoscoEdition } from '../../data/roscoData';
import {
  Coins,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Timer,
  Trophy,
  ArrowRight,
  Send,
  Layers,
  ChevronRight,
  Flame,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';

interface RoscoGameProps {
  onEarnBudget?: (amount?: number) => void;
  onAddBonusXP?: (amount: number, reason: string) => void;
  onClose?: () => void;
}

type LetterStatus = 'unanswered' | 'passed' | 'correct' | 'incorrect';

interface LetterState {
  status: LetterStatus;
  userAnswer?: string;
}

// Normalizes strings for robust fuzzy biochemical matching:
// removes accents, casing, punctuation, and extra whitespace
function normalizeAnswer(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function isAnswerCorrect(userInput: string, item: RoscoItem): boolean {
  const normInput = normalizeAnswer(userInput);
  if (!normInput) return false;

  const normCanonical = normalizeAnswer(item.canonicalAnswer);
  if (normInput === normCanonical) return true;

  return item.acceptedAnswers.some((ans) => {
    const norm = normalizeAnswer(ans);
    return normInput === norm;
  });
}

export const RoscoGame: React.FC<RoscoGameProps> = ({
  onEarnBudget,
  onAddBonusXP,
  onClose
}) => {
  // Select Edition (Edition 1 vs Edition 2)
  const [selectedEditionId, setSelectedEditionId] = useState<string>('rosco_edicion_1');
  const currentEdition: RoscoEdition =
    ROSCO_EDITIONS.find((ed) => ed.id === selectedEditionId) || ROSCO_EDITIONS[0];

  const items = currentEdition.items;
  const totalLetters = items.length; // 25 letters

  // Game state
  const [letterStates, setLetterStates] = useState<Record<string, LetterState>>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'incorrect' | 'passed' | null;
    message: string;
    detail?: string;
  }>({ type: null, message: '' });

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(180);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const [hasTimerStarted, setHasTimerStarted] = useState<boolean>(false);

  // Review sheet modal
  const [showFullReview, setShowFullReview] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or reset game
  const resetGame = (editionId?: string) => {
    if (editionId) {
      setSelectedEditionId(editionId);
    }
    const initialStates: Record<string, LetterState> = {};
    const targetEdition = editionId
      ? ROSCO_EDITIONS.find((ed) => ed.id === editionId) || currentEdition
      : currentEdition;

    targetEdition.items.forEach((item) => {
      initialStates[item.id] = { status: 'unanswered' };
    });

    setLetterStates(initialStates);
    setCurrentIndex(0);
    setInputValue('');
    setIsGameOver(false);
    setFeedback({ type: null, message: '' });
    setTimerSeconds(180);
    setHasTimerStarted(false);
    setShowFullReview(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  useEffect(() => {
    resetGame(selectedEditionId);
  }, [selectedEditionId]);

  // Focus input when moving to a new letter
  useEffect(() => {
    if (!isGameOver) {
      inputRef.current?.focus();
    }
  }, [currentIndex, isGameOver]);

  // Timer countdown
  useEffect(() => {
    if (!hasTimerStarted || !isTimerActive || isGameOver) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasTimerStarted, isTimerActive, isGameOver]);

  const handleTimeExpired = () => {
    setIsGameOver(true);
    setFeedback({
      type: 'incorrect',
      message: '¡Tiempo agotado!',
      detail: 'Se ha terminado el cronómetro de la ronda de Pasapalabra.'
    });
    awardGameRewards();
  };

  // Find next pending or passed letter starting after `fromIdx`
  const getNextAvailableIndex = (
    fromIdx: number,
    states: Record<string, LetterState>
  ): number | null => {
    // Look ahead from fromIdx + 1 to end
    for (let i = fromIdx + 1; i < totalLetters; i++) {
      const item = items[i];
      const st = states[item.id]?.status || 'unanswered';
      if (st === 'unanswered' || st === 'passed') {
        return i;
      }
    }
    // Wrap around from 0 to fromIdx
    for (let i = 0; i <= fromIdx; i++) {
      const item = items[i];
      const st = states[item.id]?.status || 'unanswered';
      if (st === 'unanswered' || st === 'passed') {
        return i;
      }
    }
    return null; // All letters answered
  };

  // Counts
  const correctCount = Object.values(letterStates).filter((s) => s.status === 'correct').length;
  const incorrectCount = Object.values(letterStates).filter((s) => s.status === 'incorrect').length;
  const passedCount = Object.values(letterStates).filter((s) => s.status === 'passed').length;
  const unansweredCount = items.filter(
    (it) => (letterStates[it.id]?.status || 'unanswered') === 'unanswered'
  ).length;

  const currentItem = items[currentIndex];

  // Awards calculated funds and XP
  const awardGameRewards = (finalCorrectCount?: number) => {
    const finalScore = finalCorrectCount !== undefined ? finalCorrectCount : correctCount;
    // Each correct answer gives +2% budget (up to 50% budget)
    // Mistakes give 0 money as requested: "Los aciertos dan dinero y los fallos no."
    const budgetEarned = finalScore * 2;
    const bonusCompletion = finalScore >= 20 ? 10 : 0;
    const totalBudget = budgetEarned + bonusCompletion;
    const totalXP = finalScore * 15 + (finalScore === 25 ? 150 : 50);

    if (onEarnBudget && totalBudget > 0) {
      onEarnBudget(totalBudget);
    }
    if (onAddBonusXP && totalXP > 0) {
      onAddBonusXP(totalXP, `Rosco Metabólico (${finalScore}/${totalLetters} aciertos)`);
    }
  };

  // Submit Answer
  const handleCheckAnswer = () => {
    if (!currentItem || isGameOver) return;
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (!hasTimerStarted) setHasTimerStarted(true);

    const isCorrect = isAnswerCorrect(trimmed, currentItem);
    const updatedStatus: LetterStatus = isCorrect ? 'correct' : 'incorrect';

    const newStates: Record<string, LetterState> = {
      ...letterStates,
      [currentItem.id]: {
        status: updatedStatus,
        userAnswer: trimmed
      }
    };
    setLetterStates(newStates);
    setInputValue('');

    // Feedback
    if (isCorrect) {
      setFeedback({
        type: 'correct',
        message: '¡CORRECTO! +2% Dinero 💰 y +15 XP',
        detail: currentItem.canonicalAnswer
      });
    } else {
      setFeedback({
        type: 'incorrect',
        message: `¡INCORRECTO! (0€)`,
        detail: `Respuesta esperada: ${currentItem.canonicalAnswer}`
      });
    }

    // Check if game has ended
    const nextIdx = getNextAvailableIndex(currentIndex, newStates);
    if (nextIdx === null) {
      setIsGameOver(true);
      const newCorrectTotal = Object.values(newStates).filter((s) => s.status === 'correct').length;
      awardGameRewards(newCorrectTotal);
    } else {
      setCurrentIndex(nextIdx);
    }
  };

  // Pasapalabra: Marks letter in yellow ('passed') and continues
  const handlePasapalabra = () => {
    if (!currentItem || isGameOver) return;
    if (!hasTimerStarted) setHasTimerStarted(true);

    const newStates: Record<string, LetterState> = {
      ...letterStates,
      [currentItem.id]: {
        status: 'passed'
      }
    };
    setLetterStates(newStates);
    setInputValue('');

    setFeedback({
      type: 'passed',
      message: '¡PASAPALABRA!',
      detail: `La letra ${currentItem.letter} queda en amarillo para una segunda vuelta.`
    });

    const nextIdx = getNextAvailableIndex(currentIndex, newStates);
    if (nextIdx === null || nextIdx === currentIndex) {
      // If it's the only one left, keep on it
      if (nextIdx !== null) setCurrentIndex(nextIdx);
    } else {
      setCurrentIndex(nextIdx);
    }
  };

  // Handle Enter key for submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckAnswer();
    }
  };

  // Calculate circular coordinates for the 25 letters
  // Starting at 12 o'clock (-90 degrees), going clockwise
  const radius = 42; // percentage of half-width

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-4 sm:p-7 border border-slate-800 shadow-xl space-y-6">
      {/* Top Header & Edition Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              ¡Juego del Parque Bioquímico!
            </span>
            <span className="text-xs text-emerald-400 font-bold font-mono">
              +2% Dinero 💰 por Acierto
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>El Rosco Metabólico</span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 font-sans font-semibold">
              Tipo Pasapalabra
            </span>
          </h2>
          <p className="text-xs text-slate-400 max-w-xl mt-0.5">
            Escribe el concepto bioquímico para cada letra. Los aciertos suman fondos de guardia y
            se marcan en <strong className="text-emerald-400">verde</strong>, los fallos en{' '}
            <strong className="text-rose-400">rojo</strong> (0€), y con Pasapalabra en{' '}
            <strong className="text-amber-400">amarillo</strong> para volver después.
          </p>
        </div>

        {/* Edition Selector (Two distinct options provided by teacher) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center p-1 bg-slate-900 rounded-xl border border-slate-800 w-full sm:w-auto">
            {ROSCO_EDITIONS.map((ed) => (
              <button
                key={ed.id}
                onClick={() => {
                  if (selectedEditionId !== ed.id) {
                    resetGame(ed.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex-1 sm:flex-none ${
                  selectedEditionId === ed.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {ed.badgeLabel}
              </button>
            ))}
          </div>

          <button
            onClick={() => resetGame()}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reiniciar Rosco"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Control Strip: Scoreboard & Timer */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800/80 px-4 py-3 rounded-2xl">
        {/* Score Counters */}
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap text-xs font-bold font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-xs shadow-emerald-500/50" />
            <span>Aciertos: {correctCount}</span>
            <span className="text-[10px] text-emerald-300 font-sans font-semibold">
              (+{correctCount * 2}% 💰)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-xs shadow-rose-500/50" />
            <span>Fallos: {incorrectCount}</span>
            <span className="text-[10px] text-slate-400 font-sans font-semibold">(0€)</span>
          </div>

          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-xs shadow-amber-400/50" />
            <span>Pasadas: {passedCount}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400 hidden sm:flex">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
            <span>Pendientes: {unansweredCount}</span>
          </div>
        </div>

        {/* Timer & Controls */}
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold font-mono border ${
              timerSeconds <= 30
                ? 'bg-rose-950/60 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-700 text-amber-300'
            }`}
          >
            <Timer className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {Math.floor(timerSeconds / 60)}:
              {String(timerSeconds % 60).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={() => setIsTimerActive(!isTimerActive)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
            title={isTimerActive ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
          >
            {isTimerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: Circular Rosco with Centered Definition */}
      <div className="relative w-full max-w-[620px] aspect-square mx-auto flex items-center justify-center p-4 select-none">
        {/* Background glow behind circular rosco */}
        <div className="absolute inset-8 rounded-full bg-blue-600/5 filter blur-2xl pointer-events-none" />

        {/* 25 Letters Arranged in a Circle */}
        <div className="absolute inset-0 pointer-events-none">
          {items.map((item, idx) => {
            const angle = (idx / totalLetters) * 2 * Math.PI - Math.PI / 2;
            const left = 50 + radius * Math.cos(angle);
            const top = 50 + radius * Math.sin(angle);

            const state = letterStates[item.id] || { status: 'unanswered' };
            const isCurrent = idx === currentIndex && !isGameOver;

            // Styles depending on state
            let bgClass = 'bg-blue-600 text-white border-blue-400/60 shadow-md';
            if (state.status === 'correct') {
              bgClass =
                'bg-emerald-500 text-white border-emerald-300 shadow-md shadow-emerald-500/40 ring-1 ring-emerald-300';
            } else if (state.status === 'incorrect') {
              bgClass =
                'bg-rose-500 text-white border-rose-300 shadow-md shadow-rose-500/40 ring-1 ring-rose-300';
            } else if (state.status === 'passed') {
              bgClass =
                'bg-amber-400 text-amber-950 font-black border-amber-200 shadow-md shadow-amber-400/40 ring-2 ring-amber-300 animate-pulse';
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (state.status === 'unanswered' || state.status === 'passed') {
                    setCurrentIndex(idx);
                  }
                }}
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`absolute pointer-events-auto transition-all duration-300 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-black text-xs sm:text-base border-2 cursor-pointer ${bgClass} ${
                  isCurrent
                    ? 'ring-4 ring-yellow-400 scale-125 z-30 shadow-xl shadow-yellow-400/30'
                    : 'hover:scale-110 z-10'
                }`}
                title={`Letra ${item.letter}: ${state.status}`}
              >
                {item.letter}
              </button>
            );
          })}
        </div>

        {/* CENTER OF THE ROSCO: Definition, Input and Action Buttons */}
        <div className="relative z-20 w-[72%] sm:w-[68%] aspect-square rounded-full bg-slate-900/95 border-2 border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 text-center">
          {!isGameOver && currentItem ? (
            <div className="flex flex-col items-center justify-between w-full h-full py-1 sm:py-2">
              {/* Center Top: Letter Badge and Prefix */}
              <div className="space-y-0.5 sm:space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                  <span>{currentItem.prefix}</span>
                  <span className="w-5 h-5 rounded-full bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-xs">
                    {currentItem.letter}
                  </span>
                </div>
                <div className="text-[9px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-tight block">
                  {currentItem.category}
                </div>
              </div>

              {/* Center Middle: The Actual Biochemical Definition */}
              <div className="my-auto px-1 sm:px-2 max-h-[110px] sm:max-h-[140px] overflow-y-auto">
                <p className="text-xs sm:text-sm md:text-[15px] font-medium text-slate-100 leading-snug sm:leading-relaxed">
                  "{currentItem.question}"
                </p>
              </div>

              {/* Center Bottom: Input Field and Action Buttons */}
              <div className="w-full space-y-2 mt-auto">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu respuesta..."
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full bg-slate-950/90 border border-slate-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 rounded-xl px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white font-semibold text-center placeholder:text-slate-500 transition-all outline-hidden shadow-inner"
                  />
                </div>

                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!inputValue.trim()}
                    className={`flex-1 px-2.5 sm:px-3 py-1.5 rounded-xl font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs ${
                      inputValue.trim()
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Responder</span>
                  </button>

                  <button
                    onClick={handlePasapalabra}
                    className="flex-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] sm:text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-xs shadow-amber-500/20"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Pasapalabra</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Game Over Celebratory Summary Screen inside the Rosco */
            <div className="flex flex-col items-center justify-center w-full h-full py-2 space-y-2 sm:space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                  ¡Ronda Finalizada!
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {correctCount >= 20 ? '¡Excelente Peritaje!' : '¡Buen Intento Clínico!'}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-2 w-full max-w-[200px] text-xs font-mono font-bold">
                <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  <div className="text-[10px] text-emerald-400 font-sans">Aciertos</div>
                  <div className="text-base font-black">
                    {correctCount} / {totalLetters}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300">
                  <div className="text-[10px] text-amber-400 font-sans">Dinero Ganado</div>
                  <div className="text-base font-black">+{correctCount * 2}% 💰</div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 w-full max-w-[220px]">
                <button
                  onClick={() => resetGame()}
                  className="w-full py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Jugar de nuevo</span>
                </button>

                <button
                  onClick={() => setShowFullReview(true)}
                  className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Ver Solucionario</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Feedback Strip */}
      {feedback.type && (
        <div
          className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 transition-all ${
            feedback.type === 'correct'
              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
              : feedback.type === 'incorrect'
              ? 'bg-rose-950/60 border-rose-500/50 text-rose-200'
              : 'bg-amber-950/60 border-amber-500/50 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'correct' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {feedback.type === 'incorrect' && <XCircle className="w-4 h-4 text-rose-400" />}
            {feedback.type === 'passed' && <RotateCcw className="w-4 h-4 text-amber-400" />}
            <div>
              <strong className="block font-bold">{feedback.message}</strong>
              {feedback.detail && <span className="text-[11px] opacity-90">{feedback.detail}</span>}
            </div>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider opacity-75 hidden sm:inline">
            {feedback.type === 'correct' ? '+2% Dinero' : feedback.type === 'passed' ? 'Pasada' : '0€'}
          </span>
        </div>
      )}

      {/* Bottom Option Cards: Switch to the other Rosco Edition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {ROSCO_EDITIONS.map((ed) => {
          const isSelected = ed.id === selectedEditionId;
          return (
            <div
              key={ed.id}
              onClick={() => {
                if (!isSelected) resetGame(ed.id);
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-blue-950/50 border-blue-500/60 ring-1 ring-blue-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'
                    }`}
                  />
                  <h4 className="text-xs font-bold text-white">{ed.title}</h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{ed.subtitle}</p>
              </div>

              {isSelected ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Activo
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5 hover:text-white">
                  <span>Cargar</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL: Full Answer Review and Biochemical Rationale */}
      {showFullReview && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Solucionario Razonado Bioquímico
                </span>
                <h3 className="text-base font-bold text-white">{currentEdition.title}</h3>
              </div>
              <button
                onClick={() => setShowFullReview(false)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3 divide-y divide-slate-800/80">
              {items.map((item) => {
                const state = letterStates[item.id] || { status: 'unanswered' };
                return (
                  <div key={item.id} className="pt-3 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            state.status === 'correct'
                              ? 'bg-emerald-500 text-white'
                              : state.status === 'incorrect'
                              ? 'bg-rose-500 text-white'
                              : 'bg-blue-600 text-white'
                          }`}
                        >
                          {item.letter}
                        </span>
                        <span className="font-bold text-white">{item.canonicalAnswer}</span>
                        <span className="text-[10px] text-slate-400">({item.category})</span>
                      </div>

                      {state.status === 'correct' && (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Acertada (+2%)
                        </span>
                      )}
                      {state.status === 'incorrect' && (
                        <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Fallada (0€)
                        </span>
                      )}
                      {state.status === 'passed' && (
                        <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                          Pasada
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 italic">"{item.question}"</p>
                    <p className="text-[11px] text-emerald-300/90 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                      <strong>Explicación:</strong> {item.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
              <button
                onClick={() => setShowFullReview(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Cerrar Solucionario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

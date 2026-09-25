import React, { useEffect } from 'react';
import { SystemBadge } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Sparkles, X, CheckCircle, ArrowRight, ShieldCheck, Trophy } from 'lucide-react';

interface BadgeUnlockModalProps {
  badge: SystemBadge | null;
  onClose: () => void;
  onViewGallery?: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({
  badge,
  onClose,
  onViewGallery
}) => {
  useEffect(() => {
    if (badge) {
      // Trigger golden fireworks confetti
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#f59e0b', '#fbbf24', '#f97316', '#10b981', '#6366f1']
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#ec4899']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6']
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [badge]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl border-2 border-amber-300 overflow-hidden relative text-center"
        >
          {/* Top Decorative Sunburst / Header */}
          <div className="bg-gradient-to-b from-amber-500 via-amber-600 to-slate-900 pt-8 pb-14 px-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-amber-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-black uppercase tracking-widest border border-white/30 mb-3"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>¡Nueva Insignia de Especialidad Desbloqueada!</span>
            </motion.div>

            <h2 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
              {badge.title}
            </h2>
            <p className="text-xs text-amber-100 font-medium mt-1">
              Precisión de élite (≥90%) alcanzada en el sistema de laboratorio
            </p>
          </div>

          {/* Floating Big Badge Icon */}
          <div className="relative -mt-12 flex justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 300, damping: 15 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-white shadow-xl flex items-center justify-center text-5xl relative z-10"
            >
              <span>{badge.icon}</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-1 rounded-3xl border-2 border-dashed border-amber-400 pointer-events-none opacity-60"
              />
            </motion.div>
          </div>

          {/* Body Content */}
          <div className="p-6 pt-3 space-y-4 text-slate-800">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <p className="font-semibold">{badge.description}</p>
              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-center gap-3 font-mono font-bold text-[11px] text-amber-900">
                <span>🎯 Precisión: {badge.currentAccuracy}%</span>
                <span>•</span>
                <span>📋 Casos: {badge.currentAttempted} resueltos</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Has demostrado una discriminación diagnóstica superior seleccionando los biomarcadores con máxima sensibilidad y especificidad clínica.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              {onViewGallery && (
                <button
                  onClick={() => {
                    onClose();
                    onViewGallery();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Ver en Galería</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Continuar Guardia</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

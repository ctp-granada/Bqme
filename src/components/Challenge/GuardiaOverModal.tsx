import React from 'react';
import { RefreshCw, Heart, AlertTriangle, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface GuardiaOverModalProps {
  isOpen: boolean;
  onRestartGuardia: () => void;
}

export const GuardiaOverModal: React.FC<GuardiaOverModalProps> = ({ isOpen, onRestartGuardia }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white max-w-md w-full rounded-2xl shadow-2xl border border-red-200 overflow-hidden text-center p-6 sm:p-8"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600 mb-4 animate-bounce">
          <ShieldAlert className="w-9 h-9 text-red-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          ¡Guardia Médica Finalizada!
        </h2>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Has agotado las <strong className="text-red-600">3 Vidas del Paciente</strong> debido a decisiones diagnósticas subóptimas o sobrecostes en el presupuesto de pruebas.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-2 text-red-800 font-bold text-xs uppercase mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>Protocolo de Reinicio Clínico</span>
          </div>
          <p className="text-xs text-red-700 leading-normal">
            Al reiniciar la guardia médica, restablecerás tus <strong className="font-semibold">3 Vidas ❤️❤️❤️</strong> y el <strong className="font-semibold">100% del Presupuesto Sanitario</strong> sin perder tu XP ni tu progreso acumulado.
          </p>
        </div>

        <button
          onClick={onRestartGuardia}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <RefreshCw className="w-4 h-4 text-white" />
          <span>Reiniciar Guardia Médica (Restablecer Vidas)</span>
        </button>
      </motion.div>
    </div>
  );
};

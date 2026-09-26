import React from 'react';
import { RefreshCw, Heart, AlertTriangle, ShieldAlert, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

interface GuardiaOverModalProps {
  isOpen: boolean;
  onRestartGuardia: () => void;
  onGoToGames?: () => void;
}

export const GuardiaOverModal: React.FC<GuardiaOverModalProps> = ({
  isOpen,
  onRestartGuardia,
  onGoToGames
}) => {
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
            <span>Recuperación o Reinicio Clínico</span>
          </div>
          <p className="text-xs text-red-700 leading-normal">
            Puedes <strong className="font-semibold">recargar vidas jugando</strong> en el Parque Biomédico (+1 Vida ❤️ por minijuego) o reiniciar directamente la guardia restableciendo tus 3 vidas.
          </p>
        </div>

        <div className="space-y-2.5">
          {onGoToGames && (
            <button
              onClick={onGoToGames}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Gamepad2 className="w-4 h-4 text-white" />
              <span>Recargar Vidas en el Parque (Minijuegos)</span>
            </button>
          )}

          <button
            onClick={onRestartGuardia}
            className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Reiniciar Guardia Inmediatamente (3 Vidas)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

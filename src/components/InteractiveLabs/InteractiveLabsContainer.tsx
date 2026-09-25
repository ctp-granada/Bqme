import React, { useState } from 'react';
import { RandleCycleLab } from './RandleCycleLab';
import { JaundiceSimulatorLab } from './JaundiceSimulatorLab';
import { HemostasisLab } from './HemostasisLab';
import { RefreshCw, Droplets, FlaskConical, Layers, ArrowLeft } from 'lucide-react';

interface InteractiveLabsContainerProps {
  initialLab?: 'randle' | 'ictericias' | 'hemostasia';
  onBackToPortal?: () => void;
}

export const InteractiveLabsContainer: React.FC<InteractiveLabsContainerProps> = ({
  initialLab = 'randle',
  onBackToPortal
}) => {
  const [selectedLab, setSelectedLab] = useState<'randle' | 'ictericias' | 'hemostasia'>(initialLab);

  return (
    <div className="space-y-6">
      {/* Top Bar Switcher between the 3 requested interactive tools */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              Laboratorios Interactivos de la Asignatura
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Modelos Moleculares y Simuladores Fisiopatológicos
            </h2>
          </div>
        </div>

        {/* 3 Labs Switcher */}
        <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 w-full sm:w-auto overflow-x-auto">
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
            <span>Simulador de Ictericias</span>
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
            <span>Hemostasia & Coagulación</span>
          </button>
        </div>
      </div>

      {/* Render active interactive lab */}
      {selectedLab === 'randle' && <RandleCycleLab />}
      {selectedLab === 'ictericias' && <JaundiceSimulatorLab />}
      {selectedLab === 'hemostasia' && <HemostasisLab />}
    </div>
  );
};

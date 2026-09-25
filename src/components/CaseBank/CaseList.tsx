import React, { useState } from 'react';
import { ClinicalCase, OrganSystem, DifficultyLevel } from '../../types';
import { CaseCard } from './CaseCard';
import { Stethoscope, Filter, Sparkles } from 'lucide-react';

interface CaseListProps {
  cases: ClinicalCase[];
  onSelectCase: (c: ClinicalCase) => void;
  onStartChallenge: (c: ClinicalCase) => void;
  onOpenAICaseModal: () => void;
}

export const CaseList: React.FC<CaseListProps> = ({
  cases,
  onSelectCase,
  onStartChallenge,
  onOpenAICaseModal
}) => {
  const [selectedSystem, setSelectedSystem] = useState<OrganSystem | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');

  const filteredCases = cases.filter((c) => {
    if (selectedSystem !== 'all' && c.system !== selectedSystem) return false;
    if (selectedDifficulty !== 'all' && c.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const systemTabs: { id: OrganSystem | 'all'; label: string }[] = [
    { id: 'all', label: 'Todos los Sistemas' },
    { id: 'cardiac', label: 'Cardíaco' },
    { id: 'hepatic', label: 'Hepático / Ictericias' },
    { id: 'metabolic', label: 'Metabolismo / β-Oxidación' },
    { id: 'renal', label: 'Renal / Urea / Uricemia' },
    { id: 'pancreatic', label: 'Pancreático-Digestivo' }
  ];

  return (
    <div className="space-y-6">
      {/* Header & AI Case Generator CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Stethoscope className="w-6 h-6 text-slate-800" />
            <span>Banco de Casos Clínicos Estratificados</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Escenarios de alta fidelidad para el entrenamiento en selección de biomarcadores discriminatorios.
          </p>
        </div>

        <button
          onClick={onOpenAICaseModal}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs flex items-center space-x-2 self-start md:self-auto transition-all cursor-pointer border border-slate-800"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Generar Caso Clínico por IA</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filtrar por Especialidad Médica</span>
        </div>

        {/* System Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {systemTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSystem(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedSystem === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Difficulty Filter */}
        <div className="pt-3 border-t border-slate-100 flex items-center space-x-3 text-xs">
          <span className="font-semibold text-slate-500 text-[11px] uppercase tracking-wider">Dificultad:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as DifficultyLevel | 'all')}
            className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs cursor-pointer"
          >
            <option value="all">Todas las Dificultades</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
            <option value="experto">Experto</option>
          </select>
        </div>
      </div>

      {/* Case Cards Grid */}
      {filteredCases.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <p className="text-slate-500 font-medium text-xs">
            No se encontraron casos clínicos que coincidan con los filtros seleccionados.
          </p>
          <button
            onClick={() => {
              setSelectedSystem('all');
              setSelectedDifficulty('all');
            }}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c) => (
            <CaseCard
              key={c.id}
              caseData={c}
              onSelectCase={onSelectCase}
              onStartChallenge={onStartChallenge}
            />
          ))}
        </div>
      )}
    </div>
  );
};


import React, { useState, useMemo } from 'react';
import { Biomarker, OrganSystem, ClinicalCase } from '../../types';
import { BiomarkerDetailModal } from './BiomarkerDetailModal';
import { 
  analyzeCaseDifferentialBiomarkers, 
  ActiveCaseDifferentialSummary 
} from '../../utils/guidedDifferentialBiomarkers';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  Stethoscope, 
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BiomarkerLibraryProps {
  biomarkers: Biomarker[];
  isChallengeModeContext?: boolean;
  activeCase?: ClinicalCase | null;
}

export const BiomarkerLibrary: React.FC<BiomarkerLibraryProps> = ({
  biomarkers,
  isChallengeModeContext = false,
  activeCase = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<OrganSystem | 'all' | 'case_relevant'>('all');
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
  const [filterOnlyRelevant, setFilterOnlyRelevant] = useState<boolean>(false);

  // Compute active case differential relevance
  const differentialSummary: ActiveCaseDifferentialSummary | null = useMemo(() => {
    return analyzeCaseDifferentialBiomarkers(activeCase, biomarkers);
  }, [activeCase, biomarkers]);

  const filteredBiomarkers = useMemo(() => {
    return biomarkers
      .filter((b) => {
        // Differential relevance filtering
        if (filterOnlyRelevant || selectedSystem === 'case_relevant') {
          if (!differentialSummary?.relevanceMap[b.id]) return false;
        }

        // System filtering
        const matchesSystem =
          selectedSystem === 'all' ||
          selectedSystem === 'case_relevant' ||
          b.system === selectedSystem;

        // Search term filtering
        const matchesSearch =
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.clinicalRelevance.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (differentialSummary?.relevanceMap[b.id]?.roleDescription.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        return matchesSystem && matchesSearch;
      })
      .sort((a, b) => {
        // Sort priority: relevant for active case first
        if (differentialSummary) {
          const prioA = differentialSummary.relevanceMap[a.id]?.priorityOrder ?? 99;
          const prioB = differentialSummary.relevanceMap[b.id]?.priorityOrder ?? 99;
          if (prioA !== prioB) {
            return prioA - prioB;
          }
        }
        return a.name.localeCompare(b.name);
      });
  }, [biomarkers, selectedSystem, searchTerm, filterOnlyRelevant, differentialSummary]);

  const systemTabs: { id: OrganSystem | 'all' | 'case_relevant'; label: string }[] = [
    ...(differentialSummary
      ? [
          {
            id: 'case_relevant' as const,
            label: `🎯 Relevantes del Caso (${differentialSummary.totalRelevantCount})`
          }
        ]
      : []),
    { id: 'all', label: 'Todos los Biomarcadores' },
    { id: 'cardiac', label: '🫀 Cardíacos' },
    { id: 'hepatic', label: '🪵 Hepáticos / Ictericias' },
    { id: 'metabolic', label: '⚡ Metabólicos / β-Oxidación' },
    { id: 'renal', label: '🫘 Renales / Urea / Uricemia' },
    { id: 'pancreatic', label: '🔬 Pancreático-Digestivo' }
  ];

  return (
    <div className="space-y-6">
      {/* Challenge Notice if accessed in Challenge mode */}
      {isChallengeModeContext && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 flex items-start space-x-3 text-amber-900 text-xs shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-sm block text-amber-950">
              Modo Consulta de Guardia Activo
            </span>
            <p>
              Has accedido a la biblioteca durante la resolución del desafío. Para apoyar tu razonamiento clínico,{' '}
              <strong className="text-amber-950 font-bold">
                los biomarcadores de mayor valor discriminativo para el caso en curso han sido destacados automáticamente
              </strong>.
            </p>
          </div>
        </div>
      )}

      {/* ACTIVE CASE GUIDED LEARNING BANNER */}
      {differentialSummary && activeCase && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-5 sm:p-6 rounded-2xl shadow-xl border border-indigo-500/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Aprendizaje Guiado Activo
                </span>
                <span className="text-xs text-indigo-200 font-mono font-bold">
                  Caso: {activeCase.title}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Biomarcadores para el Diagnóstico Diferencial
              </h2>
              <p className="text-xs text-indigo-100/90 leading-relaxed">
                Revisa los valores de referencia y ventanas de elevación de las pruebas analíticas evaluadas en este caso para discriminar <strong className="text-amber-300 font-semibold">{activeCase.targetDisease}</strong> frente a sus diagnósticos diferenciales.
              </p>
            </div>

            {/* Quick Filter Toggle Button */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full md:w-auto">
              <button
                onClick={() => {
                  setSelectedSystem('case_relevant');
                  setFilterOnlyRelevant(true);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  selectedSystem === 'case_relevant' || filterOnlyRelevant
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Target className="w-4 h-4 text-amber-500" />
                <span>Ver Solo Relevantes ({differentialSummary.totalRelevantCount})</span>
              </button>

              {(selectedSystem === 'case_relevant' || filterOnlyRelevant) && (
                <button
                  onClick={() => {
                    setSelectedSystem('all');
                    setFilterOnlyRelevant(false);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold text-indigo-200 hover:text-white bg-slate-800/80 border border-slate-700 transition-colors cursor-pointer"
                >
                  Ver Todo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header if not in challenge banner */}
      {!differentialSummary && (
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <BookOpen className="w-7 h-7 text-blue-600" />
            <span>Biblioteca de Biomarcadores de Consulta</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Fichas técnicas con valores de referencia, cinéticas enzimáticas, ventanas temporales y relevancia clínica.
          </p>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar por nombre, abreviatura o mecanismo (ej. Troponina, FENa, Lipasa, Cistatina...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* System Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100 items-center">
          {systemTabs.map((tab) => {
            const isSelected = selectedSystem === tab.id;
            const isCaseRelevantTab = tab.id === 'case_relevant';

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setSelectedSystem(tab.id);
                  if (tab.id === 'case_relevant') {
                    setFilterOnlyRelevant(true);
                  } else {
                    setFilterOnlyRelevant(false);
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? isCaseRelevantTab
                      ? 'bg-amber-400 text-slate-950 shadow-xs font-extrabold ring-1 ring-amber-500'
                      : 'bg-slate-900 text-white shadow-xs'
                    : isCaseRelevantTab
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Guidance Note */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Mostrando {filteredBiomarkers.length} biomarcadores</span>
        {differentialSummary && (
          <span className="flex items-center gap-1 text-blue-700 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Las tarjetas resaltadas corresponden al caso activo</span>
          </span>
        )}
      </div>

      {/* Biomarkers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBiomarkers.map((b) => {
          const relevance = differentialSummary?.relevanceMap[b.id];
          const isHighlighted = !!relevance;

          return (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedBiomarker(b)}
              className={`rounded-2xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isHighlighted
                  ? `bg-white ${relevance.cardBorderClass} shadow-md`
                  : 'bg-white border border-slate-200 hover:border-blue-500/60'
              }`}
            >
              <div>
                {/* Top Highlight Banner if Relevant */}
                {isHighlighted && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${relevance.badgeColorClass}`}>
                        {relevance.tier === 'optimal' ? (
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Target className="w-3 h-3 text-amber-600" />
                        )}
                        <span>{relevance.badgeLabel}</span>
                      </span>
                    </div>

                    {/* Role In Case Snippet */}
                    <div className="mt-2 p-2 rounded-lg bg-slate-900 text-white text-[11px] font-medium leading-snug">
                      <span className="text-amber-300 font-bold block text-[10px] uppercase">
                        Relevancia en Caso Activo:
                      </span>
                      <p className="line-clamp-2 text-slate-200 mt-0.5">
                        {relevance.roleDescription}
                      </p>
                    </div>
                  </div>
                )}

                {/* Standard Card Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                    {b.system}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {b.abbreviation}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors mb-2">
                  {b.name}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {b.clinicalRelevance}
                </p>

                {/* Quick Specs */}
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 text-[11px] text-slate-700 mb-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">Ref Convencional:</span>
                    <span className="font-semibold text-slate-900">{b.referenceValues.conventional}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">Inicio Elevación:</span>
                    <span className="font-semibold text-emerald-700">{b.temporalWindow.elevationStart}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:underline">
                <span>Ver Ficha Técnica Completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBiomarkers.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No se encontraron biomarcadores</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Prueba a modificar los filtros o el término de búsqueda para ver más resultados.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSystem('all');
              setFilterOnlyRelevant(false);
            }}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      )}

      {/* Biomarker Detail Modal */}
      <BiomarkerDetailModal
        biomarker={selectedBiomarker}
        activeCase={activeCase}
        activeCaseDifferential={differentialSummary}
        onClose={() => setSelectedBiomarker(null)}
      />
    </div>
  );
};

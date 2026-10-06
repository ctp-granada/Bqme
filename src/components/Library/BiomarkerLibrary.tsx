import React, { useState, useMemo } from 'react';
import { Biomarker, OrganSystem, ClinicalCase } from '../../types';
import { BiomarkerDetailModal } from './BiomarkerDetailModal';
import { CLINICAL_CASES_DATABASE } from '../../data/clinicalCases';
import { CaseDetailModal } from '../CaseBank/CaseDetailModal';
import { 
  analyzeCaseDifferentialBiomarkers, 
  ActiveCaseDifferentialSummary 
} from '../../utils/guidedDifferentialBiomarkers';
import { 
  BookOpen, 
  Search, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  Target, 
  GraduationCap,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

interface BiomarkerLibraryProps {
  biomarkers: Biomarker[];
  isChallengeModeContext?: boolean;
  activeCase?: ClinicalCase | null;
}

const CASE_SYSTEM_TABS: { id: OrganSystem | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos los Casos (21)' },
  { id: 'cardiac', label: '🫀 Cardíacos' },
  { id: 'hepatic', label: '🪵 Hepáticos' },
  { id: 'metabolic', label: '⚡ Metabólicos' },
  { id: 'renal', label: '🫘 Renales' },
  { id: 'pancreatic', label: '🔬 Pancreáticos' },
  { id: 'neuromuscular', label: '🧠 Neuromusculares' }
];

export const BiomarkerLibrary: React.FC<BiomarkerLibraryProps> = ({
  biomarkers,
  isChallengeModeContext = false,
  activeCase = null
}) => {
  const [librarySection, setLibrarySection] = useState<'biomarkers' | 'cases'>('biomarkers');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<OrganSystem | 'all' | 'case_relevant'>('all');
  const [selectedBiomarker, setSelectedBiomarker] = useState<Biomarker | null>(null);
  const [filterOnlyRelevant, setFilterOnlyRelevant] = useState<boolean>(false);

  // Case study tab state
  const [caseSearchTerm, setCaseSearchTerm] = useState('');
  const [selectedCaseSystem, setSelectedCaseSystem] = useState<OrganSystem | 'all'>('all');
  const [selectedCaseForModal, setSelectedCaseForModal] = useState<ClinicalCase | null>(null);
  const [expandedGlossaryCaseIds, setExpandedGlossaryCaseIds] = useState<string[]>([]);

  // Compute active case differential relevance
  const differentialSummary: ActiveCaseDifferentialSummary | null = useMemo(() => {
    return analyzeCaseDifferentialBiomarkers(activeCase, biomarkers);
  }, [activeCase, biomarkers]);

  const filteredBiomarkers = useMemo(() => {
    return biomarkers
      .filter((b) => {
        if (filterOnlyRelevant || selectedSystem === 'case_relevant') {
          if (!differentialSummary?.relevanceMap[b.id]) return false;
        }

        const matchesSystem =
          selectedSystem === 'all' ||
          selectedSystem === 'case_relevant' ||
          b.system === selectedSystem;

        const matchesSearch =
          b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.abbreviation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.clinicalRelevance.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (differentialSummary?.relevanceMap[b.id]?.roleDescription.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);

        return matchesSystem && matchesSearch;
      })
      .sort((a, b) => {
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

  const filteredCases = useMemo(() => {
    return CLINICAL_CASES_DATABASE.filter((c) => {
      const matchSys = selectedCaseSystem === 'all' || c.system === selectedCaseSystem;
      const q = caseSearchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.targetDisease.toLowerCase().includes(q) ||
        c.clinicalHistory.presentIllness.toLowerCase().includes(q) ||
        c.studentSummary?.toLowerCase().includes(q) ||
        c.clinicalGlossary?.some(g => g.term.toLowerCase().includes(q) || g.simpleDefinition.toLowerCase().includes(q));
      return matchSys && matchSearch;
    });
  }, [selectedCaseSystem, caseSearchTerm]);

  const toggleGlossary = (caseId: string) => {
    setExpandedGlossaryCaseIds((prev) =>
      prev.includes(caseId) ? prev.filter((id) => id !== caseId) : [...prev, caseId]
    );
  };

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
    { id: 'pancreatic', label: '🔬 Pancreático-Digestivo' },
    { id: 'neuromuscular', label: '🧠 Neuromuscular / Señalización' }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Section Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => setLibrarySection('biomarkers')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            librarySection === 'biomarkers'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600" />
          <span>Catálogo de Biomarcadores ({biomarkers.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setLibrarySection('cases')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            librarySection === 'cases'
              ? 'bg-white text-slate-900 shadow-xs border border-slate-200/90'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
          }`}
        >
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Casos Clínicos de Estudio & Guías Didácticas ({CLINICAL_CASES_DATABASE.length})</span>
        </button>
      </div>

      {/* SECTION 1: BIOMARKERS CATALOG */}
      {librarySection === 'biomarkers' && (
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
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 transition-colors"
                    >
                      Mostrar Todos
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Search & Filter Header */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar biomarcador por nombre, acrónimo o utilidad clínica..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {differentialSummary && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setFilterOnlyRelevant(!filterOnlyRelevant)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      filterOnlyRelevant
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Filtrar Relevantes</span>
                  </button>
                </div>
              )}
            </div>

            {/* System Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {systemTabs.map((tab) => {
                const isActive = selectedSystem === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedSystem(tab.id);
                      if (tab.id !== 'case_relevant') setFilterOnlyRelevant(false);
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biomarkers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBiomarkers.map((biomarker) => {
              const relevance = differentialSummary?.relevanceMap[biomarker.id];

              return (
                <motion.div
                  key={biomarker.id}
                  layout
                  onClick={() => setSelectedBiomarker(biomarker)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between group hover:shadow-md ${
                    relevance
                      ? relevance.isTargetOptimal
                        ? 'border-emerald-400 ring-2 ring-emerald-200 bg-emerald-50/20'
                        : 'border-amber-300 ring-1 ring-amber-200 bg-amber-50/15'
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header: Name, Abbr, Relevance Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {biomarker.abbreviation}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            {biomarker.system}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {biomarker.name}
                        </h3>
                      </div>

                      {relevance && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            relevance.isTargetOptimal
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {relevance.badgeLabel}
                        </span>
                      )}
                    </div>

                    {/* Diagnostic Indication & Mechanism */}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {biomarker.diagnosticIndication}
                    </p>

                    {/* Kinetics Window & Reference */}
                    <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-[11px] text-slate-600 border border-slate-100">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Ventana Pico:</span>
                        <span className="font-semibold text-slate-800 font-mono">
                          {biomarker.temporalWindow.peakWindow}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 font-medium">Ref. Convencional:</span>
                        <span className="font-mono text-slate-700 truncate max-w-[160px]">
                          {biomarker.referenceValues.conventional}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform">
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
        </div>
      )}

      {/* SECTION 2: CLINICAL CASES STUDY & TEACHING GUIDE */}
      {librarySection === 'cases' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-950 text-blue-400 border border-blue-800 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Espacio de Estudio de Casos</span>
                </span>
                <span className="text-[10px] text-slate-400">21 Casos Clínicos con Guía Didáctica y Glosario</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Biblioteca de Casos Clínicos y Glosarios Médicos
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Estudia cada caso clínico en profundidad. Revisa la anamnesis completa, la orientación diagnóstica didáctica, el mecanismo fisiopatológico y el glosario terminológico de cada patología.
              </p>
            </div>

            <div className="px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono font-bold text-emerald-400 shrink-0">
              {filteredCases.length} Casos de Estudio
            </div>
          </div>

          {/* Search & Filter Header for Cases */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar caso por paciente, síntomas, enfermedad diana o términos del glosario..."
                value={caseSearchTerm}
                onChange={(e) => setCaseSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Case System Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {CASE_SYSTEM_TABS.map((tab) => {
                const isActive = selectedCaseSystem === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCaseSystem(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cases Study List */}
          <div className="space-y-4">
            {filteredCases.map((caseItem) => {
              const isGlossaryExpanded = expandedGlossaryCaseIds.includes(caseItem.id);

              return (
                <div
                  key={caseItem.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                >
                  {/* Case Card Header */}
                  <div className="bg-slate-50/70 px-5 py-3.5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-200 text-slate-800 rounded text-[10px] font-mono font-bold uppercase">
                        {caseItem.system}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold uppercase border border-slate-200">
                        Nivel {caseItem.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCaseForModal(caseItem)}
                        className="px-3 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>Abrir Historia Completa</span>
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-4 text-slate-800">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 mb-1">{caseItem.title}</h3>
                      <div className="text-xs text-slate-500 font-medium">
                        {caseItem.clinicalHistory.patientDemographics.gender}, {caseItem.clinicalHistory.patientDemographics.age} años • {caseItem.clinicalHistory.patientDemographics.occupation}
                      </div>
                    </div>

                    {/* Anamnesis / Present Illness */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Anamnesis & Enfermedad Actual:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed italic">
                        "{caseItem.clinicalHistory.presentIllness}"
                      </p>
                    </div>

                    {/* Guía Didáctica y Orientación Clínica */}
                    {(caseItem.studentSummary || caseItem.biochemicalConceptSimple) && (
                      <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-4 space-y-3">
                        <div className="flex items-center gap-1.5 text-emerald-950 font-bold text-xs uppercase tracking-wider">
                          <GraduationCap className="w-4 h-4 text-emerald-700" />
                          <span>Guía Didáctica del Caso Clínico</span>
                        </div>

                        {caseItem.studentSummary && (
                          <div className="bg-white/95 p-3 rounded-lg border border-emerald-100 text-xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                              Orientación Clínica del Caso:
                            </span>
                            <p className="text-slate-700 leading-relaxed">
                              {caseItem.studentSummary}
                            </p>
                          </div>
                        )}

                        {caseItem.biochemicalConceptSimple && (
                          <div className="bg-white/95 p-3 rounded-lg border border-emerald-100 text-xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block mb-1">
                              Mecanismo Bioquímico y Fisiopatológico:
                            </span>
                            <p className="text-slate-700 font-mono leading-relaxed bg-emerald-50/50 p-2 rounded border border-emerald-100">
                              {caseItem.biochemicalConceptSimple}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Glosario de Términos Clínicos */}
                    {caseItem.clinicalGlossary && caseItem.clinicalGlossary.length > 0 && (
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                            <span>Glosario de Términos del Caso ({caseItem.clinicalGlossary.length})</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => toggleGlossary(caseItem.id)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <span>{isGlossaryExpanded ? 'Ocultar términos' : 'Desplegar definiciones'}</span>
                            {isGlossaryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {isGlossaryExpanded && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200">
                            {caseItem.clinicalGlossary.map((item, idx) => (
                              <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs text-xs">
                                <span className="font-bold text-slate-900 block mb-0.5">{item.term}</span>
                                <span className="text-slate-600 text-[11px] leading-snug">{item.simpleDefinition}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Diagnosis & Key Biomarker */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 font-medium">Patología Diana:</span>
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {caseItem.targetDisease}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedCaseForModal(caseItem)}
                        className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer text-xs"
                      >
                        <span>Estudiar caso a fondo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCases.length === 0 && (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-bold text-slate-700">No se encontraron casos clínicos</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Prueba a restablecer los filtros de búsqueda o seleccionar otra especialidad.
              </p>
              <button
                onClick={() => {
                  setCaseSearchTerm('');
                  setSelectedCaseSystem('all');
                }}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Biomarker Detail Modal */}
      <BiomarkerDetailModal
        biomarker={selectedBiomarker}
        activeCase={activeCase}
        activeCaseDifferential={differentialSummary}
        onClose={() => setSelectedBiomarker(null)}
      />

      {/* Clinical Case Study Detail Modal */}
      <CaseDetailModal
        caseData={selectedCaseForModal}
        onClose={() => setSelectedCaseForModal(null)}
        onStartChallenge={() => {
          setSelectedCaseForModal(null);
        }}
      />
    </div>
  );
};

import React from 'react';
import { Biomarker, ClinicalCase } from '../../types';
import { ActiveCaseDifferentialSummary } from '../../utils/guidedDifferentialBiomarkers';
import { 
  X, 
  BookOpen, 
  Clock, 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Target, 
  Stethoscope,
  Compass
} from 'lucide-react';

interface BiomarkerDetailModalProps {
  biomarker: Biomarker | null;
  activeCase?: ClinicalCase | null;
  activeCaseDifferential?: ActiveCaseDifferentialSummary | null;
  onClose: () => void;
}

export const BiomarkerDetailModal: React.FC<BiomarkerDetailModalProps> = ({
  biomarker,
  activeCase,
  activeCaseDifferential,
  onClose
}) => {
  if (!biomarker) return null;

  const relevantInfo = activeCaseDifferential?.relevanceMap[biomarker.id];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col my-auto">
        {/* Header */}
        <div className="p-6 bg-slate-950 text-white border-b border-slate-800 flex items-start justify-between sticky top-0 z-10">
          <div>
            <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-slate-900 text-emerald-400 border border-slate-800">
                Sistema {biomarker.system}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-slate-800 text-slate-300">
                {biomarker.abbreviation}
              </span>
              {relevantInfo && (
                <span className={`px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${relevantInfo.badgeColorClass}`}>
                  <Compass className="w-3.5 h-3.5" />
                  <span>{relevantInfo.badgeLabel}</span>
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{biomarker.name}</h2>
            {biomarker.isoforms && (
              <p className="text-xs text-slate-400 mt-0.5 italic">{biomarker.isoforms}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-800">
          {/* GUIDED ACTIVE CASE CORRELATION CALLOUT IF RELEVANT */}
          {relevantInfo && activeCase && (
            <div className="p-4.5 rounded-2xl bg-slate-950 text-white border border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                      Aprendizaje Guiado: Caso Clínico Activo
                    </span>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {activeCase.title}
                    </h4>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase border ${relevantInfo.badgeColorClass}`}>
                  {relevantInfo.badgeLabel}
                </span>
              </div>

              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                <div>
                  <span className="text-emerald-400 font-semibold block mb-0.5">Rol en el Diagnóstico Diferencial:</span>
                  <p className="text-slate-200 leading-relaxed font-normal">
                    {relevantInfo.roleDescription}
                  </p>
                </div>

                {relevantInfo.whyOptimalOrSuboptimal && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-semibold block mb-0.5">Valor Clínico Específico frente a Alternativas:</span>
                    <p className="text-slate-300 leading-relaxed">
                      {relevantInfo.whyOptimalOrSuboptimal}
                    </p>
                  </div>
                )}

                {relevantInfo.clinicalRationale && !relevantInfo.whyOptimalOrSuboptimal && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-semibold block mb-0.5">Fundamentación Bioquímica:</span>
                    <p className="text-slate-300 leading-relaxed">
                      {relevantInfo.clinicalRationale}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reference Values Grid */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Valores de Referencia Fisiológicos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Unidades Convencionales:</span>
                <span className="font-bold text-slate-900 text-sm">{biomarker.referenceValues.conventional}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Sistema Internacional (SI):</span>
                <span className="font-bold text-slate-900 text-sm">{biomarker.referenceValues.si}</span>
              </div>
            </div>
            {biomarker.referenceValues.genderAgeVariations && (
              <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                Nota: {biomarker.referenceValues.genderAgeVariations}
              </p>
            )}
          </div>

          {/* Temporal Elevation Window */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Ventana Temporal de Elevación y Cinética Bioquímica</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Inicio Elevación</span>
                <span className="font-bold text-emerald-950 text-xs">{biomarker.temporalWindow.elevationStart}</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Pico Máximo</span>
                <span className="font-bold text-emerald-950 text-xs">{biomarker.temporalWindow.peakWindow}</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Normalización</span>
                <span className="font-bold text-emerald-950 text-xs">{biomarker.temporalWindow.normalizationWindow}</span>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80">
                <span className="text-[10px] text-emerald-800 font-semibold uppercase block">Semivida (T½)</span>
                <span className="font-bold text-emerald-950 text-xs">{biomarker.temporalWindow.halfLife || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Diagnostic Parameters */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Parámetros Diagnósticos Analíticos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Sensibilidad Clínica:</span>
                <span className="font-bold text-slate-900">{biomarker.diagnosticParams.sensitivity}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Especificidad Clínica:</span>
                <span className="font-bold text-slate-900">{biomarker.diagnosticParams.specificity}</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90">
                <span className="text-[10px] font-semibold text-slate-400 uppercase block">Punto de Corte Óptimo:</span>
                <span className="font-bold text-slate-900">{biomarker.diagnosticParams.optimalCutoff}</span>
              </div>
            </div>
          </div>

          {/* Clinical Relevance & Tissue Mechanism */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Relevancia Clínica y Mecanismo Fisiopatológico
            </h3>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs leading-relaxed text-slate-800 space-y-2">
              <p>{biomarker.clinicalRelevance}</p>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Indicaciones Principales:</span>
                <p className="text-slate-700">{biomarker.diagnosticIndication}</p>
              </div>
            </div>
          </div>

          {/* False Positives & Negatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200/80 space-y-1">
              <span className="font-semibold text-rose-900 uppercase tracking-wider block flex items-center space-x-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                <span>Causas de Falsos Positivos:</span>
              </span>
              <ul className="list-disc list-inside text-rose-950 space-y-1 pt-1">
                {biomarker.falsePositivesNegatives.falsePositives.map((fp, idx) => (
                  <li key={idx}>{fp}</li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/80 space-y-1">
              <span className="font-semibold text-amber-900 uppercase tracking-wider block flex items-center space-x-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Causas de Falsos Negativos:</span>
              </span>
              <ul className="list-disc list-inside text-amber-950 space-y-1 pt-1">
                {biomarker.falsePositivesNegatives.falseNegatives.map((fn, idx) => (
                  <li key={idx}>{fn}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Discriminatory Contexts */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 text-xs text-slate-900 space-y-2">
            <span className="font-semibold uppercase tracking-wider text-slate-700 block">
              Contextos de Diagnóstico Diferencial de Alto Valor:
            </span>
            <ul className="space-y-1.5">
              {biomarker.discriminatoryContexts.map((ctx, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-slate-700">{ctx}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end sticky bottom-0">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};


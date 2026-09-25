import { Biomarker, ClinicalCase, OrganSystem } from '../types';

export type BiomarkerRelevanceTier = 'optimal' | 'differential_distractor' | 'essential_lab' | 'system_differential';

export interface CaseRelevantBiomarkerInfo {
  biomarkerId: string;
  tier: BiomarkerRelevanceTier;
  badgeLabel: string;
  badgeColorClass: string;
  cardBorderClass: string;
  roleDescription: string;
  clinicalRationale: string;
  whyOptimalOrSuboptimal?: string;
  isTargetOptimal: boolean;
  priorityOrder: number; // 1 for optimal, 2 for differential distractors, 3 for essential lab, 4 for system
}

export interface ActiveCaseDifferentialSummary {
  caseId: string;
  caseTitle: string;
  targetDisease: string;
  system: OrganSystem;
  differentialDiseases: string[];
  relevantBiomarkerIds: string[];
  optimalBiomarkerId?: string;
  relevanceMap: Record<string, CaseRelevantBiomarkerInfo>;
  totalRelevantCount: number;
}

/**
 * Computes all biomarker relevance details for the currently active clinical case
 * to enable guided learning in the BiomarkerLibrary and Challenge views.
 */
export function analyzeCaseDifferentialBiomarkers(
  activeCase: ClinicalCase | null | undefined,
  allBiomarkers: Biomarker[]
): ActiveCaseDifferentialSummary | null {
  if (!activeCase) return null;

  const relevanceMap: Record<string, CaseRelevantBiomarkerInfo> = {};
  let optimalBiomarkerId: string | undefined;

  // 1. Process explicit biomarker options in the case
  activeCase.biomarkerOptions.forEach((opt) => {
    if (opt.isCorrect) {
      optimalBiomarkerId = opt.biomarkerId;
      relevanceMap[opt.biomarkerId] = {
        biomarkerId: opt.biomarkerId,
        tier: 'optimal',
        badgeLabel: '🌟 Marcador Óptimo del Caso',
        badgeColorClass: 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-1 ring-emerald-400/40',
        cardBorderClass: 'border-emerald-400 ring-2 ring-emerald-400/30 bg-emerald-50/30',
        roleDescription: `Confirmación diagnóstica directa de "${activeCase.targetDisease}".`,
        clinicalRationale: opt.biochemicalRationale,
        whyOptimalOrSuboptimal: opt.whyOptimalOrSuboptimal,
        isTargetOptimal: true,
        priorityOrder: 1
      };
    } else {
      relevanceMap[opt.biomarkerId] = {
        biomarkerId: opt.biomarkerId,
        tier: 'differential_distractor',
        badgeLabel: '⚖️ Diagnóstico Diferencial Clave',
        badgeColorClass: 'bg-amber-100 text-amber-900 border-amber-300 ring-1 ring-amber-400/40',
        cardBorderClass: 'border-amber-400 ring-2 ring-amber-400/20 bg-amber-50/20',
        roleDescription: 'Biomarcador comparador evaluado para discriminar etiologías alternativas en este caso.',
        clinicalRationale: opt.biochemicalRationale,
        whyOptimalOrSuboptimal: opt.whyOptimalOrSuboptimal,
        isTargetOptimal: false,
        priorityOrder: 2
      };
    }
  });

  // 2. Process essential biomarkers in case (e.g. multi-lab orders)
  if (activeCase.essentialBiomarkerIds) {
    activeCase.essentialBiomarkerIds.forEach((id) => {
      if (!relevanceMap[id]) {
        relevanceMap[id] = {
          biomarkerId: id,
          tier: 'essential_lab',
          badgeLabel: '📋 Esencial en Petición Analítica',
          badgeColorClass: 'bg-blue-100 text-blue-900 border-blue-300 ring-1 ring-blue-400/40',
          cardBorderClass: 'border-blue-400 ring-2 ring-blue-400/20 bg-blue-50/20',
          roleDescription: `Biomarcador analítico crítico en el perfil de urgencias para ${activeCase.targetDisease}.`,
          clinicalRationale: `Forma parte del algoritmo de confirmación y estratificación del caso "${activeCase.title}".`,
          isTargetOptimal: false,
          priorityOrder: 3
        };
      }
    });
  }

  // 3. Scan all biomarkers to find secondary system matches with differential diagnoses
  allBiomarkers.forEach((bm) => {
    if (!relevanceMap[bm.id] && bm.system === activeCase.system) {
      // Check if biomarker discriminatory contexts mention any differential disease
      const matchesDifferential = activeCase.differentialDiagnoses.some((diff) => {
        const diffLower = diff.disease.toLowerCase();
        return (
          bm.discriminatoryContexts.some((ctx) => ctx.toLowerCase().includes(diffLower.slice(0, 8))) ||
          bm.clinicalRelevance.toLowerCase().includes(diffLower.slice(0, 8)) ||
          bm.diagnosticIndication.toLowerCase().includes(diffLower.slice(0, 8))
        );
      });

      if (matchesDifferential) {
        relevanceMap[bm.id] = {
          biomarkerId: bm.id,
          tier: 'system_differential',
          badgeLabel: '🔬 Relacionado por Sistema Orgánico',
          badgeColorClass: 'bg-indigo-100 text-indigo-900 border-indigo-300',
          cardBorderClass: 'border-indigo-300 bg-indigo-50/20',
          roleDescription: `Biomarcador complementario del sistema ${bm.system} útil en la valoración global del paciente.`,
          clinicalRationale: bm.clinicalRelevance,
          isTargetOptimal: false,
          priorityOrder: 4
        };
      }
    }
  });

  const relevantBiomarkerIds = Object.keys(relevanceMap);

  return {
    caseId: activeCase.id,
    caseTitle: activeCase.title,
    targetDisease: activeCase.targetDisease,
    system: activeCase.system,
    differentialDiseases: activeCase.differentialDiagnoses.map((d) => d.disease),
    relevantBiomarkerIds,
    optimalBiomarkerId,
    relevanceMap,
    totalRelevantCount: relevantBiomarkerIds.length
  };
}

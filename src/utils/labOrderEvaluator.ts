import { Biomarker, ClinicalCase, LabOrderEvaluation, OrganSystem } from '../types';
import { BIOMARKERS_DATABASE } from '../data/biomarkers';

// Known target essential biomarker mapping per case ID for gold-standard precision
const CASE_ESSENTIAL_MAP: Record<string, string[]> = {
  case_cardiac_01: ['bm_troponin_c'],
  case_hepatic_01: ['bm_bilirrubina_total', 'bm_bilirrubina_directa'],
  case_hepatic_02: ['bm_bilirrubina_directa', 'bm_ggt', 'bm_fosfatasa_alcalina'],
  case_hepatic_03: ['bm_ast', 'bm_alt'],
  case_metabolic_01: ['bm_hba1c', 'bm_glucosa'],
  case_metabolic_02: ['bm_perfil_acilcarnitinas', 'bm_carnitina_libre'],
  case_metabolic_03: ['bm_beta_hidroxibutirato', 'bm_glucosa'],
  case_renal_01: ['bm_amonio_plasmatico'],
  case_renal_02: ['bm_acido_urico'],
  case_renal_03: ['bm_creatinina', 'bm_urea'],
  case_pancreatic_01: ['bm_lipasa', 'bm_trigliceridos'],
  case_pancreatic_02: ['bm_vitamina_b12', 'bm_magnesio'],
  case_pancreatic_03: ['bm_ttg_iga']
};

// Unit cost in budget percentage per test category (realistic clinical laboratory economics)
export const getBiomarkerCost = (biomarker: Biomarker): number => {
  // Specialized immunological or mass spectrometry profiles cost slightly more
  if (['bm_perfil_acilcarnitinas', 'bm_ttg_iga', 'bm_nt_probnp'].includes(biomarker.id)) {
    return 8;
  }
  if (['bm_troponin_c', 'bm_elastasa_fecal', 'bm_vitamina_b12', 'bm_gastrina'].includes(biomarker.id)) {
    return 6;
  }
  return 4; // Standard routine biochemical enzymes, substrates, ions
};

export const getEssentialBiomarkerIdsForCase = (caseData: ClinicalCase): string[] => {
  if (caseData.essentialBiomarkerIds && caseData.essentialBiomarkerIds.length > 0) {
    return caseData.essentialBiomarkerIds;
  }
  if (CASE_ESSENTIAL_MAP[caseData.id]) {
    return CASE_ESSENTIAL_MAP[caseData.id];
  }
  // Fallback: extract from correct biomarker options
  const correctOptions = caseData.biomarkerOptions.filter((o) => o.isCorrect);
  const ids: string[] = [];
  correctOptions.forEach((o) => {
    if (o.biomarkerId && !ids.includes(o.biomarkerId)) {
      ids.push(o.biomarkerId);
    }
  });
  return ids.length > 0 ? ids : ['bm_troponin_c'];
};

export const evaluateLabOrder = (
  caseData: ClinicalCase,
  orderedBiomarkerIds: string[],
  allBiomarkers: Biomarker[] = BIOMARKERS_DATABASE
): LabOrderEvaluation => {
  const essentialIds = getEssentialBiomarkerIdsForCase(caseData);
  const orderedBiomarkers = allBiomarkers.filter((b) => orderedBiomarkerIds.includes(b.id));

  // Find essential biomarkers that were ordered
  const essentialFound = orderedBiomarkers.filter((b) => essentialIds.includes(b.id));

  // Find essential biomarkers that were missed
  const missingEssential = allBiomarkers.filter(
    (b) => essentialIds.includes(b.id) && !orderedBiomarkerIds.includes(b.id)
  );

  // Other biomarkers ordered
  const nonEssentialOrdered = orderedBiomarkers.filter((b) => !essentialIds.includes(b.id));

  // Partition into complementary (same system or related diagnostic context) vs redundant (different system / misleading window)
  const complementary: Biomarker[] = [];
  const redundant: Biomarker[] = [];

  nonEssentialOrdered.forEach((b) => {
    if (b.system === caseData.system) {
      // Test is in same organ system, reasonable complementary battery
      complementary.push(b);
    } else {
      // Completely unrelated organ system or unindicated test
      redundant.push(b);
    }
  });

  // Calculate total budget cost
  const totalBudgetCost = orderedBiomarkers.reduce((sum, b) => sum + getBiomarkerCost(b), 0);

  // Calculate accuracy score (0 - 100%)
  const essentialRatio = essentialIds.length > 0 ? essentialFound.length / essentialIds.length : 0;
  const isFullyCorrect = essentialFound.length >= essentialIds.length && missingEssential.length === 0;
  const isPartiallyCorrect = essentialFound.length > 0 && !isFullyCorrect;

  let accuracyScore = Math.round(essentialRatio * 100);

  // Calculate budget efficiency score (0 - 100%)
  // Perfect score if only essential and max 1 complementary test is ordered without redundants
  let budgetEfficiencyScore = 100;
  budgetEfficiencyScore -= redundant.length * 20;
  budgetEfficiencyScore -= Math.max(0, complementary.length - 1) * 10;
  budgetEfficiencyScore = Math.max(0, Math.min(100, budgetEfficiencyScore));

  // Generate comprehensive clinical summary
  let clinicalSummary = '';
  if (isFullyCorrect) {
    if (redundant.length === 0) {
      clinicalSummary = `¡Excelente solicitud de laboratorio! Has incluido todos los biomarcadores críticos requeridos (${essentialFound.map((b) => b.name).join(', ')}) con un gasto presupuestario altamente eficiente y sin pruebas innecesarias.`;
    } else {
      clinicalSummary = `Has incluido los biomarcadores confirmatorios clave (${essentialFound.map((b) => b.name).join(', ')}), estableciendo el diagnóstico definitivo. No obstante, se solicitaron ${redundant.length} prueba(s) no indicadas que aumentaron el costo de la guardia.`;
    }
  } else if (isPartiallyCorrect) {
    clinicalSummary = `Orden de laboratorio incompleta: Se solicitó ${essentialFound.map((b) => b.name).join(', ')}, pero se omitió ${missingEssential.map((b) => b.name).join(', ')}, necesario para la confirmación categórica en este escenario.`;
  } else {
    clinicalSummary = `La orden emitida no incluyó los biomarcadores discriminatorios prioritarios (${missingEssential.map((b) => b.name).join(', ')}) para confirmar la patología diana (${caseData.targetDisease}).`;
  }

  return {
    isFullyCorrect,
    isPartiallyCorrect,
    accuracyScore,
    budgetEfficiencyScore,
    orderedBiomarkerIds,
    essentialBiomarkersFound: essentialFound,
    complementaryBiomarkers: complementary,
    redundantBiomarkers: redundant,
    missingEssentialBiomarkers: missingEssential,
    totalBudgetCost,
    clinicalSummary
  };
};

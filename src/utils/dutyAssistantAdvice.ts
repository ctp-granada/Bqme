import { Biomarker, ClinicalCase } from '../types';
import { BIOMARKERS_DATABASE } from '../data/biomarkers';
import { getBiomarkerCost, getEssentialBiomarkerIdsForCase } from './labOrderEvaluator';

export interface DutyAdvice {
  urgencyLevel: 'critical' | 'warning' | 'advisory';
  supervisorQuote: string;
  recommendedBiomarkers: {
    biomarker: Biomarker;
    cost: number;
    efficiencyRationale: string;
  }[];
  biomarkersToAvoid: {
    biomarkerName: string;
    reason: string;
  }[];
  strategicTip: string;
  recommendedIds: string[];
}

export const getDutyAssistantAdvice = (
  currentCase: ClinicalCase,
  currentBudget: number,
  allBiomarkers: Biomarker[] = BIOMARKERS_DATABASE
): DutyAdvice => {
  const essentialIds = getEssentialBiomarkerIdsForCase(currentCase);
  const urgencyLevel: 'critical' | 'warning' | 'advisory' =
    currentBudget < 20 ? 'critical' : currentBudget <= 40 ? 'warning' : 'advisory';

  const recommendedBiomarkers = essentialIds
    .map((id) => {
      const biomarker = allBiomarkers.find((b) => b.id === id);
      if (!biomarker) return null;
      const cost = getBiomarkerCost(biomarker);
      return {
        biomarker,
        cost,
        efficiencyRationale: `Alta especificidad para ${currentCase.targetDisease}. Coste reducido (-${cost}%) con máximo rendimiento diagnóstico.`
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  let supervisorQuote = '';
  let strategicTip = '';
  let biomarkersToAvoid: { biomarkerName: string; reason: string }[] = [];

  switch (currentCase.system) {
    case 'pancreatic':
      if (currentCase.id.includes('pancreatic_01') || currentCase.targetDisease.toLowerCase().includes('hipertriglicerid')) {
        supervisorQuote =
          '«En hipertrigliceridemia severa con suero lechoso, prioriza Lipasa sérica y Triglicéridos. No pidas paneles caros de malabsorción ni amilasa aislada (da falso negativo por turbidez).»';
        strategicTip =
          'La lipasa tiene mayor vida media y especificidad que la amilasa. Combinarla con triglicéridos confirma etiología y necrosis con coste mínimo.';
        biomarkersToAvoid = [
          { biomarkerName: 'Amilasa sérica aislada', reason: 'Interferencia espectrofotométrica por lipemia masiva' },
          { biomarkerName: 'Elastasa-1 fecal / Acilcarnitinas', reason: 'No urgentes para fase aguda y alto coste innecesario' }
        ];
      } else {
        supervisorQuote =
          '«Para cuadros digestivos y malabsortivos, pide anticuerpos específicos (tTG-IgA) o vitaminas diana, evitando baterías hepáticas amplias.»';
        strategicTip =
          'Focaliza en el marcador patognomónico para preservar presupuesto.';
        biomarkersToAvoid = [
          { biomarkerName: 'Enzimas citolíticas hepáticas masivas', reason: 'Redundantes en sospecha celíaca' }
        ];
      }
      break;

    case 'cardiac':
      supervisorQuote =
        '«En sospecha de síndrome coronario agudo, la Troponina ultrasensible es el estándar único esencial. Evita solicitar LDH o CK total salvo para reinfartos muy precoces.»';
      strategicTip =
        'La Troponina hs sola resuelve >95% de la sospecha miocárdica con solo -6% de coste presupuestario.';
      biomarkersToAvoid = [
        { biomarkerName: 'LDH y CK total aisladas', reason: 'Baja especificidad tisular y consumo de presupuesto' },
        { biomarkerName: 'Panel metabólico ampliado', reason: 'No indicado en dolor torácico isquémico agudo' }
      ];
      break;

    case 'hepatic':
      supervisorQuote =
        '«Diferencia si el patrón es colestásico (Bilirrubina directa + FA + GGT) o citolítico (ALT + AST). No solicites amonio ni marcadores cardíacos si la sospecha es biliar primaria.»';
      strategicTip =
        'El cociente AST/ALT o las fosfatasas alcalinas son de muy bajo coste (-4%) y descartan patología quirúrgica.';
      biomarkersToAvoid = [
        { biomarkerName: 'Amonio o Troponina', reason: 'Sin indicación en cólico biliar o ictericia obstructiva pura' }
      ];
      break;

    case 'metabolic':
      supervisorQuote =
        '«En descompensación cetósica o hipoglucemia, la glucemia junto a Cuerpos Cetónicos (β-hidroxibutirato) o Acilcarnitinas son decisivos. Evita perfiles enzimáticos hepáticos innecesarios.»';
      strategicTip =
        'Verifica cuerpos cetónicos en sangre frente a orina para una cuantificación cinética exacta al menor coste.';
      biomarkersToAvoid = [
        { biomarkerName: 'Troponina o Lipasa', reason: 'Aumentan falsamente en acidosis sin ser el foco primario' }
      ];
      break;

    case 'renal':
      supervisorQuote =
        '«Para sospecha de hiperuricemia/gota o encefalopatía por ciclo de urea, solicita solo el metabolito diana (Ácido Úrico o Amonio plasmático).»';
      strategicTip =
        'El amonio sérico rápido en tubo frío es barato (-4%) y altamente discriminatorio frente a comas tóxicos.';
      biomarkersToAvoid = [
        { biomarkerName: 'Baterías extensas de autoanticuerpos', reason: 'Elevado coste e innecesarias en hiperuricemia aguda' }
      ];
      break;

    default:
      supervisorQuote =
        '«Prioriza biomarcadores con sensibilidad >90% dentro de la ventana horaria del paciente, descartando pruebas no relacionadas con el sistema diana.»';
      strategicTip = 'Limita la solicitud a un máximo de 2 pruebas críticas para maximizar la bonificación de eficiencia presupuestaria.';
      biomarkersToAvoid = [];
      break;
  }

  return {
    urgencyLevel,
    supervisorQuote,
    recommendedBiomarkers,
    biomarkersToAvoid,
    strategicTip,
    recommendedIds: essentialIds
  };
};

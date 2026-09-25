import { Biomarker } from '../types';

export const BIOMARKERS_DATABASE: Biomarker[] = [
  // ==========================================
  // MARCADORES CARDÍACOS
  // ==========================================
  {
    id: 'bm_troponin_c',
    name: 'Troponina Cardíaca (hs-cTn)',
    abbreviation: 'cTn',
    isoforms: 'Subunidad I/T de troponina miocárdica',
    system: 'cardiac',
    referenceValues: {
      conventional: '< 50 ng/L',
      si: '< 50 ng/L',
      genderAgeVariations: 'Valores de corte por percentil 99 sexo-específicos.'
    },
    temporalWindow: {
      elevationStart: '2 - 4 horas post-isquemia',
      peakWindow: '12 - 24 horas',
      normalizationWindow: '7 - 14 días',
      halfLife: '90 minutos (desintegración proteolítica lenta miofibrilar)'
    },
    diagnosticParams: {
      sensitivity: '97% a las 3 horas del dolor precordial',
      specificity: '95% para necrosis miocárdica aguda',
      optimalCutoff: '> 50 ng/L con delta de cambio > 20%'
    },
    clinicalRelevance: 'Componente del complejo miofibrilar cardíaco. En la necrosis de miocitos por interrupción del flujo coronario, se libera del pool citosólico y del complejo estructural.',
    diagnosticIndication: 'Diagnóstico diferencial de Síndrome Coronario Agudo (IAMCEST, SCASEST) frente a Angina Inestable.',
    falsePositivesNegatives: {
      falsePositives: ['Insuficiencia renal crónica', 'Embolia pulmonar', 'Miocarditis', 'Crisis hipertensiva'],
      falseNegatives: ['Toma de muestra en fase hiperaguda (< 1 hora)']
    },
    discriminatoryContexts: [
      'Discrimina Infarto Agudo de Miocardio con necrosis frente a Angina Inestable (sin necrosis).'
    ]
  },
  {
    id: 'bm_ckmb',
    name: 'Creatina Quinasa Isoenzima MB',
    abbreviation: 'CK-MB',
    isoforms: 'Dímero MB (citosólico miocárdico)',
    system: 'cardiac',
    referenceValues: {
      conventional: '< 5 ng/mL',
      si: '< 5 μg/L',
      genderAgeVariations: 'Índice relativo CK-MB/CK total: 2.5 - 5.0%'
    },
    temporalWindow: {
      elevationStart: '4 - 6 horas',
      peakWindow: '18 - 24 horas',
      normalizationWindow: '48 - 72 horas',
      halfLife: '12 horas'
    },
    diagnosticParams: {
      sensitivity: '88% a las 6 horas post-evento',
      specificity: '89% con índice relativo > 3%',
      optimalCutoff: '> 5 ng/mL'
    },
    clinicalRelevance: 'Enzima citosólica que cataliza la fosforilación reversible de la creatina. Presente en miocardio (15-20%) y en menor proporción en músculo esquelético.',
    diagnosticIndication: 'Detección de reinfarto agudo en fase subaguda tras 3-7 días de un primer evento (por su rápida normalización a las 48-72h).',
    falsePositivesNegatives: {
      falsePositives: ['Trauma muscular esquelético / Rabdomiolisis', 'Ejercicio extremo'],
      falseNegatives: ['Infartos de muy pequeña masa muscular']
    },
    discriminatoryContexts: [
      'Discrimina reinfarto precoz cuando la troponina se mantiene elevada residualmente por el evento inicial.'
    ]
  },
  {
    id: 'bm_ck_total',
    name: 'Creatina Quinasa Total (CK Total)',
    abbreviation: 'CK Total',
    isoforms: 'Isoenzimas MM, MB, BB',
    system: 'cardiac',
    referenceValues: {
      conventional: 'H: 24–195 U/L; M: 24–170 U/L',
      si: 'H: 24–195 U/L; M: 24–170 U/L',
      genderAgeVariations: 'Mayor masa muscular en varones condiciona límites superiores mayores.'
    },
    temporalWindow: {
      elevationStart: '4 - 8 horas',
      peakWindow: '24 horas',
      normalizationWindow: '3 - 4 días',
      halfLife: '15 horas'
    },
    diagnosticParams: {
      sensitivity: '80% en patología muscular/cardíaca',
      specificity: '60% (ubiquidad esquelética)',
      optimalCutoff: '> 195 U/L (Varones) / > 170 U/L (Mujeres)'
    },
    clinicalRelevance: 'Cataliza la transferencia del grupo fosfato de la fosfocreatina al ADP para regenerar ATP en tejidos de alta demanda energética.',
    diagnosticIndication: 'Orientación de miopatías, rabdomiolisis y coadyuvante en necrosis miocárdica.',
    falsePositivesNegatives: {
      falsePositives: ['Traumatismos musculares', 'Inyecciones intramusculares', 'Uso de estatinas'],
      falseNegatives: ['Reposo prolongado o baja masa muscular']
    },
    discriminatoryContexts: [
      'Permite calcular el índice relativo CK-MB/CK total para confirmar origen cardíaco.'
    ]
  },
  {
    id: 'bm_ldh',
    name: 'Lactato Deshidrogenasa Total',
    abbreviation: 'LDH',
    isoforms: 'Tetrámeros LDH-1 a LDH-5',
    system: 'cardiac',
    referenceValues: {
      conventional: '140–280 U/L',
      si: '140–280 U/L',
      genderAgeVariations: 'Aumenta en recién nacidos e infantes.'
    },
    temporalWindow: {
      elevationStart: '12 - 24 horas',
      peakWindow: '48 - 72 horas',
      normalizationWindow: '8 - 14 días',
      halfLife: '50 horas (isoforma LDH-1)'
    },
    diagnosticParams: {
      sensitivity: '85% en fases tardías (> 48h)',
      specificity: '55% (muy baja por distribución tisular)',
      optimalCutoff: '> 280 U/L'
    },
    clinicalRelevance: 'Enzima citosólica que cataliza la interconversión de piruvato y lactato. Elevada en necrosis celular generalizada, hemólisis y daño tisular severo.',
    diagnosticIndication: 'Marcador tardío de necrosis, hemólisis intravascular (ictericia prehepática) y lisis tumoral.',
    falsePositivesNegatives: {
      falsePositives: ['Hemólisis in vitro de la muestra', 'Ejercicio intenso', 'Infarcto renal/pulmonar'],
      falseNegatives: ['Fase hiperaguda (< 12 horas)']
    },
    discriminatoryContexts: [
      'Confirmación de hemólisis intravascular en ictericia prehepática y marcador tardío de daño tisular.'
    ]
  },
  {
    id: 'bm_nt_probnp',
    name: 'NT-proBNP (Fragmento N-Terminal del Propéptido Natriurético B)',
    abbreviation: 'NT-proBNP',
    isoforms: 'Péptido inactivo de 76 aminoácidos',
    system: 'cardiac',
    referenceValues: {
      conventional: '< 125 pg/mL',
      si: '< 14.7 pmol/L',
      genderAgeVariations: 'Punto de corte excluyente en disnea aguda: < 300 pg/mL.'
    },
    temporalWindow: {
      elevationStart: '2 - 4 horas tras estiramiento miocárdico',
      peakWindow: '24 horas',
      normalizationWindow: 'Varía según resolución del estrés de pared',
      halfLife: '120 minutos'
    },
    diagnosticParams: {
      sensitivity: '97% para descarte de Insuficiencia Cardíaca',
      specificity: '85% ajustado por edad',
      optimalCutoff: '> 125 pg/mL (> 300 pg/mL en cuadro agudo)'
    },
    clinicalRelevance: 'Sintetizado por los miocitos ventriculares en respuesta a sobrecarga de volumen o tensión telediastólica de la pared.',
    diagnosticIndication: 'Diagnóstico diferencial de disnea aguda (origen cardíaco hemodinámico vs respiratorio/EPOC).',
    falsePositivesNegatives: {
      falsePositives: ['Insuficiencia renal', 'Fibrilación auricular', 'Edad avanzada'],
      falseNegatives: ['Obesidad mórbida (falsa reducción)']
    },
    discriminatoryContexts: [
      'Discrimina disnea cardiogénica por falla ventricular de disnea primaria pulmonar.'
    ]
  },

  // ==========================================
  // MARCADORES HEPÁTICOS Y DE COLESTASIS (ICTERICIAS)
  // ==========================================
  {
    id: 'bm_bilirrubina_total',
    name: 'Bilirrubina Total Sérica',
    abbreviation: 'BT',
    isoforms: 'Suma de fracción conjugada (directa) e incalculada no conjugada (indirecta)',
    system: 'hepatic',
    referenceValues: {
      conventional: '0,3–1,2 mg/dL',
      si: '5.1–20.5 μmol/L',
      genderAgeVariations: 'Ligeramente superior en hombres.'
    },
    temporalWindow: {
      elevationStart: 'Inmediata al fallo de depuración biliar o hipercatabolismo hemático',
      peakWindow: 'Dependiente de la persistencia de la causa',
      normalizationWindow: 'Días a semanas tras resolución',
      halfLife: '4 horas (libre) / 18 días (delta-bilirrubina ligada a albúmina)'
    },
    diagnosticParams: {
      sensitivity: '90% para detección de ictericia clíno-bioquímica',
      specificity: 'Depende del fraccionamiento en directa/indirecta',
      optimalCutoff: '> 1.2 mg/dL (ictericia clínica manifiesta cuando > 2.5 mg/dL)'
    },
    clinicalRelevance: 'Catabolito del grupo hemo del eritrocito. Su elevación genera ictericia y requiere fraccionamiento para clasificar la causa en prehepática, hepática o posthepática.',
    diagnosticIndication: 'Evaluación y clasificación fisiopatológica de síndromes ictericos.',
    falsePositivesNegatives: {
      falsePositives: ['Ayuno prolongado (Síndrome de Gilbert)', 'Hemólisis en muestra'],
      falseNegatives: ['Exposición de la muestra de sangre a la luz solar (fotodegradación)']
    },
    discriminatoryContexts: [
      'Punto de partida obligado para el enfoque diferencial de ictericias.'
    ]
  },
  {
    id: 'bm_bilirrubina_directa',
    name: 'Bilirrubina Directa (Conjugada)',
    abbreviation: 'BD',
    isoforms: 'Diglucurónido y monoglucurónido de bilirrubina (hidrosoluble)',
    system: 'hepatic',
    referenceValues: {
      conventional: '< 0,3 mg/dL',
      si: '< 5.1 μmol/L',
      genderAgeVariations: 'No varía significativamente con sexo.'
    },
    temporalWindow: {
      elevationStart: 'Horas tras obstrucción biliar extrahepática o colestasis',
      peakWindow: 'Según grado de estasis biliar',
      normalizationWindow: '1 - 2 semanas tras desobstrucción',
      halfLife: '4 horas'
    },
    diagnosticParams: {
      sensitivity: '95% para colestasis e ictericia posthepática',
      specificity: '92% para diferenciar patrón colestásico/posthepático de hemolítico/prehepático',
      optimalCutoff: '> 0.3 mg/dL (o > 30% de la Bilirrubina Total)'
    },
    clinicalRelevance: 'Conjugada en el hepatocito por la UDP-glucuronosiltransferasa. Al ser hidrosoluble, su exceso en sangre se filtra renalmente produciendo coluria y traduce obstrucción biliar (posthepática) o colestasis intrahepática con acolia/hipocolia.',
    diagnosticIndication: 'Diferenciación crucial de Ictericia Posthepática/Obstructiva frente a Prehepática/Hemolítica.',
    falsePositivesNegatives: {
      falsePositives: ['Síndrome de Dubin-Johnson / Rotor'],
      falseNegatives: ['Muestra expuesta a luz ambiente intensa']
    },
    discriminatoryContexts: [
      'Dominancia de BD con acolia, coluria, GGT y FA elevadas confirma Ictericia Posthepática / Obstructiva.'
    ]
  },
  {
    id: 'bm_ast',
    name: 'Aspartato Aminotransferasa (AST / GOT)',
    abbreviation: 'AST',
    isoforms: 'Isoforma citosólica (40%) y mitocondrial (60%)',
    system: 'hepatic',
    referenceValues: {
      conventional: '< 40 U/L',
      si: '< 0.68 μkat/L',
      genderAgeVariations: 'Ligeramente superior en hombres.'
    },
    temporalWindow: {
      elevationStart: '6 - 8 horas',
      peakWindow: '24 - 36 horas',
      normalizationWindow: '4 - 6 días',
      halfLife: '17 horas'
    },
    diagnosticParams: {
      sensitivity: '88% en necrosis hepatocitaria aguda',
      specificity: '78% (presente también en músculo y eritrocitos)',
      optimalCutoff: '> 40 U/L (Cociente AST/ALT > 2 en hepatitis alcohólica)'
    },
    clinicalRelevance: 'Enzima bilocular. El etanol causa daño mitocondrial directo liberando la fracción mitocondrial de AST y depletando piridoxal-fosfato (necesario para ALT).',
    diagnosticIndication: 'Identificación de citólisis hepática, daño miocárdico o muscular y hepatitis alcohólica.',
    falsePositivesNegatives: {
      falsePositives: ['Hemólisis in vitro', 'Ejercicio extenuante', 'Traumatismo muscular'],
      falseNegatives: ['Deficiencia de piridoxal-5-fosfato (Vitamina B6)']
    },
    discriminatoryContexts: [
      'Cociente De Ritis (AST/ALT > 2) orienta a patología alcohólica o daño mitocondrial.'
    ]
  },
  {
    id: 'bm_alt',
    name: 'Alanina Aminotransferasa (ALT / GPT)',
    abbreviation: 'ALT',
    isoforms: 'Citosólica predominantemente hepatocitaria',
    system: 'hepatic',
    referenceValues: {
      conventional: '< 40 U/L',
      si: '< 0.68 μkat/L',
      genderAgeVariations: 'Ligeramente superior en varones.'
    },
    temporalWindow: {
      elevationStart: '6 - 12 horas',
      peakWindow: '24 - 48 horas',
      normalizationWindow: '2 - 3 semanas',
      halfLife: '47 horas'
    },
    diagnosticParams: {
      sensitivity: '92% para daño hepatocelular primario',
      specificity: '95% (alta especificidad de tejido hepático)',
      optimalCutoff: '> 40 U/L (> 1000 U/L en necrosis tóxica o viral)'
    },
    clinicalRelevance: 'Enzima citosólica altamente concentrada en los hepatocitos. Su liberación en picos altos (> 1000 U/L) refleja necrosis o citólisis masiva por toxinas (ej. paracetamol) o virus.',
    diagnosticIndication: 'Diagnóstico de hepatitis aguda viral, isquémica o tóxica e ictericia hepática parenquimatosa.',
    falsePositivesNegatives: {
      falsePositives: ['Esteatohepatitis no alcohólica severa', 'Trauma muscular masivo'],
      falseNegatives: ['Cirrosis terminal por pérdida masiva de hepatocitos funcionales']
    },
    discriminatoryContexts: [
      'Elevación extrema (> 1000 U/L) confirma Ictericia Hepática / Citolítica frente a ictericia puramente destructiva de vía biliar o hemolítica.'
    ]
  },
  {
    id: 'bm_ggt',
    name: 'Gamma-Glutamil Transferasa',
    abbreviation: 'GGT',
    isoforms: 'Enzima de membrana en polo biliar y epitelio canalicular',
    system: 'hepatic',
    referenceValues: {
      conventional: 'H < 60 U/L; M < 40 U/L',
      si: 'H < 1.0 μkat/L; M < 0.67 μkat/L',
      genderAgeVariations: 'Mayor en hombres e inducida por fármacos/alcohol.'
    },
    temporalWindow: {
      elevationStart: '12 - 24 horas en colestasis biliar',
      peakWindow: 'Según obstrucción',
      normalizationWindow: '2 - 4 semanas',
      halfLife: '7 - 10 días'
    },
    diagnosticParams: {
      sensitivity: '95% para colestasis e inducción microsomal',
      specificity: '68% (frecuentes elevaciones por inductores enzimáticos)',
      optimalCutoff: '> 60 U/L (H) / > 40 U/L (M)'
    },
    clinicalRelevance: 'Ubicada en la membrana canalicular biliar. Las sales biliares acumuladas estimulan su síntesis y liberación. Confirma que una fosfatasa alcalina elevada proviene del árbol biliar y no del hueso.',
    diagnosticIndication: 'Confirmación de origen biliar/hepático de la fosfatasa alcalina y detección de colestasis.',
    falsePositivesNegatives: {
      falsePositives: ['Inducción por alcohol, fenitoína, barbitúricos', 'Esteatosis hepática'],
      falseNegatives: ['Colestasis intrahepática familiar benigna con GGT normal']
    },
    discriminatoryContexts: [
      'GGT elevada junto a Fosfatasa Alcalina elevada confirma ictericia colestásica/posthepática biliar.'
    ]
  },
  {
    id: 'bm_fosfatasa_alcalina',
    name: 'Fosfatasa Alcalina Total',
    abbreviation: 'FA',
    isoforms: 'Isoformas hepática (canalicular), ósea y placentaria',
    system: 'hepatic',
    referenceValues: {
      conventional: '40–130 U/L',
      si: '0.67–2.17 μkat/L',
      genderAgeVariations: 'Aumentada fisiológicamente en niños en crecimiento y embarazo (tercer trimestre).'
    },
    temporalWindow: {
      elevationStart: '24 - 48 horas en obstrucción biliar',
      peakWindow: 'Días a semanas',
      normalizationWindow: '1 - 3 semanas tras desobstrucción',
      halfLife: '7 días'
    },
    diagnosticParams: {
      sensitivity: '90% en patrón obstructivo/colestásico',
      specificity: '75% (requiere GGT para descartar origen óseo)',
      optimalCutoff: '> 130 U/L (> 3 veces LSN en patología obstructiva)'
    },
    clinicalRelevance: 'Anclada al polo canalicular de la membrana hepatocitaria. La obstrucción biliar o estasis induce su transcripción y liberación a sangre.',
    diagnosticIndication: 'Diagnóstico de colestasis, coledocolitiasis y patología infiltrativa hepática.',
    falsePositivesNegatives: {
      falsePositives: ['Crecimiento óseo activo', 'Remodelado óseo', 'Embarazo'],
      falseNegatives: ['Deficiencia de zinc o magnesio (cofactores de la enzima)']
    },
    discriminatoryContexts: [
      'Marcador cardinal de Ictericia Posthepática / Obstructiva.'
    ]
  },
  {
    id: 'bm_acidos_biliares',
    name: 'Ácidos Biliares Séricos Totales',
    abbreviation: 'ABS',
    isoforms: 'Ácido cólico, desoxicólico y chenodesoxicólico conjugados',
    system: 'hepatic',
    referenceValues: {
      conventional: '< 10 µmol/L',
      si: '< 10 µmol/L',
      genderAgeVariations: 'Aumenta significativamente en el periodo posprandial.'
    },
    temporalWindow: {
      elevationStart: 'Inmediato tras colestasis o fallo de recaptación enterohepática',
      peakWindow: 'Variable',
      normalizationWindow: 'Rápida tras restauración del flujo biliar',
      halfLife: 'Minutos a horas'
    },
    diagnosticParams: {
      sensitivity: '98% para colestasis intrahepática del embarazo y colestasis leve',
      specificity: '93% para fallo del transporte biliar',
      optimalCutoff: '> 10 µmol/L (> 40 µmol/L indica colestasis severa con riesgo fetal)'
    },
    clinicalRelevance: 'Sintetizados en el hígado a partir del colesterol. En la colestasis, su depuración biliar falla, acumulándose en sangre y provocando prurito intenso.',
    diagnosticIndication: 'Diagnóstico de Colestasis Intrahepática del Embarazo y hepatopatías con estasis biliar fina.',
    falsePositivesNegatives: {
      falsePositives: ['Toma de muestra posprandial (requiere ayuno estricto)'],
      falseNegatives: ['Síndrome de malabsorción ileal (pérdida de la circulación enterohepática)']
    },
    discriminatoryContexts: [
      'Marcador ultrasensible de alteración del flujo biliar y prurito colestásico.'
    ]
  },
  {
    id: 'bm_albumina',
    name: 'Albúmina Sérica',
    abbreviation: 'Alb',
    isoforms: 'Proteína monomérica sintetizada en hígado',
    system: 'hepatic',
    referenceValues: {
      conventional: '3,5–5,0 g/dL',
      si: '35–50 g/L',
      genderAgeVariations: 'Disminuye en ancianos e inflamación crónica.'
    },
    temporalWindow: {
      elevationStart: 'Lenta (refleja daño hepático crónico)',
      peakWindow: 'No aplica',
      normalizationWindow: 'Semanas a meses',
      halfLife: '20 días'
    },
    diagnosticParams: {
      sensitivity: '85% para insuficiencia de síntesis hepática crónica',
      specificity: '70% (afectada por pérdidas renales o intestinales)',
      optimalCutoff: '< 3.5 g/dL'
    },
    clinicalRelevance: 'Principal proteína plasmática sintetizada exclusivamente por los hepatocitos. Mantiene la presión oncótica coloidosmótica.',
    diagnosticIndication: 'Evaluación de la función de reserva de síntesis hepática en cirrosis y desnutrición.',
    falsePositivesNegatives: {
      falsePositives: ['Deshidratación / Hemoconcentración'],
      falseNegatives: ['Síndrome nefrótico', 'Enteropatía pierdeproteínas', 'Inflamación aguda (reactante de fase negativa)']
    },
    discriminatoryContexts: [
      'Diferencia la falla hepática crónica de cuadros agudos citolíticos puros.'
    ]
  },
  {
    id: 'bm_proteinas_totales',
    name: 'Proteínas Totales Plasmáticas',
    abbreviation: 'PT',
    isoforms: 'Suma de albúmina y globulinas',
    system: 'hepatic',
    referenceValues: {
      conventional: '6,0–8,3 g/dL',
      si: '60–83 g/L',
      genderAgeVariations: 'Estables en adultos.'
    },
    temporalWindow: {
      elevationStart: 'Crónica',
      peakWindow: 'No aplica',
      normalizationWindow: 'Varía según etiología',
      halfLife: 'Variable (albúmina 20d, inmunoglobulinas 21d)'
    },
    diagnosticParams: {
      sensitivity: '75%',
      specificity: '65%',
      optimalCutoff: '< 6.0 g/dL (Hipoproteinemia) / > 8.3 g/dL (Hyperproteinemia/Mieloma)'
    },
    clinicalRelevance: 'Refleja el estado nutricional, la capacidad de síntesis del hígado y la presencia de gammaglopatías o pérdidas proteicas.',
    diagnosticIndication: 'Cribado nutricional, hepático e inmunitario.',
    falsePositivesNegatives: {
      falsePositives: ['Hemoconcentración', 'Mieloma múltiple / Gammaglobulinopatía monoclonal'],
      falseNegatives: ['Sobrecarga hídrica / Dilución']
    },
    discriminatoryContexts: [
      'Útil en la evaluación global de síntesis proteica hepática.'
    ]
  },

  // ==========================================
  // METABOLISMO GLUCÍDICO, LÍPIDOS Y BETA-OXIDACIÓN
  // ==========================================
  {
    id: 'bm_glucosa',
    name: 'Glucemia en Ayunas',
    abbreviation: 'Glucosa',
    isoforms: 'D-Glucosa libre circulante',
    system: 'metabolic',
    referenceValues: {
      conventional: '70–109 mg/dL',
      si: '3.9–6.0 mmol/L',
      genderAgeVariations: 'Nivel en ayunas estricto de 8 horas.'
    },
    temporalWindow: {
      elevationStart: 'Inmediata tras ingesta o descompensación metabólica',
      peakWindow: 'Posprandial (1 - 2 horas)',
      normalizationWindow: '2 - 3 horas en sujetos sanos',
      halfLife: 'Minutos'
    },
    diagnosticParams: {
      sensitivity: '90% para diabetes descompensada e hipoglucemia',
      specificity: '95% en ayunas estricto de 8 horas',
      optimalCutoff: '< 70 mg/dL (Hipoglucemia) / ≥ 126 mg/dL (Criterio de Diabetes Mellitus)'
    },
    clinicalRelevance: 'Sustrato metabólico energético primario del sistema nervioso central. Su regulación precisa involucra insulina y hormonas contrarreguladoras (glucagón, adrenalina, cortisol, GH).',
    diagnosticIndication: 'Diagnóstico y seguimiento de Diabetes Mellitus, Resistencia a la Insulina e Hipoglucemia.',
    falsePositivesNegatives: {
      falsePositives: ['Estrés agudo (liberación de catecolaminas)', 'Uso de corticoides'],
      falseNegatives: ['Glucólisis in vitro por retardo en la separación del suero (sin tubo con fluoruro de sodio)']
    },
    discriminatoryContexts: [
      'Pivote en la detección de estados diabéticos, resistencia a la insulina e hipoglucemias.'
    ]
  },
  {
    id: 'bm_hba1c',
    name: 'Hemoglobina Glicada (HbA1c)',
    abbreviation: 'HbA1c',
    isoforms: 'Aducto glucosilado N-terminal de la cadena beta de hemoglobina',
    system: 'metabolic',
    referenceValues: {
      conventional: '< 5,7 %',
      si: '< 39 mmol/mol',
      genderAgeVariations: 'Normal: < 5.7%; Prediabetes: 5.7 - 6.4%; Diabetes: ≥ 6.5%'
    },
    temporalWindow: {
      elevationStart: 'Semanas de hiperglucemia sostenida',
      peakWindow: 'Promedio ponderado de los últimos 90 - 120 días',
      normalizationWindow: '2 - 3 meses (vida media del eritrocito)',
      halfLife: '120 días (vida media eritrocutaria)'
    },
    diagnosticParams: {
      sensitivity: '88% para control glucémico retrospectivo a largo plazo',
      specificity: '96% para diagnóstico formal de Diabetes Mellitus',
      optimalCutoff: '≥ 6.5 %'
    },
    clinicalRelevance: 'Resultado de la glicación no enzimática irreversible de la hemoglobina proporcional a los niveles de glucemia media durante los 2-3 meses previos.',
    diagnosticIndication: 'Diagnóstico de Diabetes Mellitus y evaluación del control glucémico crónico.',
    falsePositivesNegatives: {
      falsePositives: ['Anemia ferropénica (aumento compensador por vida media eritrocitaria mayor)', 'Esplenectomía'],
      falseNegatives: ['Anemias hemolíticas (vida media eritrocitaria reducida)', 'Hemoglobinopatías (HbS, HbC)']
    },
    discriminatoryContexts: [
      'Diferencia la hiperglucemia por estrés agudo transitorio del verdadero descontrol crónico de la Diabetes Mellitus.'
    ]
  },
  {
    id: 'bm_lactato',
    name: 'Lactato Plasmático',
    abbreviation: 'Lactato',
    isoforms: 'Anión L-Lactato de la glucólisis anaerobia',
    system: 'metabolic',
    referenceValues: {
      conventional: '0,5–2,0 mmol/L',
      si: '0.5–2.0 mmol/L',
      genderAgeVariations: 'Ligero aumento tras ejercicio.'
    },
    temporalWindow: {
      elevationStart: 'Minutos tras hipoxia tisular o glucólisis acelerada',
      peakWindow: 'Inmediata en shock/hipoperfusión',
      normalizationWindow: 'Horas tras restauración de la perfusión',
      halfLife: '20 minutos'
    },
    diagnosticParams: {
      sensitivity: '92% para hipoxia tisular e hipoperfusión celular',
      specificity: '85% para Acidosis Láctica / Sepsis grave',
      optimalCutoff: '> 2.0 mmol/L (> 4.0 mmol/L indica sepsis grave con shock)'
    },
    clinicalRelevance: 'Producto final de la glucólisis anaerobia cuando la fosforilación oxidativa mitocondrial se interrumpe por falta de oxígeno o fallo enzimático.',
    diagnosticIndication: 'Evaluación de hipoxia tisular en shock, sepsis, cetoacidosis e isquemia intestinal.',
    falsePositivesNegatives: {
      falsePositives: ['Torniquete venoso prolongado durante la extracción', 'Muestra no conservada en hielo'],
      falseNegatives: ['Depuración hepática acelerada compensadora']
    },
    discriminatoryContexts: [
      'Evalúa la gravedad del compromiso hemodinámico y metabolismo anaerobio en descompensaciones agudas.'
    ]
  },
  {
    id: 'bm_piruvato',
    name: 'Piruvato Plasmático',
    abbreviation: 'Piruvato',
    isoforms: 'Alfa-cetoácido intermediario de la glucólisis',
    system: 'metabolic',
    referenceValues: {
      conventional: '0,03–0,10 mmol/L',
      si: '0.03–0.10 mmol/L',
      genderAgeVariations: 'Sensible al estado metabólico.'
    },
    temporalWindow: {
      elevationStart: 'Inmediato tras alteración metabólica glucolítica o mitocondrial',
      peakWindow: 'Variable',
      normalizationWindow: 'Horas',
      halfLife: 'Minutos'
    },
    diagnosticParams: {
      sensitivity: '80% para citopatías mitocondriales',
      specificity: '88% cuando se analiza junto al cociente Lactato/Piruvato',
      optimalCutoff: 'Cociente Lactato/Piruvato > 20 indica defecto en la cadena respiratoria mitocondrial'
    },
    clinicalRelevance: 'Punto de encrucijada del metabolismo: puede convertirse en acetil-CoA (vía PDH mitocondrial), lactato (vía LDH) u oxaloacetato.',
    diagnosticIndication: 'Diagnóstico de deficiencias del complejo piruvato deshidrogenasa y citopatías mitocondriales.',
    falsePositivesNegatives: {
      falsePositives: ['Muestra inestable por retardo en la desproteinización inmediata'],
      falseNegatives: ['Consumo in vitro']
    },
    discriminatoryContexts: [
      'El cociente Lactato/Piruvato discrimina defectos del complejo piruvato deshidrogenasa de defectos de la cadena respiratoria.'
    ]
  },
  {
    id: 'bm_acidos_grasos_libres',
    name: 'Ácidos Grasos Libres Séricos (AGL)',
    abbreviation: 'AGL',
    isoforms: 'Ácidos grasos no esterificados unidos a albúmina',
    system: 'metabolic',
    referenceValues: {
      conventional: '0,2–0,8 mmol/L',
      si: '0.2–0.8 mmol/L',
      genderAgeVariations: 'Aumenta significativamente con el ayuno.'
    },
    temporalWindow: {
      elevationStart: 'Horas tras inicio de ayuno por lipólisis en tejido adiposo',
      peakWindow: '12 - 24 horas de ayuno',
      normalizationWindow: 'Rápida tras la ingesta de carbohidratos (supresión por insulina)',
      halfLife: '30 minutos'
    },
    diagnosticParams: {
      sensitivity: '92% para evaluación de lipólisis e hipoglucemias cetósicas vs hipocetósicas',
      specificity: '90% para defectos de la beta-oxidación de ácidos grasos',
      optimalCutoff: '> 0.8 mmol/L en ayuno prolongado (AGL muy elevados con β-hidroxibutirato bajo = defecto de beta-oxidación)'
    },
    clinicalRelevance: 'Liberados del tejido adiposo por la lipasa sensible a hormonas durante el ayuno para servir como sustrato a la beta-oxidación hepática y muscular.',
    diagnosticIndication: 'Diagnóstico de Defectos en la Beta-Oxidación de Ácidos Grasos y caracterización metabólica de hipoglucemias.',
    falsePositivesNegatives: {
      falsePositives: ['Estrés con descarga adrenérgica intensa (lipólisis estimulada)', 'Toma posprandial inmediata'],
      falseNegatives: ['Inhibición por hiperinsulinemia']
    },
    discriminatoryContexts: [
      'AGL elevados con β-hidroxibutirato anormalmente bajo (<0.5 mmol/L) confirman el diagnóstico de Defecto de la Beta-Oxidación de Ácidos Grasos (Hipoglucemia Hipocetósica).'
    ]
  },
  {
    id: 'bm_carnitina_libre',
    name: 'Carnitina Libre Plasmática (C0)',
    abbreviation: 'C0',
    isoforms: 'L-Carnitina no acilada libre',
    system: 'metabolic',
    referenceValues: {
      conventional: '20–50 µmol/L',
      si: '20–50 µmol/L',
      genderAgeVariations: 'Ligeramente menor en mujeres y niños.'
    },
    temporalWindow: {
      elevationStart: 'Refleja las reservas corporales y el flujo de la lanzadera de carnitina',
      peakWindow: 'No aplica',
      normalizationWindow: 'Semanas tras suplementación',
      halfLife: 'Días'
    },
    diagnosticParams: {
      sensitivity: '95% para deficiencias primarias y secundarias de carnitina',
      specificity: '94% en el perfil metabólico de beta-oxidación',
      optimalCutoff: '< 20 µmol/L (Deficiencia de carnitina)'
    },
    clinicalRelevance: 'Cofactor indispensable para el transporte de ácidos grasos de cadena larga a través de la membrana mitocondrial interna mediante la lanzadera de carnitina (CPT-1, CACT, CPT-2).',
    diagnosticIndication: 'Diagnóstico de deficiencia primaria de carnitina y defectos secundarios de la beta-oxidación.',
    falsePositivesNegatives: {
      falsePositives: ['Tratamiento con ácido valproico o antibióticos pivalados'],
      falseNegatives: ['Suplementación dietética reciente']
    },
    discriminatoryContexts: [
      'Discriminatorio en errores congénitos de la beta-oxidación e hipoglucemia hipocetósica.'
    ]
  },
  {
    id: 'bm_carnitina_total',
    name: 'Carnitina Total Plasmática',
    abbreviation: 'Carnitina Total',
    isoforms: 'Suma de Carnitina Libre (C0) y Acilcarnitinas',
    system: 'metabolic',
    referenceValues: {
      conventional: '25–60 µmol/L',
      si: '25–60 µmol/L',
      genderAgeVariations: 'Estable en adultos en ayunas.'
    },
    temporalWindow: {
      elevationStart: 'Refleja el reservorio tisular y vascular',
      peakWindow: 'No aplica',
      normalizationWindow: 'Semanas',
      halfLife: 'Días'
    },
    diagnosticParams: {
      sensitivity: '90%',
      specificity: '90%',
      optimalCutoff: '< 25 µmol/L'
    },
    clinicalRelevance: 'Representa el pool total de carnitina utilizable para la esterificación y transporte mitocondrial de acilos.',
    diagnosticIndication: 'Cribado de trastornos del transporte y almacenamiento de ácidos grasos.',
    falsePositivesNegatives: {
      falsePositives: ['Consumo de dietas vegetarianas estrictas (baja ingesta)'],
      falseNegatives: ['Muestra no conservada']
    },
    discriminatoryContexts: [
      'Permite calcular la relación acilcarnitina/carnitina libre.'
    ]
  },
  {
    id: 'bm_relacion_acilcarnitina_carnitina',
    name: 'Relación Acilcarnitina / Carnitina Libre',
    abbreviation: 'Relación Acil/C0',
    isoforms: 'Índice calculado: (Carnitina Total - Carnitina Libre) / Carnitina Libre',
    system: 'metabolic',
    referenceValues: {
      conventional: '< 0,4',
      si: '< 0,4',
      genderAgeVariations: 'Independiente del sexo.'
    },
    temporalWindow: {
      elevationStart: 'Aguda durante descompensación metabólica o ayuno',
      peakWindow: 'En crisis metabólica',
      normalizationWindow: 'Tras recuperación metabólica',
      halfLife: 'No aplica (índice funcional)'
    },
    diagnosticParams: {
      sensitivity: '96% para detectar bloqueos de la beta-oxidación de ácidos grasos',
      specificity: '95% para acidemias orgánicas y defectos de beta-oxidación',
      optimalCutoff: '≥ 0,4 (Sugerente de defecto de beta-oxidación o acumulo de acil-CoA)'
    },
    clinicalRelevance: 'Cuando existe un bloqueo en la beta-oxidación mitocondrial (ej. MCADD, VLCADD), los acil-CoA acumulados se esterifican con carnitina para su excreción, elevando las acilcarnitinas y agotando la carnitina libre.',
    diagnosticIndication: 'Estándar de oro en cribado e identificación de Defectos en la Beta-Oxidación de Ácidos Grasos y Acidemias Orgánicas.',
    falsePositivesNegatives: {
      falsePositives: ['Nutrición parenteral total', 'Deficiencia secundaria de carnitina'],
      falseNegatives: ['Muestra tomada en estado posprandial bien alimentado']
    },
    discriminatoryContexts: [
      'Marcador patognomónico de alteración en la beta-oxidación mitocondrial en pacientes con hipoglucemia hipocetósica.'
    ]
  },
  {
    id: 'bm_perfil_acilcarnitinas',
    name: 'Perfil de Acilcarnitinas Plasmáticas',
    abbreviation: 'Perfil Acilcarnitinas',
    isoforms: 'Especies C2 a C18 por espectrometría de masas en tándem (MS/MS)',
    system: 'metabolic',
    referenceValues: {
      conventional: 'Dependiente de especie (Específico por longitud de cadena)',
      si: 'Específico por especie',
      genderAgeVariations: 'Valores de corte por grupos de edad pediátrica.'
    },
    temporalWindow: {
      elevationStart: 'Sostenida en descompensación',
      peakWindow: 'Durante ayuno o estrés metabólico',
      normalizationWindow: 'Tras estabilización',
      halfLife: 'Horas'
    },
    diagnosticParams: {
      sensitivity: '98% para tipificación específica del enzima defectuoso en beta-oxidación',
      specificity: '99% por MS/MS',
      optimalCutoff: 'Elevación selectiva de C8 (Octanoilcarnitina) en MCADD'
    },
    clinicalRelevance: 'Identifica exactamente qué longitud de cadena de ácido graso no puede metabolizarse (cadena corta, media MCADD, larga VLCADD o muy larga), permitiendo el diagnóstico enzimático preciso.',
    diagnosticIndication: 'Diagnóstico definitivo de Defectos en la Beta-Oxidación de Ácidos Grasos (p. ej., C8 elevado en MCADD).',
    falsePositivesNegatives: {
      falsePositives: ['Uso de fórmulas infantiles enriquecidas con MCT'],
      falseNegatives: ['Estado normoglucémico posprandial con supresión de la lipólisis']
    },
    discriminatoryContexts: [
      'Define con precisión la enzima mutada en el defecto de la beta-oxidación.'
    ]
  },
  {
    id: 'bm_beta_hidroxibutirato',
    name: 'β-Hidroxibutirato Sérico',
    abbreviation: 'β-OHB',
    isoforms: 'Cuerpo cetónico cuantitativo predominante',
    system: 'metabolic',
    referenceValues: {
      conventional: '< 0,5 mmol/L',
      si: '< 0.5 mmol/L',
      genderAgeVariations: 'Aumenta fisiológicamente a 1.0 - 3.0 mmol/L tras ayuno de 24 horas.'
    },
    temporalWindow: {
      elevationStart: '4 - 8 horas de ayuno o deficiencia insulinica',
      peakWindow: 'En Cetoacidosis Diabética (> 3.0 mmol/L)',
      normalizationWindow: 'Horas tras infusión de insulina o carbohidratos',
      halfLife: '1 - 2 horas'
    },
    diagnosticParams: {
      sensitivity: '98% para Cetoacidosis Diabética e Hipoglucemia Cetósica',
      specificity: '96% para cetogénesis activa',
      optimalCutoff: '> 3.0 mmol/L (Cetoacidosis Diabética) / < 0.5 mmol/L en hipoglucemia (Defecto de Beta-Oxidación)'
    },
    clinicalRelevance: 'Sintetizado en el hígado a partir de acetil-CoA proveniente de la beta-oxidación. Su presencia confirma cetogénesis activa. Su ausencia en hipoglucemia del ayuno indica fallo de la beta-oxidación o hiperinsulinismo.',
    diagnosticIndication: 'Diagnóstico de Cetoacidosis Diabética y clasificación de Hipoglucemias (Cetósica vs Hipocetósica).',
    falsePositivesNegatives: {
      falsePositives: ['Dieta cetogénica estricta', 'Consumo excesivo de alcohol'],
      falseNegatives: ['Cetoacidosis por acetoacetato con relación de óxido-reducción alterada']
    },
    discriminatoryContexts: [
      'Su ausencia (<0.5 mmol/L) durante una hipoglucemia por ayuno confirma un Defecto en la Beta-Oxidación de Ácidos Grasos o Hiperinsulinismo.'
    ]
  },
  {
    id: 'bm_acetoacetato',
    name: 'Acetoacetato Plasmático',
    abbreviation: 'AcAc',
    isoforms: 'Cuerpo cetónico cetoácido',
    system: 'metabolic',
    referenceValues: {
      conventional: 'Trazas',
      si: 'Trazas',
      genderAgeVariations: 'Proporcional al β-OHB.'
    },
    temporalWindow: {
      elevationStart: 'Horas',
      peakWindow: 'En cetoacidosis',
      normalizationWindow: 'Horas',
      halfLife: '1 hora'
    },
    diagnosticParams: {
      sensitivity: '80% en tira reactiva de orina',
      specificity: '85%',
      optimalCutoff: '> 0.5 mmol/L'
    },
    clinicalRelevance: 'Cuerpo cetónico intermediario interconvertible con el β-hidroxibutirato por la β-hidroxibutirato deshidrogenasa.',
    diagnosticIndication: 'Evaluación cualitativa/semicuantitativa de cetosis.',
    falsePositivesNegatives: {
      falsePositives: ['Fármacos con grupos sulfhidrilo (captopril) en tiras reactivas'],
      falseNegatives: ['Muestras antiguas por descarboxilación espontánea a acetona']
    },
    discriminatoryContexts: [
      'Componente del perfil cetónico global.'
    ]
  },
  {
    id: 'bm_trigliceridos',
    name: 'Triglicéridos Séricos en Ayunas (y Aspecto del Suero)',
    abbreviation: 'TG',
    isoforms: 'Triacilgliceroles en VLDL y Quilomicrones (exógenos)',
    system: 'metabolic',
    referenceValues: {
      conventional: '< 150 mg/dL (Deseable); > 500 mg/dL (Riesgo alto); > 1000 mg/dL (Riesgo crítico de Pancreatitis)',
      si: '< 1.70 mmol/L',
      genderAgeVariations: 'Aumenta en Síndrome Metabólico, Resistencia a la Insulina, consumo de alcohol y diabetes descompensada.'
    },
    temporalWindow: {
      elevationStart: 'Posprandial o mantenida en hiperlipidemias primarias y crisis metabólicas',
      peakWindow: '4 - 6 horas posprandial o permanente en descompensación',
      normalizationWindow: '12 horas de ayuno estricto (días tras infusión de insulina/heparina o plasmaféresis)',
      halfLife: 'Horas (quilomicrones) a días'
    },
    diagnosticParams: {
      sensitivity: '95% para etiología hipertrigliceridémica de pancreatitis (>1000 mg/dL) y 90% para dislipidemia metabólica',
      specificity: '98% cuando los triglicéridos superan los 1000 mg/dL en ayunas',
      optimalCutoff: '> 150 mg/dL (Hipertrigliceridemia/Síndrome Metabólico); > 1000 mg/dL (Umbral crítico de autodigestión pancreática)'
    },
    clinicalRelevance: 'Forma primaria de almacenamiento de lípidos. La hiperinsulinemia en la Resistencia a la Insulina estimula la síntesis hepática de VLDL rica en triglicéridos. A concentraciones masivas (>1000 mg/dL), saturan la lipoproteinlipasa (LPL), acumulando quilomicrones en la microcirculación pancreática. La lipasa acinar hidroliza estos triglicéridos liberando altas concentraciones de Ácidos Grasos Libres (AGL) citotóxicos que causan daño capilar, acidosis, agregación plaquetaria e isquemia, desencadenando pancreatitis necrotizante. Además, la lipemia extrema (suero lechoso) interfiere espectrofotométricamente dando falsos negativos en la amilasa sérica.',
    diagnosticIndication: 'Diagnóstico de Resistencia a la Insulina, Síndrome Metabólico, evaluación de suero lactescente y diagnóstico etiológico de Pancreatitis Aguda hipertrigliceridémica.',
    falsePositivesNegatives: {
      falsePositives: ['Toma de muestra postprandial rica en grasas (< 12 h de ayuno)', 'Consumo reciente de alcohol'],
      falseNegatives: ['Descenso rápido tras 24-48 horas de ayuno estricto o infusión venosa']
    },
    discriminatoryContexts: [
      'Elevados (>150 mg/dL) junto a HDL bajo e hiperglucemia definen el perfil lipídico de la Resistencia a la Insulina y Síndrome Metabólico.',
      'Valores masivos (>1000 mg/dL) en presencia de dolor epigástrico irradiado en cinturón y suero lechoso identifican la pancreatitis aguda hipertrigliceridémica.'
    ]
  },

  // ==========================================
  // RENAL, CICLO DE LA UREA E HIPERURICEMIAS
  // ==========================================
  {
    id: 'bm_amonio_plasmatico',
    name: 'Amonio Plasmático',
    abbreviation: 'NH4+',
    isoforms: 'Gas amoníaco (NH3) / Ion amonio (NH4+)',
    system: 'renal',
    referenceValues: {
      conventional: '< 50 µmol/L',
      si: '< 50 µmol/L',
      genderAgeVariations: 'Mayor en neonatos (< 80 µmol/L).'
    },
    temporalWindow: {
      elevationStart: 'Inmediata tras bloqueo del ciclo de la urea o ingesta proteica',
      peakWindow: 'En crisis de hiperamonemia',
      normalizationWindow: 'Horas tras hemodiálisis o quelantes de nitrógeno',
      halfLife: 'Minutos'
    },
    diagnosticParams: {
      sensitivity: '98% para Defectos del Ciclo de la Urea y encefalopatía hiperamonémica',
      specificity: '95% con procesamiento inmediato en frío',
      optimalCutoff: '> 50 µmol/L (> 150 µmol/L indica emergencia neurotóxica grave)'
    },
    clinicalRelevance: 'Producto neurotóxico del catabolismo de aminoácidos. Debe convertirse en urea en el hígado mediante el Ciclo de la Urea (CPS1, OTC, ASS, ASL, ARG1). Un bloqueo enzimático causa acumulo masivo de amonio con encefalopatía y edema cerebral.',
    diagnosticIndication: 'Diagnóstico urgente de Defectos del Ciclo de la Urea (p. ej., Deficiencia de OTC) y encefalopatía hepática.',
    falsePositivesNegatives: {
      falsePositives: ['Torniquete apretado durante la venopunción', 'Retardo en la centrifugación/enfriamiento de la muestra (desaminación in vitro)'],
      falseNegatives: ['Muestra congelada incorrectamente']
    },
    discriminatoryContexts: [
      'Amonio plasmático severamente elevado (>150 µmol/L) con Urea anormalmente baja o normal confirma Defecto del Ciclo de la Urea.'
    ]
  },
  {
    id: 'bm_acido_urico',
    name: 'Ácido Úrico Sérico',
    abbreviation: 'Ácido Úrico',
    isoforms: 'Urato monosódico en solución',
    system: 'renal',
    referenceValues: {
      conventional: 'H: 3,5–7,0 mg/dL; M: 2,5–6,0 mg/dL',
      si: 'H: 208–416 µmol/L; M: 148–357 µmol/L',
      genderAgeVariations: 'Aumenta en mujeres tras la menopausia por pérdida del efecto uricosúrico de los estrógenos.'
    },
    temporalWindow: {
      elevationStart: 'Horas a días tras sobrecarga de purinas o lisis celular',
      peakWindow: 'En crisis de lisis tumoral o precipitación gotosa',
      normalizationWindow: 'Días con alopurinol / rasburicasa',
      halfLife: '24 horas (excreción renal 70% e intestinal 30%)'
    },
    diagnosticParams: {
      sensitivity: '88% para hiperuricemia primaria/secundaria y gota',
      specificity: '82% para artropatía por cristales de urato',
      optimalCutoff: '> 7.0 mg/dL (Hombres) / > 6.0 mg/dL (Mujeres)'
    },
    clinicalRelevance: 'Producto final de la degradación de las bases púrinicas (adenina y guanina) catalizado por la xantina oxidasa. La hiperuricemia primaria se debe a hiperproducción o hipoexcreción renal. La secundaria responde a lisis tumoral, fármacos (diuréticos) o insuficiencia renal.',
    diagnosticIndication: 'Diagnóstico de Hiperuricemia Primaria (Gota) y Secundaria (Síndrome de Lisis Tumoral, uso de diuréticos, nefropatía por uratos).',
    falsePositivesNegatives: {
      falsePositives: ['Consumo de alcohol (lactato inhibe la secreción tubular de urato)', 'Uso de tiazidas/furosemida'],
      falseNegatives: ['Ataque agudo de gota (el urato puede descender transitoriamente al precipitar en la articulación)']
    },
    discriminatoryContexts: [
      'Discrimina la Hiperuricemia Primaria (gota articular) de la Secundaria a Síndrome de Lisis Tumoral (acompañada de LDH, Fósforo y Potasio muy altos con LRA).'
    ]
  },
  {
    id: 'bm_urea',
    name: 'Urea Sérica',
    abbreviation: 'Urea',
    isoforms: 'Diamida del ácido carbónico (producto final del ciclo de la urea)',
    system: 'renal',
    referenceValues: {
      conventional: '20–50 mg/dL',
      si: '3.3–8.3 mmol/L (BUN = Urea / 2.14)',
      genderAgeVariations: 'Aumenta con dietas hiperproteicas y en ancianos.'
    },
    temporalWindow: {
      elevationStart: '12 - 24 horas tras disminución del filtrado o catabolismo proteico',
      peakWindow: 'Dependiente de la función renal',
      normalizationWindow: '1 - 3 días',
      halfLife: '8 - 12 horas'
    },
    diagnosticParams: {
      sensitivity: '80% para evaluación de función renal y balance nitrogenado',
      specificity: '70% (afectada por ingesta proteica y catabolismo)',
      optimalCutoff: '> 50 mg/dL (Uremia)'
    },
    clinicalRelevance: 'Sintetizada en el hígado a partir del amonio en el ciclo de la urea. Se filtra libremente en el glomérulo y se reabsorbe parcialmente en los tubulos. En defectos del ciclo de la urea se encuentra reducida o en el límite inferior.',
    diagnosticIndication: 'Evaluación del estado de función renal, deshidratación prerrenal y filtrado proteico.',
    falsePositivesNegatives: {
      falsePositives: ['Hemorragia digestiva alta (digestión de hemoglobina)', 'Tratamiento con corticoides', 'Dieta hiperproteica'],
      falseNegatives: ['Insuficiencia hepática grave', 'Defecto del ciclo de la urea (fallo en la síntesis)']
    },
    discriminatoryContexts: [
      'Elevada en falla renal o hipovolemia prerrenal; reducida (<20 mg/dL) en Defectos del Ciclo de la Urea.'
    ]
  },
  {
    id: 'bm_creatinina',
    name: 'Creatinina Sérica',
    abbreviation: 'Creatinina',
    isoforms: 'Producto de degradación no enzimática de la fosfocreatina muscular',
    system: 'renal',
    referenceValues: {
      conventional: 'H: 0,7–1,3 mg/dL; M: 0,5–1,1 mg/dL',
      si: 'H: 62–115 µmol/L; M: 44–97 µmol/L',
      genderAgeVariations: 'Directamente proporcional a la masa muscular esquelética.'
    },
    temporalWindow: {
      elevationStart: '24 - 48 horas tras pérdida del 50% de la función glomerular',
      peakWindow: '48 - 72 horas tras lesión renal aguda',
      normalizationWindow: 'Días tras recuperación de la TFG',
      halfLife: '4 horas'
    },
    diagnosticParams: {
      sensitivity: '75% para disfunción renal aguda (ciega a pérdidas <50% de TFG)',
      specificity: '92% para fallo de filtración glomerular',
      optimalCutoff: '> 1.3 mg/dL (H) / > 1.1 mg/dL (M)'
    },
    clinicalRelevance: 'Metabolito muscular producido a tasa constante. Se filtra libremente por el glomérulo con mínima secreción tubular. Es el indicador estándar para calcular la TFG (eGFR).',
    diagnosticIndication: 'Evaluación y clasificación de Lesión Renal Aguda y Enfermedad Renal Crónica.',
    falsePositivesNegatives: {
      falsePositives: ['Ingesta de carne cocida abundante', 'Suplementación con creatina', 'Atletas de masa muscular extrema'],
      falseNegatives: ['Amputaciones', 'Atrofia muscular severa / Cirrosis (falsa TFG normal)']
    },
    discriminatoryContexts: [
      'Permite estimar la TFG e identificar falla renal aguda o crónica.'
    ]
  },
  {
    id: 'bm_egfr',
    name: 'Tasa de Filtrado Glomerular Estimada (eGFR)',
    abbreviation: 'eGFR',
    isoforms: 'Ecuación CKD-EPI / MDRD',
    system: 'renal',
    referenceValues: {
      conventional: '> 90 mL/min/1,73m²',
      si: '> 90 mL/min/1,73m²',
      genderAgeVariations: 'Fisiológicamente desciende ~1 mL/min/año a partir de los 40 años.'
    },
    temporalWindow: {
      elevationStart: 'Inmediato cálculo matematico',
      peakWindow: 'No aplica',
      normalizationWindow: 'Según función renal',
      halfLife: 'No aplica'
    },
    diagnosticParams: {
      sensitivity: '95% para estadificación de enfermedad renal crónica',
      specificity: '90%',
      optimalCutoff: '< 60 mL/min/1.73m² durante > 3 meses indica Enfermedad Renal Crónica'
    },
    clinicalRelevance: 'Mejor índice global del número de nefronas funcionales y de la capacidad de filtrado renal.',
    diagnosticIndication: 'Estadificación de Enfermedad Renal Crónica y dosificación de fármacos.',
    falsePositivesNegatives: {
      falsePositives: ['Extremos de masa muscular desajustados en la fórmula'],
      falseNegatives: ['Estado hiperfiltrante en fases tempranas de la Diabetes']
    },
    discriminatoryContexts: [
      'Estándar para graduar la severidad del compromiso renal.'
    ]
  },

  // ==========================================
  // MARCADORES PANCREÁTICOS
  // ==========================================
  {
    id: 'bm_lipasa',
    name: 'Lipasa Sérica',
    abbreviation: 'Lipasa',
    isoforms: 'Triacilglicerol acilhidrolasa acinar pancreática',
    system: 'pancreatic',
    referenceValues: {
      conventional: '10–140 U/L',
      si: '0.17–2.33 μkat/L',
      genderAgeVariations: 'Estable en adultos.'
    },
    temporalWindow: {
      elevationStart: '4 - 8 horas post-inicio de autodigestión pancreática',
      peakWindow: '24 - 48 horas',
      normalizationWindow: '8 - 14 días (permanece elevada más tiempo que la amilasa)',
      halfLife: '7 - 14 horas'
    },
    diagnosticParams: {
      sensitivity: '96% para Pancreatitis Aguda',
      specificity: '97% para origen pancreático específico',
      optimalCutoff: '> 3 veces el Límite Superior Normal (> 420 U/L)'
    },
    clinicalRelevance: 'Enzima exocrina secretada por los acinos pancreáticos para la digestión de grasas en el duodeno. En la Pancreatitis Aguda, el bloqueo de la secreción y autodigestión acinar la libera masivamente al torrente circulatorio.',
    diagnosticIndication: 'Marcador de elecciónEstándar de Oro para el diagnóstico de Pancreatitis Aguda.',
    falsePositivesNegatives: {
      falsePositives: ['Insuficiencia renal (aclaramiento reducido)', 'Isquemia intestinal / Obstrucción en asa cerrada'],
      falseNegatives: ['Pancreatitis crónica terminal con destrucción acinar masiva']
    },
    discriminatoryContexts: [
      'Lipasa > 3 veces LSN (junto a dolor en cinturón) confirma Pancreatitis Aguda frente a colecistitis u úlcera péptica perforada.'
    ]
  },
  {
    id: 'bm_amilasa',
    name: 'Amilasa Sérica Total',
    abbreviation: 'Amilasa',
    isoforms: 'Isoenzima P (Pancreática) y S (Salival)',
    system: 'pancreatic',
    referenceValues: {
      conventional: '13–53 U/L',
      si: '0.22–0.88 μkat/L',
      genderAgeVariations: 'Sin diferencias por sexo.'
    },
    temporalWindow: {
      elevationStart: '2 - 12 horas',
      peakWindow: '12 - 24 horas',
      normalizationWindow: '3 - 5 días (depuración renal rápida)',
      halfLife: '10 horas'
    },
    diagnosticParams: {
      sensitivity: '85% para Pancreatitis Aguda en las primeras 24h',
      specificity: '82% (menor que la lipasa por fuentes parotídeas y tubáricas)',
      optimalCutoff: '> 3 veces el LSN (> 160 U/L)'
    },
    clinicalRelevance: 'Enzima que hidroliza enlaces glucosídicos alfa-1,4 del almidón. Su rápida excreción renal provoca que sus niveles se normalicen precozmente a los 3-5 días.',
    diagnosticIndication: 'Diagnóstico precoz de Pancreatitis Aguda.',
    falsePositivesNegatives: {
      falsePositives: ['Parotiditis', 'Embarazo ectópico roto', 'Cetoacidosis diabética', 'Macroamilasemia'],
      falseNegatives: ['Toma tardía (> 4 días del dolor)', 'Pancreatitis aguda hipertrigliceridémica (interferencia analítica)']
    },
    discriminatoryContexts: [
      'Utilizada en la fase precoz de la Pancreatitis Aguda.'
    ]
  },
  {
    id: 'bm_elastasa_fecal',
    name: 'Elastasa-1 Fecal',
    abbreviation: 'Elastasa Fecal',
    isoforms: 'Endopeptidasa pancreática estable al tránsito intestinal',
    system: 'pancreatic',
    referenceValues: {
      conventional: '> 200 µg/g de heces',
      si: '> 200 µg/g',
      genderAgeVariations: 'Estable independientemente de la edad en adultos.'
    },
    temporalWindow: {
      elevationStart: 'Refleja la capacidad secretora exocrina de reserva permanente',
      peakWindow: 'No aplica',
      normalizationWindow: 'No aplica',
      halfLife: 'Inalterada en tránsito intestinal'
    },
    diagnosticParams: {
      sensitivity: '95% para Insuficiencia Pancreática Exocrina moderada-severa',
      specificity: '93% para patología pancreática exocrina estracutural',
      optimalCutoff: '< 200 µg/g (Insuficiencia Pancreática Exocrina); < 100 µg/g (Insuficiencia Severa)'
    },
    clinicalRelevance: 'Sintetizada por los acinos pancreáticos y no degradada durante el tránsito por el tubo digestivo. Su concentración en heces refleja directamente la capacidad de síntesis y secreción exocrina del páncreas.',
    diagnosticIndication: 'Diagnóstico de Insuficiencia Pancreática Exocrina en Pancreatitis Crónica, Fibrosis Quística y síndrome de malabsorción.',
    falsePositivesNegatives: {
      falsePositives: ['Diarrea acuosa profusa (dilución fecal, causa falso bajo)'],
      falseNegatives: ['Fases muy tempranas de afectación exocrina leve']
    },
    discriminatoryContexts: [
      'Discrimina la esteatorrea por Insuficiencia Pancreática Exocrina (Pancreatitis Crónica) de causas mucosas de malabsorción como la Enfermedad Celíaca.'
    ]
  },
  {
    id: 'bm_ttg_iga',
    name: 'Anticuerpos Anti-Transglutaminasa Tisular IgA (tTG-IgA)',
    abbreviation: 'tTG-IgA',
    isoforms: 'Autoanticuerpos IgA dirigidos contra transglutaminasa 2 (tTG2)',
    system: 'pancreatic',
    referenceValues: {
      conventional: '< 10 U/mL (Negativo); > 15 U/mL (Positivo)',
      si: '< 10 U/mL',
      genderAgeVariations: 'Requiere verificar niveles de IgA total para descartar déficit selectivo de IgA.'
    },
    temporalWindow: {
      elevationStart: 'Persistente mientras exista ingesta de gluten',
      peakWindow: 'Sostenido en exposición activa al gluten',
      normalizationWindow: '6 - 12 meses tras Dieta Sin Gluten (DSG)',
      halfLife: 'Semanas a meses'
    },
    diagnosticParams: {
      sensitivity: '98% para Enfermedad Celíaca activa',
      specificity: '98% para enteropatía por gluten',
      optimalCutoff: '> 10 veces el Límite Superior Normal (> 100 U/mL) tiene valor predictivo positivo >99%'
    },
    clinicalRelevance: 'Marcador serológico de primera elección para el diagnóstico de Enfermedad Celíaca. La interacción de los péptidos de gliadina con la transglutaminasa tisular genera autoanticuerpos que desencadenan inflamación y atrofia de las vellosidades duodeno-yeyunales, impidiendo la absorción de hierro, calcio y vitaminas.',
    diagnosticIndication: 'Sospecha de Enfermedad Celíaca, anemia ferropénica refractaria, diarrea crónica, distensión abdominal postprandial y osteopenia precoz.',
    falsePositivesNegatives: {
      falsePositives: ['Otras patologías autoinmunes (Diabetes Tipo 1, Tiroiditis de Hashimoto)'],
      falseNegatives: ['Déficit selectivo de IgA (falso negativo por ausencia de IgA total)', 'Dieta estricta sin gluten previa a la prueba']
    },
    discriminatoryContexts: [
      'Confirma compromiso mucoso duodenal celíaco frente a insuficiencia pancreática exocrina (Elastasa-1 fecal baja con tTG-IgA normal).'
    ]
  },
  {
    id: 'bm_gastrina',
    name: 'Gastrina Sérica Basal',
    abbreviation: 'Gastrina',
    isoforms: 'G-34 (forma mayoritaria circulante) y G-17 (forma antral)',
    system: 'pancreatic',
    referenceValues: {
      conventional: '0–100 pg/mL',
      si: '0–48 pmol/L',
      genderAgeVariations: 'Aumenta fisiológicamente con la edad por disminución de la masa parietal.'
    },
    temporalWindow: {
      elevationStart: 'Días tras inicio de supresión ácida o aclorhidria gástrica',
      peakWindow: 'Sostenido durante la terapia continua con IBP',
      normalizationWindow: '1 - 2 semanas tras suspensión de IBP',
      halfLife: '5 - 10 minutos'
    },
    diagnosticParams: {
      sensitivity: '95% para hipergastrinemia reactiva / gastrinoma',
      specificity: '90%',
      optimalCutoff: '> 1000 pg/mL (patognomónico de Gastrinoma / Síndrome de Zollinger-Ellison)'
    },
    clinicalRelevance: 'Hormona peptídica antral responsable de estimular la secreción ácida por las células parietales. La aclorhidria secundaria al uso crónico de Inhibidores de la Bomba de Protones (Omeprazol) desinhibe la retroalimentación gástrica, generando hipergastrinemia secundaria. Esta falta de acidez dificulta la solubilización del hierro no hemo y la disociación de la vitamina B12.',
    diagnosticIndication: 'Evaluación de aclorhidria/hipoclorhidria iatrogénica por IBP, gastritis atrófica y diagnóstico de Gastrinoma.',
    falsePositivesNegatives: {
      falsePositives: ['Tratamiento continuado con IBP / anti-H2', 'Gastritis atrófica autoinmune (Anemia Perniciosa)', 'Insuficiencia renal'],
      falseNegatives: ['Toma de muestra no realizada en ayunas o bajo carga de supresión incompleta']
    },
    discriminatoryContexts: [
      'Valora el impacto de la aclorhidria gástrica sobre la malabsorción de B12, hierro y calcio.'
    ]
  },
  {
    id: 'bm_vitamina_b12',
    name: 'Vitamina B12 (Cobalamina) y Folato',
    abbreviation: 'Vitamina B12',
    isoforms: 'Holo-transcobalamina (forma activa) y Cobalamina total',
    system: 'pancreatic',
    referenceValues: {
      conventional: '200–900 pg/mL',
      si: '148–664 pmol/L',
      genderAgeVariations: 'Disminuye en ancianos por atrofia gástrica.'
    },
    temporalWindow: {
      elevationStart: 'Deficiencia clínica progresiva tras 2-5 años de depleción',
      peakWindow: 'Mantenido bajo sin suplementación',
      normalizationWindow: 'Días tras administración parenteral/alta dosis oral',
      halfLife: 'Depósitos hepáticos de 3 a 5 años'
    },
    diagnosticParams: {
      sensitivity: '90% para deficiencia de cobalamina',
      specificity: '92% (asociado a Ácido Metilmalónico elevado)',
      optimalCutoff: '< 200 pg/mL (Deficiencia Severa)'
    },
    clinicalRelevance: 'Cofactor fundamental en la síntesis de ADN y mielinización. La aclorhidria por uso crónico de Omeprazol o la atrofia mucosal impiden la escisión proteica gástrica necesaria para unir la B12 al Factor Intrínseco, desencadenando anemia megaloblástica macrocítica y neuropatía sensitiva.',
    diagnosticIndication: 'Estudio de anemia macrocítica, parestesias, neuropatía periférica y uso prolongado de IBP o cirugía gástrica/ileal.',
    falsePositivesNegatives: {
      falsePositives: ['SDR / Síndromes Mieloproliferativos (falsa B12 normal por transcobalamina I alta)'],
      falseNegatives: ['Embarazo', 'Déficit de Folato grave concomitante']
    },
    discriminatoryContexts: [
      'Identifica la causa de la anemia macrocítica en pacientes polimedicados con IBP o enfermedad celíaca.'
    ]
  },
  {
    id: 'bm_magnesio',
    name: 'Magnesio Sérico y Calcio Sérico',
    abbreviation: 'Magnesio',
    isoforms: 'Magnesio iónico libre y magnesio unido a albúmina',
    system: 'pancreatic',
    referenceValues: {
      conventional: '1,7–2,2 mg/dL (Magnesio); 8,5–10,5 mg/dL (Calcio)',
      si: '0,70–1,10 mmol/L',
      genderAgeVariations: 'Estable en adultos.'
    },
    temporalWindow: {
      elevationStart: 'Hipomagnesemia tras >1 año de terapia continua con IBP',
      peakWindow: 'Crónica mientras continúe la exposición al IBP',
      normalizationWindow: '4 - 7 días tras suspender IBP y reponer Mg',
      halfLife: 'Depósitos óseos lentos'
    },
    diagnosticParams: {
      sensitivity: '92% para hipomagnesemia secundaria a IBP',
      specificity: '95%',
      optimalCutoff: '< 1.4 mg/dL (Hipomagnesemia sintomática)'
    },
    clinicalRelevance: 'Catión regulador clave de canales iónicos. Los IBP inhiben el transporte activo intestinal de magnesio mediado por los canales TRPM6/TRPM7. La hipomagnesemia severa resultante bloquea la secreción de Paratohormona (PTH) y produce resistencia ósea a la PTH, induciendo hipocalcemia secundaria sintomática con tetania y parestesias.',
    diagnosticIndication: 'Sospecha de hipocalcemia refractaria, espasmos musculares, parestesias o uso a largo plazo de Omeprazol.',
    falsePositivesNegatives: {
      falsePositives: ['Hipoalbuminemia (falso magnesio/calcio total bajo con fracción iónica normal)'],
      falseNegatives: ['Magnesio celular bajo con concentración plasmática transitoriamente preservada']
    },
    discriminatoryContexts: [
      'Explica la hipocalcemia e hipoexcitabilidad neuromuscular refractarias en consumidores crónicos de IBP.'
    ]
  }
];

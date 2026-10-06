import { ClinicalCase } from '../types';

export const CLINICAL_CASES_DATABASE: ClinicalCase[] = [
  // ==========================================
  // CASOS CARDÍACOS
  // ==========================================
  {
    id: 'case_cardiac_01',
    title: 'Tomás B.: Dolor opresivo en el pecho y sudor frío',
    system: 'cardiac',
    difficulty: 'intermedio',
    studentSummary: 'Varón de 58 años que acude a urgencias por un dolor opresivo muy fuerte en el centro del pecho que se extiende al brazo izquierdo desde hace 3 horas. El objetivo es identificar qué proteína del músculo cardíaco se libera a la sangre con la suficiente rapidez y especificidad para confirmar si las células del corazón están muriendo (infarto) o si es solo una falta transitoria de oxígeno (angina).',
    clinicalGlossary: [
      { term: 'Dolor precordial / retroesternal', simpleDefinition: 'Dolor o sensación de peso u opresión en la zona del pecho, justo detrás del hueso esternón, típico del sufrimiento cardíaco.' },
      { term: 'Diaforesis', simpleDefinition: 'Sudoración fría, pegajosa y abundante desencadenada por la respuesta de alarma del sistema nervioso simpático ante el dolor o estrés grave.' },
      { term: 'Isquemia frente a Necrosis', simpleDefinition: 'La isquemia es la falta transitoria de riego sanguíneo y oxígeno (como en la angina). Si la arteria sigue bloqueada, las células mueren, lo que se denomina necrosis celular (infarto).' },
      { term: 'Troponina cardíaca ultrasensible', simpleDefinition: 'Proteína estructural propia del músculo cardíaco. Solo se escapa al torrente sanguíneo cuando los miocitos sufren daño irreversible en su membrana.' }
    ],
    biochemicalConceptSimple: '1. Un coágulo en una arteria coronaria corta el flujo de sangre -> 2. Los miocitos se quedan sin oxígeno y se detiene la producción de ATP mitocondrial -> 3. Fallan las bombas iónicas, la célula se hincha de agua y su membrana se rompe -> 4. Se liberan al torrente sanguíneo las proteínas del sarcómero miocárdico (Troponina I y T).',
    clinicalHistory: {
      patientDemographics: {
        age: 58,
        gender: 'Masculino',
        occupation: 'Ejecutivo Financiero'
      },
      chiefComplaint: 'Dolor torácico opresivo ("como una losa en el pecho") que se extiende hacia el cuello y el brazo izquierdo.',
      presentIllness: 'Paciente acude al servicio de urgencias refiriendo dolor opresivo muy intenso en el pecho (intensidad 9/10) iniciado hace 3 horas mientras subía escaleras. Se acompaña de sudoración fría intensa (diaforesis) y náuseas. El dolor no ha mejorado tras descansar 30 minutos sentado.',
      pastMedicalHistory: ['Hipertensión Arterial Esencial', 'Dislipidemia Mixta (Colesterol y Triglicéridos elevados)', 'Diabetes Mellitus Tipo 2'],
      medications: ['Enalapril 20 mg/12h', 'Atorvastatina 40 mg/24h', 'Metformina 850 mg/12h'],
      lifestyle: 'Fumador activo (20 cigarrillos/día desde hace 30 años).'
    },
    physicalExam: {
      vitalSigns: {
        bp: '155/95 mmHg',
        hr: '102 lpm',
        rr: '22 rpm',
        temp: '36.7 °C',
        sao2: '95% aire ambiente'
      },
      findings: [
        { systemName: "Cardiovascular", description: "Ruidos cardíacos rítmicos, taquicárdicos, sin soplos agregados. Cuarto ruido (R4) auscultable en ápice." },
        { systemName: "Respiratorio", description: "Murmullo vesicular conservado bilateralmente sin estertores crepitantes." }
      ]
    },
    initialLabWork: [
      { test: 'Glucemia en ayunas', result: '168', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'Electrocardiograma (ECG)', result: 'Descenso del segmento ST de 1.5 mm en derivaciones V4-V6 e inversión de onda T (signos de falta de oxígeno en cara anterior)', unit: 'mm', referenceRange: 'Isoeléctrico' },
      { test: 'Creatinina Sérica', result: '0.9', unit: 'mg/dL', referenceRange: 'H: 0.7 - 1.3' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Síndrome Coronario Agudo sin Elevación del ST (SCASEST / IAM Agudo)',
        plausibilityRationale: 'Concordancia con clínica opresiva típica, múltiples factores de riesgo cardiovascular y alteraciones ECG de isquemia subendocárdica en pared anterolateral.',
        isTargetDisease: true
      },
      {
        disease: 'Angina Inestable',
        plausibilityRationale: 'Dolor isquémico en reposo con alteraciones del ST, pero requiere confirmación de ausencia de necrosis miocárdica mediante biomarcadores.',
        isTargetDisease: false
      },
      {
        disease: 'Miocarditis Aguda',
        plausibilityRationale: 'Puede simular síndrome coronario agudo en adultos jóvenes, pero el perfil aterogénico del paciente orienta a etiología isquémica.',
        isTargetDisease: false
      },
      {
        disease: 'Tromboembolismo Pulmonar Agudo',
        plausibilityRationale: 'Presenta disnea y dolor torácico, aunque el dolor suele ser pleurítico y faltan signos de sobrecarga ventricular derecha.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Síndrome Coronario Agudo sin Elevación del ST (SCASEST / IAM Agudo)',
    biomarkerOptions: [
      {
        id: 'bm_opt_1',
        biomarkerId: 'bm_troponin_c',
        biomarkerName: 'Troponina Cardíaca (hs-cTn)',
        isCorrect: true,
        biochemicalRationale: 'La troponina cardíaca es la proteína específica del músculo del corazón por excelencia. Al morir los cardiomiocitos, la troponina se vierte de forma continua a la sangre a partir de las 2-4 horas del inicio del dolor. Una cifra elevada (> 50 ng/L) confirma que existe necrosis (muerte celular irreversible).',
        whyOptimalOrSuboptimal: 'Es el biomarcador óptimo porque permite confirmar o descartar el infarto en la ventana precoz de 3 horas que tiene el paciente, diferenciando con total seguridad un infarto de una simple angina inestable.'
      },
      {
        id: 'bm_opt_2',
        biomarkerId: 'bm_ckmb',
        biomarkerName: 'CK-MB Masa (Creatina Quinasa fracción MB)',
        isCorrect: false,
        biochemicalRationale: 'La CK-MB tarda más tiempo en elevarse (entre 4 y 6 horas) y además existe en pequeñas cantidades en el músculo esquelético.',
        whyOptimalOrSuboptimal: 'Subóptimo a las 3 horas de evolución: puede dar un falso negativo porque todavía no le ha dado tiempo a elevarse en sangre.'
      },
      {
        id: 'bm_opt_3',
        biomarkerId: 'bm_nt_probnp',
        biomarkerName: 'NT-proBNP',
        isCorrect: false,
        biochemicalRationale: 'El NT-proBNP es un péptido que se libera cuando las paredes de los ventrículos se estiran por exceso de volumen de líquido o presión.',
        whyOptimalOrSuboptimal: 'Inespecífico para daño celular agudo; se utiliza para insuficiencia cardíaca, no para confirmar necrosis celular en fase precoz.'
      },
      {
        id: 'bm_opt_4',
        biomarkerId: 'bm_ldh',
        biomarkerName: 'Lactato Deshidrogenasa Total (LDH)',
        isCorrect: false,
        biochemicalRationale: 'Enzima citosólica que se encuentra en casi todas las células del cuerpo (glóbulos rojos, hígado, músculo) y tarda más de 12-24 horas en elevarse.',
        whyOptimalOrSuboptimal: 'Muy tardío y poco específico; hoy en día está obsoleto para el diagnóstico inicial de dolor torácico.'
      }
    ],
    expertClinicalKey: 'Regla de Oro en el Dolor de Pecho: La Troponina Cardíaca ultrasensible es el único marcador con suficiente rapidez (se eleva a las 2-3 horas) y especificidad cardíaca para demostrar que las células del corazón se están rompiendo, permitiendo distinguir un infarto con necrosis de una angina de pecho.'
  },

  // ==========================================
  // CASOS HEPÁTICOS Y DE COLESTASIS (ICTERICIAS)
  // ==========================================
  {
    id: 'case_hepatic_01',
    title: 'Carmen R.: Coloración amarillenta y fatiga intensa',
    system: 'hepatic',
    difficulty: 'intermedio',
    studentSummary: 'Carmen R., mujer de 34 años con antecedentes de lupus, consulta porque desde hace 4 días nota sus ojos y piel amarillos (ictericia) y se siente muy débil. Sus deposiciones son de color oscuro normal y no tiene picor ni dolor en el vientre. El reto es confirmar si la bilirrubina alta se debe a que se están rompiendo glóbulos rojos masivamente antes del hígado (ictericia prehepática o hemolítica) o a un problema en las vías biliares.',
    clinicalGlossary: [
      { term: 'Ictericia flavínica', simpleDefinition: 'Tinte amarillento claro o pajizo en el blanco de los ojos (escleras) y en la piel, típico de cuando se destruyen glóbulos rojos a gran velocidad.' },
      { term: 'Hemólisis', simpleDefinition: 'Rotura prematura de los glóbulos rojos en la circulación o en el bazo, liberando hemoglobina y la enzima intracelular LDH al torrente sanguíneo.' },
      { term: 'Bilirrubina no conjugada (indirecta)', simpleDefinition: 'Bilirrubina que viaja unida a la albúmina antes de entrar al hígado. No se puede filtrar por los riñones porque no es soluble en agua.' },
      { term: 'Esplenomegalia', simpleDefinition: 'Aumento del tamaño del bazo. El bazo actúa como un filtro que atrapa y destruye los glóbulos rojos alterados por anticuerpos.' }
    ],
    biochemicalConceptSimple: '1. Los anticuerpos destruyen los glóbulos rojos (hemólisis) -> 2. Se libera hemoglobina que los macrófagos convierten en bilirrubina no conjugada (indirecta) -> 3. La cantidad de bilirrubina desborda la capacidad del hígado -> 4. Aumenta la bilirrubina indirecta en sangre y se eleva fuertemente la enzima LDH (que residía dentro de los eritrocitos).',
    clinicalHistory: {
      patientDemographics: {
        age: 34,
        gender: 'Femenino',
        occupation: 'Diseñadora Gráfica'
      },
      chiefComplaint: 'Coloración amarillenta en los ojos (ictericia) y cansancio extremo desde hace 4 días.',
      presentIllness: 'Carmen R. acude a urgencias por notar coloración amarillenta clara (ictericia flavínica) en los ojos y la piel, acompañada de cansancio progresivo (astenia), palpitaciones y orina algo oscura (coluria leve). No tiene picor en el cuerpo (prurito), dolor abdominal ni heces pálidas (acolia); de hecho, sus deposiciones mantienen su color café habitual.',
      pastMedicalHistory: ['Lupus Eritematoso Sistémico (LES) en remisión'],
      medications: ['Hidroxicloroquina 200 mg/día'],
      lifestyle: 'No consume alcohol ni fármacos hepatotóxicos.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '110/70 mmHg',
        hr: '108 lpm',
        rr: '20 rpm',
        temp: '37.2 °C',
        sao2: '96%'
      },
      findings: [
        { systemName: "Piel y Mucosas", description: "Ictericia flavínica marcada en escleras y sublingual. Palidez cutáneo-mucosa acentuada en lechos ungueales y conjuntivas." },
        { systemName: "Abdomen", description: "Blando, no doloroso. Esplenomegalia palpable a 2 cm bajo el reborde costal izquierdo. Sin hepatomegalia ni ascitis." }
      ]
    },
    initialLabWork: [
      { test: 'Hemoglobina', result: '6.8', unit: 'g/dL', referenceRange: '12.0 - 15.5 (Anemia severa)', isAbnormal: true },
      { test: 'Volumen Corpuscular Medio (VCM)', result: '104', unit: 'fL', referenceRange: '80 - 100 (Macrocitosis / Reticulocitosis regenerativa)', isAbnormal: true },
      { test: 'Bilirrubina Total', result: '5.8', unit: 'mg/dL', referenceRange: '0.3 - 1.2 (Ictericia clínica evidente)', isAbnormal: true },
      { test: 'Bilirrubina Directa', result: '0.2', unit: 'mg/dL', referenceRange: '< 0.3 (Predominio indirecto neto: 5.6 mg/dL)' },
      { test: 'Creatinina Sérica', result: '0.8', unit: 'mg/dL', referenceRange: '0.5 - 1.1' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Ictericia Prehepática / Hemolítica (Anemia Hemolítica Autoinmune)',
        plausibilityRationale: 'Ictericia a expensas de Bilirrubina Indirecta/No Conjugada (BT 5.8 mg/dL con BD 0.2 mg/dL -> BI 5.6 mg/dL), heces hipercólicas, anemia severa y esplenomegalia en paciente con antecedente autoinmune.',
        isTargetDisease: true
      },
      {
        disease: 'Ictericia Posthepática / Obstructiva (Coledocolitiasis)',
        plausibilityRationale: 'Causa ictericia pero cursa típicamente con elevación predominante de Bilirrubina Directa (>0.3 mg/dL), acolia, coluria intensa y ascenso de FA/GGT.',
        isTargetDisease: false
      },
      {
        disease: 'Ictericia Hepática / Citolítica (Hepatitis Aguda)',
        plausibilityRationale: 'Presenta ictericia pero requeriría elevación marcada de ALT y AST (>1000 U/L) por necrosis del hepatocito.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Ictericia Prehepática / Anemia Hemolítica Autoinmune',
    biomarkerOptions: [
      {
        id: 'bm_opt_ldh_hem',
        biomarkerId: 'bm_ldh',
        biomarkerName: 'Lactato Deshidrogenasa Total (LDH)',
        isCorrect: true,
        biochemicalRationale: 'La LDH (específicamente la isoenzima LDH-1 abundante en los eritrocitos) se libera masivamente al torrente sanguíneo durante la destrucción intravascular o extravascular de los hematíes. Su elevación confirmatoria junto al predominio de Bilirrubina Indirecta (no conjugada) ratifica el origen prehepático/hemolítico de la ictericia.',
        whyOptimalOrSuboptimal: 'Es el biomarcador óptimo para confirmar la hemólisis como causa de la hiperbilirrubinemia indirecta y diferenciar la ictericia prehepática de la hepática o posthepática.'
      },
      {
        id: 'bm_opt_ggt_wrong',
        biomarkerId: 'bm_ggt',
        biomarkerName: 'Gamma-Glutamil Transferasa (GGT)',
        isCorrect: false,
        biochemicalRationale: 'Enzima de la membrana canalicular biliar.',
        whyOptimalOrSuboptimal: 'Normal en la ictericia prehepática; su elevación es característica de colestasis o ictericia posthepática.'
      },
      {
        id: 'bm_opt_fa_wrong',
        biomarkerId: 'bm_fosfatasa_alcalina',
        biomarkerName: 'Fosfatasa Alcalina (FA)',
        isCorrect: false,
        biochemicalRationale: 'Marcador de inducción por estasis biliar canalicular.',
        whyOptimalOrSuboptimal: 'Inadecuado por permanecer normal en procesos destructivos eritrocutarios puros.'
      },
      {
        id: 'bm_opt_alt_wrong',
        biomarkerId: 'bm_alt',
        biomarkerName: 'Alanina Aminotransferasa (ALT)',
        isCorrect: false,
        biochemicalRationale: 'Marcador de integridad de la membrana del hepatocito.',
        whyOptimalOrSuboptimal: 'Permanecerá normal en ausencia de daño parenquimatosos hepático concomitante.'
      }
    ],
    expertClinicalKey: 'La Ictericia Prehepática se caracteriza por elevación de la Bilirrubina Indirecta (No Conjugada) con preservación de la función hepática/biliar (GGT y FA normales) y marcado aumento de LDH por lisis de hematíes.',
    essentialBiomarkerIds: ['bm_ldh']
  },

  {
    id: 'case_hepatic_02',
    title: 'Elena M.: Picor en la piel, heces blanquecinas y orina oscura',
    system: 'hepatic',
    difficulty: 'intermedio',
    studentSummary: 'Elena M., de 48 años y con cálculos biliares previos, acude porque su piel ha tomado un color amarillo-verdoso, le pica todo el cuerpo de forma insoportable, su orina sale oscura como té y sus heces son casi blancas. El objetivo es reconocer que un cálculo está atascando el conducto biliar (obstrucción o colestasis) impidiendo que la bilis llegue al intestino.',
    clinicalGlossary: [
      { term: 'Acolia', simpleDefinition: 'Heces pálidas o blanquecinas como arcilla. Ocurre porque la bilis no puede llegar al intestino, de modo que no se forma el pigmento marrón normal (estercobilina).' },
      { term: 'Coluria', simpleDefinition: 'Orina de color muy oscuro, como refresco de cola o té concentrado. Se debe a que la bilirrubina directa (que sí es soluble en agua) pasa a la sangre y se filtra por el riñón.' },
      { term: 'Prurito por colestasis', simpleDefinition: 'Picor intenso y generalizado provocado por el depósito de sales biliares en la piel al no poder evacuarse por la vía biliar.' },
      { term: 'Fosfatasa Alcalina (FA) y GGT', simpleDefinition: 'Enzimas situadas en los canalículos biliares del hígado. Cuando la bilis se queda estancada por un tapón, ambas enzimas se disparan en la sangre.' }
    ],
    biochemicalConceptSimple: '1. Un cálculo tapa el conducto colédoco -> 2. La bilis se acumula a presión en el hígado -> 3. La bilirrubina conjugada (directa) y las sales biliares refluyen a la sangre -> 4. La orina se vuelve oscura (coluria) y la piel pica (sales biliares) -> 5. Al no llegar bilis al intestino, las heces salen blancas (acolia).',
    clinicalHistory: {
      patientDemographics: {
        age: 48,
        gender: 'Femenino',
        occupation: 'Docente'
      },
      chiefComplaint: 'Tonalidad verdosa en la piel, orina muy oscura ("color té") y deposiciones blanquecinas.',
      presentIllness: 'Elena M. refiere coloración amarillenta-verdosa en la piel y los ojos de 6 días de evolución, acompañada de heces blanquecinas (acolia), orina muy oscura (coluria) y un picor insoportable en palmas y plantas (prurito). Nota además una molestia sorda en el lado derecho superior del abdomen.',
      pastMedicalHistory: ['Colelitiasis sintomática (cálculos en la vesícula) tratada conservadoramente'],
      medications: ['Ninguno habitual'],
      lifestyle: 'No consume alcohol.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '125/78 mmHg',
        hr: '78 lpm',
        rr: '16 rpm',
        temp: '37.0 °C',
        sao2: '98%'
      },
      findings: [
        { systemName: "Piel y Mucosas", description: "Ictericia verdínica franca en escleras y piel. Lesiones por rascado secundarias a prurito." },
        { systemName: "Abdomen", description: "Blando, dolor discreto en hipocondrio derecho a la palpación profunda. Signo de Murphy negativo." }
      ]
    },
    initialLabWork: [
      { test: 'Hemograma Completo', result: 'Leucocitos 7.200 /µL, Hemoglobina 13.5 g/dL (Sin anemia hemolítica ni leucocitosis febril)', unit: '', referenceRange: 'Normal' },
      { test: 'Bilirrubina Total', result: '9.2', unit: 'mg/dL', referenceRange: '0.3 - 1.2', isAbnormal: true },
      { test: 'Bilirrubina Directa', result: '8.1', unit: 'mg/dL', referenceRange: '< 0.3 (Hiperbilirrubinemia con marcado predominio directo > 85%)', isAbnormal: true },
      { test: 'Tira de Orina en Urgencias', result: 'Bilirrubina positiva (+++), Urobilinógeno negativo (Confirma coluria por regurgitación biliar directa sin paso intestinal)', unit: '', referenceRange: 'Negativo' },
      { test: 'Creatinina Sérica', result: '0.7', unit: 'mg/dL', referenceRange: '0.5 - 1.1' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Ictericia Posthepática / Obstructiva (Coledocolitiasis / Colestasis Extrahepática)',
        plausibilityRationale: 'Ictericia por estasis biliar con hiperbilirrubinemia directa masiva (BD 8.1 mg/dL), acolia por falta de paso de estercobilina al intestino y coluria por filtración renal de la bilirrubina conjugada hidrosoluble.',
        isTargetDisease: true
      },
      {
        disease: 'Ictericia Prehepática (Hemolítica)',
        plausibilityRationale: 'Descartada por la dominancia de bilirrubina directa y la presencia de acolia y coluria.',
        isTargetDisease: false
      },
      {
        disease: 'Hepatitis Aguda Viral (Ictericia Hepática)',
        plausibilityRationale: 'Puede dar coluria pero presenta elevaciones masivas de ALT/AST (>1000 U/L) y no cursa con la pauta de obstrucción vía biliar pura.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Ictericia Posthepática / Coledocolitiasis Obstructiva',
    biomarkerOptions: [
      {
        id: 'bm_opt_ggt_fa',
        biomarkerId: 'bm_ggt',
        biomarkerName: 'GGT y Fosfatasa Alcalina (FA)',
        isCorrect: true,
        biochemicalRationale: 'La Fosfatasa Alcalina y la GGT son enzimas ancladas a la membrana canalicular biliar. El estancamiento de sales biliares en la obstrucción biliar posthepática induce la transcripción y liberación masiva de ambas enzimas (>3-5 veces el LSN), constituyendo el patrón bioquímico de colestasis.',
        whyOptimalOrSuboptimal: 'Es el par de biomarcadores óptimo para confirmar la estasis biliar y la obstrucción de la vía biliar en la ictericia posthepática.'
      },
      {
        id: 'bm_opt_alt_alone',
        biomarkerId: 'bm_alt',
        biomarkerName: 'Alanina Aminotransferasa (ALT) aislada',
        isCorrect: false,
        biochemicalRationale: 'Marcador de citólisis hepatocitaria.',
        whyOptimalOrSuboptimal: 'En la colestasis puede elevarse de forma secundaria y leve, pero carece de especificidad para el canalículo biliar.'
      },
      {
        id: 'bm_opt_ldh_hep_w',
        biomarkerId: 'bm_ldh',
        biomarkerName: 'Lactato Deshidrogenasa (LDH)',
        isCorrect: false,
        biochemicalRationale: 'Enzima citosólica ubiquitaria.',
        whyOptimalOrSuboptimal: 'Inespecífica e incapaz de reflejar la obstrucción de la vía biliar.'
      },
      {
        id: 'bm_opt_alb_w',
        biomarkerId: 'bm_albumina',
        biomarkerName: 'Albúmina Sérica',
        isCorrect: false,
        biochemicalRationale: 'Proteína de síntesis hepática de vida media larga (20 días).',
        whyOptimalOrSuboptimal: 'Evaluadora de función crónica, irrelevante en el diagnóstico agudo de obstrucción biliar.'
      }
    ],
    expertClinicalKey: 'La Ictericia Posthepática (Obstructiva) cursa con predominio de Bilirrubina Directa (>0.3 mg/dL), acolia, coluria y elevación coordinada de Fosfatasa Alcalina y GGT.',
    essentialBiomarkerIds: ['bm_ggt', 'bm_fosfatasa_alcalina']
  },

  {
    id: 'case_hepatic_03',
    title: 'Marta S.: Somnolencia y temblor involuntario tras tomar analgésicos',
    system: 'hepatic',
    difficulty: 'avanzado',
    studentSummary: 'Marta S., joven de 22 años, es traída a urgencias 36 horas después de haber ingerido una cantidad tóxica muy grande de paracetamol (unos 20 gramos). Presenta piel amarilla, desorientación y un temblor rápido en las manos (asterixis). El objetivo es medir las enzimas del interior de las células hepáticas (transaminasas ALT y AST) para demostrar una rotura masiva de los hepatocitos (citólisis aguda).',
    clinicalGlossary: [
      { term: 'Citólisis hepática', simpleDefinition: 'Rotura o muerte masiva de las células del hígado (hepatocitos), liberando todo su contenido enzimático a la sangre.' },
      { term: 'Transaminasas (ALT / GPT y AST / GOT)', simpleDefinition: 'Enzimas que catalizan reacciones de aminoácidos en el interior del hígado. Cuando el hígado sufre daño agudo grave, pasan de su valor normal (<40) a miles de unidades (>3000 U/L).' },
      { term: 'Asterixis / Flapping tremor', simpleDefinition: 'Temblor o "aleteo" involuntario al mantener las manos extendidas. Es un signo de que las toxinas que el hígado no puede depurar (como el amonio) están afectando al cerebro (encefalopatía hepática).' },
      { term: 'NAPQI y Glutatión', simpleDefinition: 'El paracetamol en exceso produce un tóxico llamado NAPQI. Cuando se agota el glutatión (antioxidante del hígado), el NAPQI destruye las membranas de las células hepáticas.' }
    ],
    biochemicalConceptSimple: '1. Sobredosis de paracetamol -> 2. Se satura la vía normal de sulfatación y se produce NAPQI en exceso -> 3. Se agota la reserva hepática de glutatión -> 4. El NAPQI se une a proteínas mitocondriales causando necrosis -> 5. Se liberan miles de unidades de transaminasas (ALT > 3000 U/L) a la sangre.',
    clinicalHistory: {
      patientDemographics: {
        age: 22,
        gender: 'Femenino',
        occupation: 'Estudiante'
      },
      chiefComplaint: 'Ictericia de inicio rápido, confusión y náuseas intensas tras ingesta de fármacos.',
      presentIllness: 'Marta S. ingresa en urgencias 36 horas después de una ingesta de 20 gramos de paracetamol. Desarrolla dolor agudo en el costado derecho del abdomen (hipocondrio derecho), coloración amarillenta evidente en ojos y piel, y temblor en las manos al extenderlas (asterixis).',
      pastMedicalHistory: ['Depresión mayor'],
      medications: ['Sertralina 50 mg/día'],
      lifestyle: 'Sin consumo regular de alcohol.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '102/62 mmHg',
        hr: '112 lpm',
        rr: '22 rpm',
        temp: '36.8 °C',
        sao2: '97%'
      },
      findings: [
        { systemName: "Neurológico", description: "Encefalopatía hepática grado II con desorientación y asterixis bilateral." },
        { systemName: "Abdomen", description: "Hepatomegalia dolorosa a la palpación en hipocondrio derecho." }
      ]
    },
    initialLabWork: [
      { test: 'Hemograma general', result: 'Leucocitos 7.800 /µL, Hemoglobina 13.2 g/dL, Plaquetas 140.000 /µL', unit: '', referenceRange: 'Normal' },
      { test: 'Glucemia en Urgencias', result: '54', unit: 'mg/dL', referenceRange: '70 - 109 (Hipoglucemia sintomática por fallo glucogénico agudo)', isAbnormal: true },
      { test: 'Coagulación de Urgencias (INR)', result: 'Actividad Protrombina 26%, INR 2.8', unit: '', referenceRange: 'INR 0.8 - 1.2 (Fallo agudo de síntesis hepática)', isAbnormal: true },
      { test: 'Bilirrubina Total', result: '4.2', unit: 'mg/dL', referenceRange: '0.3 - 1.2 (Ictericia clínica progresiva)', isAbnormal: true },
      { test: 'Creatinina Sérica', result: '1.1', unit: 'mg/dL', referenceRange: '0.5 - 1.1' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Ictericia Hepática / Citolítica (Necrosis Hepatocelular Aguda por Paracetamol)',
        plausibilityRationale: 'Ictericia con fallo agudo de síntesis (coagulopatía e hipoglucemia) tras ingesta masiva de analgésicos con agotamiento de glutatión y acumulación de NAPQI tóxico.',
        isTargetDisease: true
      },
      {
        disease: 'Ictericia Posthepática (Obstructiva)',
        plausibilityRationale: 'Descartada por la ausencia de patrón obstructivo biliar primario y elevación extrema de transaminasas.',
        isTargetDisease: false
      },
      {
        disease: 'Ictericia Prehepática (Hemolítica)',
        plausibilityRationale: 'No justifica la necrosis hepática masiva ni las transaminasas > 4000 U/L.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Ictericia Hepática por Necrosis Hepatocelular Aguda',
    biomarkerOptions: [
      {
        id: 'bm_opt_alt_prof',
        biomarkerId: 'bm_alt',
        biomarkerName: 'Alanina Aminotransferasa (ALT / GPT)',
        isCorrect: true,
        biochemicalRationale: 'La ALT es una enzima citosólica altamente específica del hepatocito. En la necrosis hepática masiva por NAPQI, las membranas celulares se rompen liberando la ALT a la circulación con picos > 3,000 - 5,000 U/L.',
        whyOptimalOrSuboptimal: 'Es el biomarcador óptimo para cuantificar la magnitud del daño citolítico hepático agudo en la ictericia parenquimatosa.'
      },
      {
        id: 'bm_opt_fa_wrong_2',
        biomarkerId: 'bm_fosfatasa_alcalina',
        biomarkerName: 'Fosfatasa Alcalina (FA)',
        isCorrect: false,
        biochemicalRationale: 'Marcador del canalículo biliar.',
        whyOptimalOrSuboptimal: 'Inadecuado por permanecer normal o levemente alterado en la necrosis citolítica agudísima.'
      },
      {
        id: 'bm_opt_ggt_wrong_2',
        biomarkerId: 'bm_ggt',
        biomarkerName: 'GGT',
        isCorrect: false,
        biochemicalRationale: 'Marcador de inducción o colestasis.',
        whyOptimalOrSuboptimal: 'No refleja la destrucción parenquimatosa masiva de los hepatocitos.'
      },
      {
        id: 'bm_opt_ldh_wrong_2',
        biomarkerId: 'bm_ldh',
        biomarkerName: 'LDH',
        isCorrect: false,
        biochemicalRationale: 'Enzima citosólica no específica.',
        whyOptimalOrSuboptimal: 'Aunque se eleva, carece de especificidad hepática frente a la ALT.'
      }
    ],
    expertClinicalKey: 'La Ictericia Hepática (Citolítica) se distingue por niveles masivos de ALT y AST (>1000 U/L) que reflejan ruptura de membranas del parenquima hepático.',
    essentialBiomarkerIds: ['bm_alt', 'bm_ast']
  },

  // ==========================================
  // CASOS METABÓLICOS Y BETA-OXIDACIÓN
  // ==========================================
  {
    id: 'case_metabolic_01',
    title: 'Javier T.: Manchas oscuras en el cuello y aumento de peso',
    system: 'metabolic',
    difficulty: 'intermedio',
    studentSummary: 'Javier T., conductor de 42 años con sobrepeso abdominal, acude a revisión por notar que la piel de la nuca y las axilas se ha vuelto oscura y gruesa (acantosis nigricans), y que tiene mucho sueño tras comer. Aunque su azúcar en ayunas aún no llega a rango de diabetes, sus triglicéridos están muy altos y sufre resistencia a la insulina.',
    clinicalGlossary: [
      { term: 'Acantosis nigricans', simpleDefinition: 'Placas oscuras, gruesas y aterciopeladas en pliegues de la piel (cuello, axilas). Aparecen porque el exceso de insulina en sangre estimula a los receptores de crecimiento de la piel.' },
      { term: 'Resistencia a la insulina', simpleDefinition: 'Situación en la que el músculo y la grasa no responden bien a la insulina habitual. El páncreas tiene que bombear muchísima más insulina para mantener la glucosa controlada.' },
      { term: 'Triglicéridos y VLDL', simpleDefinition: 'Grasas que circulan por la sangre empaquetadas en lipoproteínas. Al fallar el efecto de la insulina, el tejido adiposo suelta ácidos grasos y el hígado fabrica triglicéridos sin parar.' },
      { term: 'Índice HOMA-IR', simpleDefinition: 'Fórmula sencilla que combina la glucosa y la insulina en ayunas para medir cuánta resistencia tienen los tejidos.' }
    ],
    biochemicalConceptSimple: '1. Los tejidos se vuelven insensibles a la insulina -> 2. El páncreas responde bombeando cantidades masivas de insulina (hiperinsulinemia compensadora) -> 3. La grasa se descompone y viaja al hígado, elevando los triglicéridos en sangre -> 4. La insulina en exceso estimula el crecimiento de las células de la piel provocando manchas oscuras (acantosis nigricans).',
    clinicalHistory: {
      patientDemographics: {
        age: 42,
        gender: 'Masculino',
        occupation: 'Conductor de Autobús'
      },
      chiefComplaint: 'Aumento de peso, somnolencia posprandial y oscurecimiento de la piel en cuello y axilas.',
      presentIllness: 'Javier T. acude a chequeo rutinario refiriendo aumento del perímetro abdominal en los últimos 2 años. Nota fatiga fácil tras comidas ricas en carbohidratos y manchas hiperpigmentadas aterciopeladas en los pliegues del cuello y las axilas.',
      pastMedicalHistory: ['Hipertensión arterial estadio I'],
      medications: ['Lisinopril 10 mg/día'],
      lifestyle: 'Dieta rica en azúcares refinados y grasas saturadas. Sedentario.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '138/88 mmHg',
        hr: '76 lpm',
        rr: '16 rpm',
        temp: '36.5 °C',
        sao2: '98%'
      },
      findings: [
        { systemName: "Piel", description: "Placas hiperqueratósicas e hiperpigmentadas terciopeladas en nuca y axilas compatibles con Acantosis Nigricans." },
        { systemName: "Antropometría", description: "IMC: 32.4 kg/m2. Perímetro de cintura: 108 cm (Obesidad visceral)." }
      ]
    },
    initialLabWork: [
      { test: 'Glucemia Basal en Ayunas (Cribado)', result: '105', unit: 'mg/dL', referenceRange: '70 - 109 (Glucemia basal alterada en rango de prediabetes)' },
      { test: 'Hemograma Completo', result: 'Leucocitos 6.400 /µL, Hemoglobina 14.8 g/dL', unit: '', referenceRange: 'Normal' },
      { test: 'Creatinina Sérica', result: '0.85', unit: 'mg/dL', referenceRange: '0.7 - 1.3' },
      { test: 'Presión Arterial en Consulta', result: '138/88', unit: 'mmHg', referenceRange: '< 120/80 (Prehipertensión arterial)' },
      { test: 'Sistemático de Orina', result: 'Negativo para proteinuria y glucosuria', unit: '', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Estado de Resistencia a la Insulina / Síndrome Metabólico',
        plausibilityRationale: 'Glucemia basal en rango limítrofe en paciente con acantosis nigricans, obesidad visceral y perímetro de cintura aumentado.',
        isTargetDisease: true
      },
      {
        disease: 'Diabetes Mellitus Tipo 2 Establecida',
        plausibilityRationale: 'Presenta componentes metabólicos pero la glucemia en ayunas no alcanza los 126 mg/dL ni la HbA1c llega al 6.5%.',
        isTargetDisease: false
      },
      {
        disease: 'Defecto en la Beta-Oxidación de Ácidos Grasos',
        plausibilityRationale: 'Causa alteración lipídica pero cursa con hipoglucemia hipocetósica grave tras ayuno.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Resistencia a la Insulina / Síndrome Metabólico',
    biomarkerOptions: [
      {
        id: 'bm_opt_triglycerides_insulin',
        biomarkerId: 'bm_trigliceridos',
        biomarkerName: 'Triglicéridos Séricos e Índice HOMA-IR (Insulina en Ayunas)',
        isCorrect: true,
        biochemicalRationale: 'En la Resistencia a la Insulina, la falta de acción efectiva de la insulina en el tejido adiposo desinhibe la lipólisis, aumentando el flujo de ácidos grasos al hígado. Esto estimula la hiperproducción de VLDL rica en triglicéridos (>150 mg/dL). El cálculo del índice HOMA-IR ([Glucosa x Insulina]/405) confirma la resistencia tisular.',
        whyOptimalOrSuboptimal: 'Es la combinación óptima para caracterizar la alteración metabólica previa al desarrollo de Diabetes manifiesto.'
      },
      {
        id: 'bm_opt_hba1c_wrong',
        biomarkerId: 'bm_hba1c',
        biomarkerName: 'HbA1c aislada',
        isCorrect: false,
        biochemicalRationale: 'Evalúa glicación de hemoglobina.',
        whyOptimalOrSuboptimal: 'Permanecerá aún normal (<5.7%) en estadios tempranos de resistencia a la insulina gracias a la hiperinsulinemia compensadora.'
      },
      {
        id: 'bm_opt_lactate_wrong',
        biomarkerId: 'bm_lactato',
        biomarkerName: 'Lactato Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Marcador de anaerobiosis tisular.',
        whyOptimalOrSuboptimal: 'Irrelevante para el diagnóstico de resistencia a la insulina.'
      },
      {
        id: 'bm_opt_betaohb_wrong',
        biomarkerId: 'bm_beta_hidroxibutirato',
        biomarkerName: 'β-Hidroxibutirato',
        isCorrect: false,
        biochemicalRationale: 'Cuerpo cetónico.',
        whyOptimalOrSuboptimal: 'Normal en estados de resistencia a la insulina con hiperinsulinemia relativa que suprime la cetogénesis.'
      }
    ],
    expertClinicalKey: 'La Resistencia a la Insulina se manifiesta precozmente con hipertrigliceridemia (>150 mg/dL), HDL bajo y signos cutáneos (acantosis nigricans) antes de que la glucemia se eleve a rangos diabéticos.',
    essentialBiomarkerIds: ['bm_trigliceridos', 'bm_fasting_insulin']
  },

  {
    id: 'case_metabolic_02',
    title: 'Lucía B. (19 años): Mucha sed, ganas continuas de orinar y respiración agitada',
    system: 'metabolic',
    difficulty: 'intermedio',
    studentSummary: 'Lucía B., estudiante de 19 años, debuta con diabetes tipo 1: en 3 días ha perdido 4 kg, tiene una sed constante inagotable (polidipsia) y orina a todas horas (poliuria). Llega a urgencias vomitando, con dolor de vientre, respiración profunda y rápida (respiración de Kussmaul) y aliento a frutas ácidas o acetona. El objetivo es medir el cuerpo cetónico principal (beta-hidroxibutirato) en sangre para confirmar una cetoacidosis diabética.',
    clinicalGlossary: [
      { term: 'Poliuria y Polidipsia', simpleDefinition: 'Orinar en volúmenes muy altos (porque la glucosa desborda el riñón y arrastra agua) y tener una sed insaciable para compensar la deshidratación.' },
      { term: 'Respiración de Kussmaul', simpleDefinition: 'Respiración profunda, rápida y agitada. Es el mecanismo del pulmón para expulsar CO2 y compensar la acidez generada por los cuerpos cetónicos.' },
      { term: 'Cuerpos cetónicos (β-hidroxibutirato)', simpleDefinition: 'Ácidos producidos por el hígado a partir de grasas cuando las células no pueden usar glucosa por falta de insulina. Acidifican peligrosamente la sangre.' },
      { term: 'Aliento cetónico', simpleDefinition: 'Olor dulce o afrutado (parecido al quitaesmalte de uñas o manzanas fermentadas) producido por la evaporación de acetona en los pulmones.' }
    ],
    biochemicalConceptSimple: '1. Destrucción de células beta del páncreas -> 2. Cero insulina -> 3. La glucosa no puede entrar en las células y se dispara en sangre (>300 mg/dL) -> 4. El cuerpo cree que está en inanición y descompone grasas a lo loco -> 5. El hígado fabrica cuerpos cetónicos ácidos (β-hidroxibutirato > 3 mmol/L) produciendo cetoacidosis metabólica.',
    clinicalHistory: {
      patientDemographics: {
        age: 19,
        gender: 'Femenino',
        occupation: 'Estudiante'
      },
      chiefComplaint: 'Sed insaciable (polidipsia), orina muy frecuente (poliuria) y dolor abdominal con vómitos.',
      presentIllness: 'Lucía B. acude a urgencias por cuadro de 3 días de polidipsia intensa, poliuria y pérdida de 4 kg de peso. En las últimas 12 horas desarrolla náuseas, vómitos repetidos, dolor abdominal difuso y aliento con olor a "manzana/acetona".',
      pastMedicalHistory: ['Sin antecedentes de interés'],
      medications: ['Ninguno'],
      lifestyle: 'Estudiante sin hábitos tóxicos.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '95/60 mmHg',
        hr: '118 lpm',
        rr: '28 rpm (Respiración profunda de Kussmaul)',
        temp: '36.8 °C',
        sao2: '97%'
      },
      findings: [
        { systemName: "General", description: "Sequedad marcada de piel y mucosas. Aliento cetónico característico." },
        { systemName: "Abdomen", description: "Blando, doloroso a la palpación difusa sin defensa peritoneal." }
      ]
    },
    initialLabWork: [
      { test: 'Glucemia en ayunas', result: '320', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'HbA1c', result: '10.2', unit: '%', referenceRange: '< 5,7' },
      { test: 'Sodio', result: '131', unit: 'mmol/L', referenceRange: '135 - 145' },
      { test: 'Potasio', result: '5.2', unit: 'mmol/L', referenceRange: '3,5 - 5,0' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Cetoacidosis Diabética (CAD) / Diabetes Mellitus Tipo 1 de Debut',
        plausibilityRationale: 'Cursa con hiperglucemia severa (>300 mg/dL), polidipsia, poliuria, respiración de Kussmaul por acidosis metabólica e hiperacetonemia por déficit absoluto de insulina.',
        isTargetDisease: true
      },
      {
        disease: 'Estado Hiperosmolar Hiperglucémico',
        plausibilityRationale: 'Presenta hiperglucemia pero suele ocurrir en adultos mayores con DM2, con glucemias > 600 mg/dL y mínima o nula cetosis.',
        isTargetDisease: false
      },
      {
        disease: 'Defecto en la Beta-Oxidación de Ácidos Grasos',
        plausibilityRationale: 'Produce hipoglucemia en lugar de hiperglucemia masiva.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Cetoacidosis Diabética por Debut de Diabetes Mellitus Tipo 1',
    biomarkerOptions: [
      {
        id: 'bm_opt_betaohb_cad',
        biomarkerId: 'bm_beta_hidroxibutirato',
        biomarkerName: 'β-Hidroxibutirato Sérico y Cetonuria/Glucosuria en Orina',
        isCorrect: true,
        biochemicalRationale: 'En la Cetoacidosis Diabética, la ausencia de insulina activa la lipólisis sin oposición. Los ácidos grasos masivos en el hígado sufren beta-oxidación incontrolada derivando en la síntesis acelerada de β-hidroxibutirato (>3.0 mmol/L). Su cuantificación en sangre es el estándar para confirmar la CAD.',
        whyOptimalOrSuboptimal: 'Es el biomarcador cetónico óptimo para confirmar la cetoacidosis e iniciar el protocolo de insulina.'
      },
      {
        id: 'bm_opt_lactate_cad_w',
        biomarkerId: 'bm_lactato',
        biomarkerName: 'Lactato Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Marcador de anaerobiosis.',
        whyOptimalOrSuboptimal: 'Puede estar discretamente elevado por deshidratación pero no evalúa el déficit primario insulinico ni la cetogénesis.'
      },
      {
        id: 'bm_opt_agl_cad_w',
        biomarkerId: 'bm_acidos_grasos_libres',
        biomarkerName: 'Ácidos Grasos Libres',
        isCorrect: false,
        biochemicalRationale: 'Sustrato de la cetogénesis.',
        whyOptimalOrSuboptimal: 'Elevados pero inespecíficos frente a la cuantificación directa del β-hidroxibutirato.'
      },
      {
        id: 'bm_opt_pyruvate_cad_w',
        biomarkerId: 'bm_piruvato',
        biomarkerName: 'Piruvato',
        isCorrect: false,
        biochemicalRationale: 'Intermediario de glucólisis.',
        whyOptimalOrSuboptimal: 'Irrelevante para categorizar la cetoacidosis diabética.'
      }
    ],
    expertClinicalKey: 'La Cetoacidosis Diabética requiere demostrar la presencia de hiperglucemia (>200 mg/dL) junto con elevación del cuerpo cetónico primario β-hidroxibutirato (>3.0 mmol/L).'
  },

  {
    id: 'case_metabolic_03',
    title: 'Leo P. (14 meses): Letargo y bajada de azúcar tras un catarro con ayuno',
    system: 'metabolic',
    difficulty: 'experto',
    studentSummary: 'Leo P., bebé de 14 meses, lleva 14 horas sin comer porque le dolía la garganta y tenía fiebre. Sus padres no consiguen despertarlo por la mañana, y en urgencias se detecta una glucosa en sangre bajísima (35 mg/dL). Lo asombroso es que el bebé ¡no tiene cuerpos cetónicos en sangre ni en orina! El objetivo es identificar que sus mitocondrias no pueden quemar grasas (déficit de MCAD en la beta-oxidación) para producir energía de reserva.',
    clinicalGlossary: [
      { term: 'Hipoglucemia hipocetósica', simpleDefinition: 'Tener el azúcar peligrosamente bajo sin generar cuerpos cetónicos. Normalmente, cuando se acaba el azúcar, el cuerpo quema grasa y fabrica cetonas; si no hay cetonas, la maquinaria de quemar grasas (beta-oxidación) está rota.' },
      { term: 'Beta-oxidación mitocondrial', simpleDefinition: 'Ruta dentro de las mitocondrias que "corta" los ácidos grasos de dos en dos carbonos para producir energía (ATP) y cuerpos cetónicos durante el ayuno.' },
      { term: 'Déficit de MCAD', simpleDefinition: 'Falta congénita de la enzima que procesa las grasas de tamaño medio (6 a 12 carbonos). Es el error más frecuente de la beta-oxidación.' },
      { term: 'Acilcarnitinas', simpleDefinition: 'Complejos de ácidos grasos unidos a carnitina. Si una enzima falla, los ácidos grasos atascados se unen a carnitina y se escapan a la sangre (octanoilcarnitina C8).' }
    ],
    biochemicalConceptSimple: '1. El bebé entra en ayuno prolongado -> 2. Se agota el glucógeno del hígado -> 3. El cuerpo intenta quemar ácidos grasos para obtener energía y cetonas -> 4. La enzima MCAD no funciona -> 5. Se produce hipoglucemia severa sin cetonas de rescate y se acumula octanoilcarnitina (C8).',
    clinicalHistory: {
      patientDemographics: {
        age: 1.2,
        gender: 'Masculino',
        occupation: 'Lactante'
      },
      chiefComplaint: 'Letargia marcada, hipotonía y dificultad para despertar por la mañana.',
      presentIllness: 'Leo P., lactante de 14 meses, es traído a urgencias soporoso tras un ayuno nocturno de 14 horas motivado por rechazo de tomas secundario a una infección viral leve de vías altas. La madre nota al niño muy pálido, frío y sudoroso.',
      pastMedicalHistory: ['Episodio previo similar a los 8 meses durante gastroenteritis'],
      medications: ['Paracetamol en gotas'],
      lifestyle: 'Lactancia y alimentación complementaria adecuada.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '75/45 mmHg',
        hr: '140 lpm',
        rr: '32 rpm',
        temp: '36.2 °C',
        sao2: '96%'
      },
      findings: [
        { systemName: "Neurológico", description: "Soporoso, responde débilmente al estímulo doloroso. Hipotonía muscular generalizada." },
        { systemName: "Abdomen", description: "Hepatomegalia moderada a 2.5 cm del reborde costal." }
      ]
    },
    initialLabWork: [
      { test: 'Glucemia en ayunas', result: '35', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'β-Hidroxibutirato', result: '0.1', unit: 'mmol/L', referenceRange: '< 0.5 (En ayuno debe elevarse a > 1.5)' },
      { test: 'Ácidos Grasos Libres', result: '2.4', unit: 'mmol/L', referenceRange: '0,2 - 0,8' },
      { test: 'Cetonuria en orina', result: 'Negativa', unit: '-', referenceRange: 'Negativa' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Defecto en la Beta-Oxidación de Ácidos Grasos (Deficiencia de MCADD - Acil-CoA Deshidrogenasa de Cadena Media)',
        plausibilityRationale: 'Presenta el hallazgo patognomónico de Hipoglucemia Hipocetósica (glucemia 35 mg/dL con β-hidroxibutirato anormalmente bajo de 0.1 mmol/L y cetonuria negativa) en presencia de ácidos grasos libres masivamente elevados (2.4 mmol/L) incapaces de oxidarse.',
        isTargetDisease: true
      },
      {
        disease: 'Hipoglucemia Cetósica del Lactante',
        plausibilityRationale: 'Es la causa más frecuente en la infancia pero cursa con cetonuria e hiperacetonemia intensa por conservación de la beta-oxidación.',
        isTargetDisease: false
      },
      {
        disease: 'Hiperinsulinismo Congénito',
        plausibilityRationale: 'Causa hipoglucemia hipocetósica, pero la insulina suprime la lipólisis por lo que los Ácidos Grasos Libres estarían muy bajos (no elevados).',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Defecto de Beta-Oxidación de Ácidos Grasos (MCADD / Hipoglucemia Hipocetósica)',
    biomarkerOptions: [
      {
        id: 'bm_opt_carnitine_ratio',
        biomarkerId: 'bm_relacion_acilcarnitina_carnitina',
        biomarkerName: 'Relación Acilcarnitina / Carnitina Libre (>0.4) y Perfil de Acilcarnitinas (Octanoilcarnitina C8)',
        isCorrect: true,
        biochemicalRationale: 'Al estar bloqueada la enzima acil-CoA deshidrogenasa de cadena media (MCADD), los intermediarios acil-CoA de 6 a 12 carbonos se acumulan y se esterifican con carnitina libre para ser excretados. Esto eleva la relación acilcarnitina/carnitina libre por encima de 0.4 y eleva específicamente la Octanoilcarnitina (C8) en la espectrometría de masas.',
        whyOptimalOrSuboptimal: 'Es el marcador enzimático óptimo para confirmar el defecto en la beta-oxidación e identificar la deficiencia de MCADD.'
      },
      {
        id: 'bm_opt_hba1c_wrong_3',
        biomarkerId: 'bm_hba1c',
        biomarkerName: 'HbA1c',
        isCorrect: false,
        biochemicalRationale: 'Marcador de hiperglucemia crónica.',
        whyOptimalOrSuboptimal: 'Sin utilidad en el diagnóstico metabólico agudo de defectos congénitos.'
      },
      {
        id: 'bm_opt_lactate_wrong_3',
        biomarkerId: 'bm_lactato',
        biomarkerName: 'Lactato Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Marcador de anaerobiosis.',
        whyOptimalOrSuboptimal: 'No discrimina la falla de la beta-oxidación de los ácidos grasos.'
      },
      {
        id: 'bm_opt_pyruvate_wrong_3',
        biomarkerId: 'bm_piruvato',
        biomarkerName: 'Piruvato',
        isCorrect: false,
        biochemicalRationale: 'Intermediario glucolítico.',
        whyOptimalOrSuboptimal: 'Inespecífico para caracterizar la lanzadera de carnitina y la beta-oxidación.'
      }
    ],
    expertClinicalKey: 'La Hipoglucemia Hipocetósica (Glucosa baja + β-hidroxibutirato bajo + Ácidos Grasos Libres altos) es el sello distintivo de los Defectos en la Beta-Oxidación de Ácidos Grasos (MCADD).'
  },

  // ==========================================
  // CASOS RENALES, CICLO DE LA UREA E HIPERURICEMIAS
  // ==========================================
  {
    id: 'case_renal_01',
    title: 'Bebé Mateo (4 días): Dificultad para despertar y vómitos tras tomar leche',
    system: 'renal',
    difficulty: 'avanzado',
    studentSummary: 'El recién nacido Mateo, de 4 días de vida, nació sano pero al empezar a tomar leche materna comienza a vomitar, respira muy deprisa, entra en coma y sufre convulsiones. Su amonio en sangre está desorbitado (>350 µmol/L) mientras que su urea es bajísima. El objetivo es identificar que tiene un fallo congénito en el ciclo de la urea (déficit de la enzima OTC) que le impide desintoxicar el nitrógeno de las proteínas.',
    clinicalGlossary: [
      { term: 'Amonio plasmático (NH4+)', simpleDefinition: 'Gas/ion altamente tóxico para las neuronas generado al degradar proteínas. El hígado debe transformarlo urgentemente en urea para que no dañe el cerebro.' },
      { term: 'Ciclo de la urea', simpleDefinition: 'Ruta bioquímica exclusiva del hígado que toma el amonio tóxico y lo convierte en urea neutra, la cual se expulsa sin peligro por la orina.' },
      { term: 'Déficit de OTC (Ornitina Transcarbamilasa)', simpleDefinition: 'La enfermedad más frecuente del ciclo de la urea. Al estar rota la enzima, el amonio se dispara en sangre y se acumula ácido orótico en la orina.' },
      { term: 'Encefalopatía hiperamonémica', simpleDefinition: 'Intoxicación cerebral aguda causada por amonio: provoca edema cerebral, letargo, convulsiones y coma si no se trata de inmediato.' }
    ],
    biochemicalConceptSimple: '1. El bebé ingiere proteínas de la leche -> 2. La digestión libera aminoácidos y genera amonio libre -> 3. La enzima hepática OTC está inactiva y el ciclo de la urea no arranca -> 4. La urea está baja pero el amonio se dispara a niveles letales (>300 µmol/L) -> 5. El amonio atraviesa la barrera hematoencefálica y desata convulsiones y coma.',
    clinicalHistory: {
      patientDemographics: {
        age: 0.01,
        gender: 'Masculino',
        occupation: 'Neonato'
      },
      chiefComplaint: 'Rechazo de tomas, vómitos, letargia e hiperventilación.',
      presentIllness: 'El recién nacido Mateo, a término y sin complicaciones de parto, al 3er día de vida inicia rechazo progresivo de la lactancia, vómitos repetidos tras las tomas, irritabilidad extrema seguida de estupor y convulsiones.',
      pastMedicalHistory: ['Embarazo y parto normoevolutivo'],
      medications: ['Ninguno'],
      lifestyle: 'Lactancia materna.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '60/35 mmHg',
        hr: '155 lpm',
        rr: '55 rpm (Alcalosis respiratoria por estimulación del centro respiratorio)',
        temp: '36.0 °C',
        sao2: '97%'
      },
      findings: [
        { systemName: "Neurológico", description: "Comatoso, hiporreflexia global, convulsiones clónicas focales en miembro superior derecho." },
        { systemName: "Abdomen", description: "Blando, sin organomegalias." }
      ]
    },
    initialLabWork: [
      { test: 'Gasometría Capilar Neonatal', result: 'pH: 7.50, pCO2: 28 mmHg, HCO3-: 26 mEq/L (Alcalosis respiratoria por hiperventilación central neurotóxica)', unit: '', referenceRange: 'pH 7.35-7.45; pCO2 35-45' },
      { test: 'Glucemia Capilar de Urgencias', result: '88', unit: 'mg/dL', referenceRange: '70 - 109 (Descarta hipoglucemia neonatal como causa primaria de letargia)' },
      { test: 'Urea Sérica', result: '12', unit: 'mg/dL', referenceRange: '20 - 50 (Inesperadamente baja a pesar del cuadro de deshidratación neonatal)', isAbnormal: true },
      { test: 'Iones en Sangre', result: 'Sodio 138 mEq/L, Potasio 4.5 mEq/L', unit: '', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Defecto del Ciclo de la Urea (Deficiencia de Ornitina Transcarbamilasa - OTC)',
        plausibilityRationale: 'Presentación neonatal con letargia progresiva y convulsiones tras tomas de leche, alcalosis respiratoria por hiperventilación central neurotóxica y urea sérica llamativamente disminuida.',
        isTargetDisease: true
      },
      {
        disease: 'Sepsis Neonatal Aguda',
        plausibilityRationale: 'Puede causar letargia y convulsiones, pero no justifica niveles de amonio > 300 µmol/L con urea disminuida.',
        isTargetDisease: false
      },
      {
        disease: 'Enfermedad de Jarabe de Arce (MSUD)',
        plausibilityRationale: 'Acidemia orgánica que causa encefalopatía, pero cursa con cetoacidosis marcada y olor a azúcar quemada.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Defecto del Ciclo de la Urea (Deficiencia de OTC)',
    biomarkerOptions: [
      {
        id: 'bm_opt_ammonia_urea',
        biomarkerId: 'bm_amonio_plasmatico',
        biomarkerName: 'Amonio Plasmático y Ácido Orótico Urinario / Aminoaciduria',
        isCorrect: true,
        biochemicalRationale: 'El ciclo de la urea en los hepatocitos es la única vía del organismo para eliminar el amonio neurotóxico derivado del catabolismo proteico. Un bloqueo en la enzima OTC provoca la acumulación masiva de carbamoilfosfato y amonio (>300 µmol/L), reduciendo la síntesis de urea e incrementando la excreción de ácido orótico en orina.',
        whyOptimalOrSuboptimal: 'Es la combinación de biomarcadores óptima para confirmar el defecto en el ciclo de la urea y localizar el bloqueo enzimático.'
      },
      {
        id: 'bm_opt_uric_wrong_1',
        biomarkerId: 'bm_acido_urico',
        biomarkerName: 'Ácido Úrico Sérico',
        isCorrect: false,
        biochemicalRationale: 'Producto del catabolismo de purinas.',
        whyOptimalOrSuboptimal: 'Irrelevante en el fallo primario de la eliminación del nitrógeno aminoacídico.'
      },
      {
        id: 'bm_opt_creatinine_wrong_1',
        biomarkerId: 'bm_creatinina',
        biomarkerName: 'Creatinina Sérica',
        isCorrect: false,
        biochemicalRationale: 'Marcador de filtración glomerular.',
        whyOptimalOrSuboptimal: 'Permanecerá normal en ausencia de falla renal concomintante.'
      },
      {
        id: 'bm_opt_egfr_wrong_1',
        biomarkerId: 'bm_egfr',
        biomarkerName: 'eGFR',
        isCorrect: false,
        biochemicalRationale: 'Tasa de filtrado glomerular.',
        whyOptimalOrSuboptimal: 'No evalúa la capacidad metabólica hepática del ciclo de la urea.'
      }
    ],
    expertClinicalKey: 'Un nivel de Amonio Plasmático > 150 µmol/L con Urea muy baja o normal en un paciente encefalopático es patognomónico de un Defecto del Ciclo de la Urea.',
    essentialBiomarkerIds: ['bm_amonio_plasmatico']
  },

  {
    id: 'case_renal_02',
    title: 'Ricardo N.: Dolor agudo e inflamación roja en el dedo gordo del pie',
    system: 'renal',
    difficulty: 'intermedio',
    studentSummary: 'Ricardo N., de 52 años, se despierta a medianoche con un dolor insoportable en la base del dedo gordo del pie (podagra) tras haber cenado carne roja, marisco y cerveza. La zona está roja, hinchada y caliente, tanto que ni la sábana puede rozarlo. El objetivo es comprobar que tiene el ácido úrico muy elevado en sangre y que este precipita en forma de microagujas en la articulación.',
    clinicalGlossary: [
      { term: 'Podagra', simpleDefinition: 'Inflamación aguda y extraordinariamente dolorosa de la articulación de la base del dedo gordo del pie (primera metatarsofalángica), típica del ataque agudo de gota.' },
      { term: 'Ácido úrico', simpleDefinition: 'Sustancia de desecho producida al romper las purinas (del ADN de carnes, mariscos y cerveza). Si supera 7.0 mg/dL, se vuelve insoluble.' },
      { term: 'Cristales de urato monosódico', simpleDefinition: 'Microcristales en forma de aguja que precipitan en la articulación y activan el inflamasoma de los glóbulos blancos, generando inflamación salvaje.' },
      { term: 'Xantina oxidasa', simpleDefinition: 'Enzima que cataliza el paso final de formación de ácido úrico. Es la diana que bloquea el fármaco alopurinol.' }
    ],
    biochemicalConceptSimple: '1. Exceso de purinas en la dieta + fármacos tiazídicos -> 2. La xantina oxidasa sintetiza ácido úrico por encima del umbral de saturación (>7 mg/dL) -> 3. Precipitan cristales de urato con forma de aguja en la articulación más fría (el pie) -> 4. Los neutrófilos fagocitan los cristales y liberan citoquinas proinflamatorias (ataque agudo de gota).',
    clinicalHistory: {
      patientDemographics: {
        age: 52,
        gender: 'Masculino',
        occupation: 'Empresario'
      },
      chiefComplaint: 'Dolor insoportable, eritema y calor en el dedo gordo del pie derecho.',
      presentIllness: 'Ricardo N. despierta a mitad de la noche con dolor insoportable (10/10) en la primera articulación metatarsofalángica derecha (podagra). El dolor le impide el contacto con las sábanas. Refiere ingesta abundante de carne roja y mariscos con alcohol el día previo.',
      pastMedicalHistory: ['Hipertensión arterial', 'Dislipidemia'],
      medications: ['Hidroclorotiazida 25 mg/día'],
      lifestyle: 'Consumo regular de cerveza.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '142/88 mmHg',
        hr: '84 lpm',
        rr: '16 rpm',
        temp: '37.4 °C',
        sao2: '98%'
      },
      findings: [
        { systemName: "Osteomioarticular", description: "Primera articulación metatarsofalángica derecha francamente tumefacta, eritematosa, caliente y extremadamente hiperalgésica." }
      ]
    },
    initialLabWork: [
      { test: 'Leucocitos (Hemograma)', result: '11.800', unit: '/µL', referenceRange: '4.500 - 11.000', isAbnormal: true },
      { test: 'Neutrófilos %', result: '76', unit: '%', referenceRange: '45 - 70', isAbnormal: true },
      { test: 'Glucemia en Ayunas', result: '104', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'Urea Sérica', result: '38', unit: 'mg/dL', referenceRange: '20 - 50' },
      { test: 'Iones en Sangre', result: 'Sodio 141 mEq/L, Potasio 4.1 mEq/L', unit: '', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Hiperuricemia Primaria con Crisis Aguda de Gota (Artropatía por Urato Monosódico)',
        plausibilityRationale: 'Presentación típica de podagra aguda, desencadenada por tiazidas y consumo de purinas/alcohol con función renal conservada.',
        isTargetDisease: true
      },
      {
        disease: 'Artritis Séptica',
        plausibilityRationale: 'Monoartritis aguda inflamatoria, pero la localización en 1ª MTF, antecedente dietético e hiperuricemia marcada orientan a gota.',
        isTargetDisease: false
      },
      {
        disease: 'Seudogota (Pirofosfato de Calcio)',
        plausibilityRationale: 'Suele afectar rodillas o muñecas en ancianos, con niveles normales de ácido úrico.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Hiperuricemia Primaria / Crisis Aguda de Gota',
    biomarkerOptions: [
      {
        id: 'bm_opt_uric_acid_gout',
        biomarkerId: 'bm_acido_urico',
        biomarkerName: 'Ácido Úrico Sérico y Análisis de Líquido Sinovial (Cristales de Urato Monosódico)',
        isCorrect: true,
        biochemicalRationale: 'El ácido úrico es el producto final del catabolismo de las purinas por la xantina oxidasa. Al superar la saturación plasmática (>7.0 mg/dL en varones), precipita en forma de cristales de urato monosódico needle-shaped con birrefringencia negativa en las articulaciones, desencadenando la respuesta inflamatoria.',
        whyOptimalOrSuboptimal: 'Es el biomarcador sérico óptimo para confirmar el estado de hiperuricemia predisponente a la precipitación cristalina articular.'
      },
      {
        id: 'bm_opt_ammonia_wrong_2',
        biomarkerId: 'bm_amonio_plasmatico',
        biomarkerName: 'Amonio Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Marcador del ciclo de la urea.',
        whyOptimalOrSuboptimal: 'Sin relación con la vía de degradación de las purinas.'
      },
      {
        id: 'bm_opt_creatinine_wrong_2',
        biomarkerId: 'bm_creatinina',
        biomarkerName: 'Creatinina Sérica',
        isCorrect: false,
        biochemicalRationale: 'Marcador de TFG.',
        whyOptimalOrSuboptimal: 'Útil para evaluar función renal pero no confirma la alteración metabólica de purinas.'
      },
      {
        id: 'bm_opt_egfr_wrong_2',
        biomarkerId: 'bm_egfr',
        biomarkerName: 'eGFR',
        isCorrect: false,
        biochemicalRationale: 'Filtrado glomerular.',
        whyOptimalOrSuboptimal: 'Inespecífico para la artropatía cristalina.'
      }
    ],
    expertClinicalKey: 'Un nivel de Ácido Úrico Sérico > 7.0 mg/dL en varones con monoartritis en 1ª metatarsofalángica (podagra) orienta al diagnóstico de Hiperuricemia Primaria y Gota.',
    essentialBiomarkerIds: ['bm_cristales_liquido_sinovial', 'bm_acido_urico']
  },

  {
    id: 'case_renal_03',
    title: 'Gabriel V.: Disminución brusca de orina y debilidad tras quimioterapia',
    system: 'renal',
    difficulty: 'experto',
    studentSummary: 'Gabriel V., de 61 años con un linfoma muy agresivo, recibe su primer ciclo de quimioterapia. A las 48 horas apenas puede orinar (oliguria), tiene calambres y debilidad extrema. La muerte masiva de millones de células tumorales ha liberado de golpe su ADN a la sangre, disparando el ácido úrico a 15.4 mg/dL y taponando los túbulos renales (síndrome de lisis tumoral).',
    clinicalGlossary: [
      { term: 'Síndrome de Lisis Tumoral', simpleDefinition: 'Emergencia médica causada por la destrucción simultánea de millones de células malignas tras la quimio, vertiendo su contenido celular (ácido úrico, fósforo, potasio y LDH) a la sangre.' },
      { term: 'Oliguria', simpleDefinition: 'Expulsar muy poca cantidad de orina (menos de 400 mL al día), señal de que los riñones están sufriendo un fallo agudo.' },
      { term: 'Nefropatía por cristales de urato', simpleDefinition: 'Obstrucción de los túbulos del riñón porque el ácido úrico es tan elevado que cristaliza dentro del propio riñón, impidiendo el paso de la orina.' },
      { term: 'LDH (Lactato deshidrogenasa)', simpleDefinition: 'Enzima citosólica que se multiplica por diez (>2000 U/L) cuando mueren millones de células tumorales al mismo tiempo.' }
    ],
    biochemicalConceptSimple: '1. La quimioterapia destruye masivamente células cancerosas -> 2. Se rompe el ADN de millones de células liberando purinas -> 3. El ácido úrico se dispara (>15 mg/dL) junto con el potasio, fósforo y LDH -> 4. Los cristales de urato precipitan en los túbulos renales provocando fracaso renal agudo obstructivo.',
    clinicalHistory: {
      patientDemographics: {
        age: 61,
        gender: 'Masculino',
        occupation: 'Contador'
      },
      chiefComplaint: 'Disminución drástica de la diuresis y debilidad extrema 48 horas post-quimioterapia.',
      presentIllness: 'Gabriel V., diagnosticado de Linfoma difuso de células B grandes de alta masa tumoral, inicia esquema de quimioterapia. A las 48 horas presenta oliguria severa (orina < 250 mL/24h), náuseas, calambres musculares y somnolencia.',
      pastMedicalHistory: ['Linfoma no Hodgkin de reciente diagnóstico'],
      medications: ['Esquema de quimioterapia R-CHOP'],
      lifestyle: 'No fumador.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '150/92 mmHg',
        hr: '98 lpm',
        rr: '20 rpm',
        temp: '36.9 °C',
        sao2: '96%'
      },
      findings: [
        { systemName: "General", description: "Oligúrico, edema periorbitario leve. Miotonías y signo de Chvostek positivo por hipocalcemia." }
      ]
    },
    initialLabWork: [
      { test: 'Hemograma Completo', result: 'Leucocitos 48.000 /µL (con blastos circulantes), Hb 8.4 g/dL, Plaquetas 38.000 /µL', unit: '', referenceRange: 'Normal' },
      { test: 'Creatinina Sérica', result: '3.2', unit: 'mg/dL', referenceRange: 'H: 0.7 - 1.3 (Lesión Renal Aguda brusca post-quimioterapia)', isAbnormal: true },
      { test: 'Diuresis en Urgencias', result: '< 10 mL/h en las últimas 4 horas (Oliguria crítica refractaria)', unit: 'mL/h', referenceRange: '> 40 mL/h', isAbnormal: true },
      { test: 'Electrocardiograma (ECG)', result: 'Ondas T elevadas, puntiagudas y simétricas en derivaciones precordiales (Signo de alarma de hiperpotasemia crítica por rotura celular masiva)', unit: '-', referenceRange: 'Normal', isAbnormal: true }
    ],
    differentialDiagnoses: [
      {
        disease: 'Hiperuricemia Secundaria a Síndrome de Lisis Tumoral (Nefropatía por Cristales de Urato)',
        plausibilityRationale: 'Lisis masiva celular tumoral post-quimioterapia en paciente con leucemia/linfoma de alta carga tumoral, con debut de insuficiencia renal aguda anúrica y signos ECG de toxicidad electrolítica por rotura celular.',
        isTargetDisease: true
      },
      {
        disease: 'Lesión Renal Aguda Prerrenal por Deshidratación',
        plausibilityRationale: 'Causa oliguria pero no explica los niveles masivos de ácido úrico, lisis celular (LDH > 2000 U/L) ni hiperfosfatemia severa.',
        isTargetDisease: false
      },
      {
        disease: 'Hiperuricemia Primaria (Gota)',
        plausibilityRationale: 'No presenta clínica articular y la hiperuricemia se desencadenó de forma secundaria masiva a la lisis tumoral.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Hiperuricemia Secundaria a Síndrome de Lisis Tumoral',
    biomarkerOptions: [
      {
        id: 'bm_opt_uric_ldh_tls',
        biomarkerId: 'bm_acido_urico',
        biomarkerName: 'Ácido Úrico Sérico con LDH y Perfil de Electrolitos (Fósforo/Potasio)',
        isCorrect: true,
        biochemicalRationale: 'La lisis acelerada de células malignas libera masivamente ácidos nucleicos que son catabolizados a ácido úrico. Niveles de ácido úrico > 8.0 mg/dL (o incremento del 25%) junto a elevación masiva de LDH (>2000 U/L), hiperpotasemia e hiperfosfemia inducen la precipitación de urato en los túbulos colectores, causando falla renal aguda obstructiva.',
        whyOptimalOrSuboptimal: 'Es la combinación diagnóstica óptima para confirmar el Síndrome de Lisis Tumoral e Hiperuricemia Secundaria.'
      },
      {
        id: 'bm_opt_ammonia_wrong_3',
        biomarkerId: 'bm_amonio_plasmatico',
        biomarkerName: 'Amonio Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Marcador del ciclo de la urea.',
        whyOptimalOrSuboptimal: 'No es el producto primario de la lisis purínica masiva por quimioterapia.'
      },
      {
        id: 'bm_opt_urea_wrong_3',
        biomarkerId: 'bm_urea',
        biomarkerName: 'Urea Sérica aislada',
        isCorrect: false,
        biochemicalRationale: 'Marcador de azemia.',
        whyOptimalOrSuboptimal: 'Incapaz de caracterizar el origen metabólico tumoral purínico de la falla renal.'
      },
      {
        id: 'bm_opt_egfr_wrong_3',
        biomarkerId: 'bm_egfr',
        biomarkerName: 'eGFR',
        isCorrect: false,
        biochemicalRationale: 'Tasa de filtrado.',
        whyOptimalOrSuboptimal: 'Muestra el grado de insuficiencia renal pero no identifica la causa por uratos.'
      }
    ],
    expertClinicalKey: 'La Hiperuricemia Secundaria en el Síndrome de Lisis Tumoral se diferencia de la primaria por niveles masivos de Ácido Úrico (>15 mg/dL) acompañados de elevación simultánea de LDH, Fósforo y Potasio con Lesión Renal Aguda.',
    essentialBiomarkerIds: ['bm_acido_urico', 'bm_ldh']
  },

  // ==========================================
  // CASOS PANCREÁTICOS
  // ==========================================
  {
    id: 'case_pancreatic_01',
    title: 'Andrés K.: Dolor fuerte de estómago en cinturón y sangre lechosa',
    system: 'pancreatic',
    difficulty: 'avanzado',
    studentSummary: 'Andrés K., transportista de 44 años con diabetes y triglicéridos descontrolados, llega retorciéndose con un dolor tremendo en la boca del estómago que le traspasa la espalda como un cinturón. Al sacarle sangre para los análisis, el tubo no es transparente sino blanco y espeso como leche desnatada (suero lechoso por triglicéridos > 1800 mg/dL). El objetivo es comprobar que este exceso extremo de grasa ha inflamado su páncreas (pancreatitis aguda) y medir la lipasa pancreática.',
    clinicalGlossary: [
      { term: 'Dolor en cinturón', simpleDefinition: 'Dolor punzante y continuo en la boca del estómago (epigastrio) que se extiende hacia ambos costados y la espalda, muy típico de la inflamación del páncreas.' },
      { term: 'Suero lactescente / lipémico', simpleDefinition: 'Sangre con aspecto lechoso u opaco debido a la presencia masiva de quilomicrones y triglicéridos (>1000 mg/dL).' },
      { term: 'Lipasa sérica', simpleDefinition: 'Enzima digestiva exclusiva del páncreas. Si el tejido pancreático se inflama, la lipasa se triplica o cuadruplica en sangre (>3 veces el límite normal).' },
      { term: 'Interferencia por lipemia', simpleDefinition: 'Cuando la sangre es tan lechosa que las máquinas de laboratorio ópticas no pueden medir bien ciertas pruebas (como la amilasa, que puede salir falsamente baja).' }
    ],
    biochemicalConceptSimple: '1. Triglicéridos extremos (> 1800 mg/dL) saturan los vasos del páncreas -> 2. La lipasa rompe esos triglicéridos liberando ácidos grasos libres tóxicos -> 3. Los ácidos grasos destruyen las células del páncreas -> 4. Se desata una autodigestión e inflamación del órgano (pancreatitis) -> 5. La lipasa se escapa a la circulación en cifras altísimas (> 900 U/L).',
    clinicalHistory: {
      patientDemographics: {
        age: 44,
        gender: 'Masculino',
        occupation: 'Transportista'
      },
      chiefComplaint: 'Dolor atroz en boca del estómago irradiado a la espalda, náuseas, vómitos incesantes y suero sanguíneo de aspecto lechoso.',
      presentIllness: 'Andrés K. acude a urgencias tras inicio súbito hace 10 horas de dolor epigástrico atroz (10/10) irradiado en cinturón hacia ambos flancos y región lumbar. En la extracción de sangre de urgencias, el analista constata que el plasma tiene aspecto lechoso opalescente.',
      pastMedicalHistory: ['Dislipidemia Mixta grave con deficiente adherencia farmacológica', 'Diabetes Mellitus Tipo 2 mal controlada (HbA1c 9.8%)', 'Esteatosis Hepática no alcohólica'],
      medications: ['Metformina 1000 mg/12h', 'Fenofibrato 160 mg (discontinuado voluntariamente hace 4 meses)'],
      lifestyle: 'Dieta rica en grasas saturadas y carbohidratos refinados. Sedentarismo. Sin consumo de alcohol.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '138/88 mmHg',
        hr: '112 lpm',
        rr: '24 rpm',
        temp: '37.9 °C',
        sao2: '96%'
      },
      findings: [
        { systemName: "Abdomen", description: "Distendido, dolor intenso a la palpación en epigastrio y ambos hipocondrios con defensa muscular voluntaria. Ruidos hidroaéreos abolidos (íleo paralítico secundario)." },
        { systemName: "Piel y Faneras", description: "Pápulas amarillentas eritematosas eruptivas en codos y glúteos (Xantomas eruptivos característicos de hiperquilomicronemia)." }
      ]
    },
    initialLabWork: [
      { test: 'Inspección del Suero / Plasma', result: 'Francamente Lactescente (Aspecto lechoso / turbio "crema de leche" tras centrifugación de urgencias)', unit: '', referenceRange: 'Límpido / Transparente', isAbnormal: true },
      { test: 'Hemograma', result: 'Leucocitos 15.400 /µL (Neutrofilia 84%), Hb 15.2 g/dL (hemoconcentración)', unit: '', referenceRange: 'Leucocitos 4.500 - 11.000', isAbnormal: true },
      { test: 'Glucemia en Urgencias', result: '245', unit: 'mg/dL', referenceRange: '70 - 109 (Hiperglucemia reactiva por estrés)', isAbnormal: true },
      { test: 'Creatinina Sérica', result: '1.1', unit: 'mg/dL', referenceRange: '0.7 - 1.3' },
      { test: 'Radiografía Simple de Abdomen', result: 'Íleo paralítico reflejo en cuadrante superior izquierdo (asa centinela), sin neumoperitoneo', unit: '', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Pancreatitis Aguda Secundaria a Hipertrigliceridemia Extrema (Síndrome de Quilomicronemia / Dislipidemia FVII)',
        plausibilityRationale: 'Dolor epigástrico en cinturón tras trasgresión dietética en paciente con diabetes y xantomas eruptivos, con suero francamente lechoso a simple vista por quilomicrones masivos.',
        isTargetDisease: true
      },
      {
        disease: 'Pancreatitis Aguda Biliar / Litiásica',
        plausibilityRationale: 'Causa más frecuente de pancreatitis, pero no cursa con suero lactescente, xantomas ni triglicéridos > 1800 mg/dL.',
        isTargetDisease: false
      },
      {
        disease: 'Cetoacidosis Diabética con Dolor Abdominal Secundario',
        plausibilityRationale: 'Explica la hiperglucemia descompensada y el dolor abdominal, pero la Lipasa > 900 U/L y el suero lechoso con pancreatitis en TAC confirman el cuadro primario pancreático.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Pancreatitis Aguda Hipertrigliceridémica',
    biomarkerOptions: [
      {
        id: 'bm_opt_lipase_tg_hypertri',
        biomarkerId: 'bm_trigliceridos',
        biomarkerName: 'Lipasa Sérica (> 3x LSN) y Triglicéridos Séricos en Ayunas (> 1.000 mg/dL con Suero Lactescente)',
        isCorrect: true,
        biochemicalRationale: 'La elevación masiva de Triglicéridos (> 1000 mg/dL) satura la lipoproteinlipasa (LPL) intestinal y vascular, acumulando quilomicrones en los capilares pancreáticos. La lipasa acinar hidroliza estos triglicéridos liberando altas concentraciones de Ácidos Grasos Libres (AGL) no esterificados. Los AGL generan toxicidad directa en la membrana acinar, acidosis microvascular, agregación plaquetaria e isquemia local, desencadenando pancreatitis necrotizante. Además, la lipemia extrema distorsiona el ensayo de Amilasa (dando falsos negativos espectrofotométricos), convirtiendo a la Lipasa Sérica + Triglicéridos en la combinación diagnóstica fundamental.',
        whyOptimalOrSuboptimal: 'Es la combinación diagnóstica óptima que confirma simultáneamente el daño celular acinar pancreático y la causa etiológica metabólica por hipertrigliceridemia extrema.'
      },
      {
        id: 'bm_opt_alt_panc_w',
        biomarkerId: 'bm_alt',
        biomarkerName: 'Alanina Aminotransferasa (ALT) y Bilirrubina Total',
        isCorrect: false,
        biochemicalRationale: 'Enzimas de colestasis o patología biliar obstructive.',
        whyOptimalOrSuboptimal: 'Son útiles para diagnosticar pancreatitis biliar, pero resultan normales o inespecíficas en la hipertrigliceridemia pura.'
      },
      {
        id: 'bm_opt_elastasa_panc_w',
        biomarkerId: 'bm_elastasa_fecal',
        biomarkerName: 'Elastasa-1 Fecal',
        isCorrect: false,
        biochemicalRationale: 'Marcador de reservorio funcional pancreático exocrino en materia fecal.',
        whyOptimalOrSuboptimal: 'Inadecuado en fase aguda; su indicación es el cribado de insuficiencia pancreática exocrina en pancreatitis crónica.'
      },
      {
        id: 'bm_opt_ldh_panc_w',
        biomarkerId: 'bm_ldh',
        biomarkerName: 'LDH y Amilasa aislada',
        isCorrect: false,
        biochemicalRationale: 'La amilasa sufre interferencia química espectrofotómica por turbidez en presencia de hipertrigliceridemia severa.',
        whyOptimalOrSuboptimal: 'Puede arrojar un falso resultado normal o discretamente elevado en sueros marcadamente lipémicos.'
      }
    ],
    expertClinicalKey: 'La Hipertrigliceridemia Extrema (> 1.000 mg/dL) representa la 3ª causa más frecuente de Pancreatitis Aguda. El mecanismo bioquímico patogénico radica en la hidrólisis acinar de triglicéridos con liberación masiva de Ácidos Grasos Libres (AGL) tóxicos que inducen isquemia y necrosis microvascular. La lipemia severa (suero lechoso) interfiere en la medición espectrofotométrica de Amilasa (causando falsos negativos), por lo que la Lipasa Sérica junta con los Triglicéridos es la prueba confirmatoria.',
    essentialBiomarkerIds: ['bm_lipasa', 'bm_trigliceridos']
  },
  {
    id: 'case_pancreatic_02',
    title: 'Dolores M.: Hormigueo en manos y pies con cansancio persistente',
    system: 'pancreatic',
    difficulty: 'avanzado',
    studentSummary: 'Dolores M., mujer jubilada de 67 años, lleva 7 años tomando omeprazol todos los días para el ardor de estómago. Consulta por cansancio continuo, hormigueo como alfileres en manos y pies (parestesias) y calambres involuntarios. Al quitar por completo el ácido del estómago durante años, su cuerpo ha dejado de absorber la vitamina B12 (dando glóbulos rojos gigantes o macrocitosis) y el magnesio. El objetivo es identificar este doble déficit nutricional.',
    clinicalGlossary: [
      { term: 'Aclorhidria / Falta de ácido gástrico', simpleDefinition: 'Ausencia de ácido clorhídrico en el estómago por el bloqueo continuado del omeprazol. Sin ácido, la vitamina B12 no puede soltarse de los alimentos para absorberse.' },
      { term: 'Anemia macrocítica (VCM > 100 fL)', simpleDefinition: 'Anemia con glóbulos rojos de tamaño anormalmente grande producida por la falta de vitamina B12, necesaria para duplicar el ADN celular.' },
      { term: 'Parestesias', simpleDefinition: 'Sensación de adormecimiento, acorchamiento u hormigueo en manos y pies por daño en las vainas de mielina de los nervios.' },
      { term: 'Hipomagnesemia por IBP', simpleDefinition: 'Baja concentración de magnesio en sangre porque el omeprazol bloquea los canales intestinales TRPM6 encargados de absorberlo.' }
    ],
    biochemicalConceptSimple: '1. Omeprazol crónico bloquea la bomba de protones -> 2. Cero ácido gástrico: la pepsina no libera la vitamina B12 -> 3. Se altera la síntesis de ADN en la médula ósea dando anemia megaloblástica y afectación neurológica -> 4. Se bloquean los canales de magnesio TRPM6 causando calambres musculares (tetania).',
    clinicalHistory: {
      patientDemographics: {
        age: 67,
        gender: 'Femenino',
        occupation: 'Jubilada'
      },
      chiefComplaint: 'Calambres dolorosos en manos y pies, adormecimiento peribucal, astenia progresiva y palpitaciones.',
      presentIllness: 'Dolores M., tratada de forma ininterrumpida con Omeprazol 40 mg/día desde hace 7 años por reflujo, consulta por 4 meses de cansancio marcado, debilidad generalizada, entumecimiento simétrico en manos y pies y calambres involuntarios en pantorrillas.',
      pastMedicalHistory: ['Enfermedad por Reflujo Gastroesofágico (ERGE)', 'Osteopenia senil'],
      medications: ['Omeprazol 40 mg/24h (sin interrupción durante 7 años)', 'Carbonato de Calcio 500 mg/24h'],
      lifestyle: 'No fumadora. Dieta mediterránea equilibrada.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '138/84 mmHg',
        hr: '92 lpm',
        rr: '18 rpm',
        temp: '36.5 °C',
        sao2: '97%'
      },
      findings: [
        { systemName: "General", description: "Palidez cutáneo-mucosa moderada. Glositis atrófica leve con lengua depapilada." },
        { systemName: "Neurológico", description: "Signo de Chvostek positivo (espasmo de la musculatura facial al percutir el nervio facial). Signo de Trousseau positivo (espasmo carpopedal espástico tras insuflar el manguito de tensión por encima de la PAS durante 3 min). Parestesias en guante y calcetín." }
      ]
    },
    initialLabWork: [
      { test: 'Hemoglobina', result: '9.6', unit: 'g/dL', referenceRange: '12.0 - 15.5' },
      { test: 'Volumen Corpuscular Medio (VCM)', result: '106', unit: 'fL', referenceRange: '80 - 100' },
      { test: 'Calcio Sérico Total', result: '7.4', unit: 'mg/dL', referenceRange: '8.5 - 10.5' },
      { test: 'Frotis de Sangre Periférica', result: 'Neutrófilos hipersegmentados y megaloblastos', unit: '', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Malabsorción Múltiple Nutricional (Anemia Megaloblástica por Déficit de B12 e Hipocalcemia Sintomática por Hipomagnesemia Secundaria a IBP / Omeprazol)',
        plausibilityRationale: 'Concordancia absoluta con la inhibición crónica de la acidez gástrica por Omeprazol, que impide la separación de la B12 alimentaria (macrocitosis) y bloquea los canales TRPM6/7 intestinales de magnesio, causando supresión de PTH e hipocalcemia sintomática (Trousseau/Chvostek positivos).',
        isTargetDisease: true
      },
      {
        disease: 'Síndrome de Malabsorción por Insuficiencia Pancreática Crónica',
        plausibilityRationale: 'Puede generar malabsorción de vitaminas liposolubles, pero suele cursar con esteatorrea franca y la hipoclorhidria no es su causa.',
        isTargetDisease: false
      },
      {
        disease: 'Hipoparateroidismo Primario Autoinmune',
        plausibilityRationale: 'Explica la hipocalcemia con Trousseau positivo, pero no justifica la anemia macrocítica por déficit de vitamina B12 ni se relaciona con el Omeprazol.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Malabsorción Nutricional Secundaria a Uso Crónico de Omeprazol (IBP)',
    biomarkerOptions: [
      {
        id: 'bm_opt_b12_mg_omeprazol',
        biomarkerId: 'bm_vitamina_b12',
        biomarkerName: 'Vitamina B12 Sérica (< 150 pg/mL) y Magnesio Sérico (< 1.1 mg/dL) junto a Gastrina Elevada',
        isCorrect: true,
        biochemicalRationale: 'La aclorhidria inducida por el Omeprazol bloquea la escisión péptica de la vitamina B12 (generando anemia macrocítica y parestesias) e inhabilita los canales epiteliales TRPM6 de magnesio. La hipomagnesemia profunda subsecuente induce resistencia periférica y supresión de la secreción de Paratohormona (PTH), generando una hipocalcemia refractaria con tetania (signos de Chvostek y Trousseau positivos). La falta de ácido gástrico desinhibe el asa antral elevando la Gastrina.',
        whyOptimalOrSuboptimal: 'Es el perfil metabólico discriminatorio que confirma las dos secuelas nutricionales clásicas del bloqueo farmacológico prolongado de la bomba de protones.'
      },
      {
        id: 'bm_opt_lipase_omep_w',
        biomarkerId: 'bm_lipasa',
        biomarkerName: 'Lipasa Sérica',
        isCorrect: false,
        biochemicalRationale: 'Marcador de autodigestión acinar pancreática.',
        whyOptimalOrSuboptimal: 'Resultará normal ya que el páncreas exocrino no está inflamado agudamente.'
      },
      {
        id: 'bm_opt_alt_omep_w',
        biomarkerId: 'bm_alt',
        biomarkerName: 'ALT / AST Transaminasas',
        isCorrect: false,
        biochemicalRationale: 'Enzimas de citolisis hepática.',
        whyOptimalOrSuboptimal: 'No aportan información sobre el defecto de absorción gástrico ni neuromuscular iatrogénico.'
      },
      {
        id: 'bm_opt_urea_omep_w',
        biomarkerId: 'bm_creatinina',
        biomarkerName: 'Creatinina Sérica y eGFR',
        isCorrect: false,
        biochemicalRationale: 'Función de filtrado renal.',
        whyOptimalOrSuboptimal: 'Util en evaluar insuficiencia renal, pero no determina la deficiencia de cobalamina ni la hipomagnesemia digestiva.'
      }
    ],
    expertClinicalKey: 'El consumo prolongado de Inhibidores de la Bomba de Protones (Omeprazol) inhibe la acidez gástrica reduciendo la absorción de Vitamina B12 (anemia macrocítica) e interfiere con los canales intestinales TRPM6/7 de Magnesio. La hipomagnesemia consecuente causa bloqueo funcional de la PTH y genera hipocalcemia sintomática (Trousseau y Chvostek positivos).'
  },
  {
    id: 'case_pancreatic_03',
    title: 'Laura C.: Cansancio continuo, tripa hinchada y digestiones pesadas',
    system: 'pancreatic',
    difficulty: 'intermedio',
    studentSummary: 'Laura C., abogada de 29 años con antecedentes de tiroiditis autoinmune, consulta porque lleva meses con anemia por falta de hierro que no mejora con pastillas, digestiones muy pesadas tras comer pan o pasta, diarreas frecuentes y llagas en la boca (aftas). El objetivo es sospechar enfermedad celíaca: el gluten inflama y aplana las vellosidades del intestino impidiendo absorber el hierro.',
    clinicalGlossary: [
      { term: 'Anemia refractaria al hierro oral', simpleDefinition: 'Tener el hierro y la hemoglobina bajos a pesar de tomar suplementos de hierro en pastillas durante meses. Significa que el problema no es la falta de hierro, sino que el intestino no puede absorberlo.' },
      { term: 'Atrofia de vellosidades intestinales', simpleDefinition: 'Pérdida de los "pelitos" microscópicos del intestino delgado (vellosidades) donde se absorben los nutrientes, provocada por una reacción autoinmune al gluten.' },
      { term: 'Anticuerpos Anti-Transglutaminasa (tTG-IgA)', simpleDefinition: 'Anticuerpo que produce el sistema inmune contra la enzima transglutaminasa en presencia de gluten. Es la prueba reina para diagnosticar celiaquía.' },
      { term: 'Ferritina sérica', simpleDefinition: 'Proteína que almacena el hierro en el cuerpo. Cifras inferiores a 15 ng/mL demuestran que las reservas de hierro están vacías.' }
    ],
    biochemicalConceptSimple: '1. Ingesta de gluten (gliadina) -> 2. La enzima tisular transglutaminasa modifica la gliadina -> 3. El sistema inmune ataca la mucosa del duodeno destruyendo las vellosidades -> 4. Se bloquea la absorción del hierro y vitaminas liposolubles -> 5. Se produce anemia ferropénica refractaria y distensión abdominal.',
    clinicalHistory: {
      patientDemographics: {
        age: 29,
        gender: 'Femenino',
        occupation: 'Abogada'
      },
      chiefComplaint: 'Heces blandas frecuentes, distensión abdominal postprandial, aftas bucales y astenia marcadas.',
      presentIllness: 'Laura C. es derivada tras 6 meses de tratamiento oral con hierro por anemia sin conseguir que suba su ferritina ni hemoglobina. Refiere desde hace más de 1 año hinchazón de barriga, digestiones pesadas tras comer pan y pastas, diarreas y llagas en la boca.',
      pastMedicalHistory: ['Tiroiditis de Hashimoto (en tratamiento sustitutivo)', 'Dermatitis leve'],
      medications: ['Levotiroxina 75 mcg/24h', 'Sulfato Ferroso 80 mg/12h (sin respuesta)'],
      lifestyle: 'Alimentación variada. Nulo consumo de tabaco y alcohol.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '112/72 mmHg',
        hr: '80 lpm',
        rr: '16 rpm',
        temp: '36.6 °C',
        sao2: '98%'
      },
      findings: [
        { systemName: "General", description: "Habitus delgado (IMC 18.2 kg/m²). Palidez cutáneo-mucosa e ictericia ausente." },
        { systemName: "Abdomen", description: "Distendido globalmente, timpanizado a la percusión, blando e indoloro a la palpación profunda, sin visceromegalias." }
      ]
    },
    initialLabWork: [
      { test: 'Hemoglobina', result: '10.1', unit: 'g/dL', referenceRange: '12.0 - 15.5' },
      { test: 'Volumen Corpuscular Medio (VCM)', result: '71', unit: 'fL', referenceRange: '80 - 100' },
      { test: 'Ferritina Sérica', result: '6', unit: 'ng/mL', referenceRange: '15 - 150' },
      { test: '25-OH Vitamina D3', result: '12', unit: 'ng/mL', referenceRange: '30 - 100' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Enfermedad Celíaca del Adulto con Enteropatía Atrófica Duodeno-Yeyunal y Síndrome de Malabsorción',
        plausibilityRationale: 'La atrofia de las vellosidades duodenales provocada por la respuesta autoinmune al gluten destruye la zona de mayor absorción activa de hierro y calcio, explicando la anemia ferropénica refractaria al hierro oral, la deficiencia de Vitamina D3 y la diarrea con distensión.',
        isTargetDisease: true
      },
      {
        disease: 'Síndrome de Intestino Irritable con Predominio de Diarrea (SII-D)',
        plausibilityRationale: 'Explica los síntomas de distensión y cambios en ritmo intestinal, pero no justifica la anemia ferropénica orgánica severa ni la pérdida de peso.',
        isTargetDisease: false
      },
      {
        disease: 'Insuficiencia Pancreática Exocrina por Pancreatitis Crónica',
        plausibilityRationale: 'Causa malabsorción y esteatorrea, pero la absorción de hierro inorgánico en duodeno depende de la mucosa y no de enzimas pancreáticas.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Enfermedad Celíaca del Adulto',
    biomarkerOptions: [
      {
        id: 'bm_opt_ttg_iga_celiac',
        biomarkerId: 'bm_ttg_iga',
        biomarkerName: 'Anticuerpos Anti-Transglutaminasa Tisular IgA (tTG-IgA > 100 U/mL) e IgA Sérica Total',
        isCorrect: true,
        biochemicalRationale: 'El tTG-IgA es el marcador de elección con sensibilidad y especificidad >98% para Enfermedad Celíaca. La respuesta inmune contra la tTG2 en presencia de gliadina atrofia las vellosidades duodenales (sitio primario de absorción de hierro, calcio y folato), causando anemia ferropénica refractaria al tratamiento oral. Es fundamental medir la IgA total para descartar falsos negativos por déficit selectivo de IgA.',
        whyOptimalOrSuboptimal: 'Es el biomarcador serológico no invasivo óptimo para diagnosticar la enteropatía sensible al gluten y guiar la biopsia duodenal.'
      },
      {
        id: 'bm_opt_elastasa_celiac_w',
        biomarkerId: 'bm_elastasa_fecal',
        biomarkerName: 'Elastasa-1 Fecal',
        isCorrect: false,
        biochemicalRationale: 'Evalúa la capacidad secretora acinar del páncreas.',
        whyOptimalOrSuboptimal: 'Suele ser normal en la celiaquía ya que la alteración es mucosal duodenal y no de la reserva exocrina pancreática.'
      },
      {
        id: 'bm_opt_lipasa_celiac_w',
        biomarkerId: 'bm_lipasa',
        biomarkerName: 'Lipasa Sérica',
        isCorrect: false,
        biochemicalRationale: 'Enzima de inflamación pancreática agudizada.',
        whyOptimalOrSuboptimal: 'Incapaz de evaluar atrofia vellositaria o malabsorción serológica por gluten.'
      },
      {
        id: 'bm_opt_alt_celiac_w',
        biomarkerId: 'bm_alt',
        biomarkerName: 'ALT / AST Transaminasas',
        isCorrect: false,
        biochemicalRationale: 'Indicadores de lesión hepatocelular.',
        whyOptimalOrSuboptimal: 'Pueden presentar leve hipertransaminasemia reactiva celíaca pero no confirman la especificidad diagnóstica de la enteropatía.'
      }
    ],
    expertClinicalKey: 'Ante una anemia ferropénica refractaria al hierro oral en un adulto joven con síntomas digestivos o antecedentes autoinmunes (Tiroiditis de Hashimoto), el tamizaje serológico primario de elección es el anticuerpo Anti-Transglutaminasa Tisular IgA (tTG-IgA) junto a la determinación de IgA Total sérica.'
  },
  // ==========================================
  // CASOS NEUROMUSCULARES Y SEÑALIZACIÓN CELULAR
  // ==========================================
  {
    id: 'case_neuromuscular_01',
    title: 'Dra. Sofía R.: Párpados caídos y visión doble al final de la jornada',
    system: 'neuromuscular',
    difficulty: 'intermedio',
    studentSummary: 'La Dra. Sofía R., médico residente de 28 años, consulta porque al final de sus guardias de 24 horas no puede mantener los ojos abiertos (párpados caídos o ptosis) y ve doble. Al masticar alimentos duros se le cansa la mandíbula, pero tras dormir se levanta con fuerza normal. Sus propios anticuerpos están destruyendo los receptores de acetilcolina en sus músculos (miastenia gravis).',
    clinicalGlossary: [
      { term: 'Ptosis y Diplopía', simpleDefinition: 'Caída de los párpados superiores y visión doble causada por la fatiga de los músculos que mueven los ojos.' },
      { term: 'Receptor nicotínico de acetilcolina', simpleDefinition: 'Canal iónico activado por ligando. Cuando la acetilcolina se une a él, se abre y deja entrar iones sodio para que el músculo se contraiga.' },
      { term: 'Anticuerpos Anti-AChR', simpleDefinition: 'Autoanticuerpos que se pegan a los receptores musculares bloqueándolos y destruyéndolos.' },
      { term: 'Prueba del hielo', simpleDefinition: 'Poner una bolsa de hielo sobre el ojo caído durante 2 minutos: el frío frena la enzima que destruye la acetilcolina, abriendo el párpado de forma inmediata.' }
    ],
    biochemicalConceptSimple: '1. El nervio libera acetilcolina a la placa motora -> 2. Los autoanticuerpos anti-AChR han destruido la mayoría de receptores nicotínicos -> 3. No entra suficiente sodio a la célula muscular para generar potencial de acción -> 4. El músculo se agota rápidamente con el uso repetido.',
    categoryDocente: 'cell_signaling',
    signalingType: 'ligand_gated_ion_channel',
    molecularPathway: 'Acetilcolina → receptor nicotínico → entrada de cationes → despolarización',
    molecularAlteration: 'Disminución de receptores nicotínicos funcionales',
    clinicalHistory: {
      patientDemographics: {
        age: 28,
        gender: 'Femenino',
        occupation: 'Médico Residente (R1 de Medicina Interna)'
      },
      chiefComplaint: 'Ptosis palpebral bilateral asimétrica y diplopía fluctuante de empeoramiento vespertino tras las guardias.',
      presentIllness: 'La Dra. Sofía R. consulta por fatiga ocular y debilidad muscular progresiva de 6 semanas de evolución. Por las mañanas se despierta asintomática, pero al final de la jornada laboral o durante guardias no puede mantener los ojos abiertos (ptosis) y ve doble (diplopía). Los síntomas mejoran notablemente tras el reposo o periodos de sueño.',
      pastMedicalHistory: ['Tiroiditis autoinmune de Hashimoto en tratamiento sustitutivo', 'Sin antecedentes de esclerosis múltiple ni traumatismos craneales'],
      medications: ['Levotiroxina 75 μg/día en ayunas'],
      lifestyle: 'No fumadora. Consumo ocasional de café durante las guardias. Jornadas con elevado estrés físico y turnos prolongados.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '118/76 mmHg',
        hr: '72 lpm',
        rr: '14 rpm',
        temp: '36.6 °C',
        sao2: '99% aire ambiente'
      },
      findings: [
        {
          systemName: 'Pares Craneales y Examen Ocular',
          description: 'Ptosis palpebral derecha manifiesta tras mirada sostenida superior durante 60 segundos (fatigabilidad patológica). Prueba del hielo positiva (elevación de >2 mm de la hendidura palpebral tras 2 minutos de aplicación de hielo local). Diplopía a la mirada lateral extrema. Pupilas isocóricas y normorreactivas sin defecto pupilar aferente.'
        },
        {
          systemName: 'Musculoesquelético y Neurológico Motor',
          description: 'Fuerza proximal en extremidades superiores 4+/5 que declina con el esfuerzo repetido y se recupera tras 2 minutos de reposo. Reflejos osteotendinosos conservados (+2/4) simétricos. Sensibilidad táctil y algésica normal.'
        }
      ]
    },
    initialLabWork: [
      { test: 'TSH Sérica', result: '2.10', unit: 'mUI/L', referenceRange: '0.40 - 4.00 (Descarta hipotiroidismo o tiroiditis autoinmune activa)' },
      { test: 'T4 Libre', result: '1.24', unit: 'ng/dL', referenceRange: '0.80 - 1.80' },
      { test: 'Hemograma Completo', result: 'Leucocitos 6.400 /µL, Hemoglobina 13.8 g/dL', unit: '', referenceRange: 'Normal' },
      { test: 'Electromiografía (Estimulación Repetitiva a 3 Hz)', result: 'Decremento patológico > 12% en la amplitud del potencial de acción muscular compuesto (CMAP)', unit: '%', referenceRange: '< 10% de decremento' },
      { test: 'TC Torácica con Contraste', result: 'Hiperplasia tímica linfoide sin evidencia de timoma invasivo ni masas mediastínicas', unit: '-', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Miastenia Gravis',
        plausibilityRationale: 'Concordancia perfecta con fatiga muscular patológica fluctuante de predominio vespertino, afectación oculomotora (ptosis y diplopía) que mejora con reposo y prueba del hielo, test decrementador positivo y terreno autoinmune previo.',
        isTargetDisease: true
      },
      {
        disease: 'Síndrome Miasténico de Lambert-Eaton',
        plausibilityRationale: 'Trastorno de la unión neuromuscular presináptica, pero típicamente afecta a miembros inferiores, mejora paradójicamente tras el ejercicio breve (facilitación) y asocia abolición de reflejos rotulianos y disautonomía (boca seca), ausentes en esta paciente.',
        isTargetDisease: false
      },
      {
        disease: 'Miopatía Mitocondrial (Oftalmoplejía Externa Progresiva)',
        plausibilityRationale: 'Cursa con ptosis y limitación ocular simétrica, pero la debilidad es fija y no fluctuante con el reposo diario, no responde a inhibidores de la colinesterasa ni presenta decremento en la electromiografía.',
        isTargetDisease: false
      },
      {
        disease: 'Esclerosis Múltiple (Forma Brote-Remisión)',
        plausibilityRationale: 'Puede cursar con diplopía y fatiga en mujeres jóvenes, pero suele presentar alteraciones pupilares (neuritis óptica con dolor), síntomas sensitivos/piramidales persistentes durante días y lesiones desmielinizantes en resonancia magnética cerebral.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Miastenia Gravis',
    biomarkerOptions: [
      {
        id: 'bm_opt_achr_ab',
        biomarkerId: 'bm_achr_ab',
        biomarkerName: 'Anticuerpos Anti-Receptor de Acetilcolina (AChR-Ab)',
        isCorrect: true,
        biochemicalRationale: 'Los autoanticuerpos frente al receptor nicotínico de acetilcolina (AChR-Ab) provocan la lisis de la membrana postsináptica mediada por complemento, aceleran la endocitosis y degradación del receptor (modulación antigénica) y bloquean el sitio de fijación del ligando. Esto reduce drásticamente el número de receptores nicotínicos funcionales en la placa motora, disminuyendo el potencial de placa terminal (EPP) por debajo del umbral para abrir los canales de sodio voltaje-dependientes.',
        whyOptimalOrSuboptimal: 'Es el biomarcador serológico de elección de máxima especificidad (>99%) y alta sensibilidad (~85%) para confirmar la Miastenia Gravis y evidenciar la alteración del receptor acoplado a canal iónico dependiente de ligando.'
      },
      {
        id: 'bm_opt_anti_vgcc_distractor',
        biomarkerId: 'bm_anti_vgcc',
        biomarkerName: 'Anticuerpos Anti-Canales de Calcio Dependientes de Voltaje (Anti-VGCC)',
        isCorrect: false,
        biochemicalRationale: 'Autoanticuerpos dirigidos contra los canales Cav2.1 presinápticos que inhiben el influjo de calcio y la exocitosis cuántica de vesículas de acetilcolina.',
        whyOptimalOrSuboptimal: 'Es el biomarcador característico del Síndrome de Lambert-Eaton (defecto presináptico), no de la Miastenia Gravis (defecto postsináptico de canales iónicos activados por ligando).'
      },
      {
        id: 'bm_opt_ck_distractor',
        biomarkerId: 'bm_ck_total',
        biomarkerName: 'Creatina Quinasa Sérica Total (CK)',
        isCorrect: false,
        biochemicalRationale: 'Enzima citosólica miocítica indicadora de rotura del sarcolema en distrofias, miopatías inflamatorias o rabdomiólisis.',
        whyOptimalOrSuboptimal: 'En la miastenia gravis la arquitectura de la fibra muscular está íntegra y el defecto es puramente neuroquímico/molecular en la señalización del canal, por lo que la CK es estrictamente normal.'
      },
      {
        id: 'bm_opt_alt_distractor',
        biomarkerId: 'bm_alt',
        biomarkerName: 'Transaminasas Hepáticas (ALT/AST)',
        isCorrect: false,
        biochemicalRationale: 'Biomarcadores enzimáticos de daño citopático hepatocelular sin valor diagnóstico en patología neuromuscular.',
        whyOptimalOrSuboptimal: 'No guardan relación con la placa motora ni con la cinética de neurotransmisores colinérgicos.'
      }
    ],
    expertClinicalKey: 'Perla de Señalización Celular: La sinapsis neuromuscular representa el modelo canónico de receptor ionotrópico o canal iónico regulado por ligando. La fijación de acetilcolina abre el canal nicotínico permitiendo la entrada de Na+ que genera el potencial de placa terminal (EPP). En la Miastenia Gravis, los anticuerpos anti-AChR destruyen estos receptores, reduciendo el margen de seguridad de la transmisión. Los fármacos anticolinesterásicos (piridostigmina) inhiben la degradación de acetilcolina en la hendidura sináptica, prolongando su disponibilidad y maximizando la activación de los receptores residuales.',
    essentialBiomarkerIds: ['bm_achr_ab']
  },
  {
    id: 'case_metabolic_signaling_01',
    title: 'Carlos D.: Diarrea líquida abundante como agua de arroz y sed extrema',
    system: 'metabolic',
    difficulty: 'intermedio',
    studentSummary: 'Carlos D., médico cooperante de 34 años de regreso de una misión humanitaria, sufre una diarrea acuosa blanquecina masiva e inagotable (aspecto en "agua de arroz") que le hace perder litros de agua en pocas horas. Llega en estado de shock por deshidratación crítica. La toxina del cólera ha modificado químicamente una proteína de señalización celular (proteína Gs), dejándola permanentemente "encendida" y obligando a las células del intestino a verter agua y sales sin control.',
    clinicalGlossary: [
      { term: 'Diarrea en "agua de arroz"', simpleDefinition: 'Diarrea líquida, blanquecina, no sanguinolenta y con pequeños grumos mucosos, característica inequívoca del cólera epidémico.' },
      { term: 'Proteína G estimuladora (Gs) y AMPc', simpleDefinition: 'Interruptor molecular dentro de la célula. Cuando la toxina del cólera lo bloquea en posición "ON", la célula fabrica cantidades desorbitadas de AMP cíclico (AMPc).' },
      { term: 'Canal CFTR de cloruro', simpleDefinition: 'Túnel en la membrana del enterocito que, al ser activado continuamente por el AMPc, bombea cloruro, sodio y agua hacia la luz del intestino sin parar.' },
      { term: 'Hidratación con glucosa y sodio (SRO)', simpleDefinition: 'Tratamiento que salva vidas: como el transportador de glucosa SGLT1 no depende de la toxina, darle al paciente agua con azúcar y sal permite que el intestino vuelva a absorber agua.' }
    ],
    biochemicalConceptSimple: '1. La bacteria Vibrio cholerae secreta su toxina -> 2. La subunidad A1 de la toxina transfiere ADP-ribosa a la proteína Gαs -> 3. Gαs pierde la capacidad de apagarse y activa constitutivamente a la adenilato ciclasa -> 4. Se dispara el AMPc y se abren los canales CFTR -> 5. Se pierden hasta 1 litro de agua y electrolitos por hora.',
    categoryDocente: 'cell_signaling',
    signalingType: 'gpcr_gs_camp_pka',
    molecularPathway: 'Toxina colérica (subunidad A1) → ADP-ribosilación irreversible de Gαs → bloqueo de GTPasa → activación constitutiva de Adenilato Ciclasa → elevación de AMPc → PKA → apertura mantenida de CFTR → hipersecreción luminal de Cl- y H2O',
    molecularAlteration: 'ADP-ribosilación irreversible y activación constitutiva continua de la subunidad Gαs dependiente de NAD+',
    clinicalHistory: {
      patientDemographics: {
        age: 34,
        gender: 'Masculino',
        occupation: 'Médico Cooperante en Emergencias Sanitarias'
      },
      chiefComplaint: 'Diarrea líquida inagotable blanquecina de 12 horas de evolución, vómitos repetidos, calambres musculares generalizados y sed abrasadora.',
      presentIllness: 'Carlos D., cooperante internacional de 34 años de regreso de un campo de refugiados tras inundaciones, inicia bruscamente un cuadro de evacuaciones acuosas masivas y continuas en "agua de arroz", con náuseas, vómitos, calambres y deshidratación severa.',
      pastMedicalHistory: ['Sin patologías crónicas de interés', 'Vacunación rutinaria al día; sin profilaxis colérica oral'],
      medications: ['Ninguna'],
      lifestyle: 'Estancia de 4 semanas en zona con red de agua potable colapsada. Consumo involuntario de bebidas locales sin hervir en las últimas 48 horas.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '82/48 mmHg (choque hipovolémico descompensado)',
        hr: '128 lpm (pulso filiforme y taquicárdico)',
        rr: '24 rpm (hiperpnea compensatoria de Kussmaul)',
        temp: '35.9 °C (hipotermia por mala perfusión)',
        sao2: '98% aire ambiente'
      },
      findings: [
        {
          systemName: 'Signos Generales y de Hidratación',
          description: 'Afectación severa del estado general: letárgico, ojos profundamente hundidos (enoftalmos), ausencia de lágrimas, lengua y mucosa yugal como "papel de lija", signo del pliegue cutáneo marcadamente positivo (>3 segundos en abdomen), frialdad distal y acrocianosis.'
        },
        {
          systemName: 'Abdomen y Examen Fecal',
          description: 'Abdomen blando, no doloroso a la palpación profunda, sin defensa muscular ni signos de peritonismo. Ruidos hidroaéreos marcadamente aumentados. Evacuación rectal continua de líquido lechoso transparente con detritus mucosos sin trazas de sangre.'
        }
      ]
    },
    initialLabWork: [
      { test: 'Hematocrito (Hto)', result: '56', unit: '%', referenceRange: '40 - 52 (Hemoconcentración severa por fuga volumétrica masiva)' },
      { test: 'Creatinina Sérica', result: '2.4', unit: 'mg/dL', referenceRange: '0.7 - 1.3 (Fracaso renal agudo de origen prerrenal)' },
      { test: 'Potasio Sérico (K+)', result: '2.7', unit: 'mEq/L', referenceRange: '3.5 - 5.0 (Hipopotasemia severa por pérdida colónica de potasio)' },
      { test: 'Gasometría Venosa Periférica', result: 'pH: 7.20, HCO3-: 11 mEq/L, pCO2: 29 mmHg (Acidosis metabólica severa con anión GAP normal por pérdida digestiva neta de HCO3-)', unit: 'mEq/L', referenceRange: 'pH 7.35-7.45; HCO3- 22-26' },
      { test: 'Examen Fecal al Microscopio (Frotis con Azul de Metileno)', result: 'Ausencia total de leucocitos polimorfonucleares (PMN 0 por campo) y ausencia de eritrocitos (enteropatía puramente secretora sin lisis mucosa)', unit: 'PMN/campo', referenceRange: '0 PMN/campo' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Cólera Epidémico Grave (Infección por Vibrio cholerae toxigénico)',
        plausibilityRationale: 'Concordancia absoluta con antecedentes de exposición en zona endémica, cuadro hiperagudo de diarrea masiva en agua de arroz sin invasión mucosa (ausencia de pus o sangre en heces), hemoconcentración crítica, hipopotasemia con acidosis metabólica hiperclorémica y choque hipovolémico fulminante.',
        isTargetDisease: true
      },
      {
        disease: 'Gastroenteritis Invasiva por Shigella / Salmonella Enteritidis',
        plausibilityRationale: 'Causa diarrea aguda en viajeros, pero se caracteriza por un mecanismo patogénico citotóxico invasivo con fiebre alta, dolor cólico intenso, tenesmo y heces con moco, pus (abundantes leucocitos) y sangre franca (disentería).',
        isTargetDisease: false
      },
      {
        disease: 'Diarrea Osmótica por Ingestión de Laxantes o Polialcoholes',
        plausibilityRationale: 'Retiene agua en la luz por gradiente osmótico pero cede de inmediato con el ayuno oral estricto y no genera la pérdida masiva electrolítica letal característica de la toxina ADP-ribosiladora.',
        isTargetDisease: false
      },
      {
        disease: 'Síndrome Carcinoide / Tumor Secretor de VIP (VIPoma)',
        plausibilityRationale: 'Produce diarrea secretora acuosa profusa mediada por AMPc («cólera pancreático»), pero es una neoplasia neuroendocrina de instauración crónica a lo largo de meses, asociada a flushing facial y lesiones hepáticas metastásicas.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Cólera Epidémico Grave (Infección por Vibrio cholerae toxigénico)',
    biomarkerOptions: [
      {
        id: 'bm_opt_cholera_toxin_correct',
        biomarkerId: 'bm_cholera_toxin',
        biomarkerName: 'Detección de Enterotoxina Colérica y Cultivo Selectivo TCBS',
        isCorrect: true,
        biochemicalRationale: 'La toxina colérica es una enterotoxina de tipo AB5. La subunidad catalítica A1 transfiere de forma irreversible el grupo ADP-ribosa desde el NAD+ intracelular a la subunidad Gαs del complejo de la adenilato ciclasa. Al quedar bloqueada la actividad GTPásica intrínseca, Gαs se mantiene permanentemente unida a GTP en estado activo constante, produciendo una síntesis desmedida y continua de AMPc. El AMPc hiperactiva a la PKA, la cual mantiene permanentemente fosforilado y abierto al canal apical de cloruro CFTR e inhibe el intercambiador Na+/H+ (NHE3). La salida forzada de cloruro hacia la luz intestinal arrastra sodio, bicarbonato y agua a razón de hasta 1000 mL/hora, desatando la diarrea en "agua de arroz".',
        whyOptimalOrSuboptimal: 'Es el biomarcador y método microbiológico confirmatorio de referencia que identifica el mecanismo patogénico de la toxina sobre la proteína Gs y permite aislar el clon epidémico en el medio selectivo TCBS.'
      },
      {
        id: 'bm_opt_lipase_distractor',
        biomarkerId: 'bm_lipasa',
        biomarkerName: 'Lipasa Sérica',
        isCorrect: false,
        biochemicalRationale: 'Enzima acinar digestiva liberada en pancreatitis necrotizante.',
        whyOptimalOrSuboptimal: 'Completamente normal; no guarda relación con la patología del enterocito secretor ni con la transducción de señales por proteínas G.'
      },
      {
        id: 'bm_opt_ammonia_distractor',
        biomarkerId: 'bm_amonio_plasmatico',
        biomarkerName: 'Amonio Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Metabolito neurotóxico procedente del catabolismo de aminoácidos y del ciclo de la urea.',
        whyOptimalOrSuboptimal: 'Inespecífico y no relacionado con la fisiopatología de la pérdida luminal de agua intestinal.'
      },
      {
        id: 'bm_opt_uric_acid_distractor',
        biomarkerId: 'bm_acido_urico',
        biomarkerName: 'Ácido Úrico Sérico',
        isCorrect: false,
        biochemicalRationale: 'Producto final de la degradación de bases púricas.',
        whyOptimalOrSuboptimal: 'Puede sufrir elevación reactiva leve por hemoconcentración y disminución del filtrado glomerular pero carece por completo de especificidad etiológica.'
      }
    ],
    expertClinicalKey: 'Perla de Transducción de Señales (GPCR y AMPc): La toxina colérica constituye el experimento de la naturaleza por excelencia para estudiar la cascada Gs-AMPc-PKA. Al bloquear por ADP-ribosilación la hidrólisis del GTP unido a Gαs, anula el mecanismo intrínseco de auto-apagado de la señal. El tratamiento de rescate no consiste en antidiarreicos (que retendrían líquido en asas paralizadas), sino en la hidratación oral masiva con soluciones que contienen Glucosa y Sodio: el cotransportador apical SGLT1 es independiente de la cascada AMPc/PKA y permanece intacto, permitiendo que la absorción acoplada de glucosa arrastre sodio y agua al torrente sanguíneo, salvando la vida del paciente.',
    essentialBiomarkerIds: ['bm_cholera_toxin']
  },
  {
    id: 'case_cardiac_signaling_01',
    title: 'Beatriz L.: Ataques repentinos de dolor de cabeza, taquicardia y sudor frío',
    system: 'cardiac',
    difficulty: 'intermedio',
    studentSummary: 'Beatriz L., arquitecta de 44 años, sufre crisis repentinas y aterradoras de 20 minutos donde el corazón se le desboca (124 lpm), la cabeza le estalla de dolor, rompe a sudar frío empapando la ropa y su tensión se dispara a niveles peligrosísimos (230/125 mmHg). Un pequeño tumor benigno en su glándula suprarrenal (feocromocitoma) libera ráfagas descontroladas de adrenalina y noradrenalina, sobreestimulando las vías de señalización de la presión arterial y del corazón.',
    clinicalGlossary: [
      { term: 'Crisis paroxística adrenérgica', simpleDefinition: 'Ataques bruscos y repetidos de taquicardia, dolor de cabeza explosivo y sudoración profusa desencadenados por una descarga masiva de adrenalina.' },
      { term: 'Feocromocitoma', simpleDefinition: 'Tumor de las células cromafines de la médula suprarrenal que fabrica y libera catecolaminas (adrenalina y noradrenalina) sin control.' },
      { term: 'Vía Gq (Vasoconstricción)', simpleDefinition: 'Ruta de señalización celular en las arterias: la noradrenalina activa el receptor alfa-1 -> sube el calcio intracelular -> las arterias se cierran con fuerza extrema disparando la presión arterial.' },
      { term: 'Metanefrinas libres en plasma', simpleDefinition: 'Productos en los que el tumor transforma la adrenalina. Como el tumor las libera continuamente a la sangre, son la mejor prueba de laboratorio para cazar el tumor.' }
    ],
    biochemicalConceptSimple: '1. El tumor suprarrenal vierte adrenalina y noradrenalina -> 2. La noradrenalina activa receptores α1 (vía Gq/PLC/IP3/Calcio) contrayendo las arterias -> 3. La adrenalina activa receptores β1 en el corazón (vía Gs/AMPc) acelerando los latidos -> 4. Se genera la tríada típica de cefalea, palpitaciones y sudoración con hipertensión crítica.',
    categoryDocente: 'cell_signaling',
    signalingType: 'gpcr_gq_plc_ip3_dag',
    molecularPathway: 'Noradrenalina/Adrenalina → receptor α1 vascular (Gq/PLC/IP3/Ca2+) y receptor β1 cardíaco (Gs/AC/AMPc/PKA) → vasoconstricción sistémica extrema y taquicardia desregulada',
    molecularAlteration: 'Hiperestimulación autonómica masiva y episódica de los receptores adrenérgicos acoplados a proteínas G por hipersecreción tumoral cromafín',
    clinicalHistory: {
      patientDemographics: {
        age: 44,
        gender: 'Femenino',
        occupation: 'Arquitecta'
      },
      chiefComplaint: 'Crisis bruscas recurrentes de dolor de cabeza explosivo, sudoración en sábana, palpitaciones torácicas rápidas y palidez cutánea cadavérica.',
      presentIllness: 'Beatriz L., de 44 años sin hipertensión previa, acude por crisis súbitas de 15 a 30 minutos autolimitadas. Refiere cefalea occipital pulsátil 10/10 con sudoración profusa generalizada, taquicardia y palidez facial extrema. En una crisis previa se constató TA de 230/125 mmHg.',
      pastMedicalHistory: ['Colecistectomía laparoscópica hace 5 años', 'Sin antecedentes familiares de neoplasias endocrinas múltiples conocidas'],
      medications: ['Ninguna habitual; toma paracetamol ocasional sin mejoría de la cefalea'],
      lifestyle: 'No fumadora. Dieta normosódica. No consume café ni alcohol.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '218/120 mmHg (en el inicio de la crisis en urgencias; desciende a 130/80 mmHg tras el cese)',
        hr: '124 lpm (taquicardia sinusal)',
        rr: '20 rpm',
        temp: '37.1 °C',
        sao2: '99% aire ambiente'
      },
      findings: [
        {
          systemName: 'Cardiovascular y Vascular Periférico',
          description: 'Latido de la punta enérgico e hiperdinámico. Ruidos cardíacos taquicárdicos sin soplos ni tercer ruido. Marcada palidez cutánea en cara y extremidades con frialdad acral y relleno capilar enlentecido durante el pico hipertensivo.'
        },
        {
          systemName: 'Abdomen y Examen Físico General',
          description: 'Abdomen blando, depresible, sin visceromegalias. No se auscultan soplos en arterias renales. Diaforesis visible con empapamiento de la ropa. Temblor postural fino distal en ambas manos.'
        }
      ]
    },
    initialLabWork: [
      { test: 'Glucemia en Ayunas', result: '142', unit: 'mg/dL', referenceRange: '70 - 109 (Hiperglucemia reactiva inducida por gluconeogénesis adrenérgica)', isAbnormal: true },
      { test: 'Creatinina Sérica', result: '0.88', unit: 'mg/dL', referenceRange: '0.5 - 1.1' },
      { test: 'Iones en Sangre', result: 'Sodio 140 mEq/L, Potasio 4.1 mEq/L', unit: '', referenceRange: 'Normal' },
      { test: 'Electrocardiograma (ECG)', result: 'Taquicardia sinusal a 122 lpm sin alteraciones isquémicas agudas del segmento ST ni ondas Q patológicas', unit: '-', referenceRange: 'Normal', isAbnormal: true },
      { test: 'Ecografía / TC Abdominal con Contraste', result: 'Masa nodular heterogénea hipercaptante de 4.3 x 3.8 cm en la glándula suprarrenal izquierda con áreas centrales quísticas necróticas', unit: 'cm', referenceRange: 'Sin nódulos', isAbnormal: true }
    ],
    differentialDiagnoses: [
      {
        disease: 'Feocromocitoma Medulosuprarrenal',
        plausibilityRationale: 'Presentación de libro con la tríada clásica de paroxismos (cefalea, diaforesis y taquicardia) junto a crisis hipertensivas de gran magnitud, hiperglucemia de estrés y nódulo suprarrenal sólido heterogéneo.',
        isTargetDisease: true
      },
      {
        disease: 'Hipertensión Arterial Esencial con Crisis Hipertensiva',
        plausibilityRationale: 'La elevación de tensión arterial es severa, pero no cursa de forma paroxística con la tríada clásica ni asocia masa suprarrenal hipervascularizada.',
        isTargetDisease: false
      },
      {
        disease: 'Crisis de Pánico / Trastorno de Angustia con Agorafobia',
        plausibilityRationale: 'Puede simular la descarga adrenérgica (temblor, palpitaciones, sudoración), pero rara vez alcanza tensiones arteriales superiores a 210/120 mmHg y no justifica la masa adrenal orgánica identificada en neuroimagen.',
        isTargetDisease: false
      },
      {
        disease: 'Tirotoxicosis / Hipertiroidismo por Enfermedad de Graves',
        plausibilityRationale: 'Cursa con taquicardia, sudoración y temblor por hipersensibilidad adrenérgica, pero la tensión arterial diastólica suele ser baja o normal (presión de pulso amplia), la clínica es continua y no paroxística y cursa con TSH inhibida.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Feocromocitoma Medulosuprarrenal',
    biomarkerOptions: [
      {
        id: 'bm_opt_metanephrines_correct',
        biomarkerId: 'bm_metanephrines_plasma',
        biomarkerName: 'Metanefrinas Libres Fraccionadas en Plasma',
        isCorrect: true,
        biochemicalRationale: 'La secreción de noradrenalina y adrenalina por las células cromafines del feocromocitoma activa potentemente la cascada del receptor α1 acoplado a Gq: la subunidad Gαq activa a la Fosfolipasa C-β (PLC-β), que hidroliza el fosfatidilinositol 4,5-bisfosfato (PIP2) generando inositol 1,4,5-trifosfato (IP3) y diacilglicerol (DAG). El IP3 se une a sus receptores en el retículo sarcoplásmico liberando Ca2+ al citosol, lo que activa a la quinasa de cadena ligera de miosina (MLCK) y desencadena una vasoconstricción arteriolar masiva con picos de TA > 200 mmHg. En el corazón, las catecolaminas activan receptores β1 acoplados a Gs-adenilato ciclasa-AMPc-PKA, disparando la entrada de Ca2+ y la frecuencia cardíaca. Las metanefrinas libres plasmáticas son el biomarcador óptimo porque la enzima intratumoral Catecol-O-metiltransferasa (COMT) metaboliza continuamente las catecolaminas dentro del propio tumor en normetanefrina y metanefrina libres, liberándolas a la sangre de forma constante, lo que confiere una sensibilidad diagnóstica superior al 98% incluso entre paroxismos.',
        whyOptimalOrSuboptimal: 'Es el biomarcador de primera elección de máxima sensibilidad analítica (>98%) para diagnosticar el feocromocitoma e ilustrar la hiperactivación de las vías de transducción adrenérgica.'
      },
      {
        id: 'bm_opt_troponin_distractor',
        biomarkerId: 'bm_troponin_c',
        biomarkerName: 'Troponina Cardíaca Ultrasensible (hs-cTn)',
        isCorrect: false,
        biochemicalRationale: 'Proteína miofibrilar marcadora de necrosis celular de miocitos cardíacos.',
        whyOptimalOrSuboptimal: 'Negativa o mínimamente elevada en ausencia de daño isquémico miocárdico directo o miocardiopatía de Takotsubo; no identifica la fuente catecolaminérgica de la crisis.'
      },
      {
        id: 'bm_opt_ckmb_distractor',
        biomarkerId: 'bm_ckmb',
        biomarkerName: 'CK-MB Masa',
        isCorrect: false,
        biochemicalRationale: 'Isoenzima citosólica miocárdica de cinética corta.',
        whyOptimalOrSuboptimal: 'Inespecífica para hipertensión secundaria y normal en este escenario sin infarto agudo de miocardio.'
      },
      {
        id: 'bm_opt_bnp_distractor',
        biomarkerId: 'bm_nt_probnp',
        biomarkerName: 'NT-proBNP',
        isCorrect: false,
        biochemicalRationale: 'Péptido liberado por los ventrículos en respuesta a sobrecarga hemodinámica de volumen o presión.',
        whyOptimalOrSuboptimal: 'Puede incrementarse por la postcarga elevada pero carece de especificidad diagnóstica para confirmar una neoplasia neuroendocrina.'
      }
    ],
    expertClinicalKey: 'Perla de Señalización Adrenérgica y Fisiopatología Molecular: El feocromocitoma ilustra la sinergia letal de dos vías de transducción GPCR: la vía Gq-PLC-IP3-Ca2+ (mediada por receptores α1 vasculares, responsable de la vasoconstricción crítica) y la vía Gs-AC-AMPc-PKA (mediada por receptores β1 miocárdicos, generadora de la taquicardia extrema). En el manejo farmacológico preoperatorio es mandatorio realizar un bloqueo alfa-adrenérgico previo (con fenoxibenzamina o doxazosina) durante al menos 10-14 días antes de iniciar bloqueantes beta-adrenérgicos: si se administrara un beta-bloqueante primero, se anularía la vasodilatación beta-2 compensadora, dejando sin oposición al receptor alfa-1 acoplado a Gq, lo que desencadenaría una crisis hipertensiva vasoconstrictora potencialmente mortal.',
    essentialBiomarkerIds: ['bm_metanephrines_plasma']
  },
  {
    id: 'case_metabolic_signaling_02',
    title: 'Irene G.: Manchas oscuras aterciopeladas en el cuello y reglas irregulares',
    system: 'metabolic',
    difficulty: 'avanzado',
    studentSummary: 'Irene G., una gimnasta delgada de 17 años que entrena a diario, consulta porque le han salido manchas oscuras, rugosas y aterciopeladas muy llamativas en la nuca y las axilas (acantosis nigricans severa), y sus reglas son muy infrecuentes. A pesar de no tener sobrepeso ni comer dulces, su insulina en sangre es astronómicamente alta (> 200 µUI/mL). Una mutación genética en el receptor tirosina quinasa de la insulina impide que sus células capten glucosa normalmente.',
    clinicalGlossary: [
      { term: 'Receptor Tirosina Quinasa (RTK)', simpleDefinition: 'Tipo de receptor en la superficie de la célula que, al unirse la insulina, se autofosforila y pone en marcha la maquinaria para meter glucosa mediante GLUT4.' },
      { term: 'Resistencia a la insulina tipo A', simpleDefinition: 'Trastorno genético raro en el que el receptor de insulina no funciona desde el nacimiento, cursando con niveles brutales de insulina en personas jóvenes y delgadas.' },
      { term: 'Acantosis por reacción cruzada', simpleDefinition: 'Al haber tanta insulina en la sangre, esta se confunde y activa los receptores de IGF-1 de la piel, haciendo crecer queratinocitos y oscureciendo los pliegues.' },
      { term: 'Hiperandrogenismo ovárico', simpleDefinition: 'Aumento de testosterona en la mujer provocado porque la insulina excesiva estimula directamente a las células del ovario, alterando la regla.' }
    ],
    biochemicalConceptSimple: '1. Mutación inactivadora en el dominio tirosina quinasa del receptor de insulina -> 2. Falla la activación de la vía PI3K-Akt y los transportadores GLUT4 no suben a la membrana -> 3. El páncreas secreta cantidades gigantescas de insulina de rescate -> 4. Esta insulina estimula por reacción cruzada a los receptores de IGF-1 en la piel (acantosis nigricans) y el ovario (aumento de vello y reglas irregulares).',
    categoryDocente: 'cell_signaling',
    signalingType: 'receptor_tyrosine_kinase',
    molecularPathway: 'Insulina → subunidad α del INSR → autofosforilación de tirosinas en subunidad β → IRS-1 → PI3K → PIP3 → Akt/PKB → translocación vesicular de GLUT4',
    molecularAlteration: 'Mutación con pérdida de función en el dominio tirosina quinasa intracelular del receptor de insulina (INSR)',
    clinicalHistory: {
      patientDemographics: {
        age: 17,
        gender: 'Femenino',
        occupation: 'Estudiante de Bachillerato y Gimnasta'
      },
      chiefComplaint: 'Aparición progresiva de pigmentación oscura aterciopelada en pliegues cutáneos (acantosis nigricans severa), reglas muy irregulares y aumento del vello facial a pesar de ser deportista y delgada.',
      presentIllness: 'Irene G., adolescente de 17 años deportista de competición con complexión delgada (IMC 20.4 kg/m²), consulta por placas hiperpigmentadas, rugosas y aterciopeladas en la nuca y axilas de 18 meses de evolución. Presenta reglas muy irregulares cada 3-4 meses y aumento de vello facial, con cifras de insulina basal desmesuradamente altas sin sobrepeso.',
      pastMedicalHistory: ['Nacimiento a término con peso adecuado', 'Sin consumo de corticoides ni anabolizantes'],
      medications: ['Ninguna'],
      lifestyle: 'Dieta mediterránea estricta equilibrada sin exceso de carbohidratos refinados. Entrenamiento físico aeróbico diario.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '112/68 mmHg',
        hr: '64 lpm',
        rr: '14 rpm',
        temp: '36.6 °C',
        sao2: '99% aire ambiente'
      },
      findings: [
        {
          systemName: 'Dermatológico y Cutáneo',
          description: 'Acantosis nigricans exuberante grado 4 en cuello ("collar de terciopelo negro"), axilas con acrocordones múltiples y afectación simétrica en articulaciones metacarpofalángicas de las manos. Escala de Ferriman-Gallwey: 13/36 (hirsutismo moderado).'
        },
        {
          systemName: 'Hábito Corporal y Endocrino',
          description: 'Hábito corporal no cushingoide: no presenta obesidad troncular, ni cara de luna llena, ni estrías violáceas abdominales ni giba de búfalo. Masa muscular bien definida compatible con actividad física atlética. Tiroides de tamaño y consistencia normal.'
        }
      ]
    },
    initialLabWork: [
      { test: 'Glucosa Basal en Ayunas', result: '114', unit: 'mg/dL', referenceRange: '70 - 109 (Glucemia basal alterada / prediabetes)', isAbnormal: true },
      { test: 'TSH Sérica', result: '1.80', unit: 'mUI/L', referenceRange: '0.40 - 4.00 (Descarta hipotiroidismo como causa de oligomenorrea)' },
      { test: 'Testosterona Total Sérica', result: '98', unit: 'ng/dL', referenceRange: '15 - 70 (Hiperandrogenismo ovárico secundario)', isAbnormal: true },
      { test: 'DHEA-Sulfato (DHEA-S)', result: '190', unit: 'μg/dL', referenceRange: '65 - 380 (Normal, excluye hiperplasia suprarrenal congénita o tumor adrenal)' },
      { test: 'Anticuerpos Anti-GAD65 y Anti-IA2', result: 'Negativos', unit: '-', referenceRange: 'Negativos (Descarta Diabetes Mellitus Tipo 1 o autoinmune)' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Síndrome de Resistencia a la Insulina Tipo A (Mutación en el gen del Receptor de Insulina - INSR)',
        plausibilityRationale: 'Concordancia perfecta con acantosis nigricans masiva e hiperandrogenismo severo en una mujer joven no obesa, con ausencia de autoanticuerpos, normo/prediabetes e hiperinsulinemia basal descomunal derivada de un defecto genético en la transducción del receptor tirosina quinasa.',
        isTargetDisease: true
      },
      {
        disease: 'Síndrome de Ovario Poliquístico (SOP) Clásico',
        plausibilityRationale: 'Comparte oligomenorrea e hiperandrogenismo, pero en el SOP la resistencia a la insulina es típicamente leve a moderada y ligada a sobrepeso; no justifica una acantosis nigricans monstruosa generalizada con insulinas basales superiores a 150-250 µUI/mL en una paciente deportista delgada.',
        isTargetDisease: false
      },
      {
        disease: 'Diabetes Mellitus Tipo 1 / LADA de Debut',
        plausibilityRationale: 'Cursa con hiperglucemia en jóvenes no obesos, pero el mecanismo patogénico es el déficit absoluto de insulina por necrosis autoinmune de islotes pancreáticos, cursando con niveles basales de insulina casi indetectables y autoanticuerpos positivos.',
        isTargetDisease: false
      },
      {
        disease: 'Síndrome de Cushing Primario (Adenoma Suprarrenal Cortical)',
        plausibilityRationale: 'Produce intolerancia hidrocarbonada e hirsutismo por exceso de esteroides, pero genera obesidad centrípeta marcada, hipertensión arterial, equimosis fáciles y elevación del cortisol libre urinario.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Síndrome de Resistencia a la Insulina Tipo A (Mutación en el gen del Receptor de Insulina - INSR)',
    biomarkerOptions: [
      {
        id: 'bm_opt_insulin_homa_correct',
        biomarkerId: 'bm_fasting_insulin',
        biomarkerName: 'Insulina Basal en Ayunas e Índice HOMA-IR',
        isCorrect: true,
        biochemicalRationale: 'El receptor de insulina (INSR) es el prototipo de receptor de membrana con actividad tirosina quinasa intrínseca (RTK), compuesto por un heterotetrámero α2β2. La unión de la insulina a las subunidades alfa activa la actividad catalítica de las subunidades beta citosólicas, que se autofosforilan en residuos de tirosina y reclutan a proteínas adaptadoras como IRS-1. IRS-1 fosforilado activa a la fosfatidilinositol 3-quinasa (PI3K), que convierte PIP2 en PIP3 en la membrana plasmática, reclutando a PDK1 y fosforilando a Akt (Protein Kinasa B). Akt media la translocación de vesículas con transportadores GLUT4 a la membrana celular para captar glucosa en músculo y grasa. En el Síndrome Tipo A, mutaciones inactivadoras en el dominio tirosina quinasa impiden la autofosforilación y la activación de Akt. Como consecuencia, las células beta pancreáticas intentan vencer este bloqueo secretando cantidades astronómicas de insulina (> 150-300 µUI/mL, con HOMA-IR > 20). Esta concentración masiva de insulina circulante estimula por reacción cruzada los receptores de IGF-1 en queratinocitos dérmicos (desencadenando la proliferación epitelial aterciopelada de la acantosis nigricans) y en células de la teca ovárica (estimulando la síntesis autónoma de testosterona).',
        whyOptimalOrSuboptimal: 'La determinación de insulina basal extraordinariamente elevada en ayunas junto con el índice HOMA-IR y la normo/prediabetes confirman de forma concluyente la resistencia extrema a la insulina mediada por defecto en el receptor tirosina quinasa.'
      },
      {
        id: 'bm_opt_hba1c_distractor',
        biomarkerId: 'bm_hba1c',
        biomarkerName: 'Hemoglobina Glicosilada (HbA1c)',
        isCorrect: false,
        biochemicalRationale: 'Marcador de glicación no enzimática de la hemoglobina dependiente de la glucemia media durante los 120 días previos.',
        whyOptimalOrSuboptimal: 'Solo indica el grado de alteración glucémica (prediabetes en 5.9%), pero es completamente incapaz de discriminar el mecanismo molecular de resistencia extrema mediado por receptor tirosina quinasa frente a otras formas de diabetes.'
      },
      {
        id: 'bm_opt_acylcarnitine_distractor',
        biomarkerId: 'bm_perfil_acilcarnitinas',
        biomarkerName: 'Perfil de Acilcarnitinas en Sangre',
        isCorrect: false,
        biochemicalRationale: 'Biomarcador por espectrometría de masas en tándem de errores innatos de la beta-oxidación mitocondrial (como MCADD).',
        whyOptimalOrSuboptimal: 'Normal; no evalúa la cascada de fosforilación del receptor de insulina.'
      },
      {
        id: 'bm_opt_bhydroxybutyrate_distractor',
        biomarkerId: 'bm_beta_hidroxibutirato',
        biomarkerName: 'Beta-Hidroxibutirato en Sangre',
        isCorrect: false,
        biochemicalRationale: 'Cuerpo cetónico predominante en cetoacidosis.',
        whyOptimalOrSuboptimal: 'Negativo o normal (< 0.5 mmol/L), ya que la hiperinsulinemia masiva mantiene fuertemente suprimida la cetogénesis mitocondrial hepática.'
      }
    ],
    expertClinicalKey: 'Perla de Señalización Molecular (Receptor Tirosina Quinasa - RTK): El receptor de insulina bifurca su señal en dos ramas principales: 1) La vía metabólica PI3K-Akt (responsable de la captación de glucosa vía GLUT4, síntesis de glucógeno y supresión de lipólisis) y 2) La vía mitogénica MAPK / Ras-Raf-MEK-ERK (responsable de la proliferación y diferenciación celular). Cuando el dominio tirosina quinasa presenta una mutación inactivadora, la captación metabólica de glucosa fracasa estrepitosamente, obligando a una hiperinsulinemia masiva de rescate. Sin embargo, a concentraciones suprafisiológicas de cientos de µUI/mL, la insulina interactúa con los receptores intactos de IGF-1 y promueve la vía mitogénica MAPK en la piel y el ovario, generando respectivamente la acantosis nigricans florida y el hiperandrogenismo severo.',
    essentialBiomarkerIds: ['bm_fasting_insulin']
  },

  // ==========================================
  // BLOQUE 1: TRASTORNOS ENZIMÁTICOS, TOXICOLOGÍA Y ENZIMOPATÍAS (CASOS ADAPTADOS DIDÁCTICOS)
  // ==========================================
  {
    id: 'case_marks_gota_01',
    title: 'Matilde C.: Dolor agudo e inflamación en el dedo gordo tras una cena abundante',
    system: 'renal',
    difficulty: 'intermedio',
    studentSummary: 'Matilde C., mujer de 57 años, se despierta de madrugada con dolor insoportable, enrojecimiento e hinchazón en la articulación del dedo gordo del pie derecho (podagra) tras una cena abundante en marisco y vino. El ácido úrico de su sangre superó el límite en que puede mantenerse disuelto y precipitó formando cristales microscópicos en forma de aguja dentro de la articulación, desatando un ataque inflamatorio agudo.',
    clinicalGlossary: [
      { term: 'Podagra', simpleDefinition: 'Nombre médico tradicional que describe la inflamación aguda, enrojecida, caliente y extremadamente dolorosa de la articulación del dedo gordo del pie.' },
      { term: 'Hiperuricemia', simpleDefinition: 'Nivel elevado de ácido úrico en sangre (superior a 6.0 mg/dL en mujeres o 7.0 mg/dL en hombres).' },
      { term: 'Cristales de UMS (Urato Monosódico)', simpleDefinition: 'Sales de ácido úrico que forman pequeñas "agujas" cristalinas cuando su concentración en sangre o líquido articular supera los 6.8 mg/dL.' },
      { term: 'Microscopía de luz polarizada', simpleDefinition: 'Técnica de laboratorio donde los cristales de urato brillan con un color amarillo característico (birrefringencia negativa) cuando se alinean con la luz.' },
      { term: 'Colchicina vs Alopurinol', simpleDefinition: 'La colchicina frena la inflamación aguda desarmando a los glóbulos blancos. El alopurinol bloquea la enzima que fabrica ácido úrico, pero solo debe iniciarse semanas DESPUÉS de la crisis para no empeorar el ataque.' }
    ],
    biochemicalConceptSimple: '1. Alimentos ricos en purinas (mariscos, carnes rojas) + alcohol -> 2. La enzima Xantina Oxidasa degrada las purinas en Ácido Úrico -> 3. Si se supera el límite de solubilidad (~6.8 mg/dL), el ácido úrico precipita formando cristales de urato sódico (agujas) -> 4. Los glóbulos blancos (neutrófilos) intentan fagocitar los cristales, pero se rompen sus lisosomas y desatan una inflamación articular fulminante.',
    clinicalHistory: {
      patientDemographics: {
        age: 57,
        gender: 'Femenino',
        occupation: 'Restauradora de Bienes Culturales'
      },
      chiefComplaint: 'Dolor lacerante insoportable, calor e hinchazón en el dedo gordo del pie derecho que la despertó a mitad de la noche.',
      presentIllness: 'Paciente de 57 años acude a urgencias cojeando y sin poder apoyar el pie por dolor muy severo (intensidad 9/10) de 8 horas de evolución en la articulación de la base del dedo gordo del pie derecho (podagra). Refiere una hipersensibilidad extrema: el simple roce de la sábana de la cama le resultaba insoportable. Cuenta que la noche anterior fue a una cena donde consumió mariscos, paté y varias copas de vino blanco. No ha sufrido ningún golpe ni traumatismo previo.',
      pastMedicalHistory: ['Hipertensión arterial esencial controlada', 'Colesterol elevado (dislipidemia)', 'Menopausia a los 51 años'],
      medications: ['Hidroclorotiazida 25 mg/día (diurético que disminuye la eliminación de ácido úrico por el riñón)', 'Atorvastatina 20 mg/día'],
      lifestyle: 'Consumo ocasional de alcohol; dieta rica en alimentos proteicos de origen animal.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '142/88 mmHg',
        hr: '92 lpm',
        rr: '18 rpm',
        temp: '37.4 °C (febrícula inflamatoria reactiva)',
        sao2: '98%'
      },
      findings: [
        { systemName: 'Articulación del pie', description: 'Base del dedo gordo derecho muy enrojecida (eritematosa), caliente al tacto, hinchada (edema) y con dolor extremo ante cualquier roce.' },
        { systemName: 'Piel general', description: 'Sin presencia de nódulos blanquecinos de ácido úrico bajo la piel (tofos). Sin signos de infección de la piel (sin celulitis bacteriana).' }
      ]
    },
    initialLabWork: [
      { test: 'Glóbulos blancos (Leucocitos)', result: '12.400', unit: '/µL', referenceRange: '4.500 - 11.000', isAbnormal: true },
      { test: 'Neutrófilos %', result: '78', unit: '%', referenceRange: '45 - 70', isAbnormal: true },
      { test: 'Glucemia en Urgencias', result: '102', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'Iones en Sangre', result: 'Sodio 139 mEq/L, Potasio 4.2 mEq/L', unit: '', referenceRange: 'Normal' },
      { test: 'Radiografía de pie derecho', result: 'Tumefacción de partes blandas periarticular en 1ª articulación metatarsofalángica; sin fracturas ni lesiones óseas líticas ("en sacabocados")', unit: '-', referenceRange: 'Normal' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Artritis Gotosa Aguda por Cristales de Monourato Sódico (Gota)',
        plausibilityRationale: 'Aparición súbita nocturna en la primera articulación metatarsofalángica (podagra), tras cena copiosa con marisco y vino en una mujer tratada con diuréticos tiazídicos, con signos de inflamación aguda sin traumatismo previo.',
        isTargetDisease: true
      },
      {
        disease: 'Artritis Séptica (Infección Bacteriana en la Articulación)',
        plausibilityRationale: 'Produce hinchazón y dolor agudo en una articulación, pero no hay herida previa, no hay fiebre alta ni bacterias en el análisis.',
        isTargetDisease: false
      },
      {
        disease: 'Pseudogota (Artropatía por Pirofosfato de Calcio)',
        plausibilityRationale: 'Otra enfermedad por cristales pero suele atacar a rodillas y muñecas, y sus cristales tienen forma de rombo en vez de agujas.',
        isTargetDisease: false
      },
      {
        disease: 'Celulitis (Infección de la Piel del Pie)',
        plausibilityRationale: 'La piel se pone roja y caliente, pero el dolor de la celulitis no está centrado específicamente en el interior de la articulación.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Artritis Gotosa Aguda por Cristales de Monourato Sódico (Gota)',
    biomarkerOptions: [
      {
        id: 'bm_opt_cristales_ums_correct',
        biomarkerId: 'bm_cristales_liquido_sinovial',
        biomarkerName: 'Análisis de Líquido Articular con Microscopio Polarizado (Cristales de Urato)',
        isCorrect: true,
        biochemicalRationale: 'Al extraer una gota de líquido de la articulación inflamada con una pequeña aguja (artrocentesis) y mirarla al microscopio polarizado, se observan directamente los cristales de urato en forma de aguja dentro de los glóbulos blancos. Como brillan con birrefringencia negativa amarilla, dan el diagnóstico de certeza absoluta al 100%.',
        whyOptimalOrSuboptimal: 'Es la prueba estándar de oro (Gold Standard) indiscutible: permite ver con los propios ojos los cristales de ácido úrico causantes del ataque y descarta al mismo tiempo que haya bacterias (artritis séptica).'
      },
      {
        id: 'bm_opt_acido_urico_distractor',
        biomarkerId: 'bm_acido_urico',
        biomarkerName: 'Ácido Úrico en Sangre (Uricemia aislada)',
        isCorrect: false,
        biochemicalRationale: 'Aunque el ácido úrico esté alto en esta paciente, durante un ataque agudo hasta el 30% de los enfermos puede tener un ácido úrico engañosamente normal en sangre, porque gran parte de ese ácido úrico ha salido de la sangre para formar cristales dentro de la articulación.',
        whyOptimalOrSuboptimal: 'Orientativo pero insuficiente por sí solo: un ácido úrico normal en sangre no descarta un ataque de gota en plena fase aguda.'
      },
      {
        id: 'bm_opt_pcr_distractor',
        biomarkerId: 'bm_pcr',
        biomarkerName: 'Proteína C Reactiva (PCR)',
        isCorrect: false,
        biochemicalRationale: 'Proteína fabricada por el hígado que sube ante cualquier inflamación o infección en el organismo.',
        whyOptimalOrSuboptimal: 'Es inespecífica: nos dice que hay inflamación en el cuerpo, pero no nos dice si la causa son cristales de gota o una bacteria peligrosa.'
      },
      {
        id: 'bm_opt_creatinina_distractor',
        biomarkerId: 'bm_creatinina',
        biomarkerName: 'Creatinina Sérica (Función Renal)',
        isCorrect: false,
        biochemicalRationale: 'Parámetro habitual para comprobar si los riñones filtran correctamente la sangre.',
        whyOptimalOrSuboptimal: 'Nos sirve para comprobar la salud del riñón del paciente, pero no diagnostica el dolor articular.'
      }
    ],
    expertClinicalKey: 'Perla Terapéutica para Estudiantes: En un ataque agudo de gota se utiliza Colchicina o antiinflamatorios para frenar a los glóbulos blancos. NUNCA se debe empezar a dar Alopurinol en pleno ataque agudo: si bajamos bruscamente el ácido úrico en sangre, los depósitos de cristales se disuelven de golpe y desprenden microagujas que reactivan y multiplican el dolor.',
    essentialBiomarkerIds: ['bm_cristales_liquido_sinovial', 'bm_acido_urico'],
    categoryDocente: 'Enzimopatías y Metabolismo de Purinas',
    molecularPathway: 'Purinas de la Dieta -> Enzima Xantina Oxidasa -> Ácido Úrico -> Cristales en Articulación -> Inflamación',
    molecularAlteration: 'El ácido úrico supera 6.8 mg/dL y forma cristales insolubles en las articulaciones más frías (dedo del pie)'
  },
  {
    id: 'case_marks_miastenia_01',
    title: 'Lucía M.: Cansancio al masticar y párpados caídos al final del día',
    system: 'neuromuscular',
    difficulty: 'avanzado',
    studentSummary: 'Lucía M., traductora e intérprete de 36 años, consulta porque a medida que avanza la jornada laboral nota que los músculos de la mandíbula se le cansan al masticar, le cuesta articular las palabras (voz nasal) y los párpados se le caen involuntariamente al atardecer. Tras dormir o descansar unos minutos, recupera la fuerza. Su sistema inmunitario ha producido anticuerpos que atacan y destruyen los receptores de acetilcolina en sus músculos.',
    clinicalGlossary: [
      { term: 'Ptosis palpebral', simpleDefinition: 'Caída anormal e involuntaria de uno o ambos párpados superiores por debilidad muscular.' },
      { term: 'Fatigabilidad muscular', simpleDefinition: 'Debilidad que aparece o empeora conforme se repite un movimiento (hablar, masticar, parpadear) y que mejora notablemente tras unos minutos de reposo.' },
      { term: 'Disartria / Disfonía', simpleDefinition: 'Dificultad para vocalizar claramente o pérdida de potencia y tono de la voz por debilidad de las cuerdas vocales, lengua y paladar.' },
      { term: 'Placa motora neuromuscular', simpleDefinition: 'Punto de contacto donde el nervio se comunica con la fibra muscular a través del neurotransmisor acetilcolina.' },
      { term: 'Anticuerpos Anti-AChR', simpleDefinition: 'Proteínas del sistema inmunitario que se equivocan y se pegan a los receptores del músculo, bloqueándolos y enviándolos a destruir.' }
    ],
    biochemicalConceptSimple: '1. Fisiología normal: El nervio libera Acetilcolina -> Se une al receptor nicotínico en el músculo -> Se abre el canal de sodio -> El músculo se contrae. 2. En la Miastenia: Autoanticuerpos destruyen los receptores de acetilcolina -> Cada vez quedan menos receptores disponibles -> El nervio sigue enviando acetilcolina, pero no encuentra receptores suficientes para abrir el paso al sodio -> El músculo se agota rápidamente (fatiga).',
    clinicalHistory: {
      patientDemographics: {
        age: 36,
        gender: 'Femenino',
        occupation: 'Intérprete de Conferencias'
      },
      chiefComplaint: 'Cansancio para masticar la comida, dificultad para pronunciar palabras al final de su jornada y caída de los párpados al anochecer.',
      presentIllness: 'Valeria, de 36 años, acude a consulta por debilidad muscular en la cara y el cuello desde hace 3 meses. Explica que cuando lleva más de 15 minutos hablando de forma continuada en cabina de traducción, la voz se le vuelve nasal y le cuesta pronunciar las consonantes (disartria fatigable). Al comer alimentos como carne o pan duro, los músculos de la mandíbula se le agotan a mitad del plato y necesita descansar 10 minutos con la mano apoyada en la barbilla para poder terminar de masticar. Por las tardes, sus párpados se caen involuntariamente (ptosis), tapándole parte de los ojos. Tras descansar o dormir una siesta, se despierta con fuerza muscular normal.',
      pastMedicalHistory: ['Tiroiditis autoinmune (de Hashimoto) tratada con hormona tiroidea', 'Sin antecedentes neurológicos'],
      medications: ['Levotiroxina 50 µg/día'],
      lifestyle: 'No fumadora, no consume alcohol, vida sedentaria activa.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '118/74 mmHg',
        hr: '72 lpm',
        rr: '14 rpm',
        temp: '36.6 °C',
        sao2: '99%'
      },
      findings: [
        { systemName: 'Examen de ojos y cara', description: 'Prueba de mirada fija hacia arriba: tras mantener la vista elevada durante 60 segundos, los párpados superiores caen progresivamente tapando la pupila (prueba de fatiga positiva). Pérdida de fuerza en la sonrisa.' },
        { systemName: 'Fuerza en brazos y piernas', description: 'Al mantener los brazos levantados en cruz, empiezan a descender por cansancio a los 2 minutos. Los reflejos con el martillo de exploración son normales y simétricos.' }
      ]
    },
    initialLabWork: [
      { test: 'Hemograma Completo', result: 'Leucocitos 6.200 /µL, Hemoglobina 13.5 g/dL', unit: '', referenceRange: 'Normal' },
      { test: 'Hormona Tiroidea (TSH)', result: '2.1', unit: 'mUI/L', referenceRange: '0.4 - 4.0 (Tiroides normal)' },
      { test: 'Electromiograma (EMG) con estímulos repetidos', result: 'Caída progresiva (decremento del 24%) de la respuesta del músculo ante estímulos seguidos', unit: '%', referenceRange: 'Caída < 10%', isAbnormal: true },
      { test: 'Prueba del Hielo en los Párpados', result: 'Colocar hielo en el párpado caído durante 2 minutos eleva y abre el párpado al enfriar la zona y frenar la degradación de acetilcolina', unit: '-', referenceRange: 'Negativo', isAbnormal: true }
    ],
    differentialDiagnoses: [
      {
        disease: 'Miastenia Gravis Autoinmune (Defecto en el Receptor del Músculo)',
        plausibilityRationale: 'Debilidad que fluctúa a lo largo del día, empeora con el uso repetido del músculo, afecta a párpados/voz/masticación y mejora con el reposo; prueba de electromiografía con caída de señal.',
        isTargetDisease: true
      },
      {
        disease: 'Síndrome de Lambert-Eaton (Defecto en el Nervio Presináptico)',
        plausibilityRationale: 'Enfermedad similar pero donde la fuerza del músculo PARADÓJICAMENTE MEJORA tras hacer ejercicio unos segundos, y los reflejos están ausentes.',
        isTargetDisease: false
      },
      {
        disease: 'Miopatía Inflamatoria / Polimiositis',
        plausibilityRationale: 'Produce debilidad muscular fija (no cambia a lo largo del día) y las células musculares se rompen, disparando la enzima CK a más de 1.000 U/L.',
        isTargetDisease: false
      },
      {
        disease: 'Esclerosis Múltiple',
        plausibilityRationale: 'Afecta al cerebro y la médula espinal, provocando hormigueos, pérdida de visión en un ojo y reflejos exagerados con reflejo de Babinski.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Miastenia Gravis Autoinmune (Defecto en el Receptor del Músculo)',
    biomarkerOptions: [
      {
        id: 'bm_opt_achr_correct',
        biomarkerId: 'bm_achr_ab',
        biomarkerName: 'Anticuerpos Anti-Receptor de Acetilcolina (AChR-Ab en Sangre)',
        isCorrect: true,
        biochemicalRationale: 'El receptor de acetilcolina en el músculo es un poro que se abre cuando llega la acetilcolina. En la Miastenia Gravis, el sistema inmunitario fabrica autoanticuerpos dirigidos contra este receptor. Estos anticuerpos lo bloquean y provocan que la célula muscular lo internalice y lo destruya en los lisosomas. Detectar estos anticuerpos en la sangre confirma la Miastenia con más del 99% de certeza médica.',
        whyOptimalOrSuboptimal: 'Es el biomarcador específico y definitivo: demuestra exactamente el mecanismo autoinmune que está destruyendo la comunicación nervio-músculo.'
      },
      {
        id: 'bm_opt_anti_vgcc_distractor',
        biomarkerId: 'bm_anti_vgcc',
        biomarkerName: 'Anticuerpos Anti-Canales de Calcio (Anti-VGCC)',
        isCorrect: false,
        biochemicalRationale: 'Estos anticuerpos atacan a los canales de calcio del nervio antes de que se libere la acetilcolina (defecto presináptico).',
        whyOptimalOrSuboptimal: 'Solo sirve para diagnosticar el Síndrome de Lambert-Eaton (asociado muchas veces a tumores de pulmón), no la Miastenia Gravis clásica.'
      },
      {
        id: 'bm_opt_ck_distractor',
        biomarkerId: 'bm_ck_total',
        biomarkerName: 'Creatina Quinasa Total (CK en Sangre)',
        isCorrect: false,
        biochemicalRationale: 'La CK es una enzima que está dentro del músculo y se escapa cuando la fibra muscular se rompe físicamente (necrosis o desgarro).',
        whyOptimalOrSuboptimal: 'Es totalmente normal en la Miastenia Gravis: el músculo está intacto por dentro, lo único que falla es el receptor de la superficie.'
      },
      {
        id: 'bm_opt_lactato_distractor',
        biomarkerId: 'bm_lactato',
        biomarkerName: 'Lactato Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Ácido que se acumula cuando los tejidos no reciben suficiente oxígeno (falta de riego o shock).',
        whyOptimalOrSuboptimal: 'Completamente normal; no aporta información sobre la unión neuromuscular.'
      }
    ],
    expertClinicalKey: 'Tratamiento Bioquímico Explicado Fácil: El fármaco principal es la Piridostigmina. Este medicamento frena a la enzima Acetilcolinesterasa (la encargada de degradar la acetilcolina). Al tardar más en romperse, la acetilcolina permanece más tiempo esperando en la sinapsis y tiene muchas más oportunidades de encontrar los pocos receptores que aún no han sido destruidos por los anticuerpos.',
    essentialBiomarkerIds: ['bm_achr_ab'],
    categoryDocente: 'Receptores de Membrana, Neurotransmisión y Autoinmunidad',
    signalingType: 'Canal Iónico de la Placa Motora (Receptor Nicotínico de Acetilcolina)',
    molecularPathway: 'Nervio libera Acetilcolina -> Hendidura Sináptica -> Receptor Nicotínico en Músculo -> Entrada de Sodio -> Contracción',
    molecularAlteration: 'Autoanticuerpos bloquean y envían a degradar a los receptores nicotínicos de la superficie del músculo'
  },
  {
    id: 'case_marks_organofosforados_01',
    title: 'Lucas G. (4 años): Salivación excesiva, temblores y pupilas muy pequeñas',
    system: 'neuromuscular',
    difficulty: 'experto',
    studentSummary: 'Lucas G., un niño de 4 años, entra en contacto accidental con un envase de insecticida agrícola organofosforado en una finca. En menos de una hora presenta babeo continuo, vómitos, diarrea, ojos con pupilas contraídas al mínimo (miosis), corazón muy lento (bradicardia) y temblores o sacudidas musculares. El veneno anula la enzima que destruye la acetilcolina, dejando a su organismo en un estado de sobreestimulación colinérgica masiva y peligrosa.',
    clinicalGlossary: [
      { term: 'Miosis puntiforme', simpleDefinition: 'Pupilas extraordinariamente contraídas y diminutas, semejantes a la cabeza de un alfiler, que no aumentan de tamaño con la luz ni en la oscuridad.' },
      { term: 'Sialorrea y Broncorrea', simpleDefinition: 'Producción masiva e incontrolable de saliva en la boca y de líquido/moco en los bronquios, que dificulta gravemente la entrada de aire a los pulmones.' },
      { term: 'Fasciculaciones musculares', simpleDefinition: 'Temblores, sacudidas o pequeñas contracciones visibles bajo la piel producidas porque el músculo recibe órdenes continuas de contraerse.' },
      { term: 'Acetilcolinesterasa (AChE)', simpleDefinition: 'Enzima imprescindible que actúa como un "interruptor de apagado", destruyendo la acetilcolina para que el cuerpo pueda relajarse.' },
      { term: 'Envejecimiento enzimático (Aging)', simpleDefinition: 'Proceso químico por el cual la unión entre el veneno y la enzima pierde un grupo molecular con el paso de las horas, volviéndose irreversible para siempre.' }
    ],
    biochemicalConceptSimple: '1. Situación normal: El nervio envía acetilcolina -> El órgano o músculo se activa -> La enzima Acetilcolinesterasa corta la acetilcolina en milisegundos -> El órgano descansa. 2. En la intoxicación: El insecticida se une con un enlace covalente (químicamente inseparable) a la serina del centro activo de la enzima y la destruye -> La acetilcolina no puede degradarse y se acumula -> Todas las glándulas sudan y babean sin freno, el corazón se frena al extremo y los músculos sufren temblores incesantes.',
    clinicalHistory: {
      patientDemographics: {
        age: 4,
        gender: 'Masculino',
        occupation: 'Preescolar'
      },
      chiefComplaint: 'Babeo incesante, vómitos, diarrea líquida explosiva, temblores en brazos y piernas y respiración con ruidos de moco.',
      presentIllness: 'Niño de 4 años acude trasladado en ambulancia medicalizada tras jugar en el trastero de una finca donde manipuló una botella abierta de insecticida agrícola (organofosforado). A los 40 minutos comienza a llorar con dolor de barriga, vómitos repetidos, diarrea líquida incontrolable, sudoración fría que empapa la ropa y exceso de saliva que le cae por la boca (sialorrea). Su madre nota que el niño tiembla, tiene sacudidas en los músculos de las piernas y respira haciendo ruidos húmedos en el pecho.',
      pastMedicalHistory: ['Vacunación al día', 'Niño previamente sano sin enfermedades'],
      medications: ['Ninguno'],
      lifestyle: 'Visita de fin de semana a una casa de campo familiar.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '74/42 mmHg (presión arterial baja / hipotensión)',
        hr: '46 latidos por minuto (corazón peligrosamente lento / bradicardia)',
        rr: '34 respiraciones por minuto con esfuerzo para respirar',
        temp: '35.8 °C (cuerpo frío por exceso de sudor)',
        sao2: '88% con aire ambiente (mejora a 94% con mascarilla de oxígeno)'
      },
      findings: [
        { systemName: 'Ojos y Cara', description: 'Pupilas muy pequeñas como cabezas de alfiler (miosis puntiforme bilateral). Exceso continuo de saliva en la boca y lágrimas en los ojos.' },
        { systemName: 'Pulmones y Respiración', description: 'Ruidos de moco y burbujas en ambos pulmones a la auscultación (broncorrea colinérgica masiva). Riesgo de ahogo si no se aspira y medica de urgencia.' },
        { systemName: 'Músculos', description: 'Pequeñas sacudidas y temblores involuntarios bajo la piel de brazos, muslos y lengua (fasciculaciones musculares).' }
      ]
    },
    initialLabWork: [
      { test: 'pH de la Sangre Arterial', result: '7.26', unit: '-', referenceRange: '7.35 - 7.45 (Acidosis respiratoria y metabólica)', isAbnormal: true },
      { test: 'Bicarbonato en Sangre', result: '15.2', unit: 'mEq/L', referenceRange: '22 - 26', isAbnormal: true },
      { test: 'pCO2 en Sangre', result: '52', unit: 'mmHg', referenceRange: '35 - 45 (Retención de CO2 por broncoespasmo y debilidad diafragmática)', isAbnormal: true },
      { test: 'Glucemia en Urgencias', result: '148', unit: 'mg/dL', referenceRange: '70 - 110 (Hiperglucemia reactiva por estrés)', isAbnormal: true },
      { test: 'Potasio en Sangre', result: '3.6', unit: 'mEq/L', referenceRange: '3.5 - 5.1' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Intoxicación Aguda por Insecticida Organofosforado (Síndrome Colinérgico)',
        plausibilityRationale: 'Reúne todos los signos típicos de exceso de acetilcolina: exceso de secreciones (saliva, sudor, moco), corazón lento, pupilas diminutas y temblores musculares tras contacto con pesticida.',
        isTargetDisease: true
      },
      {
        disease: 'Intoxicación por Plaguicidas Carbamatos',
        plausibilityRationale: 'Produce los mismos síntomas pero la unión del carbamato a la enzima se deshace sola de forma espontánea en 24 a 48 horas sin dejar la enzima dañada para siempre.',
        isTargetDisease: false
      },
      {
        disease: 'Sobredosis por Medicamentos Opiáceos (Morfina/Fentanilo)',
        plausibilityRationale: 'También produce pupilas muy pequeñas y presión baja, pero el paciente con opioides tiene la boca y los pulmones completamente secos y no tiene diarrea ni temblores.',
        isTargetDisease: false
      },
      {
        disease: 'Gastroenteritis Infecciosa Aguda con Deshidratación',
        plausibilityRationale: 'Puede dar vómitos y diarrea, pero nunca produce pupilas puntiformes, bradicardia extrema de 46 lpm ni temblores en los músculos.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Intoxicación Aguda por Insecticida Organofosforado (Síndrome Colinérgico)',
    biomarkerOptions: [
      {
        id: 'bm_opt_colinesterasa_correct',
        biomarkerId: 'bm_colinesterasa',
        biomarkerName: 'Medición de la Actividad de la Enzima Acetilcolinesterasa en Sangre (AChE)',
        isCorrect: true,
        biochemicalRationale: 'La prueba clave en el laboratorio es medir cuánta capacidad le queda a la enzima acetilcolinesterasa para romper acetilcolina. En este niño, la actividad enzimática ha caído a menos del 20% de su valor normal porque el pesticida ha inutilizado químicamente casi todas sus moléculas de enzima.',
        whyOptimalOrSuboptimal: 'Es el biomarcador definitivo: demuestra la inhibición directa de la enzima y avisa a los médicos de que deben administrar el antídoto antes de que el enlace químico sea irreversible.'
      },
      {
        id: 'bm_opt_ck_organo_distractor',
        biomarkerId: 'bm_ck_total',
        biomarkerName: 'Creatina Quinasa Total (CK)',
        isCorrect: false,
        biochemicalRationale: 'Enzima que sube si los músculos sufren rotura por ejercicio extremo o golpes.',
        whyOptimalOrSuboptimal: 'No mide el veneno ni la función del nervio; puede subir algo por las contracciones musculares pero no sirve para diagnosticar la intoxicación.'
      },
      {
        id: 'bm_opt_achr_organo_distractor',
        biomarkerId: 'bm_achr_ab',
        biomarkerName: 'Anticuerpos Anti-Receptor de Acetilcolina (AChR-Ab)',
        isCorrect: false,
        biochemicalRationale: 'Anticuerpos del sistema inmunitario de la Miastenia Gravis.',
        whyOptimalOrSuboptimal: 'Es una prueba de enfermedad autoinmune crónica; es completamente inútil en una intoxicación tóxica aguda de urgencias.'
      },
      {
        id: 'bm_opt_lactato_organo_distractor',
        biomarkerId: 'bm_lactato',
        biomarkerName: 'Lactato Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Indica que los tejidos están sufriendo por falta de oxígeno debido a la presión baja.',
        whyOptimalOrSuboptimal: 'Avisa de que el paciente está grave, pero no nos dice qué sustancia o veneno ha causado el problema.'
      }
    ],
    expertClinicalKey: 'Los Dos Antídotos que Salvan la Vida: 1) Atropina IV: medicamento que tapa los receptores de acetilcolina para secar de inmediato el moco de los pulmones y hacer que el corazón vuelva a latir rápido; 2) Pralidoxima (2-PAM): molécula que arranca el insecticida pegado a la enzima acetilcolinesterasa para reactivarla. ¡Debe darse en las primeras 24-48 horas antes de que ocurra el fenómeno de envejecimiento (aging), tras el cual la enzima queda destruida para siempre!',
    essentialBiomarkerIds: ['bm_colinesterasa'],
    categoryDocente: 'Inhibición Enzimática Covalente y Toxicología Bioquímica',
    molecularPathway: 'Plaguicida -> Bloqueo Covalente de Serina en Acetilcolinesterasa -> Acumulación de Acetilcolina -> Crisis Colinérgica',
    molecularAlteration: 'Inhibición química irreversible de la enzima que degrada el neurotransmisor acetilcolina en las sinapsis'
  },
  {
    id: 'case_marks_colera_01',
    title: 'Samuel F. (6 años): Pérdida rápida de líquidos y diarrea como agua de arroz',
    system: 'metabolic',
    difficulty: 'avanzado',
    studentSummary: 'Samuel F., un niño de 6 años, sufre una diarrea acuosa blanquecina masiva (típica en "agua de arroz") pocas horas después de comer mariscos al vapor durante un viaje costero. Pierde más de 1.5 litros de líquido en una sola mañana y entra en deshidratación crítica. La toxina de la bacteria Vibrio cholerae bloquea el "interruptor" molecular que regula la salida de sales y agua en el intestino, provocando una fuga incontrolable de líquido hacia las heces.',
    clinicalGlossary: [
      { term: 'Diarrea en "agua de arroz"', simpleDefinition: 'Diarrea completamente líquida, transparente o blanquecina con pequeñas partículas de moco flotando, sin olor fétido y sin restos fecales normales ni sangre.' },
      { term: 'Signo del pliegue cutáneo', simpleDefinition: 'Al pellizcar suavemente la piel del abdomen, esta queda arrugada y tarda varios segundos en volver a su posición habitual, indicando deshidratación grave.' },
      { term: 'Azoemia prerrenal', simpleDefinition: 'Subida de los niveles de urea y creatinina en sangre provocada porque la deshidratación hace que llegue muy poca sangre a los riñones para filtrar.' },
      { term: 'Canal CFTR', simpleDefinition: 'Túnel o canal en la membrana de las células intestinales que bombea cloruro y agua hacia el interior del intestino.' },
      { term: 'Cotransportador SGLT-1', simpleDefinition: 'Transportador que mete a la vez sodio y glucosa al interior de la célula intestinal, arrastrando agua consigo.' }
    ],
    biochemicalConceptSimple: '1. La bacteria Vibrio cholerae produce la Toxina Colérica -> 2. La toxina entra al enterocito y pega una molécula de ADP-ribosa a la proteína reguladora Gαs -> 3. La proteína Gαs pierde la capacidad de apagarse y queda encendida de forma permanente -> 4. Se fabrica una cantidad masiva de AMPc intracelular -> 5. El AMPc mantiene abierto sin descanso el canal de cloruro CFTR -> El cloruro, el sodio y el agua salen en tromba al intestino (hasta 1 litro/hora).',
    clinicalHistory: {
      patientDemographics: {
        age: 6,
        gender: 'Masculino',
        occupation: 'Escolar'
      },
      chiefComplaint: 'Diarrea líquida blanquecina incesante en "agua de arroz", vómitos continuos y decaimiento extremo con incapacidad para ponerse de pie.',
      presentIllness: 'Niño de 6 años es traído a urgencias en brazos de sus padres, casi inconsciente por deshidratación crítica. El día anterior, la familia estuvo comiendo almejas y cangrejos al vapor en un puesto costero. A las 5:00 de la madrugada el niño empezó con vómitos y, poco después, con una diarrea líquida continua de color blanquecino sin sangre ni dolor de tripa, con un aspecto idéntico al agua en la que se lava el arroz. Ha realizado más de 12 deposiciones abundantes en 6 horas (más de 1,5 litros de líquido perdidos). Lleva 7 horas sin hacer nada de pis (anuria).',
      pastMedicalHistory: ['Vacunación infantil en regla', 'Previamente sano'],
      medications: ['Ninguno'],
      lifestyle: 'Viaje reciente a zona costera de veraneo.'
    },
    physicalExam: {
      vitalSigns: {
        bp: '68/38 mmHg (presión arterial peligrosamente baja / shock hipovolémico)',
        hr: '148 latidos por minuto (corazón acelerado para intentar mantener el riego)',
        rr: '30 respiraciones por minuto (respiración rápida para compensar la acidez)',
        temp: '36.1 °C',
        sao2: '96%'
      },
      findings: [
        { systemName: 'Aspecto e Hidratación', description: 'Niño muy dormido y apático (letárgico). Ojos profundamente hundidos en las cuencas (enoftalmos). Lengua y labios secos como papel de lija. El pellizco en la piel del abdomen tarda más de 3 segundos en desaparecer (deshidratación severa > 10% de su peso).' },
        { systemName: 'Circulación periférica', description: 'Manos y pies fríos al tacto, pálidos y con un relleno capilar muy lento (tarda 5 segundos en volver el color tras presionar la uña).' }
      ]
    },
    initialLabWork: [
      { test: 'Hematocrito (concentración de la sangre)', result: '51', unit: '%', referenceRange: '35 - 45 (Sangre muy espesa por falta de agua)', isAbnormal: true },
      { test: 'Sodio en Sangre (Na+)', result: '132', unit: 'mEq/L', referenceRange: '135 - 145', isAbnormal: true },
      { test: 'Potasio en Sangre (K+)', result: '2.6', unit: 'mEq/L', referenceRange: '3.5 - 5.0 (Peligrosamente bajo por pérdida en diarrea)', isAbnormal: true },
      { test: 'Bicarbonato en Sangre (HCO3-)', result: '9.8', unit: 'mEq/L', referenceRange: '21 - 28 (Acidosis metabólica grave)', isAbnormal: true },
      { test: 'pH de la Sangre', result: '7.18', unit: '-', referenceRange: '7.35 - 7.45 (Sangre muy ácida)', isAbnormal: true },
      { test: 'Urea en Sangre', result: '78', unit: 'mg/dL', referenceRange: '15 - 40 (Elevación prerrenal por hemoconcentración y choque)', isAbnormal: true },
      { test: 'Cloro en Sangre (Cl-)', result: '108', unit: 'mEq/L', referenceRange: '96 - 106', isAbnormal: true }
    ],
    differentialDiagnoses: [
      {
        disease: 'Infección por Vibrio cholerae Productor de Toxina (Cólera Epidémico)',
        plausibilityRationale: 'Diarrea líquida secretora enorme en agua de arroz sin dolor de tripa ni sangre tras comer mariscos, con colapso de la presión y pérdida masiva de potasio y bicarbonato.',
        isTargetDisease: true
      },
      {
        disease: 'Infección Bacteriana Invasiva (por Shigella o Salmonella)',
        plausibilityRationale: 'Cursa con fiebre muy alta, cólicos fuertes de barriga y heces con moco y sangre (disentería), que están totalmente ausentes en este niño.',
        isTargetDisease: false
      },
      {
        disease: 'Gastroenteritis Infantil por Rotavirus',
        plausibilityRationale: 'Causa diarrea líquida en niños, pero suele empezar con fiebre y catarro previo, y no produce la pérdida de litros de agua tan repentina del cólera.',
        isTargetDisease: false
      },
      {
        disease: 'Síndrome Urémico Hemolítico (E. coli O157:H7)',
        plausibilityRationale: 'Causa fallo del riñón, pero siempre empieza con diarrea con abundante sangre fresca y destruye las plaquetas y los glóbulos rojos.',
        isTargetDisease: false
      }
    ],
    targetDisease: 'Infección por Vibrio cholerae Productor de Toxina (Cólera Epidémico)',
    biomarkerOptions: [
      {
        id: 'bm_opt_cholera_correct',
        biomarkerId: 'bm_cholera_toxin',
        biomarkerName: 'Detección de la Toxina Colérica y Cultivo en Agar TCBS',
        isCorrect: true,
        biochemicalRationale: 'La enterotoxina colérica es la responsable directa del cuadro: bloquea la proteína Gαs y deja encendido el canal CFTR, forzando la salida masiva de cloruro y agua. En el laboratorio, cultivar las heces en el medio especial agar TCBS (donde la bacteria forma colonias amarillas) y detectar la presencia de la toxina confirma de forma irrefutable que el paciente padece cólera.',
        whyOptimalOrSuboptimal: 'Es la prueba microbiológica y bioquímica de elección: identifica con precisión al microorganismo responsable y su toxina secretora.'
      },
      {
        id: 'bm_opt_lactato_cholera_distractor',
        biomarkerId: 'bm_lactato',
        biomarkerName: 'Lactato Plasmático',
        isCorrect: false,
        biochemicalRationale: 'Ácido que se acumula cuando los órganos no reciben suficiente sangre oxigenada debido a la deshidratación y presión baja.',
        whyOptimalOrSuboptimal: 'Inespecífico: avisa de que el niño está en shock hipovolémico, pero no identifica la causa de la diarrea.'
      },
      {
        id: 'bm_opt_creatinina_cholera_distractor',
        biomarkerId: 'bm_creatinina',
        biomarkerName: 'Creatinina Sérica y Tasa de Filtrado',
        isCorrect: false,
        biochemicalRationale: 'Medida del daño que están sufriendo los riñones por no recibir sangre.',
        whyOptimalOrSuboptimal: 'Nos indica que hay un fracaso renal agudo por falta de líquidos (prerrenal), pero no señala la bacteria causante.'
      },
      {
        id: 'bm_opt_beta_ohb_cholera_distractor',
        biomarkerId: 'bm_beta_hidroxibutirato',
        biomarkerName: 'Beta-Hidroxibutirato en Sangre (Cuerpos Cetónicos)',
        isCorrect: false,
        biochemicalRationale: 'Sustancia que fabrica el hígado cuando una persona lleva muchas horas sin comer o en la diabetes descompensada.',
        whyOptimalOrSuboptimal: 'No guarda relación con el mecanismo de la diarrea secretora bacteriana.'
      }
    ],
    expertClinicalKey: 'La Maravilla Bioquímica de la Rehidratación Oral (TRO): La toxina del cólera inutiliza la absorción normal de agua pero deja totalmente INTACTO al cotransportador SGLT-1 (que mete sodio junto con glucosa a las células). Por eso, darle al paciente una solución con la proporción exacta de azúcar y sal (suero oral) hace que el intestino reabsorba agua a gran velocidad, salvando millones de vidas en todo el mundo sin necesidad de sueros intravenosos.',
    essentialBiomarkerIds: ['bm_cholera_toxin'],
    categoryDocente: 'Señalización por Proteínas G Heterotriméricas y Transportadores de Membrana',
    signalingType: 'Proteína Gαs -> Adenilato Ciclasa -> Mensajero AMPc -> Apertura Canal CFTR',
    molecularPathway: 'Toxina de Cólera -> Deja a Gαs encendida sin poder apagarse -> AMPc masivo -> Canal CFTR abierto -> Pérdida de 1L/h de agua',
    molecularAlteration: 'Modificación con ADP-ribosa en la proteína Gαs que le impide hidrolizar GTP a GDP'
  }
];

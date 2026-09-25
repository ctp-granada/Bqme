import { ClinicalCase } from '../types';

export const CLINICAL_CASES_DATABASE: ClinicalCase[] = [
  // ==========================================
  // CASOS CARDÍACOS
  // ==========================================
  {
    id: 'case_cardiac_01',
    title: 'Dolor Torácico Opresivo de 3 Horas de Evolución en Varón de 58 Años',
    system: 'cardiac',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 58,
        gender: 'Masculino',
        occupation: 'Ejecutivo Financiero'
      },
      chiefComplaint: 'Dolor torácico retroesternal irradiado a cuello y brazo izquierdo.',
      presentIllness: 'Paciente acude al servicio de urgencias refiriendo dolor precordial opresivo de intensidad 9/10 iniciado hace 3 horas mientras realizaba ejercicio moderado. Se acompaña de diaforesis profusa y náuseas. No ha remitido con reposo.',
      pastMedicalHistory: ['Hipertensión Arterial Esencial', 'Dislipidemia Mixta', 'Diabetes Mellitus Tipo 2'],
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
      { test: 'Electrocardiograma (ECG)', result: 'Descenso del segmento ST de 1.5 mm en derivaciones V4-V6 e inversión de onda T', unit: 'mm', referenceRange: 'Isoeléctrico' },
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
        biochemicalRationale: 'La troponina cardíaca es la isoforma miocardioespecífica de elección. Su liberación rápida a partir de las 2-4 horas post-evento (con valores >50 ng/L) confirma el daño miocárdico irreversible.',
        whyOptimalOrSuboptimal: 'Es el biomarcador óptimo porque permite confirmar la necrosis miocárdica en la ventana de 3 horas del paciente, diferenciando en forma categórica el SCASEST de la Angina Inestable.'
      },
      {
        id: 'bm_opt_2',
        biomarkerId: 'bm_ckmb',
        biomarkerName: 'CK-MB Masa',
        isCorrect: false,
        biochemicalRationale: 'La CK-MB requiere de 4 a 6 horas para elevarse significativamente por encima de 5 ng/mL. Posee además menor especificidad por presencia en músculo esquelético.',
        whyOptimalOrSuboptimal: 'Inadecuado en esta ventana precoz de 3 horas por menor sensibilidad comparada con la troponina ultrasensible.'
      },
      {
        id: 'bm_opt_3',
        biomarkerId: 'bm_nt_probnp',
        biomarkerName: 'NT-proBNP',
        isCorrect: false,
        biochemicalRationale: 'El NT-proBNP se sintetiza en respuesta al estiramiento de los miocitos ventriculares por sobrecarga de presión/volumen.',
        whyOptimalOrSuboptimal: 'Inespecífico para isquemia/necrosis celular aguda en ausencia de insuficiencia cardíaca descompensada.'
      },
      {
        id: 'bm_opt_4',
        biomarkerId: 'bm_ldh',
        biomarkerName: 'Lactato Deshidrogenasa Total (LDH)',
        isCorrect: false,
        biochemicalRationale: 'Enzima citosólica de elevación tardía (12-24 horas) y baja especificidad.',
        whyOptimalOrSuboptimal: 'Subóptimo por elevarse tardíamente y carecer de especificidad tisular.'
      }
    ],
    expertClinicalKey: 'En la ventana precoz (3 horas) de un posible SCASEST, la Troponina cardíaca (cTn) es el único biomarcador con la sensibilidad analítica y especificidad miocárdica suficientes para discriminar infarto agudo con necrosis de la angina inestable.'
  },

  // ==========================================
  // CASOS HEPÁTICOS Y DE COLESTASIS (ICTERICIAS)
  // ==========================================
  {
    id: 'case_hepatic_01',
    title: 'Ictericia Flavínica y Palidez Mucosa en Mujer de 34 Años con Astenia Severa',
    system: 'hepatic',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 34,
        gender: 'Femenino',
        occupation: 'Diseñadora Gráfica'
      },
      chiefComplaint: 'Coloración amarillenta en ojos (ictericia) y fatiga intensa desde hace 4 días.',
      presentIllness: 'Paciente acude por ictericia de tono pajizo/amarillo claro (flavínica) acompañada de astenia progresiva, palpitaciones y coluria leve. Niega prurito, dolor abdominal o acolia; sus deposiciones son de coloración café oscura normal/hipercólica.',
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
      { test: 'Hemoglobina', result: '6.8', unit: 'g/dL', referenceRange: '12.0 - 15.5' },
      { test: 'Bilirrubina Total', result: '5.8', unit: 'mg/dL', referenceRange: '0.3 - 1.2' },
      { test: 'Bilirrubina Directa', result: '0.2', unit: 'mg/dL', referenceRange: '< 0.3' },
      { test: 'ALT (GPT)', result: '32', unit: 'U/L', referenceRange: '< 40' },
      { test: 'AST (GOT)', result: '38', unit: 'U/L', referenceRange: '< 40' },
      { test: 'GGT', result: '28', unit: 'U/L', referenceRange: 'M < 40' },
      { test: 'Fosfatasa Alcalina', result: '75', unit: 'U/L', referenceRange: '40 - 130' }
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
    expertClinicalKey: 'La Ictericia Prehepática se caracteriza por elevación de la Bilirrubina Indirecta (No Conjugada) con preservación de la función hepática/biliar (GGT y FA normales) y marcado aumento de LDH por lisis de hematíes.'
  },

  {
    id: 'case_hepatic_02',
    title: 'Ictericia Verdínica, Coluria y Acolia en Mujer de 48 Años con Prurito Intenso',
    system: 'hepatic',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 48,
        gender: 'Femenino',
        occupation: 'Docente'
      },
      chiefComplaint: 'Tonalidad verdosa en la piel, orina muy oscura ("color té") y deposiciones blanquecinas.',
      presentIllness: 'Paciente refiere ictericia de tono verdínico de 6 días de evolución asociada a acolia (heces pálidas/blanquecinas), coluria marcada y prurito palmo-plantar generalizado insoportable. Presenta malestar vago en hipocondrio derecho.',
      pastMedicalHistory: ['Colelitiasis sintomática tratada conservadoramente'],
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
      { test: 'Bilirrubina Total', result: '9.2', unit: 'mg/dL', referenceRange: '0.3 - 1.2' },
      { test: 'Bilirrubina Directa', result: '8.1', unit: 'mg/dL', referenceRange: '< 0.3' },
      { test: 'ALT (GPT)', result: '85', unit: 'U/L', referenceRange: '< 40' },
      { test: 'AST (GOT)', result: '78', unit: 'U/L', referenceRange: '< 40' }
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
    expertClinicalKey: 'La Ictericia Posthepática (Obstructiva) cursa con predominio de Bilirrubina Directa (>0.3 mg/dL), acolia, coluria y elevación coordinada de Fosfatasa Alcalina y GGT.'
  },

  {
    id: 'case_hepatic_03',
    title: 'Nivel Extremo de Transaminasas y Asterixis en Joven tras Sobredosis de Analgésicos',
    system: 'hepatic',
    difficulty: 'avanzado',
    clinicalHistory: {
      patientDemographics: {
        age: 22,
        gender: 'Femenino',
        occupation: 'Estudiante'
      },
      chiefComplaint: 'Ictericia de inicio rápido, confusión y náuseas intensas.',
      presentIllness: 'Paciente ingresa 36 horas después de ingesta masiva autolítica de paracetamol (~20 g). Desarrolla dolor severo en hipocondrio derecho, ictericia franca y asterixis (flapping tremor).',
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
      { test: 'ALT (GPT)', result: '4850', unit: 'U/L', referenceRange: '< 40' },
      { test: 'AST (GOT)', result: '3920', unit: 'U/L', referenceRange: '< 40' },
      { test: 'Bilirrubina Total', result: '4.2', unit: 'mg/dL', referenceRange: '0.3 - 1.2' },
      { test: 'GGT', result: '45', unit: 'U/L', referenceRange: 'M < 40' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Ictericia Hepática / Citolítica (Necrosis Hepatocelular Aguda por Paracetamol)',
        plausibilityRationale: 'Ictericia de origen hepático parenquimatosos por agotamiento de glutatión y acumulación del metabolito tóxico NAPQI, provocando necrosis centrolobulillar y elevación masiva de ALT/AST (>1000 U/L).',
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
    expertClinicalKey: 'La Ictericia Hepática (Citolítica) se distingue por niveles masivos de ALT y AST (>1000 U/L) que reflejan ruptura de membranas del parenquima hepático.'
  },

  // ==========================================
  // CASOS METABÓLICOS Y BETA-OXIDACIÓN
  // ==========================================
  {
    id: 'case_metabolic_01',
    title: 'Acantosis Nigricans, Obesidad Abdominal e Hipertrigliceridemia en Varón de 42 Años',
    system: 'metabolic',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 42,
        gender: 'Masculino',
        occupation: 'Conductor de Autobús'
      },
      chiefComplaint: 'Aumento de peso, somnolencia posprandial y oscurecimiento de la piel en cuello y axilas.',
      presentIllness: 'Paciente acude a chequeo rutinario refiriendo aumento de perímetro abdominal en los últimos 2 años. Nota fatiga fácil tras comidas ricas en carbohidratos y manchas hiperpigmentadas terciopeladas en pliegues cutáneos.',
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
      { test: 'Glucemia en ayunas', result: '105', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'HbA1c', result: '5.6', unit: '%', referenceRange: '< 5,7' },
      { test: 'Triglicéridos', result: '240', unit: 'mg/dL', referenceRange: '< 150' },
      { test: 'HDL-colesterol', result: '34', unit: 'mg/dL', referenceRange: '> 40' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Estado de Resistencia a la Insulina / Síndrome Metabólico',
        plausibilityRationale: 'Glucemia en ayunas en límite superior (105 mg/dL) con HbA1c <5.7%, acantosis nigricans, obesidad central y dislipidemia aterogénica típica (TG > 150 mg/dL y HDL < 40 mg/dL).',
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
    expertClinicalKey: 'La Resistencia a la Insulina se manifiesta precozmente con hipertrigliceridemia (>150 mg/dL), HDL bajo y signos cutáneos (acantosis nigricans) antes de que la glucemia se eleve a rangos diabéticos.'
  },

  {
    id: 'case_metabolic_02',
    title: 'Poliuria, Polidipsia y Respiración de Kussmaul en Joven de 19 Años',
    system: 'metabolic',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 19,
        gender: 'Femenino',
        occupation: 'Estudiante'
      },
      chiefComplaint: 'Sed insaciable (polidipsia), orina muy frecuente (poliuria) y dolor abdominal con vómitos.',
      presentIllness: 'Paciente acude a urgencias por cuadro de 3 días de polidipsia intensa, poliuria y pérdida de 4 kg de peso. En las últimas 12 horas desarrolla náuseas, vómitos repetidos, dolor abdominal difuso y aliento con olor a "manzana/acetona".',
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
    title: 'Hipoglucemia Hipocetósica en Lactante de 14 Meses tras Cuadro Febril y Ayuno',
    system: 'metabolic',
    difficulty: 'experto',
    clinicalHistory: {
      patientDemographics: {
        age: 1.2,
        gender: 'Masculino',
        occupation: 'Lactante'
      },
      chiefComplaint: 'Letargia marcada, hipotonía y dificultad para despertar por la mañana.',
      presentIllness: 'Lactante de 14 meses es traído a urgencias soporoso tras un ayuno nocturno de 14 horas motivado por rechazo de tomas secundario a una infección viral leve de vías altas. La madre nota al niño muy pálido, frío y sudoroso.',
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
    title: 'Encefalopatía Aguda e Hiperamonemia en Neonato de 4 Días tras Ingesta Proteica',
    system: 'renal',
    difficulty: 'avanzado',
    clinicalHistory: {
      patientDemographics: {
        age: 0.01,
        gender: 'Masculino',
        occupation: 'Neonato'
      },
      chiefComplaint: 'Rechazo de tomas, vómitos, letargia e hiperventilación.',
      presentIllness: 'Neonato a término nacido sin complicaciones que al 3er día de vida inicia rechazo progresivo de la lactancia, vómitos alimentarios, irritabilidad extrema seguida de estupor y convulsiones focales.',
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
      { test: 'Amonio Plasmático', result: '380', unit: 'µmol/L', referenceRange: '< 50' },
      { test: 'Urea Sérica', result: '12', unit: 'mg/dL', referenceRange: '20 - 50' },
      { test: 'Glucemia en ayunas', result: '88', unit: 'mg/dL', referenceRange: '70 - 109' },
      { test: 'Creatinina Sérica', result: '0.5', unit: 'mg/dL', referenceRange: 'M: 0.5 - 1.1' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Defecto del Ciclo de la Urea (Deficiencia de Ornitina Transcarbamilasa - OTC)',
        plausibilityRationale: 'Hiperamonemia masiva neurotóxica (Amonio 380 µmol/L) con Urea anormalmente baja (12 mg/dL) e ingesta proteica desencadenante en el periodo neonatal por bloqueo de la desintoxicación del nitrógeno.',
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
    expertClinicalKey: 'Un nivel de Amonio Plasmático > 150 µmol/L con Urea muy baja o normal en un paciente encefalopático es patognomónico de un Defecto del Ciclo de la Urea.'
  },

  {
    id: 'case_renal_02',
    title: 'Podagra Aguda y Tumefacción en Primera Metatarsofalángica en Varón de 52 Años',
    system: 'renal',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 52,
        gender: 'Masculino',
        occupation: 'Empresario'
      },
      chiefComplaint: 'Dolor insoportable, eritema y calor en el dedo gordo del pie derecho.',
      presentIllness: 'Paciente despierta a mitad de la noche con dolor insoportable (10/10) en la primera articulación metatarsofalángica derecha (podagra). El dolor le impide el contacto con las sábanas. Refiere ingesta abundante de carne roja y mariscos con alcohol el día previo.',
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
      { test: 'Ácido Úrico Sérico', result: '9.8', unit: 'mg/dL', referenceRange: 'H: 3.5 - 7.0' },
      { test: 'Urea Sérica', result: '38', unit: 'mg/dL', referenceRange: '20 - 50' },
      { test: 'Creatinina Sérica', result: '1.0', unit: 'mg/dL', referenceRange: 'H: 0.7 - 1.3' },
      { test: 'PCR', result: '22', unit: 'mg/L', referenceRange: '< 5' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Hiperuricemia Primaria con Crisis Aguda de Gota (Artropatía por Urato Monosódico)',
        plausibilityRationale: 'Presentación típica de podagra aguda, hiperuricemia (9.8 mg/dL) favorecida por tiazidas y consumo de purinas/alcohol con función renal conservada.',
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
    expertClinicalKey: 'Un nivel de Ácido Úrico Sérico > 7.0 mg/dL en varones con monoartritis en 1ª metatarsofalángica (podagra) orienta al diagnóstico de Hiperuricemia Primaria y Gota.'
  },

  {
    id: 'case_renal_03',
    title: 'Oliguria e Hiperuricemia Severa tras Inicio de Quimioterapia en Linfoma de Alto Grado',
    system: 'renal',
    difficulty: 'experto',
    clinicalHistory: {
      patientDemographics: {
        age: 61,
        gender: 'Masculino',
        occupation: 'Contador'
      },
      chiefComplaint: 'Disminución drástica de la diuresis y debilidad extrema 48 horas post-quimioterapia.',
      presentIllness: 'Paciente diagnosticado de Linfoma no Hodgkin difuso de células B grandes de alta masa tumoral que inicia esquema de quimioterapia CIT. A las 48 horas presenta oliguria (orina < 250 mL/24h), nauseas, calambres musculares y somnolencia.',
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
      { test: 'Ácido Úrico Sérico', result: '15.4', unit: 'mg/dL', referenceRange: 'H: 3.5 - 7.0' },
      { test: 'LDH', result: '2100', unit: 'U/L', referenceRange: '140 - 280' },
      { test: 'Creatinina Sérica', result: '3.2', unit: 'mg/dL', referenceRange: 'H: 0.7 - 1.3' },
      { test: 'Fósforo', result: '7.2', unit: 'mg/dL', referenceRange: '2,5 - 4,5' },
      { test: 'Potasio', result: '6.1', unit: 'mmol/L', referenceRange: '3,5 - 5,0' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Hiperuricemia Secundaria a Síndrome de Lisis Tumoral (Nefropatía por Cristales de Urato)',
        plausibilityRationale: 'Lisis masiva celular tumoral post-quimioterapia que libera cantidades masivas de purinas (Ácido Úrico 15.4 mg/dL), LDH (2100 U/L), Potasio y Fósforo, provocando precipitación intraluminal tubular y Lesión Renal Aguda.',
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
    expertClinicalKey: 'La Hiperuricemia Secundaria en el Síndrome de Lisis Tumoral se diferencia de la primaria por niveles masivos de Ácido Úrico (>15 mg/dL) acompañados de elevación simultánea de LDH, Fósforo y Potasio con Lesión Renal Aguda.'
  },

  // ==========================================
  // CASOS PANCREÁTICOS
  // ==========================================
  {
    id: 'case_pancreatic_01',
    title: 'Dolor Epigástrico transfictivo en Cinturón y Suero Lactescente por Hipertrigliceridemia Extrema (>1800 mg/dL) en Varón de 44 Años',
    system: 'pancreatic',
    difficulty: 'avanzado',
    clinicalHistory: {
      patientDemographics: {
        age: 44,
        gender: 'Masculino',
        occupation: 'Transportista'
      },
      chiefComplaint: 'Dolor atroz en boca del estómago irradiado a la espalda, náuseas, vómitos incesantes y suero sanguíneo de aspecto lechoso.',
      presentIllness: 'Paciente acude a urgencias tras inicio súbito hace 10 horas de dolor epigástrico atroz (10/10) irradiado en cinturón hacia ambos flancos y región lumbar posterior. El dolor empeora en decúbito supino y mejora levemente en posición de plegaria maometana. Acompañado de náuseas y vómitos biliogástricos. En la extracción de sangre de urgencias, el analista destaca que la muestra presenta plasma marcadamente lechoso (opalescente/lactescente par excellence).',
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
      { test: 'Aspecto del Suero / Plasma', result: 'Lactescente (Lechoso / Lipémico intenso)', unit: '', referenceRange: 'Límpido / Transparente' },
      { test: 'Triglicéridos Séricos en ayunas', result: '1840', unit: 'mg/dL', referenceRange: '< 150 (Riesgo severo pancreatitis > 1000)' },
      { test: 'Lipasa Sérica', result: '980', unit: 'U/L', referenceRange: '10 - 140 (>3x LSN)' },
      { test: 'Amilasa Sérica Total', result: '155 (Falsamente normal/baja por interferencia lipémica)', unit: 'U/L', referenceRange: '13 - 53' },
      { test: 'Glucemia en ayunas', result: '245', unit: 'mg/dL', referenceRange: '70 - 109' }
    ],
    differentialDiagnoses: [
      {
        disease: 'Pancreatitis Aguda Secundaria a Hipertrigliceridemia Extrema (Síndrome de Quilomicronemia / Dislipidemia FVII)',
        plausibilityRationale: 'Presentación típica de dolor epigástrico en cinturón tras acumulación masiva de triglicéridos (> 1000 mg/dL) con suero lechoso y lipasa > 3 veces LSN. La lipasa pancreática descompone el exceso de triglicéridos liberando ácidos grasos libres citotóxicos que inducen isquemia acinar.',
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
    expertClinicalKey: 'La Hipertrigliceridemia Extrema (> 1.000 mg/dL) representa la 3ª causa más frecuente de Pancreatitis Aguda. El mecanismo bioquímico patogénico radica en la hidrólisis acinar de triglicéridos con liberación masiva de Ácidos Grasos Libres (AGL) tóxicos que inducen isquemia y necrosis microvascular. La lipemia severa (suero lechoso) interfiere en la medición espectrofotométrica de Amilasa (causando falsos negativos), por lo que la Lipasa Sérica junta con los Triglicéridos es la prueba confirmatoria.'
  },
  {
    id: 'case_pancreatic_02',
    title: 'Astenia Profunda, Parestesias Dedo-Digitales y Anemia Macrocítica en Mujer de 67 Años con Uso Crónico de Omeprazol',
    system: 'pancreatic',
    difficulty: 'avanzado',
    clinicalHistory: {
      patientDemographics: {
        age: 67,
        gender: 'Femenino',
        occupation: 'Jubilada'
      },
      chiefComplaint: 'Calambres dolorosos en manos y pies, adormecimiento peribucal, astenia progresiva y palpitaciones.',
      presentIllness: 'Paciente tratada de forma continuada con Omeprazol 40 mg/día desde hace 7 años por enfermedad por reflujo gastroesofágico (ERGE). Acude a consulta por cuadro de 4 meses de evolución caracterizado por fatiga marcada, debilidad generalizada, entumecimiento simétrico en manos y pies y calambres involuntarios en pantorrillas. No refiere melenas ni sangrado digestivo visible.',
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
    title: 'Anemia Ferropénica Refractaria, Diarrea Crónica y Distensión Abdominal en Joven de 29 Años',
    system: 'pancreatic',
    difficulty: 'intermedio',
    clinicalHistory: {
      patientDemographics: {
        age: 29,
        gender: 'Femenino',
        occupation: 'Abogada'
      },
      chiefComplaint: 'Heces blandas frecuentes, distensión abdominal postprandial, aftas bucales y astenia marcadas.',
      presentIllness: 'Paciente derivada por el servicio de Hematología tras 6 meses de tratamiento oral con sulfato ferroso por Anemia Ferropénica sin respuesta ni elevación de hemoglobina/ferritina. Refiere desde hace más de 1 año cuadros fluctuantes de diarrea (3-5 deposiciones diarias pastosas y fétidas), meteorismo intenso tras ingerir pan y pastas, pérdida involuntaria de 5 kg de peso y estomatitis aftosa recurrente.',
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
  }
];

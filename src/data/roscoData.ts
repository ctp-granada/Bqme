export interface RoscoItem {
  id: string;
  letter: string;
  prefix: 'Empieza por' | 'Contiene la';
  question: string;
  canonicalAnswer: string;
  acceptedAnswers: string[];
  category: string;
  explanation: string;
}

export interface RoscoEdition {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'estandar' | 'avanzado';
  badgeLabel: string;
  description: string;
  items: RoscoItem[];
}

export const ROSCO_EDITIONS: RoscoEdition[] = [
  {
    id: 'rosco_edicion_1',
    title: 'Rosco 1: Enzimas, Reguladores y Conceptos',
    subtitle: 'Nivel Estándar · Fisiopatología y Metabolismo Clínico',
    difficulty: 'estandar',
    badgeLabel: 'Edición 1 · Enzimas & Vías',
    description: 'Enzimas marcapasos, coenzimas, mediadores alostéricos y biomarcadores de urgencias.',
    items: [
      {
        id: 'r1_a',
        letter: 'A',
        prefix: 'Empieza por',
        question: 'Enzima reguladora de la síntesis de ácidos grasos que cataliza la formación de malonil-CoA a partir de acetil-CoA.',
        canonicalAnswer: 'Acetil-CoA carboxilasa',
        acceptedAnswers: [
          'acetil-coa carboxilasa',
          'acetil coa carboxilasa',
          'acc',
          'acetil coenzima a carboxilasa',
          'acetil-coenzima a carboxilasa'
        ],
        category: 'Enzima reguladora',
        explanation: 'La acetil-CoA carboxilasa (ACC) cataliza el paso limitante de la lipogénesis citosólica, activada por citrato e inhibida por palmitoil-CoA.'
      },
      {
        id: 'r1_b',
        letter: 'B',
        prefix: 'Empieza por',
        question: 'Coenzima necesaria para las reacciones de carboxilación, como las catalizadas por la piruvato carboxilasa y la acetil-CoA carboxilasa.',
        canonicalAnswer: 'Biotina',
        acceptedAnswers: ['biotina', 'vitamina b7', 'vitamina b8', 'vitamina h'],
        category: 'Coenzima',
        explanation: 'La biotina transfiere grupos carboxilo activados con gasto de ATP en carboxilasas metabólicas fundamentales.'
      },
      {
        id: 'r1_c',
        letter: 'C',
        prefix: 'Empieza por',
        question: 'Intermediario del ciclo de Krebs que activa alostéricamente la acetil-CoA carboxilasa e inhibe la fosfofructoquinasa-1.',
        canonicalAnswer: 'Citrato',
        acceptedAnswers: ['citrato', 'acido citrico', 'ácido cítrico'],
        category: 'Modulador alostérico',
        explanation: 'El citrato exportado al citosol indica abundancia energética, frenando la glucólisis y activando la síntesis de novo de ácidos grasos.'
      },
      {
        id: 'r1_d',
        letter: 'D',
        prefix: 'Empieza por',
        question: 'Producto de degradación de la fibrina entrecruzada cuya concentración plasmática se utiliza como marcador de activación de la coagulación y la fibrinólisis.',
        canonicalAnswer: 'Dímero D',
        acceptedAnswers: ['dimero d', 'dímero d', 'dimero-d', 'dímero-d', 'dimeros d', 'dímeros d'],
        category: 'Marcador bioquímico',
        explanation: 'El dímero D refleja la lisis de trombos entrecruzados por el factor XIIIa; clave para descartar tromboembolismo venoso.'
      },
      {
        id: 'r1_e',
        letter: 'E',
        prefix: 'Empieza por',
        question: 'Nombre alternativo de la adrenalina, hormona que estimula la glucogenólisis y favorece la movilización de los triglicéridos almacenados.',
        canonicalAnswer: 'Epinefrina',
        acceptedAnswers: ['epinefrina', 'adrenalina'],
        category: 'Hormona',
        explanation: 'La epinefrina (adrenalina) es la catecolamina que activa los receptores beta-adrenérgicos desencadenando la cascada de AMPc y PKA.'
      },
      {
        id: 'r1_f',
        letter: 'F',
        prefix: 'Empieza por',
        question: 'Metabolito regulador que activa la fosfofructoquinasa-1 e inhibe la fructosa-1,6-bisfosfatasa, favoreciendo la glucólisis.',
        canonicalAnswer: 'Fructosa-2,6-bisfosfato',
        acceptedAnswers: [
          'fructosa-2,6-bisfosfato',
          'fructosa 2,6 bisfosfato',
          'fructosa-2,6-bifosfato',
          'fructosa 2,6 bifosfato',
          'f2,6bp',
          'f-2,6-bp'
        ],
        category: 'Modulador alostérico',
        explanation: 'La fructosa-2,6-bisfosfato sintetizada por la PFK-2 es el regulador maestro recíproco de la glucólisis y la gluconeogénesis hepática.'
      },
      {
        id: 'r1_g',
        letter: 'G',
        prefix: 'Empieza por',
        question: 'Enzima que participa en la degradación del glucógeno y libera glucosa-1-fosfato.',
        canonicalAnswer: 'Glucógeno fosforilasa',
        acceptedAnswers: ['glucogeno fosforilasa', 'glucógeno fosforilasa', 'fosforilasa'],
        category: 'Enzima',
        explanation: 'Cataliza la rotura fosforolítica de los enlaces alfa-1,4 del glucógeno dependiente de piridoxal fosfato (PLP).'
      },
      {
        id: 'r1_h',
        letter: 'H',
        prefix: 'Empieza por',
        question: 'Enzima reguladora de la síntesis de colesterol que convierte el HMG-CoA en mevalonato y constituye la diana de las estatinas.',
        canonicalAnswer: 'HMG-CoA reductasa',
        acceptedAnswers: [
          'hmg-coa reductasa',
          'hmg coa reductasa',
          '3-hidroxi-3-metilglutaril-coa reductasa',
          'hmgcoa reductasa'
        ],
        category: 'Enzima',
        explanation: 'La HMG-CoA reductasa microsomal cataliza la reacción irreversible y limitante de la síntesis de colesterol.'
      },
      {
        id: 'r1_i',
        letter: 'I',
        prefix: 'Empieza por',
        question: 'Proteína del retículo endoplasmático que, cuando abundan los esteroles, se une a SCAP, retiene el complejo SCAP-SREBP y reduce la síntesis de colesterol.',
        canonicalAnswer: 'Insig',
        acceptedAnswers: ['insig', 'insig-1', 'insig 1', 'insig-2', 'insig 2', 'proteina insig', 'proteína insig'],
        category: 'Proteína reguladora',
        explanation: 'Insig detecta altos niveles de esteroles en la membrana del RE bloqueando el transporte vesicular de SREBP al Golgi.'
      },
      {
        id: 'r1_j',
        letter: 'J',
        prefix: 'Contiene la',
        question: 'Trastorno hereditario benigno con hiperbilirrubinemia conjugada por defecto de excreción canalicular y pigmentación oscura del hígado.',
        canonicalAnswer: 'Síndrome de Dubin-Johnson',
        acceptedAnswers: [
          'sindrome de dubin-johnson',
          'síndrome de dubin-johnson',
          'dubin-johnson',
          'dubin johnson',
          'sindrome de dubin johnson',
          'síndrome de dubin johnson'
        ],
        category: 'Trastorno hereditario',
        explanation: 'Mutación autosómica recesiva en el transportador ABCC2/MRP2 que impide verter bilirrubina conjugada a los canalículos biliares.'
      },
      {
        id: 'r1_k',
        letter: 'K',
        prefix: 'Contiene la',
        question: 'Proteína de la membrana apical de los enterocitos que facilita la absorción intestinal de colesterol y es la diana de la ezetimiba.',
        canonicalAnswer: 'Niemann-Pick C1-Like 1 (NPC1L1)',
        acceptedAnswers: [
          'niemann-pick c1-like 1',
          'npc1l1',
          'niemann pick c1 like 1',
          'npc1-l1',
          'niemann-pick',
          'niemann pick'
        ],
        category: 'Transportador',
        explanation: 'NPC1L1 media la endocitosis de esteroles en el ribete en cepillo; la ezetimiba lo bloquea selectivamente.'
      },
      {
        id: 'r1_l',
        letter: 'L',
        prefix: 'Empieza por',
        question: 'Enzima situada en el endotelio capilar que hidroliza los triglicéridos transportados por quilomicrones y VLDL.',
        canonicalAnswer: 'Lipoproteína lipasa',
        acceptedAnswers: ['lipoproteina lipasa', 'lipoproteína lipasa', 'lpl', 'lipoproteina-lipasa'],
        category: 'Enzima endotelial',
        explanation: 'La LPL capilar anclada a proteoglicanos requiere apoC-II para hidrolizar triglicéridos en glicerol y ácidos grasos libres.'
      },
      {
        id: 'r1_m',
        letter: 'M',
        prefix: 'Empieza por',
        question: 'Metabolito producido por la acetil-CoA carboxilasa que participa en la síntesis de ácidos grasos e inhibe la CPT-I.',
        canonicalAnswer: 'Malonil-CoA',
        acceptedAnswers: ['malonil-coa', 'malonil coa', 'malonil coenzima a'],
        category: 'Metabolito regulador',
        explanation: 'El malonil-CoA frena la carnitina palmitoiltransferasa I (CPT-I), impidiendo que los ácidos grasos entren a la mitocondria durante la lipogénesis.'
      },
      {
        id: 'r1_n',
        letter: 'N',
        prefix: 'Empieza por',
        question: 'Coenzima reducida que transporta electrones hacia la cadena respiratoria y que, cuando se acumula, inhibe varias enzimas oxidativas.',
        canonicalAnswer: 'NADH',
        acceptedAnswers: [
          'nadh',
          'nadh+h+',
          'nicotinamida adenina dinucleotido reducido',
          'nicotinamida adenina dinucleótido reducido',
          'nad reducido'
        ],
        category: 'Coenzima reducida',
        explanation: 'El NADH mitocondrial dona dos electrones al complejo I (NADH deshidrogenasa) generando 2.5 ATP por fosforilación oxidativa.'
      },
      {
        id: 'r1_o',
        letter: 'O',
        prefix: 'Empieza por',
        question: 'Intermediario de cuatro carbonos formado por la piruvato carboxilasa y utilizado tanto en el ciclo de Krebs como en la gluconeogénesis.',
        canonicalAnswer: 'Oxalacetato',
        acceptedAnswers: ['oxalacetato', 'acido oxalacetico', 'ácido oxalacético', 'oxaloacetato'],
        category: 'Intermediario metabólico',
        explanation: 'El oxalacetato condensa con acetil-CoA para formar citrato y alimenta la síntesis de fosfoenolpiruvato.'
      },
      {
        id: 'r1_p',
        letter: 'P',
        prefix: 'Empieza por',
        question: 'Enzima gluconeogénica que convierte el oxalacetato en fosfoenolpiruvato y cuya expresión aumenta en respuesta al glucagón.',
        canonicalAnswer: 'PEPCK (Fosfoenolpiruvato carboxiquinasa)',
        acceptedAnswers: [
          'pepck',
          'fosfoenolpiruvato carboxiquinasa',
          'fosfoenolpiruvato carboxicinasa',
          'pep carboxiquinasa',
          'pep-carboxiquinasa'
        ],
        category: 'Enzima',
        explanation: 'La PEPCK consume GTP para descarboxilar y fosforilar el oxalacetato generando PEP en la gluconeogénesis.'
      },
      {
        id: 'r1_q',
        letter: 'Q',
        prefix: 'Contiene la',
        question: 'Enzima reguladora que fosforila e inactiva el complejo piruvato deshidrogenasa.',
        canonicalAnswer: 'Quinasa de la piruvato deshidrogenasa (PDH quinasa)',
        acceptedAnswers: [
          'quinasa de la piruvato deshidrogenasa',
          'pdh quinasa',
          'piruvato deshidrogenasa quinasa',
          'pdk',
          'quinasa de piruvato deshidrogenasa'
        ],
        category: 'Enzima reguladora',
        explanation: 'La PDH quinasa (PDK) fosforila la subunidad E1 inhibiendo la formación de acetil-CoA cuando aumentan ATP, NADH o acetil-CoA.'
      },
      {
        id: 'r1_r',
        letter: 'R',
        prefix: 'Contiene la',
        question: 'Enzima reguladora de la gluconeogénesis que transforma la fructosa-1,6-bisfosfato en fructosa-6-fosfato y es inhibida por AMP.',
        canonicalAnswer: 'Fructosa-1,6-bisfosfatasa',
        acceptedAnswers: [
          'fructosa-1,6-bisfosfatasa',
          'fructosa 1,6 bisfosfatasa',
          'fructosa-1,6-bifosfatasa',
          'f1,6bpasa',
          'fbpasa-1',
          'fbpasa'
        ],
        category: 'Enzima',
        explanation: 'La FBPasa-1 cataliza la hidrólisis irreversible de F-1,6-BP; es el principal freno gluconeogénico ante baja carga energética celular.'
      },
      {
        id: 'r1_s',
        letter: 'S',
        prefix: 'Empieza por',
        question: 'Hormona peptídica que inhibe la secreción de otras hormonas, entre ellas la insulina y el glucagón.',
        canonicalAnswer: 'Somatostatina',
        acceptedAnswers: ['somatostatina', 'gih'],
        category: 'Hormona',
        explanation: 'Secretada por las células delta de los islotes de Langerhans, ejerce un control paracrino inhibidor sobre las células alfa y beta.'
      },
      {
        id: 'r1_t',
        letter: 'T',
        prefix: 'Empieza por',
        question: 'Enzima que cataliza la conversión de dUMP en dTMP, una reacción esencial para la síntesis de ADN.',
        canonicalAnswer: 'Timidilato sintasa',
        acceptedAnswers: ['timidilato sintasa', 'timidilato sintetasa', 'ts'],
        category: 'Enzima',
        explanation: 'Utiliza N5,N10-metilentetrahidrofolato para transferir un metilo a dUMP; diana del fármaco oncológico 5-fluorouracilo (5-FU).'
      },
      {
        id: 'r1_u',
        letter: 'U',
        prefix: 'Empieza por',
        question: 'Enzima bifuncional que cataliza las dos últimas reacciones de la síntesis de novo de pirimidinas y permite formar uridilato o UMP.',
        canonicalAnswer: 'Uridilato sintasa (UMP sintasa)',
        acceptedAnswers: ['uridilato sintasa', 'ump sintasa', 'ump sintetasa', 'uridilato sintetasa'],
        category: 'Enzima bifuncional',
        explanation: 'Agrupa las actividades orotato fosforribosiltransferasa y OMP descarboxilasa; su déficit produce aciduria orótica hereditaria.'
      },
      {
        id: 'r1_v',
        letter: 'V',
        prefix: 'Empieza por',
        question: 'Lipoproteína sintetizada principalmente en el hígado que transporta triglicéridos endógenos hacia los tejidos periféricos.',
        canonicalAnswer: 'VLDL',
        acceptedAnswers: ['vldl', 'lipoproteina de muy baja densidad', 'lipoproteína de muy baja densidad'],
        category: 'Lipoproteína',
        explanation: 'Contiene apoB-100 y distribuye triacilglicéridos a músculo y tejido adiposo; tras la acción de LPL se convierte en IDL y LDL.'
      },
      {
        id: 'r1_x',
        letter: 'X',
        prefix: 'Contiene la',
        question: 'Enzima que fosforila la glucosa en la mayoría de los tejidos y presenta una elevada afinidad por este monosacárido.',
        canonicalAnswer: 'Hexoquinasa',
        acceptedAnswers: ['hexoquinasa', 'hexocinasa'],
        category: 'Enzima',
        explanation: 'Tiene baja Km (alta afinidad) por glucosa para asegurar su captura celular aun en hipoglucemia, y es inhibida por G-6-P.'
      },
      {
        id: 'r1_y',
        letter: 'Y',
        prefix: 'Contiene la',
        question: 'Proceso mediante el cual los triglicéridos almacenados en el tejido adiposo se degradan para liberar ácidos grasos y glicerol.',
        canonicalAnswer: 'Lipólisis',
        acceptedAnswers: ['lipolisis', 'lipólisis'],
        category: 'Proceso metabólico',
        explanation: 'Estimulada por glucagón y catecolaminas vía PKA activando a la lipasa de triglicéridos adiposa (ATGL) y la lipasa sensible a hormonas (HSL).'
      },
      {
        id: 'r1_z',
        letter: 'Z',
        prefix: 'Empieza por',
        question: 'Precursor enzimático inactivo que necesita una modificación, habitualmente una escisión proteolítica, para convertirse en una enzima activa.',
        canonicalAnswer: 'Zimógeno',
        acceptedAnswers: ['zimogeno', 'zimógeno', 'proenzima'],
        category: 'Precursor enzimático',
        explanation: 'Permite sintetizar proteasas digestivas (tripsinógeno) y factores de coagulación de forma inactiva sin dañar los tejidos productores.'
      }
    ]
  },
  {
    id: 'rosco_edicion_2',
    title: 'Rosco 2: Integración Metabólica y Coenzimas',
    subtitle: 'Nivel Avanzado · Regulación, Lanzaderas y Correlación Bioquímica',
    difficulty: 'avanzado',
    badgeLabel: 'Edición 2 · Nivel Avanzado',
    description: 'Lanzaderas mitocondriales, defectos de beta-oxidación, ciclo de la urea y coenzimas redox.',
    items: [
      {
        id: 'r2_a',
        letter: 'A',
        prefix: 'Empieza por',
        question: 'Enzima mitocondrial cuya deficiencia impide utilizar ácidos grasos de cadena larga durante el ayuno; transfiere grupos acilo desde CoA a carnitina en la matriz.',
        canonicalAnswer: 'Acil-CoA deshidrogenasa',
        acceptedAnswers: [
          'acil-coa deshidrogenasa',
          'acil coa deshidrogenasa',
          'acil coenzima a deshidrogenasa',
          'vlcadd',
          'mcadd'
        ],
        category: 'Enzima de beta-oxidación',
        explanation: 'Las acil-CoA deshidrogenasas catalizan la primera oxidación de cada vuelta transfiriendo electrones a ETF; existen isoenzimas según la longitud.'
      },
      {
        id: 'r2_b',
        letter: 'B',
        prefix: 'Empieza por',
        question: 'Pigmento tetrapirrólico producido al degradarse el hemo; antes de su conjugación hepática circula estrechamente unido a albúmina.',
        canonicalAnswer: 'Bilirrubina',
        acceptedAnswers: [
          'bilirrubina',
          'bilirrubina no conjugada',
          'bilirrubina indirecta',
          'bilirrubina libre'
        ],
        category: 'Producto del catabolismo del hemo',
        explanation: 'La bilirrubina no conjugada es liposoluble y tóxica para el SNC; requiere unión a albúmina y glucuronidación hepática por UGT1A1.'
      },
      {
        id: 'r2_c',
        letter: 'C',
        prefix: 'Empieza por',
        question: 'Enzima mitocondrial regulada por malonil-CoA que controla la entrada de ácidos grasos de cadena larga en la matriz para su beta-oxidación.',
        canonicalAnswer: 'Carnitina palmitoiltransferasa I (CPT-I)',
        acceptedAnswers: [
          'carnitina palmitoiltransferasa i',
          'carnitina palmitoiltransferasa 1',
          'cpt-i',
          'cpt1',
          'cpt-1',
          'carnitina palmitoil transferasa 1',
          'carnitina palmitoil transferasa i',
          'cpt i'
        ],
        category: 'Enzima reguladora',
        explanation: 'CPT-I es el marcapasos de la lanzadera de carnitina; el malonil-CoA frena la oxidación cuando la lipogénesis está activa.'
      },
      {
        id: 'r2_d',
        letter: 'D',
        prefix: 'Empieza por',
        question: 'Enzima lipogénica dependiente de NADPH que introduce un doble enlace cis en el acil-CoA saturado y contribuye a generar oleato.',
        canonicalAnswer: 'Desaturasa estearoil-CoA',
        acceptedAnswers: [
          'desaturasa estearoil-coa',
          'estearoil-coa desaturasa',
          'desaturasa',
          'estearoil coa desaturasa',
          'delta-9 desaturasa',
          'delta 9 desaturasa',
          'scd'
        ],
        category: 'Enzima',
        explanation: 'La estearoil-CoA desaturasa (SCD-1) introduce un doble enlace delta-9 en el estearato para formar ácido oleico monoinsaturado.'
      },
      {
        id: 'r2_e',
        letter: 'E',
        prefix: 'Empieza por',
        question: 'Enzima del ciclo de la urea que incorpora aspartato al citrulil-AMP activado para formar argininosuccinato.',
        canonicalAnswer: 'Argininosuccinato sintetasa',
        acceptedAnswers: [
          'argininosuccinato sintetasa',
          'arginosuccinato sintetasa',
          'argininosuccinato sintasa',
          'enzima argininosuccinato sintetasa',
          'ass'
        ],
        category: 'Enzima del ciclo de la urea',
        explanation: 'La argininosuccinato sintetasa citosólica consume ATP hasta AMP + PPi, equivalente al gasto de dos enlaces de alta energía.'
      },
      {
        id: 'r2_f',
        letter: 'F',
        prefix: 'Empieza por',
        question: 'Derivado de la vitamina B2 que acepta dos electrones y dos protones en enzimas como la succinato deshidrogenasa.',
        canonicalAnswer: 'FAD (Flavín adenín dinucleótido)',
        acceptedAnswers: [
          'fad',
          'flavin adenin dinucleotido',
          'flavina adenina dinucleotido',
          'flavin adenina dinucleotido',
          'flavín adenín dinucleótido'
        ],
        category: 'Coenzima redox',
        explanation: 'FAD deriva de riboflavina (B2) y acepta dos átomos de hidrógeno completos (2e- y 2H+), a diferencia del NAD+ que capta un ion hidruro.'
      },
      {
        id: 'r2_g',
        letter: 'G',
        prefix: 'Empieza por',
        question: 'Enzima hepática de alta Km para glucosa que actúa como sensor metabólico posprandial y no se inhibe por glucosa-6-fosfato.',
        canonicalAnswer: 'Glucocinasa',
        acceptedAnswers: [
          'glucocinasa',
          'glucoquinasa',
          'hexoquinasa iv',
          'hexocinasa iv',
          'hexoquinasa 4',
          'hexocinasa 4'
        ],
        category: 'Enzima sensora',
        explanation: 'La glucocinasa hepática y pancreática no se satura a niveles fisiológicos de glucemia, permitiendo al hígado captar glucosa masivamente tras comer.'
      },
      {
        id: 'r2_h',
        letter: 'H',
        prefix: 'Empieza por',
        question: 'Enzima de la lanzadera del malato-aspartato que interconvierte glutamato y alfa-cetoglutarato mediante una reacción PLP-dependiente.',
        canonicalAnswer: 'Glutamato-oxalacetato transaminasa (GOT / AST)',
        acceptedAnswers: [
          'glutamato-oxalacetato transaminasa',
          'got',
          'ast',
          'aspartato aminotransferasa',
          'glutamato oxalacetato transaminasa',
          'got/ast'
        ],
        category: 'Enzima transaminasa',
        explanation: 'AST/GOT utiliza fosfato de piridoxal y transfiere el grupo amino entre aspartato y glutamato en ambos lados de la membrana mitocondrial.'
      },
      {
        id: 'r2_i',
        letter: 'I',
        prefix: 'Empieza por',
        question: 'Proteína del retículo endoplasmático que secuestra el complejo SCAP-SREBP cuando aumenta el colesterol celular.',
        canonicalAnswer: 'Insig',
        acceptedAnswers: ['insig', 'insig-1', 'insig 1', 'insig-2', 'insig 2', 'proteina insig', 'proteína insig'],
        category: 'Proteína reguladora',
        explanation: 'Insig mantiene anclado el complejo SCAP-SREBP en la membrana del retículo, apagando la transcripción de HMG-CoA reductasa y receptor de LDL.'
      },
      {
        id: 'r2_j',
        letter: 'J',
        prefix: 'Contiene la',
        question: 'Trastorno hereditario benigno con hiperbilirrubinemia conjugada por defecto de excreción canalicular y pigmentación oscura del hígado.',
        canonicalAnswer: 'Síndrome de Dubin-Johnson',
        acceptedAnswers: [
          'sindrome de dubin-johnson',
          'síndrome de dubin-johnson',
          'dubin-johnson',
          'dubin johnson',
          'sindrome de dubin johnson',
          'síndrome de dubin johnson'
        ],
        category: 'Trastorno hereditario',
        explanation: 'Mutación en MRP2 que genera hepatomegalia con depósito de pigmento negruzco y coproporfirinuria I característica.'
      },
      {
        id: 'r2_k',
        letter: 'K',
        prefix: 'Contiene la',
        question: 'Proteína intestinal diana de ezetimiba que internaliza colesterol luminal en el enterocito.',
        canonicalAnswer: 'Niemann-Pick C1-Like 1 (NPC1L1)',
        acceptedAnswers: [
          'niemann-pick c1-like 1',
          'npc1l1',
          'niemann pick c1 like 1',
          'niemann-pick',
          'niemann pick',
          'npc1-l1'
        ],
        category: 'Transportador enterocitario',
        explanation: 'NPC1L1 transporta esteroles en las microvellosidades del yeyuno; su inhibición por ezetimiba disminuye el LDL circulante.'
      },
      {
        id: 'r2_l',
        letter: 'L',
        prefix: 'Empieza por',
        question: 'Enzima lisosomal cuya deficiencia provoca acumulación de ésteres de colesterol y triglicéridos, con afectación hepática variable.',
        canonicalAnswer: 'Lipasa ácida lisosomal',
        acceptedAnswers: [
          'lipasa acida lisosomal',
          'lipasa ácida lisosomal',
          'lipasa acida',
          'lipasa ácida',
          'lal'
        ],
        category: 'Enzima lisosomal',
        explanation: 'La deficiencia de LAL produce enfermedad de Wolman o acumulación de ésteres de colesterol con hepatomegalia y esteatosis microvesicular.'
      },
      {
        id: 'r2_m',
        letter: 'M',
        prefix: 'Empieza por',
        question: 'Metabolito cuya concentración citosólica conecta lipogénesis y oxidación de ácidos grasos al inhibir CPT-I.',
        canonicalAnswer: 'Malonil-CoA',
        acceptedAnswers: ['malonil-coa', 'malonil coa', 'malonil coenzima a'],
        category: 'Metabolito regulador',
        explanation: 'El malonil-CoA es el regulador alostérico central del ciclo de Randle inverso: si hay síntesis de grasa, se frena su quema mitocondrial.'
      },
      {
        id: 'r2_n',
        letter: 'N',
        prefix: 'Empieza por',
        question: 'Coenzima fosforilada cuya forma reducida aporta poder reductor en síntesis de ácidos grasos y mantenimiento del glutatión reducido.',
        canonicalAnswer: 'NADPH',
        acceptedAnswers: [
          'nadph',
          'nadp+',
          'nadp',
          'nicotinamida adenina dinucleotido fosfato',
          'nicotinamida adenina dinucleótido fosfato'
        ],
        category: 'Coenzima reducida',
        explanation: 'El NADPH producido en la vía de las pentosas y por la enzima málica es el agente reductor esencial para las biosíntesis y contra el estrés oxidativo.'
      },
      {
        id: 'r2_o',
        letter: 'O',
        prefix: 'Empieza por',
        question: 'Intermediario que debe convertirse en malato o aspartato para abandonar indirectamente la matriz mitocondrial durante la gluconeogénesis.',
        canonicalAnswer: 'Oxalacetato',
        acceptedAnswers: ['oxalacetato', 'acido oxalacetico', 'ácido oxalacético', 'oxaloacetato'],
        category: 'Intermediario metabólico',
        explanation: 'La membrana interna carece de transportador para oxalacetato libre; debe reducirse a malato o transaminarse a aspartato para salir al citosol.'
      },
      {
        id: 'r2_p',
        letter: 'P',
        prefix: 'Empieza por',
        question: 'Enzima mitocondrial dependiente de biotina activada por acetil-CoA que repone oxalacetato a partir de piruvato.',
        canonicalAnswer: 'Piruvato carboxilasa',
        acceptedAnswers: ['piruvato carboxilasa', 'pc'],
        category: 'Enzima anaplerótica',
        explanation: 'La piruvato carboxilasa cataliza la principal reacción anaplerótica del ciclo de Krebs y el primer paso de la gluconeogénesis desde piruvato.'
      },
      {
        id: 'r2_q',
        letter: 'Contiene la',
        prefix: 'Contiene la',
        question: 'Enzima citosólica que produce NADPH en la fase oxidativa de la vía de las pentosas y cuya deficiencia predispone a estrés oxidativo eritrocitario.',
        canonicalAnswer: 'Glucosa-6-fosfato deshidrogenasa (G6PD)',
        acceptedAnswers: [
          'glucosa-6-fosfato deshidrogenasa',
          'g6pd',
          'glucosa 6 fosfato deshidrogenasa',
          'g6pdh'
        ],
        category: 'Enzima citosólica',
        explanation: 'El déficit de G6PD es la enzimopatía eritrocitaria más frecuente en el mundo; causa crisis hemolíticas inducidas por fármacos o habas.'
      },
      {
        id: 'r2_r',
        letter: 'Contiene la',
        prefix: 'Contiene la',
        question: 'Complejo mitocondrial multienzimático que convierte piruvato en acetil-CoA y es inhibido por fosforilación de su componente E1.',
        canonicalAnswer: 'Complejo piruvato deshidrogenasa (PDH)',
        acceptedAnswers: [
          'complejo piruvato deshidrogenasa',
          'piruvato deshidrogenasa',
          'pdh',
          'complejo pdh'
        ],
        category: 'Complejo enzimático',
        explanation: 'El complejo PDH une la glucólisis al ciclo de Krebs utilizando cinco coenzimas: TPP, lipoamida, CoA, FAD y NAD+.'
      },
      {
        id: 'r2_s',
        letter: 'S',
        prefix: 'Empieza por',
        question: 'Enzima del ciclo de Krebs que también constituye el complejo II de la cadena respiratoria y contiene FAD unido prostéticamente.',
        canonicalAnswer: 'Succinato deshidrogenasa',
        acceptedAnswers: ['succinato deshidrogenasa', 'sdh', 'complejo ii', 'complejo 2'],
        category: 'Enzima / Complejo II',
        explanation: 'Es la única enzima del ciclo de Krebs integrada directamente en la membrana mitocondrial interna, canalizando electrones hacia la ubiquinona (Q).'
      },
      {
        id: 'r2_t',
        letter: 'T',
        prefix: 'Empieza por',
        question: 'Enzima que transfiere una unidad metilo desde N5,N10-metilentetrahidrofolato al dUMP para formar dTMP.',
        canonicalAnswer: 'Timidilato sintasa',
        acceptedAnswers: ['timidilato sintasa', 'timidilato sintetasa', 'ts'],
        category: 'Enzima',
        explanation: 'La timidilato sintasa genera dTMP y oxida el folato donador a dihidrofolato, que debe ser regenerado por la dihidrofolato reductasa (DHFR).'
      },
      {
        id: 'r2_u',
        letter: 'U',
        prefix: 'Empieza por',
        question: 'Enzima bifuncional con actividades orotato fosforribosiltransferasa y OMP descarboxilasa, necesaria para formar UMP de novo.',
        canonicalAnswer: 'UMP sintasa',
        acceptedAnswers: ['ump sintasa', 'uridilato sintasa', 'ump sintetasa', 'uridilato sintetasa'],
        category: 'Enzima bifuncional',
        explanation: 'UMP sintasa reúne los dos pasos finales de la vía de novo de pirimidinas; su alteración provoca la excreción masiva de orotato en orina.'
      },
      {
        id: 'r2_v',
        letter: 'V',
        prefix: 'Empieza por',
        question: 'Lipoproteína rica en triglicéridos endógenos cuya partícula remanente puede transformarse en LDL tras lipólisis progresiva.',
        canonicalAnswer: 'VLDL',
        acceptedAnswers: ['vldl', 'lipoproteina de muy baja densidad', 'lipoproteína de muy baja densidad'],
        category: 'Lipoproteína',
        explanation: 'VLDL transporta grasa sintetizada en el hepatocito hacia la circulación; al perder triglicéridos se convierte sucesivamente en IDL y LDL aterogénica.'
      },
      {
        id: 'r2_x',
        letter: 'X',
        prefix: 'Contiene la',
        question: 'Ruta de degradación mitocondrial que acorta acil-CoA en unidades de dos carbonos y genera FADH2, NADH y acetil-CoA.',
        canonicalAnswer: 'Beta-oxidación',
        acceptedAnswers: [
          'beta-oxidacion',
          'beta oxidacion',
          'b-oxidacion',
          'b oxidacion',
          'beta-oxidación',
          'beta oxidación'
        ],
        category: 'Vía metabólica',
        explanation: 'La beta-oxidación genera un FADH2, un NADH y un acetil-CoA por cada ciclo de corte, produciendo un rendimiento neto muy elevado de ATP.'
      },
      {
        id: 'r2_y',
        letter: 'Y',
        prefix: 'Contiene la',
        question: 'Ciclo metabólico hepático que elimina nitrógeno como compuesto hidrosoluble y consume cuatro enlaces fosfato de alta energía por vuelta.',
        canonicalAnswer: 'Ciclo de la urea',
        acceptedAnswers: ['ciclo de la urea', 'urea'],
        category: 'Vía metabólica',
        explanation: 'El ciclo de la urea consume 3 moléculas de ATP pero 4 enlaces de alta energía (2 en carbamoil fosfato y 2 al degradar ATP a AMP en argininosuccinato).'
      },
      {
        id: 'r2_z',
        letter: 'Z',
        prefix: 'Empieza por',
        question: 'Precursor enzimático inactivo del que se obtiene una proteasa funcional mediante proteólisis limitada, mecanismo frecuente en digestión y coagulación.',
        canonicalAnswer: 'Zimógeno',
        acceptedAnswers: ['zimogeno', 'zimógeno', 'proenzima'],
        category: 'Precursor enzimático',
        explanation: 'Los zimógenos aseguran que enzimas potencialmente destructivas como la tripsina, quimotripsina o trombina solo se activen en su lugar de acción.'
      }
    ]
  }
];

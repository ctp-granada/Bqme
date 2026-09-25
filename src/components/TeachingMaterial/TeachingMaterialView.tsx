import React, { useState } from 'react';
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Download, 
  ExternalLink, 
  BookmarkCheck, 
  ChevronRight, 
  Sparkles, 
  Award,
  Layers,
  Search,
  BookMarked
} from 'lucide-react';

interface ModuleUnit {
  number: string;
  title: string;
  hours: number;
  topics: string[];
  clinicalPearls: string;
  keyBiomarkers: string[];
}

const SYLLABUS_MODULES: ModuleUnit[] = [
  {
    number: "MÓDULO I",
    title: "Bioquímica Estructural y Enzimología Clínica Diagnóstica",
    hours: 15,
    topics: [
      "Estructura y conformación de proteínas globulares y fibrosas.",
      "Cinética enzimática Michaelis-Menten: Km, Vmax e inhibición competitiva/no competitiva.",
      "Enzimas séricas de escape como biomarcadores de necrosis celular y daño tisular.",
      "Isoenzimas en medicina diagnóstica: Lactato deshidrogenasa (LDH 1-5), Creatina quinasa (CK-MM, MB, BB)."
    ],
    clinicalPearls: "La especificidad tisular de las isoenzimas permite identificar el órgano diana dañado en plasma sin recurrir a técnicas invasivas.",
    keyBiomarkers: ["CK-MB", "Troponina I/T ultrasensible", "LDH", "Amilasa", "Lipasa pancreática"]
  },
  {
    number: "MÓDULO II",
    title: "Metabolismo Intermediario y Bioenergética Celular",
    hours: 20,
    topics: [
      "Glucólisis aerobia y anaerobia, lanzaderas mitocondriales de electrones (malato-aspartato y glicerol-fosfato).",
      "Complejo piruvato deshidrogenasa (PDH) y Ciclo de Krebs: fosforilación a nivel de sustrato y deshidrogenaciones.",
      "Cadena de transporte de electrones, gradiente electroquímico y fosforilación oxidativa.",
      "Vía de las pentosas fosfato y mantenimiento del glutatión reducido en eritrocitos (déficit de G6PDH).",
      "Metabolismo del glucógeno hepático y muscular: regulación recíproca por fosforilación covalente.",
      "Lipólisis, beta-oxidación mitocondrial, carnitina y síntesis hepática de cuerpos cetónicos."
    ],
    clinicalPearls: "El desacoplamiento de la fosforilación oxidativa por termogenina genera calor en el tejido adiposo pardo; intoxicaciones por salicilatos o dinitrofenol reproducen este fenómeno con hipertermia y acidosis láctica.",
    keyBiomarkers: ["Lactato sérico", "Beta-hidroxibutirato", "Acetoacetato", "Glucemia", "Perfil lipídico"]
  },
  {
    number: "MÓDULO III",
    title: "Integración Metabólica y Fisiología de Órganos y Sistemas",
    hours: 15,
    topics: [
      "El Ciclo de Randle (competencia sustrato glucosa-ácidos grasos) en miocardio y músculo esquelético.",
      "Adaptación bioquímica al ayuno temprano, prolongado y realimentación.",
      "Ciclo de la Urea y eliminación del amonio: hiperamonemias congénitas y encefalopatía hepática.",
      "Metabolismo de lipoproteínas plasmáticas (quilomicrones, VLDL, IDL, LDL, HDL) y aterogénesis."
    ],
    clinicalPearls: "Durante el ayuno prolongado, el encéfalo sintetiza enzimas para utilizar beta-hidroxibutirato como sustrato energético, reduciendo el consumo obligatorio de glucosa y ahorrando proteína muscular.",
    keyBiomarkers: ["Amonio plasmático", "ApoB100", "ApoA1", "Colesterol no-HDL", "Lipoproteína(a)"]
  },
  {
    number: "MÓDULO IV",
    title: "Bioquímica Clínica, Patología Molecular y Biomarcadores",
    hours: 20,
    topics: [
      "Biomarcadores de necrosis miocárdica: curvas cinéticas y ventanas temporales de troponinas.",
      "Metabolismo de la bilirrubina y diagnóstico diferencial de ictericias prehepáticas, hepáticas y colestásicas.",
      "Fisiopatología de la hemostasia primaria y cascada de coagulación (vía extrínseca, intrínseca y común).",
      "Evaluación bioquímica de la función renal: creatinina, aclaramiento, cistatina C y albuminuria.",
      "Equilibrio hidroelectrolítico y gasometría: anión GAP y desequilibrios ácido-base complejos."
    ],
    clinicalPearls: "El anión GAP plasmático permite clasificar rápidamente las acidosis metabólicas en normoclorémicas (ganancia de ácidos como cetoácidos o lactato) frente a hiperclorémicas (pérdida de bicarbonato).",
    keyBiomarkers: ["Troponina I", "Bilirrubina total y directa", "Creatinina", "Cistatina C", "Dímero D", "Procalcitonina"]
  }
];

interface QuizItem {
  id: number;
  question: string;
  module: string;
  options: string[];
  correctIndex: number;
  rationale: string;
}

const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    question: "En un paciente con dolor torácico opresivo de 1 hora de evolución, ¿cuál es la razón bioquímica por la cual la Troponina Ultrasensible (hs-cTn) es superior a la Mioglobina y a la CK-MB?",
    module: "Módulo I / IV",
    options: [
      "A) Porque la troponina es una enzima citosólica de bajo peso molecular que difunde rápidamente a través de la membrana sin ruptura celular.",
      "B) Porque la troponina cardioespecífica posee isoformas codificadas por genes exclusivos del miocito cardíaco con una sensibilidad analítica y especificidad de tejido casi absolutas.",
      "C) Porque la troponina sérica se sintetiza de novo en el endotelio coronario tras la isquemia aguda.",
      "D) Porque la semivida plasmática de la troponina es de apenas 15 minutos, normalizándose antes que la CK-MB."
    ],
    correctIndex: 1,
    rationale: "Las troponinas cardíacas I y T (cTnI y cTnT) presentan isoformas estructurales codificadas por genes exclusivos del cardiomiocito, lo que les confiere una especificidad cardíaca prácticamente del 100%, a diferencia de la mioglobina o la CK-MB que pueden elevarse por traumatismo muscular esquelético."
  },
  {
    id: 2,
    question: "¿Qué alteración enzimática explica la hiperbilirrubinemia indirecta leve y benigna observada en el Síndrome de Gilbert?",
    module: "Módulo IV",
    options: [
      "A) Mutación en el promotor del gen UGT1A1 (inserción TATAA) que reduce la transcripción y actividad de la UDP-glucuronosiltransferasa hepática.",
      "B) Deficiencia en el transportador canalicular de aniones orgánicos multiespecíficos MRP2.",
      "C) Déficit congénito de la biliverdina reductasa eritrocitaria.",
      "D) Bloqueo completo e irreversible de la secreción biliar con destrucción de canalículos."
    ],
    correctIndex: 0,
    rationale: "El Síndrome de Gilbert se debe principalmente a un polimorfismo en la región promotora TATA del gen UGT1A1 (alelo A(TA)7TAA en lugar de A(TA)6TAA), que reduce la expresión de la UDP-glucuronosiltransferasa a aproximadamente el 30% del nivel normal, produciendo hiperbilirrubinemia no conjugada fluctuante en situaciones de ayuno o estrés."
  },
  {
    id: 3,
    question: "En la cetoacidosis diabética no controlada, ¿cuál es el mecanismo bioquímico que dispara la síntesis hepática masiva de cuerpos cetónicos?",
    module: "Módulo II / III",
    options: [
      "A) Activación de la glucógeno sintasa por hiperinsulinemia relativa.",
      "B) Bloqueo de la lipólisis que acumula glicerol en el tejido adiposo.",
      "C) Déficit absoluto de insulina con aumento de glucagón, lipólisis desmedida que satura la beta-oxidación hepática con exceso de Acetil-CoA y agotamiento de oxalacetato desviado a gluconeogénesis.",
      "D) Inhibición irreversible de la enzima HMG-CoA sintasa mitocondrial."
    ],
    correctIndex: 2,
    rationale: "El déficit de insulina desinhibe a la lipasa sensible a hormonas (LSH), liberando toneladas de ácidos grasos hacia el hígado. La beta-oxidación masiva genera cantidades ingentes de Acetil-CoA. Dado que el oxalacetato está consumido en la gluconeogénesis, el exceso de Acetil-CoA entra en la vía de la cetogénesis a través de la HMG-CoA sintasa mitocondrial."
  },
  {
    id: 4,
    question: "¿Por qué el tratamiento profiláctico con Clopidogrel reduce la probabilidad de trombosis arterial en pacientes con síndrome coronario agudo?",
    module: "Módulo IV",
    options: [
      "A) Porque inhibe irreversiblemente al receptor plaquetario P2Y12 de ADP, impidiendo la inactivación de la adenilato ciclasa y manteniendo el freno del AMPc intracelular.",
      "B) Porque degrada proteolíticamente el Fibrinógeno circulante.",
      "C) Porque bloquea la síntesis hepática de protrombina dependiente de vitamina K.",
      "D) Porque actúa como ligando alostérico agonista de la GPIIb/IIIa."
    ],
    correctIndex: 0,
    rationale: "El clopidogrel es una tienopiridina cuyo metabolito activo antagoniza de forma irreversible al receptor purinérgico P2Y12 acoplado a Gi. Al impedir que el ADP inhiba la adenilato ciclasa, los niveles de AMPc se mantienen elevados, bloqueando la movilización de calcio y la activación conformacional de la integrina GPIIb/IIIa."
  }
];

export const TeachingMaterialView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'temario' | 'seminarios' | 'autoevaluacion' | 'bibliografia' | 'guia'>('temario');
  const [selectedModule, setSelectedModule] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [searchFilter, setSearchFilter] = useState('');

  const filteredModules = SYLLABUS_MODULES.filter((m) =>
    m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    m.topics.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
    m.keyBiomarkers.some((b) => b.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              Portal Docente Oficial
            </span>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold text-slate-300 bg-slate-900 border border-slate-800">
              Departamento de Bioquímica y Biología Molecular • Facultad de Medicina UGR
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <span>Material Docente y Guía Académica de Bioquímica Médica</span>
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed">
            Programa académico oficial, temario detallado por competencias clínicas, guías de seminarios de aula y banco de autoevaluación con preguntas tipo examen MIR razonadas.
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto">
        {[
          { id: 'temario', label: 'Temario por Módulos', icon: BookOpen },
          { id: 'seminarios', label: 'Seminarios de Cátedra', icon: Layers },
          { id: 'autoevaluacion', label: 'Autoevaluación Test (MIR)', icon: HelpCircle },
          { id: 'bibliografia', label: 'Bibliografía Recomendada', icon: BookMarked },
          { id: 'guia', label: 'Guía Docente & Evaluación', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-950 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TEMARIO OFICIAL */}
      {activeTab === 'temario' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Buscar en el temario: enzimas, ciclo de Krebs, ictericias, troponinas..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Module Selector & Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Module List (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              {filteredModules.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedModule(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    selectedModule === idx
                      ? 'bg-slate-950 text-white border-slate-800 shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1">
                    <span className={selectedModule === idx ? 'text-emerald-400' : 'text-slate-500'}>
                      {m.number}
                    </span>
                    <span className="font-mono">{m.hours} Horas Lectivas</span>
                  </div>
                  <h3 className="text-xs font-bold leading-snug">
                    {m.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    {m.keyBiomarkers.slice(0, 3).map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          selectedModule === idx
                            ? 'bg-slate-900 text-slate-300 border border-slate-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {b}
                      </span>
                    ))}
                    {m.keyBiomarkers.length > 3 && (
                      <span className="text-[9px] text-slate-400">+{m.keyBiomarkers.length - 3}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Right: Selected Module Content (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              {filteredModules[selectedModule] && (
                <div className="space-y-5 text-xs">
                  <div className="border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {filteredModules[selectedModule].number} • Plan Docente Acreditado
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-1">
                      {filteredModules[selectedModule].title}
                    </h2>
                    <span className="text-slate-500 text-[11px] mt-1 block">
                      Carga lectiva: {filteredModules[selectedModule].hours} horas teóricas y seminarios prácticos
                    </span>
                  </div>

                  {/* Epígrafes oficiales */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                      Epígrafes y Contenidos Temáticos:
                    </span>
                    <ul className="space-y-2 text-slate-700">
                      {filteredModules[selectedModule].topics.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clinical Pearl */}
                  <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-1 text-emerald-950">
                    <span className="font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 text-emerald-900">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Perla Fisiopatológica de Integración Clínica:
                    </span>
                    <p className="leading-relaxed">
                      {filteredModules[selectedModule].clinicalPearls}
                    </p>
                  </div>

                  {/* Key Biomarkers */}
                  <div className="space-y-2">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                      Biomarcadores Diagnósticos Vinculados al Módulo:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {filteredModules[selectedModule].keyBiomarkers.map((bio, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono text-[11px] font-semibold border border-slate-200/90"
                        >
                          {bio}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: SEMINARIOS DE CÁTEDRA */}
      {activeTab === 'seminarios' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {[
              {
                title: "Seminario 1: Diagnóstico Diferencial del Síndrome Ictérico",
                desc: "Análisis sistemático de ictericias con tira reactiva de orina, estercobilina, transaminasas y fosfatasa alcalina. Caso de paciente con colestasis extrahepática vs hemólisis.",
                duration: "2 horas presenciales en aula de seminarios",
                skills: "Interpretación del patrón colestásico vs citolítico."
              },
              {
                title: "Seminario 2: Cinética Enzimática de Necrosis Miocárdica",
                desc: "Interpretación de algoritmos de 0/1h y 0/2h de troponina ultrasensible. Falsos positivos por insuficiencia renal o embolismo pulmonar agudo.",
                duration: "2 horas presenciales",
                skills: "Manejo del valor predictivo negativo de biomarcadores cardíacos."
              },
              {
                title: "Seminario 3: Gasometría Arterial y Trastornos Ácido-Base",
                desc: "Cálculo del anión GAP, delta-gap y compensaciones respiratorias esperadas en cetoacidosis diabética y acidosis tubular renal.",
                duration: "2 horas presenciales",
                skills: "Diferenciación de acidosis metabólica pura vs mixta."
              },
              {
                title: "Seminario 4: Enzimopatías Hereditarias y Pruebas de Coagulación",
                desc: "Déficit de G6PDH y hemólisis inducida por fármacos oxidantes (primaquina, sulfamidas). Estudio de hemofilias A/B frente a deficiencias de von Willebrand.",
                duration: "2 horas presenciales",
                skills: "Interpretación conjunta de TP, TTPA y fibrinógeno."
              }
            ].map((sem, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                    Seminario Clínico Obligatorio
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{sem.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {sem.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {sem.desc}
                </p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700">
                  <strong className="text-slate-900">Competencia evaluada:</strong> {sem.skills}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BANCO DE AUTOEVALUACIÓN TEST (MIR) */}
      {activeTab === 'autoevaluacion' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              Banco de Preguntas Tipo Test de Cátedra (Convocatorias Previas y MIR)
            </h2>
            <p className="text-xs text-slate-600">
              Ponga a prueba su razonamiento fisiopatológico con preguntas comentadas por el equipo docente.
            </p>
          </div>

          <div className="space-y-6">
            {QUIZ_QUESTIONS.map((q) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Pregunta #{q.id} • {q.module}
                    </span>
                    {isAnswered && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono ${
                        isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {isCorrect ? 'ACIERTO ✓' : 'FALLO ✕'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                    {q.question}
                  </p>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      let btnClass = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnClass = "bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold";
                        } else if (optIdx === selectedOpt) {
                          btnClass = "bg-rose-50 border-rose-300 text-rose-950";
                        } else {
                          btnClass = "bg-white border-slate-100 text-slate-400 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          disabled={isAnswered}
                          className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-4 rounded-xl text-xs space-y-1 ${
                      isCorrect ? 'bg-emerald-50/70 text-emerald-950 border border-emerald-200' : 'bg-rose-50/70 text-rose-950 border border-rose-200'
                    }`}>
                      <span className="font-bold block uppercase text-[10px] tracking-wider">
                        Justificación Bioquímica Oficial:
                      </span>
                      <p className="leading-relaxed">
                        {q.rationale}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: BIBLIOGRAFÍA */}
      {activeTab === 'bibliografia' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {[
              {
                title: "Bioquímica Médica (6ª Edición)",
                authors: "John W. Baynes & Marek H. Dominiczak",
                publisher: "Elsevier",
                desc: "Texto recomendado principal de la Cátedra. Enfoque marcadamente clínico centrado en la patología molecular humana y la interpretación de analíticas.",
                tag: "Manual de Referencia Principal"
              },
              {
                title: "Bioquímica con Aplicaciones Clínicas (7ª Edición)",
                authors: "Thomas M. Devlin",
                publisher: "Editorial Reverté",
                desc: "Obra de referencia exhaustiva con correlaciones clínicas completas al final de cada capítulo para profundizar en mecanismos enzimáticos y moleculares.",
                tag: "Manual de Consulta Avanzada"
              },
              {
                title: "Lippincott Illustrated Reviews: Bioquímica (8ª Edición)",
                authors: "Denise R. Ferrier",
                publisher: "Wolters Kluwer",
                desc: "Excelente para el estudio esquemático de rutas metabólicas complejas y su integración recíproca en el ciclo ayuno-alimentación.",
                tag: "Atlas y Esquemas Visuales"
              },
              {
                title: "Bioquímica Clínica y Patología Molecular",
                authors: "Sociedad Española de Bioquímica Clínica y Patología Molecular (SEQC-ML)",
                publisher: "Monografías del Laboratorio Clínico",
                desc: "Valores de referencia estandarizados, guías de consenso sobre troponinas de alta sensibilidad y biomarcadores renales en el Sistema Nacional de Salud.",
                tag: "Normativa Profesional y Guías"
              }
            ].map((book, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {book.tag}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {book.title}
                </h3>
                <div className="text-[11px] text-slate-500 font-medium">
                  <span>{book.authors}</span> • <span>{book.publisher}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {book.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: GUÍA DOCENTE & EVALUACIÓN */}
      {activeTab === 'guia' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs animate-fadeIn">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
              Ficha Técnica Oficial de la Asignatura
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Bioquímica Médica • Grado en Medicina (Universidad de Granada)
            </h2>
            <p className="text-slate-500 text-[11px] mt-1">
              Código de Asignatura: 2271112 • Carácter: Formación Básica Obligatoria • 6 ECTS • Curso Académico 2025/2026
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px]">Examen Final Teórico-Práctico (60%)</span>
              <p className="text-slate-600 leading-relaxed">
                Prueba objetiva de opción múltiple (preguntas tipo test de 4 alternativas con penalización de 0.33 por error) y resolución de casos clínicos de integración bioquímica.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px]">Simulador y Laboratorios (20%)</span>
              <p className="text-slate-600 leading-relaxed">
                Evaluación continua de casos clínicos resueltos en el simulador BIOMARK-SIM, retos diarios y prácticas con los laboratorios interactivos (Randle, Ictericias, Hemostasia).
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
              <span className="font-bold text-slate-900 block text-[11px]">Seminarios y Talleres (20%)</span>
              <p className="text-slate-600 leading-relaxed">
                Asistencia participativa, resolución de problemas analíticos de laboratorio y defensa de casos en grupos reducidos de seminario.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed space-y-2">
            <span className="font-bold text-slate-900 block">Sede Docente:</span>
            <p>
              Facultad de Medicina, Universidad de Granada (UGR). Edificio Central, Avenida de la Investigación 11, Parque Tecnológico de la Salud (PTS), 18016 Granada.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

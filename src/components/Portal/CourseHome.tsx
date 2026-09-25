import React from 'react';
import { ActiveModule } from '../../types';
import { 
  Building2,
  Trees,
  Stethoscope, 
  FlaskConical, 
  BookOpen, 
  Award, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  Layers, 
  Droplets, 
  RefreshCw, 
  CheckCircle2, 
  GraduationCap,
  Clock
} from 'lucide-react';

interface CourseHomeProps {
  onNavigate: (module: ActiveModule) => void;
  onOpenLab?: (lab: 'randle' | 'ictericias' | 'hemostasia') => void;
  userXP?: number;
  completedCasesCount?: number;
}

export const CourseHome: React.FC<CourseHomeProps> = ({
  onNavigate,
  onOpenLab,
  userXP = 0,
  completedCasesCount = 0
}) => {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Institutional Hero Banner */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle decorative medical cross grid */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Facultad de Medicina • Universidad de Granada (UGR)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-800">
              Campus de la Salud (PTS) • Curso 2025/2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Bioquímica Médica
            <span className="block text-xl sm:text-2xl font-normal text-slate-300 mt-1">
              Portal Oficial de la Asignatura y Plataforma de Aprendizaje Clínico
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Bienvenido al entorno docente digital del Departamento de Bioquímica y Biología Molecular I. Aquí encontrará el <strong className="text-white">simulador clínico de casos reales y biomarcadores</strong>, los <strong className="text-white">laboratorios virtuales interactivos</strong> (Ciclo de Randle, Ictericias, Hemostasia) y todo el <strong className="text-white">material docente acreditado</strong> para el Grado en Medicina.
          </p>

          <div className="pt-3 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('ciudad')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer ring-2 ring-emerald-400/30"
            >
              <Building2 className="w-4 h-4 text-emerald-200" />
              <span>Explorar Ciudad Biomédica</span>
              <span className="text-[10px] bg-emerald-950/60 text-emerald-200 px-2 py-0.5 rounded-full font-bold">3 Lugares Clave</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('casos')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4 text-rose-400" />
              <span>Simulador Clínico</span>
            </button>

            <button
              onClick={() => onNavigate('laboratorios')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span>Laboratorios</span>
            </button>

            <button
              onClick={() => onNavigate('docencia')}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Biblioteca & Docencia</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured: Ciudad Biomédica UGR 3 Key Locations Spotlight */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Entorno Inmersivo del Alumno
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-0.5">
              <span>La Ciudad Biomédica UGR</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                3 Lugares Clave
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Un campus diseñado para aprender de forma espacial y gamificada. Elige un distrito para comenzar tus actividades:
            </p>
          </div>
          <button
            onClick={() => onNavigate('ciudad')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto shrink-0"
          >
            <Building2 className="w-4 h-4" />
            <span>Abrir Plano Interactivo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* District 1: Hospital */}
          <div 
            onClick={() => onNavigate('casos')}
            className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/60 p-5 rounded-2xl transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/50">
                  Casos Clínicos
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                1. El Hospital Universitario
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Donde se resuelven los casos clínicos reales: anamnesis, exploración, selección razonada de biomarcadores y control de costes.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-rose-400">
              <span>Entrar a Urgencias</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* District 2: Biblioteca */}
          <div 
            onClick={() => onNavigate('docencia')}
            className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/60 p-5 rounded-2xl transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/50">
                  Estudio y Apoyo
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                2. La Biblioteca Médica
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Donde se encuentra el material de apoyo y estudio: temario estructurado, guías de seminarios, preguntas test MIR y vademécum de biomarcadores.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Consultar Temario</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* District 3: Parque Lúdico */}
          <div 
            onClick={() => onNavigate('laboratorios')}
            className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/60 p-5 rounded-2xl transition-all cursor-pointer space-y-3 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                  <Trees className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                  Gamificación
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                3. El Parque Lúdico
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Donde poner actividades de gamificación: simuladores de Randle, Ictericias y Hemostasia, retos diarios contrarreloj y minijuegos de preguntas flash.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Abrir Laboratorios & Retos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid: Access to Key Sections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Estructura Docente
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Espacios de Aprendizaje y Prácticas
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Clinical Simulator */}
          <div 
            onClick={() => onNavigate('casos')}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Simulador de Casos Clínicos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Entrenamiento con pacientes virtuales. Petición analítica razonada, coste de biomarcadores y retroalimentación bioquímica inmediata.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Acceder al Banco de Casos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Interactive Labs */}
          <div 
            onClick={() => onNavigate('laboratorios')}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Laboratorios Interactivos
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modelos cinéticos dinámicos: el Ciclo de Randle, Simulador de Ictericias de adulto/neonato y la Cascada de Coagulación.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Abrir Simuladores</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Teaching Material */}
          <div 
            onClick={() => onNavigate('docencia')}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-blue-400 flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Material Docente Oficial
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Temario completo estructurado en 4 módulos, guías de seminarios, preguntas tipo test MIR comentadas y bibliografía de cátedra.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Consultar Temario</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Biomarker Library */}
          <div 
            onClick={() => onNavigate('biblioteca')}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-slate-300 flex items-center justify-center font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                Biblioteca de Biomarcadores
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compendio analítico completo: valores de referencia, ventanas cinéticas, sensibilidad, especificidad y falsos positivos.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>Ver Fichas Analíticas</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section: The 3 Interactive Labs from Last Year */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Recursos de Éxito • Recomendados por Alumnos UGR
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Laboratorios Interactivos de Bioquímica Fisiopatológica
            </h2>
          </div>
          <button
            onClick={() => onNavigate('laboratorios')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Ver todos los laboratorios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Lab 1: Randle */}
          <div 
            onClick={() => {
              onNavigate('laboratorios');
              if (onOpenLab) onOpenLab('randle');
            }}
            className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🔄</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Metabolismo
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              El Ciclo de Randle
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Navegador metabólico interactivo. Competencia entre glucosa y ácidos grasos por el Acetil-CoA en ayuno y postprandio. Regulación por Malonil-CoA y CAT-1.
            </p>
            <span className="text-xs font-bold text-emerald-400 block pt-2">Abrir Navegador ➔</span>
          </div>

          {/* Lab 2: Ictericias */}
          <div 
            onClick={() => {
              onNavigate('laboratorios');
              if (onOpenLab) onOpenLab('ictericias');
            }}
            className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🧪</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Diagnóstico Clínico
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              Simulador de Ictericias
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagnóstico diferencial de ictericias con sliders analíticos de BT, BD, transaminasas y FA. Probeta de orina reactiva, acolia fecal y panel neonatal BIND/Kramer.
            </p>
            <span className="text-xs font-bold text-emerald-400 block pt-2">Iniciar Simulación ➔</span>
          </div>

          {/* Lab 3: Hemostasia */}
          <div 
            onClick={() => {
              onNavigate('laboratorios');
              if (onOpenLab) onOpenLab('hemostasia');
            }}
            className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🩸</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Hematología
              </span>
            </div>
            <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              Hemostasia & Coagulación
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Plataforma interactiva con animación paso a paso de la cascada intrínseca, extrínseca y común, señalización plaquetaria AMPc/calcio y la Tríada de Virchow.
            </p>
            <span className="text-xs font-bold text-emerald-400 block pt-2">Ver Cascada ➔</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Academic Calendar & Cátedra News */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Academic Milestones & Evaluation (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Cronograma de Hitos y Evaluación Continua</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Semestre Actual</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              {
                date: "Semana 4",
                title: "Seminario 1: Diagnóstico Diferencial de Ictericias y Función Biliar",
                status: "Activo en Simulador",
                statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200"
              },
              {
                date: "Semana 7",
                title: "Seminario 2: Biomarcadores de Isquemia Miocárdica y Troponina Ultrasensible",
                status: "Próxima sesión",
                statusColor: "text-slate-600 bg-slate-100 border-slate-200"
              },
              {
                date: "Semana 11",
                title: "Seminario 3: Trastornos Ácido-Base, Gasometría y Anión GAP",
                status: "Programado",
                statusColor: "text-slate-600 bg-slate-100 border-slate-200"
              },
              {
                date: "Semana 14",
                title: "Examen Parcial de Evaluación Continua (Módulos I y II)",
                status: "Oficial",
                statusColor: "text-amber-800 bg-amber-50 border-amber-200"
              }
            ].map((milestone, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{milestone.date}</span>
                  <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${milestone.statusColor}`}>
                  {milestone.status}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>¿Desea repasar los casos tipo examen para la evaluación continua?</span>
            <button
              onClick={() => onNavigate('desafio')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 cursor-pointer"
            >
              Iniciar Guardia ➔
            </button>
          </div>
        </div>

        {/* Right Column: Student Status / Novedades de la Cátedra (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Novedades de la Cátedra</span>
              </h3>
              <span className="text-[10px] text-slate-500">Avisos Docentes</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-1">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">Actualización de Protocolos</span>
                <p className="text-slate-700 leading-relaxed">
                  Incorporados los nuevos algoritmos diagnósticos ESC 2024 para el manejo del dolor torácico agudo con troponina I de alta sensibilidad.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Laboratorio Virtual de Ictericias</span>
                <p className="text-slate-700 leading-relaxed">
                  Ya disponible la sección de simulación neonatal con escalas BIND y progresión cefalocaudal de Kramer.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Reto Clínico Semanal</span>
                <p className="text-slate-700 leading-relaxed">
                  El caso de la semana sobre <strong>Cetoacidosis Diabética e Hiperpotasemia</strong> ya otorga doble experiencia (XP x2.0).
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Casos clínicos completados: <strong>{completedCasesCount}</strong></span>
            <button
              onClick={() => onNavigate('estadisticas')}
              className="text-emerald-800 font-bold hover:underline cursor-pointer"
            >
              Mi Expediente ➔
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

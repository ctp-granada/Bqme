import React, { useState, useEffect } from 'react';
import { ActiveModule } from '../types';
import {
  Stethoscope,
  BookOpen,
  Trees,
  ArrowRight,
  Sparkles,
  Flame,
  FlaskConical,
  Award,
  ChevronRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileText,
  Activity,
  Zap,
  MapPin,
  ExternalLink,
  Layers,
  UploadCloud,
  Bell,
  Eye,
  X,
  Maximize2,
  Building2,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (module: ActiveModule) => void;
  onOpenLab?: (lab: 'randle' | 'ictericias' | 'hemostasia') => void;
  userXP?: number;
  completedCasesCount?: number;
}

type DistrictId = 'hospital' | 'biblioteca' | 'parque';

interface DistrictInfo {
  id: DistrictId;
  name: string;
  tagline: string;
  badge: string;
  image: string;
  description: string;
  primaryAction: {
    label: string;
    target: ActiveModule;
    icon: typeof Stethoscope;
  };
  secondaryActions: Array<{
    label: string;
    sublabel: string;
    target: ActiveModule;
    labType?: 'randle' | 'ictericias' | 'hemostasia';
    icon: typeof Stethoscope;
  }>;
  facilities: string[];
  stats: string;
  themeColor: {
    accent: string;
    border: string;
    bgBadge: string;
    textBadge: string;
    btn: string;
  };
}

const DISTRICT_DETAILS: Record<DistrictId, DistrictInfo> = {
  hospital: {
    id: 'hospital',
    name: 'Hospital Clínico Universitario',
    tagline: 'Donde se resuelven los casos clínicos reales y se gestionan guardias de urgencias',
    badge: 'DISTRITO CLÍNICO • URGENCIAS',
    image: '/hospital_section.jpg',
    description:
      'Instalación hospitalaria donde atenderás pacientes virtuales con patologías de alta relevancia diagnóstica (síndrome coronario, hepatopatías, cetoacidosis diabética, fracaso renal, pancreatitis). Interpreta anamnesis, solicita biomarcadores específicos gestionando el coste y confirma diagnósticos con retroalimentación inmediata.',
    primaryAction: {
      label: 'Entrar al Hospital (Ir a Casos Clínicos)',
      target: 'casos',
      icon: Stethoscope
    },
    secondaryActions: [
      {
        label: 'Banco de Casos Clínicos',
        sublabel: '15 Casos clasificados por sistemas orgánicos',
        target: 'casos',
        icon: Stethoscope
      },
      {
        label: 'Guardia Médica 24h (Modo Desafío)',
        sublabel: 'Casos contrarreloj con 3 vidas y multiplicador de racha',
        target: 'desafio',
        icon: Flame
      },
      {
        label: 'Historial y Expediente Clínico',
        sublabel: 'Auditoría de diagnósticos, costes y medallas',
        target: 'estadisticas',
        icon: Activity
      }
    ],
    facilities: ['Urgencias & Triaje General', 'Unidad Coronaria', 'Planta de Medicina Interna', 'Laboratorio Central 24h'],
    stats: '15 Pacientes Activos • 5 Sistemas',
    themeColor: {
      accent: 'rose-500',
      border: 'border-rose-500/50',
      bgBadge: 'bg-rose-500/10',
      textBadge: 'text-rose-400',
      btn: 'bg-rose-600 hover:bg-rose-500'
    }
  },
  biblioteca: {
    id: 'biblioteca',
    name: 'Biblioteca Biomédica Central',
    tagline: 'Corpus científico de la Cátedra, guías docentes oficiales y vademécum de biomarcadores',
    badge: 'DISTRITO DEL SABER • MATERIALES',
    image: '/library_section.jpg',
    description:
      'Centro neurálgico de documentación y consulta. Contiene las guías académicas oficiales del Grado en Medicina (UGR), esquemas de integración metabólica, algoritmos diagnósticos acreditados y el vademécum con más de 40 fichas analíticas con sus rangos de referencia, sensibilidad y especificidad.',
    primaryAction: {
      label: 'Entrar a la Biblioteca (Ir a Materiales)',
      target: 'docencia',
      icon: BookOpen
    },
    secondaryActions: [
      {
        label: 'Temario Oficial y Guías Docentes',
        sublabel: '4 Bloques teóricos acreditados por el Departamento',
        target: 'docencia',
        icon: BookOpen
      },
      {
        label: 'Vademécum de Biomarcadores',
        sublabel: 'Catálogo de parámetros, cinética y valores de corte',
        target: 'biblioteca',
        icon: FileText
      },
      {
        label: 'Banco de Preguntas MIR',
        sublabel: 'Preguntas tipo test de autoevaluación con explicación',
        target: 'docencia',
        icon: GraduationCap
      }
    ],
    facilities: ['Sala de Lectura e Investigación', 'Hemeroteca de Guías Clínicas', 'Archivo de Biomarcadores', 'Autoevaluación MIR'],
    stats: '4 Módulos Teóricos • 40+ Biomarcadores',
    themeColor: {
      accent: 'blue-500',
      border: 'border-blue-500/50',
      bgBadge: 'bg-blue-500/10',
      textBadge: 'text-blue-400',
      btn: 'bg-blue-600 hover:bg-blue-500'
    }
  },
  parque: {
    id: 'parque',
    name: 'Parque Biomédico & Laboratorios Virtuales',
    tagline: 'Espacio lúdico de gamificación, simuladores metabólicos interactivos y retos contrarreloj',
    badge: 'ZONA LÚDICA • SIMULADORES',
    image: '/park_section.jpg',
    description:
      'Área verde interactiva orientada al aprendizaje dinámico. Experimenta directamente con sliders de modulación metabólica en los simuladores del Ciclo de Randle (competencia sustratos), Ictericias (cinética de bilirrubina) y Hemostasia (vías de coagulación). Participa también en el Reto Diario con bonificadores de XP.',
    primaryAction: {
      label: 'Entrar al Parque (Ir a Actividades y Juegos)',
      target: 'laboratorios',
      icon: FlaskConical
    },
    secondaryActions: [
      {
        label: 'Ciclo de Randle (Glucosa vs Ácidos Grasos)',
        sublabel: 'Inhibición de CPT-1 por Malonil-CoA y balance energético',
        target: 'laboratorios',
        labType: 'randle',
        icon: FlaskConical
      },
      {
        label: 'Simulador de Ictericias y Bilirrubinas',
        sublabel: 'Perfil prehepático, hepático y posthepático con coluria',
        target: 'laboratorios',
        labType: 'ictericias',
        icon: FlaskConical
      },
      {
        label: 'Reto Diario Contrarreloj (2 min)',
        sublabel: 'Caso rápido con multiplicador 2.0x XP y racha',
        target: 'reto-diario',
        icon: Zap
      }
    ],
    facilities: ['Pabellón de Laboratorios Virtuales', 'Glorieta del Reto Diario', 'Simulador Fisiopatológico', 'Área de Trivia Flash'],
    stats: '3 Simuladores Cinéticos • 2.0x XP Reto',
    themeColor: {
      accent: 'emerald-500',
      border: 'border-emerald-500/50',
      bgBadge: 'bg-emerald-500/10',
      textBadge: 'text-emerald-400',
      btn: 'bg-emerald-600 hover:bg-emerald-500'
    }
  }
};

// Notice item structure for updated academic materials
interface MaterialNotice {
  id: string;
  title: string;
  type: 'caso' | 'guia' | 'laboratorio';
  date: string;
  badge: string;
  description: string;
  targetModule: ActiveModule;
  labType?: 'randle' | 'ictericias' | 'hemostasia';
  isNew: boolean;
}

const INITIAL_NOTICES: MaterialNotice[] = [
  {
    id: 'noticia-1',
    title: 'Nuevo Caso Clínico: Síndrome Coronario Agudo con Elevación del ST',
    type: 'caso',
    date: 'Disponible ahora',
    badge: 'CASO NUEVO',
    description: 'Interpretación de curvas cinéticas de Troponina I de alta sensibilidad (hs-cTnI) y CK-MB masa en paciente de 58 años.',
    targetModule: 'casos',
    isNew: true
  },
  {
    id: 'noticia-2',
    title: 'Material Docente Actualizado: Algoritmo de Diagnóstico de Ictericias',
    type: 'guia',
    date: 'Actualizado esta semana',
    badge: 'GUÍA ACTUALIZADA',
    description: 'Esquema completo con perfil de bilirrubinas (fraccionada vs directa) y correlación con FA, GGT y transaminasas.',
    targetModule: 'docencia',
    isNew: true
  },
  {
    id: 'noticia-3',
    title: 'Actividad Interactiva: Simulador del Ciclo Glucosa-Ácidos Grasos (Randle)',
    type: 'laboratorio',
    date: 'Disponible en Parque',
    badge: 'LAB VIRTUAL',
    description: 'Experimenta la inhibición recíproca entre piruvato deshidrogenasa y beta-oxidación con control de flujos moleculares.',
    targetModule: 'laboratorios',
    labType: 'randle',
    isNew: false
  }
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenLab,
  userXP = 0,
  completedCasesCount = 0
}) => {
  const [hoveredSpot, setHoveredSpot] = useState<DistrictId | null>(null);
  const [selectedDistrictModal, setSelectedDistrictModal] = useState<DistrictId | null>(null);
  const [notices, setNotices] = useState<MaterialNotice[]>(INITIAL_NOTICES);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [newMaterialTitle, setNewMaterialTitle] = useState<string>('');
  const [newMaterialType, setNewMaterialType] = useState<'caso' | 'guia' | 'laboratorio'>('caso');
  const [newMaterialDesc, setNewMaterialDesc] = useState<string>('');
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDistrictModal(null);
        setShowUploadModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMaterialTitle.trim()) return;

    const newNotice: MaterialNotice = {
      id: `notice-${Date.now()}`,
      title: newMaterialTitle.trim(),
      type: newMaterialType,
      date: 'Recién publicado',
      badge: 'NUEVO MATERIAL',
      description: newMaterialDesc.trim() || 'Nuevo contenido cargado en la plataforma docente de Bioquímica Médica.',
      targetModule: newMaterialType === 'caso' ? 'casos' : newMaterialType === 'guia' ? 'docencia' : 'laboratorios',
      isNew: true
    };

    setNotices((prev) => [newNotice, ...prev]);
    setShowUploadModal(false);
    setNewMaterialTitle('');
    setNewMaterialDesc('');
    setUploadSuccessToast(`¡Aviso publicado con éxito! "${newNotice.title}" ya está visible para los alumnos.`);

    setTimeout(() => {
      setUploadSuccessToast(null);
    }, 4500);
  };

  const currentModalData = selectedDistrictModal ? DISTRICT_DETAILS[selectedDistrictModal] : null;

  return (
    <div className="space-y-10 animate-in fade-in duration-300 pb-12">
      {/* 1. INSTITUTIONAL HERO HEADER: Apple Health / Clinical Modern Aesthetic */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 sm:p-8 relative overflow-hidden transition-all">
        {/* Titanium gray & subtle emerald radial accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-50/50 via-slate-100/30 to-transparent rounded-full blur-2xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-slate-900 text-white flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Facultad de Medicina • Universidad de Granada
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold text-slate-700 bg-slate-100 border border-slate-200/80">
                Campus de la Salud (PTS) • Curso 2025/2026
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
                Bioquímica y Biología Molecular I
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              Plano de la Ciudad Biomédica UGR
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Explora el plano interactivo de la asignatura. Haz clic directamente en el <strong className="text-slate-900 font-semibold">Hospital</strong> (para resolver casos), en la <strong className="text-slate-900 font-semibold">Biblioteca</strong> (para consultar materiales y vademécum) o en el <strong className="text-slate-900 font-semibold">Parque</strong> (para experimentar con simuladores y actividades lúdicas).
            </p>
          </div>

          {/* Quick Metrics Capsule in Modern Clinical Titanium Style */}
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-center">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-xs">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Experiencia Alumno
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-slate-900">{userXP}</span>
                  <span className="text-xs font-semibold text-emerald-800">XP</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-center gap-3 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-rose-400 flex items-center justify-center font-bold text-sm shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Casos Superados
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-slate-900">{completedCasesCount}</span>
                  <span className="text-xs font-semibold text-slate-500">/ 15</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE PROMINENT CITY MAP (EL PLANO DE LA CIUDAD QUE LE GUSTABA AL USUARIO) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Mapa Interactivo del Campus
              </span>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Haz clic sobre cualquier zona para abrir sus instalaciones con su ilustración y accesos
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Selecciona tu destino en el plano de la ciudad
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              3 Lugares Clave: Hospital • Biblioteca • Parque
            </span>
          </div>
        </div>

        {/* MAP CONTAINER WITH HOTSPOTS */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl group">
          <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-900 select-none">
            {/* Map Image */}
            <img
              src="/biomedical_city_map.jpg"
              alt="Plano Isométrico de la Ciudad Biomédica UGR"
              className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />

            {/* Dark vignette gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />

            {/* ============================================================ */}
            {/* HOTSPOT 1: EL HOSPITAL (Casos Clínicos) - Top Left           */}
            {/* ============================================================ */}
            <div
              style={{ left: '10%', top: '8%', width: '28%', height: '34%' }}
              className={`absolute z-20 cursor-pointer rounded-2xl transition-all duration-300 ${
                hoveredSpot === 'hospital'
                  ? 'ring-4 ring-rose-500 bg-rose-500/20 backdrop-blur-[1px] shadow-[0_0_35px_rgba(244,63,94,0.5)]'
                  : 'hover:bg-rose-500/10 hover:ring-2 hover:ring-rose-400/80'
              }`}
              onMouseEnter={() => setHoveredSpot('hospital')}
              onMouseLeave={() => setHoveredSpot(null)}
              onClick={() => setSelectedDistrictModal('hospital')}
              role="button"
              tabIndex={0}
              aria-label="Elegir en el mapa el Hospital"
            >
              {/* Beacon Pin */}
              <div className="absolute top-4 left-6 flex items-center gap-2 animate-bounce duration-1000">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-rose-600 text-white items-center justify-center shadow-lg border-2 border-white">
                    <Stethoscope className="w-4 h-4" />
                  </span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 text-white text-xs font-black shadow-lg border border-rose-500/60 backdrop-blur-md">
                  <span className="text-rose-400 font-extrabold">HOSPITAL</span>
                  <span className="text-[10px] text-slate-300 font-medium">(15 Casos)</span>
                </span>
              </div>

              {/* Floating Action Badge on Hover with Mini-Thumbnail Preview */}
              <div
                className={`absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/95 border border-rose-500 text-white text-xs transition-all duration-200 shadow-2xl backdrop-blur-md ${
                  hoveredSpot === 'hospital' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src="/hospital_section.jpg"
                      alt="Hospital Mini"
                      className="w-8 h-8 rounded-lg object-cover border border-rose-500/50 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-bold text-rose-300 truncate">Hospital Clínico</div>
                      <div className="text-[10px] text-slate-300">Resolución de casos clínicos</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-rose-600 px-2.5 py-1 rounded-lg font-black text-white shrink-0 flex items-center gap-1">
                    VER ILUSTRACIÓN <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* HOTSPOT 2: LA BIBLIOTECA (Materiales de Apoyo) - Center      */}
            {/* ============================================================ */}
            <div
              style={{ left: '38%', top: '24%', width: '26%', height: '36%' }}
              className={`absolute z-20 cursor-pointer rounded-2xl transition-all duration-300 ${
                hoveredSpot === 'biblioteca'
                  ? 'ring-4 ring-blue-500 bg-blue-500/20 backdrop-blur-[1px] shadow-[0_0_35px_rgba(59,130,246,0.5)]'
                  : 'hover:bg-blue-500/10 hover:ring-2 hover:ring-blue-400/80'
              }`}
              onMouseEnter={() => setHoveredSpot('biblioteca')}
              onMouseLeave={() => setHoveredSpot(null)}
              onClick={() => setSelectedDistrictModal('biblioteca')}
              role="button"
              tabIndex={0}
              aria-label="Elegir en el mapa la Biblioteca"
            >
              {/* Beacon Pin */}
              <div className="absolute top-4 left-6 flex items-center gap-2 animate-bounce duration-1000">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-blue-600 text-white items-center justify-center shadow-lg border-2 border-white">
                    <BookOpen className="w-4 h-4" />
                  </span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 text-white text-xs font-black shadow-lg border border-blue-500/60 backdrop-blur-md">
                  <span className="text-blue-400 font-extrabold">BIBLIOTECA</span>
                  <span className="text-[10px] text-slate-300 font-medium">(Materiales)</span>
                </span>
              </div>

              {/* Floating Action Badge on Hover with Mini-Thumbnail Preview */}
              <div
                className={`absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/95 border border-blue-500 text-white text-xs transition-all duration-200 shadow-2xl backdrop-blur-md ${
                  hoveredSpot === 'biblioteca' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src="/library_section.jpg"
                      alt="Biblioteca Mini"
                      className="w-8 h-8 rounded-lg object-cover border border-blue-500/50 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-bold text-blue-300 truncate">Biblioteca Biomédica</div>
                      <div className="text-[10px] text-slate-300">Temario, vademécum y MIR</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-600 px-2.5 py-1 rounded-lg font-black text-white shrink-0 flex items-center gap-1">
                    VER ILUSTRACIÓN <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* ============================================================ */}
            {/* HOTSPOT 3: EL PARQUE (Actividades y Juegos) - Bottom Right   */}
            {/* ============================================================ */}
            <div
              style={{ left: '56%', top: '50%', width: '36%', height: '40%' }}
              className={`absolute z-20 cursor-pointer rounded-2xl transition-all duration-300 ${
                hoveredSpot === 'parque'
                  ? 'ring-4 ring-emerald-500 bg-emerald-500/20 backdrop-blur-[1px] shadow-[0_0_35px_rgba(16,185,129,0.5)]'
                  : 'hover:bg-emerald-500/10 hover:ring-2 hover:ring-emerald-400/80'
              }`}
              onMouseEnter={() => setHoveredSpot('parque')}
              onMouseLeave={() => setHoveredSpot(null)}
              onClick={() => setSelectedDistrictModal('parque')}
              role="button"
              tabIndex={0}
              aria-label="Elegir en el mapa el Parque"
            >
              {/* Beacon Pin */}
              <div className="absolute top-4 left-6 flex items-center gap-2 animate-bounce duration-1000">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-emerald-600 text-white items-center justify-center shadow-lg border-2 border-white">
                    <Trees className="w-4 h-4" />
                  </span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 text-white text-xs font-black shadow-lg border border-emerald-500/60 backdrop-blur-md">
                  <span className="text-emerald-400 font-extrabold">PARQUE</span>
                  <span className="text-[10px] text-slate-300 font-medium">(Juegos & Labs)</span>
                </span>
              </div>

              {/* Floating Action Badge on Hover with Mini-Thumbnail Preview */}
              <div
                className={`absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/95 border border-emerald-500 text-white text-xs transition-all duration-200 shadow-2xl backdrop-blur-md ${
                  hoveredSpot === 'parque' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img
                      src="/park_section.jpg"
                      alt="Parque Mini"
                      className="w-8 h-8 rounded-lg object-cover border border-emerald-500/50 shrink-0"
                    />
                    <div className="truncate">
                      <div className="font-bold text-emerald-300 truncate">Parque Lúdico</div>
                      <div className="text-[10px] text-slate-300">Simuladores Randle & Reto</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-600 px-2.5 py-1 rounded-lg font-black text-white shrink-0 flex items-center gap-1">
                    VER ILUSTRACIÓN <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom HUD Bar on image */}
            <div className="absolute bottom-3 left-4 right-4 z-10 hidden sm:flex items-center justify-between text-xs text-white/90 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 pointer-events-none">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Haz clic sobre el Hospital, la Biblioteca o el Parque para ver su ilustración y accesos</span>
              </span>
              <span className="text-[11px] text-slate-300 font-mono">
                [1] Hospital Clínico • [2] Biblioteca • [3] Parque de Actividades
              </span>
            </div>
          </div>
        </div>

        {/* 3 FAST CARDS BELOW THE MAP (CON MINI-ILUSTRACIÓN Y ACCIÓN DIRECTA) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* HOSPITAL CARD */}
          <div
            onMouseEnter={() => setHoveredSpot('hospital')}
            onMouseLeave={() => setHoveredSpot(null)}
            onClick={() => setSelectedDistrictModal('hospital')}
            className={`group bg-white rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl ${
              hoveredSpot === 'hospital'
                ? 'border-rose-500 ring-4 ring-rose-500/15 -translate-y-1'
                : 'border-slate-200/90 hover:border-rose-400'
            }`}
          >
            <div className="space-y-3.5">
              <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
                <img
                  src="/hospital_section.jpg"
                  alt="Hospital Clínico"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Hospital
                </span>
                <span className="absolute bottom-2 left-2.5 text-white text-xs font-bold">
                  Resolución de Casos Clínicos
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                  1. El Hospital Clínico
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  Atiende a pacientes en urgencias, solicita biomarcadores diagnósticos y administra costes.
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:text-rose-700">
              <span>Abrir Instalaciones del Hospital</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* BIBLIOTECA CARD */}
          <div
            onMouseEnter={() => setHoveredSpot('biblioteca')}
            onMouseLeave={() => setHoveredSpot(null)}
            onClick={() => setSelectedDistrictModal('biblioteca')}
            className={`group bg-white rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl ${
              hoveredSpot === 'biblioteca'
                ? 'border-blue-500 ring-4 ring-blue-500/15 -translate-y-1'
                : 'border-slate-200/90 hover:border-blue-400'
            }`}
          >
            <div className="space-y-3.5">
              <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
                <img
                  src="/library_section.jpg"
                  alt="Biblioteca Biomédica"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Biblioteca
                </span>
                <span className="absolute bottom-2 left-2.5 text-white text-xs font-bold">
                  Material Docente & Vademécum
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  2. La Biblioteca Central
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  Temario oficial de Bioquímica Médica UGR, fichas de biomarcadores y preguntas MIR.
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
              <span>Abrir Instalaciones de la Biblioteca</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* PARQUE CARD */}
          <div
            onMouseEnter={() => setHoveredSpot('parque')}
            onMouseLeave={() => setHoveredSpot(null)}
            onClick={() => setSelectedDistrictModal('parque')}
            className={`group bg-white rounded-2xl p-5 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xs hover:shadow-xl ${
              hoveredSpot === 'parque'
                ? 'border-emerald-500 ring-4 ring-emerald-500/15 -translate-y-1'
                : 'border-slate-200/90 hover:border-emerald-400'
            }`}
          >
            <div className="space-y-3.5">
              <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-950">
                <img
                  src="/park_section.jpg"
                  alt="Parque Lúdico"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                  Parque Lúdico
                </span>
                <span className="absolute bottom-2 left-2.5 text-white text-xs font-bold">
                  Laboratorios & Reto Diario
                </span>
              </div>

              <div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                  3. El Parque Biomédico
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  Simuladores cinéticos del Ciclo de Randle, Ictericias y hemostasia, más reto diario 2x XP.
                </p>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
              <span>Abrir Instalaciones del Parque</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. AVISOS DE NUEVO MATERIAL DISPONIBLE (CON AVISO AL SUBIR NUEVO MATERIAL) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Tablón de Materiales Actualizados
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Avisos de Nuevo Material Disponible
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Si el equipo docente sube nuevo material didáctico o casos clínicos, aparecerá un aviso inmediato aquí.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-emerald-400" />
              <span>Notificar Nuevo Material</span>
            </button>
          </div>
        </div>

        {/* Upload Success Alert Banner */}
        {uploadSuccessToast && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessToast}</span>
            </div>
            <button
              onClick={() => setUploadSuccessToast(null)}
              className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Notices Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-all flex flex-col justify-between group shadow-2xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                      notice.type === 'caso'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : notice.type === 'guia'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {notice.badge}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {notice.date}
                  </span>
                </div>

                <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2">
                  {notice.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {notice.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (notice.labType && onOpenLab) {
                      onOpenLab(notice.labType);
                    }
                    onNavigate(notice.targetModule);
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5 cursor-pointer group/btn"
                >
                  <span>Acceder a este material</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL / ENTRANCE DRAWER CUANDO SE ELIGE EN EL MAPA (HOSPITAL/BIBLIO/PARQUE) */}
      {/* ========================================================================= */}
      {currentModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
            {/* Modal Header with the Full Dedicated Illustration */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
              <img
                src={currentModalData.image}
                alt={currentModalData.name}
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedDistrictModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 hover:bg-slate-900 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md"
                aria-label="Cerrar vista"
              >
                <X className="w-5 h-5" />
              </button>

              {/* District Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 rounded-xl bg-slate-950/90 text-white text-xs font-black tracking-wide border border-white/20 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{currentModalData.badge}</span>
                </span>
              </div>

              {/* Title & Tagline in gradient */}
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                  {currentModalData.stats}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
                  {currentModalData.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                  {currentModalData.tagline}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Descripción del Área Formativa
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed font-normal">
                  {currentModalData.description}
                </p>
              </div>

              {/* Facilities tags */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Instalaciones Disponibles en este Distrito
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {currentModalData.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-semibold text-center"
                    >
                      {fac}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Facilities Actions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Accesos Directos y Actividades
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentModalData.secondaryActions.map((sec, idx) => {
                    const IconComp = sec.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedDistrictModal(null);
                          if (sec.labType && onOpenLab) {
                            onOpenLab(sec.labType);
                          }
                          onNavigate(sec.target);
                        }}
                        className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200 text-left transition-all cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <IconComp className="w-4 h-4 text-slate-700 group-hover:text-emerald-700" />
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-slate-700 transition-all" />
                        </div>
                        <div className="text-xs font-bold text-slate-900">{sec.label}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{sec.sublabel}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs font-medium text-slate-500 text-center sm:text-left">
                Puedes regresar al plano en cualquier momento usando «Volver al Inicio» en la barra superior.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedDistrictModal(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setSelectedDistrictModal(null);
                    onNavigate(currentModalData.primaryAction.target);
                  }}
                  className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${currentModalData.themeColor.btn}`}
                >
                  <span>{currentModalData.primaryAction.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. MODAL PARA NOTIFICAR / SUBIR NUEVO MATERIAL DOCENTE */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <UploadCloud className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Notificar Nuevo Material Docente
                  </h3>
                  <p className="text-xs text-slate-500">
                    Aparecerá en el tablón de avisos para todos los alumnos
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePublishNotice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tipo de Material
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewMaterialType('caso')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      newMaterialType === 'caso'
                        ? 'bg-rose-50 text-rose-800 border-rose-300 shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Caso Clínico
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMaterialType('guia')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      newMaterialType === 'guia'
                        ? 'bg-blue-50 text-blue-800 border-blue-300 shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Guía / Apuntes
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMaterialType('laboratorio')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      newMaterialType === 'laboratorio'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Lab Virtual
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Título del Material o Caso
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nuevo Caso: Pancreatitis Aguda e Interpretación de Lipasa"
                  value={newMaterialTitle}
                  onChange={(e) => setNewMaterialTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Descripción o Instrucciones
                </label>
                <textarea
                  rows={3}
                  placeholder="Explica brevemente los objetivos de aprendizaje o las novedades añadidas..."
                  value={newMaterialDesc}
                  onChange={(e) => setNewMaterialDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs text-slate-900 bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <UploadCloud className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Publicar Aviso</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

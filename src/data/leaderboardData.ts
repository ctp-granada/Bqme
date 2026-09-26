export interface PeerStudent {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  city?: string;
  xp: number;
  score?: number;
  casesResolved: number;
  accuracyPct: number;
  streak: number;
  badgeTitle: string;
  specialty: string;
  weeklyXp: number;
  isUgr?: boolean;
  isCurrentUser?: boolean;
  biomarkerFocus?: string;
  lastActive?: string;
}

export const MOCK_LEADERBOARD_PEERS: PeerStudent[] = [
  {
    id: "peer-1",
    name: "Dra. Sofía Benítez",
    avatar: "👩‍⚕️",
    institution: "H. U. La Fe (Valencia)",
    city: "Valencia",
    xp: 1240,
    score: 1240,
    casesResolved: 42,
    accuracyPct: 96,
    streak: 12,
    badgeTitle: "👑 Jefe de Servicio",
    specialty: "Análisis Clínicos & Bioquímica",
    weeklyXp: 380,
    isUgr: false,
    biomarkerFocus: "Troponina I, Pro-BNP, CK-MB",
    lastActive: "Hace 15 min"
  },
  {
    id: "peer-2",
    name: "Dr. Carlos Eduardo Ruiz",
    avatar: "👨‍⚕️",
    institution: "Facultad Medicina UGR / H. PTS",
    city: "Granada",
    xp: 1080,
    score: 1080,
    casesResolved: 36,
    accuracyPct: 94,
    streak: 9,
    badgeTitle: "🔬 Facultativo Adjunto",
    specialty: "Bioquímica Médica",
    weeklyXp: 310,
    isUgr: true,
    biomarkerFocus: "Lipasa, Amilasa, Perfil Hepático",
    lastActive: "Hace 42 min"
  },
  {
    id: "peer-3",
    name: "Dra. Lucía Mendoza",
    avatar: "👩‍🔬",
    institution: "H. U. Virgen del Rocío (Sevilla)",
    city: "Sevilla",
    xp: 920,
    score: 920,
    casesResolved: 31,
    accuracyPct: 91,
    streak: 7,
    badgeTitle: "🔬 Facultativo Adjunto",
    specialty: "Urgencias & Toxicología",
    weeklyXp: 290,
    isUgr: false,
    biomarkerFocus: "Gasometría, Lactato, Procalcitonina",
    lastActive: "Hace 2 horas"
  },
  {
    id: "peer-4",
    name: "Dr. Marc Font",
    avatar: "👨‍🔬",
    institution: "Hospital Clínic (Barcelona)",
    city: "Barcelona",
    xp: 780,
    score: 780,
    casesResolved: 26,
    accuracyPct: 88,
    streak: 5,
    badgeTitle: "🏥 Residente R3",
    specialty: "Medicina Interna",
    weeklyXp: 220,
    isUgr: false,
    biomarkerFocus: "HbA1c, Curva de Tolerancia Oral",
    lastActive: "Hace 3 horas"
  },
  {
    id: "peer-5",
    name: "Dra. Carmen Navarro Ramos",
    avatar: "👩‍⚕️",
    institution: "Facultad Medicina UGR / H. Virgen de las Nieves",
    city: "Granada",
    xp: 650,
    score: 650,
    casesResolved: 22,
    accuracyPct: 87,
    streak: 4,
    badgeTitle: "🏥 Residente R2",
    specialty: "Endocrinología & Metabolismo",
    weeklyXp: 180,
    isUgr: true,
    biomarkerFocus: "Cortisol, TSH libre, Insulina",
    lastActive: "Hace 5 horas"
  },
  {
    id: "peer-6",
    name: "Dra. Elena Alarcón",
    avatar: "👩‍⚕️",
    institution: "Univ. Complutense de Madrid / H. Clínico",
    city: "Madrid",
    xp: 540,
    score: 540,
    casesResolved: 18,
    accuracyPct: 84,
    streak: 3,
    badgeTitle: "🏥 Residente R2",
    specialty: "Cardiología & Hemostasia",
    weeklyXp: 150,
    isUgr: false,
    biomarkerFocus: "D-Dímero, Fibrinógeno, INR",
    lastActive: "Ayer"
  },
  {
    id: "peer-7",
    name: "Dr. Javier Soria",
    avatar: "👨‍⚕️",
    institution: "Facultad Medicina UGR / PTS",
    city: "Granada",
    xp: 420,
    score: 420,
    casesResolved: 15,
    accuracyPct: 82,
    streak: 3,
    badgeTitle: "🩺 Médico Interno",
    specialty: "Nefrología & Equilibrio Ácido-Base",
    weeklyXp: 120,
    isUgr: true,
    biomarkerFocus: "Creatinina, Cistatina C, Filtrado FG",
    lastActive: "Ayer"
  },
  {
    id: "peer-8",
    name: "Mateo Morales",
    avatar: "🧑‍⚕️",
    institution: "H. U. Vall d'Hebron (Barcelona)",
    city: "Barcelona",
    xp: 330,
    score: 330,
    casesResolved: 12,
    accuracyPct: 79,
    streak: 2,
    badgeTitle: "🩺 Médico Interno",
    specialty: "Pediatría & Errores Innatos",
    weeklyXp: 90,
    isUgr: false,
    biomarkerFocus: "Bilirrubina Neonatal, Fenilalanina",
    lastActive: "Hace 2 días"
  },
  {
    id: "peer-9",
    name: "Álvaro Prieto Castillo",
    avatar: "👨‍⚕️",
    institution: "Facultad Medicina UGR / Cátedra Bioquímica",
    city: "Granada",
    xp: 260,
    score: 260,
    casesResolved: 10,
    accuracyPct: 76,
    streak: 2,
    badgeTitle: "🩺 Médico Interno",
    specialty: "Patología Clínica",
    weeklyXp: 80,
    isUgr: true,
    biomarkerFocus: "Fosfatasa Alcalina, GGT, Transaminasas",
    lastActive: "Hace 2 días"
  },
  {
    id: "peer-10",
    name: "Paula Abarca",
    avatar: "👩‍🎓",
    institution: "Univ. de Salamanca (Facultad de Medicina)",
    city: "Salamanca",
    xp: 190,
    score: 190,
    casesResolved: 8,
    accuracyPct: 73,
    streak: 1,
    badgeTitle: "🎓 Alumno Bioquímica",
    specialty: "Fundamentos Bioquímicos",
    weeklyXp: 60,
    isUgr: false,
    biomarkerFocus: "Ciclo de Randle, Glucólisis",
    lastActive: "Hace 3 días"
  },
  {
    id: "peer-11",
    name: "Alejandro Gómez Martín",
    avatar: "👨‍🎓",
    institution: "Univ. de Navarra (CUN)",
    city: "Pamplona",
    xp: 130,
    score: 130,
    casesResolved: 5,
    accuracyPct: 69,
    streak: 1,
    badgeTitle: "🎓 Alumno Bioquímica",
    specialty: "Metabolismo Intermediario",
    weeklyXp: 40,
    isUgr: false,
    biomarkerFocus: "Cuerpos Cetónicos, Glucosa",
    lastActive: "Hace 4 días"
  },
  {
    id: "peer-12",
    name: "Inés Vega Morales",
    avatar: "👩‍🎓",
    institution: "Facultad Medicina UGR (Campus PTS)",
    city: "Granada",
    xp: 90,
    score: 90,
    casesResolved: 4,
    accuracyPct: 65,
    streak: 0,
    badgeTitle: "🎓 Alumno Bioquímica",
    specialty: "Iniciación Clínica",
    weeklyXp: 30,
    isUgr: true,
    biomarkerFocus: "Biomarcadores Cardiovasculares",
    lastActive: "Hace 5 días"
  }
];

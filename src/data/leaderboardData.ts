export interface PeerStudent {
  id: string;
  name: string;
  avatar: string;
  institution: string;
  xp: number;
  accuracyPct: number;
  streak: number;
  badgeTitle: string;
  specialty: string;
  isCurrentUser?: boolean;
}

export const MOCK_LEADERBOARD_PEERS: PeerStudent[] = [
  {
    id: "peer-1",
    name: "Dra. Sofía Benítez",
    avatar: "👩‍⚕️",
    institution: "H. U. La Fe (Valencia)",
    xp: 1180,
    accuracyPct: 96,
    streak: 12,
    badgeTitle: "👑 Jefe de Servicio",
    specialty: "Análisis Clínicos"
  },
  {
    id: "peer-2",
    name: "Dr. Carlos Eduardo Ruiz",
    avatar: "👨‍⚕️",
    institution: "H. C. San Carlos (Madrid)",
    xp: 940,
    accuracyPct: 93,
    streak: 8,
    badgeTitle: "🔬 Facultativo Adjunto",
    specialty: "Bioquímica Médica"
  },
  {
    id: "peer-3",
    name: "Dra. Lucía Mendoza",
    avatar: "👩‍🔬",
    institution: "H. U. Virgen del Rocío (Sevilla)",
    xp: 760,
    accuracyPct: 89,
    streak: 6,
    badgeTitle: "🔬 Facultativo Adjunto",
    specialty: "Urgentología"
  },
  {
    id: "peer-4",
    name: "Dr. Marc Font",
    avatar: "👨‍🔬",
    institution: "H. Clínic (Barcelona)",
    xp: 580,
    accuracyPct: 86,
    streak: 4,
    badgeTitle: "🏥 Residente R3",
    specialty: "Medicina Interna"
  },
  {
    id: "peer-5",
    name: "Dra. Elena Alarcón",
    avatar: "👩‍⚕️",
    institution: "Univ. Complutense de Madrid",
    xp: 430,
    accuracyPct: 82,
    streak: 3,
    badgeTitle: "🏥 Residente R2",
    specialty: "Cardiología"
  },
  {
    id: "peer-6",
    name: "Dr. Javier Soria",
    avatar: "👨‍⚕️",
    institution: "Univ. de Granada / H. PTS",
    xp: 310,
    accuracyPct: 78,
    streak: 2,
    badgeTitle: "🩺 Médico Interno",
    specialty: "Nefrología"
  },
  {
    id: "peer-7",
    name: "Mateo Morales",
    avatar: "🧑‍⚕️",
    institution: "H. U. Vall d'Hebron (Barcelona)",
    xp: 220,
    accuracyPct: 74,
    streak: 1,
    badgeTitle: "🩺 Médico Interno",
    specialty: "Pediatría"
  },
  {
    id: "peer-8",
    name: "Paula Abarca",
    avatar: "👩‍🎓",
    institution: "Univ. de Salamanca",
    xp: 140,
    accuracyPct: 71,
    streak: 2,
    badgeTitle: "🎓 Alumno Bioquímica",
    specialty: "General"
  },
  {
    id: "peer-9",
    name: "Alejandro Gómez",
    avatar: "👨‍🎓",
    institution: "Univ. de Navarra",
    xp: 80,
    accuracyPct: 65,
    streak: 0,
    badgeTitle: "🎓 Alumno Bioquímica",
    specialty: "General"
  }
];

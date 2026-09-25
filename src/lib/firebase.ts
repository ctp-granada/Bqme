import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  writeBatch,
  getDocFromServer
} from 'firebase/firestore';
import { 
  getAuth, 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { CLINICAL_CASES_DATABASE } from '../data/clinicalCases';
import { BIOMARKERS_DATABASE } from '../data/biomarkers';
import { UserProgress } from '../types';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
}

const LOCAL_STORAGE_KEY = 'ugr_firebase_config';

// Default configuration with university project template
const env = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyDemoUgrBioquimicaMedica2026',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'bioquimica-medica-ugr.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'bioquimica-medica-ugr',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'bioquimica-medica-ugr.appspot.com',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '606572041333',
  appId: env.VITE_FIREBASE_APP_ID || '1:606572041333:web:ugrbiomedical2026'
};

export function getSavedFirebaseConfig(): FirebaseConfig {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_FIREBASE_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Error reading saved Firebase config:', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveFirebaseConfig(config: FirebaseConfig): void {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
  // Re-initialize app if needed
  try {
    reinitializeFirebase(config);
  } catch (e) {
    console.error('Error reinitializing Firebase:', e);
  }
}

// App & Service Instances
let firebaseApp: FirebaseApp | null = null;
let firestoreDb: Firestore | null = null;
let firebaseAuth: Auth | null = null;

export function initFirebase(config?: FirebaseConfig) {
  const activeConfig = config || getSavedFirebaseConfig();
  
  try {
    if (!getApps().length) {
      firebaseApp = initializeApp(activeConfig);
    } else {
      firebaseApp = getApp();
    }
    
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    return { app: firebaseApp, db: firestoreDb, auth: firebaseAuth };
  } catch (error) {
    console.warn('Firebase initialization notice:', error);
    return { app: null, db: null, auth: null };
  }
}

function reinitializeFirebase(newConfig: FirebaseConfig) {
  firebaseApp = initializeApp(newConfig, 'UGR_FIREBASE_APP_' + Date.now());
  firestoreDb = getFirestore(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
}

// Initial eager init
const { db, auth } = initFirebase();
export { db, auth };

/**
 * Validates connection to Firestore as per skill specifications
 */
export async function testFirestoreConnection(): Promise<{ success: boolean; message: string }> {
  try {
    const currentDb = firestoreDb || getFirestore();
    const testRef = doc(currentDb, 'test', 'connection');
    // Attempt to read from server
    await getDocFromServer(testRef).catch(() => null);
    return {
      success: true,
      message: 'Conexión a Cloud Firestore establecida correctamente.'
    };
  } catch (error: any) {
    const isOffline = error?.message?.includes('the client is offline') || error?.code === 'unavailable';
    return {
      success: !isOffline,
      message: isOffline 
        ? 'El cliente Firestore está en modo local/desconectado. Comprueba tus credenciales de Firebase Console.'
        : `Respuesta de Firestore: ${error?.message || 'Error desconocido'}`
    };
  }
}

/**
 * Seeds Clinical Cases and Biomarkers directly into Firestore
 */
export async function seedFirestoreDatabase(onProgress?: (progress: string) => void): Promise<{ casesCount: number; biomarkersCount: number }> {
  const currentDb = firestoreDb || getFirestore();
  if (!currentDb) {
    throw new Error('Firestore no está inicializado.');
  }

  onProgress?.('Preparando lote de casos clínicos...');
  const batch = writeBatch(currentDb);

  // 1. Cases
  let casesCount = 0;
  for (const c of CLINICAL_CASES_DATABASE) {
    const caseRef = doc(currentDb, 'cases', c.id);
    batch.set(caseRef, {
      id: c.id,
      title: c.title,
      system: c.system,
      difficulty: c.difficulty,
      clinicalHistory: c.clinicalHistory,
      physicalExam: c.physicalExam,
      initialLabWork: c.initialLabWork,
      targetDisease: c.targetDisease,
      differentialDiagnoses: c.differentialDiagnoses,
      biomarkerOptions: c.biomarkerOptions,
      expertClinicalKey: c.expertClinicalKey,
      essentialBiomarkerIds: c.essentialBiomarkerIds || [],
      updatedAt: new Date().toISOString()
    });
    casesCount++;
  }

  // 2. Biomarkers
  onProgress?.('Preparando catálogo de biomarcadores...');
  let biomarkersCount = 0;
  for (const b of BIOMARKERS_DATABASE) {
    const biomarkerRef = doc(currentDb, 'biomarkers', b.id);
    batch.set(biomarkerRef, {
      ...b,
      updatedAt: new Date().toISOString()
    });
    biomarkersCount++;
  }

  onProgress?.('Enviando datos estructurados a Firestore...');
  await batch.commit();
  onProgress?.(`Completado: ${casesCount} casos clínicos y ${biomarkersCount} biomarcadores indexados en Firestore.`);

  return { casesCount, biomarkersCount };
}

/**
 * Saves user progress to Firestore (/users/{userId})
 */
export async function saveProgressToFirestore(userId: string, progress: UserProgress): Promise<void> {
  const currentDb = firestoreDb || getFirestore();
  if (!currentDb || !userId) return;

  const userDocRef = doc(currentDb, 'users', userId);
  await setDoc(userDocRef, {
    progress,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

/**
 * Retrieves user progress from Firestore
 */
export async function loadProgressFromFirestore(userId: string): Promise<UserProgress | null> {
  const currentDb = firestoreDb || getFirestore();
  if (!currentDb || !userId) return null;

  try {
    const userDocRef = doc(currentDb, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists() && snap.data().progress) {
      return snap.data().progress as UserProgress;
    }
  } catch (e) {
    console.warn('Error loading progress from Firestore:', e);
  }
  return null;
}

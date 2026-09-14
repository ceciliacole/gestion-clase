import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type {
  Alumno,
  Actividad,
  Control,
  Proyecto,
  Lectura,
  VelocidadLectora,
  Incidencia,
  RegistroMaterial,
} from '../types';

interface DataState {
  alumnos: Alumno[];
  actividades: Actividad[];
  controles: Control[];
  proyectos: Proyecto[];
  lecturas: Lectura[];
  velocidades: VelocidadLectora[];
  incidencias: Incidencia[];
  material: RegistroMaterial[];
}

const STORAGE_KEY = 'gestion-clase-data';

const emptyState: DataState = {
  alumnos: [],
  actividades: [],
  controles: [],
  proyectos: [],
  lecturas: [],
  velocidades: [],
  incidencias: [],
  material: [],
};

function loadState(): DataState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    return { ...emptyState, ...JSON.parse(raw) };
  } catch {
    return emptyState;
  }
}

interface DataContextValue extends DataState {
  addAlumno: (a: Omit<Alumno, 'id'>) => void;
  removeAlumno: (id: string) => void;
  addActividad: (a: Omit<Actividad, 'id'>) => void;
  updateActividad: (id: string, patch: Partial<Actividad>) => void;
  removeActividad: (id: string) => void;
  addControl: (c: Omit<Control, 'id'>) => void;
  removeControl: (id: string) => void;
  addProyecto: (p: Omit<Proyecto, 'id'>) => void;
  updateProyecto: (id: string, patch: Partial<Proyecto>) => void;
  removeProyecto: (id: string) => void;
  addLectura: (l: Omit<Lectura, 'id'>) => void;
  updateLectura: (id: string, patch: Partial<Lectura>) => void;
  removeLectura: (id: string) => void;
  addVelocidad: (v: Omit<VelocidadLectora, 'id'>) => void;
  removeVelocidad: (id: string) => void;
  addIncidencia: (i: Omit<Incidencia, 'id'>) => void;
  removeIncidencia: (id: string) => void;
  addMaterial: (m: Omit<RegistroMaterial, 'id'>) => void;
  removeMaterial: (id: string) => void;
}

const DataContext = createContext<DataContextValue | null>(null);

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DataState>(loadState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value: DataContextValue = {
    ...state,
    addAlumno: (a) =>
      setState((s) => ({ ...s, alumnos: [...s.alumnos, { ...a, id: uid() }] })),
    removeAlumno: (id) =>
      setState((s) => ({ ...s, alumnos: s.alumnos.filter((x) => x.id !== id) })),

    addActividad: (a) =>
      setState((s) => ({ ...s, actividades: [...s.actividades, { ...a, id: uid() }] })),
    updateActividad: (id, patch) =>
      setState((s) => ({
        ...s,
        actividades: s.actividades.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
    removeActividad: (id) =>
      setState((s) => ({ ...s, actividades: s.actividades.filter((x) => x.id !== id) })),

    addControl: (c) =>
      setState((s) => ({ ...s, controles: [...s.controles, { ...c, id: uid() }] })),
    removeControl: (id) =>
      setState((s) => ({ ...s, controles: s.controles.filter((x) => x.id !== id) })),

    addProyecto: (p) =>
      setState((s) => ({ ...s, proyectos: [...s.proyectos, { ...p, id: uid() }] })),
    updateProyecto: (id, patch) =>
      setState((s) => ({
        ...s,
        proyectos: s.proyectos.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
    removeProyecto: (id) =>
      setState((s) => ({ ...s, proyectos: s.proyectos.filter((x) => x.id !== id) })),

    addLectura: (l) =>
      setState((s) => ({ ...s, lecturas: [...s.lecturas, { ...l, id: uid() }] })),
    updateLectura: (id, patch) =>
      setState((s) => ({
        ...s,
        lecturas: s.lecturas.map((x) => (x.id === id ? { ...x, ...patch } : x)),
      })),
    removeLectura: (id) =>
      setState((s) => ({ ...s, lecturas: s.lecturas.filter((x) => x.id !== id) })),

    addVelocidad: (v) =>
      setState((s) => ({ ...s, velocidades: [...s.velocidades, { ...v, id: uid() }] })),
    removeVelocidad: (id) =>
      setState((s) => ({ ...s, velocidades: s.velocidades.filter((x) => x.id !== id) })),

    addIncidencia: (i) =>
      setState((s) => ({ ...s, incidencias: [...s.incidencias, { ...i, id: uid() }] })),
    removeIncidencia: (id) =>
      setState((s) => ({ ...s, incidencias: s.incidencias.filter((x) => x.id !== id) })),

    addMaterial: (m) =>
      setState((s) => ({ ...s, material: [...s.material, { ...m, id: uid() }] })),
    removeMaterial: (id) =>
      setState((s) => ({ ...s, material: s.material.filter((x) => x.id !== id) })),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData debe usarse dentro de DataProvider');
  return ctx;
}

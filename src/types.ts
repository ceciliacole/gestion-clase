export type Materia = 'cono' | 'lengua';

export interface Alumno {
  id: string;
  nombre: string;
  grupo: string;
}

export type EstadoActividad = 'pendiente' | 'entregada' | 'corregida';

export interface Actividad {
  id: string;
  materia: Materia;
  titulo: string;
  fecha: string; // ISO date
  alumnoId: string;
  estado: EstadoActividad;
  nota?: number;
}

export interface Control {
  id: string;
  materia: Materia;
  tema: string;
  fecha: string;
  alumnoId: string;
  nota?: number;
}

export interface FaseProyecto {
  id: string;
  titulo: string;
  fecha: string;
  completada: boolean;
}

export interface Proyecto {
  id: string;
  materia: Materia;
  titulo: string;
  alumnoId: string;
  fases: FaseProyecto[];
  notaFinal?: number;
}

export interface Lectura {
  id: string;
  alumnoId: string;
  libro: string;
  fechaInicio: string;
  fechaFin?: string;
  valoracion?: number; // 1-5
  notas?: string;
}

export interface VelocidadLectora {
  id: string;
  alumnoId: string;
  fecha: string;
  palabrasPorMinuto: number;
}

export type TipoIncidencia = 'positiva' | 'negativa';

export interface Incidencia {
  id: string;
  alumnoId: string;
  fecha: string;
  tipo: TipoIncidencia;
  descripcion: string;
  puntos: number;
}

export interface RegistroMaterial {
  id: string;
  alumnoId: string;
  fecha: string;
  faltante: string; // p.ej. "agenda", "libro de lengua"
}

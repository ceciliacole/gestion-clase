import type { Materia } from '../types';

const labels: Record<Materia, string> = {
  cono: '🌍 Cono',
  lengua: '📚 Lengua',
};

export default function MateriaBadge({ materia }: { materia: Materia }) {
  return <span className={`badge badge-${materia}`}>{labels[materia]}</span>;
}

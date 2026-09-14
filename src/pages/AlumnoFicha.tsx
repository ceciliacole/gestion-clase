import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Sparkline from '../components/Sparkline';
import MateriaBadge from '../components/MateriaBadge';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';

export default function AlumnoFicha() {
  const { id } = useParams();
  const {
    alumnos,
    actividades,
    controles,
    proyectos,
    lecturas,
    velocidades,
    incidencias,
    material,
  } = useData();

  const alumno = alumnos.find((a) => a.id === id);

  if (!alumno) {
    return (
      <div>
        <p>Alumno no encontrado.</p>
        <Link to="/alumnos">Volver a alumnos</Link>
      </div>
    );
  }

  const misActividades = actividades.filter((a) => a.alumnoId === id);
  const misControles = controles.filter((c) => c.alumnoId === id);
  const misProyectos = proyectos.filter((p) => p.alumnoId === id);
  const misLecturas = lecturas.filter((l) => l.alumnoId === id);
  const misVelocidades = velocidades
    .filter((v) => v.alumnoId === id)
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
  const misIncidencias = incidencias.filter((i) => i.alumnoId === id);
  const miMaterial = material.filter((m) => m.alumnoId === id);
  const puntos = misIncidencias.reduce((sum, i) => sum + i.puntos, 0);

  return (
    <div>
      <p>
        <Link to="/alumnos">← Alumnos</Link>
      </p>
      <div className="ficha-header">
        <Avatar name={alumno.nombre} size={64} />
        <div>
          <h2 className="page-title">{alumno.nombre}</h2>
          <p className="muted">{alumno.grupo}</p>
        </div>
      </div>

      <div className="grid-cards">
        <div className="card stat">
          <div className="stat-emoji">⭐</div>
          <div className="stat-num">{puntos}</div>
          <div className="stat-label">Puntos comportamiento</div>
        </div>
        <div className="card stat">
          <div className="stat-emoji">📖</div>
          <div className="stat-num">{misLecturas.length}</div>
          <div className="stat-label">Libros leídos</div>
        </div>
        <div className="card stat">
          <div className="stat-emoji">🎒</div>
          <div className="stat-num">{miMaterial.length}</div>
          <div className="stat-label">Veces sin material</div>
        </div>
      </div>

      <div className="card">
        <h3>📈 Velocidad lectora</h3>
        <Sparkline
          data={misVelocidades.map((v) => ({ fecha: v.fecha, valor: v.palabrasPorMinuto }))}
        />
      </div>

      <div className="card">
        <h3>📖 Lecturas</h3>
        {misLecturas.length === 0 ? (
          <p className="muted">Sin lecturas registradas.</p>
        ) : (
          <ul>
            {misLecturas.map((l) => (
              <li key={l.id}>
                {l.libro} {l.fechaFin ? `(terminado ${l.fechaFin})` : '(en curso)'}
                {l.valoracion ? ` — ${'★'.repeat(l.valoracion)}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>📝 Actividades</h3>
        {misActividades.length === 0 ? (
          <p className="muted">Sin actividades registradas.</p>
        ) : (
          <ul>
            {misActividades.map((a) => (
              <li key={a.id}>
                <MateriaBadge materia={a.materia} /> {a.titulo} — {a.estado}
                {a.nota !== undefined ? ` — nota: ${a.nota}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>✏️ Controles</h3>
        {misControles.length === 0 ? (
          <p className="muted">Sin controles registrados.</p>
        ) : (
          <ul>
            {misControles.map((c) => (
              <li key={c.id}>
                <MateriaBadge materia={c.materia} /> {c.tema} — {c.fecha}
                {c.nota !== undefined ? ` — nota: ${c.nota}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>🚀 Proyectos</h3>
        {misProyectos.length === 0 ? (
          <p className="muted">Sin proyectos registrados.</p>
        ) : (
          <ul>
            {misProyectos.map((p) => (
              <li key={p.id}>
                <div className="proyecto-ficha-row">
                  <span>
                    <MateriaBadge materia={p.materia} /> {p.titulo}
                    {p.notaFinal !== undefined ? ` — nota final: ${p.notaFinal}` : ''}
                  </span>
                  {p.fases.length > 0 && (
                    <div className="proyecto-ficha-progress">
                      <ProgressBar
                        percent={(p.fases.filter((f) => f.completada).length / p.fases.length) * 100}
                        color={p.materia === 'cono' ? 'var(--cono)' : 'var(--lengua)'}
                      />
                      <span className="muted">
                        {p.fases.filter((f) => f.completada).length}/{p.fases.length}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>⭐ Incidencias de comportamiento</h3>
        {misIncidencias.length === 0 ? (
          <p className="muted">Sin incidencias registradas.</p>
        ) : (
          <ul>
            {misIncidencias.map((i) => (
              <li key={i.id} className={i.tipo === 'positiva' ? 'positiva' : 'negativa'}>
                {i.fecha} — {i.descripcion} ({i.puntos > 0 ? '+' : ''}{i.puntos})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

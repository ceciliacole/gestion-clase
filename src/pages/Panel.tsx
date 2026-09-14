import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Panel() {
  const { alumnos, actividades, controles, incidencias, material } = useData();

  const hoyStr = hoy();
  const materialHoy = material.filter((m) => m.fecha === hoyStr);
  const incidenciasHoy = incidencias.filter((i) => i.fecha === hoyStr);
  const proximosControles = controles
    .filter((c) => c.fecha >= hoyStr)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))
    .slice(0, 5);
  const pendientes = actividades.filter((a) => a.estado === 'pendiente').length;

  const nombre = (id: string) => alumnos.find((a) => a.id === id)?.nombre ?? '—';

  return (
    <div>
      <h2>Panel de clase</h2>

      {alumnos.length === 0 && (
        <div className="card empty-hint">
          Empieza dando de alta a tus alumnos en{' '}
          <Link to="/alumnos">Alumnos</Link>.
        </div>
      )}

      <div className="grid-cards">
        <div className="card stat">
          <div className="stat-num">{alumnos.length}</div>
          <div className="stat-label">Alumnos</div>
        </div>
        <div className="card stat">
          <div className="stat-num">{pendientes}</div>
          <div className="stat-label">Actividades pendientes</div>
        </div>
        <div className="card stat">
          <div className="stat-num">{materialHoy.length}</div>
          <div className="stat-label">Sin material hoy</div>
        </div>
        <div className="card stat">
          <div className="stat-num">{incidenciasHoy.length}</div>
          <div className="stat-label">Incidencias hoy</div>
        </div>
      </div>

      <div className="card">
        <h3>Sin material hoy</h3>
        {materialHoy.length === 0 ? (
          <p className="muted">Nadie registrado sin material hoy.</p>
        ) : (
          <ul>
            {materialHoy.map((m) => (
              <li key={m.id}>{nombre(m.alumnoId)} — {m.faltante}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Próximos controles</h3>
        {proximosControles.length === 0 ? (
          <p className="muted">No hay controles próximos registrados.</p>
        ) : (
          <ul>
            {proximosControles.map((c) => (
              <li key={c.id}>
                {c.fecha} — {c.tema} ({c.materia}) — {nombre(c.alumnoId)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Incidencias de hoy</h3>
        {incidenciasHoy.length === 0 ? (
          <p className="muted">Sin incidencias hoy.</p>
        ) : (
          <ul>
            {incidenciasHoy.map((i) => (
              <li key={i.id} className={i.tipo === 'positiva' ? 'positiva' : 'negativa'}>
                {nombre(i.alumnoId)} — {i.descripcion} ({i.puntos > 0 ? '+' : ''}{i.puntos})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

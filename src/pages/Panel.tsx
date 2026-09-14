import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import MateriaBadge from '../components/MateriaBadge';
import Avatar from '../components/Avatar';
import RankingBars from '../components/RankingBars';

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

  const ranking = alumnos
    .map((a) => ({
      id: a.id,
      nombre: a.nombre,
      valor: incidencias.filter((i) => i.alumnoId === a.id).reduce((sum, i) => sum + i.puntos, 0),
    }))
    .filter((r) => r.valor !== 0)
    .sort((a, b) => b.valor - a.valor)
    .slice(0, 6);

  return (
    <div>
      <h2 className="page-title"><span className="emoji">🗓️</span> Panel de clase</h2>

      {alumnos.length === 0 && (
        <div className="card empty-hint">
          Empieza dando de alta a tus alumnos en{' '}
          <Link to="/alumnos">Alumnos</Link>.
        </div>
      )}

      <div className="grid-cards">
        <div className="card stat">
          <div className="stat-emoji">🧑‍🎓</div>
          <div className="stat-num">{alumnos.length}</div>
          <div className="stat-label">Alumnos</div>
        </div>
        <div className="card stat">
          <div className="stat-emoji">📝</div>
          <div className="stat-num">{pendientes}</div>
          <div className="stat-label">Actividades pendientes</div>
        </div>
        <div className="card stat">
          <div className="stat-emoji">🎒</div>
          <div className="stat-num">{materialHoy.length}</div>
          <div className="stat-label">Sin material hoy</div>
        </div>
        <div className="card stat">
          <div className="stat-emoji">⭐</div>
          <div className="stat-num">{incidenciasHoy.length}</div>
          <div className="stat-label">Incidencias hoy</div>
        </div>
      </div>

      <div className="card">
        <h3>🏆 Ranking de comportamiento</h3>
        <RankingBars items={ranking} />
      </div>

      <div className="card">
        <h3>🎒 Sin material hoy</h3>
        {materialHoy.length === 0 ? (
          <p className="muted">Nadie registrado sin material hoy.</p>
        ) : (
          <ul>
            {materialHoy.map((m) => (
              <li key={m.id}>
                <Avatar name={nombre(m.alumnoId)} size={28} /> {nombre(m.alumnoId)} — {m.faltante}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>✏️ Próximos controles</h3>
        {proximosControles.length === 0 ? (
          <p className="muted">No hay controles próximos registrados.</p>
        ) : (
          <ul>
            {proximosControles.map((c) => (
              <li key={c.id}>
                <MateriaBadge materia={c.materia} /> {c.fecha} — {c.tema} — {nombre(c.alumnoId)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>⭐ Incidencias de hoy</h3>
        {incidenciasHoy.length === 0 ? (
          <p className="muted">Sin incidencias hoy.</p>
        ) : (
          <ul>
            {incidenciasHoy.map((i) => (
              <li key={i.id}>
                <Avatar name={nombre(i.alumnoId)} size={28} />
                <span className={i.tipo === 'positiva' ? 'positiva' : 'negativa'}>
                  {nombre(i.alumnoId)} — {i.descripcion} ({i.puntos > 0 ? '+' : ''}{i.puntos})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

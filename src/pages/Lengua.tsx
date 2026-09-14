import { useState } from 'react';
import { useData } from '../context/DataContext';
import AsignaturaBoard from '../components/AsignaturaBoard';

function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Lengua() {
  const { alumnos, lecturas, addLectura, updateLectura, removeLectura, velocidades, addVelocidad, removeVelocidad } =
    useData();
  const [seccion, setSeccion] = useState<'general' | 'lecturas' | 'velocidad'>('general');

  const nombre = (id: string) => alumnos.find((a) => a.id === id)?.nombre ?? '—';

  const [libAlumno, setLibAlumno] = useState('');
  const [libTitulo, setLibTitulo] = useState('');
  const [libInicio, setLibInicio] = useState(hoy());

  const [velAlumno, setVelAlumno] = useState('');
  const [velFecha, setVelFecha] = useState(hoy());
  const [velPpm, setVelPpm] = useState('');

  return (
    <div>
      <h2 className="page-title"><span className="emoji">📚</span> Lengua</h2>
      <div className="tabs">
        <button className={seccion === 'general' ? 'active' : ''} onClick={() => setSeccion('general')}>
          Actividades / Controles / Proyectos
        </button>
        <button className={seccion === 'lecturas' ? 'active' : ''} onClick={() => setSeccion('lecturas')}>
          Lecturas
        </button>
        <button className={seccion === 'velocidad' ? 'active' : ''} onClick={() => setSeccion('velocidad')}>
          Velocidad lectora
        </button>
      </div>

      {seccion === 'general' && <AsignaturaBoard materia="lengua" />}

      {seccion === 'lecturas' && (
        <div>
          {alumnos.length === 0 ? (
            <p className="muted">Da de alta alumnos primero.</p>
          ) : (
            <>
              <form
                className="card form-inline"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!libTitulo.trim() || !libAlumno) return;
                  addLectura({ alumnoId: libAlumno, libro: libTitulo.trim(), fechaInicio: libInicio });
                  setLibTitulo('');
                }}
              >
                <select value={libAlumno} onChange={(e) => setLibAlumno(e.target.value)}>
                  <option value="">Alumno...</option>
                  {alumnos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre}
                    </option>
                  ))}
                </select>
                <input placeholder="Título del libro" value={libTitulo} onChange={(e) => setLibTitulo(e.target.value)} />
                <input type="date" value={libInicio} onChange={(e) => setLibInicio(e.target.value)} />
                <button type="submit">Añadir</button>
              </form>

              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>Alumno</th>
                      <th>Libro</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th>Valoración</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecturas.map((l) => (
                      <tr key={l.id}>
                        <td>{nombre(l.alumnoId)}</td>
                        <td>{l.libro}</td>
                        <td>{l.fechaInicio}</td>
                        <td>
                          <input
                            type="date"
                            value={l.fechaFin ?? ''}
                            onChange={(e) => updateLectura(l.id, { fechaFin: e.target.value || undefined })}
                          />
                        </td>
                        <td>
                          <select
                            value={l.valoracion ?? ''}
                            onChange={(e) =>
                              updateLectura(l.id, {
                                valoracion: e.target.value === '' ? undefined : Number(e.target.value),
                              })
                            }
                          >
                            <option value="">—</option>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>
                                {'★'.repeat(n)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="col-actions">
                          <button className="link-btn danger" onClick={() => removeLectura(l.id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {seccion === 'velocidad' && (
        <div>
          {alumnos.length === 0 ? (
            <p className="muted">Da de alta alumnos primero.</p>
          ) : (
            <>
              <form
                className="card form-inline"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!velAlumno || velPpm === '') return;
                  addVelocidad({ alumnoId: velAlumno, fecha: velFecha, palabrasPorMinuto: Number(velPpm) });
                  setVelPpm('');
                }}
              >
                <select value={velAlumno} onChange={(e) => setVelAlumno(e.target.value)}>
                  <option value="">Alumno...</option>
                  {alumnos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre}
                    </option>
                  ))}
                </select>
                <input type="date" value={velFecha} onChange={(e) => setVelFecha(e.target.value)} />
                <input
                  type="number"
                  min={0}
                  placeholder="Palabras/min"
                  value={velPpm}
                  onChange={(e) => setVelPpm(e.target.value)}
                />
                <button type="submit">Añadir</button>
              </form>

              <div className="card">
                <table>
                  <thead>
                    <tr>
                      <th>Alumno</th>
                      <th>Fecha</th>
                      <th>Palabras/min</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {velocidades
                      .slice()
                      .sort((a, b) => b.fecha.localeCompare(a.fecha))
                      .map((v) => (
                        <tr key={v.id}>
                          <td>{nombre(v.alumnoId)}</td>
                          <td>{v.fecha}</td>
                          <td>{v.palabrasPorMinuto}</td>
                          <td className="col-actions">
                            <button className="link-btn danger" onClick={() => removeVelocidad(v.id)}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

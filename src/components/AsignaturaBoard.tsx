import { useState } from 'react';
import { useData } from '../context/DataContext';
import type { Materia, EstadoActividad } from '../types';

function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function AsignaturaBoard({ materia }: { materia: Materia }) {
  const {
    alumnos,
    actividades,
    addActividad,
    updateActividad,
    removeActividad,
    controles,
    addControl,
    removeControl,
    proyectos,
    addProyecto,
    updateProyecto,
    removeProyecto,
  } = useData();

  const [tab, setTab] = useState<'actividades' | 'controles' | 'proyectos'>('actividades');

  const misActividades = actividades.filter((a) => a.materia === materia);
  const misControles = controles.filter((c) => c.materia === materia);
  const misProyectos = proyectos.filter((p) => p.materia === materia);

  const nombre = (id: string) => alumnos.find((a) => a.id === id)?.nombre ?? '—';

  // formularios
  const [actTitulo, setActTitulo] = useState('');
  const [actAlumno, setActAlumno] = useState('');
  const [actFecha, setActFecha] = useState(hoy());

  const [ctrlTema, setCtrlTema] = useState('');
  const [ctrlAlumno, setCtrlAlumno] = useState('');
  const [ctrlFecha, setCtrlFecha] = useState(hoy());
  const [ctrlNota, setCtrlNota] = useState('');

  const [proyTitulo, setProyTitulo] = useState('');
  const [proyAlumno, setProyAlumno] = useState('');

  if (alumnos.length === 0) {
    return <p className="muted">Da de alta alumnos primero en la sección Alumnos.</p>;
  }

  return (
    <div>
      <div className="tabs">
        <button className={tab === 'actividades' ? 'active' : ''} onClick={() => setTab('actividades')}>
          Actividades
        </button>
        <button className={tab === 'controles' ? 'active' : ''} onClick={() => setTab('controles')}>
          Controles
        </button>
        <button className={tab === 'proyectos' ? 'active' : ''} onClick={() => setTab('proyectos')}>
          Proyectos
        </button>
      </div>

      {tab === 'actividades' && (
        <div>
          <form
            className="card form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              if (!actTitulo.trim() || !actAlumno) return;
              addActividad({
                materia,
                titulo: actTitulo.trim(),
                alumnoId: actAlumno,
                fecha: actFecha,
                estado: 'pendiente',
              });
              setActTitulo('');
            }}
          >
            <select value={actAlumno} onChange={(e) => setActAlumno(e.target.value)}>
              <option value="">Alumno...</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <input placeholder="Título" value={actTitulo} onChange={(e) => setActTitulo(e.target.value)} />
            <input type="date" value={actFecha} onChange={(e) => setActFecha(e.target.value)} />
            <button type="submit">Añadir</button>
          </form>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Título</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Nota</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {misActividades.map((a) => (
                  <tr key={a.id}>
                    <td>{nombre(a.alumnoId)}</td>
                    <td>{a.titulo}</td>
                    <td>{a.fecha}</td>
                    <td>
                      <select
                        value={a.estado}
                        onChange={(e) =>
                          updateActividad(a.id, { estado: e.target.value as EstadoActividad })
                        }
                      >
                        <option value="pendiente">pendiente</option>
                        <option value="entregada">entregada</option>
                        <option value="corregida">corregida</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        step={0.1}
                        value={a.nota ?? ''}
                        onChange={(e) =>
                          updateActividad(a.id, {
                            nota: e.target.value === '' ? undefined : Number(e.target.value),
                          })
                        }
                        className="nota-input"
                      />
                    </td>
                    <td className="col-actions">
                      <button className="link-btn danger" onClick={() => removeActividad(a.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'controles' && (
        <div>
          <form
            className="card form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ctrlTema.trim() || !ctrlAlumno) return;
              addControl({
                materia,
                tema: ctrlTema.trim(),
                alumnoId: ctrlAlumno,
                fecha: ctrlFecha,
                nota: ctrlNota === '' ? undefined : Number(ctrlNota),
              });
              setCtrlTema('');
              setCtrlNota('');
            }}
          >
            <select value={ctrlAlumno} onChange={(e) => setCtrlAlumno(e.target.value)}>
              <option value="">Alumno...</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <input placeholder="Tema" value={ctrlTema} onChange={(e) => setCtrlTema(e.target.value)} />
            <input type="date" value={ctrlFecha} onChange={(e) => setCtrlFecha(e.target.value)} />
            <input
              type="number"
              min={0}
              max={10}
              step={0.1}
              placeholder="Nota"
              value={ctrlNota}
              onChange={(e) => setCtrlNota(e.target.value)}
              className="nota-input"
            />
            <button type="submit">Añadir</button>
          </form>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Alumno</th>
                  <th>Tema</th>
                  <th>Fecha</th>
                  <th>Nota</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {misControles.map((c) => (
                  <tr key={c.id}>
                    <td>{nombre(c.alumnoId)}</td>
                    <td>{c.tema}</td>
                    <td>{c.fecha}</td>
                    <td>{c.nota ?? '—'}</td>
                    <td className="col-actions">
                      <button className="link-btn danger" onClick={() => removeControl(c.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'proyectos' && (
        <div>
          <form
            className="card form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              if (!proyTitulo.trim() || !proyAlumno) return;
              addProyecto({
                materia,
                titulo: proyTitulo.trim(),
                alumnoId: proyAlumno,
                fases: [],
              });
              setProyTitulo('');
            }}
          >
            <select value={proyAlumno} onChange={(e) => setProyAlumno(e.target.value)}>
              <option value="">Alumno...</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <input placeholder="Título del proyecto" value={proyTitulo} onChange={(e) => setProyTitulo(e.target.value)} />
            <button type="submit">Añadir</button>
          </form>

          <div className="card">
            {misProyectos.length === 0 ? (
              <p className="muted">Sin proyectos.</p>
            ) : (
              misProyectos.map((p) => (
                <div key={p.id} className="proyecto-item">
                  <div className="proyecto-header">
                    <strong>
                      {p.titulo} — {nombre(p.alumnoId)}
                    </strong>
                    <div>
                      <label>
                        Nota final:{' '}
                        <input
                          type="number"
                          min={0}
                          max={10}
                          step={0.1}
                          value={p.notaFinal ?? ''}
                          onChange={(e) =>
                            updateProyecto(p.id, {
                              notaFinal: e.target.value === '' ? undefined : Number(e.target.value),
                            })
                          }
                          className="nota-input"
                        />
                      </label>
                      <button className="link-btn danger" onClick={() => removeProyecto(p.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <FaseForm
                    onAdd={(titulo) =>
                      updateProyecto(p.id, {
                        fases: [
                          ...p.fases,
                          { id: Math.random().toString(36).slice(2, 10), titulo, fecha: hoy(), completada: false },
                        ],
                      })
                    }
                  />
                  <ul>
                    {p.fases.map((f) => (
                      <li key={f.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={f.completada}
                            onChange={(e) =>
                              updateProyecto(p.id, {
                                fases: p.fases.map((x) =>
                                  x.id === f.id ? { ...x, completada: e.target.checked } : x
                                ),
                              })
                            }
                          />
                          {f.titulo}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FaseForm({ onAdd }: { onAdd: (titulo: string) => void }) {
  const [titulo, setTitulo] = useState('');
  return (
    <form
      className="form-inline compact"
      onSubmit={(e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        onAdd(titulo.trim());
        setTitulo('');
      }}
    >
      <input
        placeholder="Nueva fase"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button type="submit">Añadir fase</button>
    </form>
  );
}

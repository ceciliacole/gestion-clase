import { useState } from 'react';
import { useData } from '../context/DataContext';
import type { TipoIncidencia } from '../types';
import Avatar from '../components/Avatar';

function hoy(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Clase() {
  const { alumnos, incidencias, addIncidencia, removeIncidencia, material, addMaterial, removeMaterial } =
    useData();
  const [seccion, setSeccion] = useState<'comportamiento' | 'material'>('comportamiento');

  const nombre = (id: string) => alumnos.find((a) => a.id === id)?.nombre ?? '—';

  const [incAlumno, setIncAlumno] = useState('');
  const [incTipo, setIncTipo] = useState<TipoIncidencia>('positiva');
  const [incDesc, setIncDesc] = useState('');
  const [incPuntos, setIncPuntos] = useState('1');

  const [matAlumno, setMatAlumno] = useState('');
  const [matFaltante, setMatFaltante] = useState('');

  if (alumnos.length === 0) {
    return (
      <div>
        <h2 className="page-title"><span className="emoji">⭐</span> Comportamiento y material</h2>
        <p className="muted">Da de alta alumnos primero en la sección Alumnos.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title"><span className="emoji">⭐</span> Comportamiento y material</h2>
      <div className="tabs">
        <button
          className={seccion === 'comportamiento' ? 'active' : ''}
          onClick={() => setSeccion('comportamiento')}
        >
          Comportamiento
        </button>
        <button className={seccion === 'material' ? 'active' : ''} onClick={() => setSeccion('material')}>
          Material
        </button>
      </div>

      {seccion === 'comportamiento' && (
        <div>
          <form
            className="card form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              if (!incAlumno || !incDesc.trim()) return;
              addIncidencia({
                alumnoId: incAlumno,
                fecha: hoy(),
                tipo: incTipo,
                descripcion: incDesc.trim(),
                puntos: incTipo === 'positiva' ? Math.abs(Number(incPuntos) || 1) : -Math.abs(Number(incPuntos) || 1),
              });
              setIncDesc('');
            }}
          >
            <select value={incAlumno} onChange={(e) => setIncAlumno(e.target.value)}>
              <option value="">Alumno...</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <select value={incTipo} onChange={(e) => setIncTipo(e.target.value as TipoIncidencia)}>
              <option value="positiva">Positiva</option>
              <option value="negativa">Negativa</option>
            </select>
            <input placeholder="Descripción" value={incDesc} onChange={(e) => setIncDesc(e.target.value)} />
            <input
              type="number"
              min={1}
              value={incPuntos}
              onChange={(e) => setIncPuntos(e.target.value)}
              className="nota-input"
            />
            <button type="submit">Registrar</button>
          </form>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Alumno</th>
                  <th>Descripción</th>
                  <th>Puntos</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {incidencias
                  .slice()
                  .sort((a, b) => b.fecha.localeCompare(a.fecha))
                  .map((i) => (
                    <tr key={i.id} className={i.tipo === 'positiva' ? 'positiva' : 'negativa'}>
                      <td>{i.fecha}</td>
                      <td>
                        <span className="alumno-row">
                          <Avatar name={nombre(i.alumnoId)} size={24} />
                          {nombre(i.alumnoId)}
                        </span>
                      </td>
                      <td>{i.descripcion}</td>
                      <td>{i.puntos > 0 ? '+' : ''}{i.puntos}</td>
                      <td className="col-actions">
                        <button className="link-btn danger" onClick={() => removeIncidencia(i.id)}>
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

      {seccion === 'material' && (
        <div>
          <form
            className="card form-inline"
            onSubmit={(e) => {
              e.preventDefault();
              if (!matAlumno || !matFaltante.trim()) return;
              addMaterial({ alumnoId: matAlumno, fecha: hoy(), faltante: matFaltante.trim() });
              setMatFaltante('');
            }}
          >
            <select value={matAlumno} onChange={(e) => setMatAlumno(e.target.value)}>
              <option value="">Alumno...</option>
              {alumnos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre}
                </option>
              ))}
            </select>
            <input
              placeholder="Qué falta (agenda, libro...)"
              value={matFaltante}
              onChange={(e) => setMatFaltante(e.target.value)}
            />
            <button type="submit">Registrar</button>
          </form>

          <div className="card">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Alumno</th>
                  <th>Falta</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {material
                  .slice()
                  .sort((a, b) => b.fecha.localeCompare(a.fecha))
                  .map((m) => (
                    <tr key={m.id}>
                      <td>{m.fecha}</td>
                      <td>
                        <span className="alumno-row">
                          <Avatar name={nombre(m.alumnoId)} size={24} />
                          {nombre(m.alumnoId)}
                        </span>
                      </td>
                      <td>{m.faltante}</td>
                      <td className="col-actions">
                        <button className="link-btn danger" onClick={() => removeMaterial(m.id)}>
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
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Alumnos() {
  const { alumnos, addAlumno, removeAlumno } = useData();
  const [nombre, setNombre] = useState('');
  const [grupo, setGrupo] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    addAlumno({ nombre: nombre.trim(), grupo: grupo.trim() || 'Sin grupo' });
    setNombre('');
    setGrupo('');
  };

  const grupos = Array.from(new Set(alumnos.map((a) => a.grupo)));

  return (
    <div>
      <h2 className="page-title"><span className="emoji">🧑‍🎓</span> Alumnos</h2>

      <form className="card form-inline" onSubmit={onSubmit}>
        <input
          placeholder="Nombre del alumno"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          placeholder="Grupo (p.ej. 5ºA)"
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
          list="grupos-existentes"
        />
        <datalist id="grupos-existentes">
          {grupos.map((g) => (
            <option key={g} value={g} />
          ))}
        </datalist>
        <button type="submit">Añadir alumno</button>
      </form>

      {grupos.length === 0 && (
        <p className="muted">Todavía no hay alumnos dados de alta.</p>
      )}

      {grupos.map((g) => (
        <div className="card" key={g}>
          <h3>{g}</h3>
          <table>
            <tbody>
              {alumnos
                .filter((a) => a.grupo === g)
                .map((a) => (
                  <tr key={a.id}>
                    <td>
                      <Link to={`/alumnos/${a.id}`}>{a.nombre}</Link>
                    </td>
                    <td className="col-actions">
                      <button className="link-btn danger" onClick={() => removeAlumno(a.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

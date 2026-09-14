import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Panel', end: true },
  { to: '/alumnos', label: 'Alumnos' },
  { to: '/cono', label: 'Cono' },
  { to: '/lengua', label: 'Lengua' },
  { to: '/clase', label: 'Comportamiento y material' },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="brand">Gestión de clase</h1>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

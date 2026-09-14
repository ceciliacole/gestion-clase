import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Panel', emoji: '🗓️', end: true },
  { to: '/alumnos', label: 'Alumnos', emoji: '🧑‍🎓' },
  { to: '/cono', label: 'Cono', emoji: '🌍' },
  { to: '/lengua', label: 'Lengua', emoji: '📚' },
  { to: '/clase', label: 'Comportamiento y material', emoji: '⭐' },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1 className="brand">🎒 Gestión de clase</h1>
        <p className="brand-tagline">Todo tu cole, en un sitio</p>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              <span className="nav-emoji">{l.emoji}</span>
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

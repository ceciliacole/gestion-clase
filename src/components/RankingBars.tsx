import Avatar from './Avatar';

interface Item {
  id: string;
  nombre: string;
  valor: number;
}

export default function RankingBars({ items }: { items: Item[] }) {
  if (items.length === 0) return <p className="muted">Sin datos todavía.</p>;

  const max = Math.max(1, ...items.map((i) => Math.abs(i.valor)));

  return (
    <div className="ranking">
      {items.map((i) => (
        <div className="ranking-row" key={i.id}>
          <Avatar name={i.nombre} size={28} />
          <span className="ranking-name">{i.nombre}</span>
          <div className="ranking-track">
            <div
              className={'ranking-fill ' + (i.valor < 0 ? 'negativa-fill' : 'positiva-fill')}
              style={{ width: `${(Math.abs(i.valor) / max) * 100}%` }}
            />
          </div>
          <span className={'ranking-value ' + (i.valor < 0 ? 'negativa' : 'positiva')}>
            {i.valor > 0 ? '+' : ''}
            {i.valor}
          </span>
        </div>
      ))}
    </div>
  );
}

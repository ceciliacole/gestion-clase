interface Point {
  fecha: string;
  valor: number;
}

export default function Sparkline({ data }: { data: Point[] }) {
  if (data.length === 0) return <p className="muted">Sin datos todavía.</p>;

  const width = 320;
  const height = 100;
  const padding = 20;
  const values = data.map((d) => d.valor);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(data.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((d.valor - min) / range) * (height - padding * 2);
    return { x, y, ...d };
  });

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <svg width={width} height={height} className="sparkline">
      <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--accent)">
          <title>{`${p.fecha}: ${p.valor} ppm`}</title>
        </circle>
      ))}
    </svg>
  );
}

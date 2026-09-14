interface Point {
  fecha: string;
  valor: number;
}

export default function Sparkline({ data }: { data: Point[] }) {
  if (data.length === 0) return <p className="muted">Sin datos todavía.</p>;

  const width = 560;
  const height = 160;
  const padding = 28;
  const values = data.map((d) => d.valor);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(data.length - 1, 1)) * (width - padding * 2);
    const y = height - padding - ((d.valor - min) / range) * (height - padding * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath =
    `M${points[0].x},${height - padding} ` +
    points.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${points[points.length - 1].x},${height - padding} Z`;

  const last = points[points.length - 1];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="sparkline">
      <defs>
        <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkline-fill)" stroke="none" />
      <path d={linePath} fill="none" stroke="var(--accent)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 6 : 4} fill="var(--card-bg)" stroke="var(--accent)" strokeWidth={2.5}>
          <title>{`${p.fecha}: ${p.valor} ppm`}</title>
        </circle>
      ))}
      <text x={last.x} y={last.y - 14} textAnchor="middle" className="sparkline-label">
        {last.valor} ppm
      </text>
    </svg>
  );
}

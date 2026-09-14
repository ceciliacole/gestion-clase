const PALETTE = ['#6C5CE7', '#FF7A59', '#17A673', '#FFC93C', '#FF6B9D', '#3AB0FF', '#F97316'];

function colorFor(name: string): string {
  const sum = [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return PALETTE[sum % PALETTE.length];
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');
}

export default function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  return (
    <span
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: colorFor(name),
      }}
    >
      {initials(name)}
    </span>
  );
}

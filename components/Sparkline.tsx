export default function Sparkline({
  data,
  className = "",
}: {
  data: number[];
  className?: string;
}) {
  const max = Math.max(...data);
  const barWidth = 100 / data.length;

  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className={className}
      role="img"
      aria-label="Letters submitted over the last 7 days"
    >
      {data.map((value, i) => {
        const height = max === 0 ? 0 : (value / max) * 34 + 2;
        const isLast = i === data.length - 1;
        return (
          <rect
            key={i}
            x={i * barWidth + barWidth * 0.2}
            y={40 - height}
            width={barWidth * 0.6}
            height={height}
            rx={1}
            fill={isLast ? "var(--accent)" : "var(--border)"}
          />
        );
      })}
    </svg>
  );
}

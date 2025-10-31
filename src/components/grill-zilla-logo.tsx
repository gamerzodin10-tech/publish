export function GrillZillaLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-labelledby="grill-zilla-logo-title"
    >
      <title id="grill-zilla-logo-title">Grill Zilla Logo</title>
      <g>
        <path fill="hsl(var(--primary))" d="M25 80 A 30 30, 0, 1, 1, 75 80" />
        <path fill="hsl(var(--background))" d="M30 80 A 25 25, 0, 1, 1, 70 80" />
        <path fill="none" stroke="hsl(var(--primary))" strokeWidth="2" d="M15 50 A 40 40, 0, 1, 1, 85 50" />

        <rect x="10" y="45" width="80" height="10" fill="hsl(var(--foreground))" />

        <text x="50" y="52.5" textAnchor="middle" fill="hsl(var(--background))" fontWeight="bold" fontSize="8" fontFamily="monospace">
          GRILL ZILLA
        </text>

        <path d="M 50 25 C 40 25, 30 35, 30 45 L 70 45 C 70 35, 60 25, 50 25 Z" fill="hsl(var(--foreground))" />

        <path d="M35 45 L 30 55" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />
        <path d="M65 45 L 70 55" stroke="hsl(var(--foreground))" strokeWidth="2" strokeLinecap="round" />

        <path d="M 35 30 C 30 20, 40 20, 40 30" fill="hsl(var(--primary))" />
        <path d="M 45 30 C 40 20, 50 20, 50 30" fill="hsl(var(--primary))" />
        <path d="M 55 30 C 50 20, 60 20, 60 30" fill="hsl(var(--primary))" />

        <text x="50" y="75" textAnchor="middle" fill="hsl(var(--primary))" fontWeight="bold" fontSize="10" fontFamily="monospace">
          ESTD 2025
        </text>
      </g>
    </svg>
  );
}

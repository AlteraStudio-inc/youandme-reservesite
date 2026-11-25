type P = { className?: string };

export function CameraIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="14.4" cy="5.6" r="1" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ className = "", dir = "right" }: P & { dir?: "right" | "down" | "left" | "out" }) {
  const d = {
    right: "M4 10h12m0 0-4.5-4.5M16 10l-4.5 4.5",
    left: "M16 10H4m0 0 4.5-4.5M4 10l4.5 4.5",
    down: "M10 4v12m0 0-4.5-4.5M10 16l4.5-4.5",
    out: "M6 14 14 6m0 0H7.5M14 6v6.5",
  }[dir];
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 18s5.5-5.2 5.5-9.6A5.5 5.5 0 0 0 4.5 8.4C4.5 12.8 10 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="8.4" r="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

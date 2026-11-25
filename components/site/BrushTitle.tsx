import type { ReactNode } from "react";

export default function BrushTitle({
  children,
  sub,
  tone = "sumi",
  id,
}: {
  children: ReactNode;
  sub?: ReactNode;
  tone?: "sumi" | "cream";
  id?: string;
}) {
  return (
    <div className="text-center">
      <h2
        id={id}
        className={`font-brush text-[clamp(38px,9vw,64px)] leading-[1.15] tracking-[0.12em] ${
          tone === "cream" ? "text-cream" : "text-sumi"
        }`}
      >
        {children}
      </h2>
      {sub && (
        <p className={`mt-3 text-[14px] font-bold ${tone === "cream" ? "text-cream/80" : "text-sumi/75"}`}>{sub}</p>
      )}
    </div>
  );
}

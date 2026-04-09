"use client";

export default function Marquee() {
  const text =
    "Jerk Chicken — Spice Tacos — Craft Drinks — Fukuoka Haruyoshi — Open 18:00 — ";
  return (
    <div className="py-4 sm:py-5 overflow-hidden border-y border-border bg-surface select-none">
      <div className="marquee-track flex w-max">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-[13px] sm:text-[14px] font-medium tracking-[0.08em] text-text-tertiary/60 whitespace-nowrap px-1"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

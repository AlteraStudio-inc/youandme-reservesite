/** 写真の三連（PC）／一枚（スマホ）に、縦書きのひとこと */
const SHOTS = [
  { src: "/photos/stall-dusk.jpg", alt: "日暮れどき、ビルの前で灯りがともった屋台 El Bajon", pos: "50% 55%" },
  { src: "/photos/jerk-chicken.jpg", alt: "炭火で焼いたジャークチキン", pos: "50% 50%" },
  { src: "/photos/ramen.jpg", alt: "チャーシューと紅しょうがをのせた豚骨ラーメン", pos: "50% 50%" },
];

export default function HomeHero() {
  return (
    <section className="relative bg-sumi pt-16 lg:pt-[104px]">
      <div className="relative grid h-[68svh] min-h-[420px] grid-cols-1 overflow-hidden lg:h-[calc(100svh-104px)] lg:max-h-[760px] lg:min-h-[540px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-[3px]">
        {SHOTS.map((s, i) => (
          <div key={s.src} className={`relative overflow-hidden ${i > 0 ? "hidden lg:block" : ""}`}>
            <img
              src={s.src}
              alt={s.alt}
              className="slowzoom h-full w-full object-cover"
              style={{ objectPosition: s.pos, animationDelay: `${i * 0.4}s` }}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
          </div>
        ))}

        {/* 写真を夜に沈める */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0%_0_0/0.35)_0%,transparent_30%,transparent_55%,oklch(0%_0_0/0.75)_100%)]"
        />

        <h1 className="tate absolute top-10 right-5 font-brush text-[clamp(30px,8vw,58px)] leading-[1.35] tracking-[0.14em] text-paper [text-shadow:0_2px_18px_oklch(0%_0_0/0.75)] sm:right-10 lg:top-14 lg:right-14">
          <span className="block">世界のうまいもの、</span>
          <span className="block pt-[2.2em]">路上にて。</span>
        </h1>

        <p className="absolute bottom-6 left-5 text-[12px] font-bold tracking-[0.2em] text-paper/85 sm:left-10 lg:bottom-8 lg:left-[calc(2rem+220px)]">
          The restaurant on the street
        </p>
      </div>
    </section>
  );
}

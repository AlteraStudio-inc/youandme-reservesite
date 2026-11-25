import { yen, type Dish } from "@/lib/site";

/** 屋台の壁にかかった木札の品書き。札を押すと、その料理の説明へ飛ぶ */
export default function FudaWall({ dishes }: { dishes: Dish[] }) {
  return (
    <section aria-labelledby="fuda-title" className="wood relative py-12 sm:py-16" style={{ ["--plank" as string]: "120px" }}>
      <h2 id="fuda-title" className="text-center text-[13px] font-bold tracking-[0.3em] text-cream/80">
        屋台の品書き
      </h2>

      <div className="relative mx-auto mt-8 max-w-[1180px]">
        {/* 札をかける横木 */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-3 bg-fuda-edge shadow-[0_4px_8px_-2px_oklch(0%_0_0/0.6)] sm:mx-8" />

        <ul className="no-bar flex snap-x gap-3 overflow-x-auto px-5 pt-3 pb-4 sm:justify-center sm:gap-4 sm:px-8 lg:flex-wrap lg:overflow-visible">
          {dishes.map((d, i) => {
            const lines = d.fuda ?? [d.name];
            const long = lines.length > 1 || d.name.length > 7;
            return (
              <li key={d.id} className="shrink-0 snap-start" style={{ transform: `rotate(${[-1.5, 1, -0.5, 1.5, -1][i % 5]}deg)` }}>
                <a href={`#dish-${d.id}`} className="group flex flex-col items-center" aria-label={`${d.name}の説明へ`}>
                  {/* 吊り紐 */}
                  <span aria-hidden="true" className="h-5 w-px bg-cream/50" />
                  <span
                    className="relative flex h-[200px] w-[64px] flex-col items-center bg-fuda pt-5 shadow-[0_12px_22px_-10px_oklch(0%_0_0/0.8),inset_0_0_0_2px_var(--color-fuda-edge)] transition-transform duration-200 group-hover:-translate-y-1 sm:h-[230px] sm:w-[72px]"
                    style={{ clipPath: "polygon(50% 0, 100% 9%, 100% 100%, 0 100%, 0 9%)" }}
                  >
                    <span aria-hidden="true" className="absolute top-[7px] h-2 w-2 rounded-full bg-sumi/70" />
                    <span
                      className="tate font-brush leading-[1.2] whitespace-nowrap text-sumi"
                      style={{ fontSize: long ? "17px" : "21px" }}
                    >
                      {lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                    {d.price != null && (
                      <span className="absolute bottom-2 bg-shu px-1 text-[10px] font-bold text-paper">{yen(d.price)}</span>
                    )}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

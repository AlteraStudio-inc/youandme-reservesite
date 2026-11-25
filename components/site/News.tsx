import { NEWS, SITE } from "@/lib/site";
import BrushTitle from "./BrushTitle";
import Reveal from "./Reveal";

export default function News() {
  return (
    <section id="news" aria-labelledby="news-title" className="kraft py-16 sm:py-24">
      <div className="mx-auto max-w-[900px] px-5 sm:px-8">
        <BrushTitle id="news-title">お知らせ</BrushTitle>
        <ul className="mt-10 sm:mt-14">
          {NEWS.map((n) => (
            <li key={n.date + n.text}>
              <Reveal className="grid gap-2 border-b border-sumi/15 py-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-6">
                <p className="flex items-center gap-3 whitespace-nowrap">
                  <time className="text-[14px] font-bold">{n.date}</time>
                  <span className="bg-sumi px-2.5 py-1 text-[11px] font-bold text-paper">{n.tag}</span>
                </p>
                <p className="text-[15px] leading-[1.9] font-bold">
                  {n.href ? (
                    <a
                      href={n.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-shu decoration-2 underline-offset-[5px] hover:underline"
                    >
                      {n.text}
                    </a>
                  ) : (
                    n.text
                  )}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-[13px] font-bold text-sumi/70">
          最新の営業状況は{" "}
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-shu-deep underline decoration-2 underline-offset-[5px]"
          >
            Instagram
          </a>{" "}
          でお知らせしています
        </p>
      </div>
    </section>
  );
}

import { SITE } from "@/lib/site";
import { CameraIcon } from "./icons";

export default function ReserveBand() {
  return (
    <section aria-labelledby="reserve-title" className="relative overflow-hidden bg-sumi">
      <img
        src="/photos/jerk-chicken.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative mx-auto flex max-w-[760px] flex-col items-center px-5 py-20 text-center text-paper sm:py-28">
        <h2 id="reserve-title" className="text-[clamp(26px,6vw,36px)] font-bold tracking-[0.12em]">
          ご予約
        </h2>
        <p className="mt-6 text-[15px] leading-[2.1] font-bold sm:text-[16px]">
          仕込みの量に限りがあります。
          <br />
          確実に召し上がりたい方は、InstagramのDMでご予約ください。
        </p>
        <a
          href={SITE.instagram.dm}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-flex h-14 items-center gap-2.5 whitespace-nowrap bg-shu px-9 text-[16px] font-bold text-paper transition-colors hover:bg-shu-hi"
        >
          <CameraIcon className="h-5 w-5" />
          DMで予約する
        </a>
      </div>
    </section>
  );
}

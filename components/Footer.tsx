"use client";

export default function Footer({ onReserve }: { onReserve?: () => void }) {
  return (
    <footer className="bg-[#0e0e0c] text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14">
        {/* Large brand statement */}
        <div className="pt-16 sm:pt-24 pb-14 sm:pb-20 border-b border-white/[0.05]">
          <p className="text-[clamp(28px,5vw,56px)] font-black tracking-tight leading-[1.15] text-white/10">
            you&<span className="text-brand-yellow/25">me</span> curry
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6 py-12 sm:py-16 border-b border-white/[0.05]">
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">Navigate</h4>
            {["About", "Menu", "Info", "Access"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block text-[13px] text-white/40 hover:text-brand-yellow transition-colors py-1.5">
                {l}
              </a>
            ))}
            <button onClick={onReserve} className="block text-[13px] text-white/40 hover:text-brand-yellow transition-colors py-1.5 text-left cursor-pointer">
              Reserve
            </button>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">Info</h4>
            <div className="text-[13px] text-white/40 space-y-1.5">
              <p>18:00 〜 24:00 / 25:00</p>
              <p>火曜定休</p>
              <p>約20席</p>
              <p>PayPay対応</p>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">Contact</h4>
            <a href="tel:092-600-9969" className="block text-[13px] text-white/40 hover:text-brand-yellow transition-colors py-1">
              092-600-9969
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[13px] text-white/40 hover:text-brand-yellow transition-colors py-1">
              Instagram
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="opacity-40">
                <path d="M3.5 8.5l5-5m0 0H4.5m4 0v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          <div>
            <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/20 mb-5">Address</h4>
            <p className="text-[13px] text-white/40 leading-relaxed">
              福岡県福岡市中央区<br />春吉2-17-1
            </p>
            <p className="text-[12px] text-white/25 mt-3">
              渡辺通駅 徒歩5〜10分
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[10px] text-white/10">&copy; 2026 you&me curry</p>
          <p className="text-[10px] text-white/10">Spice Izakaya — Fukuoka Haruyoshi</p>
        </div>
      </div>
    </footer>
  );
}

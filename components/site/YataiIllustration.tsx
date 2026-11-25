/**
 * 手描きSVGの屋台。実際の El Bajon（木の格子カウンター・青空が描かれた天井・
 * 灯りのともる店内・並んだスツール）をモチーフに、提灯と湯気を添えています。
 */
export default function YataiIllustration({ className = "" }: { className?: string }) {
  const slats = Array.from({ length: 26 }, (_, i) => 80 + i * 14.4);
  const stools = [138, 214, 306, 382];
  const stars: [number, number, number, number][] = [
    [40, 30, 1.6, 0], [96, 64, 1.1, 1.2], [150, 22, 1.4, 2.1], [372, 26, 1.2, 0.6],
    [430, 58, 1.7, 1.8], [488, 30, 1.1, 2.8], [60, 96, 1, 3.3], [470, 104, 1.2, 0.3],
    [250, 14, 1, 1.5], [340, 70, 0.9, 2.4],
  ];

  return (
    <svg
      viewBox="0 0 520 440"
      role="img"
      aria-labelledby="yatai-title"
      className={className}
    >
      <title id="yatai-title">夜の天神に灯る屋台 El Bajon のイラスト</title>
      <defs>
        <radialGradient id="halo" cx="50%" cy="55%" r="55%">
          <stop offset="0%" style={{ stopColor: "var(--color-lamp)", stopOpacity: 0.32 }} />
          <stop offset="60%" style={{ stopColor: "var(--color-lamp-deep)", stopOpacity: 0.08 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-night)", stopOpacity: 0 }} />
        </radialGradient>
        <linearGradient id="inside" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--color-lamp)" }} />
          <stop offset="100%" style={{ stopColor: "var(--color-lamp-deep)" }} />
        </linearGradient>
        <radialGradient id="spill" cx="50%" cy="0%" r="70%">
          <stop offset="0%" style={{ stopColor: "var(--color-lamp)", stopOpacity: 0.38 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-lamp)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="lanternGlow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" style={{ stopColor: "var(--color-lamp)", stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: "var(--color-shu)", stopOpacity: 0 }} />
        </radialGradient>
        <clipPath id="insideClip">
          <rect x="86" y="128" width="348" height="166" />
        </clipPath>
      </defs>

      {/* 星 */}
      {stars.map(([x, y, r, d], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          className="fill-ink twinkle"
          style={{ animationDelay: `-${d}s` }}
        />
      ))}

      {/* 灯りの暈 */}
      <ellipse cx="260" cy="250" rx="270" ry="200" fill="url(#halo)" className="glow" />

      {/* 地面に落ちる灯り */}
      <ellipse cx="260" cy="404" rx="250" ry="30" fill="url(#spill)" />
      <line x1="0" y1="404" x2="520" y2="404" className="stroke-rule" strokeWidth="1" />

      {/* 看板 */}
      <line x1="214" y1="76" x2="214" y2="94" className="stroke-timber-dark" strokeWidth="4" />
      <line x1="306" y1="76" x2="306" y2="94" className="stroke-timber-dark" strokeWidth="4" />
      <rect x="180" y="38" width="160" height="40" rx="3" className="fill-night-3 stroke-lamp" strokeWidth="1.5" />
      <text
        x="260"
        y="65"
        textAnchor="middle"
        className="fill-lamp"
        style={{ fontFamily: "var(--font-brush)", fontSize: 21, letterSpacing: "0.02em" }}
      >
        El Bajon
      </text>

      {/* 屋根 */}
      <polygon points="50,120 470,120 448,92 72,92" className="fill-timber-dark" />
      <rect x="44" y="116" width="432" height="12" rx="1.5" className="fill-timber" />

      {/* 店内 */}
      <g clipPath="url(#insideClip)">
        <rect x="86" y="128" width="348" height="166" fill="url(#inside)" className="glow" />
        {/* 天井の青空 */}
        <rect x="86" y="128" width="348" height="36" className="fill-sky" />
        <g className="fill-cloud">
          <ellipse cx="118" cy="146" rx="18" ry="7" />
          <ellipse cx="134" cy="141" rx="12" ry="7" />
          <ellipse cx="214" cy="150" rx="20" ry="6" />
          <ellipse cx="228" cy="145" rx="11" ry="6" />
          <ellipse cx="318" cy="143" rx="16" ry="6" />
          <ellipse cx="332" cy="148" rx="20" ry="6" />
          <ellipse cx="404" cy="146" rx="15" ry="6" />
        </g>
        {/* 裸電球 */}
        {[150, 260, 370].map((x) => (
          <g key={x}>
            <line x1={x} y1="164" x2={x} y2="178" className="stroke-lamp-ink" strokeWidth="1" />
            <circle cx={x} cy="182" r="5" className="fill-cloud" />
          </g>
        ))}
        {/* 棚と瓶 */}
        <rect x="100" y="232" width="150" height="3" className="fill-lamp-ink" opacity="0.4" />
        {[110, 124, 136, 150, 166, 180, 198, 214, 230].map((x, i) => (
          <rect
            key={x}
            x={x}
            y={i % 3 === 0 ? 206 : 214}
            width={i % 2 ? 8 : 10}
            height={i % 3 === 0 ? 26 : 18}
            rx="3"
            className="fill-lamp-ink"
            opacity={0.28 + (i % 3) * 0.08}
          />
        ))}
        {/* 店主のシルエット */}
        <g className="fill-lamp-ink" opacity="0.62">
          <circle cx="318" cy="222" r="15" />
          <path d="M282 294 C282 262 296 246 318 246 C340 246 354 262 354 294 Z" />
          <path d="M304 210 C306 198 330 198 332 210 Z" />
        </g>
      </g>

      {/* 柱 */}
      <rect x="78" y="120" width="9" height="230" className="fill-timber-dark" />
      <rect x="433" y="120" width="9" height="230" className="fill-timber-dark" />

      {/* カウンター */}
      <rect x="58" y="290" width="404" height="13" rx="2" className="fill-timber" />
      <rect x="70" y="303" width="380" height="80" className="fill-timber-dark" />
      {slats.map((x) => (
        <line key={x} x1={x} y1="306" x2={x} y2="380" className="stroke-timber" strokeWidth="5" opacity="0.55" />
      ))}

      {/* 鍋と湯気 */}
      <rect x="372" y="268" width="44" height="22" rx="5" className="fill-night-3" />
      <rect x="368" y="266" width="52" height="5" rx="2" className="fill-ink-3" />
      <g className="stroke-ink" strokeWidth="2" fill="none" strokeLinecap="round">
        <path className="steam" d="M384 258 c-6 -8 6 -12 0 -22" />
        <path className="steam steam-2" d="M394 258 c-6 -8 6 -12 0 -22" />
        <path className="steam steam-3" d="M404 258 c-6 -8 6 -12 0 -22" />
      </g>
      {/* グラスと皿 */}
      <rect x="132" y="274" width="12" height="16" rx="2" className="fill-cloud" opacity="0.8" />
      <rect x="134" y="278" width="8" height="10" rx="1" className="fill-lamp" />
      <ellipse cx="190" cy="288" rx="22" ry="4" className="fill-cloud" />
      <path d="M176 286 q14 -12 28 0 z" className="fill-shu" />

      {/* スツール */}
      {stools.map((x) => (
        <g key={x}>
          <line x1={x - 13} y1="352" x2={x - 18} y2="404" className="stroke-ink-3" strokeWidth="3" />
          <line x1={x + 13} y1="352" x2={x + 18} y2="404" className="stroke-ink-3" strokeWidth="3" />
          <line x1={x - 15} y1="380" x2={x + 15} y2="380" className="stroke-ink-3" strokeWidth="2" />
          <ellipse cx={x} cy="350" rx="22" ry="7" className="fill-ink-2" />
        </g>
      ))}

      {/* 提灯 */}
      {[
        { x: 112, label: ["屋", "台"], cls: "lantern" },
        { x: 408, label: ["天", "神"], cls: "lantern lantern-b" },
      ].map(({ x, label, cls }) => (
        <g key={x} className={cls}>
          <line x1={x} y1="128" x2={x} y2="140" className="stroke-night" strokeWidth="2" />
          <circle cx={x} cy="184" r="44" fill="url(#lanternGlow)" opacity="0.55" />
          <rect x={x - 13} y="140" width="26" height="7" rx="1.5" className="fill-night" />
          <ellipse cx={x} cy="184" rx="23" ry="38" className="fill-shu" />
          {[-24, -12, 0, 12, 24].map((dy) => (
            <path
              key={dy}
              d={`M${x - 22 + Math.abs(dy) / 3.2} ${184 + dy} Q${x} ${188 + dy} ${x + 22 - Math.abs(dy) / 3.2} ${184 + dy}`}
              className="stroke-shu-deep"
              strokeWidth="1.2"
              fill="none"
            />
          ))}
          <rect x={x - 13} y="219" width="26" height="7" rx="1.5" className="fill-night" />
          <line x1={x} y1="226" x2={x} y2="236" className="stroke-night" strokeWidth="2" />
          <text
            x={x}
            y="179"
            textAnchor="middle"
            className="fill-night"
            style={{ fontFamily: "var(--font-brush)", fontSize: 15 }}
          >
            {label[0]}
          </text>
          <text
            x={x}
            y="200"
            textAnchor="middle"
            className="fill-night"
            style={{ fontFamily: "var(--font-brush)", fontSize: 15 }}
          >
            {label[1]}
          </text>
        </g>
      ))}
    </svg>
  );
}

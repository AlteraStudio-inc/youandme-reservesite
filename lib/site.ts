/**
 * El Bajon — サイト全体で使う店舗情報。
 * 文言・営業時間・リンクはここだけを書き換えれば全ページに反映されます。
 * 出典: Instagram @bajon.restaurant_ots のプロフィールと投稿（2026年11月時点）
 */

export const SITE = {
  name: "El Bajon",
  nameKana: "エル・バホン",
  tagline: "The restaurant on the street",
  kind: "天神・日銀前の屋台",
  area: "福岡市中央区天神",
  landmark: "日本銀行 福岡支店前",
  hours: { open: "18:00頃", close: "23:00" },
  holiday: "不定休",
  rain: "雨の日はお休み",
  instagram: {
    handle: "bajon.restaurant_ots",
    url: "https://www.instagram.com/bajon.restaurant_ots/",
    dm: "https://ig.me/m/bajon.restaurant_ots",
  },
  mapUrl: "https://share.google/Dc2k4O6P0B7I7npQp",
  mapEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("日本銀行 福岡支店") +
    "&z=17&output=embed",
  ownerWords:
    "世界あちこちでうまいものをひたすら食べてきましたので、同じものを作ります。",
} as const;

/** お知らせ（Instagramの投稿から。新しい順） */
export const NEWS: { date: string; tag: string; text: string; href?: string }[] = [
  {
    date: "2026.06.25",
    tag: "メニュー",
    text: "「タコス アル・パストール」— 本場メキシコで学んだ製法で、スパイスに漬けた豚肉を炭火でローストしています。数量限定です。",
    href: "https://www.instagram.com/bajon.restaurant_ots/p/DaCSAyCE4s4/",
  },
  {
    date: "2026.06.12",
    tag: "メニュー",
    text: "タコス2種「パストール」「ジャメキシカン」各¥680。どちらも数に限りがあるので、売り切れ前にどうぞ。",
    href: "https://www.instagram.com/bajon.restaurant_ots/p/DZgvMVoTTRA/",
  },
  {
    date: "2026.03.30",
    tag: "メニュー",
    text: "南仏の家庭の味「クレープ・サレ」や、明太子を使ったオリジナルのおつまみもご用意しています。",
    href: "https://www.instagram.com/bajon.restaurant_ots/p/DWiHMP4mHwa/",
  },
];

/** ホームの「人気メニュー」に並べる看板料理（Instagram投稿で紹介されているもの） */
export type Stop = {
  code: string; // 国・地域の略号（スタンプ表示用）
  origin: string; // 料理のルーツ
  name: string;
  kana?: string;
  price?: number; // 投稿で価格が出ているものだけ
  note: string;
  photo?: { src: string; alt: string; kind?: "photo" | "poster" };
  /** 木札に縦書きするときの改行（長い名前だけ） */
  fuda?: string[];
};

export const ROUTE: Stop[] = [
  {
    code: "MEX",
    origin: "メキシコ",
    name: "タコス アル・パストール",
    price: 680,
    note: "スパイスでマリネした豚肉とパイナップルを重ね、本場にならって炭火でロースト。削ぎ切りにしてトルティーヤへ。",
    photo: { src: "/photos/tacos-poster.jpg", alt: "パストールとジャメキシカン、2種のタコスの告知ポスター", kind: "poster" },
  },
  {
    code: "JAM",
    origin: "ジャマイカ",
    name: "ジャークチキン",
    note: "店の看板。数種のスパイスに漬け込んだ鶏を、香ばしく焼き上げます。",
    photo: { src: "/photos/jerk-chicken.jpg", alt: "焼き目のついたジャークチキン" },
  },
  {
    code: "JAM × MEX",
    origin: "ジャマイカ × メキシコ",
    name: "ジャメキシカン",
    price: 680,
    note: "自慢のジャークチキンで作る、ジャマイカで流行中のタコス。辛いもの好きはまずこれを。",
  },
  {
    code: "FRA",
    origin: "南フランス",
    name: "クレープ・サレ",
    note: "南仏の家庭の味。ハム・チーズ・卵を、生地からこだわったクレープで包みます。",
  },
  {
    code: "NLD × HKT",
    origin: "オランダ × 博多",
    name: "カリカリチーズせんべい",
    fuda: ["カリカリ", "チーズせんべい"],
    note: "オランダ産チーズを焼いて、明太子の風味を重ねたおつまみ。一杯目のお供に。",
  },
  {
    code: "ESP",
    origin: "スペイン",
    name: "アヒージョ",
    note: "オリーブオイルとにんにくの香りで、屋台の夜風によく合う一皿。",
  },
  {
    code: "HKT",
    origin: "博多",
    name: "豚骨ラーメン",
    note: "世界を回って、最後は地元へ。博多の屋台らしい一杯も置いています。",
    photo: { src: "/photos/ramen.jpg", alt: "チャーシューと紅しょうがをのせた豚骨ラーメン" },
  },
];

export const ALSO = ["めんたいバタートースト", "おでん", "デザートクレープ"];

/** /menu ページのカテゴリ（menu_items.tag の値 → 表示名） */
export const CATEGORIES: { tag: string; label: string }[] = [
  { tag: "Tacos", label: "タコス" },
  { tag: "World", label: "世界のひと皿" },
  { tag: "Hakata", label: "博多" },
  { tag: "Sweets", label: "〆と甘いもの" },
  { tag: "Drinks", label: "ドリンク" },
];

export function categoryLabel(tag: string | null) {
  if (!tag) return "その他";
  return CATEGORIES.find((c) => c.tag === tag)?.label ?? tag;
}

export function yen(price: number) {
  return `¥${price.toLocaleString("ja-JP")}`;
}

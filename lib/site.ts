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
export const CATEGORIES: { tag: string; label: string; en: string; lead: string }[] = [
  { tag: "Tacos", label: "タコス", en: "Tacos", lead: "本場メキシコで学んだ味。どちらも数量限定です。" },
  { tag: "World", label: "世界のひと皿", en: "World plates", lead: "店主が旅先で出会った、各国の“うまいもの”。" },
  { tag: "Hakata", label: "博多の味", en: "Hakata", lead: "博多の屋台らしい定番と、明太子を使ったオリジナル。" },
  { tag: "Sweets", label: "甘いもの", en: "Sweets", lead: "食後にもう一品。" },
  { tag: "Drinks", label: "ドリンク", en: "Drinks", lead: "料理に合わせて。" },
];

/** 品書きの一品（DBの menu_items と、下の静的な品書きを同じ形で扱う） */
export type Dish = {
  id: string;
  name: string;
  en?: string;
  origin?: string;
  tag: string;
  price?: number | null;
  description?: string | null;
  photo?: { src: string; alt: string; kind?: "photo" | "poster" };
  limited?: boolean;
  fuda?: string[];
};

/**
 * DB（menu_items）が空・未接続のときに表示する品書き。
 * 内容と価格は Instagram の投稿で公表されているものだけ（価格はタコス2種のみ）。
 * DB に登録すると、そちらが優先されます（supabase/seed-el-bajon.sql と同じ内容）。
 */
export const MENU: Dish[] = [
  {
    id: "tacos-al-pastor",
    name: "タコス アル・パストール",
    fuda: ["タコス", "アル・パストール"],
    en: "Tacos al Pastor",
    origin: "メキシコ",
    tag: "Tacos",
    price: 680,
    limited: true,
    description:
      "スパイスで丁寧にマリネした豚肉とパイナップルを重ね、本場にならって炭火でロースト。焼き上がりを細かく削ぎ切りにして、トルティーヤにのせます。",
    photo: { src: "/photos/tacos-poster.jpg", alt: "パストールとジャメキシカン、2種のタコスの告知", kind: "poster" },
  },
  {
    id: "jamexican",
    name: "ジャメキシカン",
    en: "Jamexican",
    origin: "ジャマイカ × メキシコ",
    tag: "Tacos",
    price: 680,
    limited: true,
    description: "看板のジャークチキンで作る、ジャマイカで流行中のタコス。スパイシー好きの方はぜひ。",
  },
  {
    id: "jerk-chicken",
    name: "ジャークチキン",
    en: "Jerk Chicken",
    origin: "ジャマイカ",
    tag: "World",
    description: "店の看板メニュー。数種のスパイスに漬け込んだ鶏肉を、香ばしく焼き上げます。",
    photo: { src: "/photos/jerk-chicken.jpg", alt: "焼き目のついたジャークチキン" },
  },
  {
    id: "crepe-salee",
    name: "クレープ・サレ",
    en: "Crêpe Salée",
    origin: "南フランス",
    tag: "World",
    description: "南仏の家庭の味を再現。ハム・チーズ・卵を、生地からこだわったクレープで包みます。軽いのに満足感のある一品。",
  },
  {
    id: "ajillo",
    name: "アヒージョ",
    en: "Ajillo",
    origin: "スペイン",
    tag: "World",
    description: "オリーブオイルとにんにくで仕上げる、スペインの小皿料理。",
  },
  {
    id: "cheese-cracker",
    name: "カリカリチーズせんべい",
    en: "Crispy Cheese Cracker",
    origin: "オランダ × 博多",
    tag: "Hakata",
    fuda: ["カリカリ", "チーズせんべい"],
    description: "オランダ産チーズを焼き、明太子の風味を重ねたおつまみ。お酒と一緒に頼まれることの多い一品です。",
  },
  {
    id: "mentai-toast",
    name: "めんたいバタートースト",
    en: "Mentai Butter Toast",
    origin: "博多",
    tag: "Hakata",
    fuda: ["めんたい", "バタートースト"],
    description: "明太子とバターのトースト。〆や、軽い一品に。",
  },
  {
    id: "oden",
    name: "おでん",
    en: "Oden",
    origin: "博多",
    tag: "Hakata",
    description: "屋台らしさと遊び心を詰めた、El Bajon のおでん。",
  },
  {
    id: "tonkotsu-ramen",
    name: "豚骨ラーメン",
    en: "Tonkotsu Ramen",
    origin: "博多",
    tag: "Hakata",
    description: "世界を回って、最後は地元へ。博多の屋台らしい一杯。",
    photo: { src: "/photos/ramen.jpg", alt: "チャーシューと紅しょうがをのせた豚骨ラーメン" },
  },
  {
    id: "dessert-crepe",
    name: "デザートクレープ",
    en: "Dessert Crêpe",
    origin: "フランス",
    tag: "Sweets",
    fuda: ["デザート", "クレープ"],
    description: "食後の甘いものに。",
  },
];

export function categoryLabel(tag: string | null) {
  if (!tag) return "その他";
  return CATEGORIES.find((c) => c.tag === tag)?.label ?? tag;
}

export function yen(price: number) {
  return `¥${price.toLocaleString("ja-JP")}`;
}

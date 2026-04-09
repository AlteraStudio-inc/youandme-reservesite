export type MenuItem = {
  id: string;
  title: string;
  title_ja: string;
  description: string | null;
  tag: string | null;
  price: number | null;
  image_path: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
};

export type Reservation = {
  id: string;
  date: string;
  time: string;
  guest_count: number;
  name: string;
  phone: string;
  email: string;
  note: string | null;
  status: "pending" | "confirmed" | "rejected";
  created_at: string;
  updated_at: string;
};

export type ReservationInput = {
  date: string;
  time: string;
  guest_count: number;
  name: string;
  phone: string;
  email: string;
  note?: string;
};

export type MenuItemInput = {
  title: string;
  title_ja: string;
  description?: string;
  tag?: string;
  price?: number;
  image_path?: string;
  sort_order?: number;
  is_visible?: boolean;
};

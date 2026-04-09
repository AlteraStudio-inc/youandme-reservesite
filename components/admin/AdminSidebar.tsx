"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  {
    href: "/admin/reservations",
    label: "予約管理",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M2 7h14M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/admin/menu",
    label: "メニュー管理",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 5h12M3 9h12M3 13h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-3 left-3 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm"
        aria-label="メニュー"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          {mobileOpen ? (
            <path d="M5 5l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          ) : (
            <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          )}
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-56 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-14 flex items-center px-5 border-b border-gray-200 shrink-0">
          <Link href="/admin" className="text-[13px] font-bold text-gray-900">
            you&me curry
            <span className="text-[10px] font-normal text-gray-400 ml-1.5">管理画面</span>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className={active ? "text-green-600" : "text-gray-400"}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-2 text-[12px] text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            サイトに戻る
          </Link>
        </div>
      </aside>
    </>
  );
}

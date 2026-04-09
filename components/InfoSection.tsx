"use client";

import ScrollReveal from "./ScrollReveal";

/*
  Info section — dark theme for visual contrast
  Clean data presentation with accent details
*/

export default function InfoSection() {
  return (
    <section id="info" className="py-20 sm:py-32 md:py-44 bg-text-primary text-white">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-14">
        <ScrollReveal>
          <div className="flex items-baseline gap-4 sm:gap-6 mb-6">
            <span className="text-[11px] tracking-[0.2em] uppercase text-white/30">Information</span>
            <div className="w-12 h-px bg-brand-yellow rounded-full" />
          </div>
          <h2 className="text-[clamp(26px,5vw,56px)] font-black tracking-tight mb-14 sm:mb-20">
            店舗情報
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-xl sm:rounded-2xl overflow-hidden">
          {/* 営業情報 */}
          <ScrollReveal>
            <div className="bg-text-primary p-6 sm:p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-2 bg-brand-yellow rounded-full" />
                <h3 className="text-[14px] sm:text-[15px] font-bold tracking-wide">営業情報</h3>
              </div>
              <dl className="space-y-0">
                {[
                  ["営業時間", "18:00〜24:00/25:00"],
                  ["定休日", "火曜日"],
                  ["座席数", "約20席"],
                  ["貸切", "10名〜相談可"],
                  ["客単価", "¥3,000〜¥4,000"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex items-baseline justify-between py-3 border-b border-white/[0.06] last:border-0 text-[12px] sm:text-[13px] gap-3">
                    <dt className="text-white/35 shrink-0">{dt}</dt>
                    <dd className="font-medium text-white/80 text-right">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>

          {/* 決済方法 */}
          <ScrollReveal delay={0.1}>
            <div className="bg-text-primary p-6 sm:p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-2 bg-brand-green rounded-full" />
                <h3 className="text-[14px] sm:text-[15px] font-bold tracking-wide">決済方法</h3>
              </div>
              <dl className="space-y-0">
                {[
                  ["現金", "対応", true],
                  ["PayPay", "対応", true],
                  ["クレジットカード", "非対応", false],
                  ["電子マネー", "非対応", false],
                ].map(([dt, dd, active]) => (
                  <div key={dt as string} className="flex items-baseline justify-between py-3 border-b border-white/[0.06] last:border-0 text-[12px] sm:text-[13px] gap-3">
                    <dt className="text-white/35 shrink-0">{dt as string}</dt>
                    <dd className={`font-medium text-right ${active ? "text-white/80" : "text-white/20"}`}>{dd as string}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>

          {/* 予約 */}
          <ScrollReveal delay={0.2}>
            <div className="bg-text-primary p-6 sm:p-8 md:p-10 h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-2 bg-brand-green-light rounded-full" />
                <h3 className="text-[14px] sm:text-[15px] font-bold tracking-wide">ご予約</h3>
              </div>
              <dl className="space-y-0">
                {[
                  ["予約方法", "専用サイト/電話"],
                  ["飛び込み", "歓迎"],
                  ["人数", "1名〜20名"],
                  ["時間枠", "30分刻み"],
                  ["確定", "オーナー確認後"],
                  ["変更", "前日まで可"],
                  ["キャンセル", "電話連絡で無料"],
                ].map(([dt, dd]) => (
                  <div key={dt} className="flex items-baseline justify-between py-3 border-b border-white/[0.06] last:border-0 text-[12px] sm:text-[13px] gap-3">
                    <dt className="text-white/35 shrink-0">{dt}</dt>
                    <dd className="font-medium text-white/80 text-right">{dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

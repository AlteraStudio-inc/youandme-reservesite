"use client";

import { useState, useEffect, useCallback } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// 30分刻みの時間枠を生成 (18:00〜23:30)
const TIME_SLOTS = Array.from({ length: 12 }, (_, i) => {
  const hour = 18 + Math.floor(i / 2);
  const min = i % 2 === 0 ? "00" : "30";
  return `${hour}:${min}`;
});

// 今日からN日分の日付を生成
function getDateOptions(days: number) {
  const options: { value: string; label: string }[] = [];
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const value = d.toISOString().split("T")[0];
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const wd = weekdays[d.getDay()];
    const isTuesday = d.getDay() === 2;
    options.push({
      value,
      label: `${month}/${day}（${wd}）${isTuesday ? " 定休日" : ""}`,
    });
  }
  return options;
}

type Step = "form" | "confirm" | "done";

export default function ReservationModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const dateOptions = getDateOptions(30);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setErrors({});
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!date) errs.date = "日付を選択してください";
    if (!time) errs.time = "時間を選択してください";
    if (!name.trim()) errs.name = "お名前を入力してください";
    if (!phone.trim()) errs.phone = "電話番号を入力してください";
    if (!email.trim()) errs.email = "メールアドレスを入力してください";
    // Tuesday check
    if (date) {
      const d = new Date(date);
      if (d.getDay() === 2) errs.date = "火曜日は定休日です";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [date, time, name, phone, email]);

  const handleSubmit = () => {
    if (validate()) setStep("confirm");
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          guest_count: Number(guests),
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          note: note.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "予約の送信に失敗しました");
      }
      setStep("done");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "予約の送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedDateLabel = dateOptions.find((o) => o.value === date)?.label || "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full sm:max-w-[480px] max-h-[90dvh] sm:max-h-[85dvh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border shrink-0">
          <div>
            <h2 className="text-[16px] font-bold">
              {step === "form" && "ご予約"}
              {step === "confirm" && "予約内容の確認"}
              {step === "done" && "予約を受け付けました"}
            </h2>
            {step === "form" && (
              <p className="text-[11px] text-text-tertiary mt-0.5">you&me curry 夜営業</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-alt transition-colors"
            aria-label="閉じる"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 5l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* ===== STEP 1: Form ===== */}
          {step === "form" && (
            <div className="p-5 sm:p-6 space-y-5">
              {/* Date */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  日付 <span className="text-red-500">*</span>
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full h-11 px-3 rounded-lg border text-[14px] bg-white appearance-none ${errors.date ? "border-red-400" : "border-border"} focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-colors`}
                >
                  <option value="">日付を選択</option>
                  {dateOptions.map((o) => (
                    <option key={o.value} value={o.value} disabled={new Date(o.value).getDay() === 2}>
                      {o.label}
                    </option>
                  ))}
                </select>
                {errors.date && <p className="text-red-500 text-[11px] mt-1">{errors.date}</p>}
              </div>

              {/* Time */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  時間 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`h-10 rounded-lg text-[13px] font-medium border transition-all ${
                        time === t
                          ? "bg-brand-green-dark text-white border-brand-green-dark"
                          : "bg-white border-border text-text-secondary hover:border-brand-green hover:text-brand-green"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="text-red-500 text-[11px] mt-1">{errors.time}</p>}
              </div>

              {/* Guests */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  人数 <span className="text-red-500">*</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-border text-[14px] bg-white appearance-none focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-colors"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n}名
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full h-px bg-border" />

              {/* Name */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className={`w-full h-11 px-3 rounded-lg border text-[14px] ${errors.name ? "border-red-400" : "border-border"} focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-colors`}
                />
                {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="090-1234-5678"
                  className={`w-full h-11 px-3 rounded-lg border text-[14px] ${errors.phone ? "border-red-400" : "border-border"} focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-colors`}
                />
                {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className={`w-full h-11 px-3 rounded-lg border text-[14px] ${errors.email ? "border-red-400" : "border-border"} focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-colors`}
                />
                {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
              </div>

              {/* Note */}
              <div>
                <label className="block text-[12px] font-semibold text-text-secondary mb-1.5">
                  ご要望・備考 <span className="text-text-tertiary font-normal">（任意）</span>
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="アレルギーや席の希望など"
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-lg border border-border text-[14px] resize-none focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green/20 transition-colors"
                />
              </div>
            </div>
          )}

          {/* ===== STEP 2: Confirm ===== */}
          {step === "confirm" && (
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-[13px] text-text-secondary mb-2">以下の内容で予約をリクエストします。</p>
              <div className="bg-surface-alt rounded-xl p-4 sm:p-5 space-y-0">
                {[
                  ["日付", selectedDateLabel],
                  ["時間", time],
                  ["人数", `${guests}名`],
                  ["お名前", name],
                  ["電話番号", phone],
                  ["メール", email],
                  ...(note ? [["備考", note]] : []),
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0 text-[13px] gap-3">
                    <span className="text-text-tertiary shrink-0">{label}</span>
                    <span className="font-medium text-text-primary text-right">{val}</span>
                  </div>
                ))}
              </div>
              <div className="bg-brand-yellow-light/60 rounded-lg p-3 text-[12px] text-text-secondary leading-relaxed">
                <p>※ 予約はオーナー確認後に確定となります。</p>
                <p>※ 確定メールをお送りいたします。</p>
              </div>
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-[12px] text-red-600">
                  {submitError}
                </div>
              )}
            </div>
          )}

          {/* ===== STEP 3: Done ===== */}
          {step === "done" && (
            <div className="p-5 sm:p-6 text-center py-10 sm:py-14">
              <div className="w-14 h-14 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M8 14.5l4 4 8-9" stroke="#2D6A4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-[18px] font-bold mb-2">ありがとうございます</h3>
              <p className="text-text-secondary text-[13px] leading-relaxed max-w-xs mx-auto mb-6">
                予約リクエストを受け付けました。
                オーナー確認後、確定のご連絡をいたします。
              </p>
              <div className="bg-surface-alt rounded-xl p-4 text-[13px] text-text-secondary inline-block">
                <p>{selectedDateLabel} {time} ／ {guests}名</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 sm:px-6 py-4 border-t border-border shrink-0 bg-white">
          {step === "form" && (
            <button
              onClick={handleSubmit}
              className="w-full h-12 bg-brand-green-dark text-white text-[14px] font-bold rounded-xl hover:bg-brand-green transition-colors"
            >
              確認画面へ
            </button>
          )}
          {step === "confirm" && (
            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 h-12 border border-border text-text-secondary text-[14px] font-medium rounded-xl hover:bg-surface-alt transition-colors"
              >
                戻る
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-[2] h-12 bg-brand-yellow text-brand-green-dark text-[14px] font-bold rounded-xl hover:bg-brand-yellow-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送信中..." : "予約を確定する"}
              </button>
            </div>
          )}
          {step === "done" && (
            <button
              onClick={onClose}
              className="w-full h-12 bg-text-primary text-white text-[14px] font-bold rounded-xl hover:bg-text-secondary transition-colors"
            >
              閉じる
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

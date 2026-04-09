import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@youandme-curry.com";

export async function sendConfirmationEmail(reservation: {
  email: string;
  name: string;
  date: string;
  time: string;
  guest_count: number;
}) {
  await resend.emails.send({
    from: `you&me curry <${fromEmail}>`,
    to: reservation.email,
    subject: "【you&me curry】ご予約が確定しました",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2D6A4F;">ご予約確定のお知らせ</h2>
        <p>${reservation.name} 様</p>
        <p>ご予約が確定いたしました。</p>
        <div style="background: #f5f5f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>日付:</strong> ${reservation.date}</p>
          <p style="margin: 4px 0;"><strong>時間:</strong> ${reservation.time}</p>
          <p style="margin: 4px 0;"><strong>人数:</strong> ${reservation.guest_count}名</p>
        </div>
        <p>ご来店をお待ちしております。</p>
        <p>変更・キャンセルをご希望の場合は、前日までにお電話にてご連絡ください。</p>
        <p><strong>TEL: 092-600-9969</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">
          you&me curry<br/>
          福岡市中央区春吉2-17-1<br/>
          18:00〜24:00（金土〜25:00）<br/>
          火曜定休
        </p>
      </div>
    `,
  });
}

export async function sendRejectionEmail(reservation: {
  email: string;
  name: string;
  date: string;
  time: string;
  guest_count: number;
}) {
  await resend.emails.send({
    from: `you&me curry <${fromEmail}>`,
    to: reservation.email,
    subject: "【you&me curry】ご予約について",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2D6A4F;">ご予約について</h2>
        <p>${reservation.name} 様</p>
        <p>ご予約のリクエストをいただき、ありがとうございました。</p>
        <p>大変申し訳ございませんが、ご希望の日時でのご予約をお受けすることができませんでした。</p>
        <div style="background: #f5f5f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0;"><strong>日付:</strong> ${reservation.date}</p>
          <p style="margin: 4px 0;"><strong>時間:</strong> ${reservation.time}</p>
          <p style="margin: 4px 0;"><strong>人数:</strong> ${reservation.guest_count}名</p>
        </div>
        <p>別の日時でのご予約や、お電話でのご相談もお待ちしております。</p>
        <p><strong>TEL: 092-600-9969</strong></p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 24px 0;" />
        <p style="color: #888; font-size: 12px;">
          you&me curry<br/>
          福岡市中央区春吉2-17-1<br/>
          18:00〜24:00（金土〜25:00）<br/>
          火曜定休
        </p>
      </div>
    `,
  });
}

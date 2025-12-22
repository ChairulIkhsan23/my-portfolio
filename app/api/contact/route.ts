import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, message } = await req.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Pesan baru dari ${name}`,
      text: message,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; background-color: #f9fafb; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb;">
            
            <div style="background-color: #111827; padding: 16px 24px;">
                <h2 style="margin: 0; color: #ffffff; font-size: 18px;">
                Pesan Baru dari My Portfolio
                </h2>
            </div>

            <div style="padding: 24px;">
                <p style="margin: 0 0 12px; color: #374151; font-size: 14px;">
                Kamu menerima pesan baru melalui website portfolio.
                </p>

                <div style="margin-bottom: 16px;">
                <p style="margin: 0; color: #6b7280; font-size: 12px;">Nama Pengirim</p>
                <p style="margin: 4px 0 0; color: #111827; font-size: 14px; font-weight: 600;">
                    ${name}
                </p>
                </div>

                <div>
                <p style="margin: 0 0 6px; color: #6b7280; font-size: 12px;">Pesan</p>
                <div style="padding: 12px 16px; background-color: #f3f4f6; border-radius: 6px; color: #111827; font-size: 14px; line-height: 1.6;">
                    ${message}
                </div>
                </div>
            </div>

            <div style="padding: 16px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Dikirim otomatis dari form kontak website portfolio.
                </p>
            </div>

            </div>
        </div>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}

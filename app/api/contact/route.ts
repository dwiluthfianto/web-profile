import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, businessEmail, phoneNumber, companyName, subject, message } = body;

    // Validate required fields
    if (!name || !businessEmail || !phoneNumber || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // SMTP Configuration
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    // Check if SMTP is configured
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.warn("SMTP settings are not fully configured in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: smtpPort === "465", // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`, // Send on behalf of user using auth email to prevent spam filters
      to: "dwiluthfianto72@gmail.com",
      replyTo: businessEmail,
      subject: `[Contact Form] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Message Received</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #f9f9f9;
              color: #333333;
              margin: 0;
              padding: 24px;
            }
            .container {
              max-width: 600px;
              background-color: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 32px;
              margin: 0 auto;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            }
            .header {
              border-bottom: 2px solid #3b82f6;
              padding-bottom: 16px;
              margin-bottom: 24px;
            }
            .header h2 {
              margin: 0;
              color: #1e3a8a;
              font-size: 20px;
            }
            .header p {
              margin: 4px 0 0 0;
              font-size: 13px;
              color: #64748b;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 12px;
              margin-bottom: 24px;
            }
            @media (min-width: 480px) {
              .grid {
                grid-template-columns: 120px 1fr;
              }
            }
            .label {
              font-weight: 600;
              font-size: 13px;
              color: #64748b;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .value {
              font-size: 14px;
              color: #0f172a;
            }
            .message-box {
              background-color: #f8fafc;
              border-left: 4px solid #94a3b8;
              padding: 16px;
              margin-top: 24px;
              border-radius: 4px;
              white-space: pre-wrap;
              font-size: 14px;
              line-height: 1.6;
              color: #334155;
            }
            .footer {
              margin-top: 32px;
              padding-top: 16px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              font-size: 11px;
              color: #94a3b8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Pesan Baru Diterima</h2>
              <p>Seseorang mengirimkan pesan dari formulir kontak portofolio Anda.</p>
            </div>
            
            <div class="grid">
              <div class="label">Nama:</div>
              <div class="value">${name}</div>
              
              <div class="grid-item label">Email:</div>
              <div class="value"><a href="mailto:${businessEmail}">${businessEmail}</a></div>
              
              <div class="label">Telepon:</div>
              <div class="value">${phoneNumber}</div>
              
              <div class="label">Perusahaan:</div>
              <div class="value">${companyName || "N/A"}</div>
              
              <div class="label">Subjek:</div>
              <div class="value" style="font-weight: 600;">${subject}</div>
            </div>
            
            <div class="label">Pesan:</div>
            <div class="message-box">${message}</div>
            
            <div class="footer">
              Email dikirim otomatis dari Formulir Kontak Web Portofolio.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: any) {
    console.error("Error in email API handler:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}

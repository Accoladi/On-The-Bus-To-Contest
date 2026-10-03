import { NextResponse } from "next/server";
import { escapeHtml, validContact } from "@/lib/contact";

export async function POST(request: Request) {
  let fields: unknown;
  try { fields = await request.json(); } catch { return NextResponse.json({ error: "Please submit a valid contact form." }, { status: 400 }); }
  if (!validContact(fields)) return NextResponse.json({ error: "Please provide your name, a valid email, director status, and a message." }, { status: 400 });
  const webhookUrl = process.env.CONTACT_EMAIL_WEBHOOK_URL ?? process.env.EMAIL_WEBHOOK_URL;
  const secret = process.env.CONTACT_EMAIL_WEBHOOK_SECRET ?? process.env.EMAIL_WEBHOOK_SECRET;
  const recipient = process.env.CONTACT_TO_EMAIL;
  if (!webhookUrl || !recipient) return NextResponse.json({ error: "Messaging is temporarily unavailable. Please try again later." }, { status: 503 });
  const { name, school, email, message, bandDirector, interests } = fields;
  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(secret ? { "X-Email-Webhook-Secret": secret } : {}) },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        secret, type: "contact-form", to: recipient, replyTo: email,
        subject: `On the Bus to Contest: Message from ${name}`,
        html: `<h2>On the Bus to Contest — Contact Us</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>School:</strong> ${escapeHtml(school || "Not provided")}</p><p><strong>Band director:</strong> ${bandDirector}</p><p><strong>Interested in:</strong> ${escapeHtml(interests.join(", ") || "Not selected")}</p><p><strong>Message:</strong></p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        autoReply: { to: email, subject: "Thanks for reaching out to On the Bus to Contest", html: `<p>Hi ${escapeHtml(name)},</p><p>Thank you for reaching out to On the Bus to Contest. We received your message and will get back to you as soon as we can.</p><p>Best,<br />On the Bus to Contest</p>` },
        fields,
      }),
    });
    if (!response.ok) throw new Error("Webhook rejected contact request");
    const text = await response.text();
    if (text && (JSON.parse(text) as { success?: boolean }).success === false) throw new Error("Webhook could not send message");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Your message could not be sent. Please try again." }, { status: 502 });
  }
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Subscription from ${email}`,
    html: `<p>You have a new subscription:</p>
           <p><b>From:</b> ${email}&gt;</p>
           `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}

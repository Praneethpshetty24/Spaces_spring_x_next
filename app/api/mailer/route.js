import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Create transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const { email, name } = await request.json();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Spaces! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <h1 style="color: #6366f1;">Welcome to Spaces! 🎉✨</h1>
          <p>Hey ${name || 'there'} 👋</p>
          <p>We're super excited to have you join our amazing community! 🌟</p>
          <p>Here are some cool things you can do to get started: 🚀</p>
          <ul style="list-style: none; padding-left: 0;">
          
            <li>🔍 Explore the awesome features of our platform</li>
            <li>🤝 Connect with other fantastic members</li>
            <li>💡 Share your ideas and get inspired</li>
          </ul>
          <p>Need any help? We're here for you! 💪</p>
          <p style="margin-top: 20px;">Best wishes,<br>The Spaces Team 💫</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Welcome email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send welcome email' },
      { status: 500 }
    );
  }
}

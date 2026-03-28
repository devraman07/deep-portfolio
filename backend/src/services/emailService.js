import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class EmailService {
  constructor() {
    console.log('🔧 EmailService initializing...');
    console.log('📧 EMAIL_USER loaded:', process.env.EMAIL_USER ? '✅ Yes' : '❌ No');
    console.log('🔑 EMAIL_PASS loaded:', process.env.EMAIL_PASS ? '✅ Yes (length: ' + process.env.EMAIL_PASS.length + ')' : '❌ No');

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('❌ CRITICAL: Missing email credentials in environment variables!');
      console.error('   Make sure .env file exists with EMAIL_USER and EMAIL_PASS');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify transporter configuration
    this.verifyTransporter();
  }

  async verifyTransporter() {
    try {
      console.log('🔍 Verifying email transporter...');
      await this.transporter.verify();
      console.log('✅ Email transporter verified successfully! Ready to send emails.');
    } catch (error) {
      console.error('❌ Email transporter verification failed:', error.message);
      console.error('   Common fixes:');
      console.error('   1. Use Gmail App Password (not regular password)');
      console.error('   2. Enable 2-factor authentication on Gmail');
      console.error('   3. Generate app password at https://myaccount.google.com/apppasswords');
      console.error('   4. Ensure EMAIL_PASS has no spaces or quotes in .env file');
    }
  }

  async sendContactEmail({ name, email, message }) {
    try {
      console.log('📤 Preparing to send contact email...');
      console.log('   From:', email);
      console.log('   To:', process.env.EMAIL_USER);
      console.log('   Name:', name);
      
      // Email to portfolio owner
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Contact: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Message
            </h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 10px 0;"><strong>Message:</strong></p>
              <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
            <p style="color: #666; font-size: 12px; text-align: center;">
              Sent from portfolio contact form
            </p>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Contact email sent successfully!');
      console.log('   Message ID:', info.messageId);
      console.log('   Response:', info.response);
      return info;
    } catch (error) {
      console.error('❌ Error sending contact email:', error.message);
      console.error('   Full error:', error);
      throw new Error(`Failed to send contact email: ${error.message}`);
    }
  }

  async sendAutoReplyEmail({ name, email }) {
    try {
      console.log('📤 Preparing to send auto-reply email to:', email);
      
      const mailOptions = {
        from: `"Dipayan Maiti" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Thanks for reaching out!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Thank You for Contacting Me!
            </h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p>Hi <strong>${name}</strong>,</p>
              <p>I've received your message and will get back to you soon.</p>
              <p>Thank you for taking the time to reach out. I appreciate your interest in my work and will respond as soon as possible.</p>
              <p>Best regards,<br>Dipayan Maiti</p>
            </div>
            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #666; font-size: 12px;">
                This is an automated message. Please do not reply to this email.
              </p>
            </div>
          </div>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('✅ Auto-reply email sent successfully!');
      console.log('   Message ID:', info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Error sending auto-reply email:', error.message);
      console.error('   This is non-critical - contact email was still sent');
      // Don't throw error for auto-reply, just log it
    }
  }
}

const emailService = new EmailService();
export default emailService;

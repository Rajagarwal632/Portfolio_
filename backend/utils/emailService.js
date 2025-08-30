import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send contact form email
export const sendContactEmail = async ({ name, email, subject, message, contactId }) => {
  try {
    const transporter = createTransporter();

    // Email to admin (you)
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || 'raj390504@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1e293b;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="background-color: #e2e8f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #64748b;">
              <strong>Contact ID:</strong> ${contactId}<br>
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            This email was automatically generated from your portfolio contact form.
          </p>
        </div>
      `
    };

    // Auto-reply to sender
    const autoReplyOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for contacting me through my portfolio website. I've received your message about "${subject}" and I'll get back to you as soon as possible.</p>
          
          <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
            <p style="margin: 0;"><strong>Your message:</strong></p>
            <p style="margin: 10px 0 0 0; font-style: italic;">"${message.substring(0, 150)}${message.length > 150 ? '...' : ''}"</p>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://github.com/Rajagarwal632" style="color: #3b82f6;">GitHub profile</a></li>
            <li>Connect with me on <a href="https://linkedin.com/in/raj-agarwal-b04563255" style="color: #3b82f6;">LinkedIn</a></li>
            <li>Explore my projects and blog posts on my website</li>
          </ul>
          
          <p>Best regards,<br>
          <strong>Raj Agarwal</strong><br>
          CSE Core Student</p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="color: #64748b; font-size: 14px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(autoReplyOptions)
    ]);

    console.log('Contact emails sent successfully');
    return true;

  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

// Send newsletter subscription email
export const sendNewsletterEmail = async (email) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to my newsletter!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Welcome to my newsletter!</h2>
          
          <p>Thank you for subscribing to my blog updates. You'll be the first to know when I publish new content about:</p>
          
          <ul>
            <li>Web Development tutorials and tips</li>
            <li>My learning journey and experiences</li>
            <li>Project insights and behind-the-scenes</li>
            <li>Career growth and opportunities</li>
          </ul>
          
          <p>Stay tuned for exciting content!</p>
          
          <p>Best regards,<br>
          <strong>Raj Agarwal</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Newsletter email sent successfully');
    return true;

  } catch (error) {
    console.error('Newsletter email error:', error);
    throw error;
  }
};

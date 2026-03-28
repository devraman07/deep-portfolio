import emailService from '../services/emailService.js';

const contactController = async (req, res) => {
  try {
    console.log('\n📨 ========== NEW CONTACT FORM SUBMISSION ==========');
    console.log('🕐 Timestamp:', new Date().toISOString());
    console.log('📍 IP Address:', req.ip);
    console.log('🔍 Request Body:', JSON.stringify(req.body, null, 2));

    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, and message are required',
      });
    }

    console.log('✅ All required fields present');
    console.log('🚀 Starting email sending process...');

    // Send email to portfolio owner
    console.log('\n📧 Step 1: Sending contact email to owner...');
    await emailService.sendContactEmail({ name, email, message });
    console.log('✅ Contact email sent successfully');

    // Send auto-reply to user
    console.log('\n📧 Step 2: Sending auto-reply to user...');
    await emailService.sendAutoReplyEmail({ name, email });
    console.log('✅ Auto-reply sent successfully');

    console.log('\n🎉 ========== CONTACT FORM PROCESSED SUCCESSFULLY ==========');
    console.log('   User Email:', email);
    console.log('   Timestamp:', new Date().toISOString());

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! You will receive a confirmation email shortly.',
    });
  } catch (error) {
    console.error('\n❌ ========== CONTACT FORM ERROR ==========');
    console.error('Error Type:', error.name);
    console.error('Error Message:', error.message);
    console.error('Stack Trace:', error.stack);
    console.error('========================================\n');
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export default contactController;

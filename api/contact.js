export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    // Development fallback if no API key is provided
    console.warn('No RESEND_API_KEY found. Simulating successful email send.', { name, email, subject, message });
    return res.status(200).json({ success: true, simulated: true });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>', // Should be updated to a verified domain in production
        to: ['contact@soullovenearth.com'], // Replace with actual destination
        reply_to: email,
        subject: `New Contact Form Submission: ${subject || 'General Inquiry'}`,
        html: `
          <h3>New Message from ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to send email');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact Form Error:', error.message);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
}

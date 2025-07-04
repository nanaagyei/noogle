import { NextResponse } from "next/server";

// Export the POST method handler as a named export
export async function POST(req) {
  const { email, subject, message, cc, bcc } = await req.json();

  // Server-side only environment variables for Web3Forms
  const WEB3FORMS_API_URL = process.env.WEB3FORMS_API_URL;
  const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY;

  if (!WEB3FORMS_API_KEY) {
    return NextResponse.json(
      { message: "Web3Forms API key not configured" },
      { status: 500 }
    );
  }

  // Prepare form data for Web3Forms
  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_API_KEY);
  formData.append('name', email); // Using email as name field
  formData.append('email', email);
  formData.append('subject', subject);
  formData.append('message', message);
  
  // Add CC and BCC if provided
  if (cc) {
    formData.append('cc', cc);
  }
  if (bcc) {
    formData.append('bcc', bcc);
  }

  // Honeypot spam protection
  formData.append('botcheck', '');

  try {
    // Send form data to Web3Forms
    const response = await fetch(WEB3FORMS_API_URL || 'https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      // Email sent successfully
      return NextResponse.json(
        { status: "success", message: "Email sent successfully!", data: result },
        { status: 200 }
      );
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while sending the email",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

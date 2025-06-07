import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";  // Import NextResponse

// Export the POST method handler as a named export
export async function POST(req) {
  const { email, subject, message, cc, bcc } = await req.json();

  // Server-side only environment variables (no NEXT_PUBLIC prefix for security)
  const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
  const AWS_ACCESS_KEY_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
  const AWS_REGION = process.env.AWS_REGION;


  if (!AWS_ACCESS_KEY || !AWS_ACCESS_KEY_SECRET) {
    return NextResponse.json(
      { message: "AWS credentials not configured" },
      { status: 500 }
    );
  }

  let sesClient = null;

  try {
    sesClient = new SESClient({
      region: AWS_REGION, 
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_ACCESS_KEY_SECRET,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error connecting to SES", error: error.message },
      { status: 500 }
    );
  }

  // Prepare email params
  const params = {
    Source: "prince.agyei.tuffour@gmail.com", // Verified email address in AWS SES
    Destination: {
      ToAddresses: ["prince.agyei.tuffour@gmail.com"], // Replace with your dynamic recipient if needed
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: `
            <h3>New Contact Form Submission</h3>
            <p><strong>From:</strong> ${email}</p>
            ${cc ? `<p><strong>CC:</strong> ${cc}</p>` : ''}
            ${bcc ? `<p><strong>BCC:</strong> ${bcc}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>`,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    // Send email using AWS SES
    const command = new SendEmailCommand(params);
    const data = await sesClient.send(command);
    // Email sent successfully
    return NextResponse.json(
      { status: "success", message: "Email sent successfully!", data },
      { status: 200 }
    );
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

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextResponse } from "next/server";  // Import NextResponse

// Export the POST method handler as a named export
export async function POST(req) {
  const { email, subject, message, cc, bcc } = await req.json();

  // Corrected environment variable names for non-public access
  const AWS_ACCESS_KEY = process.env.NEXT_PULIC_AWS_ACCESS_KEY;
  const AWS_ACCESS_KEY_SECRET = process.env.NEXT_PUBLIC_AWS_SECRET;

  console.log(AWS_ACCESS_KEY, AWS_ACCESS_KEY_SECRET)

  let sesClient = null;

  try {
    sesClient = new SESClient({
      region: "us-east-1", 
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
    Source: "rumezaft@gmail.com", // Verified email address in AWS SES
    Destination: {
      ToAddresses: ["rumezaft@gmail.com"], // Replace with your dynamic recipient if needed
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: `
            <li>Return email(s): ${email} ${cc} ${bcc}</li>
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

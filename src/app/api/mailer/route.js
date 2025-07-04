import { NextResponse } from "next/server";
import { headers } from 'next/headers';
import { SECURITY_CONFIG } from '../../../config/security.js';
import DOMPurify from 'isomorphic-dompurify';

async function validateCSRFToken(request) {
  const headersList = await headers();
  const origin = headersList.get('origin');
  const referer = headersList.get('referer');
  
  if (!origin && !referer) {
    return false;
  }
  
  if (origin && origin === process.env.NEXT_PUBLIC_SITE_URL) {
    return true;
  }
  
  if (origin && SECURITY_CONFIG.trustedDomains.some(domain => origin.includes(domain))) {
    const originUrl = new URL(origin);
    if (SECURITY_CONFIG.trustedDomains.some(domain => originUrl.hostname === domain || originUrl.hostname.endsWith('.' + domain))) {
     return true;
   }
  }
  
  if (referer && SECURITY_CONFIG.trustedDomains.some(domain => referer.includes(domain))) {
    const refererUrl = new URL(referer);
    if (SECURITY_CONFIG.trustedDomains.some(domain => refererUrl.hostname === domain || refererUrl.hostname.endsWith('.' + domain))) {
      return true;
    }
  }
  
  return false;
}

function sanitizeInput(input) {
  return DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], 
    ALLOWED_ATTR: [] 
  }).trim();
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req) {
  if (!(await validateCSRFToken(req))) {


  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const { email, subject, message, cc, bcc } = body;

  const WEB3FORMS_API_URL = process.env.WEB3FORMS_API_URL;
  const WEB3FORMS_API_KEY = process.env.WEB3FORMS_API_KEY;

  if (!WEB3FORMS_API_KEY) {
    return NextResponse.json(
      { message: "Web3Forms API key not configured" },
      { status: 500 }
    );
  }

  if (!email || !subject || !message) {
    return NextResponse.json(
      { message: "Email, subject, and message are required" },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  const { maxEmailLength, maxSubjectLength, maxMessageLength } = SECURITY_CONFIG.validation;
  if (email.length > maxEmailLength || subject.length > maxSubjectLength || message.length > maxMessageLength) {
    return NextResponse.json(
      { message: "Input fields exceed maximum length" },
      { status: 400 }
    );
  }

  const sanitizedEmail = sanitizeInput(email);
  const sanitizedSubject = sanitizeInput(subject);
  const sanitizedMessage = sanitizeInput(message);
  const sanitizedCC = cc ? sanitizeInput(cc) : '';
  const sanitizedBCC = bcc ? sanitizeInput(bcc) : '';

  if (sanitizedCC && !validateEmail(sanitizedCC)) {
    return NextResponse.json(
      { message: "Invalid CC email format" },
      { status: 400 }
    );
  }

  if (sanitizedBCC && !validateEmail(sanitizedBCC)) {
    return NextResponse.json(
      { message: "Invalid BCC email format" },
      { status: 400 }
    );
  }

  const formData = new FormData();
  formData.append('access_key', WEB3FORMS_API_KEY);
  formData.append('name', 'Contact Form');
  formData.append('email', sanitizedEmail);
  formData.append('subject', sanitizedSubject);
  formData.append('message', sanitizedMessage);
  

    formData.append('cc', sanitizedCC);
  }
  if (sanitizedBCC) {
    formData.append('bcc', sanitizedBCC);
  }

  formData.append('website', '');

  try {
    const response = await fetch(WEB3FORMS_API_URL || 'https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return NextResponse.json(
        { status: "success", message: "Email sent successfully!", data: result },
        { 
          status: 200,
          headers: SECURITY_CONFIG.securityHeaders
        }
      );
    } else {
      throw new Error(result.message || 'Failed to send email');
    }
  } catch (error) {
    console.error("Mailer API error:", error.message);
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

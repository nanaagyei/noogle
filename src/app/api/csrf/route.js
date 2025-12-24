import { NextResponse } from 'next/server';
import { generateCSRFToken, storeCSRFToken, SECURITY_CONFIG } from '../../../config/security.js';

export async function GET() {
  try {
    const token = generateCSRFToken();
    storeCSRFToken(token);
    
    return NextResponse.json(
      { token },
      { 
        status: 200,
        headers: SECURITY_CONFIG.securityHeaders
      }
    );
  } catch (error) {
    console.error('CSRF token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { 
        status: 500,
        headers: SECURITY_CONFIG.securityHeaders
      }
    );
  }
} 
import { NextResponse } from 'next/server';
import { RateLimiter, getClientIP, createRateLimitResponse } from './lib/rateLimit.js';
import { SECURITY_CONFIG } from './config/security.js';

const rateLimiter = new RateLimiter();

setInterval(() => {
  rateLimiter.cleanup();
}, SECURITY_CONFIG.rateLimit.cleanupInterval);

// Move cleanup to be triggered periodically during requests
let lastCleanup = 0;

function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup > SECURITY_CONFIG.rateLimit.cleanupInterval) {
    rateLimiter.cleanup();
    lastCleanup = now;
  }
}

export async function middleware(request) {
  if (request.nextUrl.pathname === '/api/mailer') {
    const clientIP = getClientIP(request);
    const rateLimitInfo = await rateLimiter.isRateLimited(clientIP);
    
    if (rateLimitInfo.limited) {
      return createRateLimitResponse(rateLimitInfo);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/mailer',
}; 
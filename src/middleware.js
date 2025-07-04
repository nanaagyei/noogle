import { NextResponse } from 'next/server';
import { RateLimiter, getClientIP, createRateLimitResponse } from './lib/rateLimit.js';
import { SECURITY_CONFIG } from './config/security.js';

const rateLimiter = new RateLimiter();

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
    maybeCleanup();
    const clientIP = getClientIP(request);
    try {
      const rateLimitInfo = await rateLimiter.isRateLimited(clientIP);
      
      if (rateLimitInfo.limited) {
        return createRateLimitResponse(rateLimitInfo);
      }
    } catch (error) {
      console.error('Rate limiter error:', error);
      // Allow the request to proceed on error to avoid blocking legitimate users
      return NextResponse.next();
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/mailer',
}; 
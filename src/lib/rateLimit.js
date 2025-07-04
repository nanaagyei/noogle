import { NextResponse } from 'next/server';
import { SECURITY_CONFIG } from '../config/security.js';

const rateLimitStore = new Map();
const { windowMs, maxRequests } = SECURITY_CONFIG.rateLimit;

export class RateLimiter {
  constructor() {
    this.store = rateLimitStore;
    this.window = windowMs;
    this.maxRequests = maxRequests;
  }

  async isRateLimited(identifier) {
    const now = Date.now();
    const windowStart = now - this.window;
    
    if (!this.store.has(identifier)) {
      this.store.set(identifier, []);
    }
    
    const requests = this.store.get(identifier);
    const validRequests = requests.filter(timestamp => timestamp > windowStart);
    this.store.set(identifier, validRequests);
    
    if (validRequests.length >= this.maxRequests) {
      return {
        limited: true,
        remaining: 0,
        resetTime: windowStart + this.window
      };
    }
    
    validRequests.push(now);
    this.store.set(identifier, validRequests);
    
    return {
      limited: false,
      remaining: this.maxRequests - validRequests.length,
      resetTime: windowStart + this.window
    };
  }

  async cleanup() {
    const now = Date.now();
    const windowStart = now - this.window;
    
    for (const [identifier, requests] of this.store.entries()) {
      const validRequests = requests.filter(timestamp => timestamp > windowStart);
      if (validRequests.length === 0) {
        this.store.delete(identifier);
      } else {
        this.store.set(identifier, validRequests);
      }
    }
  }
}

export function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return '127.0.0.1';
}

export function createRateLimitResponse(rateLimitInfo) {
  return NextResponse.json(
    { 
      error: 'Rate limit exceeded', 
      message: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000)
    },
    { 
      status: 429,
      headers: {
        'Retry-After': Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000).toString(),
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': rateLimitInfo.remaining.toString(),
        'X-RateLimit-Reset': rateLimitInfo.resetTime.toString()
      }
    }
  );
} 
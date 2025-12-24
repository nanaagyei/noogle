import crypto from 'crypto';

export const SECURITY_CONFIG = {
  rateLimit: {
    windowMs: 60 * 1000,
    maxRequests: 5,
    cleanupInterval: 5 * 60 * 1000
  },
  
  validation: {
    maxEmailLength: 254,
    maxSubjectLength: 200,
    maxMessageLength: 5000
  },
  
  trustedDomains: [
    process.env.NEXT_PUBLIC_SITE_URL,
    'localhost:3000',
    '127.0.0.1:3000'
  ].filter(Boolean),
  
  securityHeaders: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  },

  // CSRF token configuration
  csrf: {
    tokenLength: 32,
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    tokenStore: new Map() // In-memory token store
  }
};

// CSRF token management
export function generateCSRFToken() {
  return crypto.randomBytes(SECURITY_CONFIG.csrf.tokenLength).toString('hex');
}

export function storeCSRFToken(token) {
  const expiry = Date.now() + SECURITY_CONFIG.csrf.tokenExpiry;
  SECURITY_CONFIG.csrf.tokenStore.set(token, expiry);
  return token;
}

export function validateCSRFToken(token) {
  if (!token) return false;
  
  const expiry = SECURITY_CONFIG.csrf.tokenStore.get(token);
  if (!expiry || Date.now() > expiry) {
    SECURITY_CONFIG.csrf.tokenStore.delete(token);
    return false;
  }
  
  return true;
}

export function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, expiry] of SECURITY_CONFIG.csrf.tokenStore.entries()) {
    if (now > expiry) {
      SECURITY_CONFIG.csrf.tokenStore.delete(token);
    }
  }
} 
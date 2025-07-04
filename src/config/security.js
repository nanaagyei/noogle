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
  }
}; 
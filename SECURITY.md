# Security Features for Mailer API

This document outlines the security measures implemented for the `/api/mailer` endpoint.

## Rate Limiting

### Implementation

- **Window**: 1 minute sliding window
- **Limit**: 5 requests per IP address per minute
- **Storage**: In-memory for development and small-scale production
- **Free alternatives**: File-based, JSON storage, or SQLite for persistence

### Features

- IP-based rate limiting using multiple header sources
- Automatic cleanup of expired entries
- Proper HTTP 429 responses with retry headers
- No external dependencies or paid services required

### Headers Returned

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp
- `Retry-After`: Seconds until retry is allowed

## CSRF Protection

### Implementation

- Origin and Referer header validation
- Trusted domain whitelist
- Blocks requests without proper origin/referer headers

### Trusted Domains

- Same origin requests
- Localhost development environment
- Configurable via `NEXT_PUBLIC_SITE_URL` environment variable

## Input Validation & Sanitization

### Validation

- Required field validation (email, subject, message)
- Email format validation using regex
- CC/BCC email validation
- Input length limits (email: 254 chars, subject: 200 chars, message: 5000 chars)

### Sanitization

- HTML script tag removal
- JavaScript protocol removal
- Event handler attribute removal
- Input trimming

## Security Headers

### Response Headers

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Environment Variables

### Required

```env
WEB3FORMS_API_URL=https://api.web3forms.com/submit
WEB3FORMS_API_KEY=your_access_key_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Free Rate Limiting Options

### 1. In-Memory (Current Implementation)

- **Pros**: Fast, no external dependencies, works immediately
- **Cons**: Resets on server restart, not shared across multiple instances
- **Best for**: Single server deployments, development, small-scale production

### 2. File-Based Storage

- **Pros**: Persistent across restarts, no external services
- **Cons**: File I/O overhead, not suitable for high concurrency
- **Best for**: Small to medium applications

### 3. SQLite Database

- **Pros**: Persistent, ACID compliant, no external dependencies
- **Cons**: File-based, not suitable for distributed systems
- **Best for**: Single-server applications with persistence needs

### 4. Free Cloud Options

- **Vercel KV** (free tier): 100MB storage, 100 requests/day
- **PlanetScale** (free tier): 1GB storage, 1 billion reads/month
- **Supabase** (free tier): 500MB database, 50,000 monthly active users

## Production Considerations

### For Small to Medium Scale

The current in-memory implementation is sufficient for most use cases. It's:

- ✅ Free
- ✅ Fast
- ✅ Simple to maintain
- ✅ No external dependencies

### For Larger Scale

If you need distributed rate limiting, consider these free options:

1. **Vercel KV** (if using Vercel):

```bash
npm install @vercel/kv
```

2. **PlanetScale** (MySQL-compatible):

```bash
npm install @planetscale/database
```

3. **Supabase** (PostgreSQL):

```bash
npm install @supabase/supabase-js
```

### Additional Security Measures

- Consider implementing CAPTCHA for additional spam protection
- Monitor and log suspicious activity
- Regular security audits
- Keep dependencies updated

## Error Handling

### Rate Limit Exceeded

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

### CSRF Protection

```json
{
  "error": "CSRF protection",
  "message": "Invalid request origin"
}
```

### Validation Errors

```json
{
  "message": "Email, subject, and message are required"
}
```

## Testing

### Rate Limiting Test

```bash
# Test rate limiting (should fail after 5 requests in 1 minute)
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/mailer \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","subject":"Test","message":"Test"}'
done
```

### CSRF Test

```bash
# Test CSRF protection (should fail)
curl -X POST http://localhost:3000/api/mailer \
  -H "Content-Type: application/json" \
  -H "Origin: https://malicious-site.com" \
  -d '{"email":"test@example.com","subject":"Test","message":"Test"}'
```

## Performance Notes

### In-Memory Rate Limiting

- **Memory usage**: ~1KB per IP address
- **Cleanup**: Automatic every 5 minutes
- **Concurrency**: Thread-safe with Map operations
- **Scalability**: Works well for up to 10,000 concurrent users

### When to Upgrade

Consider upgrading to a persistent solution when:

- You have multiple server instances
- You need rate limiting to persist across restarts
- You expect more than 10,000 concurrent users
- You need analytics on rate limiting data

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

### Security Improvements

✅ **Fixed Vulnerability**: Rate limit reset time calculation has been corrected. Reset time is now calculated as `now + this.window` instead of `validRequests[0] + this.window`, ensuring accurate retry-after headers and proper rate limiting behavior.

### Headers Returned

- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset timestamp
- `Retry-After`: Seconds until retry is allowed

## CSRF Protection

### Implementation

- **Token-based CSRF protection** with cryptographically secure token generation
- **Server-side token validation** with expiration handling
- **Origin and Referer header validation** as additional security layer
- **Automatic token cleanup** to prevent memory leaks
- **Frontend integration** with automatic token fetching and header inclusion

### Security Features

✅ **Fixed Vulnerabilities**:

1. **Strong Token Validation**: Cryptographically secure tokens generated using Node.js crypto module
2. **Token Expiration**: 24-hour token expiry with automatic cleanup
3. **Server-side Token Store**: In-memory token storage with proper validation
4. **Frontend Integration**: Automatic token fetching and header inclusion
5. **Additional Origin Validation**: Maintains origin/referer validation as extra security layer

### Token Flow

1. **Token Generation**: `/api/csrf` endpoint generates secure tokens
2. **Token Storage**: Server stores tokens with 24-hour expiration
3. **Frontend Fetching**: Mailer component automatically fetches token on mount
4. **Request Validation**: All requests include `X-CSRF-Token` header
5. **Server Validation**: Server validates token existence and expiration
6. **Automatic Cleanup**: Expired tokens are automatically removed

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

### Security Improvements

✅ **Fixed Vulnerability**: Security headers are now applied to ALL responses (200, 400, 403, 500) ensuring consistent security protection across all API responses.

## API Endpoints

### CSRF Token Endpoint

- **URL**: `/api/csrf`
- **Method**: GET
- **Purpose**: Generate cryptographically secure CSRF tokens
- **Response**: `{ token: "hex-string" }`
- **Security**: Includes all security headers

### Mailer Endpoint

- **URL**: `/api/mailer`
- **Method**: POST
- **Headers Required**: `X-CSRF-Token`
- **Purpose**: Send emails via Web3Forms
- **Security**: Validates CSRF token and applies security headers

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
# Test CSRF protection (should fail without token)
curl -X POST http://localhost:3000/api/mailer \
  -H "Content-Type: application/json" \
  -H "Origin: https://malicious-site.com" \
  -d '{"email":"test@example.com","subject":"Test","message":"Test"}'

# Test CSRF protection (should fail with invalid token)
curl -X POST http://localhost:3000/api/mailer \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: invalid-token" \
  -d '{"email":"test@example.com","subject":"Test","message":"Test"}'

# Test CSRF token generation
curl -X GET http://localhost:3000/api/csrf
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

import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import * as cookie from 'cookie';

const client = createStorefrontApiClient({
    storeDomain: process.env.VITE_SHOPIFY_STORE_DOMAIN,
    apiVersion: '2025-10',
    publicAccessToken: process.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
});

// Basic in-memory rate limiter per serverless instance
// Note: In a highly distributed environment, this only rate limits per instance.
// A global solution like Upstash Redis would be better for production scale.
const rateLimitMap = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query, variables } = req.body;
  const cookies = cookie.parse(req.headers.cookie || '');
  let token = cookies.sle_customer_token;

  // Rate limiting for auth mutations
  const isAuth = query && (query.includes('customerAccessTokenCreate') || query.includes('customerCreate'));
  if (isAuth) {
    const ip = req.headers['x-forwarded-for'] || '127.0.0.1';
    const now = Date.now();
    const windowMs = 30 * 1000; // 30 seconds
    const maxRequests = 5;
    
    const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };
    if (now > record.resetAt) {
      record.count = 1;
      record.resetAt = now + windowMs;
    } else {
      record.count += 1;
    }
    rateLimitMap.set(ip, record);

    if (record.count > maxRequests) {
      return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
    }
  }

  // Inject token if requested via SERVER_INJECT
  if (variables && variables.customerAccessToken === 'SERVER_INJECT') {
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No active session' });
    }
    variables.customerAccessToken = token;
  }

  try {
    const { data, errors } = await client.request(query, { variables });
    
    // Intercept successful login
    if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      const newToken = data.customerAccessTokenCreate.customerAccessToken.accessToken;
      const expires = data.customerAccessTokenCreate.customerAccessToken.expiresAt;
      
      res.setHeader('Set-Cookie', cookie.serialize('sle_customer_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(expires)
      }));

      // Mask token from client
      data.customerAccessTokenCreate.customerAccessToken.accessToken = 'HIDDEN_SERVER_MANAGED';
    }

    // Intercept logout
    if (data?.customerAccessTokenDelete?.deletedAccessToken) {
      res.setHeader('Set-Cookie', cookie.serialize('sle_customer_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        expires: new Date(0) // Expire immediately
      }));
    }

    res.status(200).json({ data, errors });
  } catch (error) {
    console.error('Proxy Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}

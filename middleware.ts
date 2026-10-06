import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map<string, { count: number; timestamp: number }>();

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  const now = Date.now();

  const userLimit = rateLimit.get(ip) || { count: 0, timestamp: now };

  if (now - userLimit.timestamp > WINDOW_MS) {
    userLimit.count = 0;
    userLimit.timestamp = now;
  }

  userLimit.count++;
  rateLimit.set(ip, userLimit);

  if (userLimit.count > MAX_REQUESTS) {
    return NextResponse.json(
      {
        success: false,
        error: 'Too many requests. Please try again later.',
      },
      { status: 429 }
    );
  }

  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
  response.headers.set('X-RateLimit-Remaining', Math.max(0, MAX_REQUESTS - userLimit.count).toString());
  response.headers.set('X-RateLimit-Reset', (userLimit.timestamp + WINDOW_MS).toString());

  return response;
}

export const config = {
  matcher: '/api/:path*',
};

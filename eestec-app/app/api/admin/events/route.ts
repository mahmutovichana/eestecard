import { NextRequest, NextResponse } from 'next/server';
import { verify } from '@/lib/auth';

// Middleware to check admin auth
export async function verifyAdminToken(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return null;
  }

  const payload = await verify(token);
  return payload;
}

// Example: GET /api/admin/events
export async function GET(req: NextRequest) {
  const auth = await verifyAdminToken(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Return mock events
  return NextResponse.json([
    {
      id: '1',
      title: 'IoT Workshop',
      description: 'Learn about IoT',
      date: '2024-02-15',
      time: '18:00',
      location: 'Faculty',
      registeredCount: 45,
    },
  ]);
}

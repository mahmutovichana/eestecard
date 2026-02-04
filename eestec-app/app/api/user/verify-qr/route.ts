import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // TODO: Verify QR code from database/Google Sheets
    const qrCode = req.nextUrl.searchParams.get('code');

    // Decode and verify
    return NextResponse.json({
      valid: true,
      memberName: 'Member Name',
      studentId: 'EESTEC-2024-001',
      memberSince: '2024-01-15',
      registrations: [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid QR code' },
      { status: 400 }
    );
  }
}

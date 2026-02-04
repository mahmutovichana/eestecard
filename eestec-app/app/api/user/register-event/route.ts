import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { memberId, eventId } = await req.json();

    // TODO: Add to Google Sheets registrations
    // Save to Members sheet -> RegisteredEvents column
    
    return NextResponse.json({
      success: true,
      message: 'Registered for event successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register for event' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, description, date, time, location, capacity } = await req.json();

    // TODO: Save to Google Sheets or database
    // const result = await appendToSheet('Events', [
    //   [title, description, date, time, location, capacity || '']
    // ]);

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    // TODO: Fetch specific event from Google Sheets
    return NextResponse.json({
      id: eventId,
      title: 'Event Title',
      description: 'Event Description',
      date: '2024-02-15',
      time: '18:00',
      location: 'Location',
      registeredCount: 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;
    const data = await req.json();

    // TODO: Update event in Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Event updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    // TODO: Delete event from Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getAllEvents, createEvent, deleteEvent, updateEvent, getEventById } from '@/lib/db/events';
import type { Event } from '@/lib/types';

// GET /api/admin/events - Get all events
export async function GET(req: NextRequest) {
  const auth = await verifyAdminToken(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const events = await getAllEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/admin/events - Create new event
export async function POST(req: NextRequest) {
  const auth = await verifyAdminToken(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, location' },
        { status: 400 }
      );
    }

    const newEvent = await createEvent({
      title: body.title,
      description: body.description,
      date: body.date || '',
      endDate: body.endDate || null,
      time: body.time || null,
      location: body.location,
      capacity: body.capacity || 100,
      registeredCount: 0,
      imageUrl: body.imageUrl || null,
      websiteUrl: body.websiteUrl || null,
      registrationFormUrl: body.registrationFormUrl || null,
      isSingleDay: body.isSingleDay !== false,
      participantCount: body.participantCount || null,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/events/[id] - Update event
export async function PUT(req: NextRequest) {
  const auth = await verifyAdminToken(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const eventId = body.id;

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID required' },
        { status: 400 }
      );
    }

    const updatedEvent = await updateEvent(eventId, {
      title: body.title,
      description: body.description,
      date: body.date,
      endDate: body.endDate || null,
      time: body.time || null,
      location: body.location,
      capacity: body.capacity,
      imageUrl: body.imageUrl,
      websiteUrl: body.websiteUrl,
      registrationFormUrl: body.registrationFormUrl,
      isSingleDay: body.isSingleDay,
      participantCount: body.participantCount,
    });

    if (!updatedEvent) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/events/[id] - Delete event
export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminToken(req);
  
  if (!auth) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json(
        { error: 'Event ID required' },
        { status: 400 }
      );
    }

    const success = await deleteEvent(eventId);
    if (!success) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

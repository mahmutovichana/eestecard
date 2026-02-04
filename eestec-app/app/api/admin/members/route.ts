import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch members
export async function GET(req: NextRequest) {
  try {
    // TODO: Fetch from Google Sheets
    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}

// POST - Register new member
export async function POST(req: NextRequest) {
  try {
    const memberData = await req.json();

    // TODO: Save to Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Member registered successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to register member' },
      { status: 500 }
    );
  }
}

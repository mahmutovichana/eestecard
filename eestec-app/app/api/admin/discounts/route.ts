import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch discounts
export async function GET(req: NextRequest) {
  try {
    // TODO: Fetch from Google Sheets
    return NextResponse.json([
      {
        id: '1',
        title: 'Coffee Paradise',
        description: '20% off',
        percentage: 20,
        location: 'Baščaršija',
        category: 'food',
      },
    ]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch discounts' },
      { status: 500 }
    );
  }
}

// POST - Create discount
export async function POST(req: NextRequest) {
  try {
    const { title, description, percentage, location, category, expiryDate } = await req.json();

    // TODO: Save to Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Discount created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create discount' },
      { status: 500 }
    );
  }
}

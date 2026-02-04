import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // TODO: Fetch config from Google Sheets Config sheet
    return NextResponse.json({
      address: 'Zmaja od Bosne bb, Sarajevo',
      emails: ['cp@eestec-sa.ba', 'board@eestec-sa.ba'],
      phones: ['+387 33 123 456'],
      googleMapsUrl: 'https://maps.google.com/...',
      linktreeUrl: 'https://linktr.ee/eestec_sarajevo',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // TODO: Update config in Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

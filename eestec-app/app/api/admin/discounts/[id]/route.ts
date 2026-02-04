import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discountId = params.id;

    // TODO: Fetch specific discount from Google Sheets
    return NextResponse.json({
      id: discountId,
      title: 'Discount Title',
      percentage: 20,
      location: 'Location',
      category: 'food',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch discount' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discountId = params.id;
    const data = await req.json();

    // TODO: Update discount in Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Discount updated successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update discount' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const discountId = params.id;

    // TODO: Delete discount from Google Sheets
    return NextResponse.json({
      success: true,
      message: 'Discount deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete discount' },
      { status: 500 }
    );
  }
}

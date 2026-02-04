import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';
import { getAllDiscounts, createDiscount, updateDiscount, deleteDiscount } from '@/lib/db/discounts';
import type { Discount } from '@/lib/types';

// GET /api/admin/discounts - Get all discounts
export async function GET(req: NextRequest) {
  try {
    const discounts = await getAllDiscounts();
    return NextResponse.json(discounts);
  } catch (error) {
    console.error('Error fetching discounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discounts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/discounts - Create new discount
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
    if (!body.title || !body.description || !body.partnerName || !body.discountPercentage || !body.validUntil) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newDiscount = await createDiscount({
      title: body.title,
      description: body.description,
      partnerName: body.partnerName,
      discountPercentage: body.discountPercentage,
      discountDescription: body.discountDescription || undefined,
      category: body.category || 'other',
      imageUrl: body.imageUrl || undefined,
      logoUrl: body.logoUrl || undefined,
      validFrom: body.validFrom || undefined,
      validUntil: body.validUntil,
      terms: body.terms || undefined,
      qrCodeUrl: body.qrCodeUrl || undefined,
    });

    return NextResponse.json(newDiscount, { status: 201 });
  } catch (error) {
    console.error('Error creating discount:', error);
    return NextResponse.json(
      { error: 'Failed to create discount' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/discounts - Update discount
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
    const discountId = body.id;

    if (!discountId) {
      return NextResponse.json(
        { error: 'Discount ID required' },
        { status: 400 }
      );
    }

    const updatedDiscount = await updateDiscount(discountId, body);

    if (!updatedDiscount) {
      return NextResponse.json(
        { error: 'Discount not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDiscount);
  } catch (error) {
    console.error('Error updating discount:', error);
    return NextResponse.json(
      { error: 'Failed to update discount' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/discounts - Delete discount
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
    const discountId = searchParams.get('id');

    if (!discountId) {
      return NextResponse.json(
        { error: 'Discount ID required' },
        { status: 400 }
      );
    }

    const success = await deleteDiscount(discountId);
    if (!success) {
      return NextResponse.json(
        { error: 'Discount not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting discount:', error);
    return NextResponse.json(
      { error: 'Failed to delete discount' },
    );
  }
}

import { query } from './postgres';
import type { Discount } from '@/lib/types';

// GET ALL DISCOUNTS
export async function getAllDiscounts(): Promise<Discount[]> {
  const result = await query(
    `SELECT 
      id, title, description, partner_name as "partnerName",
      discount_percentage as "discountPercentage", discount_description as "discountDescription",
      category, image_url as "imageUrl", logo_url as "logoUrl",
      valid_from as "validFrom", valid_until as "validUntil",
      terms, qr_code_url as "qrCodeUrl", redemption_count as "redemptionCount",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM discounts
    ORDER BY valid_until DESC`
  );

  return result.rows.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    partnerName: row.partnerName,
    discountPercentage: row.discountPercentage,
    discountDescription: row.discountDescription,
    category: row.category,
    imageUrl: row.imageUrl,
    logoUrl: row.logoUrl,
    validFrom: row.validFrom,
    validUntil: row.validUntil,
    terms: row.terms,
    qrCodeUrl: row.qrCodeUrl,
    redemptionCount: row.redemptionCount,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }));
}

// GET DISCOUNT BY ID
export async function getDiscountById(id: string): Promise<Discount | null> {
  const result = await query(
    `SELECT 
      id, title, description, partner_name as "partnerName",
      discount_percentage as "discountPercentage", discount_description as "discountDescription",
      category, image_url as "imageUrl", logo_url as "logoUrl",
      valid_from as "validFrom", valid_until as "validUntil",
      terms, qr_code_url as "qrCodeUrl", redemption_count as "redemptionCount",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM discounts WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    partnerName: row.partnerName,
    discountPercentage: row.discountPercentage,
    discountDescription: row.discountDescription,
    category: row.category,
    imageUrl: row.imageUrl,
    logoUrl: row.logoUrl,
    validFrom: row.validFrom,
    validUntil: row.validUntil,
    terms: row.terms,
    qrCodeUrl: row.qrCodeUrl,
    redemptionCount: row.redemptionCount,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// GET DISCOUNTS BY CATEGORY
export async function getDiscountsByCategory(category: string): Promise<Discount[]> {
  const result = await query(
    `SELECT 
      id, title, description, partner_name as "partnerName",
      discount_percentage as "discountPercentage", discount_description as "discountDescription",
      category, image_url as "imageUrl", logo_url as "logoUrl",
      valid_from as "validFrom", valid_until as "validUntil",
      terms, qr_code_url as "qrCodeUrl", redemption_count as "redemptionCount",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM discounts WHERE category = $1 ORDER BY valid_until DESC`,
    [category]
  );

  return result.rows.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    partnerName: row.partnerName,
    discountPercentage: row.discountPercentage,
    discountDescription: row.discountDescription,
    category: row.category,
    imageUrl: row.imageUrl,
    logoUrl: row.logoUrl,
    validFrom: row.validFrom,
    validUntil: row.validUntil,
    terms: row.terms,
    qrCodeUrl: row.qrCodeUrl,
    redemptionCount: row.redemptionCount,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }));
}

// CREATE DISCOUNT
export async function createDiscount(data: {
  title: string;
  description: string;
  partnerName: string;
  discountPercentage: number;
  discountDescription?: string;
  category: string;
  imageUrl?: string;
  logoUrl?: string;
  validFrom?: string;
  validUntil: string;
  terms?: string;
  qrCodeUrl?: string;
}): Promise<Discount> {
  const result = await query(
    `INSERT INTO discounts (
      title, description, partner_name, discount_percentage, discount_description,
      category, image_url, logo_url, valid_from, valid_until, terms, qr_code_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *`,
    [
      data.title,
      data.description,
      data.partnerName,
      data.discountPercentage,
      data.discountDescription || null,
      data.category,
      data.imageUrl || null,
      data.logoUrl || null,
      data.validFrom || null,
      data.validUntil,
      data.terms || null,
      data.qrCodeUrl || null,
    ]
  );

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    partnerName: row.partner_name,
    discountPercentage: row.discount_percentage,
    discountDescription: row.discount_description,
    category: row.category,
    imageUrl: row.image_url,
    logoUrl: row.logo_url,
    validFrom: row.valid_from,
    validUntil: row.valid_until,
    terms: row.terms,
    qrCodeUrl: row.qr_code_url,
    redemptionCount: row.redemption_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// UPDATE DISCOUNT
export async function updateDiscount(
  id: string,
  data: Partial<Discount>
): Promise<Discount | null> {
  const updates: string[] = [];
  const values: unknown[] = [id];
  let paramCount = 2;

  const fieldsMap: Record<string, string> = {
    title: 'title',
    description: 'description',
    partnerName: 'partner_name',
    discountPercentage: 'discount_percentage',
    discountDescription: 'discount_description',
    category: 'category',
    imageUrl: 'image_url',
    logoUrl: 'logo_url',
    validFrom: 'valid_from',
    validUntil: 'valid_until',
    terms: 'terms',
    qrCodeUrl: 'qr_code_url',
  };

  for (const [key, dbField] of Object.entries(fieldsMap)) {
    if (key in data && data[key as keyof Discount] !== undefined) {
      updates.push(`${dbField} = $${paramCount}`);
      values.push(data[key as keyof Discount]);
      paramCount++;
    }
  }

  if (updates.length === 0) {
    return getDiscountById(id);
  }

  values.push(new Date().toISOString());
  updates.push(`updated_at = $${paramCount}`);

  const result = await query(
    `UPDATE discounts SET ${updates.join(', ')} WHERE id = $1 RETURNING *`,
    values
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    partnerName: row.partner_name,
    discountPercentage: row.discount_percentage,
    discountDescription: row.discount_description,
    category: row.category,
    imageUrl: row.image_url,
    logoUrl: row.logo_url,
    validFrom: row.valid_from,
    validUntil: row.valid_until,
    terms: row.terms,
    qrCodeUrl: row.qr_code_url,
    redemptionCount: row.redemption_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// DELETE DISCOUNT
export async function deleteDiscount(id: string): Promise<boolean> {
  const result = await query('DELETE FROM discounts WHERE id = $1', [id]);
  return result.rowCount !== null && result.rowCount > 0;
}

// INCREMENT REDEMPTION COUNT
export async function incrementRedemptionCount(id: string): Promise<boolean> {
  const result = await query(
    'UPDATE discounts SET redemption_count = redemption_count + 1 WHERE id = $1',
    [id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

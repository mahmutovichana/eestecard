import { query } from './postgres';
import type { Event } from '@/lib/types';

// GET ALL EVENTS
export async function getAllEvents(): Promise<Event[]> {
  const result = await query(
    `SELECT 
      id, title, description, date, end_date as "endDate", time, location,
      image_url as "imageUrl", participant_count as "participantCount",
      capacity, is_single_day as "isSingleDay", duration,
      registration_form_url as "registrationFormUrl",
      website_url as "websiteUrl", registered_count as "registeredCount",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM events
    ORDER BY date DESC`
  );

  return result.rows.map((row: any) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    endDate: row.endDate,
    time: row.time,
    location: row.location,
    imageUrl: row.imageUrl,
    participantCount: row.participantCount,
    capacity: row.capacity,
    isSingleDay: row.isSingleDay,
    duration: row.duration,
    registrationFormUrl: row.registrationFormUrl,
    websiteUrl: row.websiteUrl,
    registeredCount: row.registeredCount,
    image: row.imageUrl,
  }));
}

// GET EVENT BY ID
export async function getEventById(id: string): Promise<Event | null> {
  const result = await query(
    `SELECT 
      id, title, description, date, end_date as "endDate", time, location,
      image_url as "imageUrl", participant_count as "participantCount",
      capacity, is_single_day as "isSingleDay", duration,
      registration_form_url as "registrationFormUrl",
      website_url as "websiteUrl", registered_count as "registeredCount",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM events WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    endDate: row.endDate,
    time: row.time,
    location: row.location,
    imageUrl: row.imageUrl,
    participantCount: row.participantCount,
    capacity: row.capacity,
    isSingleDay: row.isSingleDay,
    duration: row.duration,
    registrationFormUrl: row.registrationFormUrl,
    websiteUrl: row.websiteUrl,
    registeredCount: row.registeredCount,
    image: row.imageUrl,
  };
}

// CREATE EVENT
export async function createEvent(data: {
  title: string;
  description: string;
  date: string;
  endDate?: string | null;
  time?: string | null;
  location: string;
  imageUrl?: string | null;
  registeredCount?: number;
  participantCount?: number | null;
  capacity?: number;
  isSingleDay?: boolean;
  duration?: string | null;
  registrationFormUrl?: string | null;
  websiteUrl?: string | null;
}): Promise<Event> {
  const result = await query(
    `INSERT INTO events (
      title, description, date, end_date, time, location,
      image_url, participant_count, capacity, is_single_day,
      duration, registration_form_url, website_url
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *`,
    [
      data.title,
      data.description,
      data.date,
      data.endDate || null,
      data.time || null,
      data.location,
      data.imageUrl || null,
      data.participantCount || 0,
      data.capacity || 100,
      data.isSingleDay !== false,
      data.duration || null,
      data.registrationFormUrl || null,
      data.websiteUrl || null,
    ]
  );

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    endDate: row.end_date,
    time: row.time,
    location: row.location,
    imageUrl: row.image_url,
    participantCount: row.participant_count,
    capacity: row.capacity,
    isSingleDay: row.is_single_day,
    duration: row.duration,
    registrationFormUrl: row.registration_form_url,
    websiteUrl: row.website_url,
    registeredCount: row.registered_count,
    image: row.image_url,
  };
}

// UPDATE EVENT
export async function updateEvent(
  id: string,
  data: Partial<Event>
): Promise<Event | null> {
  const updates: string[] = [];
  const values: unknown[] = [id];
  let paramCount = 2;

  const fieldsMap: Record<string, string> = {
    title: 'title',
    description: 'description',
    date: 'date',
    endDate: 'end_date',
    time: 'time',
    location: 'location',
    imageUrl: 'image_url',
    image: 'image_url',
    participantCount: 'participant_count',
    capacity: 'capacity',
    isSingleDay: 'is_single_day',
    duration: 'duration',
    registrationFormUrl: 'registration_form_url',
    websiteUrl: 'website_url',
    registeredCount: 'registered_count',
  };

  for (const [key, dbField] of Object.entries(fieldsMap)) {
    if (key in data && data[key as keyof Event] !== undefined) {
      updates.push(`${dbField} = $${paramCount}`);
      values.push(data[key as keyof Event]);
      paramCount++;
    }
  }

  if (updates.length === 0) {
    return getEventById(id);
  }

  values.push(new Date().toISOString());
  updates.push(`updated_at = $${paramCount}`);

  const result = await query(
    `UPDATE events SET ${updates.join(', ')} WHERE id = $1 RETURNING *`,
    values
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    endDate: row.end_date,
    time: row.time,
    location: row.location,
    imageUrl: row.image_url,
    participantCount: row.participant_count,
    capacity: row.capacity,
    isSingleDay: row.is_single_day,
    duration: row.duration,
    registrationFormUrl: row.registration_form_url,
    websiteUrl: row.website_url,
    registeredCount: row.registered_count,
    image: row.image_url,
  };
}

// DELETE EVENT
export async function deleteEvent(id: string): Promise<boolean> {
  const result = await query('DELETE FROM events WHERE id = $1', [id]);
  return result.rowCount !== null && result.rowCount > 0;
}

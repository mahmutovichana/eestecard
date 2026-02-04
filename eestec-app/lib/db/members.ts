import { query } from './postgres';
import type { Member } from '@/lib/types';

// GET ALL MEMBERS
export async function getAllMembers(): Promise<Member[]> {
  const result = await query(
    `SELECT 
      id, full_name as "fullName", email, student_id as "studentId", phone,
      position, status, join_date as "joinDate", registered_events as "registeredEvents",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM members
    ORDER BY created_at DESC`
  );

  return result.rows.map((row: any) => ({
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    studentId: row.studentId,
    phone: row.phone,
    position: row.position,
    status: row.status,
    joinDate: row.joinDate,
    registeredEvents: row.registeredEvents || [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }));
}

// GET MEMBER BY ID
export async function getMemberById(id: string): Promise<Member | null> {
  const result = await query(
    `SELECT 
      id, full_name as "fullName", email, student_id as "studentId", phone,
      position, status, join_date as "joinDate", registered_events as "registeredEvents",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM members WHERE id = $1`,
    [id]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    studentId: row.studentId,
    phone: row.phone,
    position: row.position,
    status: row.status,
    joinDate: row.joinDate,
    registeredEvents: row.registeredEvents || [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// GET MEMBER BY EMAIL
export async function getMemberByEmail(email: string): Promise<Member | null> {
  const result = await query(
    `SELECT 
      id, full_name as "fullName", email, student_id as "studentId", phone,
      position, status, join_date as "joinDate", registered_events as "registeredEvents",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM members WHERE email = $1`,
    [email]
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    studentId: row.studentId,
    phone: row.phone,
    position: row.position,
    status: row.status,
    joinDate: row.joinDate,
    registeredEvents: row.registeredEvents || [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// CREATE MEMBER
export async function createMember(data: {
  fullName: string;
  email: string;
  studentId: string;
  phone?: string;
  position?: string;
  status?: string;
}): Promise<Member> {
  const result = await query(
    `INSERT INTO members (
      full_name, email, student_id, phone, position, status
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      data.fullName,
      data.email,
      data.studentId,
      data.phone || null,
      data.position || null,
      data.status || 'active',
    ]
  );

  const row = result.rows[0];
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    studentId: row.student_id,
    phone: row.phone,
    position: row.position,
    status: row.status,
    joinDate: row.join_date,
    registeredEvents: row.registered_events || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// UPDATE MEMBER
export async function updateMember(
  id: string,
  data: Partial<Member>
): Promise<Member | null> {
  const updates: string[] = [];
  const values: unknown[] = [id];
  let paramCount = 2;

  const fieldsMap: Record<string, string> = {
    fullName: 'full_name',
    email: 'email',
    studentId: 'student_id',
    phone: 'phone',
    position: 'position',
    status: 'status',
  };

  for (const [key, dbField] of Object.entries(fieldsMap)) {
    if (key in data && data[key as keyof Member] !== undefined) {
      updates.push(`${dbField} = $${paramCount}`);
      values.push(data[key as keyof Member]);
      paramCount++;
    }
  }

  if (updates.length === 0) {
    return getMemberById(id);
  }

  values.push(new Date().toISOString());
  updates.push(`updated_at = $${paramCount}`);

  const result = await query(
    `UPDATE members SET ${updates.join(', ')} WHERE id = $1 RETURNING *`,
    values
  );

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    studentId: row.student_id,
    phone: row.phone,
    position: row.position,
    status: row.status,
    joinDate: row.join_date,
    registeredEvents: row.registered_events || [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// DELETE MEMBER
export async function deleteMember(id: string): Promise<boolean> {
  const result = await query('DELETE FROM members WHERE id = $1', [id]);
  return result.rowCount !== null && result.rowCount > 0;
}

// ADD EVENT TO MEMBER'S REGISTERED EVENTS
export async function addEventToMember(memberId: string, eventId: string): Promise<boolean> {
  const result = await query(
    `UPDATE members SET registered_events = array_append(registered_events, $2::uuid) 
     WHERE id = $1 AND NOT ($2::uuid = ANY(registered_events))`,
    [memberId, eventId]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

import { Pool, QueryResult } from 'pg';

// Kreiram connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Helper za queries
export async function query(text: string, params?: unknown[]): Promise<QueryResult> {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export { pool };

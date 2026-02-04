import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: process.env.GOOGLE_SHEETS_API_KEY,
});

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID || '';

export async function getSheetData(sheetName: string, range: string = 'A:Z') {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!${range}`,
    });

    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
}

export async function appendToSheet(
  sheetName: string,
  values: (string | number | boolean)[][]
) {
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return true;
  } catch (error) {
    console.error('Error appending to Google Sheets:', error);
    return false;
  }
}

export async function updateSheet(
  sheetName: string,
  range: string,
  values: (string | number | boolean)[][]
) {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!${range}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating Google Sheets:', error);
    return false;
  }
}

// Helper: Convert sheet rows to objects
export function sheetRowsToObjects<T>(
  rows: (string | number | boolean)[][],
  headerRow: number = 0
): T[] {
  if (rows.length <= headerRow) return [];

  const headers = rows[headerRow] as string[];
  return rows.slice(headerRow + 1).map((row) => {
    const obj: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      obj[header] = row[index] || '';
    });
    return obj as T;
  });
}

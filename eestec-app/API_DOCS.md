# API Documentation

Dokumentacija svih dostupnih API endpoints-a.

## Authentication

Svi admin endpoints zahtevaju JWT token. Prosleđi kao header:
```
Authorization: Bearer <token>
```

## User Endpoints

### GET /api/user/verify-qr
Verifikuj QR kod

**Query Parameters:**
- `code: string` - QR kod data

**Response:**
```json
{
  "valid": true,
  "memberName": "John Doe",
  "studentId": "EESTEC-2024-001",
  "memberSince": "2024-01-15",
  "registrations": ["event-1", "event-2"]
}
```

### POST /api/user/register-event
Registruj se za događaj

**Body:**
```json
{
  "memberId": "EESTEC-2024-001",
  "eventId": "event-1"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registered for event successfully"
}
```

## Admin Endpoints

### POST /api/admin/login
Prijaviš se kao admin

**Body:**
```json
{
  "email": "admin@eestec-sa.ba",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Events

#### GET /api/admin/events
Preuzmi sve događaje

**Response:**
```json
[
  {
    "id": "event-1",
    "title": "IoT Workshop",
    "description": "Learn IoT",
    "date": "2024-02-15",
    "time": "18:00",
    "location": "Faculty",
    "registeredCount": 45,
    "capacity": 100
  }
]
```

#### POST /api/admin/events
Kreiraj novi događaj

**Body:**
```json
{
  "title": "Event Title",
  "description": "Event description",
  "date": "2024-02-15",
  "time": "18:00",
  "location": "Venue",
  "capacity": 100
}
```

#### PUT /api/admin/events/[id]
Ažuriraj događaj

**Body:** Isto kao POST

#### DELETE /api/admin/events/[id]
Obriši događaj

### Discounts

#### GET /api/admin/discounts
Preuzmi sve popuste

**Response:**
```json
[
  {
    "id": "discount-1",
    "title": "Coffee Paradise",
    "description": "20% off",
    "percentage": 20,
    "location": "Baščaršija",
    "category": "food",
    "expiryDate": "2024-12-31"
  }
]
```

#### POST /api/admin/discounts
Kreiraj novi popust

**Body:**
```json
{
  "title": "Discount Title",
  "description": "Discount description",
  "percentage": 20,
  "location": "Business Name",
  "category": "food",
  "expiryDate": "2024-12-31"
}
```

#### PUT /api/admin/discounts/[id]
Ažuriraj popust

#### DELETE /api/admin/discounts/[id]
Obriši popust

### Members

#### GET /api/admin/members
Preuzmi sve članove (iz Google Sheets)

**Response:**
```json
[
  {
    "id": "member-1",
    "name": "John Doe",
    "email": "john@example.com",
    "studentId": "EESTEC-2024-001",
    "phone": "+387 61 123 456",
    "joinDate": "2024-01-15",
    "status": "active",
    "registeredEvents": ["event-1", "event-2"]
  }
]
```

#### POST /api/admin/members
Registruj novog člana

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "studentId": "EESTEC-2024-001",
  "phone": "+387 61 123 456"
}
```

### Settings

#### GET /api/admin/settings
Preuzmi konfiguraciju (adresa, kontakt, itd)

**Response:**
```json
{
  "address": "Zmaja od Bosne bb, Sarajevo",
  "emails": ["cp@eestec-sa.ba", "board@eestec-sa.ba"],
  "phones": ["+387 33 123 456"],
  "googleMapsUrl": "https://...",
  "linktreeUrl": "https://linktr.ee/eestec_sarajevo"
}
```

#### POST /api/admin/settings
Ažuriraj konfiguraciju

**Body:**
```json
{
  "address": "New Address",
  "emails": ["email@example.com"],
  "phones": ["+387 33 123 456"],
  "googleMapsUrl": "https://...",
  "linktreeUrl": "https://..."
}
```

## Error Codes

| Code | Poruka | Značenje |
|------|--------|----------|
| 200 | OK | Uspešan zahtev |
| 201 | Created | Kreiran novi resurs |
| 400 | Bad Request | Nevalidan zahtev |
| 401 | Unauthorized | Nemaš pristupa |
| 404 | Not Found | Resurs nije nađen |
| 500 | Server Error | Greška na serveru |

## Rate Limiting

- Google Sheets API: 500 requests per 100 sekundi
- Custom APIs: Nema limitacije (trebalo bi dodati)

## Response Format

Svi odgovori su JSON:

**Uspešan odgovor:**
```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

**Neuspešan odgovor:**
```json
{
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

## Example - cURL

### Login
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eestec-sa.ba","password":"password123"}'
```

### Get Events
```bash
curl -X GET http://localhost:3000/api/admin/events \
  -H "Authorization: Bearer <token>"
```

### Create Event
```bash
curl -X POST http://localhost:3000/api/admin/events \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Workshop",
    "description":"Learn",
    "date":"2024-02-15",
    "time":"18:00",
    "location":"Faculty"
  }'
```

---

Za više informacija, videti README.md ili GOOGLE_SHEETS_SETUP.md

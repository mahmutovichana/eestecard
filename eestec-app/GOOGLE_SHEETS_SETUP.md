# Google Sheets Integration Guide

Ova aplikacija koristi Google Sheets kao bazu podataka za članove, događaje i popuste.

## Setup Koraci

### 1. Kreiraj Google Sheets fajl

1. Idi na [Google Sheets](https://sheets.google.com)
2. Kreiraj novi fajl "EESTEC LC Sarajevo"
3. Kreiraj sledeće sheet-e sa zaglavljima:

#### Sheet 1: `Members`
```
Name | Email | StudentId | Phone | JoinDate | Status | QRCode
```

Primer reda:
```
Marko Marković | marko@example.com | EESTEC-2024-001 | +387 61 123 456 | 2024-01-15 | active | data:image/png;base64,...
```

#### Sheet 2: `Events`
```
Title | Description | Date | Time | Location | Capacity | RegisteredCount | Image
```

Primer reda:
```
IoT Workshop | Learn IoT | 2024-02-15 | 18:00 | Faculty of Engineering | 100 | 45 | https://...
```

#### Sheet 3: `Discounts`
```
Title | Description | Percentage | Location | Category | ExpiryDate | Image | Logo
```

Primer reda:
```
Coffee Paradise | 20% off beverages | 20 | Baščaršija | food | 2024-12-31 | https://... | https://...
```

#### Sheet 4: `Config`
```
Key | Value
Address | Zmaja od Bosne bb, Sarajevo
Email1 | cp@eestec-sa.ba
Email2 | board@eestec-sa.ba
Phone1 | +387 33 123 456
Phone2 | +387 61 123 456
GoogleMapsUrl | https://www.google.com/maps/place/...
LinktreeUrl | https://linktr.ee/eestec_sarajevo
```

### 2. Kreiraj Google Service Account

1. Idi na [Google Cloud Console](https://console.cloud.google.com)
2. Kreiraj novi projekt "EESTEC"
3. Aktiviraj Google Sheets API
4. Kreiraj Service Account:
   - Go to "Service Accounts"
   - Click "Create Service Account"
   - Popuni podatke
   - Kreiraj JSON key
5. Kopiraj:
   - `private_key`
   - `client_email`
   - `project_id`

### 3. Deli Google Sheets fajl

1. Otvori Google Sheets fajl
2. Klikni "Share"
3. Dodaj email od Service Account-a (`client_email`)
4. Daj pristup "Editor"

### 4. Postavi .env.local

U root folderu `eestec-app/.env.local`:

```env
# Google Sheets
NEXT_PUBLIC_GOOGLE_SHEETS_ID=1a2b3c4d5e6f7g8h9i0j (copy iz URL-a)
GOOGLE_SHEETS_API_KEY=YOUR_API_KEY_HERE
GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQE...\n-----END PRIVATE KEY-----\n"

# Admin Auth
ADMIN_SECRET_KEY=very-secret-key-change-this
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Testiraj Konekciju

Pokreni aplikaciju:
```bash
npm run dev
```

Admin panel bi trebalo da učita članove iz Google Sheets.

## API Endpoints

### Fetch Members
```typescript
GET /api/admin/members
Response: Member[]
```

### Fetch Events
```typescript
GET /api/admin/events
Response: Event[]
```

### Fetch Discounts
```typescript
GET /api/admin/discounts
Response: Discount[]
```

### Create Event
```typescript
POST /api/admin/events
Body: {
  title: string,
  description: string,
  date: string,
  time: string,
  location: string,
  capacity?: number
}
```

### Update Settings
```typescript
POST /api/admin/settings
Body: {
  address: string,
  emails: string[],
  phones: string[],
  googleMapsUrl: string,
  linktreeUrl: string
}
```

## Google Sheets API Limit

- Besplatan plan: 500 requests per 100 sekundi
- Za proizvodnju razmotri caching strategiju

## Troubleshooting

### "Unauthorized" greška
- Proveri da li je Service Account email dodan kao editor u Google Sheets
- Proveri `GOOGLE_SHEETS_ID` u .env.local

### "Not Found" greška
- Proveri da li su sheet imena ispravna (case-sensitive)
- Proveri da li Google Sheets ID je ispravan

### Spora učitavanja
- Google Sheets API je malo sporiji
- Razmotri caching u iduće verzije
- Koristi Redis ili Vercel KV

## Security Best Practices

- ❌ Nikad ne commitaj `private_key` u Git
- ✅ Koristi `.env.local` za lokalne varijable
- ✅ Postavi environment varijable u Vercel dashboard za production
- ✅ Rotiraj Service Account ključ redovno

## Next Steps

- [ ] Testiraj sa pravim podacima
- [ ] Postavi admin kredencijale
- [ ] Testiraj QR kod generisanje
- [ ] Konfiguruj Google Maps API
- [ ] Postavi Linktree URL

# EESTEC LC Sarajevo - Member Card & Event Management App

Moderna web aplikacija za upravljanje članskim karticama, događajima, popustima i profilima članova EESTEC LC Sarajevo.

## Karakteristike

### 🎫 Člansku Karticu
- QR kod za skeniranje
- NFC tag podrška
- Preuzimanje kartice
- Mobilna optimizacija

### 👥 Profil Članova
- Automatska integracija sa Google Sheets
- Pregled osobnih podataka
- Prikaz registrovanih događaja
- Jednostavna administracija

### 📅 Upravljanje Događajima
- Admin panel za kreiranje/uređivanje događaja
- Prikaz svih događaja na user stranici
- Registracija za događaje
- Kapacitet i brojač učesnika

### 🏷️ Popusti
- Upravljanje popustima po kategorijama
- Partner lokacije i logotipi
- Pretraga i filtriranje
- Datumi isteka

### 📍 Lokacija & Info
- Prikaz adrese i kontakta
- Google Maps integracija
- Linktree podrška
- Social media linkovi

## Tehnički Stack

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS + SF Pro Display font
- **Database**: Google Sheets API
- **Authentication**: JWT (jose)
- **QR Codes**: qrcode.react
- **Icons**: Lucide React

## Instalacija

### Preduslov
- Node.js 18+
- npm ili yarn
- Google Sheets API key (za integraciju podataka)

### Setup Koraci

1. **Instalacija dependencija**
```bash
cd eestec-app
npm install
```

2. **Google Sheets Setup**
   - Kreiraj Google Sheets fajl sa sledećim sheet-ima:
     - `Members` (Name, Email, StudentId, Phone, etc.)
     - `Events` (Title, Description, Date, Time, Location, Capacity)
     - `Discounts` (Title, Description, Percentage, Location, Category)
   - Generiši API key ili service account credencijale
   - Dodaj u `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_SHEETS_ID=YOUR_SPREADSHEET_ID
   GOOGLE_SHEETS_API_KEY=YOUR_API_KEY
   ```

3. **Admin Kredencijali**
   - Pretvori lozinku sa bcryptjs:
   ```javascript
   const bcrypt = require('bcryptjs');
   const hash = bcrypt.hashSync('tvoja_lozinka', 10);
   console.log(hash);
   ```
   - Ažuriraj `ADMIN_CREDENTIALS` u `app/api/admin/login/route.ts`

4. **Pokretanje Dev Servera**
```bash
npm run dev
```
Otvori [http://localhost:3000/user](http://localhost:3000/user) za user stranicu
Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Korišćenje

### User Strana
- **My Card**: QR kod članstva sa mogućnošću preuzimanja
- **Profile**: Pregled podataka i registrovanih događaja
- **Events**: Prikaz događaja i registracija
- **Discounts**: Pregled dostupnih popusta
- **Location**: Kontakt info i lokacija

### Admin Panel
1. Login sa admin kredencijalima
2. **Events**: Dodaj/Uredi/Obriši događaje
3. **Discounts**: Upravljanje popustima i partnerima
4. **Members**: Pregled članova (iz Google Sheets)
5. **Settings**: Lokacija, kontakt, linktree

## Boje i Branding

- **Primarna Boja**: `#e52a30` (EESTEC Red)
- **Font**: San Francisco (SF Pro Display)
- **Logotipi**: Dostupni u root folderu
  - `LC_Sarajevo_red.png`
  - `LC_Sarajevo_white.png`
  - `LC_Sarajevo_black.png`

## Deployment

### Vercel (Preporučeno)
```bash
npm install -g vercel
vercel
```

### Netlify
- Povežite GitHub repozitorijum
- Build command: `npm run build`
- Publish directory: `.next`

### Sopstveni Server
```bash
npm run build
npm run start
```

## Struktura Projekta

```
eestec-app/
├── app/
│   ├── api/                    # API rute
│   │   └── admin/
│   │       ├── login/
│   │       ├── events/
│   │       ├── discounts/
│   │       └── members/
│   ├── admin/                  # Admin panel
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── events/
│   │   ├── discounts/
│   │   └── settings/
│   ├── user/                   # Javna strana
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/                 # React komponente
│   ├── MemberCard.tsx
│   ├── EventCard.tsx
│   ├── DiscountCard.tsx
│   ├── LocationInfo.tsx
│   └── AdminNav.tsx
├── lib/                        # Utility funkcije
│   ├── auth.ts                # JWT autentifikacija
│   ├── sheets.ts              # Google Sheets integracija
│   └── types.ts               # TypeScript tipovi
├── public/                    # Logotipi i slike
└── package.json
```

## Sledeće Korake za Proizvodnju

- [ ] Uvezi sve logotipe u `/public` folder
- [ ] Konfiguruj Google Sheets API
- [ ] Postavi admin kredencijale
- [ ] Testiraj QR kod skeniranje na mobilnom
- [ ] Dodaj NFC tag integraciju (ako potrebna)
- [ ] Konfiguruj SMTP za email obaveze
- [ ] Postavi CORS i sigurnosne policy-je
- [ ] Testiraj na različitim uređajima
- [ ] Konfiguruj domain i SSL

## Support & Kontakt

Za pitanja ili assistance:
- 📧 cp@eestec-sa.ba
- 📧 board@eestec-sa.ba
- 📍 Zmaja od Bosne bb, Sarajevo

## License

MIT License - Slobodno koristi za EESTEC LC Sarajevo

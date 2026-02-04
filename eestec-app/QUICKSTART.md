# 🚀 Quick Start Guide - EESTEC LC Sarajevo App

Brzi vodič za pokretanje aplikacije na vašoj mašini.

## ⏱️ 5 Minuta Setup

### Korak 1: Instaliraj Node.js
- Download [Node.js 18+](https://nodejs.org)
- Verify: `node --version`

### Korak 2: Kloniraj ili preuzmi projekt
```bash
# Preuzmi ZIP ili
git clone <repo-url>
cd eestec-app
```

### Korak 3: Instaliraj zavisnosti
```bash
npm install
```

### Korak 4: Pokreni dev server
```bash
npm run dev
```

### Korak 5: Otvori u pregledniku
- **User portal**: http://localhost:3000/user
- **Admin panel**: http://localhost:3000/admin/login

## 🔐 Admin Login (Demo)

```
Email: admin@eestec-sa.ba
Password: password123
```

⚠️ **Promenite ove kredencijale pre deployment-a!**

## 🗂️ Struktura Fajlova

```
eestec-app/
├── app/
│   ├── user/          👥 User portal
│   ├── admin/         🔐 Admin panel
│   └── api/           🔌 API rute
├── components/        🧩 React komponente
├── lib/               📚 Utility funkcije
├── public/            🖼️ Slike i logotipi
└── README.md          📖 Dokumentacija
```

## 📱 Karakteristike

✅ Člansku karticu sa QR kodom  
✅ Admin panel za upravljanje  
✅ Događaje i prijave  
✅ Popuste od partnera  
✅ Profile sa registracijom  
✅ Lokacija sa mapom  
✅ Mobile-friendly UI  
✅ Google Sheets integracija  

## 🔌 Google Sheets Setup (Opciono)

Za aktiviranje podataka iz Google Sheets:

1. Kreiraj Google Sheets fajl
2. Dodaj Service Account
3. Postavi `.env.local`:
```
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your-id
GOOGLE_SHEETS_API_KEY=your-key
```

Detaljne instrukcije: [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)

## 🎨 Branding

- **Primarna boja**: `#e52a30` (EESTEC Red)
- **Font**: SF Pro Display (Apple font)
- **Logotipi**: `public/` folder

## 📦 Deployment

### Vercel (Najjednostavnije)
```bash
npm install -g vercel
vercel
```

### Build za production
```bash
npm run build
npm run start
```

Detaljne instrukcije: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🐛 Troubleshooting

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### Port 3000 već koristi
```bash
npm run dev -- -p 3001
```

### Greška pri build-u
```bash
npm run lint
npm run build
```

## 📞 Support

- 📧 cp@eestec-sa.ba
- 📧 board@eestec-sa.ba
- 📍 Zmaja od Bosne bb, Sarajevo

## 🎓 Učenje Next.js

- [Next.js Dokumentacija](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

**Spreman? Kreni sa `npm run dev`!** 🎉

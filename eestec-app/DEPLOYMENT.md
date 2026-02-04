# Deployment Guide

Vodiči za deployment EESTEC aplikacije na različitim platformama.

## Vercel (Preporučeno - Najjednostavnije)

### Pre Deploymenta

1. Kreiraj GitHub repozitorijum:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/eestec-app.git
git push -u origin main
```

2. Postavi `.env.local` varijable u `vercel.json`:
```json
{
  "env": {
    "NEXT_PUBLIC_GOOGLE_SHEETS_ID": "@google_sheets_id",
    "GOOGLE_SHEETS_API_KEY": "@google_sheets_api_key",
    "GOOGLE_SERVICE_ACCOUNT_EMAIL": "@google_service_account_email",
    "GOOGLE_PRIVATE_KEY": "@google_private_key",
    "ADMIN_SECRET_KEY": "@admin_secret_key",
    "NEXT_PUBLIC_APP_URL": "@next_public_app_url"
  }
}
```

### Deployment Koraci

1. Idi na [Vercel.com](https://vercel.com)
2. Klikni "New Project"
3. Importuj GitHub repozitorijum
4. Klikni "Continue"
5. Dodaj environment varijable:
   - `NEXT_PUBLIC_GOOGLE_SHEETS_ID`
   - `GOOGLE_SHEETS_API_KEY`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `ADMIN_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app`
6. Klikni "Deploy"

✅ App će biti dostupna na `https://your-project.vercel.app`

### Postavi Custom Domain

1. U Vercel dashboard, idi na "Domains"
2. Dodaj `eestec-sarajevo.ba` (ili tvoj domen)
3. Ažuriraj DNS records prema uputama

## Netlify

### Koraci

1. Kreiraj GitHub repozitorijum
2. Idi na [Netlify.com](https://netlify.com)
3. Klikni "New site from Git"
4. Odaberi GitHub
5. Odaberi repozitorijum
6. Konfiguracija:
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Dodaj environment varijable u "Build settings"
8. Klikni "Deploy"

⚠️ Napomena: Netlify ima limitaciju na next.js - Vercel je bolji izbor

## Digital Ocean / Linode (VPS)

### Koraci

1. Kreiraj Ubuntu 22.04 VM
2. SSH u server
3. Instaliraj Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Klonuj projekt:
```bash
git clone https://github.com/yourusername/eestec-app.git
cd eestec-app
npm install
```

5. Kreiraj `.env.production`:
```bash
nano .env.production
```

6. Build aplikaciju:
```bash
npm run build
```

7. Instaliraj PM2:
```bash
npm install -g pm2
pm2 start npm --name "eestec-app" -- start
pm2 startup
pm2 save
```

8. Instaliraj Nginx kao reverse proxy:
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.ba;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

9. Restart Nginx:
```bash
sudo systemctl restart nginx
```

10. Postavi SSL sa Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.ba
```

## AWS (Amplify ili AppRunner)

### AppRunner (Lakše)

1. Push na GitHub
2. Idi na AWS AppRunner
3. "Create service"
4. Odaberi GitHub repozitorijum
5. Automatski build sa Node.js runtime
6. Dodaj environment varijable
7. Deploy

## Environment Varijable za Production

```bash
# Google Sheets (Obavezno)
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your-spreadsheet-id
GOOGLE_SHEETS_API_KEY=your-api-key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account-email
GOOGLE_PRIVATE_KEY=your-private-key

# Admin Auth (Obavezno)
ADMIN_SECRET_KEY=super-secret-production-key-change-this

# App URL (Obavezno)
NEXT_PUBLIC_APP_URL=https://eestec-sarajevo.ba
```

## Monitoring & Logs

### Vercel
- Svi logovi su dostupni u Vercel dashboard
- Automatic error tracking

### VPS / Self-hosted
```bash
# Vidi logs
pm2 logs eestec-app

# Monitor
pm2 monit

# Real-time logs
tail -f ~/.pm2/logs/eestec-app-out.log
```

## Backup & Database

Google Sheets je automatski backup-ovan:
1. Svi podaci su u Google Sheets
2. Google automatski čini backup-ove
3. Možeš skinuti kao CSV iz Google Sheets

### Export podatke:
```bash
# U Google Sheets
File > Download > CSV format
```

## Performance Tips

1. **Caching**: Dodaj Redis caching:
```typescript
// In lib/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedMembers() {
  const cached = await redis.get('members');
  if (cached) return JSON.parse(cached);
  
  const data = await fetchFromSheets();
  await redis.set('members', JSON.stringify(data), 'EX', 3600);
  return data;
}
```

2. **Image Optimization**: Koristi Next.js Image komponente
3. **CDN**: Vercel ima automatic CDN

## Troubleshooting

### Aplikacija ne učitava podatke iz Google Sheets
- Proveri environment varijable
- Proveri Service Account permissions
- Proveri Google Sheets ID

### Build error
- Pokreni `npm install` lokalno
- Proverite TypeScript greške
- Pokreni `npm run build` lokalno prvo

### Spora aplikacija
- Aktiviraj caching
- Koristi CDN
- Optimizuj slike

---

Za bilo koja pitanja ili probleme:
📧 cp@eestec-sa.ba

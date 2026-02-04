# 📋 Checklist za Production

Ova checklist osigurava da je sve spremno za launch.

## Pre Deploymenta

### Konfiguracija
- [ ] Promeniti `ADMIN_SECRET_KEY` u `.env.local`
- [ ] Postaviti `NEXT_PUBLIC_APP_URL` na production domain
- [ ] Konfigurirati Google Sheets (ili alternativu)
- [ ] Postaviti admin kredencijale
- [ ] Konfigurirati SMTP za email-e (ako je potrebno)

### Content
- [ ] Dodati EESTEC logo u `/public`
- [ ] Ažurirati adresu u `app/admin/settings`
- [ ] Dodati email adrese (cp@eestec-sa.ba, board@eestec-sa.ba)
- [ ] Dodati phone numbers
- [ ] Postaviti Google Maps URL za Zmaja od Bosne bb
- [ ] Dodati Linktree URL (ako postoji)

### Security
- [ ] Pregledati `.env.local` - ne commitaj ga
- [ ] Postaviti `CORS` policy-je
- [ ] Aktivirati HTTPS
- [ ] Konfigurirati rate limiting na API-jima
- [ ] Sanitizirati user inputs
- [ ] Dodati input validation na svim formama

### Testing
- [ ] Testirati na mobilnom uređaju
- [ ] Testirati QR kod generisanje
- [ ] Testirati admin login
- [ ] Testirati event registraciju
- [ ] Testirati sve linkove
- [ ] Testirati responsive design na različitim ekranima

### Performance
- [ ] Optimizovati slike
- [ ] Omogućiti caching
- [ ] Minimizovati bundle veličinu
- [ ] Testirati brzinu učitavanja
- [ ] Testirati na sporijoj mreži (3G)

### Accessibility
- [ ] Alt text na svim slikama
- [ ] Keyboard navigation
- [ ] Color contrast (WCAG AA standard)
- [ ] Screen reader friendly

## Deployment Planning

### Pre Deploymenta
- [ ] Build lokalno: `npm run build`
- [ ] Testirati production build: `npm start`
- [ ] Kreirati deployment checklist
- [ ] Notificiraj EESTEC board

### Deployment
- [ ] Deployaj na staging prvo
- [ ] Testiraj svaku funkcionalnost
- [ ] Deployaj na production
- [ ] Monitor za greške prvu satu
- [ ] Notificiraj članove link-om

### Post-Deployment
- [ ] Monitor logove na Vercel/hostu
- [ ] Odpremij feedback
- [ ] Testiraj iz drugih lokacija/mreža
- [ ] Pregledaj analytics

## Monitoring & Maintenance

### Weekly
- [ ] Proveravaj error logove
- [ ] Proveravaj Google Sheets podatke
- [ ] Testiraj login
- [ ] Testiraj QR kod

### Monthly
- [ ] Backup Google Sheets podatke
- [ ] Rotiraj credentials ako je potrebno
- [ ] Ažuriraj dependencies: `npm update`
- [ ] Pregledaj security patches

### Quarterly
- [ ] Major dependency updates
- [ ] Performance review
- [ ] User feedback analysis
- [ ] Feature planning za sledeću verziju

## Launch Communication

Kada je sve spremno, obavestio EESTEC članove:

```
📱 Dostupna je nova EESTEC LC Sarajevo app!

👥 Kao član, možeš:
✓ Preuzeti tvoju digitalnu člansku karticu
✓ Videti sve događaje i prijavi se
✓ Koristiti popuste od partnera
✓ Videti svoju registraciju

🔐 Kao admin:
✓ Upravljati događajima
✓ Dodavati popuste
✓ Pregledarti članove
✓ Konfigurirati podatke

Pristup: https://eestec-sarajevo.ba
Ili klikni na link iz Linktree: https://linktr.ee/eestec_sarajevo

Pitanja? Kontaktiraj nas:
📧 cp@eestec-sa.ba
📧 board@eestec-sa.ba
```

## Post-Launch Features

Nakon što je stablo, razmotri:

- [ ] NFC tag integracija (umesto samo QR)
- [ ] Email notifikacije za događaje
- [ ] Push notifikacije (PWA)
- [ ] Dark mode
- [ ] Multilingual podrška (EN/BS)
- [ ] Advanced analytics
- [ ] Member dashboard sa statistikom
- [ ] Event feedback/survey system
- [ ] Automatic discount expiry notifications
- [ ] Integration sa Instagram/social media

---

✅ Kada sve prođe, spreman si za launch! 🚀

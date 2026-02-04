# Kako Kopirati Logotipe

## Koraci

1. Pronađi logotipe u folderu:
```
c:\Users\mahmu\Desktop\EESTEC\
├── LC_Sarajevo_black.png
├── LC_Sarajevo_red.png
└── LC_Sarajevo_white.png
```

2. Kopiraj sve tri PNG slike u:
```
eestec-app/public/
```

3. Koristi u komponentama:
```tsx
<img src="/LC_Sarajevo_red.png" alt="EESTEC Logo" />
```

Ili sa Next.js Image:
```tsx
import Image from 'next/image';

<Image
  src="/LC_Sarajevo_red.png"
  alt="EESTEC Logo"
  width={200}
  height={200}
/>
```

## Gde Koristi Logo

### Header
- `/app/user/page.tsx` - Sidebar
- `/app/admin/dashboard/page.tsx` - Navigation

### Marketing
- Home stranica: `/app/page.tsx`
- Footer (ako ga dodaš)

### Profile/Card
- Member card možeš dodati logo u `components/MemberCard.tsx`

## Branding Guide

| Element | Boja | Font | Koristi |
|---------|------|------|---------|
| Primary | `#e52a30` | SF Pro Bold | Logo, buttons, accents |
| Dark | `#1a1a1a` | SF Pro | Text, headings |
| Light | `#ffffff` | SF Pro | Background, text on dark |
| Gray | `#f3f4f6` | SF Pro | Background, borders |

Sve je već konfigurisano u `tailwind.config.ts`!

---

📁 Folderi su već kreirani. Samo kopijuješ PNG slike i gotovo! 🎉

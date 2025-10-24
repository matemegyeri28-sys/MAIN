# Megyeri Attila Autokereskedése

Luxus ihlette, interaktív autókereskedés webalkalmazás React, TailwindCSS, Framer Motion és shadcn/ui alapokon. A projekt bemutatja a „Megyeri Attila Autokereskedése” márkát modern, üvegfelületű (glassmorphism) megjelenéssel, sötét mód / világos mód váltással és részletes autóadatbázissal.

## Fő funkciók

- **Landing oldal** hero szekcióval, értékajánlatokkal, kiemelt modellekkel, ügyfélvéleményekkel.
- **Kínálat** oldal teljes szűrő- és rendező rendszerrel (márka, ár, évjárat, üzemanyag, keresés, rendezés) és gyors előnézeti modállal.
- **Autó adatlap** galériával, műszaki specifikációkkal, garanciainformációkkal és CTA gombokkal.
- **Rólunk**, **Kapcsolat** (űrlap + beágyazott térkép) és **Finanszírozás** oldalak a bizalomépítéshez és szolgáltatások bemutatásához.
- Sötét mód alapértelmezetten, világos módra váltható, animált navigáció, parallax hatások és prémium tipográfia.

## Technológiai stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) komponensek
- [Framer Motion](https://www.framer.com/motion/) az animációkhoz
- [lucide-react](https://lucide.dev/) ikonok

## Fejlesztői parancsok

```bash
# függőségek telepítése
npm install

# fejlesztői szerver indítása
npm run dev

# típusellenőrzés + build
npm run build

# előnézet
npm run preview
```

## Mappa-struktúra

```
app/
├── src/
│   ├── components/        # Navigáció, kártyák, űrlapok, közös elemek
│   ├── pages/             # Oldal komponensek (landing, inventory, stb.)
│   ├── data/              # Demo autó adatbázis
│   └── context/           # Téma kontextus (dark/light mód)
├── public/
├── index.html
└── package.json
```

A `cars.ts` fájl valósághű mintaadatokat tartalmaz magyarországi árakkal (HUF), üzemanyag-típusokkal és felszereltséggel. A projekt könnyen bővíthető további modellekkel vagy backend integrációval.

# Megyeri Attila Autokereskedése

Ez a projekt egy teljesen statikus, modern autókereskedés weboldal, amely offline futtatható – külső npm csomagok nélkül. A tartalom magyar nyelvű, a felület sötét módot használ alapértelmezetten, és tartalmaz minden szükséges információt: kiemelt autók, kereshető/rendezhető kínálat, részletes leírások, finanszírozási csomagok, vélemények és kapcsolatfelvételi űrlap.

## Fő funkciók

- **Reszponzív dizájn** üveg effektusokkal, modern tipográfiával.
- **Kiemelt modellek** gyors megtekintéssel és részletes adatlappal.
- **Inventory szűrés**: szöveges keresés, márka, üzemanyag, évjárat, ár intervallum és rendezési lehetőség.
- **Autó adatlap** galériával, műszaki adatokkal, garancia információkkal.
- **Finanszírozási csomagok** és ügyfélvélemények.
- **Kapcsolat oldal** térképpel, validált kapcsolatfelvételi űrlappal.
- **Világos/sötét mód váltó**, a választás helyben tárolódik.

## Futtatás

A projekt nem igényel npm függőséget. A parancsok a Node.js beépített moduljaira támaszkodnak.

```bash
npm install
npm run dev
```

- `npm install`: nincs telepítendő csomag, azonnal lefut.
- `npm run dev`: elindít egy egyszerű Node.js alapú statikus szervert a `http://localhost:4173` címen.
- `npm run build`: elkészíti a `dist/` mappát (publikus és forrás fájlok másolása), amely más statikus szerverrel is kiszolgálható.

## Struktúra

- `public/`: alap HTML és stílusok.
- `src/`: moduláris JavaScript, adatok, komponensek.
- `scripts/build.js`: egyszerű build script a `dist` könyvtár előállításához.
- `server.js`: Node.js alapú statikus fájl szerver.

## Böngésző támogatás

A kód modern böngészőkre (Edge, Chrome, Firefox, Safari legújabb verziói) optimalizált és moduláris (ESM) JavaScriptet használ.

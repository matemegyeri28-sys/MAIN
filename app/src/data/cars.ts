import { Car } from "../types/car";

export const cars: Car[] = [
  {
    id: "audi-rs7-performance-2023",
    brand: "Audi",
    model: "RS7 Performance",
    year: 2023,
    price: 87900000,
    mileage: 8500,
    fuelType: "Benzin",
    gearbox: "Automata",
    horsepower: 630,
    acceleration: 3.4,
    consumption: "11.6 l/100 km",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549921296-3ecf9c4f1b1b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1523966211575-eb4a6b8c41fb?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "Az RS7 Performance a négykarikás márka sportosságának csúcsa: 630 lóerős V8 biturbó motor, quattro összkerékhajtás és kifinomult luxus beltér egyaránt biztosítják a felejthetetlen vezetési élményt.",
    features: [
      "Bang & Olufsen hangrendszer",
      "Adaptív légrugózás",
      "Head-up display",
      "Masszázsfunkciós ülések"
    ],
    interior:
      "Prémium bőr és alcantara kombináció, karbon betétek, konfigurálható ambient világítás, MMI infotainment rendszer 3 képernyővel.",
    warranty: "Gyári garancia 2026.06-ig, +12 hónap teljes körű garancia kérhető"
  },
  {
    id: "bmw-i4-m50-2024",
    brand: "BMW",
    model: "i4 M50",
    year: 2024,
    price: 32900000,
    mileage: 1500,
    fuelType: "Elektromos",
    gearbox: "Automata",
    horsepower: 544,
    acceleration: 3.9,
    consumption: "18.1 kWh/100 km",
    image:
      "https://images.unsplash.com/photo-1620891549027-942fdc95d3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621570074720-1ee1136fe0fa?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1630329275153-7111fdc8d963?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1617813489407-3e1c725d5126?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "Teljesen elektromos Gran Coupé az M divízió dinamikájával. 544 lóerő, 795 Nm, 510 km WLTP hatótáv és M adaptív futómű gondoskodik a sportos, mégis lokálisan emissziómentes közlekedésről.",
    features: [
      "BMW Live Cockpit Professional",
      "Driving Assistant Professional",
      "Panoráma üvegtető",
      "Harman Kardon hifi"
    ],
    interior:
      "Vegán Sensatec bevonatok, sportülések, kifinomult ambient világítás és modern, hajlított kijelző.",
    warranty: "Gyári garancia 2027.02-ig, akkumulátorra 8 év / 160 000 km"
  },
  {
    id: "mercedes-benz-s400d-4matic-2022",
    brand: "Mercedes-Benz",
    model: "S 400d 4MATIC L",
    year: 2022,
    price: 45900000,
    mileage: 24000,
    fuelType: "Dízel",
    gearbox: "Automata",
    horsepower: 330,
    acceleration: 5.4,
    consumption: "7.2 l/100 km",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549318156-064351bb4b43?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1520531158340-44015069e78e?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "A luxuslimuzinok etalonja hosszított tengelytávval, AIRMATIC légrugózással, MBUX Hyperscreen multimédiával és hátsó Executive üléscsomaggal.",
    features: [
      "MBUX Hyperscreen",
      "Hátsó Executive csomag",
      "Burmester 4D hangrendszer",
      "Energizing Comfort program"
    ],
    interior:
      "Nappa bőr, fa betétek, hátsó multimédia kijelzők, masszázs és szellőztetés minden üléshez.",
    warranty: "Gyári garancia 2025.09-ig, 24/7 mobilitás szolgáltatás"
  },
  {
    id: "tesla-model-s-long-range-2023",
    brand: "Tesla",
    model: "Model S Long Range",
    year: 2023,
    price: 39900000,
    mileage: 18000,
    fuelType: "Elektromos",
    gearbox: "Automata",
    horsepower: 670,
    acceleration: 3.1,
    consumption: "16.5 kWh/100 km",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1619767886800-9f45ace0bb3f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "Ikermotoros összkerékhajtás, 652 km WLTP hatótáv, Autopilot, valamint 17\"-os Cinematic kijelző az utastérben.",
    features: [
      "Autopilot és Full Self-Driving előkészítés",
      "Prémium belső tér",
      "HEPA szűrőrendszer",
      "17\" Cinematic kijelző"
    ],
    interior:
      "Minimalista, világos beltér prémium anyagokkal, üvegtetővel és ventilátornélküli klímával.",
    warranty: "Gyári garancia 2027.11-ig, hajtásláncra 8 év / 240 000 km"
  },
  {
    id: "toyota-rav4-hybrid-style-2021",
    brand: "Toyota",
    model: "RAV4 Hybrid Style",
    year: 2021,
    price: 14890000,
    mileage: 42000,
    fuelType: "Plug-in hibrid",
    gearbox: "Automata",
    horsepower: 306,
    acceleration: 6.0,
    consumption: "1.2 l/100 km",
    image:
      "https://images.unsplash.com/photo-1614332287897-cdc485fa5621?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1603384693870-7a4f4a36b24d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "SUV praktikum, intelligens összkerékhajtás, 75 km elektromos hatótáv és Toyota Safety Sense biztonsági csomag.",
    features: [
      "Intelligens összkerékhajtás",
      "Toyota Safety Sense",
      "Head-up display",
      "JBL Premium audio"
    ],
    interior:
      "Tágas beltér bőr-szövet ülésekkel, fűtött kormánykerékkel és digitális műszeregységgel.",
    warranty: "Gyári garancia 2024.12-ig, hibrid akkura 10 év / 250 000 km"
  },
  {
    id: "porsche-911-carrera-gts-2022",
    brand: "Porsche",
    model: "911 Carrera GTS",
    year: 2022,
    price: 68900000,
    mileage: 12000,
    fuelType: "Benzin",
    gearbox: "Automata",
    horsepower: 480,
    acceleration: 3.3,
    consumption: "10.8 l/100 km",
    image:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1523983254932-35563e76aaad?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "Ikerturbós boxermotor 480 lóerővel, Sport Chrono csomaggal és hátsókerék-kormányzással a versenypályáról ismerős élményért.",
    features: [
      "Porsche Dynamic Chassis Control",
      "Sport Chrono csomag",
      "BOSE Surround Sound",
      "Carbon kerámia fékek"
    ],
    interior:
      "Alcantara és bőr kombináció, GT sportkormány, karbon dekorok, adaptív sportülések.",
    warranty: "12 hónap Porsche Approved garancia"
  },
  {
    id: "volvo-xc90-recharge-ultimate-2023",
    brand: "Volvo",
    model: "XC90 Recharge Ultimate",
    year: 2023,
    price: 33900000,
    mileage: 9000,
    fuelType: "Plug-in hibrid",
    gearbox: "Automata",
    horsepower: 455,
    acceleration: 5.3,
    consumption: "1.1 l/100 km",
    image:
      "https://images.unsplash.com/photo-1520085601670-ee14aa5fa3e8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1520531158340-44015069e78e?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "7 személyes, prémium skandináv SUV 77 km tisztán elektromos hatótávval, Google alapú infotainmenttel és pilot assist rendszerrel.",
    features: [
      "Pilot Assist",
      "Bowers & Wilkins audio",
      "Lézeres LED fényszórók",
      "360° kamera"
    ],
    interior:
      "Világos nappa bőr, valódi fa betétek, kristály váltókar, 4 zónás klíma.",
    warranty: "Gyári garancia 2026.05-ig"
  },
  {
    id: "land-rover-defender-110-v8-2024",
    brand: "Land Rover",
    model: "Defender 110 V8",
    year: 2024,
    price: 52900000,
    mileage: 6000,
    fuelType: "Benzin",
    gearbox: "Automata",
    horsepower: 525,
    acceleration: 5.2,
    consumption: "14.7 l/100 km",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517949908114-720226b864c1?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1542280756-900b70ed122e?auto=format&fit=crop&w=1600&q=80"
    ],
    description:
      "Ikonikus terepjáró 525 lóerős kompresszoros V8 motorral, Terrain Response 2 rendszerrel és kifinomult, strapabíró belsővel.",
    features: [
      "Terrain Response 2",
      "Meridian Surround hangrendszer",
      "Fejlett off-road csomag",
      "Head-up display"
    ],
    interior:
      "Praktikus, mégis prémium belső részben Windsor bőrrel, robusztus felületekkel és modern infotainmenttel.",
    warranty: "Gyári garancia 2027.01-ig"
  }
];

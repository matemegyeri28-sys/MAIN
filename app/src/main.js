import { cars } from "./data/cars.js";

const appRoot = document.getElementById("app");
const modalRoot = document.getElementById("modal-root");
const htmlEl = document.documentElement;

const currencyFormatter = new Intl.NumberFormat("hu-HU", {
  style: "currency",
  currency: "HUF",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("hu-HU");

const state = {
  filters: {
    search: "",
    brand: "",
    fuel: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  },
};

function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) {
    el.className = options.className;
  }
  if (options.html) {
    el.innerHTML = options.html;
  }
  if (options.text) {
    el.textContent = options.text;
  }
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }
  if (options.children) {
    options.children.forEach((child) => el.appendChild(child));
  }
  return el;
}

function setupThemeToggle(container) {
  const stored = localStorage.getItem("ma-auto-theme");
  if (stored === "light") {
    htmlEl.setAttribute("data-theme", "light");
  }

  const button = createElement("button", {
    className: "theme-toggle",
    html: `<span aria-hidden="true">&#9788;</span><span>Világos mód</span>`,
  });

  const updateButtonLabel = () => {
    const isLight = htmlEl.getAttribute("data-theme") === "light";
    button.innerHTML = isLight
      ? `<span aria-hidden="true">&#9790;</span><span>Sötét mód</span>`
      : `<span aria-hidden="true">&#9788;</span><span>Világos mód</span>`;
  };

  updateButtonLabel();

  button.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("ma-auto-theme", next);
    updateButtonLabel();
  });

  container.appendChild(button);
}

function renderNavigation() {
  const nav = createElement("nav");
  const content = createElement("div", { className: "nav-content" });
  const left = createElement("div", { className: "logo", text: "Megyeri Attila Autokereskedése" });
  const links = createElement("div", { className: "nav-links" });
  const sections = [
    { id: "hero", label: "Kezdőlap" },
    { id: "featured", label: "Kiemelt autók" },
    { id: "inventory", label: "Kínálat" },
    { id: "about", label: "Rólunk" },
    { id: "financing", label: "Finanszírozás" },
    { id: "testimonials", label: "Vélemények" },
    { id: "contact", label: "Kapcsolat" },
  ];

  sections.forEach((section) => {
    const link = createElement("a", {
      attrs: { href: `#${section.id}` },
      text: section.label,
    });
    links.appendChild(link);
  });

  setupThemeToggle(content);
  content.insertBefore(links, content.lastChild);
  content.insertBefore(left, links);
  nav.appendChild(content);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = links.querySelector(`a[href="#${entry.target.id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          links.querySelectorAll("a").forEach((item) => item.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => {
    const sectionEl = document.getElementById(section.id);
    if (sectionEl) {
      observer.observe(sectionEl);
    }
  });

  return nav;
}

function renderHeroSection() {
  const section = createElement("section", { attrs: { id: "hero" } });
  const container = createElement("div", { className: "container hero" });
  container.appendChild(createElement("span", { className: "badge", text: "Megbízhatóság, minőség, szakértelem" }));
  container.appendChild(
    createElement("h1", {
      text: "Megbízhatóság, Minőség, Szakértelem – Megyeri Attila Autokereskedése",
    })
  );
  container.appendChild(
    createElement("p", {
      text: "Prémium és válogatott járműveket kínálunk átlátható előélettel, teljes körű finanszírozással és személyre szabott szolgáltatásokkal.",
    })
  );
  const actions = createElement("div", { className: "hero-actions" });
  actions.appendChild(
    createElement("button", {
      className: "button primary",
      text: "Kínálat megtekintése",
      attrs: { "data-scroll": "inventory" },
    })
  );
  actions.appendChild(
    createElement("button", {
      className: "button secondary",
      text: "Ismerje meg történetünket",
      attrs: { "data-scroll": "about" },
    })
  );
  container.appendChild(actions);
  section.appendChild(container);
  return section;
}

function attachScrollHandlers(root) {
  root.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.getAttribute("data-scroll"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function renderFeaturedSection() {
  const section = createElement("section", { attrs: { id: "featured" } });
  const container = createElement("div", { className: "container" });
  const heading = createElement("div", { className: "hero" });
  heading.style.paddingTop = "0";
  heading.style.textAlign = "left";
  heading.appendChild(
    createElement("h2", {
      text: "Válogatott kiemelt modellek",
    })
  );
  heading.appendChild(
    createElement("p", {
      text: "A legkeresettebb, ellenőrzött előéletű prémium járműveink részletes felszereltségi listával és azonnal elérhető finanszírozással.",
    })
  );
  container.appendChild(heading);

  const grid = createElement("div", { className: "featured-grid" });
  cars.slice(0, 3).forEach((car) => {
    grid.appendChild(createCarCard(car, { showActions: true }));
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function filteredCars() {
  return cars
    .filter((car) => {
      const { search, brand, fuel, year, minPrice, maxPrice } = state.filters;
      const name = `${car.brand} ${car.model}`.toLowerCase();
      if (search && !name.includes(search.toLowerCase())) return false;
      if (brand && car.brand !== brand) return false;
      if (fuel && car.fuelType !== fuel) return false;
      if (year && String(car.year) !== year) return false;
      if (minPrice && car.price < Number(minPrice)) return false;
      if (maxPrice && car.price > Number(maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      switch (state.filters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "mileage-asc":
          return a.mileage - b.mileage;
        case "mileage-desc":
          return b.mileage - a.mileage;
        default:
          return b.year - a.year;
      }
    });
}

function renderInventorySection() {
  const section = createElement("section", { attrs: { id: "inventory" } });
  const container = createElement("div", { className: "container" });
  const heading = createElement("div", { className: "hero" });
  heading.style.paddingTop = "0";
  heading.appendChild(createElement("h2", { text: "Prémium kínálatunk" }));
  heading.appendChild(
    createElement("p", {
      text: "Szűrje, rendezze és fedezze fel a gondosan válogatott autóinkat az igényeinek megfelelően.",
    })
  );
  container.appendChild(heading);

  const filterWrapper = createElement("div", { className: "inventory-filter" });
  const form = createElement("form");

  const inputGroup = (label, input) => {
    const wrapper = createElement("div");
    wrapper.appendChild(createElement("label", { text: label }));
    wrapper.appendChild(input);
    return wrapper;
  };

  const searchInput = createElement("input", {
    attrs: {
      type: "search",
      placeholder: "Modell, felszereltség...",
      name: "search",
    },
  });

  const brandSelect = createElement("select", { attrs: { name: "brand" } });
  brandSelect.appendChild(createElement("option", { attrs: { value: "" }, text: "Összes márka" }));
  Array.from(new Set(cars.map((car) => car.brand))).forEach((brand) => {
    brandSelect.appendChild(createElement("option", { attrs: { value: brand }, text: brand }));
  });

  const fuelSelect = createElement("select", { attrs: { name: "fuel" } });
  fuelSelect.appendChild(createElement("option", { attrs: { value: "" }, text: "Összes üzemanyag" }));
  Array.from(new Set(cars.map((car) => car.fuelType))).forEach((fuel) => {
    fuelSelect.appendChild(createElement("option", { attrs: { value: fuel }, text: fuel }));
  });

  const yearSelect = createElement("select", { attrs: { name: "year" } });
  yearSelect.appendChild(createElement("option", { attrs: { value: "" }, text: "Összes évjárat" }));
  Array.from(new Set(cars.map((car) => car.year)))
    .sort((a, b) => b - a)
    .forEach((year) => {
      yearSelect.appendChild(createElement("option", { attrs: { value: year }, text: String(year) }));
    });

  const sortSelect = createElement("select", { attrs: { name: "sort" } });
  [
    ["newest", "Legújabbak"],
    ["price-asc", "Ár növekvő"],
    ["price-desc", "Ár csökkenő"],
    ["mileage-asc", "Kilométer növekvő"],
    ["mileage-desc", "Kilométer csökkenő"],
  ].forEach(([value, label]) => {
    sortSelect.appendChild(createElement("option", { attrs: { value }, text: label }));
  });

  const minPriceInput = createElement("input", {
    attrs: { type: "number", name: "minPrice", placeholder: "Min. ár (Ft)" },
  });
  const maxPriceInput = createElement("input", {
    attrs: { type: "number", name: "maxPrice", placeholder: "Max. ár (Ft)" },
  });

  form.appendChild(inputGroup("Keresés", searchInput));
  form.appendChild(inputGroup("Márka", brandSelect));
  form.appendChild(inputGroup("Üzemanyag", fuelSelect));
  form.appendChild(inputGroup("Évjárat", yearSelect));
  form.appendChild(inputGroup("Rendezés", sortSelect));
  form.appendChild(inputGroup("Minimum ár (Ft)", minPriceInput));
  form.appendChild(inputGroup("Maximum ár (Ft)", maxPriceInput));

  const resetButton = createElement("button", {
    className: "button secondary",
    text: "Szűrők törlése",
    attrs: { type: "button", style: "justify-self:flex-start" },
  });

  resetButton.addEventListener("click", () => {
    Object.keys(state.filters).forEach((key) => (state.filters[key] = key === "sort" ? "newest" : ""));
    form.reset();
    updateInventoryList();
  });

  form.appendChild(resetButton);

  form.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
    state.filters[target.name] = target.value;
    updateInventoryList();
  });

  filterWrapper.appendChild(form);
  container.appendChild(filterWrapper);

  const list = createElement("div", { className: "inventory-grid" });
  list.setAttribute("data-inventory-list", "true");
  container.appendChild(list);

  const emptyState = createElement("div", {
    className: "card",
    text: "Jelenleg nincs a feltételeknek megfelelő jármű. Kérjük módosítsa a szűrőket vagy keressen minket személyre szabott ajánlatért.",
  });
  emptyState.style.display = "none";
  container.appendChild(emptyState);

  section.appendChild(container);

  function updateInventoryList() {
    list.innerHTML = "";
    const result = filteredCars();
    if (result.length === 0) {
      emptyState.style.display = "block";
      return;
    }
    emptyState.style.display = "none";
    result.forEach((car) => list.appendChild(createCarCard(car, { showActions: true })));
  }

  updateInventoryList();

  return section;
}

function createCarCard(car, { showActions = false } = {}) {
  const card = createElement("article", { className: "card inventory-card" });
  const figure = createElement("figure");
  figure.appendChild(
    createElement("img", {
      attrs: { src: car.image, alt: `${car.brand} ${car.model}` },
    })
  );
  card.appendChild(figure);

  card.appendChild(createElement("h3", { text: `${car.brand} ${car.model}` }));
  card.appendChild(
    createElement("p", {
      text: car.description,
    })
  );
  const meta = createElement("div", { className: "inventory-meta" });
  [
    ["Évjárat", car.year],
    ["Futásteljesítmény", `${numberFormatter.format(car.mileage)} km`],
    ["Üzemanyag", car.fuelType],
    ["Teljesítmény", `${car.horsepower} LE`],
  ].forEach(([label, value]) => {
    meta.appendChild(createElement("span", { html: `<strong>${label}:</strong> ${value}` }));
  });
  card.appendChild(meta);

  card.appendChild(createElement("div", { className: "inventory-price", text: currencyFormatter.format(car.price) }));

  if (showActions) {
    const actions = createElement("div", { className: "hero-actions" });
    actions.style.justifyContent = "flex-start";
    const previewButton = createElement("button", {
      className: "button secondary",
      text: "Gyors megtekintés",
    });
    previewButton.addEventListener("click", () => openQuickView(car));
    const detailButton = createElement("button", {
      className: "button primary",
      text: "Teljes adatlap",
    });
    detailButton.addEventListener("click", () => openDetailModal(car));
    actions.appendChild(previewButton);
    actions.appendChild(detailButton);
    card.appendChild(actions);
  }

  return card;
}

function openModal(content) {
  modalRoot.innerHTML = "";
  const overlay = createElement("div", { className: "modal-overlay" });
  const modalContent = createElement("div", { className: "modal-content" });
  const close = createElement("button", { className: "modal-close", html: "&times;" });
  close.addEventListener("click", closeModal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });
  modalContent.appendChild(close);
  modalContent.appendChild(content);
  overlay.appendChild(modalContent);
  modalRoot.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalRoot.innerHTML = "";
  document.body.style.overflow = "";
}

function openQuickView(car) {
  const content = createElement("div", { className: "specs-grid" });
  const left = createElement("div");
  left.appendChild(
    createElement("img", {
      className: "rounded",
      attrs: { src: car.image, alt: `${car.brand} ${car.model}` },
    })
  );
  const info = createElement("div");
  info.appendChild(createElement("h3", { text: `${car.brand} ${car.model}` }));
  info.appendChild(
    createElement("p", {
      text: car.description,
    })
  );
  const list = createElement("ul", { className: "feature-list" });
  [
    `Évjárat: ${car.year}`,
    `Ár: ${currencyFormatter.format(car.price)}`,
    `Futás: ${numberFormatter.format(car.mileage)} km`,
    `Üzemanyag: ${car.fuelType}`,
    `Teljesítmény: ${car.horsepower} LE`,
    `Gyorsulás: ${car.acceleration} mp (0-100)`
  ].forEach((item) => list.appendChild(createElement("li", { text: item })));
  info.appendChild(list);
  const actions = createElement("div", { className: "hero-actions" });
  actions.style.justifyContent = "flex-start";
  const detailButton = createElement("button", {
    className: "button primary",
    text: "Teljes adatlap",
  });
  detailButton.addEventListener("click", () => {
    closeModal();
    openDetailModal(car);
  });
  actions.appendChild(detailButton);
  info.appendChild(actions);
  content.appendChild(left);
  content.appendChild(info);
  openModal(content);
}

function openDetailModal(car) {
  const wrapper = createElement("div");
  wrapper.appendChild(createElement("h2", { text: `${car.brand} ${car.model}` }));
  wrapper.appendChild(
    createElement("p", {
      text: car.description,
    })
  );
  wrapper.appendChild(createElement("div", { className: "inventory-price", text: currencyFormatter.format(car.price) }));

  const tabButtons = createElement("div", { className: "tabs" });
  const tabs = ["Galéria", "Műszaki adatok", "Garancia"];
  const tabContent = createElement("div");

  const renderTab = (index) => {
    tabContent.innerHTML = "";
    tabButtons.querySelectorAll(".tab-button").forEach((btn, idx) => {
      btn.classList.toggle("active", idx === index);
    });
    if (index === 0) {
      const gallery = createElement("div", { className: "featured-grid" });
      car.gallery.forEach((image) => {
        gallery.appendChild(
          createElement("img", {
            className: "rounded",
            attrs: { src: image, alt: `${car.model} galéria` },
          })
        );
      });
      tabContent.appendChild(gallery);
    } else if (index === 1) {
      const specs = createElement("div", { className: "specs-grid" });
      const perf = createElement("div");
      perf.appendChild(createElement("h3", { text: "Teljesítmény" }));
      const perfList = createElement("ul", { className: "feature-list" });
      [
        `Teljesítmény: ${car.horsepower} LE`,
        `Gyorsulás (0-100 km/h): ${car.acceleration} mp`,
        `Átlagfogyasztás: ${car.consumption}`,
        `Váltó: ${car.gearbox}`,
      ].forEach((item) => perfList.appendChild(createElement("li", { text: item })));
      perf.appendChild(perfList);
      const features = createElement("div");
      features.appendChild(createElement("h3", { text: "Felszereltség" }));
      const featuresList = createElement("ul", { className: "feature-list" });
      car.features.forEach((feature) => featuresList.appendChild(createElement("li", { text: feature })));
      features.appendChild(featuresList);
      specs.appendChild(perf);
      specs.appendChild(features);
      tabContent.appendChild(specs);
    } else {
      const warranty = createElement("div", { className: "card" });
      warranty.appendChild(createElement("h3", { text: "Garancia és szolgáltatások" }));
      warranty.appendChild(createElement("p", { text: car.warranty }));
      warranty.appendChild(createElement("p", { text: car.interior }));
      tabContent.appendChild(warranty);
    }
  };

  tabs.forEach((label, index) => {
    const button = createElement("button", { className: "tab-button", text: label });
    button.addEventListener("click", () => renderTab(index));
    tabButtons.appendChild(button);
  });

  wrapper.appendChild(tabButtons);
  wrapper.appendChild(tabContent);
  renderTab(0);
  openModal(wrapper);
}

function renderAboutSection() {
  const section = createElement("section", { attrs: { id: "about" } });
  const container = createElement("div", { className: "container" });
  const heading = createElement("div", { className: "hero" });
  heading.style.paddingTop = "0";
  heading.appendChild(createElement("h2", { text: "Történetünk" }));
  heading.appendChild(
    createElement("p", {
      text: "Közel két évtizede dolgozunk azon, hogy ügyfeleink a legmagasabb szintű kiszolgálást kapják a prémium autóvásárlás minden fázisában.",
    })
  );
  container.appendChild(heading);

  const grid = createElement("div", { className: "about-grid" });
  const storyCard = createElement("div", { className: "card" });
  storyCard.appendChild(
    createElement("p", {
      text: "Megyeri Attila Autokereskedése kizárólag ellenőrzött előéletű, kiváló állapotú járműveket kínál. Minden autónkat részletes diagnosztikával, dokumentált szervizmúlttal és transzparens finanszírozási háttérrel adjuk át.",
    })
  );
  storyCard.appendChild(
    createElement("p", {
      text: "A személyes kapcsolatban hiszünk: dedikált tanácsadóink a konfigurációtól a hitelbonyolításon át a forgalomba helyezésig minden lépésben támogatják önt.",
    })
  );
  grid.appendChild(storyCard);

  const valuesCard = createElement("div", { className: "card" });
  valuesCard.appendChild(createElement("h3", { text: "Értékeink" }));
  const valuesList = createElement("ul", { className: "feature-list" });
  [
    "Teljes átláthatóság az autók előéletéről",
    "Prémium ügyfélkiszolgálás, személyes kapcsolattartás",
    "Rugalmas, egyedi finanszírozási konstrukciók",
    "Exkluzív garanciális és szervizmegoldások",
  ].forEach((value) => valuesList.appendChild(createElement("li", { text: value })));
  valuesCard.appendChild(valuesList);
  grid.appendChild(valuesCard);

  const timeline = createElement("div", { className: "card" });
  timeline.appendChild(createElement("h3", { text: "Mérföldköveink" }));
  const list = createElement("ul", { className: "timeline" });
  [
    ["2006", "Megyeri Attila megalapítja első bemutatótermünket Budapesten."],
    ["2012", "Bevezetjük a teljes körű premium ügyfélprogramot."],
    ["2017", "Új, 3000 m²-es bemutató- és szervizközpontba költözünk."],
    ["2023", "Digitális vásárlói élmény, virtuális túrák és távoli finanszírozási ügyintézés."],
  ].forEach(([year, description]) => {
    const item = createElement("li");
    item.appendChild(createElement("strong", { text: year }));
    item.appendChild(createElement("span", { text: description }));
    list.appendChild(item);
  });
  timeline.appendChild(list);
  grid.appendChild(timeline);

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function renderFinancingSection() {
  const section = createElement("section", { attrs: { id: "financing" } });
  const container = createElement("div", { className: "container" });
  const heading = createElement("div", { className: "hero" });
  heading.style.paddingTop = "0";
  heading.appendChild(createElement("h2", { text: "Finanszírozási megoldásaink" }));
  heading.appendChild(
    createElement("p", {
      text: "Három prémium csomag, amelyek rugalmasan igazodnak vállalati és magánügyfeleink igényeihez.",
    })
  );
  container.appendChild(heading);

  const options = [
    {
      title: "Expressz",
      price: "24 órás hitelbírálat",
      items: [
        "0%-tól induló önerő",
        "Rugalmas futamidő 12-60 hónap",
        "Online előminősítés",
      ],
    },
    {
      title: "Prémium",
      price: "Személyre szabott konstrukció",
      items: [
        "Flottakedvezmények",
        "Céges elszámolást segítő dokumentáció",
        "Csereautó a szerződés teljes idejére",
      ],
    },
    {
      title: "Exkluzív",
      price: "All-inclusive élmény",
      items: [
        "Dedicated account manager",
        "VIP szervizidőpont és pick-up szolgáltatás",
        "Éves prémium biztosítási audit",
      ],
    },
  ];

  const grid = createElement("div", { className: "financing-grid" });
  options.forEach((option) => {
    const card = createElement("div", { className: "card" });
    card.appendChild(createElement("h3", { text: option.title }));
    card.appendChild(createElement("p", { text: option.price }));
    const list = createElement("ul", { className: "feature-list" });
    option.items.forEach((item) => list.appendChild(createElement("li", { text: item })));
    card.appendChild(list);
    card.appendChild(createElement("button", { className: "button primary", text: "Ajánlatot kérek" }));
    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function renderTestimonialsSection() {
  const section = createElement("section", { attrs: { id: "testimonials" } });
  const container = createElement("div", { className: "container" });
  const heading = createElement("div", { className: "hero" });
  heading.style.paddingTop = "0";
  heading.appendChild(createElement("h2", { text: "Ügyfeleink mondták" }));
  heading.appendChild(
    createElement("p", {
      text: "Átadás utáni visszajelzéseinkből válogattunk, hogy megmutassuk, miért választanak minket visszatérő ügyfeleink is.",
    })
  );
  container.appendChild(heading);

  const reviews = [
    {
      name: "B. Dániel",
      rating: 5,
      text: "Második autómat vettem Attiláéktól. A teljes folyamat transzparens, minden dokumentumot megkaptam. A finanszírozás rekordgyors volt.",
    },
    {
      name: "Nagy Katalin",
      rating: 5,
      text: "A Range Rover átadásától az éves szervizelésig mindenben számíthattunk rájuk. A csereautó szolgáltatás életmentő volt.",
    },
    {
      name: "dr. Tóth Gergely",
      rating: 4,
      text: "A Tesla Plaid vásárlásakor részletes technikai ismertetőt kaptam. A csapat szakértő, segítőkész, az ügyintézés pedig gördülékeny.",
    },
  ];

  const grid = createElement("div", { className: "testimonial-grid" });
  reviews.forEach((review) => {
    const card = createElement("div", { className: "card testimonial" });
    card.appendChild(createElement("div", { className: "stars", text: "★★★★★".slice(0, review.rating) }));
    card.appendChild(createElement("p", { text: review.text }));
    card.appendChild(createElement("strong", { text: review.name }));
    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function renderContactSection() {
  const section = createElement("section", { attrs: { id: "contact" } });
  const container = createElement("div", { className: "container" });
  const heading = createElement("div", { className: "hero" });
  heading.style.paddingTop = "0";
  heading.appendChild(createElement("h2", { text: "Kapcsolat" }));
  heading.appendChild(
    createElement("p", {
      text: "Foglaljon időpontot személyes konzultációra, vagy kérjen visszahívást tanácsadóinktól.",
    })
  );
  container.appendChild(heading);

  const grid = createElement("div", { className: "contact-grid" });
  const infoCard = createElement("div", { className: "card" });
  infoCard.appendChild(createElement("h3", { text: "Elérhetőségek" }));
  const infoList = createElement("ul", { className: "feature-list" });
  infoList.appendChild(createElement("li", { text: "Telefon: +36 1 800 1122" }));
  infoList.appendChild(createElement("li", { text: "Email: kapcsolat@megyeriautoker.hu" }));
  infoList.appendChild(createElement("li", { text: "Cím: 1037 Budapest, Bécsi út 267." }));
  infoCard.appendChild(infoList);
  infoCard.appendChild(
    createElement("iframe", {
      className: "map-frame",
      attrs: {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.573348353945!2d19.0286082!3d47.5693281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741db7a7566bbb1%3A0x8cfe1a85e2b55816!2zQmVjc2kgw7p0IDI2NywgQnVkYXBlc3Q!5e0!3m2!1shu!2shu!4v1707050000000!5m2!1shu!2shu",
        allowfullscreen: "",
        loading: "lazy",
      },
    })
  );
  grid.appendChild(infoCard);

  const formCard = createElement("div", { className: "card" });
  formCard.appendChild(createElement("h3", { text: "Írjon nekünk" }));
  const form = createElement("form", { className: "contact-form" });
  const fields = [
    { name: "name", label: "Név", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Telefon", type: "tel", required: true },
  ];

  fields.forEach((field) => {
    const wrapper = createElement("div");
    wrapper.appendChild(createElement("label", { attrs: { for: field.name }, text: field.label }));
    const input = createElement("input", {
      attrs: {
        id: field.name,
        name: field.name,
        type: field.type,
        required: field.required ? "true" : undefined,
      },
    });
    wrapper.appendChild(input);
    wrapper.appendChild(createElement("div", { className: "form-error", attrs: { "data-error": field.name } }));
    form.appendChild(wrapper);
  });

  const serviceWrapper = createElement("div");
  serviceWrapper.appendChild(createElement("label", { attrs: { for: "service" }, text: "Érdeklődés típusa" }));
  const serviceSelect = createElement("select", {
    attrs: { id: "service", name: "service" },
  });
  ["Prémium finanszírozás", "Biztosítás", "Próbaút", "Beszámítás"].forEach((option) => {
    serviceSelect.appendChild(createElement("option", { text: option, attrs: { value: option } }));
  });
  serviceWrapper.appendChild(serviceSelect);
  form.appendChild(serviceWrapper);

  const messageWrapper = createElement("div");
  messageWrapper.appendChild(createElement("label", { attrs: { for: "message" }, text: "Üzenet" }));
  const messageInput = createElement("textarea", {
    attrs: { id: "message", name: "message", required: "true" },
  });
  messageWrapper.appendChild(messageInput);
  messageWrapper.appendChild(createElement("div", { className: "form-error", attrs: { "data-error": "message" } }));
  form.appendChild(messageWrapper);

  const successMessage = createElement("p", {
    className: "form-error",
  });
  successMessage.style.color = "#4ade80";
  successMessage.style.display = "none";
  form.appendChild(successMessage);

  const submitButton = createElement("button", {
    className: "button primary",
    text: "Üzenet elküldése",
    attrs: { type: "submit" },
  });
  form.appendChild(submitButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const errors = {};

    if (!formData.get("name")?.trim()) {
      errors.name = "Kérjük, adja meg a nevét.";
    }
    const emailValue = formData.get("email")?.toString() || "";
    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Érvényes email címet adjon meg.";
    }
    if (!(formData.get("phone")?.toString().length > 6)) {
      errors.phone = "Kérjük, adjon meg telefonszámot.";
    }
    if (!formData.get("message")?.toString().trim()) {
      errors.message = "Írja le röviden, miben segíthetünk.";
    }

    ["name", "email", "phone", "message"].forEach((field) => {
      const errorEl = form.querySelector(`[data-error="${field}"]`);
      if (errorEl) {
        errorEl.textContent = errors[field] || "";
      }
    });

    if (Object.keys(errors).length === 0) {
      successMessage.textContent = "Köszönjük érdeklődését! 1 munkanapon belül felvesszük önnel a kapcsolatot.";
      successMessage.style.display = "block";
      form.reset();
    } else {
      successMessage.style.display = "none";
    }
  });

  formCard.appendChild(form);
  grid.appendChild(formCard);
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

function renderFooter() {
  const footer = createElement("footer", { className: "footer" });
  const grid = createElement("div", { className: "footer-grid" });

  const column1 = createElement("div");
  column1.appendChild(createElement("strong", { text: "Megyeri Attila Autokereskedése" }));
  column1.appendChild(
    createElement("p", {
      text: "Prémium autók, személyre szabott finanszírozás és országos lefedettség. Bemutatótermünk hétfőtől szombatig várja önt.",
    })
  );

  const column2 = createElement("div");
  column2.appendChild(createElement("strong", { text: "Nyitvatartás" }));
  const schedule = createElement("ul", { className: "feature-list" });
  [
    "Hétfő-Péntek: 9:00 - 19:00",
    "Szombat: 9:00 - 15:00",
    "Vasárnap: előzetes egyeztetéssel",
  ].forEach((item) => schedule.appendChild(createElement("li", { text: item })));
  column2.appendChild(schedule);

  const column3 = createElement("div");
  column3.appendChild(createElement("strong", { text: "Hasznos linkek" }));
  const links = createElement("ul", { className: "feature-list" });
  [
    ["#inventory", "Aktuális készlet"],
    ["#financing", "Finanszírozási csomagok"],
    ["#contact", "Időpont foglalása"],
  ].forEach(([href, label]) => {
    const item = createElement("li");
    const link = createElement("a", { attrs: { href }, text: label });
    item.appendChild(link);
    links.appendChild(item);
  });
  column3.appendChild(links);

  grid.appendChild(column1);
  grid.appendChild(column2);
  grid.appendChild(column3);
  footer.appendChild(grid);
  footer.appendChild(createElement("small", { text: "© " + new Date().getFullYear() + " Megyeri Attila Autokereskedése" }));
  return footer;
}

function init() {
  appRoot.innerHTML = "";
  const sections = [
    renderHeroSection(),
    renderFeaturedSection(),
    renderInventorySection(),
    renderAboutSection(),
    renderFinancingSection(),
    renderTestimonialsSection(),
    renderContactSection(),
  ];
  sections.forEach((section) => appRoot.appendChild(section));
  appRoot.appendChild(renderFooter());
  document.body.prepend(renderNavigation());
  attachScrollHandlers(document.body);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalRoot.children.length > 0) {
    closeModal();
  }
});

init();

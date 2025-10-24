import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cars } from "../data/cars";
import InventoryFilterBar, {
  InventoryFilters,
  defaultMaxPrice
} from "../components/inventory-filter-bar";
import { CarCard } from "../components/car-card";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Car } from "../types/car";

const defaultFilters: InventoryFilters = {
  search: "",
  brand: "",
  fuelType: "",
  year: "",
  minPrice: 0,
  maxPrice: defaultMaxPrice,
  sort: "newest"
};

const InventoryPage = () => {
  const [filters, setFilters] = useState<InventoryFilters>(defaultFilters);
  const [previewCar, setPreviewCar] = useState<Car | null>(null);

  const filteredCars = useMemo(() => {
    let filtered = [...cars];

    if (filters.search.trim()) {
      filtered = filtered.filter((car) =>
        `${car.brand} ${car.model}`.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.brand) {
      filtered = filtered.filter((car) => car.brand === filters.brand);
    }

    if (filters.fuelType) {
      filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.year) {
      filtered = filtered.filter((car) => car.year.toString() === filters.year);
    }

    filtered = filtered.filter((car) => car.price >= filters.minPrice);
    if (filters.maxPrice) {
      filtered = filtered.filter((car) => car.price <= filters.maxPrice);
    }

    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "mileage-asc":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case "mileage-desc":
        filtered.sort((a, b) => b.mileage - a.mileage);
        break;
      default:
        filtered.sort((a, b) => b.year - a.year);
    }

    return filtered;
  }, [filters]);

  const handleFilterChange = (partialFilters: Partial<InventoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...partialFilters }));
  };

  const handleReset = () => setFilters(defaultFilters);

  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="py-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold text-white"
        >
          Prémium kínálatunk
        </motion.h1>
        <p className="mt-4 text-slate-300">
          Szűrje, rendezze és fedezze fel a gondosan válogatott autóinkat az igényeinek megfelelően.
        </p>
      </div>
      <InventoryFilterBar filters={filters} onChange={handleFilterChange} onReset={handleReset} />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredCars.map((car) => (
          <CarCard key={car.id} car={car} onQuickView={setPreviewCar} />
        ))}
      </div>
      {filteredCars.length === 0 && (
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-300">
          Sajnos nincs a feltételeknek megfelelő jármű. Kérjük, módosítsa a szűrőket, vagy keressen minket személyre szabott
          ajánlatért.
        </div>
      )}

      {previewCar && (
        <Dialog open onOpenChange={() => setPreviewCar(null)}>
          <DialogContent>
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <img src={previewCar.image} alt={previewCar.model} className="h-64 w-full rounded-3xl object-cover" />
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  {previewCar.brand} {previewCar.model}
                </h3>
                <p className="text-slate-300">{previewCar.description}</p>
                <ul className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                  <li>Évjárat: {previewCar.year}</li>
                  <li>Ár: {previewCar.price.toLocaleString("hu-HU")} Ft</li>
                  <li>Futás: {previewCar.mileage.toLocaleString("hu-HU")} km</li>
                  <li>Üzemanyag: {previewCar.fuelType}</li>
                  <li>Teljesítmény: {previewCar.horsepower} LE</li>
                  <li>Gyorsulás: {previewCar.acceleration} mp</li>
                </ul>
                <Button asChild variant="gradient" className="w-full">
                  <Link to={`/cars/${previewCar.id}`}>Teljes adatlap</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InventoryPage;

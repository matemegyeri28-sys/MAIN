import { cars } from "../data/cars";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { SlidersHorizontal, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export interface InventoryFilters {
  search: string;
  brand: string;
  fuelType: string;
  year: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
}

interface InventoryFilterBarProps {
  filters: InventoryFilters;
  onChange: (filters: Partial<InventoryFilters>) => void;
  onReset: () => void;
}

export const defaultMaxPrice = Math.max(...cars.map((car) => car.price)) + 1000000;
const uniqueBrands = Array.from(new Set(cars.map((car) => car.brand)));
const uniqueFuelTypes = Array.from(new Set(cars.map((car) => car.fuelType)));
const years = Array.from(new Set(cars.map((car) => car.year))).sort((a, b) => b - a);

const InventoryFilterBar = ({ filters, onChange, onReset }: InventoryFilterBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel mb-8 space-y-6 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-slate-300">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          Haladó keresési beállítások
        </div>
        <Button variant="ghost" onClick={onReset} className="text-slate-300">
          <XCircle className="mr-2 h-4 w-4" /> Szűrők törlése
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="search">Keresés</Label>
          <Input
            id="search"
            list="car-models"
            placeholder="Modell, felszereltség..."
            value={filters.search}
            onChange={(event) => onChange({ search: event.target.value })}
          />
          <datalist id="car-models">
            {cars.map((car) => (
              <option key={car.id} value={`${car.brand} ${car.model}`} />
            ))}
          </datalist>
        </div>
        <div className="space-y-2">
          <Label>Márka</Label>
          <Select value={filters.brand} onValueChange={(value) => onChange({ brand: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Összes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Összes</SelectItem>
                {uniqueBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Üzemanyag</Label>
          <Select value={filters.fuelType} onValueChange={(value) => onChange({ fuelType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Összes" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">Összes</SelectItem>
                {uniqueFuelTypes.map((fuel) => (
                  <SelectItem key={fuel} value={fuel}>
                    {fuel}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Rendezés</Label>
          <Select value={filters.sort} onValueChange={(value) => onChange({ sort: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Legújabb" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Legújabb</SelectItem>
              <SelectItem value="price-asc">Ár növekvő</SelectItem>
              <SelectItem value="price-desc">Ár csökkenő</SelectItem>
              <SelectItem value="mileage-asc">Kilométer növekvő</SelectItem>
              <SelectItem value="mileage-desc">Kilométer csökkenő</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="year">Évjárat</Label>
          <Select value={filters.year} onValueChange={(value) => onChange({ year: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Összes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Összes</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="min-price">Minimum ár (Ft)</Label>
          <Input
            id="min-price"
            type="number"
            min={0}
            step={500000}
            value={filters.minPrice}
            onChange={(event) => {
              const value = event.target.value;
              onChange({ minPrice: value ? Number(value) : 0 });
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="max-price">Maximum ár (Ft)</Label>
          <Input
            id="max-price"
            type="number"
            min={0}
            step={500000}
            value={filters.maxPrice}
            onChange={(event) => {
              const value = event.target.value;
              onChange({ maxPrice: value ? Number(value) : defaultMaxPrice });
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default InventoryFilterBar;

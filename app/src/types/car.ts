export type FuelType = "Benzin" | "Dízel" | "Elektromos" | "Plug-in hibrid";
export type Gearbox = "Automata" | "Manuális";

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  gearbox: Gearbox;
  horsepower: number;
  acceleration: number;
  consumption: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  interior: string;
  warranty: string;
}

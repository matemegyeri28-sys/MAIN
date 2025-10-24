import { Car } from "../types/car";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Gauge, Fuel, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

interface CarCardProps {
  car: Car;
  onQuickView?: (car: Car) => void;
}

export const CarCard = ({ car, onQuickView }: CarCardProps) => {
  const priceFormatter = new Intl.NumberFormat("hu-HU");

  return (
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
      <Card className="glass-panel overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="h-60 w-full rounded-2xl object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <Badge className="bg-white/10 text-white">{car.brand}</Badge>
            <Badge className="bg-white/10 text-white">{car.year}</Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl text-white">
            {car.brand} {car.model}
          </CardTitle>
          <p className="text-2xl font-semibold text-primary">
            {priceFormatter.format(car.price)} Ft
          </p>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <span className="flex items-center gap-2 text-slate-300">
              <Gauge className="h-4 w-4 text-primary" /> {car.mileage.toLocaleString("hu-HU")} km
            </span>
            <span className="flex items-center gap-2 text-slate-300">
              <Fuel className="h-4 w-4 text-primary" /> {car.fuelType}
            </span>
            <span className="flex items-center gap-2 text-slate-300">
              <Settings2 className="h-4 w-4 text-primary" /> {car.gearbox}
            </span>
            <span className="flex items-center gap-2 text-slate-300">
              <ArrowRight className="h-4 w-4 text-primary" /> {car.horsepower} LE
            </span>
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <Button asChild variant="secondary">
            <Link to={`/cars/${car.id}`} className="flex items-center gap-2 text-sm">
              Részletek
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" onClick={() => onQuickView?.(car)}>
            Gyors megtekintés
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

import { useMemo, useState } from "react";
import { cars } from "../data/cars";
import { CarCard } from "./car-card";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedShowcase = () => {
  const featuredCars = useMemo(() => cars.slice(0, 3), []);
  const [activeCarId, setActiveCarId] = useState<string | null>(null);
  const activeCar = featuredCars.find((car) => car.id === activeCarId);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="flex flex-col gap-12">
        <div className="space-y-4 text-center">
          <motion.h2
            className="text-3xl font-semibold text-white md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Válogatott kiemelt modellek
          </motion.h2>
          <p className="mx-auto max-w-2xl text-base text-slate-300">
            A legkeresettebb, ellenőrzött előéletű prémium járműveink részletes felszereltségi listával és azonnal
            elérhető finanszírozási megoldásokkal.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredCars.map((car) => (
            <CarCard key={car.id} car={car} onQuickView={() => setActiveCarId(car.id)} />
          ))}
        </div>
      </div>

      {activeCar && (
        <Dialog open onOpenChange={() => setActiveCarId(null)}>
          <DialogContent>
            <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <img
                  src={activeCar.image}
                  alt={`${activeCar.brand} ${activeCar.model}`}
                  className="h-64 w-full rounded-3xl object-cover"
                />
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                  <span>Évjárat: {activeCar.year}</span>
                  <span>Futásteljesítmény: {activeCar.mileage.toLocaleString("hu-HU")} km</span>
                  <span>Teljesítmény: {activeCar.horsepower} LE</span>
                  <span>Gyorsulás: {activeCar.acceleration} mp (0-100)</span>
                  <span>Fogyasztás: {activeCar.consumption}</span>
                  <span>Váltó: {activeCar.gearbox}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-white">
                  {activeCar.brand} {activeCar.model}
                </h3>
                <p className="text-slate-300">{activeCar.description}</p>
                <ul className="list-disc space-y-2 pl-4 text-sm text-slate-300">
                  {activeCar.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Button asChild variant="gradient" className="w-full">
                  <Link to={`/cars/${activeCar.id}`}>Teljes adatlap megnyitása</Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default FeaturedShowcase;

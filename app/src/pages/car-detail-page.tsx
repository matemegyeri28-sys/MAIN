import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { cars } from "../data/cars";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Gauge, Fuel, Rocket, Settings, ShieldCheck } from "lucide-react";

const CarDetailPage = () => {
  const { id } = useParams();
  const car = useMemo(() => cars.find((item) => item.id === id), [id]);

  if (!car) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-32 text-center text-slate-300">
        <h1 className="text-3xl font-semibold text-white">A jármű nem található</h1>
        <p className="mt-4">A keresett autó már értékesítésre került, vagy hibás hivatkozást kapott.</p>
        <Button asChild variant="gradient" className="mt-6">
          <Link to="/inventory">Vissza a kínálathoz</Link>
        </Button>
      </div>
    );
  }

  const priceFormatter = new Intl.NumberFormat("hu-HU");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl"
      >
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
          <div className="relative">
            <img src={car.image} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em]">
                {car.brand}
              </span>
              <h1 className="mt-4 text-4xl font-bold">
                {car.brand} {car.model}
              </h1>
              <p className="text-lg text-primary">{priceFormatter.format(car.price)} Ft</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 p-6">
            <div className="space-y-4 text-slate-200">
              <p>{car.description}</p>
              <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Gauge className="h-4 w-4 text-primary" /> Futás
                  </span>
                  <span>{car.mileage.toLocaleString("hu-HU")} km</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Fuel className="h-4 w-4 text-primary" /> Üzemanyag
                  </span>
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Settings className="h-4 w-4 text-primary" /> Váltó
                  </span>
                  <span>{car.gearbox}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <Rocket className="h-4 w-4 text-primary" /> Gyorsulás
                  </span>
                  <span>{car.acceleration} mp (0-100)</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Button asChild variant="gradient" className="w-full">
                <Link to="/contact">Személyes ajánlatot kérek</Link>
              </Button>
              <Button asChild variant="secondary" className="w-full">
                <Link to="/financing">Finanszírozási lehetőségek</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <Tabs defaultValue="gallery">
            <TabsList className="mb-6">
              <TabsTrigger value="gallery">Galéria</TabsTrigger>
              <TabsTrigger value="specs">Műszaki adatok</TabsTrigger>
              <TabsTrigger value="warranty">Garancia & szolgáltatások</TabsTrigger>
            </TabsList>
            <TabsContent value="gallery" className="bg-transparent p-0">
              <div className="grid gap-4 md:grid-cols-3">
                {car.gallery.map((image, index) => (
                  <motion.img
                    key={image}
                    src={image}
                    alt={`${car.model} ${index + 1}`}
                    className="h-52 w-full rounded-2xl object-cover"
                    whileHover={{ scale: 1.03 }}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="specs" className="bg-transparent p-0">
              <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-200 md:grid-cols-2">
                <div>
                  <h3 className="text-base font-semibold text-white">Teljesítmény</h3>
                  <ul className="mt-3 space-y-2">
                    <li>Teljesítmény: {car.horsepower} LE</li>
                    <li>Gyorsulás (0-100 km/h): {car.acceleration} mp</li>
                    <li>Átlagfogyasztás: {car.consumption}</li>
                    <li>Váltó: {car.gearbox}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Felszereltség</h3>
                  <ul className="mt-3 space-y-2">
                    {car.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="warranty" className="bg-transparent p-0">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
                <h3 className="text-base font-semibold text-white">Kibővített garancia</h3>
                <p className="mt-3">{car.warranty}</p>
                <p className="mt-4 text-sm text-slate-300">{car.interior}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  );
};

export default CarDetailPage;

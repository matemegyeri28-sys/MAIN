import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, Crown, ShieldCheck } from "lucide-react";

const tiers = [
  {
    name: "Prémium Finanszírozás",
    price: "0% kezdő befizetéstől",
    description:
      "Rugalmas, személyre szabott futamidők és kamatok prémium ügyfeleinknek akár 72 hónapos futamidőig.",
    features: [
      "Akár 0% önerő",
      "Gyors hitelbírálat 24 órán belül",
      "Rugalmas lezárási lehetőségek"
    ],
    icon: CheckCircle2
  },
  {
    name: "Exclusive Concierge",
    price: "Egyedi ajánlat",
    description:
      "Teljes körű ügyintézés, biztosítás, átírás és extra szolgáltatások személyes tanácsadóval.",
    features: [
      "Dedikált kapcsolattartó",
      "Soron kívüli szervizidőpont",
      "Hazaszállítás és csereautó"
    ],
    icon: Crown
  },
  {
    name: "Garancia & Védelem",
    price: "12-36 hónap",
    description:
      "Kibővített jótállási és biztosítási csomagok, hogy prémium autója mindig kifogástalan maradjon.",
    features: [
      "Teljes körű garancia",
      "Assistance szolgáltatás 0-24",
      "Smart repair és fényezés védelem"
    ],
    icon: ShieldCheck
  }
];

const FinancingOptions = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">Finanszírozási és előfizetési csomagok</h2>
        <p className="mt-4 text-slate-300">
          Egyedi igényekhez igazított konstrukciók, prémium szolgáltatáscsomagokkal kiegészítve.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier, index) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="glass-panel h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-primary/20 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <CardTitle className="text-xl text-white">{tier.name}</CardTitle>
                  </div>
                  <p className="mt-3 text-sm uppercase tracking-[0.3em] text-primary/80">{tier.price}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-300">{tier.description}</p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary" /> {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="gradient" className="w-full">
                    Ajánlatot kérek
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default FinancingOptions;

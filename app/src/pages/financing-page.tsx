import FinancingOptions from "../components/financing-options";
import { motion } from "framer-motion";
import { Calculator, PercentCircle, FileCheck, Wallet } from "lucide-react";

const steps = [
  {
    icon: Calculator,
    title: "Személyre szabott kalkuláció",
    description: "Elemzünk minden részletet, hogy a futamidő, kamat és önerő igazodjon az Ön terveihez."
  },
  {
    icon: FileCheck,
    title: "Gyors hitelbírálat",
    description: "Digitalizált folyamatokkal 24 órán belül visszajelzést kap a finanszírozási döntésről."
  },
  {
    icon: PercentCircle,
    title: "Rugalmas kondíciók",
    description: "Fix és változó kamatozás, maradványértékes konstrukciók, valamint céges finanszírozás."
  },
  {
    icon: Wallet,
    title: "Extra szolgáltatások",
    description: "Biztosítás, casco, assistance, smart repair és csereautó – mind egy helyen."
  }
];

const FinancingPage = () => {
  return (
    <div className="space-y-20">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm uppercase tracking-[0.4em] text-primary">Finanszírozás</p>
            <h1 className="mt-4 text-4xl font-bold text-white">Prémium finanszírozási és előfizetési megoldások</h1>
            <p className="mt-6 text-slate-300">
              Több mint 15 pénzintézeti partnerrel dolgozunk, hogy az Ön számára legelőnyösebb konstrukciót biztosíthassuk.
              Legyen szó magánszemélyről vagy céges flottáról, személyre szabott ajánlatot készítünk.
            </p>
            <p className="mt-4 text-slate-300">
              Szolgáltatásaink közé tartozik az előminősítés, beszámítás, maradványértékes konstrukciók, operatív lízing és
              előfizetéses autóhasználat. Mindezt teljes körű ügyintézéssel, digitális aláírással és transzparens feltételekkel
              biztosítjuk.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8 text-slate-300"
          >
            <h3 className="text-lg font-semibold text-white">Mit tartalmaz a VIP finanszírozási csomag?</h3>
            <ul className="mt-4 space-y-3">
              <li>✔ Egyedi kamatfixálás akár 5 évre</li>
              <li>✔ Csereautó biztosítása ügyintézés idejére</li>
              <li>✔ Smart repair szolgáltatás évente 2 alkalommal</li>
              <li>✔ Magyarországon belüli sofőrszolgálat</li>
            </ul>
          </motion.div>
        </div>
      </section>
      <FinancingOptions />
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-8 text-3xl font-semibold text-white">Finanszírozási folyamat lépései</h2>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel p-6"
              >
                <span className="inline-flex rounded-full bg-primary/15 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FinancingPage;

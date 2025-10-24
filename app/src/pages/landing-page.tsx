import Hero from "../components/hero";
import FeaturedShowcase from "../components/featured-showcase";
import FinancingOptions from "../components/financing-options";
import Testimonials from "../components/testimonials";
import { motion } from "framer-motion";
import { Shield, GaugeCircle, Handshake, Stars } from "lucide-react";
import { Link } from "react-router-dom";

const valueProps = [
  {
    icon: Shield,
    title: "Hiteles előélet",
    description: "Minden jármű átvizsgálva, dokumentált szerviztörténettel és garancia opcióval."
  },
  {
    icon: GaugeCircle,
    title: "Prémium kiszolgálás",
    description: "Dedikált tanácsadó kíséri végig az autó kiválasztásától a finanszírozásig."
  },
  {
    icon: Handshake,
    title: "Teljes ügyintézés",
    description: "Biztosítás, átírás, beszámítás és szerviz - mindent intézünk Ön helyett."
  },
  {
    icon: Stars,
    title: "Exkluzív élmény",
    description: "Lounge hangulatú bemutatóterem, személyre szabott próbautak, prémium élmények."
  }
];

const LandingPage = () => {
  return (
    <div className="space-y-24">
      <Hero />
      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {valueProps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-panel h-full p-6"
              >
                <span className="inline-flex rounded-full bg-primary/15 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
      <FeaturedShowcase />
      <Testimonials />
      <FinancingOptions />
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="glass-panel flex flex-col items-center gap-6 rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-semibold text-white">Foglaljon VIP bemutató időpontot!</h3>
          <p className="max-w-2xl text-slate-300">
            Tapasztalja meg személyesen a prémium kiszolgálást és próbálja ki kedvenc modelljét exkluzív környezetben.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-rose-500 px-10 py-3 text-sm font-semibold text-white shadow-xl transition hover:scale-105"
          >
            Kapcsolatfelvétel
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

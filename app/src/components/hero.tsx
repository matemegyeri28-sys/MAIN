import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-24 text-center md:py-32"
      >
        <motion.div
          animate={{
            backgroundPositionX: ["0%", "100%"],
            backgroundPositionY: ["0%", "100%"]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.4em] text-slate-200"
        >
          Megbízhatóság, minőség, szakértelem
        </motion.div>
        <motion.h1
          className="text-4xl font-bold leading-tight text-white md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Megbízhatóság, Minőség, Szakértelem – Megyeri Attila Autokereskedése
        </motion.h1>
        <motion.p
          className="max-w-3xl text-lg text-slate-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Prémium és válogatott járműveket kínálunk átlátható előélettel, teljes körű finanszírozással
          és személyre szabott szolgáltatásokkal. Fedezze fel a flottát, amely valóban Önről szól.
        </motion.p>
        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button asChild size="lg" variant="gradient" className="shadow-xl">
            <Link to="/inventory" className="flex items-center gap-2">
              Fedezze fel a kínálatot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="bg-white/10">
            <Link to="/about" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" /> Ismerje meg a történetünket
            </Link>
          </Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
      />
    </section>
  );
};

export default Hero;

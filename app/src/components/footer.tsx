import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-slate-950/80 py-12 text-sm text-slate-400"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Megyeri Attila Autokereskedése</h3>
            <p>
              Megbízható partner prémium és válogatott járművek beszerzésében, testreszabott
              finanszírozással és teljes körű ügyintézéssel.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:-translate-y-1 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-white">Oldalak</h4>
            <nav className="flex flex-col gap-2">
              <Link className="transition hover:text-primary" to="/">Kezdőlap</Link>
              <Link className="transition hover:text-primary" to="/inventory">Kínálat</Link>
              <Link className="transition hover:text-primary" to="/about">Rólunk</Link>
              <Link className="transition hover:text-primary" to="/financing">Finanszírozás</Link>
              <Link className="transition hover:text-primary" to="/contact">Kapcsolat</Link>
            </nav>
          </div>
          <div className="space-y-3">
            <h4 className="text-white">Elérhetőségek</h4>
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> +36 30 555 1122
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> info@megyeriautoker.hu
              </span>
              <span className="flex items-start gap-2">
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                1138 Budapest, Váci út 168.
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-white">Nyitvatartás</h4>
            <p>Hétfő - Péntek: 09:00 - 18:00</p>
            <p>Szombat: 10:00 - 14:00</p>
            <p>Vasárnap: előzetes egyeztetés alapján</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row"
        >
          <span>© {new Date().getFullYear()} Megyeri Attila Autokereskedése. Minden jog fenntartva.</span>
          <span className="italic text-slate-500">Megbízhatóság, minőség, szakértelem.</span>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

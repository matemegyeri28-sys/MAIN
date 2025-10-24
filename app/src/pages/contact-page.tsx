import ContactForm from "../components/contact-form";
import ContactMap from "../components/contact-map";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold text-white"
        >
          Lépjen kapcsolatba velünk
        </motion.h1>
        <p className="mt-4 text-slate-300">
          Foglaljon személyes konzultációt, kérjen finanszírozási ajánlatot vagy érdeklődjön aktuális modelljeinkről.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="glass-panel p-8">
          <ContactForm />
        </div>
        <div className="space-y-6">
          <div className="glass-panel space-y-4 p-6 text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-white">Bemutatóterem</p>
                <p>1138 Budapest, Váci út 168.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-white">Telefon</p>
                <a href="tel:+36305551122" className="text-slate-300 hover:text-primary">
                  +36 30 555 1122
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-white">E-mail</p>
                <a href="mailto:info@megyeriautoker.hu" className="text-slate-300 hover:text-primary">
                  info@megyeriautoker.hu
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold text-white">Nyitvatartás</p>
                <p>Hétfő - Péntek: 09:00 - 18:00</p>
                <p>Szombat: 10:00 - 14:00</p>
                <p>Vasárnap: előzetes egyeztetéssel</p>
              </div>
            </div>
          </div>
          <ContactMap />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

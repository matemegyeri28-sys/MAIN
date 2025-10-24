import { motion } from "framer-motion";
import { ShieldCheck, Users, Award, Globe } from "lucide-react";

const milestones = [
  {
    year: "2005",
    title: "Alapítás",
    description:
      "Megyeri Attila a prémium autók iránti szenvedélyére építve megnyitja első bemutatótermét Budapest szívében."
  },
  {
    year: "2012",
    title: "Nemzetközi partnerhálózat",
    description:
      "Német, svájci és olasz márkakereskedőkkel kialakított kapcsolatoknak köszönhetően még szélesebb kínálat."
  },
  {
    year: "2018",
    title: "Prémium szolgáltatásközpont",
    description:
      "Teljes körű concierge szolgáltatás: finanszírozás, biztosítás, beszámítás, exkluzív ügyfélprogramok."
  },
  {
    year: "2023",
    title: "Elektromos mobilitás",
    description:
      "Dedikált e-mobilitási csapat tanácsadással, töltőinfrastruktúra-kiépítéssel és flottakezeléssel."
  }
];

const values = [
  {
    icon: ShieldCheck,
    title: "Átláthatóság",
    description: "Minden autó dokumentált múlttal, gyári szerviztörténettel és részletes állapotfelméréssel érkezik."
  },
  {
    icon: Users,
    title: "Ügyfélélmény",
    description: "Dedikált tanácsadók, lounge hangulat, személyre szabott próbautak és exkluzív események."
  },
  {
    icon: Award,
    title: "Minőség",
    description: "Csak prémium vagy válogatott állapotú járműveket kínálunk, független szakértői tanúsítással."
  },
  {
    icon: Globe,
    title: "Nemzetközi jelenlét",
    description: "Európa-szerte válogatott partnerek, export-import ügyintézés és flottakövetés."
  }
];

const AboutPage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-6 py-16">
      <section className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm uppercase tracking-[0.4em] text-primary">Rólunk</p>
          <h1 className="mt-4 text-4xl font-bold text-white">Prémium autókereskedelem 20 év tapasztalattal</h1>
          <p className="mt-6 text-slate-300">
            Megyeri Attila Autokereskedése több mint két évtizede szolgálja ki a hazai és nemzetközi ügyfeleket.
            Filozófiánk egyszerű: a megbízhatóság, a minőség és a szakértelem találkozása minden egyes járműben és
            ügyfélkapcsolatban.
          </p>
          <p className="mt-4 text-slate-300">
            Csapatunk minden tagja szenvedélyesen szereti az autókat, és törekszik arra, hogy az Ön autóvásárlási élménye
            végig prémium maradjon. Legyen szó egy álomautó beszerzéséről, flottakezelésről vagy befektetésről, partnerként
            támogatjuk terveit.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel flex flex-col justify-between gap-6 p-8"
        >
          <div>
            <h3 className="text-lg font-semibold text-white">Miért válasszon minket?</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>✔ Több mint 1200 átadott prémium jármű</li>
              <li>✔ 4.9 ★ ügyfél-elégedettség</li>
              <li>✔ Nemzetközi beszerzési hálózat</li>
              <li>✔ Testreszabott finanszírozási konstrukciók</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            “A célom mindig is az volt, hogy ügyfeleink egy kézből kapjanak mindent: a válogatott járműveket,
            a finanszírozást és a prémium szolgáltatást. Ez a filozófia tesz minket különlegessé.” – <span className="font-semibold text-white">Megyeri Attila</span>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        {values.map((value, index) => {
          const Icon = value.icon;
          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-panel p-6"
            >
              <span className="inline-flex rounded-full bg-primary/15 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-white">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{value.description}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="glass-panel space-y-8 p-10">
        <h2 className="text-3xl font-semibold text-white">Mérföldköveink</h2>
        <div className="space-y-6">
          {milestones.map((milestone) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-2 border-l-2 border-primary/50 pl-6"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary">{milestone.year}</span>
              <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
              <p className="text-sm text-slate-300">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

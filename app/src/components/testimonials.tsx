import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kovács Gergely",
    role: "Audi RS7 tulajdonos",
    quote:
      "Az autó állapota hibátlan, a teljes ügyintézés gördülékeny volt. A finanszírozási lehetőségeket személyre szabták, minden kérdésre azonnali választ kaptam.",
    rating: 5
  },
  {
    name: "Szabó Zsófia",
    role: "BMW i4 tulajdonos",
    quote:
      "Megbízható, őszinte csapat. Az elektromos autókhoz kapcsolódó támogatásban és a töltési infrastruktúra kiépítésében is segítettek.",
    rating: 5
  },
  {
    name: "Nagy László",
    role: "Mercedes-Benz S-osztály tulajdonos",
    quote:
      "Igazi prémium élmény az első pillanattól. A próbautatól kezdve a papírmunkáig minden profi módon zajlott, külön köszönet a személyes figyelemért.",
    rating: 4.5
  }
];

const Testimonials = () => {
  return (
    <section className="bg-slate-950/70 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">Ügyfeleink véleménye</h2>
          <p className="mt-4 text-slate-300">
            Büszkék vagyunk rá, hogy ügyfeleink szerint is a megbízhatóság és a minőség a legfőbb értékeink.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel h-full p-6"
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i + 1 <= Math.floor(testimonial.rating) ? "fill-current" : ""}`} />
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-300">“{testimonial.quote}”</p>
              <div className="mt-6">
                <p className="text-base font-semibold text-white">{testimonial.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

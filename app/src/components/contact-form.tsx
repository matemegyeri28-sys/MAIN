import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

const ContactForm = () => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Partial<FormState> = {};
    if (!values.name.trim()) newErrors.name = "Kérjük, adja meg a nevét.";
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Érvényes e-mail címet adjon meg.";
    if (!values.phone.match(/^\+?[0-9\s-]{7,}$/)) newErrors.phone = "Érvényes telefonszám szükséges.";
    if (values.message.trim().length < 10) newErrors.message = "Az üzenet legyen legalább 10 karakter.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setValues(initialState);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Név</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Teljes neve"
          />
          {errors.name && <p className="text-xs text-rose-400">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="nev@example.com"
          />
          {errors.email && <p className="text-xs text-rose-400">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            value={values.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            placeholder="+36 30 123 4567"
          />
          {errors.phone && <p className="text-xs text-rose-400">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Érdeklődés tárgya</Label>
          <Input id="service" placeholder="Pl. Finanszírozás, beszámítás" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Üzenet</Label>
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(event) => handleChange("message", event.target.value)}
          placeholder="Írja le elképzeléseit, kérdéseit..."
        />
        {errors.message && <p className="text-xs text-rose-400">{errors.message}</p>}
      </div>
      <Button type="submit" variant="gradient" className="w-full md:w-auto">
        Üzenet küldése
      </Button>
      {submitted && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-emerald-400"
        >
          Köszönjük megkeresését! 24 órán belül felvesszük Önnel a kapcsolatot.
        </motion.p>
      )}
    </motion.form>
  );
};

export default ContactForm;

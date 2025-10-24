import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Car, Menu, PhoneCall } from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { to: "/", label: "Kezdőlap" },
  { to: "/inventory", label: "Kínálat" },
  { to: "/about", label: "Rólunk" },
  { to: "/financing", label: "Finanszírozás" },
  { to: "/contact", label: "Kapcsolat" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-1 items-center justify-between rounded-full border border-white/10 bg-slate-900/70 px-6 py-3 backdrop-blur-2xl"
        >
          <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
            <span className="rounded-full bg-primary/20 p-2 text-primary shadow-lg shadow-blue-500/30">
              <Car className="h-5 w-5" />
            </span>
            Megyeri Attila Autokereskedése
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition hover:text-primary",
                    isActive ? "text-primary" : "text-slate-200"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button asChild variant="gradient" className="hidden lg:inline-flex">
              <Link to="/contact" className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4" />
                Időpont egyeztetés
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Menü"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/10 bg-slate-900/80 px-6 py-4 backdrop-blur-2xl lg:hidden"
          >
            <nav className="flex flex-col gap-3 text-sm">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-2xl px-4 py-3 font-medium transition hover:bg-white/10",
                      isActive || location.pathname === link.to
                        ? "bg-primary/20 text-primary"
                        : "text-slate-200"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Button asChild variant="gradient" className="w-full">
                <Link to="/contact" className="flex items-center justify-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Időpont egyeztetés
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;

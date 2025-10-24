import { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import Footer from "./footer";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="pt-24 pb-16"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

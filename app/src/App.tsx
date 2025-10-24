import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import LandingPage from "./pages/landing-page";
import InventoryPage from "./pages/inventory-page";
import CarDetailPage from "./pages/car-detail-page";
import AboutPage from "./pages/about-page";
import ContactPage from "./pages/contact-page";
import FinancingPage from "./pages/financing-page";
import ScrollToTop from "./components/scroll-to-top";

const App = () => {
  return (
    <ScrollToTop>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/financing" element={<FinancingPage />} />
        </Routes>
      </AppLayout>
    </ScrollToTop>
  );
};

export default App;

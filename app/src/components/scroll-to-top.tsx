import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return children;
};

export default ScrollToTop;

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToTop } from "@/utils";

export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    scrollToTop(false);
  }, [pathname, search]);

  return null;
}

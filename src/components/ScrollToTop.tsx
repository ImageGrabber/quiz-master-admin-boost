import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    const restoreScrollY = (state as { restoreScrollY?: number } | null)?.restoreScrollY;
    if (typeof restoreScrollY === "number") return;
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}

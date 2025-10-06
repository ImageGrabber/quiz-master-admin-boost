import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    
    const trackPageView = async () => {
      try {
        const { error } = await supabase
          .from("page_views")
          .insert({ page: location.pathname });
        
        if (error) {
          console.error("Page view tracking error:", error);
        } else {
          console.log("Page view tracked:", location.pathname);
        }
      } catch (err) {
        console.error("Page view tracking failed:", err);
      }
    };
    
    trackPageView();
  }, [location.pathname]);
} 
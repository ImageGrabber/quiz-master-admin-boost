import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageView() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    
    const trackPageView = async () => {
      try {
        // Get IP address from a public service
        let ipAddress = null;
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          ipAddress = data.ip;
        } catch (ipError) {
          console.warn("Could not fetch IP address:", ipError);
        }

        const { error } = await supabase
          .from("page_views")
          .insert({ 
            page: location.pathname,
            ip_address: ipAddress
          });
        
        if (error) {
          console.error("Page view tracking error:", error);
        } else {
          console.log("Page view tracked:", location.pathname, "from IP:", ipAddress);
        }
      } catch (err) {
        console.error("Page view tracking failed:", err);
      }
    };
    
    trackPageView();
  }, [location.pathname]);
} 
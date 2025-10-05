import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatWidget = () => {
  const location = useLocation();

  useEffect(() => {
    // Only load Tidio chat on homepage
    const isHomepage = location.pathname === '/';
    const isAllowedPage = isHomepage;

    if (isAllowedPage) {
      // Load Tidio chat script
      const script = document.createElement('script');
      script.src = '//code.tidio.co/enkm7pw3z2k1zidnow6e2wj9fdt7jwo2.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        // Clean up script when component unmounts
        const existingScript = document.querySelector('script[src*="tidio.co"]');
        if (existingScript) {
          existingScript.remove();
        }
      };
    }
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default ChatWidget;

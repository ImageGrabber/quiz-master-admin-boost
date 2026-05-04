import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import './index.css'
import AppPreloader from "@/components/AppPreloader";
import { initMixpanel } from "@/lib/mixpanel";

Sentry.init({
  dsn: "https://fa0cf97a7293fc23db237665294745af@o4510354809225217.ingest.us.sentry.io/4510354810077184",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

console.log("React application starting...");
initMixpanel();

window.addEventListener('error', (event) => {
  console.error("Global error caught:", event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

const container = document.getElementById("root");
if (!container) {
  console.error("Root element not found!");
} else {
  const root = createRoot(container);

  root.render(<AppPreloader message="Loading Wesbite..." />);

  import('./App.tsx')
    .then(({ default: App }) => {
      root.render(
        <Sentry.ErrorBoundary fallback={<div style={{ padding: "24px", fontFamily: "Jost, sans-serif" }}>Something went wrong while loading this page. Please refresh and try again.</div>}>
          <App />
        </Sentry.ErrorBoundary>
      );
      console.log("React application rendered to root.");
    })
    .catch((error) => {
      console.error("Failed to load App module:", error);
      root.render(
        <AppPreloader message="We hit a loading issue. Please refresh to continue." />
      );
    });
}

import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import App from './App.tsx'
import './index.css'

Sentry.init({
  dsn: "https://fa0cf97a7293fc23db237665294745af@o4510354809225217.ingest.us.sentry.io/4510354810077184",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

console.log("React application starting...");

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
  root.render(<App />);
  console.log("React application rendered to root.");
}

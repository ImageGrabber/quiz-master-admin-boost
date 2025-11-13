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

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

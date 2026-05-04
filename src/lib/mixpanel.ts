declare global {
  interface Window {
    mixpanel?: {
      init: (token: string, config?: Record<string, unknown>) => void;
      track: (eventName: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string) => void;
      register: (properties: Record<string, unknown>) => void;
      people?: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
  }
}

const MIXPANEL_TOKEN = "61d23c921e3fc6d366e6c5f96dcb05a9";
const MIXPANEL_CDN_SRC = "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
let initialized = false;

function loadMixpanelScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    if (window.mixpanel) {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${MIXPANEL_CDN_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => resolve(), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = MIXPANEL_CDN_SRC;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}

export async function initMixpanel(): Promise<void> {
  if (initialized || typeof window === "undefined") return;

  await loadMixpanelScript();
  if (!window.mixpanel) return;

  window.mixpanel.init(MIXPANEL_TOKEN, {
    track_pageview: false,
    persistence: "localStorage",
    autocapture: true,
  });

  window.mixpanel.register({
    app_name: "Bible Quiz Competition",
    app_env: import.meta.env.MODE,
  });

  initialized = true;
}

export function trackMixpanelEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.mixpanel) return;
  window.mixpanel.track(eventName, properties);
}

export function identifyMixpanelUser(distinctId: string, peopleProps?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !window.mixpanel || !distinctId) return;
  window.mixpanel.identify(distinctId);
  if (peopleProps && window.mixpanel.people) {
    window.mixpanel.people.set(peopleProps);
  }
}

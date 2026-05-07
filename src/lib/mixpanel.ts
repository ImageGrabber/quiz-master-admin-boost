import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = "61d23c921e3fc6d366e6c5f96dcb05a9";
let initialized = false;

const queuedEvents: Array<{ eventName: string; properties?: Record<string, unknown> }> = [];
let queuedIdentity: { distinctId: string; peopleProps?: Record<string, unknown> } | null = null;

export async function initMixpanel(): Promise<void> {
  if (initialized || typeof window === "undefined") return;

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: true,
    record_sessions_percent: 100,
    track_pageview: true,
    persistence: "localStorage",
    api_host: "https://api-js.mixpanel.com",
    debug: import.meta.env.MODE !== "production",
  });

  mixpanel.register({
    app_name: "Bible Quiz Competition",
    app_env: import.meta.env.MODE,
  });

  initialized = true;

  if (queuedIdentity) {
    mixpanel.identify(queuedIdentity.distinctId);
    if (queuedIdentity.peopleProps) {
      mixpanel.people.set(queuedIdentity.peopleProps);
    }
    queuedIdentity = null;
  }

  while (queuedEvents.length > 0) {
    const next = queuedEvents.shift();
    if (!next) break;
    mixpanel.track(next.eventName, next.properties);
  }
}

export function trackMixpanelEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (!eventName || typeof window === "undefined") return;

  if (!initialized) {
    queuedEvents.push({ eventName, properties });
    return;
  }

  mixpanel.track(eventName, properties);
}

export function identifyMixpanelUser(distinctId: string, peopleProps?: Record<string, unknown>): void {
  if (typeof window === "undefined" || !distinctId) return;

  if (!initialized) {
    queuedIdentity = { distinctId, peopleProps };
    return;
  }

  mixpanel.identify(distinctId);
  if (peopleProps) {
    mixpanel.people.set(peopleProps);
  }
}

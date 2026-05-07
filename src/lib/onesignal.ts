const ALLOWED_HOSTS = new Set(["biblequizcompetition.com", "www.biblequizcompetition.com"]);

function getOneSignal(): any | null {
  if (typeof window === "undefined") return null;
  return (window as any).OneSignal ?? null;
}

export function isOneSignalEnabledHost(): boolean {
  if (typeof window === "undefined") return false;
  return ALLOWED_HOSTS.has(window.location.hostname);
}

export async function getOneSignalPermission(): Promise<string | null> {
  if (!isOneSignalEnabledHost()) return null;
  const oneSignal = getOneSignal();
  if (!oneSignal) return null;

  if (typeof oneSignal.getNotificationPermission === "function") {
    return oneSignal.getNotificationPermission();
  }

  const permission = oneSignal.Notifications?.permission;
  if (typeof permission === "boolean") return permission ? "granted" : "default";
  if (typeof permission === "string") return permission;

  if (typeof Notification !== "undefined") return Notification.permission;
  return null;
}

export async function getOneSignalUserId(): Promise<string | null> {
  if (!isOneSignalEnabledHost()) return null;
  const oneSignal = getOneSignal();
  if (!oneSignal) return null;

  if (typeof oneSignal.getUserId === "function") {
    return oneSignal.getUserId();
  }

  const id = oneSignal.User?.onesignalId ?? oneSignal.User?.PushSubscription?.id ?? null;
  return typeof id === "string" && id.length > 0 ? id : null;
}

export async function promptOneSignalNotifications(): Promise<void> {
  if (!isOneSignalEnabledHost()) return;
  const oneSignal = getOneSignal();
  if (!oneSignal) return;

  if (typeof oneSignal.showNativePrompt === "function") {
    await oneSignal.showNativePrompt();
    return;
  }

  if (typeof oneSignal.Notifications?.requestPermission === "function") {
    await oneSignal.Notifications.requestPermission();
  }
}

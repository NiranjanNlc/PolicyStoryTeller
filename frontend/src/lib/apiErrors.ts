import type { Strings } from "../i18n";

export function friendlyApiError(message: string, t: Strings): string {
  const m = message.toLowerCase();
  if (m.includes("429") || m.includes("rate limit") || m.includes("too many requests")) {
    return t.errorRateLimit;
  }
  if (
    m.includes("503") ||
    m.includes("502") ||
    m.includes("bad gateway") ||
    m.includes("unavailable")
  ) {
    return t.errorProviderBusy;
  }
  if (m.includes("fetch") || m.includes("network") || m.includes("failed to fetch")) {
    return t.errorNetwork;
  }
  if (m.includes("openrouter") || m.includes("api key")) {
    return t.errorProviderConfig;
  }
  if (message.length > 200) {
    return t.errorGeneric;
  }
  return message;
}

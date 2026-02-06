/**
 * UTM Parameter Capture & Storage for RestoreSTL
 *
 * Reads utm_source, utm_medium, utm_campaign, utm_content, utm_term
 * from URL query params and persists them in localStorage.
 *
 * Also sets UTM values as Crisp session data so the chat webhook
 * can read them when qualifying leads (TICKET-012).
 */

export interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

const UTM_KEYS: (keyof UTMParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

const STORAGE_KEY = "restorestl_utm";

/**
 * Capture UTM params from the current URL and save to localStorage.
 * Call this on page load (e.g. in layout.tsx or a client component).
 *
 * Only overwrites stored values if at least one UTM param is present
 * in the current URL — otherwise previous UTMs are preserved.
 */
export function captureUTMs(): UTMParams {
  if (typeof window === "undefined") {
    return emptyUTMs();
  }

  const params = new URLSearchParams(window.location.search);
  const hasAny = UTM_KEYS.some((k) => params.has(k));

  if (hasAny) {
    const utms: UTMParams = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(utms));
    } catch {
      // localStorage unavailable (SSR, private mode) — ignore
    }
    return utms;
  }

  // No UTMs in URL — return previously stored values
  return getStoredUTMs();
}

/**
 * Retrieve UTM values from localStorage.
 */
export function getStoredUTMs(): UTMParams {
  if (typeof window === "undefined") return emptyUTMs();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UTMParams;
  } catch {
    // ignore parse / access errors
  }
  return emptyUTMs();
}

/**
 * Push stored UTMs into the Crisp session so the chat webhook
 * can read them from conversation metadata.
 *
 * Safe to call before Crisp loads — will silently no-op.
 */
export function syncUTMsToCrisp(): void {
  if (typeof window === "undefined") return;

  const utms = getStoredUTMs();

  // $crisp is the Crisp JS SDK global
  const crisp = (window as unknown as Record<string, unknown>).$crisp;
  if (!crisp || !Array.isArray(crisp)) return;

  try {
    const pairs: [string, string][] = [];
    if (utms.utm_source) pairs.push(["utm_source", utms.utm_source]);
    if (utms.utm_medium) pairs.push(["utm_medium", utms.utm_medium]);
    if (utms.utm_campaign) pairs.push(["utm_campaign", utms.utm_campaign]);
    if (utms.utm_content) pairs.push(["utm_content", utms.utm_content]);
    if (utms.utm_term) pairs.push(["utm_term", utms.utm_term]);

    if (pairs.length > 0) {
      (crisp as unknown[]).push(["set", "session:data", [pairs]]);
    }
  } catch {
    // Crisp not ready yet — ignore
  }
}

function emptyUTMs(): UTMParams {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };
}

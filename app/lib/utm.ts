/**
 * UTM Parameter Capture & Storage for RestoreSTL
 *
 * Reads utm_source, utm_medium, utm_campaign, utm_content, utm_term
 * from URL query params and persists them in localStorage.
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

function emptyUTMs(): UTMParams {
  return {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };
}

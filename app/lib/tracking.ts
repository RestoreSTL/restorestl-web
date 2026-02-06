/**
 * Tracking events for RestoreSTL (TICKET-014)
 *
 * GTM dataLayer pushes — Chris configures triggers in GTM.
 * Meta Pixel events mapped from custom event names.
 *
 * Usage:
 *   import { trackValuationRequested } from '@/app/lib/tracking';
 *   trackValuationRequested("123 Main St, St. Louis, MO");
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
  }
}

/**
 * Push a custom event to GTM dataLayer and (optionally) fire a
 * mapped Meta Pixel standard event.
 */
export function trackEvent(
  event: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;

  // Google Tag Manager dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  // Meta Pixel (if loaded)
  if (typeof window.fbq === "function") {
    const metaMap: Record<string, string> = {
      valuation_requested: "Lead",
      chat_opened: "Contact",
      booking_completed: "Schedule",
    };
    const metaEvent = metaMap[event];
    if (metaEvent) {
      window.fbq("track", metaEvent, params);
    }
  }
}

// ── Specific event helpers ──────────────────────────────────────────

export function trackValuationRequested(address: string): void {
  trackEvent("valuation_requested", { address });
}

export function trackChatOpened(source: string): void {
  trackEvent("chat_opened", { source });
}

export function trackBookingCompleted(address: string, score: number): void {
  trackEvent("booking_completed", { address, score });
}

export function trackPageView(page: string): void {
  trackEvent("page_view", { page });
}

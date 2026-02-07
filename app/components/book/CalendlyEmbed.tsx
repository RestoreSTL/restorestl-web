'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function CalendlyEmbed() {
  useEffect(() => {
    // Fire page-viewed event
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'book_page_viewed' });

    // Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for Calendly booking completion
    function handleMessage(e: MessageEvent) {
      if (
        e.origin === 'https://calendly.com' &&
        e.data?.event === 'calendly.event_scheduled'
      ) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'calendly_booking_completed' });
      }
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      // Clean up injected elements
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget"
      data-url="https://calendly.com/chris-restorestl/15min?hide_gdpr_banner=1&hide_landing_page_details=1"
      style={{ minWidth: '320px', height: '700px' }}
    />
  );
}

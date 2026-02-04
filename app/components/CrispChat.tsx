'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

export default function CrispChat() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Crisp
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID || '';

    // Load Crisp script
    const script = document.createElement('script');
    script.src = 'https://client.crisp.chat/l.js';
    script.async = true;
    document.head.appendChild(script);

    // Set session data and brand styling once script loads
    script.onload = () => {
      // Brand Styling - RestoreSTL Yellow
      window.$crisp.push(['set', 'color:theme', ['#F59E0B']]);

      // Check for property address in session storage (from WMHW widget)
      const propertyAddress = sessionStorage.getItem('property_address');

      if (propertyAddress) {
        window.$crisp.push(['set', 'session:data', [[
          ['property_address', propertyAddress],
          ['page', pathname]
        ]]]);
      } else {
        window.$crisp.push(['set', 'session:data', [[
          ['page', pathname]
        ]]]);
      }
    };

    // Cleanup on unmount
    return () => {
      // Script cleanup handled by Next.js
    };
  }, []);

  // Page-specific greeting messages
  useEffect(() => {
    if (typeof window === 'undefined' || !window.$crisp) return;

    // Clear any previous timeouts
    const timeouts: NodeJS.Timeout[] = [];

    if (pathname === '/') {
      // Home page - show greeting after 30 seconds
      const homeTimeout = setTimeout(() => {
        if (window.$crisp && Array.isArray(window.$crisp)) {
          window.$crisp.push(['do', 'message:show', [
            'text',
            "Hey! 👋 Wondering how we buy houses? I'm here to walk you through it – no pressure, just answers."
          ]]);
        }
      }, 30000);
      timeouts.push(homeTimeout);
    }

    if (pathname === '/sell') {
      // Sell page - show greeting after 45 seconds (only if WMHW not completed)
      // Note: Chat auto-opens with context after WMHW completion via WMHWWidget
      const sellTimeout = setTimeout(() => {
        // Only show generic greeting if user hasn't completed WMHW
        const wmhwCompleted = sessionStorage.getItem('wmhw_completed');
        if (!wmhwCompleted && window.$crisp && Array.isArray(window.$crisp)) {
          window.$crisp.push(['do', 'message:show', [
            'text',
            "Hey! 👋 I'm here to help you understand your options. Enter your address above to get started!"
          ]]);
        }
      }, 45000);
      timeouts.push(sellTimeout);
    }

    // Cleanup timeouts on pathname change
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [pathname]);

  // This component doesn't render anything visible
  return null;
}

/// <reference types="@types/google.maps" />

// This file ensures TypeScript recognizes Google Maps types.
// The actual types come from the Google Maps JavaScript API loaded at runtime.

export {};

declare global {
  namespace google.maps {
    namespace places {
      class Autocomplete {
        constructor(input: HTMLInputElement, opts?: {
          componentRestrictions?: { country: string | string[] };
          types?: string[];
          fields?: string[];
        });
        addListener(event: 'place_changed', handler: () => void): void;
        getPlace(): {
          address_components?: Array<{
            long_name: string;
            short_name: string;
            types: string[];
          }>;
          formatted_address?: string;
        };
      }
    }
    namespace event {
      function clearInstanceListeners(instance: object): void;
    }
  }
}

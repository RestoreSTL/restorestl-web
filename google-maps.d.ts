/// <reference types="@types/google.maps" />

// This file ensures TypeScript recognizes Google Maps types.
// The actual types come from the Google Maps JavaScript API loaded at runtime.

export {};

declare global {
  namespace google.maps {
    namespace places {
      class Autocomplete {
        constructor(input: HTMLInputElement, opts?: AutocompleteOptions);
        getPlace(): PlaceResult;
        addListener(event: string, handler: () => void): void;
      }
      interface AutocompleteOptions {
        types?: string[];
        componentRestrictions?: { country: string | string[] };
        fields?: string[];
      }
      interface PlaceResult {
        address_components?: AddressComponent[];
        formatted_address?: string;
      }
      interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
      }
    }
    namespace event {
      function clearInstanceListeners(instance: object): void;
    }
  }
}

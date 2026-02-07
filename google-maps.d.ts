/// <reference types="@types/google.maps" />

// This file ensures TypeScript recognizes Google Maps types.
// The actual types come from the Google Maps JavaScript API loaded at runtime.

export {};

declare global {
  namespace google.maps {
    function importLibrary(name: string): Promise<any>;
    interface PlacesLibrary {
      PlaceAutocompleteElement: new (opts?: any) => PlaceAutocompleteElement;
    }
    interface PlaceAutocompleteElement extends HTMLElement {
      addEventListener(type: 'gmp-placeselect', listener: (e: any) => void): void;
    }
    namespace event {
      function clearInstanceListeners(instance: object): void;
    }
  }
}

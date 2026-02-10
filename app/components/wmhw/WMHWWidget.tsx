'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    google: typeof google;
  }
}

// API configuration
const API_BASE_URL = 'https://restorestl-backend-327709678368.us-central1.run.app';
const API_KEY = process.env.NEXT_PUBLIC_RESTORESTL || '';
const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

// Condition tiers (from optimized WMHW)
const CONDITION_TIERS = [
  { label: 'Needs Major Work', multiplier: 0.50, desc: 'Cash-buyer range. Accounts for significant structural, roof, or system overhauls.' },
  { label: 'Needs TLC', multiplier: 0.65, desc: 'Investor offer range. Deducts for deferred maintenance (paint, flooring, minor repairs).' },
  { label: 'Average', multiplier: 0.80, desc: 'Standard market value. Assumes a solid home that is stylistically dated (older cabinets, carpet).' },
  { label: 'Updated', multiplier: 0.92, desc: 'Strong value. Home is modern but may lack brand-new premium finishes.' },
  { label: 'Pristine', multiplier: 1.0, desc: 'Top of market value. Requires showroom condition (new roof, modern kitchen, hardwood).' },
];

type AddressInput = {
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
};

type PropertyDetails = {
  beds?: number;
  baths?: number;
  sqft?: number;
  year_built?: number;
};

type ValuationResult = {
  estimated_value: number | null;
  value_range_low?: number | null;
  value_range_high?: number | null;
  property_details_from_avm?: PropertyDetails | null;
};

// Qualification picker options
const TIMELINE_OPTIONS = ['ASAP (30-90 days)', 'Later This Year', 'Just Exploring'];
const PATH_OPTIONS = ['Cash Offer', 'List on MLS', 'Not Sure'];
const REASON_OPTIONS = ['Inherited Property', 'Need Money Fast', 'Too Many Repairs', 'Moving/Relocating'];

export default function WMHWWidget() {
  const [step, setStep] = useState<'address' | 'preview' | 'refine' | 'result'>('address');
  const [address, setAddress] = useState<AddressInput>({
    street_address: '', city: '', state: '', zip_code: ''
  });
  const [addressDisplay, setAddressDisplay] = useState('');
  const [autocompleteReady, setAutocompleteReady] = useState(false);
  const [showManualFields, setShowManualFields] = useState(false);
  const [details, setDetails] = useState<PropertyDetails>({});
  const [conditionIndex, setConditionIndex] = useState(2); // Default to Average
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  // Qualification picker state
  const [timeline, setTimeline] = useState<string | null>(null);
  const [pathSelected, setPathSelected] = useState<string | null>(null);
  const [reasonForSelling, setReasonForSelling] = useState<string | null>(null);

  const autocompleteContainerRef = useRef<HTMLDivElement>(null);
  const autocompleteElementRef = useRef<HTMLElement | null>(null);
  const refineTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Google Maps bootstrap loader + Places PlaceAutocompleteElement
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY) {
      setShowManualFields(true);
      return;
    }

    let cancelled = false;

    // Install the Google Maps inline bootstrap loader (makes importLibrary available)
    if (!window.google?.maps?.importLibrary) {
      ((g: Record<string, string>) => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        let h: Promise<void> | undefined;
        let a: HTMLScriptElement;
        let k: string;
        const p = 'The Google Maps JavaScript API';
        const c = 'google';
        const l = 'importLibrary';
        const q = '__ib__';
        const m = document;
        const b: any = window;
        b[c] = b[c] || {};
        const d: any = b[c].maps || (b[c].maps = {});
        const r = new Set<string>();
        const e = new URLSearchParams();
        const u = () =>
          h ||
          (h = new Promise<void>(async (f, n) => {
            await (a = m.createElement('script'));
            e.set('libraries', [...r] + '');
            for (k in g)
              e.set(
                k.replace(/[A-Z]/g, (t: string) => '_' + t[0].toLowerCase()),
                g[k]
              );
            e.set('callback', c + '.maps.' + q);
            a.src = 'https://maps.googleapis.com/maps/api/js?' + e;
            d[q] = f;
            a.onerror = () => { n(Error(p + ' could not load.')); h = undefined; };
            a.nonce =
              m.querySelector<HTMLScriptElement>('script[nonce]')?.nonce || '';
            m.head.append(a);
          }));
        d[l]
          ? console.warn(p + ' only loads once. Ignoring:', g)
          : (d[l] = (f: string, ...n: unknown[]) =>
              r.add(f) && u().then(() => d[l](f, ...n)));
        /* eslint-enable @typescript-eslint/no-explicit-any */
      })({ key: GOOGLE_MAPS_KEY, v: 'weekly' });
    }

    async function initAutocomplete() {
      if (cancelled || !autocompleteContainerRef.current) return;

      try {
        const { PlaceAutocompleteElement } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;

        if (cancelled || !autocompleteContainerRef.current) return;

        const autocomplete = new PlaceAutocompleteElement({
          componentRestrictions: { country: 'us' },
          types: ['address'],
        });

        autocomplete.addEventListener('gmp-placeselect', async (event) => {
          const place = (event as any).place;
          await place.fetchFields({ fields: ['addressComponents', 'formattedAddress'] });

          let streetNumber = '';
          let route = '';
          let city = '';
          let state = '';
          let zip = '';

          for (const comp of place.addressComponents) {
            const types = comp.types;
            if (types.includes('street_number')) streetNumber = comp.longText;
            if (types.includes('route')) route = comp.shortText;
            if (types.includes('locality')) city = comp.longText;
            if (types.includes('administrative_area_level_1')) state = comp.shortText;
            if (types.includes('postal_code')) zip = comp.longText;
          }

          if (!route || !city || !state) return;

          const parsed: AddressInput = {
            street_address: streetNumber ? `${streetNumber} ${route}` : route,
            city,
            state,
            zip_code: zip,
          };

          setAddress(parsed);
          setAddressDisplay(place.formattedAddress || '');
          setError(undefined);
        });

        // Clear any previous element in container
        autocompleteContainerRef.current.innerHTML = '';
        autocompleteContainerRef.current.appendChild(autocomplete);
        autocompleteElementRef.current = autocomplete;

        // Fix Shadow DOM styling — inject white background into the shadow root
        // The gmp-place-autocomplete element uses Shadow DOM, so external CSS can't reach it
        const injectShadowStyles = () => {
          const shadowRoot = autocomplete.shadowRoot;
          if (shadowRoot) {
            const style = document.createElement('style');
            style.textContent = `
              :host {
                background: transparent !important;
              }
              input {
                background-color: #ffffff !important;
                color: #1e293b !important;
                border: none !important;
                outline: none !important;
                font-size: 1rem !important;
                padding: 0.75rem 0.5rem !important;
                width: 100% !important;
              }
              input::placeholder {
                color: #94a3b8 !important;
              }
            `;
            shadowRoot.appendChild(style);
          }
        };

        // Try immediately, then retry after a short delay in case shadow DOM isn't ready yet
        injectShadowStyles();
        setTimeout(injectShadowStyles, 100);
        setTimeout(injectShadowStyles, 500);

        setAutocompleteReady(true);
      } catch (err) {
        console.error('Failed to init PlaceAutocompleteElement', err);
        if (!cancelled) setShowManualFields(true);
      }
    }

    initAutocomplete().catch(() => {
      if (!cancelled) setShowManualFields(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Dwell time tracking for refine step
  useEffect(() => {
    if (step === 'refine') {
      refineTimerRef.current = setTimeout(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'refine_step_engaged',
          engagement_seconds: 10,
        });
      }, 10000);
    }

    return () => {
      if (refineTimerRef.current) {
        clearTimeout(refineTimerRef.current);
        refineTimerRef.current = null;
      }
    };
  }, [step]);

  const fetchValuation = useCallback(async (addressInput: AddressInput) => {
    const addressStr = `${addressInput.street_address}, ${addressInput.city}, ${addressInput.state} ${addressInput.zip_code}`;

    const resp = await fetch(`${API_BASE_URL}/api/valuation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify({ address: addressStr })
    });

    if (resp.status === 401) throw new Error('Authentication required. Please contact support.');
    if (resp.status === 403) throw new Error('Access denied. Please contact support.');
    if (resp.status === 429) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.message || 'Too many requests. Please try again later.');
    }
    if (!resp.ok) throw new Error(`Unable to get estimate (${resp.status})`);

    return await resp.json() as ValuationResult;
  }, []);

  async function onAddressSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate we have an address (either from autocomplete or manual)
    if (!address.street_address || !address.city || !address.state) {
      // If using autocomplete and they typed but didn't select
      if (autocompleteReady && !showManualFields) {
        setError('Please select an address from the dropdown suggestions.');
        return;
      }
      setError('Please enter a complete address.');
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setLoadingMessage('Searching comparable sales...');

    try {
      setTimeout(() => setLoadingMessage('Analyzing market trends...'), 800);
      setTimeout(() => setLoadingMessage('Calculating property value...'), 1600);

      const v = await fetchValuation(address);
      setValuation(v);
      if (v?.property_details_from_avm) setDetails(v.property_details_from_avm);

      const fullAddress = `${address.street_address}, ${address.city}, ${address.state} ${address.zip_code}`;
      sessionStorage.setItem('property_address', fullAddress);
      if (v?.estimated_value) sessionStorage.setItem('estimated_value', String(v.estimated_value));
      if (v?.property_details_from_avm) sessionStorage.setItem('property_details', JSON.stringify(v.property_details_from_avm));

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'wmhw_address_submitted',
        property_address: fullAddress,
        estimated_value: v.estimated_value || null,
      });

      setStep('preview');
    } catch (err) {
      console.error('valuation failed', err);
      setError('Unable to get estimate. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }

  async function onRefineSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);

    const formData = new FormData(e.currentTarget);
    const first_name = (formData.get('first_name') as string)?.trim() || '';
    const last_name = (formData.get('last_name') as string)?.trim() || '';
    const email = (formData.get('email') as string)?.trim() || '';
    const phone = (formData.get('phone') as string)?.trim() || '';

    if (!first_name || !last_name) {
      setError('Please provide your first and last name.');
      return;
    }

    if (!email && !phone) {
      setError('Please provide either email or phone number.');
      return;
    }

    const selectedCondition = CONDITION_TIERS[conditionIndex].label;
    const adjustedValue = valuation?.estimated_value
      ? valuation.estimated_value * CONDITION_TIERS[conditionIndex].multiplier
      : null;

    setIsSubmitting(true);
    try {
      const fullAddress = `${address.street_address}, ${address.city}, ${address.state} ${address.zip_code}`;

      const resp = await fetch(`${API_BASE_URL}/api/leads/wmhw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email: email || null,
          phone: phone || null,
          address: fullAddress,
          condition: selectedCondition,
          estimated_value: valuation?.estimated_value ?? null,
          adjusted_value: adjustedValue ? Math.round(adjustedValue) : null,
          beds: details.beds ?? null,
          baths: details.baths ?? null,
          sqft: details.sqft ?? null,
          timeline: timeline || null,
          path_selected: pathSelected || null,
          reason_for_selling: reasonForSelling || null,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.message || `Failed (${resp.status})`);
      }

      // Store for backward compatibility and /book page prefill
      const fullAddr = `${address.street_address}, ${address.city}, ${address.state} ${address.zip_code}`;
      sessionStorage.setItem('property_address', fullAddr);
      sessionStorage.setItem('property_condition', selectedCondition);
      sessionStorage.setItem('adjusted_value', adjustedValue ? String(Math.round(adjustedValue)) : '');
      sessionStorage.setItem('user_name', `${first_name} ${last_name}`);
      if (email) sessionStorage.setItem('user_email', email);
      if (phone) sessionStorage.setItem('user_phone', phone);
      sessionStorage.setItem('wmhw_completed', 'true');

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'wmhw_lead_submitted',
        property_address: fullAddr,
        property_condition: selectedCondition,
        estimated_value: valuation?.estimated_value || null,
        adjusted_value: adjustedValue ? Math.round(adjustedValue) : null,
        timeline: timeline || null,
        path_selected: pathSelected || null,
        reason_for_selling: reasonForSelling || null,
      });

      setStep('result');
    } catch (err) {
      console.error('WMHW lead submission failed', err);
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="instant-offer" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[var(--brand-yellow)]">
            {/* Address Step */}
            {step === 'address' && (
              <form onSubmit={onAddressSubmit} className="space-y-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-[var(--text-primary)]">
                  What&apos;s Your House Worth?
                </h2>
                <p className="text-[var(--text-secondary)] text-center mb-6">
                  Get an instant estimate in 30 seconds
                </p>

                {/* Google Places Autocomplete Field */}
                {!showManualFields && (
                  <div className="relative">
                    <div className="flex items-center bg-white border border-[var(--border-gray)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--brand-yellow)] focus-within:border-transparent transition-all">
                      <div className="pl-4 text-[var(--text-secondary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div ref={autocompleteContainerRef} className="flex-1 min-w-0 py-1 px-2 bg-white" />
                    </div>
                    {address.street_address && (
                      <div className="mt-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800 flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{address.street_address}, {address.city}, {address.state} {address.zip_code}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Manual Address Fields (fallback) */}
                {showManualFields && (
                  <div className="space-y-3">
                    <input
                      className="w-full px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                      placeholder="Street address"
                      autoComplete="street-address"
                      value={address.street_address}
                      onChange={e => setAddress(a => ({ ...a, street_address: e.target.value }))}
                      required
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                        placeholder="City"
                        autoComplete="address-level2"
                        value={address.city}
                        onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                        required
                      />
                      <input
                        className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                        placeholder="State"
                        autoComplete="address-level1"
                        value={address.state}
                        onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                        maxLength={2}
                        required
                      />
                      <input
                        className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                        placeholder="ZIP"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        value={address.zip_code}
                        onChange={e => setAddress(a => ({ ...a, zip_code: e.target.value }))}
                        maxLength={5}
                        required
                      />
                    </div>
                    {autocompleteReady && (
                      <button
                        type="button"
                        onClick={() => setShowManualFields(false)}
                        className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors"
                      >
                        ← Use address search instead
                      </button>
                    )}
                  </div>
                )}

                <button
                  className="w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-8 py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {loadingMessage || 'Analyzing...'}
                    </span>
                  ) : (
                    'Get Instant Estimate'
                  )}
                </button>

                {error && (
                  <p className="text-red-600 text-center text-sm">{error}</p>
                )}

                {/* Manual entry toggle — placed below submit so dropdown can't cover it */}
                {!showManualFields && (
                  <button
                    type="button"
                    onClick={() => setShowManualFields(true)}
                    className="w-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline transition-colors text-center"
                  >
                    Enter address manually instead
                  </button>
                )}
              </form>
            )}

            {/* Preview Step */}
            {step === 'preview' && valuation && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-center text-[var(--text-primary)]">
                  Your Property Estimate
                </h2>

                <div className="text-center text-sm text-[var(--text-secondary)]">
                  <p>{address.street_address}</p>
                  <p>{address.city}, {address.state} {address.zip_code}</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-[var(--brand-yellow)] rounded-xl p-6 text-center">
                  <p className="text-sm text-[var(--text-secondary)] uppercase tracking-wide font-medium mb-2">
                    Estimated Market Value
                  </p>
                  <p className="text-4xl font-bold text-[var(--text-primary)] mb-1">
                    {valuation.estimated_value
                      ? formatCurrency(valuation.estimated_value)
                      : 'Calculating...'}
                  </p>
                  {valuation.value_range_low && valuation.value_range_high && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      Range: {formatCurrency(valuation.value_range_low)}
                      {' - '}
                      {formatCurrency(valuation.value_range_high)}
                    </p>
                  )}
                </div>

                {(details.beds || details.baths || details.sqft) && (
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    {details.beds && (
                      <div className="bg-[var(--background-gray)] p-3 rounded">
                        <p className="text-2xl font-bold text-[var(--text-primary)]">{details.beds}</p>
                        <p className="text-[var(--text-secondary)]">Beds</p>
                      </div>
                    )}
                    {details.baths && (
                      <div className="bg-[var(--background-gray)] p-3 rounded">
                        <p className="text-2xl font-bold text-[var(--text-primary)]">{details.baths}</p>
                        <p className="text-[var(--text-secondary)]">Baths</p>
                      </div>
                    )}
                    {details.sqft && (
                      <div className="bg-[var(--background-gray)] p-3 rounded">
                        <p className="text-2xl font-bold text-[var(--text-primary)]">{new Intl.NumberFormat().format(details.sqft)}</p>
                        <p className="text-[var(--text-secondary)]">Sq Ft</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
                  <p className="font-medium text-slate-900 mb-2">📊 How we calculated this:</p>
                  <ul className="text-slate-700 space-y-1 text-xs">
                    <li>• Recent comparable sales in your neighborhood</li>
                    <li>• Current market trends in {address.city}</li>
                    <li>• Property characteristics and condition</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-center text-sm text-[var(--text-secondary)]">
                    Want a personalized cash offer or expert analysis?
                  </p>
                  <button
                    onClick={() => setStep('refine')}
                    className="w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-6 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
                  >
                    Continue for Expert Analysis
                  </button>
                  <button
                    onClick={() => {
                      setStep('address');
                      setAddress({ street_address: '', city: '', state: '', zip_code: '' });
                      setAddressDisplay('');
                      setValuation(null);
                      setDetails({});
                    }}
                    className="w-full bg-[var(--background-gray)] text-[var(--text-secondary)] px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    ← Try Different Address
                  </button>
                </div>
              </div>
            )}

            {/* Refine Step */}
            {step === 'refine' && (
              <form onSubmit={onRefineSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold text-center text-[var(--text-primary)]">
                  Get Your Personalized Offer
                </h2>

                {/* Condition Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-[var(--text-primary)]">Property Condition</p>
                    <span className="text-xs text-[var(--text-secondary)]">{CONDITION_TIERS[conditionIndex].label}</span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={conditionIndex}
                    onChange={(e) => setConditionIndex(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--brand-yellow)]"
                  />

                  <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)]">
                    <span className="w-1/5 text-center">Poor</span>
                    <span className="w-1/5 text-center">Fair</span>
                    <span className="w-1/5 text-center">Avg</span>
                    <span className="w-1/5 text-center">Good</span>
                    <span className="w-1/5 text-center">Excellent</span>
                  </div>

                  <div className="bg-[var(--background-gray)] p-3 rounded-md border border-[var(--border-gray)] text-sm">
                    <p className="font-medium mb-1 text-[var(--text-primary)]">{CONDITION_TIERS[conditionIndex].label}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{CONDITION_TIERS[conditionIndex].desc}</p>
                  </div>

                  {/* Dynamic Adjusted Estimate */}
                  {valuation?.estimated_value && (
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-[var(--brand-yellow)] rounded-xl p-4 text-center mt-4">
                      <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide font-medium mb-1">
                        Adjusted Estimate
                      </p>
                      <p className="text-3xl font-bold text-[var(--text-primary)]">
                        {formatCurrency(valuation.estimated_value * CONDITION_TIERS[conditionIndex].multiplier)}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Based on {CONDITION_TIERS[conditionIndex].label.toLowerCase()} condition
                      </p>
                    </div>
                  )}
                </div>

                {/* Qualification Pickers */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">Tell us about your situation</p>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">This helps us prepare the right options for you.</p>
                  </div>

                  {/* Timeline Picker */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--text-secondary)]">What&apos;s your timeline?</p>
                    <div className="flex flex-wrap gap-2">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setTimeline(timeline === opt ? null : opt)}
                          className={`border rounded-full px-4 py-2 text-sm cursor-pointer transition-colors ${
                            timeline === opt
                              ? 'bg-[var(--brand-yellow)] border-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-medium'
                              : 'bg-white border-[var(--border-gray)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Path Picker */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--text-secondary)]">What are you looking for?</p>
                    <div className="flex flex-wrap gap-2">
                      {PATH_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPathSelected(pathSelected === opt ? null : opt)}
                          className={`border rounded-full px-4 py-2 text-sm cursor-pointer transition-colors ${
                            pathSelected === opt
                              ? 'bg-[var(--brand-yellow)] border-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-medium'
                              : 'bg-white border-[var(--border-gray)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Reason Picker */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--text-secondary)]">What&apos;s driving the sale?</p>
                    <div className="flex flex-wrap gap-2">
                      {REASON_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setReasonForSelling(reasonForSelling === opt ? null : opt)}
                          className={`border rounded-full px-4 py-2 text-sm cursor-pointer transition-colors ${
                            reasonForSelling === opt
                              ? 'bg-[var(--brand-yellow)] border-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-medium'
                              : 'bg-white border-[var(--border-gray)] text-[var(--text-secondary)]'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                {/* Contact Form */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="first_name"
                    autoComplete="given-name"
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="First name"
                    required
                  />
                  <input
                    name="last_name"
                    autoComplete="family-name"
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="Last name"
                    required
                  />
                  <input
                    name="email"
                    autoComplete="email"
                    className="col-span-2 px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="Email (optional if phone provided)"
                    type="email"
                  />
                  <input
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    className="col-span-2 px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="Phone (optional if email provided)"
                    type="tel"
                  />
                  <p className="col-span-2 text-xs text-[var(--text-secondary)] text-center">
                    * Provide at least email or phone number
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-6 py-4 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Get My Cash Offer'
                  )}
                </button>
              </form>
            )}

            {/* Result Step */}
            {step === 'result' && (
              <div className="text-center space-y-5">
                <div className="text-5xl mb-2">🏠</div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">Your Estimate Is Ready!</h3>

                {valuation?.estimated_value && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-[var(--brand-yellow)] rounded-xl p-5 text-center">
                    <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wide font-medium mb-1">
                      Your Adjusted Estimate
                    </p>
                    <p className="text-3xl font-bold text-[var(--text-primary)]">
                      {formatCurrency(valuation.estimated_value * CONDITION_TIERS[conditionIndex].multiplier)}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      Based on {CONDITION_TIERS[conditionIndex].label.toLowerCase()} condition
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-5 space-y-3">
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    Want a Free Property Analysis Report?
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    Book a quick 15-minute call and we&apos;ll send you a detailed report
                    with comparable sales, repair estimates, and your home&apos;s full
                    market breakdown — before the call.
                  </p>
                  <a
                    href="/book"
                    onClick={() => {
                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({ event: 'calendly_click' });
                    }}
                    className="inline-block w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-6 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
                  >
                    Book My Free Analysis
                  </a>
                  <p className="text-xs text-[var(--text-secondary)]">
                    No pressure, no obligation. Just real numbers for your property.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

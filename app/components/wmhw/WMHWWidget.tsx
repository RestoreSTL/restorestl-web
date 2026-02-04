'use client';

import { useState, useCallback } from 'react';

// Declare Crisp on window
declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string;
  }
}

// API configuration
const API_BASE_URL = 'https://restorestl-backend-327709678368.us-central1.run.app';
const API_KEY = process.env.NEXT_PUBLIC_RESTORESTL || '';

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

export default function WMHWWidget() {
  const [step, setStep] = useState<'address' | 'preview' | 'refine' | 'result'>('address');
  const [address, setAddress] = useState<AddressInput>({
    street_address: '', city: '', state: '', zip_code: ''
  });
  const [details, setDetails] = useState<PropertyDetails>({});
  const [conditionIndex, setConditionIndex] = useState(2); // Default to Average
  const [valuation, setValuation] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | undefined>(undefined);

  // Open chat with optimized greeting after WMHW completion (called from preview step)
  const openChatWithContext = useCallback(async () => {
    if (typeof window === 'undefined' || !window.$crisp) return;

    const fullAddress = sessionStorage.getItem('property_address') || '';
    const estimatedValue = sessionStorage.getItem('estimated_value') || '';
    const valueFormatted = estimatedValue ? `$${parseInt(estimatedValue).toLocaleString()}` : '';

    // Mark WMHW as completed so CrispChat doesn't show generic greeting
    sessionStorage.setItem('wmhw_completed', 'true');

    // Update Crisp session data with property context
    window.$crisp.push(['set', 'session:data', [[
      ['property_address', fullAddress],
      ['estimated_value', valueFormatted],
      ['wmhw_completed', 'true'],
      ['conversation_path', 'wmhw_flow']
    ]]]);

    // Open chat widget
    window.$crisp.push(['do', 'chat:open']);

    // Wait for chat to open, then get session ID and trigger backend
    setTimeout(async () => {
      try {
        // Get Crisp session ID
        const sessionId = window.$crisp.push(['get', 'session:identifier']) as unknown as string;

        if (!sessionId) {
          console.error('Could not get Crisp session ID');
          // Fallback: show local greeting if we can't get session ID
          const greeting = `Hey! 👋 I see you're looking at ${fullAddress}.

Based on comparable sales, your home is worth around ${valueFormatted}.

You have two options:
⚡ Cash Offer: 7-14 days, $0 costs, zero hassle
💰 List on MLS: 60-90 days, top dollar, some prep work

Which path sounds better for your situation? Just type "cash", "list", or "not sure"!`;
          window.$crisp.push(['do', 'message:show', ['text', greeting]]);
          return;
        }

        // Call backend to send greeting AND picker buttons via Crisp API
        const response = await fetch(`${API_BASE_URL}/api/leads/chat/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': API_KEY,
          },
          body: JSON.stringify({
            session_id: sessionId,
            property_address: fullAddress,
            estimated_value: valueFormatted
          })
        });

        if (!response.ok) {
          console.error('Failed to start chat:', await response.text());
          // Fallback to local greeting
          const greeting = `Hey! 👋 I see you're looking at ${fullAddress}.

Based on comparable sales, your home is worth around ${valueFormatted}.

You have two options:
⚡ Cash Offer: 7-14 days, $0 costs, zero hassle
💰 List on MLS: 60-90 days, top dollar, some prep work

Which path sounds better for your situation? Just type "cash", "list", or "not sure"!`;
          window.$crisp.push(['do', 'message:show', ['text', greeting]]);
        }
      } catch (error) {
        console.error('Error starting optimized chat:', error);
      }
    }, 1000); // Wait 1 second for chat to fully initialize
  }, []);

  const fetchValuation = useCallback(async (addressInput: AddressInput) => {
    const addressStr = `${addressInput.street_address}, ${addressInput.city}, ${addressInput.state} ${addressInput.zip_code}`;

    const resp = await fetch(`${API_BASE_URL}/api/valuation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,  // API key for authentication
      },
      body: JSON.stringify({ address: addressStr })
    });

    // Handle security-related errors with user-friendly messages
    if (resp.status === 401) {
      throw new Error('Authentication required. Please contact support.');
    }
    if (resp.status === 403) {
      throw new Error('Access denied. Please contact support.');
    }
    if (resp.status === 429) {
      const data = await resp.json().catch(() => ({}));
      const message = data.message || 'Too many requests. Please try again later.';
      throw new Error(message);
    }
    if (!resp.ok) {
      throw new Error(`Unable to get estimate (${resp.status})`);
    }

    return await resp.json() as ValuationResult;
  }, []);

  async function onAddressSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);
    setLoadingMessage('Searching comparable sales...');

    try {
      setTimeout(() => setLoadingMessage('Analyzing market trends...'), 800);
      setTimeout(() => setLoadingMessage('Calculating property value...'), 1600);

      const v = await fetchValuation(address);
      setValuation(v);
      if (v?.property_details_from_avm) setDetails(v.property_details_from_avm);

      // Store address for chat context (Crisp integration) - chat opens after full WMHW flow
      const fullAddress = `${address.street_address}, ${address.city}, ${address.state} ${address.zip_code}`;
      sessionStorage.setItem('property_address', fullAddress);

      // Store property details for chat context
      if (v?.estimated_value) {
        sessionStorage.setItem('estimated_value', String(v.estimated_value));
      }
      if (v?.property_details_from_avm) {
        sessionStorage.setItem('property_details', JSON.stringify(v.property_details_from_avm));
      }

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

    // Store condition and contact info for chat context
    const selectedCondition = CONDITION_TIERS[conditionIndex].label;
    const adjustedValue = valuation?.estimated_value
      ? valuation.estimated_value * CONDITION_TIERS[conditionIndex].multiplier
      : null;

    sessionStorage.setItem('property_condition', selectedCondition);
    sessionStorage.setItem('adjusted_value', adjustedValue ? String(Math.round(adjustedValue)) : '');
    sessionStorage.setItem('user_name', `${first_name} ${last_name}`);
    if (email) sessionStorage.setItem('user_email', email);
    if (phone) sessionStorage.setItem('user_phone', phone);

    // TODO: Send to Scout backend API
    setStep('result');

    // Auto-open chat 2 seconds after showing result with full property context
    setTimeout(() => {
      if (typeof window !== 'undefined' && window.$crisp) {
        const fullAddress = sessionStorage.getItem('property_address') || '';
        const propertyDetails = sessionStorage.getItem('property_details');
        const parsedDetails = propertyDetails ? JSON.parse(propertyDetails) : {};

        // Build property summary for chat
        const detailsParts = [];
        if (parsedDetails.beds) detailsParts.push(`${parsedDetails.beds} bed`);
        if (parsedDetails.baths) detailsParts.push(`${parsedDetails.baths} bath`);
        if (parsedDetails.sqft) detailsParts.push(`${parsedDetails.sqft.toLocaleString()} sqft`);
        const detailsSummary = detailsParts.length > 0 ? detailsParts.join(', ') : '';

        // Update Crisp session data with ALL property context
        window.$crisp.push(['set', 'session:data', [[
          ['property_address', fullAddress],
          ['property_condition', selectedCondition],
          ['adjusted_value', adjustedValue ? `$${Math.round(adjustedValue).toLocaleString()}` : ''],
          ['beds', parsedDetails.beds || ''],
          ['baths', parsedDetails.baths || ''],
          ['sqft', parsedDetails.sqft || ''],
          ['user_name', `${first_name} ${last_name}`],
          ['user_email', email],
          ['user_phone', phone]
        ]]]);

        // Open the chat widget
        window.$crisp.push(['do', 'chat:open']);

        // Send personalized greeting with property context
        const greeting = detailsSummary
          ? `Hey ${first_name}! 👋 I see you submitted ${fullAddress} (${detailsSummary}, ${selectedCondition.toLowerCase()} condition). Does that look right? I can help clarify how we got your estimate or schedule a quick call to discuss next steps.`
          : `Hey ${first_name}! 👋 I see you submitted ${fullAddress} in ${selectedCondition.toLowerCase()} condition. Does that look right? I can help clarify how we got your estimate or schedule a quick call to discuss next steps.`;

        window.$crisp.push(['do', 'message:show', ['text', greeting]]);
      }
    }, 2000);
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

                <input
                  className="w-full px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                  placeholder="Street address"
                  value={address.street_address}
                  onChange={e => setAddress(a => ({ ...a, street_address: e.target.value }))}
                  required
                />

                <div className="grid grid-cols-3 gap-3">
                  <input
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="City"
                    value={address.city}
                    onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                    required
                  />
                  <input
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="State"
                    value={address.state}
                    onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                    maxLength={2}
                    required
                  />
                  <input
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="ZIP"
                    value={address.zip_code}
                    onChange={e => setAddress(a => ({ ...a, zip_code: e.target.value }))}
                    maxLength={5}
                    required
                  />
                </div>

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
                    onClick={() => {
                      // Open chat with property context (optimized flow)
                      openChatWithContext();
                      // Also go to refine step so user can provide contact info
                      setTimeout(() => setStep('refine'), 1000);
                    }}
                    className="w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-6 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
                  >
                    Continue for Expert Analysis
                  </button>
                  <button
                    onClick={() => setStep('address')}
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

                {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                {/* Contact Form */}
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="first_name"
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="First name"
                    required
                  />
                  <input
                    name="last_name"
                    className="px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="Last name"
                    required
                  />
                  <input
                    name="email"
                    className="col-span-2 px-4 py-3 border border-[var(--border-gray)] rounded-lg focus:ring-2 focus:ring-[var(--brand-yellow)] focus:border-transparent outline-none transition-all"
                    placeholder="Email (optional if phone provided)"
                    type="email"
                  />
                  <input
                    name="phone"
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
                  className="w-full bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] px-6 py-4 rounded-lg font-bold text-lg transition-colors min-h-[44px]"
                >
                  Get My Cash Offer
                </button>
              </form>
            )}

            {/* Result Step */}
            {step === 'result' && (
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)]">You&apos;re All Set!</h3>
                <p className="text-[var(--text-secondary)]">
                  We&apos;re reviewing your information and will contact you within 24 hours with your personalized cash offer.
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Check your email for confirmation and next steps.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

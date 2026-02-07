import Navigation from '../components/Navigation';
import HeroSection from '../components/sell/HeroSection';
import TwoPathComparison from '../components/sell/TwoPathComparison';
import WMHWWidget from '../components/wmhw/WMHWWidget';
import TimeMoneyEnergy from '../components/sell/TimeMoneyEnergy';
import Footer from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sell Your House Fast | Free Instant Home Valuation | Restore STL',
  description:
    'Get a cash offer on your St. Louis home in minutes. No repairs, no fees, no hassle.',
};

export default function SellPage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <TwoPathComparison />
        <WMHWWidget />
        <TimeMoneyEnergy />
      </main>
      <Footer />
    </>
  );
}

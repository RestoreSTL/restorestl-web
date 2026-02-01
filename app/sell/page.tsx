import Navigation from '../components/Navigation';
import HeroSection from '../components/sell/HeroSection';
import TwoPathComparison from '../components/sell/TwoPathComparison';
import WMHWWidget from '../components/wmhw/WMHWWidget';
import TimeMoneyEnergy from '../components/sell/TimeMoneyEnergy';
import Footer from '../components/Footer';

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

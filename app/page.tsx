import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import SituationsSection from './components/SituationsSection';
import MissionSection from './components/MissionSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProcessSection />
        <SituationsSection />
        <MissionSection />
      </main>
      <Footer />
    </>
  );
}

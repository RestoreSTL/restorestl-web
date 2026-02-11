import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BrandStatement from './components/BrandStatement';
import ProcessSection from './components/ProcessSection';
import RealAnswers from './components/RealAnswers';
import PeopleFirstMethod from './components/PeopleFirstMethod';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <BrandStatement />
        <ProcessSection />
        <RealAnswers />
        <PeopleFirstMethod />
      </main>
      <Footer />
    </>
  );
}

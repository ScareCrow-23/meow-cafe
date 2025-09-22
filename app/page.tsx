import About from "./components/About";
import Contact from "./components/Contact";
import FeaturedMenu from "./components/FeaturedProducts";
import HeroSection from "./components/Hero";
import Reservation from "./components/Reservation";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About />
      <FeaturedMenu />
      <Reservation />
      <Testimonials />
      <Contact />
    </>
  );
}

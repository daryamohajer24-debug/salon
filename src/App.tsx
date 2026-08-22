import { useLenis } from "./hooks/useLenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import About from "./components/About";
import Experience from "./components/Experience";
import Gallery from "./components/Gallery";
import Stylists from "./components/Stylists";
import Testimonials from "./components/Testimonials";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import ScrollProgress from "./components/ScrollProgress";

export default function App() {
  useLenis();

  return (
    <div className="relative bg-[#f6f1e7] text-[#0b0a08] no-select">
      <Loader />
      <Cursor />
      <ScrollProgress />
      <div className="noise" />

      <Nav />
      <main className="relative">
        <Hero />
        <Marquee
          items={[
            "Editorial Hair",
            "Bridal Atelier",
            "House Color",
            "Skin Rituals",
            "Bespoke Cuts",
          ]}
        />
        <Services />
        <About />
        <Marquee
          reverse
          items={["Paris", "New York", "Tokyo", "Milan", "By Appointment"]}
        />
        <Experience />
        <Gallery />
        <Stylists />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import Hero from "@/components/home/Hero";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedEquipment/>
      </main>
      <Footer />
    </>
  );
}
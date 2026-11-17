import Categories from "@/components/home/Categories";
import CustomerReviews from "@/components/home/CustomerReviews";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import TrustedOwners from "@/components/home/TrustedOwners";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedEquipment/>
        <Categories/>
        <WhyChooseUs/>
        <CustomerReviews/>
        <HowItWorks/>
        <TrustedOwners/>
      </main>
      <Footer />
    </>
  );
}
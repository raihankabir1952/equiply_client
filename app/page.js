import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <h1 className="p-10 text-3xl font-bold">
          Welcome to Equiply
        </h1>
      </main>
      <Footer/>
    </>
  );
}
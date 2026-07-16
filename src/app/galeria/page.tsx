import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Galeria from "@/components/Galeria";

export default function GaleriaPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <Galeria />
      </div>
      <Footer />
    </main>
  );
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Propuestas from "@/components/Propuestas";

export default function PropuestasPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <Propuestas />
      </div>
      <Footer />
    </main>
  );
}

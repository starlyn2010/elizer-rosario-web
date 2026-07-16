import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contacto from "@/components/Contacto";

export default function ContactoPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <Contacto />
      </div>
      <Footer />
    </main>
  );
}

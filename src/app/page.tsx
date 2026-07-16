import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Biografia from "@/components/Biografia";
import Contador from "@/components/Contador";
import Propuestas from "@/components/Propuestas";
import InscripcionPage from "./inscripcion/page";
import Galeria from "@/components/Galeria";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Biografia />
      <Contador />
      <Propuestas />
      <InscripcionPage />
      <Galeria />
      <Contacto />
      <Footer />
    </main>
  );
}

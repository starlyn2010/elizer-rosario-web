import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Biografia from "@/components/Biografia";

export default function BiografiaPage() {
  return (
    <main>
      <Header />
      <div className="pt-24">
        <Biografia />
      </div>
      <Footer />
    </main>
  );
}

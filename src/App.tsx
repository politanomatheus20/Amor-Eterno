import Contato from "./components/Contato";
import Depoimentos from "./components/Depoimentos";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Memorial from "./components/Memorial";
import Planos from "./components/Planos";
import Servicos from "./components/Servicos";
import Sobre from "./components/Sobre";
import Valores from "./components/Valores";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Planos />
        <Valores />
        <Servicos />
        <Memorial />
        <Depoimentos />
        <FAQ />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

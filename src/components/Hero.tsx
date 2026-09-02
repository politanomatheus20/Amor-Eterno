import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { whatsappLink } from "../lib/constants";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sand-100 via-cream to-cream" />
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-olive-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 top-40 -z-10 h-72 w-72 rounded-full bg-bronze-200/30 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight text-bronze-700 mb-6">
            Um novo lar para quem sempre esteve ao seu lado
          </h1>
          <p className="text-base sm:text-lg text-ink/70 leading-relaxed mb-8 max-w-xl">
            Na Amor Eterno Pets, acolhemos você e seu companheiro com carinho,
            respeito e humanidade em cada etapa da despedida. Um cuidado que
            preserva a memória de quem sempre trouxe amor à sua vida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={whatsappLink("Olá! Preciso de atendimento da Amor Eterno Pets.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-olive-600 hover:bg-olive-700 text-cream px-7 py-3.5 rounded-full font-semibold shadow-md transition-colors"
            >
              <MessageCircle size={20} />
              Fale conosco 24h
            </a>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 border-2 border-bronze-600 text-bronze-700 hover:bg-bronze-50 px-7 py-3.5 rounded-full font-semibold transition-colors"
            >
              Conheça nossos planos
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sand-200/60 blur-2xl scale-110" aria-hidden="true" />
            <img
              src={logo}
              alt="Amor Eterno Pets — cão e gato em coroa de louros"
              className="relative w-64 sm:w-80 lg:w-96 object-contain drop-shadow-xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

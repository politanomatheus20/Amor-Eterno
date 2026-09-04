import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { WhatsAppIcon } from "./icons/SocialIcons";
import { whatsappLink } from "../lib/constants";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative z-0 overflow-hidden bg-[#120d08] md:flex md:min-h-[100svh] md:items-end"
    >
      <div className="relative h-[58vh] max-h-[520px] w-full overflow-hidden md:absolute md:inset-0 md:h-full md:max-h-none">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-center grayscale contrast-125"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/videos/hero-dogs-running-mobile.mp4" media="(max-width: 767px)" type="video/mp4" />
          <source src="/videos/hero-dogs-running-desktop.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#120d08] via-transparent to-black/20 md:hidden"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-b from-black/45 via-black/40 to-black/80 md:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 md:pb-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl leading-tight text-cream sm:text-5xl lg:text-6xl">
            Um novo lar para quem sempre esteve ao seu lado
          </h1>
          <p className="mb-8 mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
            Na Amor Eterno Pets, acolhemos você e seu companheiro com carinho,
            respeito e humanidade em cada etapa da despedida. Um cuidado que
            preserva a memória de quem sempre trouxe amor à sua vida.
          </p>
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <a
              href={whatsappLink("Olá! Preciso de atendimento da Amor Eterno Pets.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-olive-600 px-7 py-3.5 font-semibold text-cream shadow-md transition-colors hover:bg-olive-700"
            >
              <WhatsAppIcon size={20} />
              Fale conosco 24h
            </a>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cream px-7 py-3.5 font-semibold text-cream transition-colors hover:bg-cream hover:text-bronze-700"
            >
              Conheça nossos planos
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

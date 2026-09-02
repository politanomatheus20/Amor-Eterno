import { motion } from "framer-motion";

export default function Sobre() {
  return (
    <section id="sobre" className="relative overflow-hidden py-14 sm:py-20">
      <div
        className="absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-bronze-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-olive-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-olive-700 uppercase">
            Quem Somos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-bronze-700 mt-4 mb-6">
            Cuidamos de quem cuidou de você
          </h2>
          <p className="text-ink/70 leading-relaxed">
            {/* TEXTO A REVISAR — ajustar com a história real da empresa */}
            A Amor Eterno Pets nasceu do desejo de oferecer, a quem perdeu um
            animal de estimação, uma despedida digna e cheia de respeito. Mais
            do que um serviço, oferecemos acolhimento: cada pet é tratado como
            parte de uma família, e cada família é acompanhada com o cuidado
            que ela merece.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

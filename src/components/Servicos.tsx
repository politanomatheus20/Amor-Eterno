import { motion } from "framer-motion";
import { Amphora, MapPinned, MessageCircle } from "lucide-react";
import { whatsappLink } from "../lib/constants";

const SERVICES = [
  {
    icon: MapPinned,
    title: "Remoção no Local",
    description:
      "Buscamos seu pet onde estiver, com todo cuidado e respeito, a qualquer hora do dia.",
    tag: "Consultar especialistas",
  },
  {
    icon: Amphora,
    title: "Urnas Personalizadas",
    description:
      "Urnas em diversos modelos e acabamentos para eternizar a memória do seu companheiro.",
    tag: "Consultar especialistas",
  },
];

export default function Servicos() {
  return (
    <section id="servicos" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-sand-300/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-olive-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-olive-700 uppercase">
            Serviços Complementares
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-bronze-700 mt-4">
            Mais formas de cuidar dessa despedida
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-sand-200 p-6 sm:p-7 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-bronze-50 flex items-center justify-center mb-5">
                <service.icon size={24} className="text-bronze-600" />
              </div>
              <h3 className="font-display text-lg text-bronze-700 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed mb-5 flex-1">
                {service.description}
              </p>
              <a
                href={whatsappLink(`Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-olive-600 hover:bg-olive-700 text-cream px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
              >
                <MessageCircle size={16} />
                {service.tag}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

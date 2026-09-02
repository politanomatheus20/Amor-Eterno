import { motion } from "framer-motion";
import { Clock, Heart, Leaf, Sparkles } from "lucide-react";

const VALUES = [
  {
    icon: Heart,
    title: "Atendimento Humanizado",
    description:
      "Uma equipe preparada para acolher você com empatia em um dos momentos mais delicados da vida.",
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description:
      "Processos de cremação responsáveis, com respeito ao meio ambiente em cada etapa.",
  },
  {
    icon: Sparkles,
    title: "Estrutura Moderna",
    description:
      "Instalações confortáveis e equipamentos de ponta para garantir dignidade e cuidado.",
  },
  {
    icon: Clock,
    title: "Atendimento 24h",
    description:
      "Estamos disponíveis a qualquer hora, todos os dias, para quando você mais precisar.",
  },
];

export default function Valores() {
  return (
    <section id="valores" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-sand-300/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-bronze-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl bg-sand-50 border border-sand-200 p-6 sm:p-7 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-olive-100 flex items-center justify-center mb-5">
                <value.icon size={24} className="text-olive-700" />
              </div>
              <h3 className="font-display text-lg text-bronze-700 mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-ink/70 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

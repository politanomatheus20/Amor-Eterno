import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { whatsappLink } from "../lib/constants";

const PLANS = [
  {
    name: "Cremação Individual",
    price: "1.220,00",
    installment: "ou em até 10x no cartão",
    highlight: true,
    benefits: [
      "Cremação exclusiva do seu pet",
      "Cinzas devolvidas em urna própria",
      "Certificado de cremação",
      "Atendimento 24h",
      "Retirada do pet no local combinado",
    ],
  },
  {
    name: "Cremação Coletiva",
    price: "860,00",
    installment: "ou em até 10x no cartão",
    highlight: false,
    benefits: [
      "Cremação coletiva, com respeito e dignidade",
      "Destinação final sustentável e responsável",
      "Certificado de cremação",
      "Atendimento 24h",
      "Retirada do pet no local combinado",
    ],
  },
];

export default function Planos() {
  return (
    <section id="planos" className="relative overflow-hidden py-20 sm:py-28 bg-sand-50">
      <div
        className="absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-bronze-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-olive-200/40 blur-3xl"
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
            Planos de Cremação
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-bronze-700 mt-4">
            Escolha a homenagem ideal
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 sm:gap-8 max-w-4xl mx-auto">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col ${
                plan.highlight
                  ? "bg-bronze-700 text-cream shadow-xl sm:scale-[1.02]"
                  : "bg-white border border-sand-200 text-ink"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-2.5 sm:-top-3 left-3 sm:left-8 bg-olive-600 text-cream text-[10px] sm:text-xs font-semibold px-2 sm:px-4 py-0.5 sm:py-1 rounded-full tracking-wide">
                  Mais escolhido
                </span>
              )}
              <h3
                className={`font-display text-base sm:text-2xl mb-1 ${
                  plan.highlight ? "text-cream" : "text-bronze-700"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mb-1">
                <span
                  className={`text-xs sm:text-sm ${
                    plan.highlight ? "text-cream/70" : "text-ink/60"
                  }`}
                >
                  a partir de
                </span>
              </div>
              <div className="flex items-baseline gap-1 mb-1 flex-wrap">
                <span
                  className={`text-sm sm:text-lg ${
                    plan.highlight ? "text-cream/90" : "text-ink/70"
                  }`}
                >
                  R$
                </span>
                <span className="font-display text-xl sm:text-4xl">{plan.price}</span>
              </div>
              <p
                className={`text-xs sm:text-sm mb-3 sm:mb-6 ${
                  plan.highlight ? "text-cream/70" : "text-ink/60"
                }`}
              >
                {plan.installment}
              </p>

              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-8 flex-1">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-1.5 sm:gap-2.5 text-xs sm:text-sm">
                    <Check
                      size={14}
                      className={`shrink-0 mt-0.5 sm:w-[18px] sm:h-[18px] ${
                        plan.highlight ? "text-olive-300" : "text-olive-600"
                      }`}
                    />
                    <span className={plan.highlight ? "text-cream/90" : "text-ink/80"}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappLink(`Olá! Tenho interesse no plano de ${plan.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-base text-center rounded-full font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-olive-500 hover:bg-olive-400 text-cream"
                    : "bg-bronze-600 hover:bg-bronze-700 text-cream"
                }`}
              >
                Quero este plano
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-ink/50 mt-8 max-w-xl mx-auto">
          Valores sujeitos a alteração conforme porte do animal e condições
          específicas. Consulte um de nossos especialistas para mais detalhes.
        </p>
      </div>
    </section>
  );
}

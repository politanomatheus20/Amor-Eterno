import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const QUESTIONS = [
  {
    question: "Como funciona o processo de cremação?",
    answer:
      "Após a remoção do pet, ele é encaminhado à nossa unidade, onde realizamos a cremação individual ou coletiva conforme o plano escolhido, com todo o respeito e cuidado necessários.",
  },
  {
    question: "Qual a diferença entre cremação individual e coletiva?",
    answer:
      "Na cremação individual, apenas o seu pet é cremado e as cinzas são devolvidas em urna própria. Na coletiva, vários animais são cremados juntos e as cinzas recebem destinação sustentável, sem devolução.",
  },
  {
    question: "Quanto tempo leva todo o processo?",
    answer:
      "O prazo varia conforme a demanda e a unidade, mas em geral o processo é concluído em até 48 horas após a remoção.",
  },
  {
    question: "Recebo as cinzas do meu pet de volta?",
    answer:
      "Sim, no plano de cremação individual as cinzas são devolvidas em uma urna. No plano coletivo, não há devolução de cinzas.",
  },
  {
    question: "Vocês fazem remoção do pet no local?",
    answer:
      "Sim, oferecemos o serviço de remoção no local, a qualquer hora do dia. Fale com um de nossos especialistas para saber mais detalhes e condições.",
  },
  {
    question: "Os planos podem ser parcelados?",
    answer:
      "Sim, os planos de cremação podem ser parcelados em até 10x no cartão de crédito.",
  },
  {
    question: "O atendimento é realmente 24 horas?",
    answer:
      "Sim, nossa equipe está disponível 24 horas por dia, todos os dias da semana, inclusive feriados.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden py-20 sm:py-28 bg-sand-50">
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-olive-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-bronze-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-olive-700 uppercase">
            Dúvidas Frequentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-bronze-700 mt-4">
            Perguntas frequentes
          </h2>
        </motion.div>

        <div className="space-y-4">
          {QUESTIONS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl bg-white border border-sand-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-bronze-700">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-olive-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-ink/70 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

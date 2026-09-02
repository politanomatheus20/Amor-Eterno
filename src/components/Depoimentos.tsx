import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useRef } from "react";

// TODO: substituir por depoimentos reais de clientes
const TESTIMONIALS = [
  {
    name: "Marina S.",
    text: "Fui tratada com um carinho que eu não esperava num momento tão difícil. Serei sempre grata pelo cuidado com o meu Bidu.",
  },
  {
    name: "Carlos R.",
    text: "Atendimento humano do início ao fim. Explicaram cada etapa e me deixaram tranquilo em um momento de muita dor.",
  },
  {
    name: "Fernanda A.",
    text: "A urna ficou linda e o certificado é uma lembrança que guardo com carinho. Recomendo de olhos fechados.",
  },
  {
    name: "Rodrigo M.",
    text: "Atendimento 24 horas de verdade. Precisei no meio da madrugada e fui atendido com toda atenção do mundo.",
  },
  {
    name: "Juliana P.",
    text: "O carinho da equipe fez toda diferença nesse momento tão difícil. Me senti acolhida do início ao fim.",
  },
  {
    name: "Paulo H.",
    text: "Processo transparente e muito respeitoso. Recomendo para quem precisa desse tipo de cuidado.",
  },
  {
    name: "Camila T.",
    text: "A urna personalizada ficou linda, um jeito bonito de guardar a memória do meu gatinho.",
  },
  {
    name: "Eduardo L.",
    text: "Fui muito bem atendido pelo WhatsApp, rápido e com muita empatia mesmo tarde da noite.",
  },
  {
    name: "Aline B.",
    text: "Nunca imaginei que esse momento pudesse ser tão tranquilo. A equipe cuidou de tudo com muito respeito.",
  },
  {
    name: "Vinícius D.",
    text: "Serviço sério e organizado. Recebi o certificado rapidinho e isso trouxe um conforto enorme.",
  },
  {
    name: "Patrícia N.",
    text: "Indico para todo mundo que precisa passar por essa despedida. O cuidado é genuíno.",
  },
  {
    name: "Rafael G.",
    text: "Equipe atenciosa em cada detalhe. Me senti seguro sabendo que meu cão estava em boas mãos.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Depoimentos() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    const amount = card ? card.offsetWidth + gap : scroller.clientWidth * 0.85;
    scroller.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section id="depoimentos" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute -left-24 -top-24 -z-10 h-96 w-96 rounded-full bg-olive-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-sand-300/40 blur-3xl"
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
            Depoimentos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-bronze-700 mt-4">
            Quem confiou, recomenda
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                data-card
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className="shrink-0 basis-[85%] sm:basis-[46%] lg:basis-[31%] snap-start rounded-2xl bg-sand-50 border border-sand-200 p-7"
              >
                <Quote size={28} className="text-olive-400 mb-4" />
                <p className="text-ink/80 leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-bronze-600 text-cream flex items-center justify-center text-sm font-semibold">
                    {initials(testimonial.name)}
                  </div>
                  <span className="font-medium text-bronze-700">
                    {testimonial.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Ver depoimento anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 text-bronze-700 hover:bg-bronze-600 hover:text-cream hover:border-bronze-600 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Ver próximo depoimento"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-sand-300 text-bronze-700 hover:bg-bronze-600 hover:text-cream hover:border-bronze-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

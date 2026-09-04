import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import photoAmora from "../assets/pets/amora.jpg";
import photoBella from "../assets/pets/bella.jpg";
import photoBidu from "../assets/pets/bidu.jpg";
import photoDuke from "../assets/pets/duke.jpg";
import photoLola from "../assets/pets/lola.jpg";
import photoLuna from "../assets/pets/luna.jpg";
import photoMax from "../assets/pets/max.jpg";
import photoMel from "../assets/pets/mel.jpg";
import photoSimba from "../assets/pets/simba.jpg";
import photoThor from "../assets/pets/thor.jpg";
import photoToby from "../assets/pets/toby.jpg";
import photoZeus from "../assets/pets/zeus.jpg";

const PETS = [
  {
    name: "Bidu",
    photo: photoBidu,
    description:
      "Meu Bidu, você foi a luz mais pura que já passou pela minha vida. Cada olhar seu, cada abraço, cada sorriso me ensinou o que é amor de verdade.",
    top: "8%",
    left: "17%",
  },
  {
    name: "Luna",
    photo: photoLuna,
    description:
      "A melhor companhia que seus tutores poderiam ter. Viveu seus 10 lindos anos com doçura, meiguice, pureza e leveza.",
    top: "34%",
    left: "17%",
  },
  {
    name: "Zeus",
    photo: photoZeus,
    description: "Um cachorrinho muito amoroso e carinhoso. Sempre irá ficar na minha memória.",
    top: "60%",
    left: "17%",
  },
  {
    name: "Thor",
    photo: photoThor,
    description:
      "O amor em forma de cachorro. Viveu 15 anos com sua família, hoje a família toda sente sua falta.",
    top: "86%",
    left: "17%",
  },
  {
    name: "Bella",
    photo: photoBella,
    description:
      "A princesinha da família, sempre cheia de lacinhos lindos e muito amor para dar.",
    top: "8%",
    left: "50%",
  },
  {
    name: "Mel",
    photo: photoMel,
    description:
      "Momentos incríveis foram vividos ao seu lado, sua família sente saudades todos os momentos.",
    top: "34%",
    left: "50%",
  },
  {
    name: "Max",
    photo: photoMax,
    description: "Cada pulo, cada brincadeira, cada sorriso seu era pura felicidade.",
    top: "60%",
    left: "50%",
  },
  {
    name: "Duke",
    photo: photoDuke,
    description:
      "Meu Duke, sua força e sua nobreza escondiam um coração cheio de carinho. Cada olhar seu era proteção, cada gesto era amor puro.",
    top: "86%",
    left: "50%",
  },
  {
    name: "Lola",
    photo: photoLola,
    description: "Vou te levar sempre comigo, minha menina. Até um dia, meu amor.",
    top: "8%",
    left: "83%",
  },
  {
    name: "Amora",
    photo: photoAmora,
    description: "Minha Amora, sua doçura e seu jeitinho carinhoso enchiam a casa de amor.",
    top: "34%",
    left: "83%",
  },
  {
    name: "Simba",
    photo: photoSimba,
    description:
      "Você se foi, mas cada latido, cada correria, cada momento ao seu lado ficou guardado no meu coração para sempre.",
    top: "60%",
    left: "83%",
  },
  {
    name: "Toby",
    photo: photoToby,
    description:
      "Seu jeito calmo e seu olhar sereno traziam paz para os meus dias. Você foi companheiro fiel, discreto no amor mas gigante na presença.",
    top: "86%",
    left: "83%",
  },
];

type Pet = (typeof PETS)[number];

function buildConstellationPath() {
  const points = PETS.map((pet) => ({
    x: Number.parseFloat(pet.left),
    y: Number.parseFloat(pet.top),
  }));
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function useStarfield(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
      })),
    [count],
  );
}

export default function Memorial() {
  const [selected, setSelected] = useState<Pet | null>(null);
  const stars = useStarfield(50);
  const constellationPath = useMemo(() => buildConstellationPath(), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section id="galeria" className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-b from-bronze-900 via-[#1c150d] to-bronze-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-14 relative z-10"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-sand-300 uppercase">
            Memorial
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-cream mt-4 mb-4">
            O céu ficou mais lindo com essas estrelas
          </h2>
          <p className="text-cream/60 text-sm sm:text-base leading-relaxed">
            Uma homenagem aos pets que se tornaram estrelinhas e continuam
            brilhando em nossa memória.
          </p>
        </motion.div>

        <div className="relative h-[760px] sm:h-[720px] md:h-[700px]">
          {stars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-cream/80 animate-pulse"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
                animationDuration: "3s",
              }}
            />
          ))}

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={constellationPath}
              fill="none"
              stroke="#D2BD94"
              strokeOpacity={0.35}
              strokeWidth={0.3}
              strokeDasharray="1.2 1.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {PETS.map((pet, index) => (
            <motion.button
              key={pet.name}
              type="button"
              onClick={() => setSelected(pet)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ top: pet.top, left: pet.left }}
            >
              <Sparkles
                size={16}
                className="mb-1 text-sand-200 drop-shadow-[0_0_6px_rgba(230,200,140,0.85)]"
              />
              <span className="h-3 w-px bg-sand-300/50" />
              <span className="rounded-lg border-2 border-cream/90 bg-cream p-1 shadow-lg transition-transform group-hover:scale-110">
                <img
                  src={pet.photo}
                  alt={pet.name}
                  loading="lazy"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded object-cover"
                />
              </span>
              <span className="mt-2 font-display text-xs sm:text-sm text-cream/90">
                {pet.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-xs overflow-hidden rounded-3xl bg-cream shadow-2xl"
            >
              <div className="relative">
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="aspect-square w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Fechar"
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-cream hover:bg-black/70"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5 text-center">
                <h3 className="font-display text-xl text-bronze-700 mb-1">
                  {selected.name}
                </h3>
                <p className="text-sm text-ink/70">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

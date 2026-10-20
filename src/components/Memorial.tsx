import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, PointerEvent, RefObject } from "react";
import { DOG_SHAPES, smoothPath } from "../lib/constellations";
import type { DogShapeName, Point } from "../lib/constellations";

type Placement = { x: number; y: number; scale: number; rotate: number };

type Pet = {
  name: string;
  description: string;
  shape: DogShapeName;
  desktop: Placement;
  mobile: Placement;
};

const PETS: Pet[] = [
  {
    name: "Bidu",
    description:
      "Meu Bidu, você foi a luz mais pura que já passou pela minha vida. Cada olhar seu, cada abraço, cada sorriso me ensinou o que é amor de verdade.",
    shape: "standing",
    desktop: { x: 225, y: 185, scale: 1.2, rotate: -3 },
    mobile: { x: 190, y: 110, scale: 1, rotate: -3 },
  },
  {
    name: "Max",
    description: "Cada pulo, cada brincadeira, cada sorriso seu era pura felicidade.",
    shape: "running",
    desktop: { x: 650, y: 200, scale: 1.1, rotate: -7 },
    mobile: { x: 215, y: 320, scale: 0.95, rotate: -7 },
  },
  {
    name: "Mel",
    description:
      "Momentos incríveis foram vividos ao seu lado, sua família sente saudades todos os momentos.",
    shape: "lying",
    desktop: { x: 320, y: 545, scale: 1.1, rotate: 2 },
    mobile: { x: 175, y: 905, scale: 0.95, rotate: 2 },
  },
  {
    name: "Zeus",
    description: "Um cachorrinho muito amoroso e carinhoso. Sempre irá ficar na minha memória.",
    shape: "dachshund",
    desktop: { x: 690, y: 505, scale: 1.05, rotate: 4 },
    mobile: { x: 250, y: 720, scale: 0.9, rotate: 4 },
  },
  {
    name: "Luna",
    description:
      "A melhor companhia que seus tutores poderiam ter. Viveu seus 10 lindos anos com doçura, meiguice, pureza e leveza.",
    shape: "sitting",
    desktop: { x: 1065, y: 245, scale: 1, rotate: 0 },
    mobile: { x: 110, y: 520, scale: 0.85, rotate: 0 },
  },
  {
    name: "Amora",
    description: "Minha Amora, sua doçura e seu jeitinho carinhoso enchiam a casa de amor.",
    shape: "playBow",
    desktop: { x: 1000, y: 650, scale: 1.1, rotate: -3 },
    mobile: { x: 235, y: 1100, scale: 0.95, rotate: -3 },
  },
];

const SKY = {
  desktop: { width: 1200, height: 780 },
  mobile: { width: 400, height: 1220 },
};

type Layout = keyof typeof SKY;

// Raio, halo e brilho de difração por magnitude (1 = mais brilhante).
const MAGNITUDE = {
  1: { core: 2.7, halo: 15, spike: 13 },
  2: { core: 1.9, halo: 9, spike: 7 },
  3: { core: 1.3, halo: 5, spike: 0 },
};

type Star = { x: number; y: number; magnitude: 1 | 2 | 3; delay: number };

type Constellation = {
  pet: Pet;
  transform: string;
  silhouette: string;
  details: string[];
  lines: string[];
  stars: Star[];
  box: { left: number; top: number; right: number; bottom: number };
  cx: number;
};

// Gerador pseudoaleatório com semente, para o céu ficar sempre igual.
function seededRandom(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildConstellations(layout: Layout): Constellation[] {
  const random = seededRandom(7);
  return PETS.map((pet) => {
    const shape = DOG_SHAPES[pet.shape];
    const place = pet[layout];
    const angle = (place.rotate * Math.PI) / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const project = ([px, py]: Point): Point => {
      const dx = (px - shape.width / 2) * place.scale;
      const dy = (py - shape.height / 2) * place.scale;
      return [place.x + dx * cos - dy * sin, place.y + dx * sin + dy * cos];
    };

    const stars: Star[] = shape.stars.map(([px, py, magnitude]) => {
      const [x, y] = project([px, py]);
      return { x, y, magnitude, delay: random() * 5 };
    });

    // Linhas param antes de encostar nas estrelas, como nos atlas celestes.
    const lines = shape.lines.map(([a, b]) => {
      const from = stars[a];
      const to = stars[b];
      const length = Math.hypot(to.x - from.x, to.y - from.y);
      const ux = (to.x - from.x) / length;
      const uy = (to.y - from.y) / length;
      const gapFrom = MAGNITUDE[from.magnitude].core + 4;
      const gapTo = MAGNITUDE[to.magnitude].core + 4;
      return `M${(from.x + ux * gapFrom).toFixed(1)} ${(from.y + uy * gapFrom).toFixed(1)} L${(to.x - ux * gapTo).toFixed(1)} ${(to.y - uy * gapTo).toFixed(1)}`;
    });

    const outline = shape.outline.map(project);
    const xs = outline.map(([x]) => x);
    const ys = outline.map(([, y]) => y);
    const box = {
      left: Math.min(...xs),
      top: Math.min(...ys),
      right: Math.max(...xs),
      bottom: Math.max(...ys),
    };

    return {
      pet,
      transform: `translate(${place.x} ${place.y}) rotate(${place.rotate}) scale(${place.scale}) translate(${-shape.width / 2} ${-shape.height / 2})`,
      silhouette: smoothPath(shape.outline, true),
      details: shape.details.map((detail) => smoothPath(detail, false)),
      lines,
      stars,
      box,
      cx: (box.left + box.right) / 2,
    };
  });
}

function gaussian(random: () => number) {
  return Math.sqrt(-2 * Math.log(random() || 1e-9)) * Math.cos(2 * Math.PI * random());
}

// Pinta o céu denso (milhares de estrelas e a Via Láctea) num canvas.
function paintSky(canvas: HTMLCanvasElement) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx || width === 0 || height === 0) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const random = seededRandom(2024);
  const start = { x: -0.1 * width, y: 0.88 * height };
  const end = { x: 1.1 * width, y: 0.12 * height };
  const bandLength = Math.hypot(end.x - start.x, end.y - start.y);
  const normal = { x: -(end.y - start.y) / bandLength, y: (end.x - start.x) / bandLength };
  const bandWidth = Math.min(width, height) * 0.16 + Math.max(width, height) * 0.03;
  const onBand = (t: number, offset: number) => ({
    x: start.x + (end.x - start.x) * t + normal.x * offset,
    y: start.y + (end.y - start.y) * t + normal.y * offset,
  });

  const glow = (x: number, y: number, radius: number, color: string) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  };

  // Brilho difuso da Via Láctea
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i <= 60; i++) {
    const t = i / 60;
    const p = onBand(t, gaussian(random) * bandWidth * 0.25);
    glow(p.x, p.y, bandWidth * (1.1 + random() * 0.9), "rgba(214,190,150,0.045)");
    if (random() > 0.4) {
      const q = onBand(t, gaussian(random) * bandWidth * 0.18);
      glow(q.x, q.y, bandWidth * (0.35 + random() * 0.4), "rgba(255,236,205,0.05)");
    }
    if (random() > 0.75) {
      const q = onBand(t, gaussian(random) * bandWidth * 0.6);
      glow(q.x, q.y, bandWidth * 0.7, "rgba(150,140,200,0.025)");
    }
  }

  // Nuvens de poeira escura cortando a faixa
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 26; i++) {
    const p = onBand(random(), gaussian(random) * bandWidth * 0.15 + bandWidth * 0.08);
    glow(p.x, p.y, bandWidth * (0.2 + random() * 0.35), "rgba(14,10,6,0.35)");
  }

  ctx.globalCompositeOperation = "lighter";
  const tints = ["255,250,240", "255,250,240", "255,244,224", "243,223,180", "214,226,255"];
  const drawStar = (x: number, y: number, radius: number, alpha: number) => {
    const tint = tints[Math.floor(random() * tints.length)];
    if (radius > 1.3) glow(x, y, radius * 5, `rgba(${tint},${alpha * 0.18})`);
    ctx.fillStyle = `rgba(${tint},${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  };

  // Estrelas espalhadas pelo céu todo
  const area = width * height;
  const fieldCount = Math.round(area / 380);
  for (let i = 0; i < fieldCount; i++) {
    const size = random();
    drawStar(
      random() * width,
      random() * height,
      0.25 + size ** 7 * 1.6,
      0.25 + random() * 0.6 + size ** 6 * 0.3,
    );
  }

  // Poeira de estrelas concentrada na Via Láctea
  const bandCount = Math.round(area / 260);
  for (let i = 0; i < bandCount; i++) {
    const p = onBand(random(), gaussian(random) * bandWidth * 0.45);
    drawStar(p.x, p.y, 0.2 + random() ** 8 * 1.1, 0.2 + random() * 0.55);
  }
  ctx.globalCompositeOperation = "source-over";
}

function useLayout(): Layout {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setIsDesktop(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  return isDesktop ? "desktop" : "mobile";
}

function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((current) =>
        Math.abs(current.width - width) < 1 && Math.abs(current.height - height) < 1
          ? current
          : { width, height },
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}

type ShootingStar = { id: number; x: number; y: number; angle: number; length: number };

function useShootingStars(enabled: boolean, width: number, height: number) {
  const [items, setItems] = useState<ShootingStar[]>([]);
  useEffect(() => {
    if (!enabled || width === 0) return;
    let id = 0;
    let timeout: number;
    const spawn = () => {
      const item = {
        id: id++,
        x: width * (0.2 + Math.random() * 0.75),
        y: height * Math.random() * 0.55,
        angle: 145 + Math.random() * 20,
        length: 90 + Math.random() * 110,
      };
      setItems((current) => [...current, item]);
      window.setTimeout(() => {
        setItems((current) => current.filter((s) => s.id !== item.id));
      }, 1600);
      timeout = window.setTimeout(spawn, 3000 + Math.random() * 5000);
    };
    timeout = window.setTimeout(spawn, 2000);
    return () => window.clearTimeout(timeout);
  }, [enabled, width, height]);
  return items;
}

function ConstellationStar({ star, active }: { star: Star; active: boolean }) {
  const { core, halo, spike } = MAGNITUDE[star.magnitude];
  const boost = active ? 1.5 : 1;
  return (
    <g className="twinkle-soft" style={{ animationDelay: `${star.delay}s` }}>
      <motion.circle
        cx={star.x}
        cy={star.y}
        fill="url(#star-halo)"
        animate={{ r: halo * boost }}
        transition={{ duration: 0.4 }}
      />
      {spike > 0 && (
        <>
          <motion.ellipse
            cx={star.x}
            cy={star.y}
            rx={0.55}
            fill="url(#star-spike)"
            animate={{ ry: spike * boost }}
            transition={{ duration: 0.4 }}
          />
          <motion.ellipse
            cx={star.x}
            cy={star.y}
            ry={0.55}
            fill="url(#star-spike)"
            animate={{ rx: spike * boost }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}
      <motion.circle
        cx={star.x}
        cy={star.y}
        fill="#fffaf0"
        animate={{ r: core * (active ? 1.25 : 1) }}
        transition={{ duration: 0.4 }}
      />
    </g>
  );
}

type WishStar = { id: number; x: number; y: number };

export default function Memorial() {
  const layout = useLayout();
  const sky = SKY[layout];
  const reduceMotion = useReducedMotion() ?? false;
  const constellations = useMemo(() => buildConstellations(layout), [layout]);

  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pointerType = useRef("mouse");
  const sectionSize = useElementSize(sectionRef);
  const inView = useInView(skyRef, { once: true, amount: 0.15 });
  const revealed = inView || reduceMotion;

  const [active, setActive] = useState<string | null>(null);
  const [wishes, setWishes] = useState<WishStar[]>([]);
  const [wishMessage, setWishMessage] = useState<WishStar | null>(null);
  const shootingStars = useShootingStars(
    inView && !reduceMotion,
    sectionSize.width,
    sectionSize.height,
  );

  // Estrelas maiores que piscam por cima do céu pintado.
  const twinklers = useMemo(() => {
    const random = seededRandom(11);
    const count = Math.round((sectionSize.width * sectionSize.height) / 9000);
    return Array.from({ length: count }, (_, id) => ({
      id,
      x: random() * sectionSize.width,
      y: random() * sectionSize.height,
      r: 0.8 + random() ** 2 * 1.3,
      delay: random() * 6,
      duration: 2.5 + random() * 4,
    }));
  }, [sectionSize.width, sectionSize.height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas && sectionSize.width > 0) paintSky(canvas);
  }, [sectionSize.width, sectionSize.height]);

  // Parallax suave: o fundo se move mais que as constelações.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 40, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 40, damping: 18 });
  const farX = useTransform(smoothX, (v) => v * -24);
  const farY = useTransform(smoothY, (v) => v * -16);
  const nearX = useTransform(smoothX, (v) => v * -8);
  const nearY = useTransform(smoothY, (v) => v * -6);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function lightWish(event: MouseEvent<SVGSVGElement>) {
    setActive(null);
    const matrix = svgRef.current?.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    const wish = { id: Date.now(), x: point.x, y: point.y };
    setWishes((current) => [...current.slice(-39), wish]);
    setWishMessage(wish);
  }

  useEffect(() => {
    if (!wishMessage) return;
    const timeout = window.setTimeout(() => setWishMessage(null), 2600);
    return () => window.clearTimeout(timeout);
  }, [wishMessage]);

  const current = constellations.find((c) => c.pet.name === active) ?? null;
  const captionBelow = current ? current.box.bottom < sky.height - 170 : true;
  const captionX = current
    ? layout === "desktop"
      ? Math.min(Math.max(current.cx, 170), sky.width - 170)
      : sky.width / 2
    : 0;
  const captionY = current ? (captionBelow ? current.box.bottom + 14 : current.box.top - 14) : 0;

  return (
    <section
      ref={sectionRef}
      id="galeria"
      onPointerMove={handlePointerMove}
      className="relative py-20 sm:py-28 overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#21190f_0%,#130e08_55%,#0c0905_100%)]"
    >
      {/* Céu de fundo: Via Láctea, milhares de estrelas e estrelas cadentes */}
      <motion.div
        className="pointer-events-none absolute -inset-8"
        style={{ x: farX, y: farY }}
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${sectionSize.width || 1} ${sectionSize.height || 1}`}
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient id="twinkle-halo">
              <stop offset="0%" stopColor="#fff6e0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff6e0" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="meteor-tail" x1="0" x2="1">
              <stop offset="0%" stopColor="#fffaf0" stopOpacity="0" />
              <stop offset="100%" stopColor="#fffaf0" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          {twinklers.map((star) => (
            <g
              key={star.id}
              className="twinkle"
              style={{ animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }}
            >
              <circle cx={star.x} cy={star.y} r={star.r * 4} fill="url(#twinkle-halo)" opacity={0.35} />
              <circle cx={star.x} cy={star.y} r={star.r} fill="#fffaf0" />
            </g>
          ))}
          {shootingStars.map((star) => (
            <g key={star.id} transform={`translate(${star.x} ${star.y}) rotate(${star.angle})`}>
              <motion.g
                initial={{ x: 0, opacity: 0 }}
                animate={{ x: 460, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.3, ease: "easeIn", times: [0, 0.15, 0.7, 1] }}
              >
                <line
                  x1={-star.length}
                  y1={0}
                  x2={0}
                  y2={0}
                  stroke="url(#meteor-tail)"
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />
                <circle r={1.7} fill="#fffaf0" />
              </motion.g>
            </g>
          ))}
        </svg>
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-6 relative z-10"
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
          <p className="mt-5 text-xs tracking-wide text-sand-300/70">
            Passe o mouse ou toque em uma constelação para ver quem brilha ali.
            <br className="sm:hidden" /> Toque no céu para acender uma estrela.
          </p>
        </motion.div>

        <motion.div
          ref={skyRef}
          className="relative mx-auto w-full"
          style={{ aspectRatio: `${sky.width} / ${sky.height}`, x: nearX, y: nearY }}
        >
          <svg
            ref={svgRef}
            className="absolute inset-0 h-full w-full cursor-crosshair select-none overflow-visible"
            viewBox={`0 0 ${sky.width} ${sky.height}`}
            onClick={lightWish}
            role="group"
            aria-label="Constelações em homenagem aos pets"
          >
            <defs>
              <radialGradient id="star-halo">
                <stop offset="0%" stopColor="#fff6dc" stopOpacity="0.85" />
                <stop offset="30%" stopColor="#f3dfb4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f3dfb4" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="star-spike">
                <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#fffaf0" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="silhouette-fill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f3dfb4" />
                <stop offset="100%" stopColor="#cba86e" />
              </linearGradient>
              <filter id="silhouette-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {wishes.map((wish) => (
              <g key={wish.id} pointerEvents="none">
                <motion.circle
                  cx={wish.x}
                  cy={wish.y}
                  fill="none"
                  stroke="#f3dfb4"
                  strokeWidth={0.8}
                  initial={{ r: 2, opacity: 0.9 }}
                  animate={{ r: 36, opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
                <ConstellationStar star={{ x: wish.x, y: wish.y, magnitude: 2, delay: 0 }} active={false} />
              </g>
            ))}

            {constellations.map((constellation, index) => {
              const { pet, transform, silhouette, details, lines, stars, box } = constellation;
              const isActive = active === pet.name;
              const dimmed = active !== null && !isActive;
              const delay = 0.1 + index * 0.15;
              return (
                <motion.g
                  key={pet.name}
                  role="button"
                  tabIndex={0}
                  aria-label={`${pet.name}: ${pet.description}`}
                  className="cursor-pointer outline-none"
                  animate={{ opacity: dimmed ? 0.4 : 1 }}
                  transition={{ duration: 0.5 }}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActive(pet.name);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse") setActive(null);
                  }}
                  onPointerDown={(event) => {
                    pointerType.current = event.pointerType;
                  }}
                  onFocus={() => setActive(pet.name)}
                  onBlur={() => setActive(null)}
                  onClick={(event) => {
                    event.stopPropagation();
                    // No toque, um segundo toque fecha; no mouse o hover já controla.
                    const isTouch = pointerType.current !== "mouse";
                    setActive((name) => (isTouch && name === pet.name ? null : pet.name));
                  }}
                >
                  {/* Área de toque generosa ao redor da constelação */}
                  <rect
                    x={box.left - 16}
                    y={box.top - 16}
                    width={box.right - box.left + 32}
                    height={box.bottom - box.top + 32}
                    rx={24}
                    fill="transparent"
                  />

                  {/* Silhueta do cachorro, como nos atlas celestes */}
                  <motion.g
                    transform={transform}
                    initial={{ opacity: reduceMotion ? 1 : 0 }}
                    animate={{ opacity: revealed ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: delay + 0.3 }}
                  >
                    <motion.path
                      d={silhouette}
                      fill="url(#silhouette-fill)"
                      filter="url(#silhouette-glow)"
                      animate={{ fillOpacity: isActive ? 0.16 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.path
                      d={silhouette}
                      fill="url(#silhouette-fill)"
                      stroke="#f3dfb4"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                      animate={{
                        fillOpacity: isActive ? 0.13 : 0.06,
                        strokeOpacity: isActive ? 0.75 : 0.34,
                        strokeWidth: isActive ? 1.1 : 0.8,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    {details.map((d) => (
                      <motion.path
                        key={d}
                        d={d}
                        fill="none"
                        stroke="#f3dfb4"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                        animate={{ strokeOpacity: isActive ? 0.55 : 0.18, strokeWidth: 0.7 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </motion.g>

                  {lines.map((d, lineIndex) => (
                    <motion.path
                      key={d}
                      d={d}
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: reduceMotion ? 1 : 0 }}
                      animate={{
                        pathLength: revealed ? 1 : 0,
                        strokeOpacity: isActive ? 0.95 : 0.5,
                        strokeWidth: isActive ? 1.3 : 0.9,
                      }}
                      stroke={isActive ? "#fbe7bd" : "#e9dbbf"}
                      transition={{
                        pathLength: { duration: 0.5, delay: delay + lineIndex * 0.03, ease: "easeOut" },
                        default: { duration: 0.4 },
                      }}
                    />
                  ))}

                  {stars.map((star, starIndex) => (
                    <motion.g
                      key={`${star.x}-${star.y}`}
                      initial={{ opacity: reduceMotion ? 1 : 0 }}
                      animate={{ opacity: revealed ? 1 : 0 }}
                      transition={{ duration: 0.4, delay: delay + starIndex * 0.02 }}
                    >
                      <ConstellationStar star={star} active={isActive} />
                    </motion.g>
                  ))}
                </motion.g>
              );
            })}
          </svg>

          {/* Nome e homenagem da constelação ativa */}
          <AnimatePresence>
            {current && (
              <motion.div
                key={current.pet.name}
                initial={{ opacity: 0, y: captionBelow ? -8 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="pointer-events-none absolute z-10 w-[min(300px,86vw)] text-center"
                style={{
                  left: `${(captionX / sky.width) * 100}%`,
                  top: `${(captionY / sky.height) * 100}%`,
                  translate: captionBelow ? "-50% 0" : "-50% -100%",
                }}
              >
                <p className="font-display text-2xl sm:text-3xl uppercase tracking-[0.35em] pl-[0.35em] text-sand-100 [text-shadow:0_0_20px_rgba(231,194,125,0.7)]">
                  {current.pet.name}
                </p>
                <div className="mx-auto my-2 flex items-center justify-center gap-2 text-sand-300/70">
                  <span className="h-px w-10 bg-gradient-to-r from-transparent to-sand-300/60" />
                  <span className="text-[10px]">✦</span>
                  <span className="h-px w-10 bg-gradient-to-l from-transparent to-sand-300/60" />
                </div>
                <p className="font-display text-sm sm:text-[15px] italic leading-relaxed text-cream/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.95)]">
                  {current.pet.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {wishMessage && (
              <motion.p
                key={wishMessage.id}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -14 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute whitespace-nowrap font-display text-sm italic text-sand-200 [text-shadow:0_0_10px_rgba(0,0,0,0.9)]"
                style={{
                  left: `${(Math.min(Math.max(wishMessage.x, 90), sky.width - 90) / sky.width) * 100}%`,
                  top: `${(wishMessage.y / sky.height) * 100}%`,
                  translate: "-50% -150%",
                }}
              >
                Mais uma estrela no céu ✦
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

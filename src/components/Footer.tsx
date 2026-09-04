import logo from "../assets/logo.png";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "./icons/SocialIcons";
import { CONTACT } from "../lib/constants";

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/amor.eternopetss?igsi=MWxkcDUzMWFhZWl5OA==",
    icon: InstagramIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@amoreternopets",
    icon: TikTokIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AmorEternoCP",
    icon: YouTubeIcon,
  },
];

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Quem Somos", href: "#sobre" },
  { label: "Planos", href: "#planos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bronze-800 text-cream/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Amor Eterno Pets" className="h-12 w-12 object-contain" />
            <span className="font-display text-lg text-cream">Amor Eterno Pets</span>
          </div>
          <p className="text-sm leading-relaxed text-cream/60">
            Cuidado, respeito e memória para quem sempre esteve ao seu lado.
          </p>
        </div>

        <div>
          <h4 className="font-display text-cream mb-4">Navegação</h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-cream transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-cream mb-4">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>{CONTACT.phone}</li>
            <li>{CONTACT.email}</li>
            <li>{CONTACT.address}</li>
            <li>{CONTACT.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-cream mb-4">Redes Sociais</h4>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="h-10 w-10 rounded-full bg-cream/10 hover:bg-olive-500 flex items-center justify-center transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 px-4 sm:px-6">
        <p className="text-center text-xs text-cream/50">
          © {year} Amor Eterno Pets. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

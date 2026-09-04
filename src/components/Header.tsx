import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoHeader from "../assets/logo-header.png";
import { WhatsAppIcon } from "./icons/SocialIcons";
import { whatsappLink } from "../lib/constants";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Quem Somos", href: "#sobre" },
  { label: "Planos", href: "#planos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-cream via-cream to-sand-200/70 backdrop-blur-sm border-b border-sand-200">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 h-24 sm:h-28">
        <a href="#inicio" className="flex items-center shrink-0 justify-self-start">
          <img src={logoHeader} alt="Amor Eterno Pets" className="h-10 sm:h-12 w-auto object-contain" />
        </a>

        <nav className="hidden lg:flex items-center justify-center gap-8 justify-self-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-ink/80 hover:text-bronze-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink("Olá! Gostaria de saber mais sobre os serviços da Amor Eterno Pets.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-cream px-6 py-3 rounded-full text-base font-semibold transition-colors shadow-sm justify-self-end"
        >
          <WhatsAppIcon size={20} />
          Fale conosco
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-bronze-700 justify-self-end col-start-3"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-sand-200 px-4 sm:px-6 py-5 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-ink/80 hover:text-bronze-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink("Olá! Gostaria de saber mais sobre os serviços da Amor Eterno Pets.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-olive-600 text-cream px-6 py-3.5 rounded-full text-base font-semibold"
          >
            <WhatsAppIcon size={20} />
            Fale conosco
          </a>
        </div>
      )}
    </header>
  );
}

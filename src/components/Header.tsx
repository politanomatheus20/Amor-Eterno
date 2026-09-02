import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-sand-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-20">
        <a href="#inicio" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Amor Eterno Pets" className="h-12 w-12 object-contain" />
          <span className="font-display text-lg sm:text-xl text-bronze-700 leading-tight">
            Amor Eterno
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 hover:text-bronze-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={whatsappLink("Olá! Gostaria de saber mais sobre os serviços da Amor Eterno Pets.")}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-cream px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm"
        >
          <MessageCircle size={18} />
          Fale conosco
        </a>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-bronze-700"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cream border-t border-sand-200 px-4 sm:px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-ink/80 hover:text-bronze-600"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink("Olá! Gostaria de saber mais sobre os serviços da Amor Eterno Pets.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-olive-600 text-cream px-5 py-3 rounded-full text-sm font-semibold"
          >
            <MessageCircle size={18} />
            Fale conosco
          </a>
        </div>
      )}
    </header>
  );
}

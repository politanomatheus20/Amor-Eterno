import { WhatsAppIcon } from "./icons/SocialIcons";
import { whatsappLink } from "../lib/constants";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Olá! Vim pelo site da Amor Eterno Pets e preciso de atendimento.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco no WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <span className="absolute inset-0 rounded-full bg-olive-500 animate-ping opacity-60" aria-hidden="true" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-olive-600 text-cream shadow-lg group-hover:bg-olive-700 transition-colors">
        <WhatsAppIcon size={36} />
      </span>
    </a>
  );
}

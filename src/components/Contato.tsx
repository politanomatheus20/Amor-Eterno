import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { CONTACT, whatsappLink } from "../lib/constants";

const SERVICE_OPTIONS = [
  "Cremação Individual",
  "Cremação Coletiva",
  "Remoção no Local",
  "Urnas Personalizadas",
];

export default function Contato() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    clinicName: "",
    clinicAddress: "",
    petAddress: "",
  });
  const [atClinic, setAtClinic] = useState<boolean | null>(null);
  const [locationError, setLocationError] = useState(false);
  const [service, setService] = useState<string | null>(null);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (atClinic === null) {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    const locationInfo =
      atClinic
        ? `Meu pet está em uma clínica/hospital veterinário: ${form.clinicName}. Endereço: ${form.clinicAddress}.`
        : `Endereço onde o pet está localizado: ${form.petAddress}.`;

    const message = [
      `Olá! Meu nome é ${form.name}, responsável pelo pet.`,
      `Telefone para contato: ${form.phone}.`,
      locationInfo,
      service ? `Serviço de interesse: ${service}.` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-bronze-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-olive-200/30 blur-3xl"
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
            Contato
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-bronze-700 mt-4">
            Estamos aqui para acolher você
          </h2>
        </motion.div>

        <div className="grid grid-cols-5 gap-3 sm:gap-6 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="col-span-2 flex flex-col gap-3 sm:gap-6"
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 min-w-0">
                <div className="h-7 w-7 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-olive-100 flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-olive-700 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-sm text-ink/50">Telefone / WhatsApp</p>
                  <p className="text-xs sm:text-base font-medium text-bronze-700 break-words">{CONTACT.phone}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 min-w-0">
                <div className="h-7 w-7 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-olive-100 flex items-center justify-center shrink-0">
                  <Mail size={13} className="text-olive-700 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-sm text-ink/50">E-mail</p>
                  <p className="text-xs sm:text-base font-medium text-bronze-700 break-words">{CONTACT.email}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 min-w-0">
                <div className="h-7 w-7 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-olive-100 flex items-center justify-center shrink-0">
                  <MapPin size={13} className="text-olive-700 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-sm text-ink/50">Endereço</p>
                  <p className="text-xs sm:text-base font-medium text-bronze-700 break-words">{CONTACT.address}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 min-w-0">
                <div className="h-7 w-7 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-olive-100 flex items-center justify-center shrink-0">
                  <Clock size={13} className="text-olive-700 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-sm text-ink/50">Horário</p>
                  <p className="text-xs sm:text-base font-medium text-bronze-700 break-words">{CONTACT.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-sand-200 aspect-square sm:aspect-video">
              <iframe
                title="Localização da Amor Eterno Pets"
                src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address)}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="col-span-3 bg-sand-50 border border-sand-200 rounded-xl sm:rounded-3xl p-3 sm:p-9 space-y-3 sm:space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-bronze-700 mb-1 sm:mb-2">
                Nome completo do responsável
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full min-w-0 rounded-lg sm:rounded-xl border border-sand-300 bg-white px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-bronze-700 mb-1 sm:mb-2">
                Telefone para contato
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full min-w-0 rounded-lg sm:rounded-xl border border-sand-300 bg-white px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-medium text-bronze-700 mb-1 sm:mb-2">
                Onde o seu pet está localizado?
              </span>
              <p className="text-[10px] sm:text-xs text-ink/60 mb-2 sm:mb-3">
                Seu pet está em alguma clínica ou hospital veterinário?
              </p>
              <div className="flex gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setAtClinic(true);
                    setLocationError(false);
                  }}
                  className={`flex-1 rounded-lg sm:rounded-xl border px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                    atClinic === true
                      ? "border-olive-600 bg-olive-600 text-cream"
                      : "border-sand-300 bg-white text-ink/70 hover:border-olive-400"
                  }`}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAtClinic(false);
                    setLocationError(false);
                  }}
                  className={`flex-1 rounded-lg sm:rounded-xl border px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                    atClinic === false
                      ? "border-olive-600 bg-olive-600 text-cream"
                      : "border-sand-300 bg-white text-ink/70 hover:border-olive-400"
                  }`}
                >
                  Não
                </button>
              </div>
              {locationError && (
                <p className="text-[10px] sm:text-xs text-red-600 mt-1.5 sm:mt-2">
                  Selecione uma opção para continuar.
                </p>
              )}

              {atClinic === true && (
                <div className="mt-3 sm:mt-4 space-y-2.5 sm:space-y-4">
                  <input
                    type="text"
                    required
                    value={form.clinicName}
                    onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                    className="w-full min-w-0 rounded-lg sm:rounded-xl border border-sand-300 bg-white px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                    placeholder="Nome da clínica ou hospital veterinário"
                  />
                  <input
                    type="text"
                    required
                    value={form.clinicAddress}
                    onChange={(e) => setForm({ ...form, clinicAddress: e.target.value })}
                    className="w-full min-w-0 rounded-lg sm:rounded-xl border border-sand-300 bg-white px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                    placeholder="Endereço da clínica ou hospital veterinário"
                  />
                </div>
              )}

              {atClinic === false && (
                <div className="mt-3 sm:mt-4">
                  <input
                    type="text"
                    required
                    value={form.petAddress}
                    onChange={(e) => setForm({ ...form, petAddress: e.target.value })}
                    className="w-full min-w-0 rounded-lg sm:rounded-xl border border-sand-300 bg-white px-2.5 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-olive-400"
                    placeholder="Endereço onde o pet está localizado"
                  />
                </div>
              )}
            </div>

            <div>
              <span className="block text-xs sm:text-sm font-medium text-bronze-700 mb-1 sm:mb-2">
                Qual tipo de serviço você está precisando?
              </span>
              <p className="text-[10px] sm:text-xs text-ink/60 mb-2 sm:mb-3">Opcional, mas agiliza o atendimento.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {SERVICE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setService(service === option ? null : option)}
                    className={`rounded-lg sm:rounded-xl border px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold transition-colors ${
                      service === option
                        ? "border-olive-600 bg-olive-600 text-cream"
                        : "border-sand-300 bg-white text-ink/70 hover:border-olive-400"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-olive-600 hover:bg-olive-700 text-cream px-3 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-base rounded-full font-semibold transition-colors"
            >
              <Send size={16} className="sm:w-[18px] sm:h-[18px] shrink-0" />
              Enviar via WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export const CONTACT = {
  phone: "+55 11 94490-6565",
  whatsappNumber: "5511944906565",
  email: "amoreternopetss@gmail.com",
  address: "Rua Tenente Azevedo, 199, sala 04 - Aclimação, São Paulo - SP, CEP 01528-000",
  hours: "Atendimento 24h, todos os dias",
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}

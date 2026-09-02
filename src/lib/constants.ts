// TODO: substituir pelos dados reais assim que definidos com o sócio
export const CONTACT = {
  phone: "[TELEFONE]",
  whatsappNumber: "55SEUNUMERO", // TODO: formato 55DDDNUMERO, ex: 5518999999999
  email: "contato@amoreternopets.com.br",
  address: "[ENDEREÇO, CIDADE - UF]",
  hours: "Atendimento 24h, todos os dias",
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${text}`;
}

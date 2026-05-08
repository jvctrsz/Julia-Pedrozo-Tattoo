import type { Metadata } from "next";
import PageHeader from "../Components/PageHeader";
import { FAQList } from "../Components/faq/FAQList";
import { FAQCta } from "../Components/faq/FAQCta";

export const metadata: Metadata = {
  title: "Dúvidas Frequentes | Julia Pedrozo Tattoo",
  description:
    "Tire suas dúvidas sobre tatuagem com Julia Pedrozo em Sinop - MT. Veja informações sobre orçamento, agendamento, cuidados pós-tattoo, pagamento e estilos disponíveis.",
  keywords: [
    "dúvidas tatuagem",
    "perguntas frequentes tatuagem",
    "cuidados pós tatuagem",
    "agendamento tattoo sinop",
    "orçamento tatuagem sinop",
    "julia pedrozo",
  ],
  openGraph: {
    title: "Dúvidas Frequentes | Julia Pedrozo Tattoo",
    description:
      "Tire suas dúvidas sobre orçamento, agendamento, cuidados pós-tattoo e estilos disponíveis com Julia Pedrozo em Sinop - MT.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function FaqPage() {
  return (
    <div className="bg-white">
      <PageHeader page="FAQ" title="Dúvidas" subTitle="Frequentes" />
      <FAQList />
      <FAQCta />
    </div>
  );
}

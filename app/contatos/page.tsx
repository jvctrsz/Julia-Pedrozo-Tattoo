import type { Metadata } from "next";
import PageHeader from "../Components/PageHeader";
import ContactInfoSection from "../Components/contact/ContactInfoSection";
import ContactStudioPhoto from "../Components/contact/ContactStudioPhoto";
import ContactWhatsAppCTA from "../Components/contact/ContactWhatsAppCTA";

export const metadata: Metadata = {
  title: "Contatos | Julia Pedrozo Tattoo",
  description:
    "Entre em contato com Julia Pedrozo para agendar sua tatuagem em Sinop, MT. Atendimentos de segunda a sábado.",
  keywords: [
    "contato tatuagem sinop",
    "agendar tatuagem",
    "julia pedrozo contato",
    "studio tattoo sinop mt",
  ],
  openGraph: {
    title: "Contatos | Julia Pedrozo Tattoo",
    description:
      "Entre em contato com Julia Pedrozo para agendar sua tatuagem em Sinop, MT.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function Contacts() {
  return (
    <>
      <PageHeader title="Vamos Criar" subTitle="Juntos" page="Contatos" />

      <section aria-label="Informações de contato" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <ContactInfoSection />
            <ContactWhatsAppCTA />
          </div>
        </div>
      </section>

      <ContactStudioPhoto />
    </>
  );
}

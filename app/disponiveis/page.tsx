import type { Metadata } from "next";
import PageHeader from "../Components/PageHeader";
import { WorksGrid } from "../Components/portfolio/PortfolioGrid";
import ContactWhatsAppCTA from "../Components/contact/ContactWhatsAppCTA";
import { AVAILABLE_WORKS_WHATSAPP_URL } from "@/src/config";

export const metadata: Metadata = {
  title: "Artes disponíveis",
  description:
    "Conheça as artes autorais de Julia Pedrozo disponíveis para tatuagem em Sinop, MT.",
  alternates: {
    canonical: "/disponiveis",
  },
  openGraph: {
    title: "Artes disponíveis | Julia Pedrozo Tattoo",
    description:
      "Conheça as artes autorais de Julia Pedrozo disponíveis para tatuagem em Sinop, MT.",
    url: "/disponiveis",
    type: "website",
    locale: "pt_BR",
  },
};

export default function AvailableWorksPage() {
  return (
    <>
      <PageHeader
        page="Artes disponíveis"
        title="Escolha sua"
        subTitle="Arte"
      />
      <WorksGrid
        type="disponivel"
        galleryLabel="Artes disponíveis para tatuagem"
        emptyMessage="Nenhuma arte disponível nesta categoria no momento."
      />

      <section
        aria-label="Contato sobre uma arte disponível"
        className="border-t border-black/10 py-20 lg:py-28"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactWhatsAppCTA
            title="Gostou de"
            subTitle="uma arte?"
            description="Fale comigo pelo WhatsApp, envie o nome da arte e conversamos sobre tamanho, aplicação e agendamento."
            href={AVAILABLE_WORKS_WHATSAPP_URL}
            buttonLabel="Tenho interesse em uma arte"
          />
        </div>
      </section>
    </>
  );
}

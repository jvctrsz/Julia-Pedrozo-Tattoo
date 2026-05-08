import type { Metadata } from "next";
import PageHeader from "../Components/PageHeader";
import { PortfolioGrid } from "../Components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfólio | Julia Pedrozo Tattoo",
  description:
    "Conheça os trabalhos de Julia Pedrozo — tatuagens em Fine Line, Blackwork e Floral em Sinop, MT.",
  keywords: ["portfólio tatuagem", "fine line sinop", "blackwork sinop", "floral tattoo", "julia pedrozo"],
  openGraph: {
    title: "Portfólio | Julia Pedrozo Tattoo",
    description:
      "Conheça os trabalhos de Julia Pedrozo — tatuagens em Fine Line, Blackwork e Floral em Sinop, MT.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function Portfolio() {
  return (
    <>
      <PageHeader page="Portfólio" title="Minha" subTitle="Arte" />
      <PortfolioGrid />
    </>
  );
}

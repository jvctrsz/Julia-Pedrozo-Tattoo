import type { Metadata } from "next";
import PageHeader from "../Components/PageHeader";
import { AboutTrajectorySection } from "../Components/about/AboutTrajectorySection";
import { AboutSpecializationsSection } from "../Components/about/AboutSpecializationsSection";
import { AboutStudioSection } from "../Components/about/AboutStudioSection";

export const metadata: Metadata = {
  title: "Sobre | Julia Pedrozo Tattoo",
  description:
    "Conheça a trajetória de Julia Pedrozo, tatuadora especialista em Blackwork e Fine Line em Sinop, MT. Também atende Anime, Old School e Floral.",
  keywords: [
    "sobre julia pedrozo",
    "tatuadora sinop",
    "trajetória tatuagem",
    "studio tattoo sinop",
    "blackwork",
    "fine line",
    "anime tattoo",
    "old school",
  ],
  openGraph: {
    title: "Sobre | Julia Pedrozo Tattoo",
    description:
      "Conheça a trajetória de Julia Pedrozo, tatuadora especialista em Blackwork e Fine Line em Sinop, MT. Também atende Anime, Old School e Floral.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function About() {
  return (
    <>
      <PageHeader page="Sobre" title="Minha" subTitle="História" />
      <AboutTrajectorySection />
      <AboutSpecializationsSection />
      <AboutStudioSection />
    </>
  );
}

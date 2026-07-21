"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { featuredWorks } from "@/src/Utils/mockData";
import { ButtonNav } from "@/app/Components";
import SectionTitle from "../SectionTitle";
import WorkCard from "../portfolio/WorkCard";
import { ImageLightbox } from "../portfolio/ImageLightbox";

export const FeaturedWorksSection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section
        aria-label="Galeria de Trabalhos em Destaque"
        className="py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-16"
          >
            <SectionTitle title="Trabalhos" subTitle="Finalizados" />
            <nav
              aria-label="Ver portfólio completo"
              className="hidden sm:block"
            >
              <ButtonNav path="/portfolio">Ver Todos</ButtonNav>
            </nav>
          </motion.div>

          <ul
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            aria-label="Trabalhos selecionados"
          >
            {featuredWorks.map((work, index) => (
              <WorkCard
                key={work.id}
                work={work}
                variant="featured"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onOpen={() => setLightboxIndex(index)}
              />
            ))}
          </ul>

          <nav
            aria-label="Ver portfólio completo"
            className="mt-8 text-center sm:hidden"
          >
            <ButtonNav path="/portfolio">Ver Todos</ButtonNav>
          </nav>
        </div>
      </section>

      <ImageLightbox
        items={featuredWorks}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

export default FeaturedWorksSection;

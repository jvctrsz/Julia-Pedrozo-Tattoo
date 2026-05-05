"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import WorkCard from "./WorkCard";
import { ImageLightbox } from "./ImageLightbox";

interface PortfolioItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
}

interface PortfolioGalleryProps {
  filteredItems: PortfolioItem[];
  activeFilter: string;
  isLoading?: boolean;
}

export const PortfolioGallery = ({
  filteredItems,
  activeFilter,
  isLoading,
}: PortfolioGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section aria-label="Itens do portfólio" className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.ul
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              aria-label={`Trabalhos de ${activeFilter === "Todos" ? "todas as categorias" : activeFilter}`}
            >
              {filteredItems.map((item, index) => (
                <WorkCard
                  key={item.id}
                  work={item}
                  variant="gallery"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setLightboxIndex(index)}
                />
              ))}

              {isLoading &&
                Array.from({ length: 3 }).map((_, i) => (
                  <motion.li
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="aspect-3/4 bg-black/5 animate-pulse"
                    aria-hidden="true"
                  />
                ))}
            </motion.ul>
          </AnimatePresence>

          {!filteredItems.length && !isLoading && (
            <p className="text-center text-black/40 py-24">
              Nenhum trabalho encontrado nesta categoria.
            </p>
          )}
        </div>
      </section>

      <ImageLightbox
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
};

export default PortfolioGallery;

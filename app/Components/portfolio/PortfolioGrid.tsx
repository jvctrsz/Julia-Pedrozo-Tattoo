"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { classNames } from "@/src/miscellaneous";
import { featuredWorks } from "@/src/Utils/mockData";
import {
  MAIN_WORK_CATEGORIES,
  WorkGalleryItem,
  WorkImage,
  WorkType,
  WORK_CATEGORIES,
} from "@/src/types/work";
import { PortfolioGallery } from "./PortfolioGallery";

interface WorksGridProps {
  type: WorkType;
  staticItems?: WorkGalleryItem[];
  galleryLabel: string;
  emptyMessage: string;
}

const categories = ["Todos", ...WORK_CATEGORIES];

export const WorksGrid = ({
  type,
  staticItems = [],
  galleryLabel,
  emptyMessage,
}: WorksGridProps) => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { data, error, isLoading } = useSWR<WorkImage[]>(
    `/images?type=${type}`,
  );

  const databaseItems: WorkGalleryItem[] = useMemo(
    () =>
      (data ?? []).map((image) => ({
        id: image.id,
        image: image.url,
        title: image.title,
        category: image.category,
      })),
    [data],
  );

  const allItems = useMemo(
    () => [...staticItems, ...databaseItems],
    [databaseItems, staticItems],
  );

  const filteredItems = useMemo(() => {
    if (activeFilter === "Todos") return allItems;
    if (activeFilter === "Outros") {
      return allItems.filter(
        (item) => !MAIN_WORK_CATEGORIES.includes(item.category),
      );
    }
    return allItems.filter((item) => item.category === activeFilter);
  }, [allItems, activeFilter]);

  return (
    <section className="pt-20 lg:pt-28">
      <nav
        aria-label="Filtrar por categoria"
        className="py-4 sticky top-20 bg-white z-40 border-b border-black/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap gap-3 pb-2 items-center">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={activeFilter === category}
                  className={classNames(
                    "px-6 py-2 text-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer",
                    activeFilter === category
                      ? "bg-black text-white"
                      : "bg-neutral-100 text-black hover:bg-neutral-200",
                  )}
                >
                  {category}
                </button>
              </li>
            ))}
            {isLoading && (
              <li className="ml-auto text-black/30 text-xs uppercase tracking-widest animate-pulse hidden sm:block">
                Sincronizando...
              </li>
            )}
          </ul>
        </div>
      </nav>

      <PortfolioGallery
        filteredItems={filteredItems}
        activeFilter={activeFilter}
        isLoading={isLoading}
        hasError={Boolean(error)}
        galleryLabel={galleryLabel}
        emptyMessage={emptyMessage}
      />
    </section>
  );
};

export const PortfolioGrid = () => (
  <WorksGrid
    type="realizado"
    staticItems={featuredWorks}
    galleryLabel="Itens do portfólio"
    emptyMessage="Nenhum trabalho encontrado nesta categoria."
  />
);

export default PortfolioGrid;

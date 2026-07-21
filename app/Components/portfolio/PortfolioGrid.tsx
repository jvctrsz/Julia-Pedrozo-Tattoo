"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { classNames } from "@/src/miscellaneous";
import { PortfolioGallery } from "./PortfolioGallery";
import { featuredWorks } from "@/src/Utils/mockData";
import {
  WorkImage,
  MAIN_WORK_CATEGORIES,
  WORK_CATEGORIES,
} from "@/src/types/work";

interface PortfolioItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
}

const categories = ["Todos", ...WORK_CATEGORIES];

export const PortfolioGrid = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const { data, isLoading } = useSWR<WorkImage[]>("/images?type=realizado");

  const dbItems: PortfolioItem[] = useMemo(
    () =>
      (data ?? []).map((img) => ({
        id: img.id,
        image: img.url,
        title: img.title,
        category: img.category,
      })),
    [data],
  );

  const allItems = useMemo(() => [...featuredWorks, ...dbItems], [dbItems]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "Todos") return allItems;
    if (activeFilter === "Outros")
      return allItems.filter(
        (item) => !MAIN_WORK_CATEGORIES.includes(item.category),
      );
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
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={activeFilter === category}
                  className={classNames(
                    "px-6 py-2 text-sm uppercase tracking-wider whitespace-nowrap transition-all",
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
      />
    </section>
  );
};

export default PortfolioGrid;

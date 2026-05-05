"use client";

import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "@/src/miscellaneous";

interface LightboxItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
}

interface ImageLightboxProps {
  items: LightboxItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const ImageLightbox = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) => {
  const isOpen = currentIndex !== null;
  const total = items.length;

  const handlePrev = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex - 1 + total) % total);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null) return;
    onNavigate((currentIndex + 1) % total);
  }, [currentIndex, total, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  const current = currentIndex !== null ? items[currentIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Visualizando: ${current.title}`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs uppercase tracking-widest cursor-pointer"
            aria-label="Fechar visualização"
          >
            <span className="hidden sm:inline">Fechar</span>
            <XMarkIcon className="size-5" />
          </button>

          <p
            aria-live="polite"
            aria-atomic="true"
            className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-xs uppercase tracking-widest select-none"
          >
            {(currentIndex ?? 0) + 1} / {total}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-11 border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all cursor-pointer"
            aria-label="Imagem anterior"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-11 border border-white/20 text-white/70 hover:text-white hover:border-white/60 transition-all cursor-pointer"
            aria-label="Próxima imagem"
          >
            <ChevronRightIcon className="size-5" />
          </button>

          <figure
            className="relative flex flex-col items-center justify-center w-full h-full px-16 sm:px-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-4xl mx-auto"
              style={{ maxHeight: "calc(100vh - 140px)" }}
            >
              <Image
                src={current.image}
                alt={`${current.title} — ${current.category} por Julia Pedrozo`}
                width={1080}
                height={1350}
                className="w-full h-auto object-contain"
                style={{ maxHeight: "calc(100vh - 140px)" }}
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>

            <figcaption className="mt-4 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                {current.category}
              </p>
              <p className="text-white text-sm tracking-wide">
                {current.title}
              </p>
            </figcaption>
          </figure>

          <nav
            aria-label="Navegação entre imagens"
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
          >
            {items.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate(i);
                }}
                aria-label={`Ir para imagem ${i + 1}`}
                aria-current={i === currentIndex ? "true" : undefined}
                className={classNames(
                  "transition-all duration-300 cursor-pointer",
                  i === currentIndex
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60",
                )}
              />
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;

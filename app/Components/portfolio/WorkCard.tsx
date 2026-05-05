"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import Image from "next/image";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/src/miscellaneous";
import { optimizeImage } from "@/src/Utils/cloudinaryOptimization";

interface Work {
  id: string | number;
  image: string;
  title: string;
  category: string;
}

interface WorkCardProps extends HTMLMotionProps<"li"> {
  work: Work;
  variant?: "featured" | "gallery";
}

export const WorkCard = ({
  work,
  variant = "gallery",
  className = "",
  ...rest
}: WorkCardProps) => {
  const isFeatured = variant === "featured";
  return (
    <motion.li
      role="button"
      tabIndex={0}
      aria-label={`Ver ${work.title} em tela cheia`}
      {...rest}
      className={classNames(
        "group relative overflow-hidden bg-black cursor-pointer",
        isFeatured ? "aspect-4/5" : "aspect-3/4",
        className,
      )}
    >
      <figure className="w-full h-full m-0 p-0 relative">
        <Image
          src={optimizeImage(work.image, isFeatured ? 1200 : 800)}
          alt={`${work.title} — ${work.category} por Julia Pedrozo`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={classNames(
            "object-cover transition-transform duration-700",
            isFeatured ? "group-hover:scale-105" : "group-hover:scale-110",
          )}
        />
        <figcaption
          className={classNames(
            "absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            isFeatured
              ? "from-black/80 to-transparent"
              : "from-black/90 via-black/40 to-transparent",
          )}
        >
          <span className="text-white/60 text-xs uppercase tracking-wider mb-2 block">
            {work.category}
          </span>
          <h3
            className={classNames(
              "text-white",
              isFeatured ? "text-2xl" : "text-xl",
            )}
          >
            {work.title}
          </h3>

          <div className="absolute top-4 right-4 flex items-center justify-center size-9 bg-white/10 border border-white/20 text-white backdrop-blur-sm">
            <MagnifyingGlassPlusIcon className="size-4" />
          </div>
        </figcaption>
      </figure>
    </motion.li>
  );
};

export default WorkCard;

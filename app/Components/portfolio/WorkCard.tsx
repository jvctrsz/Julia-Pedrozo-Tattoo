"use client";

import { useCallback, useState } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import Image from "next/image";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/src/miscellaneous";
import { optimizeImage } from "@/src/Utils/cloudinaryOptimization";
import { LOCAL_BLUR_DATA_URL, preloadImage, getNextImageURL } from "@/src/Utils/imageUtils";

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
  const isCloudinary = work.image.includes("res.cloudinary.com");
  const [isLoaded, setIsLoaded] = useState(false);

  const src = optimizeImage(work.image, isFeatured ? 1200 : 800, "thumb");

  const handlePreload = useCallback(() => {
    const src = isCloudinary ? optimizeImage(work.image, 1200, "full") : work.image;
    preloadImage(getNextImageURL(src, 1200)).catch(() => {});
  }, [work.image, isCloudinary]);

  return (
    <motion.li
      tabIndex={0}
      aria-label={`Ver ${work.title} em tela cheia`}
      {...rest}
      className={classNames(
        "group relative overflow-hidden cursor-pointer",
        isFeatured ? "aspect-4/5" : "aspect-3/4",
        className,
      )}
      onMouseEnter={handlePreload}
      onTouchStart={handlePreload}
    >
      <div
        aria-hidden="true"
        className={classNames(
          "absolute inset-0 transition-opacity duration-500",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100 shimmer",
        )}
      />

      <figure className="w-full h-full m-0 p-0 relative">
        <Image
          src={src}
          alt={`${work.title} — ${work.category} por Julia Pedrozo`}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className={classNames(
            "object-cover transition-all duration-700",
            isLoaded ? "opacity-100" : "opacity-0",
            isFeatured ? "group-hover:scale-105" : "group-hover:scale-110",
          )}
          placeholder={!isCloudinary ? "blur" : undefined}
          blurDataURL={!isCloudinary ? LOCAL_BLUR_DATA_URL : undefined}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
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

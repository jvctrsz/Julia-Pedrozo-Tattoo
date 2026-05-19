"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import { ButtonNav } from "@/app/Components";
import { LOCAL_BLUR_DATA_URL } from "@/src/Utils/imageUtils";
import { classNames } from "@/src/miscellaneous";

export const HeroDesktop = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <section
      aria-label="Apresentação da Tatuadora"
      className="hidden lg:flex items-end bg-neutral-50 min-h-[92vh] relative overflow-hidden px-16 xl:px-28 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute right-0 top-0 w-[58%] h-full"
      >
        <div
          className={classNames(
            "absolute inset-0 z-10 transition-opacity duration-700 shimmer",
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
          aria-hidden="true"
        />
        <Image
          src="/images/tattoo-principal.webp"
          alt="Julia Pedrozo - Tatuadora em Sinop, MT"
          fill
          sizes="(max-width: 1280px) 58vw, 1100px"
          className={classNames(
            "object-cover grayscale-20 transition-opacity duration-700",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          priority
          placeholder="blur"
          blurDataURL={LOCAL_BLUR_DATA_URL}
          onLoad={() => setIsLoaded(true)}
        />
        <div className="absolute inset-0 z-20 bg-linear-to-r from-neutral-50 via-neutral-50/30 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-3xl"
        style={{ fontFamily: "'Didot', serif" }}
      >
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-black/40 text-xs uppercase tracking-[0.35em] mb-5"
        >
          Tatuadora · Sinop, MT
        </motion.p>

        <h1
          className="font-bold leading-none text-black/90 mb-6"
          style={{
            fontSize: "clamp(5rem, 9vw, 9rem)",
            letterSpacing: "-0.03em",
          }}
        >
          Julia
          <br />
          Pedrozo
        </h1>

        <p className="text-base text-black/65 mb-8 leading-relaxed max-w-sm">
          Especialista em Blackwork e Fine Line. Cada traço nascido com
          intenção, cada tatuagem uma história única na sua pele.
        </p>

        <ButtonNav path="/sobre">Saiba Mais</ButtonNav>
      </motion.div>
    </section>
  );
};

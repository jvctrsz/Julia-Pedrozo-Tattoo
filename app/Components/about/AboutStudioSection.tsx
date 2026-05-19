"use client";

import { useState } from "react";
import { motion } from "motion/react";
import SectionTitle from "../SectionTitle";
import Image from "next/image";
import tattooArt from "@/public/images/tattoo-art.webp";

export const AboutStudioSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <section aria-label="O Studio" className="py-24 lg:py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle title="Meu" subTitle="Espaço" />
            <div className="space-y-6 text-lg text-black/70 leading-relaxed">
              <p>
                Preparei um ambiente com aconchego e tranquilidade. O estúdio
                foi planejado para oferecer conforto e segurança, transformando
                o seu momento em uma experiência leve.
              </p>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-4/3 overflow-hidden m-0"
          >
            <div
              className={`absolute inset-0 z-10 transition-opacity duration-700 shimmer ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
              aria-hidden="true"
            />
            <Image
              src={tattooArt}
              alt="Studio de tatuagem de Julia Pedrozo em Sinop, MT"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
              placeholder="blur"
              onLoad={() => setIsLoaded(true)}
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
};

export default AboutStudioSection;

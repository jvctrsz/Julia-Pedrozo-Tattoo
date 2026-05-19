"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import tattooArt from "@/public/images/tattoo-art.webp";

const ContactStudioPhoto = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <section aria-label="Foto do estúdio" className="py-24 bg-neutral-50">
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative aspect-21/9 max-w-7xl mx-auto bg-neutral-200 overflow-hidden m-0"
      >
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 shimmer ${isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          aria-hidden="true"
        />
        <Image
          src={tattooArt}
          alt="Studio de tatuagem de Julia Pedrozo em Sinop, MT"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className={`object-cover transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          placeholder="blur"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.figure>
    </section>
  );
};

export default ContactStudioPhoto;

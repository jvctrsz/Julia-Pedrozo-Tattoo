"use client";

import { motion } from "motion/react";
import Image from "next/image";
import tattooArt from "@/public/images/tattoo-art.webp";

const ContactStudioPhoto = () => {
  return (
    <section aria-label="Foto do estúdio" className="py-24 bg-neutral-50">
      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative aspect-21/9 max-w-7xl mx-auto bg-neutral-200 overflow-hidden m-0"
      >
        <Image
          src={tattooArt}
          alt="Studio de tatuagem de Julia Pedrozo em Sinop, MT"
          fill
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
        />
      </motion.figure>
    </section>
  );
};

export default ContactStudioPhoto;

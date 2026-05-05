"use client";

import { WHATSAPP_URL } from "@/src/config";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";

export const FloatingContact = () => {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      aria-label="Faça contato através do WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
    </motion.a>
  );
};

export default FloatingContact;

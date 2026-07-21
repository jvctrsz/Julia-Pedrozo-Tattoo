"use client";

import { WHATSAPP_URL } from "@/src/config";
import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import SectionTitle from "../SectionTitle";

interface ContactWhatsAppCTAProps {
  title?: string;
  subTitle?: string;
  description?: string;
  href?: string;
  buttonLabel?: string;
}

const ContactWhatsAppCTA = ({
  title = "Preparado",
  subTitle = "para sua próxima tattoo?",
  description = "O jeito mais rápido de agendar é pelo WhatsApp. Me manda uma mensagem com sua ideia, referências e o local do corpo — e a gente conversa!",
  href = WHATSAPP_URL,
  buttonLabel = "Falar no WhatsApp",
}: ContactWhatsAppCTAProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-8"
    >
      <div className="space-y-6">
        <SectionTitle title={title} subTitle={subTitle} />
        <p className="text-black/70 leading-relaxed text-lg">{description}</p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 text-sm uppercase tracking-wider hover:bg-black/80 transition-colors w-full sm:w-fit"
      >
        <FaWhatsapp size={20} aria-hidden="true" />
        {buttonLabel}
      </a>

      <small className="text-black/40">
        Respondemos em até 24 horas nos dias de atendimento.
      </small>
    </motion.div>
  );
};

export default ContactWhatsAppCTA;

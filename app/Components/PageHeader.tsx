"use client";

import { motion } from "motion/react";

interface PageHeaderProps {
  title: string;
  subTitle: string;
  page: string;
}

const PageHeader = ({ page, subTitle, title }: PageHeaderProps) => {
  return (
    <section
      aria-label={`Cabeçalho — ${page}`}
      className="bg-neutral-50 pt-36 pb-12 lg:pt-40 lg:pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ fontFamily: "'Didot', serif" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-black/55 text-xs uppercase tracking-[0.4em]">
              {page}
            </span>
            <div className="flex-1 h-px bg-black/10" />
          </div>

          <h1
            className="font-bold leading-none text-black/90"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              letterSpacing: 0,
            }}
          >
            {title} <span className="font-light text-black/50">{subTitle}</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;

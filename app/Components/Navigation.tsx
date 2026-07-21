"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/src/miscellaneous";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/portfolio", label: "Portfólio" },
    { path: "/disponiveis", label: "Disponíveis" },
    { path: "/sobre", label: "Sobre" },
    { path: "/contatos", label: "Contatos" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <nav
      className={classNames(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        "bg-black/90 backdrop-blur-sm",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 justify-between items-center">
          <Link href="/" className="text-2xl leading-none uppercase">
            <span className="text-white">Julia</span>
            <span className="text-white/60">Pedrozo</span>
          </Link>

          <ul
            className="hidden md:flex items-center gap-5 lg:gap-8"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={classNames(
                    "text-sm uppercase tracking-wider transition-colors",
                    pathname === link.path
                      ? "text-white"
                      : "text-white/60 hover:text-white",
                  )}
                  aria-current={pathname === link.path ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex size-10 items-center justify-center text-white"
            aria-label="Menu de navegação"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <XMarkIcon className="size-6" />
            ) : (
              <Bars3Icon className="size-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <ul id="mobile-menu" className="flex flex-col gap-4 pt-6 pb-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      href={link.path}
                      className={classNames(
                        "text-sm uppercase tracking-wider transition-colors",
                        pathname === link.path ? "text-white" : "text-white/60",
                      )}
                      aria-current={pathname === link.path ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;

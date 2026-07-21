"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import api from "@/src/lib/api";
import { classNames } from "@/src/miscellaneous";
import { WorkType } from "@/src/types/work";
import AdminWorkManager from "./AdminWorkManager";

const SECTIONS = [
  {
    type: "realizado",
    label: "Trabalhos realizados",
    uploadTitle: "Novo trabalho realizado",
    listTitle: "Trabalhos publicados",
    emptyMessage: "Nenhum trabalho realizado publicado ainda.",
  },
  {
    type: "disponivel",
    label: "Trabalhos disponíveis",
    uploadTitle: "Nova arte disponível",
    listTitle: "Artes disponíveis",
    emptyMessage: "Nenhuma arte disponível publicada ainda.",
  },
] as const satisfies ReadonlyArray<{
  type: WorkType;
  label: string;
  uploadTitle: string;
  listTitle: string;
  emptyMessage: string;
}>;

export default function AdminPanel() {
  const handleLogout = async () => {
    await api.post("/auth/logout");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      <header className="sticky top-16 z-40 border-b border-black/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-black/30 text-xs uppercase tracking-[0.3em]">
              Julia Pedrozo
            </p>
            <h1
              className="text-black text-2xl leading-tight"
              style={{ fontFamily: "'Didot', serif" }}
            >
              Admin
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-black/40 hover:text-black text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <TabGroup>
          <TabList
            aria-label="Tipo de trabalho"
            className="mb-10 grid grid-cols-2 border border-black/15"
          >
            {SECTIONS.map((section, index) => (
              <Tab
                key={section.type}
                className={({ selected }) =>
                  classNames(
                    "min-h-14 px-3 sm:px-6 py-3 text-[0.65rem] sm:text-xs uppercase tracking-wider sm:tracking-widest transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                    index > 0 ? "border-l border-black/15" : "",
                    selected
                      ? "bg-black text-white"
                      : "bg-white text-black/45 hover:text-black hover:bg-black/5",
                  )
                }
              >
                {section.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {SECTIONS.map((section) => (
              <TabPanel
                key={section.type}
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
              >
                <AdminWorkManager {...section} />
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </main>
    </div>
  );
}

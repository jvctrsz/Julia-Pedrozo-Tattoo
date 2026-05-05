"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/src/lib/api";
import { ReactNode } from "react";

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}

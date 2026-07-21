export const WORK_TYPE_CONFIG = {
  realizado: { databaseValue: "REALIZADO", folder: "tattoo-portfolio" },
  disponivel: {
    databaseValue: "DISPONIVEL",
    folder: "tattoo-portfolio-disponiveis",
  },
} as const;

export type WorkType = keyof typeof WORK_TYPE_CONFIG;

export const DEFAULT_WORK_TYPE: WorkType = "realizado";

export const WORK_CATEGORIES = [
  "Blackwork",
  "Fine Line",
  "Floral",
  "Outros",
] as const;

export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export const MAIN_WORK_CATEGORIES: readonly string[] = WORK_CATEGORIES.filter(
  (category) => category !== "Outros",
);

export interface WorkImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface WorkGalleryItem {
  id: string | number;
  image: string;
  title: string;
  category: string;
}

export function isWorkType(value: unknown): value is WorkType {
  return typeof value === "string" && Object.hasOwn(WORK_TYPE_CONFIG, value);
}

export function isPublicIdForWorkType(
  publicId: string,
  type: WorkType,
): boolean {
  return publicId.startsWith(`${WORK_TYPE_CONFIG[type].folder}/`);
}

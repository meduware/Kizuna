import { defaultLocale } from "@/lib/translation";
import { usePathname } from "next/navigation";

export const useFindTranslationPath = (path: string) => {
  const pathname = usePathname();
  const language = pathname?.split("/")[1] || defaultLocale;
  return language + "/" + path;
};

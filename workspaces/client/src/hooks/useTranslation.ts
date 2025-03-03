"use client";

import { defaultLocale } from "@/lib/translation";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useTranslation = () => {
  const pathname = usePathname();
  const language = pathname?.split("/")[1] || defaultLocale;
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    import(`@/locales/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
        setIsLoading(false);
      })
      .catch(() => {
        setTranslations({});
        setIsLoading(false);
      });
  }, [language]);

  const t = (key: string) => {
    if (isLoading) return key;
    return translations[key] || key;
  };

  return t;
};

"use client";

import { defaultLocale } from "@/lib/translation";
import { getCookie, setCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const useTranslation = () => {
  const [languagePreference, setLanguagePreference] =
    useState<string>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const choice = getCookie("languagePreference");
    if (choice) {
      setLanguagePreference(choice);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    import(`@/locales/${languagePreference}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch(() => {
        setTranslations({});
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [languagePreference]);

  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const lang = (event as CustomEvent).detail;
      setLanguagePreference(lang);
    };

    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  const translation = (key: string) => {
    if (isLoading) return key;
    return translations[key] || key;
  };

  return translation;
};

export const changeLanguage = (lang: string) => {
  setCookie("languagePreference", lang);
  window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));
};

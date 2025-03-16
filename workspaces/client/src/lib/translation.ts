import { getCookie } from "cookies-next";

export const supportedLocales = ["en", "tr"];
export const defaultLocale = "en";

export const useFormattedDate = () => {
  const languagePreference = getCookie("languagePreference");
  console.log(languagePreference);

  return (isoDateString: Date): string => {
    try {
      const date = new Date(isoDateString);

      if (isNaN(date.getTime())) {
        return "Invalid date";
      }

      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      const formatter = new Intl.DateTimeFormat(languagePreference || defaultLocale, options);
      return formatter.format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date error";
    }
  };
};

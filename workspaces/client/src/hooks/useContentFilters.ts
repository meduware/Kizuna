import { useState } from "react";
import { ContentFilters } from "@shared/types";

export function useContentFilters() {
  const [contentFilters, setContentFilters] = useState<ContentFilters>({
    profanity: true,
    spam: true,
    links: false,
    mentions: false,
    newAccounts: true,
    capitalization: false,
    invites: true,
    attachments: false,
  });

  const [filterSeverity, setFilterSeverity] = useState("Low");

  const toggleContentFilter = (key: keyof ContentFilters) => {
    setContentFilters({
      ...contentFilters,
      [key]: !contentFilters[key],
    });
  };

  return {
    contentFilters,
    filterSeverity,
    setFilterSeverity,
    toggleContentFilter,
  };
}

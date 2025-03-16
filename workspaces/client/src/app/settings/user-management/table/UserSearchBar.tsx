import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { UserSearchBarProps } from "@shared/types";
import { useTranslation } from "@/hooks/useTranslation";

export default function UsersSearchBar({
  searchQuery,
  setSearchQuery,
  refreshData,
}: UserSearchBarProps): JSX.Element {
  const translation = useTranslation();
  return (
    <div className="flex gap-2 max-md:w-full">
      <div className="flex items-center relative w-full">
        <Search className="absolute left-2 size-4 text-gray-500 dark:text-gray-400" />
        <Input
          placeholder={`${translation("Search Users")}...`}
          className="pl-8 w-full md:w-40 lg:w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon" onClick={refreshData}>
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
